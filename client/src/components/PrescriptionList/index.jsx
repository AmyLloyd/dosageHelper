import { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { useVetContext } from "../../utils/GlobalState";

//import type variables
// import {
//     DOSAGE_CHECKED
//  } from "../../utils/actions";
import { QUERY_PATIENT_BY_ID } from '../../utils/queries';
// import { UPDATE_PRESCRIPTION } from '../../utils/mutations';


import "./PrescriptionList.css"

function PrescriptionList() {
    const [state, dispatch] = useVetContext();

    const { currentClient } = state;
    const { currentPatient } = state;
    const clients  = state.clients;
  
    let [oneClient, setOneClient] = useState();
    let [onePatient, setOnePatient] = useState();

    useEffect(() => {
        if (clients.length) {
            const foundClient = clients.find((client) => client._id === currentClient);
            setOneClient(foundClient);
            console.log(foundClient);
    
            if (foundClient && foundClient.patients.length) {
                const foundPatient = foundClient.patients.find((patient) => patient._id === currentPatient);
                setOnePatient(foundPatient);
                console.log(foundPatient);
            }
        }
    }, [clients, currentClient, currentPatient]);
  

    //this code could be used to filter by 'active' or not active prescriptions if we add that enhancement

    // function filterPrescriptions() {
    //     if (!currentPatient) {
    //         //CHANGE THIS it doesn't make sense to return all prescriptions
    //         return prescriptions;
    //     }

    //     return prescriptions.filter(
    //         (prescription) => prescription.patient._id === currentPatient
    //     );
    // }

    return (
        <div>
            {currentPatient && oneClient && oneClient.patients ? (
                <>
                <h1>{onePatient?.name}</h1>
                <h3>Condition: {onePatient.condition_description}</h3>
                <h4>Active prescriptions</h4>


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
