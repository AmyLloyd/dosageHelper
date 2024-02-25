import { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { useVetContext } from "../../utils/GlobalState";

//import type variables
// import {
//     DOSAGE_CHECKED
//  } from "../../utils/actions";
import { QUERY_PATIENT_BY_ID } from '../../utils/queries';
// import { UPDATE_PRESCRIPTION } from '../../utils/mutations';
// import PrescriptionItem from '../PrescriptionItem';

import "./PrescriptionList.css"

function PrescriptionList() {
    const [state, dispatch] = useVetContext();

<<<<<<< Updated upstream
    console.log(state, "state");
    console.log(state.clients, "state.clients");
    console.log(state.currentClient, "state.currentClient");

    // const { currentPatient } = state;

    const { data } = useQuery(QUERY_PATIENT_BY_ID);

=======
    const clients  = state.clients;
  
    let [oneClient, setOneClient] = useState();
    let [onePatient, setOnePatient] = useState();
>>>>>>> Stashed changes

    useEffect(() => {
        if(data) {
            dispatch({
                type: UPDATE_PRESCRIPTION,
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
<<<<<<< Updated upstream
    {/* Need to check defined */}
            {state.prescriptions.length ? (
                <>
=======
            {currentPatient && oneClient && oneClient.patients ? (
                <>
                <h1>{onePatient?.name}</h1>
                <h4>Active prescriptions</h4>
>>>>>>> Stashed changes
                <section className="prescr-list">
                    <table>
                        <thead>
                            <tr>
                                <th>DRUG</th>
                                <th>DOSE</th>
                                <th>DOSAGE TIME</th>
                                <th>DOSAGE NOTES</th>
                                <th>DOSAGE GIVEN</th>
                            </tr>
                        </thead>
                        <tbody>
<<<<<<< Updated upstream
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
=======
                        {onePatient?.prescriptions?.map((item) => (
                            <tr>
                                <td>{item.drug.name}</td>
                                <td>{item.created_at}</td>
                                <td>{item.time_of_dosages}</td>
                                <td>{item.dosage_notes}</td>
                                <td>
                                    <button 
                                    type="button"
                                    // onClick={() => {
                                    //     console.log("PrescriptionList.js: Dispatched checked!");
                                    //     return dispatch({ 
                                    //         type: DOSAGE_CHECKED,
                                    //         payload: dosage_checked_at
                                    //     });
                                    // }}
                                    >
                                        <span role="img" aria-label="delete">
                                            ✖️
                                        </span>
                                    </button>
                                </td>
                            </tr>
>>>>>>> Stashed changes
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
