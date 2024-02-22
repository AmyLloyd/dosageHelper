import { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { useVetContext } from "../../utils/GlobalState";

//import type variables
import {
    DOSAGE_CHECKED
 } from "../../utils/actions";
import { QUERY_PATIENT_BY_ID } from '../../utils/queries';
import { UPDATE_PRESCRIPTION } from '../../utils/mutations';

import "./styles.css"

function PrescriptionList() {
    const [state, dispatch] = useVetContext();
    const { currentPatient } = state;

    const { loading, data } = useQuery(QUERY_PATIENT_BY_ID);

    useEffect(() => {
        if(data) {
            dispatch({
                type: UPDATE_PRESCRIPTIONS,
                prescriptions: data.prescriptions,
            });
        }
    }, [data, dispatch]);

    //this code could be used to filter by 'active' or not active prescriptions if we add that enhancement

    function filterPrescriptions() {
        if (!currentPatient) {
            //CHANGE THIS it doesn't make sense to return all prescriptions
            return state.prescriptions;
        }

        return state.prescriptions.filter(
            (prescription) => prescription.patient._id === currentPatient
        );
    }

    return (
        <div>
    {/* Need to check defined */}
            {state.prescriptions.length ? (
                <>
                <section className="prescr-list">
                    {filterPrescriptions().map((prescription) => (
                        
                    ))}
                    <table>
                        <thead>
                            <tr>
                                <th>DRUG NAME</th>
                                <th>DOSE</th>
                                <th>DOSAGE TIME</th>
                                <th>DOSAGE NOTES</th>
                                <th>DOSAGE GIVEN</th>
                            </tr>
                        </thead>

                        <tbody>
                          {/* Access prescriptions from our state object returned from useReducer */}
                          {state.prescriptions.map((prescription) => (
                            <tr key={prescription.id}>
                                <td>{prescription.id}</td>
                                <td>{prescription.created_at}</td>
                                <td>{prescription.dose_frequency}</td>
                                <td>
                                    <button 
                                    type="button"
                                    onClick={() => {
                                        console.log("PrescriptionList.js: Dispatched checked!");
                                        return dispatch({ 
                                            type: DOSAGE_CHECKED,
                                            payload: prescription.dosage_checked_at
                                        });
                                    }}
                                    >
                                        <span role="img" aria-label="delete">
                                            ✖️
                                        </span>
                                    </button>
                                </td>
                            </tr>
                          ))}
                        </tbody>
                    </table>
                </section>
            </>
            ) : (
              <span> Error... no prescriptions found.</span>  
            )}
        </div>
    );
}
export default PrescriptionList
