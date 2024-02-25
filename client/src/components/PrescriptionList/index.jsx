import { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { useVetContext } from "../../utils/GlobalState";

//import type variables
// import {
//     DOSAGE_CHECKED
//  } from "../../utils/actions";
import { QUERY_PATIENT_BY_ID } from '../../utils/queries';
// import { UPDATE_PRESCRIPTION } from '../../utils/mutations';
import PrescriptionItem from '../PrescriptionItem';

import "./PrescriptionList.css"

function PrescriptionList() {
    const [state, dispatch] = useVetContext();
    const { currentClient } = state;
    const { currentPatient } = state;

    console.log("THIS IS THE CODE FOR THE PRESCRIPTION LIST");

    // const { id } = useParams();
    console.log(currentPatient, "currentPatient");
    console.log(currentClient, "currentClient");
    console.log(state,"state");
    console.log(state.clients, "state.clients");

    const clients  = state.clients;
    console.log(clients, 'clients');
  
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
    {/* Need to check defined */}
            {currentPatient && oneClient && oneClient.patients ? (
                <>
                <h2>{onePatient?.name}</h2>
                <h4>Your prescriptions</h4>
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
                        {onePatient?.prescriptions?.map((item) => (
                        <PrescriptionItem
                            key={item._id}
                            _id={item._id}
                            created_at={item.created_at}
                            // quantity={item.quantity}
                            // drug={item.drug.name}
                            // dosage_notes={item.dosage_notes}
                            // number_of_doses={item.number_of_dosages}
                            // time_of_dosages={item.time_of_dosages}
                            // dosage_checked_at={item.dosage_checked_at}
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
