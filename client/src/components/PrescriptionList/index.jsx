import { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { useVetContext } from "../../utils/GlobalState";
import { Link } from 'react-router-dom';
// import { Fragment } from 'react';


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
  
    const days = ["1", "2", "3", "4", "5", "6,", "7", "8", "9", "10", "11", "12", "13", "14"];

    return (
        <>
            <button className='my-2'>
                <Link to="/Prescription"> Add new prescription </Link>
            </button>
            {currentPatient && oneClient && oneClient.patients ? (
            <>
          
                <h2>{onePatient?.name}</h2>
                {/* <h3>Condition: {onePatient.condition_description}</h3> */}
                <h5>Prescription History</h5>

                <section className="prescr-list my-2">
                    <table>
                        <thead>
                            <tr>

                                <th>PRESCRIPTION DATE</th>
                                <th>DRUG</th>
                                <th>DRUG STRENGTH</th>
                                <th>DRUG TYPE</th>
                                <th>COURSE LENGTH</th>
                                <th>DOSAGE TIMES</th>
                                <th>DOSAGE NOTES</th>
                                <th>ACTIVE?</th>
                            </tr>
                        </thead>
                        <tbody>
                        {onePatient?.prescriptions?.map((item) => (
                            <tr>
                                <td>{item.created_at}</td>
                                <td>{item.drug.name}</td>
                                <td>{item.drug.strength}</td>
                                <td>{item.drug.type}</td>
                                <td>{item.course_length} days</td>

                                <td>
                                    <input className="checkbox" id="checked" type="checkbox" />
                                    <label for="agreement">{item.time_of_dosages[0]} </label>
                                    
                                    {item.time_of_dosages[1]?(
                                        <>
                                            <input className="checkbox" id="checked" type="checkbox" />
                                            <label for="agreement">{item.time_of_dosages[1]}</label> 
                                        </>
                                    ):(
                                        <>
                                        </>
                                    )}
                                    
                                    {/* //itinary statements */}
                                    {item.time_of_dosages[2]?(
                                        <>
                                            <input className="checkbox" id="checked" type="checkbox"/>
                                            <label for="agreement">{item.time_of_dosages[2]}</label> 
                                        </>
                                    ):(
                                        <>
                                        </>
                                    )}
                    
                                </td>

                                <td>{item.dosage_notes}</td>
                                <td>{item.active ? (
                                    <>
                                        <div>✅</div>
                                    </>
                                    ) : (
                                    <>
                                        <div>✖️</div>
                                    </>    
                                    )}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </section>

           
                {/* <h3>Condition: {onePatient.condition_description}</h3> */}
                <h4 className= 'my-2' >Dosage Helper</h4>
                <div>
                    <button>
                        <Link to="/DosageHelperPDF"> Print Dosage Helper for client </Link>
                    </button>
                </div>
                
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

                                <tr>
                                    <td>DAY ___________</td>
                                    {onePatient?.prescriptions?.map((item) => (
                                    <td key={item._id}>
                                        <input className="checkbox" id="checked" type="checkbox" />
                                        <label for="agreement">{item.time_of_dosages[0]} </label>
                                    {item.time_of_dosages[1]?(
                                            <>
                                                <input className="checkbox" id="checked" type="checkbox" />
                                                <label for="agreement">{item.time_of_dosages[1]}</label> 
                                            </>
                                    ):(
                                        <>
                                        </>
                                    )}
                                    {/* //itinary statements */}
                                    {item.time_of_dosages[2]?(
                                        <>
                                            <input className="checkbox" id="checked" type="checkbox"/>
                                            <label for="agreement">{item.time_of_dosages[2]}</label> 
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
export default PrescriptionList;
