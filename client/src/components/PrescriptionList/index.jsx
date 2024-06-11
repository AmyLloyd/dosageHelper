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
    const { currentClient } = state;
    const { currentPatient } = state;
    const clients  = state.clients;
  
    let [oneClient, setOneClient] = useState();
    let [onePatient, setOnePatient] = useState();

    useEffect(() => {
        if (clients.length) {
            const foundClient = clients.find((client) => client._id === currentClient);
            setOneClient(foundClient);    
            if (foundClient && foundClient.patients.length) {
                const foundPatient = foundClient.patients.find((patient) => patient._id === currentPatient);
                setOnePatient(foundPatient);
            }
        }
    }, [clients, currentClient, currentPatient]);

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
            <div>
                <h2>{onePatient?.name}'s prescription history</h2>

                <div className="container-list">
                    {/* Button for to go to printable PDF */}
                    <button className='my-2 flex-item'>
                        <Link to={'/dosageHelperPDF'}> Print Dosage Helper for client </Link>
                    </button>
                </div>

                <section className="prescr-list overflow-scroll my-2">
                    <table>
                        <thead>
                            <tr>
                                <th>START DATE</th>
                                <th>DRUG</th>
                                <th>INSTRUCTIONS</th>
                                <th>COURSE</th>
                                <th>TIME</th>
                                <th>QUANTITY</th>
                                <th>ACTIVE</th>
                            </tr>
                        </thead>
                        <tbody>
                        {onePatient?.prescriptions?.map((item) => (
                            <tr key={item._id}>
                                <td>{item.created_at}</td>
                                <td><span className="emphasis">{item.drug.name}</span><br/>
                                {item.drug.strength}<br/>
                                {item.drug.type}</td>
                                <td>{item.instructions}</td>
                                <td>{item.course_length} days</td>

                                <td>
                                    <input className="checkbox" id="checked" type="checkbox" />
                                    <label htmlFor="agreement">{item.time_of_dosages[0]} </label>
                                    {item.dosage_notes[0]?(<div className='note-text'>{item.dosage_notes[0]}</div>):(<></>)}

                                    {item.time_of_dosages[1]?(
                                        <>
                                            <input className="checkbox" id="checked" type="checkbox" />
                                            <label htmlFor="agreement">{item.time_of_dosages[1]}</label>
                                            {item.dosage_notes[1]?(<div className='note-text'>{item.dosage_notes[1]}</div>):(<></>)} 
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
                                            {item.dosage_notes[2]?(<div className='note-text'>{item.dosage_notes[2]}</div>):(<></>)} 
                                        </>
                                    ):(
                                        <>
                                        </>
                                    )}
                    
                                </td>
                                <td>{item.quantity}</td>

                                <td>{item.active ? (
                                    <>
                                        <div className="center">
                                            <div>✅</div>                   
                                            <button onClick={handleDeactivateBtn} value={item._id} className="material-symbols-outlined" >
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



            </div> 

            ) : (
              <h2> Error... no prescriptions found.</h2>  
            )}
        </>
    )
}
export default PrescriptionList;