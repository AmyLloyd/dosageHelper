import { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { useVetContext } from "../../utils/GlobalState";

//import type variables
import {
    DOSAGE_CHECKED
 } from "../../utils/actions";
import { QUERY_PATIENT_BY_ID } from '../../utils/queries';
import { UPDATE_PRESCRIPTION } from '../../utils/mutations';
import PrescriptionItem from '../PrescriptionItem';

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
                        {filterPrescriptions().map((prescription) => (
                        <PrescriptionItem
                            key={prescription._id}
                            _id={prescription._id}
                            quantity={prescription.quantity}
                            drug={prescription.drug.name}
                            dosage_notes={prescription.dosage_notes}
                            number_of_doses={prescription.number_of_dosages}
                            time_of_dosages={prescription.time_of_dosages}
                            dosage_checked_at={prescription.dosage_checked_at}
                            />
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
