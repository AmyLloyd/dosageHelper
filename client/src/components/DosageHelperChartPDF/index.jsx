import { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { useVetContext } from "../../utils/GlobalState";
import { Link } from 'react-router-dom';

import { QUERY_PATIENT_BY_ID } from '../../utils/queries';
// import { UPDATE_PRESCRIPTION } from '../../utils/mutations';

import "./styles.css"

function DosageHelperChartPDF() {
    const [state, dispatch] = useVetContext();

    const { currentClient } = state;
    console.log(currentClient, "currentClient");
    const { currentPatient } = state;
    console.log(currentPatient, "currentPatient");
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
  
    const days = ["1", "2", "3", "4", "5", "6,", "7", "8", "9", "10", "11", "12", "13", "14"];

    return (
        <>

            {currentPatient && oneClient && oneClient.patients ? (
            <>

{/* Printable version of dosageHelper           */}
                <section className="prescr-list my-2">
                    <table>
                        <thead>
                            <tr>
                                <td></td>
                            {onePatient?.prescriptions?.map((item) => (
                                <th key={item._id}>{item.drug.name} Strength:{item.drug.strength} Type: {item.drug.type}</th>
                            ))}
                            </tr>
                        </thead>
                
                        <tbody>
                            {days.map((day) => (

                                <tr key={day}>
                                    <td>DAY ___________</td>
                                    {onePatient?.prescriptions?.map((item) => (
                                    <td key={item._id}>
                                        <input className="checkbox" id="checked" type="checkbox" />
                                        <label htmlFor="agreement">{item.time_of_dosages[0]} </label>
                                    {item.time_of_dosages[1]?(
                                            <>
                                                <input className="checkbox" id="checked" type="checkbox" />
                                                <label htmlFor="agreement">{item.time_of_dosages[1]}</label> 
                                            </>
                                    ):(
                                        <>
                                        </>
                                    )}
                                    {/* //itinary statements */}
                                    {item.time_of_dosages[2]?(
                                        <>
                                            <input className="checkbox" id="checked" type="checkbox"/>
                                            <label htmlFor="agreement">{item.time_of_dosages[2]}</label> 
                                        </>
                                    ):(
                                        <>
                                        </>
                                    )}
                                    </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>
            </> 

            ) : (
              <span> Error... no prescriptions found.</span>  
            )}
        </>
    )
}

export default DosageHelperChartPDF;
