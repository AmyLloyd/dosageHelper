import { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { useVetContext } from "../../utils/GlobalState";
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';


import { QUERY_PATIENT_BY_ID } from '../../utils/queries';
// import { UPDATE_PRESCRIPTION } from '../../utils/mutations';
import { TOGGLE_ACTIVE_PRESCRIPTION } from '../../utils/mutations';
import { TOGGLE_INACTIVE_PRESCRIPTION } from '../../utils/mutations';

function PrescriptionList() {
    const [state, dispatch] = useVetContext();
    console.log(state, "state");

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

    const [toggleActivePrescription, { error }] = useMutation( TOGGLE_ACTIVE_PRESCRIPTION );
    const handleDeactivateBtn = async (event) => {
        event.preventDefault();
        try {
            const id = event.target.value;

            const mutationResponse = await toggleActivePrescription({
                variables: {
                    prescriptionId: id
                },               
            });
        } catch (e) {
            console.log(e);
        }  
    };

    const [toggleInactivePrescription] = useMutation( TOGGLE_INACTIVE_PRESCRIPTION );
    const handleActivateBtn = async (event) => {
        event.preventDefault();
        try {
            const id = event.target.value;
            const mutationResponse = await toggleInactivePrescription({
                variables: {
                    prescriptionId: id
                },               
            });
        } catch (e) {
            console.log(e);
        }  
    };

    return (
        <>
            {currentPatient && oneClient && oneClient.patients ? (
            <>
                <h2>{onePatient?.name}'s prescription history</h2>

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
                                <th>QUANTITY</th>
                                <th>DOSE FREQUENCY</th>
                                <th>DOSAGE NOTES</th>
                                <th>INSTRUCTIONS</th>
                                <th>ACTIVE?</th>
                            </tr>
                        </thead>
                        <tbody>
                        {onePatient?.prescriptions?.map((item) => (
                            <tr key={item._id}>
                                <td>{item.created_at}</td>
                                <td>{item.drug.name}</td>
                                <td>{item.drug.strength}</td>
                                <td>{item.drug.type}</td>
                                <td>{item.course_length} days</td>

                                <td>
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
                                <td>{item.quantity}</td>
                                <td>{item.dose_frequency}</td>
                                <td>{item.dosage_notes}</td>
                                <td>{item.instructions}</td>
                                <td>{item.active ? (
                                    <>
                                        <div className="center">
                                            <div>✅</div>                   
                                            <button onClick={handleActivateBtn} value={item._id} className="material-symbols-outlined" >
                                                swap_horizontal_circle</button>                                       
                                        </div>
                                    </>
                                    ) : (
                                    <>                                      
                                        <div className="center">
                                            <div>✖️</div>                   
                                            <button onClick={handleActivateBtn} value={item._id} className="material-symbols-outlined" >
                                                swap_horizontal_circle</button>                                       
                                        </div>                                        
                                    </>    
                                    )}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </section>

                <div className="container space-between flex-row">
                    <button className='my-2 flex-item'>
                        <Link to="/Prescription"> Add new prescription </Link>
                    </button>
                    {/* Button for to go to printable PDF */}
                    <button className='my-2 flex-item'>
                        <Link to={'/dosageHelperPDF'}> Print Dosage Helper for client </Link>
                    </button>
                </div>

            </> 

            ) : (
              <span> Error... no prescriptions found.</span>  
            )}
        </>
    )
}
export default PrescriptionList;