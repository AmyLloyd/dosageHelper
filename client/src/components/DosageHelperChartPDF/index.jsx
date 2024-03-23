import { useEffect, useState } from 'react';
import { useVetContext } from '../../utils/GlobalState';
import { Link } from 'react-router-dom';

import './styles.css';

function DosageHelperChartPDF() {
    const [state, dispatch] = useVetContext();

    const { currentClient } = state;
    console.log(currentClient, "currentClient");
    const { currentPatient } = state;
    console.log(currentPatient, "currentPatient");
    const clients  = state.clients;
    console.log(clients, 'clients');
  
    let [oneClient, setOneClient] = useState();
    let [onePatient, setOnePatient] = useState();
    console.log(onePatient, "onePatient")

    useEffect(() => {
        if (clients.length) {
            const foundClient = clients.find((client) => client._id === currentClient);
            setOneClient(foundClient);
            console.log(foundClient, "foundClient");
    
            if (foundClient && foundClient.patients.length) {
                const foundPatient = foundClient.patients.find((patient) => patient._id === currentPatient);
                setOnePatient(foundPatient);
                console.log(foundPatient, "foundPatient");
            }
        }
    }, [clients, currentClient, currentPatient]);
  
    console.log(oneClient, 'oneClient');
    console.log(onePatient, 'onePatient');
    console.log(onePatient.prescriptions.drug.name);
 
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
            {currentPatient && onePatient && oneClient && oneClient.patients ? (
                <>
                <h1>{onePatient?.name}</h1>
                {/* <h3>Condition: {onePatient.condition_description}</h3> */}
                <h4>Dosage Helper</h4>

                <section className="prescr-list">
                    <table>
                        <thead>
                            <tr>
                                <th>DAY</th>
                                {onePatient?.prescriptions?.map((item) => (
                                    <div>
                                        <th>{item.drug.name}</th>
                                        <th>{item.drug.strength}</th>
                                        <th>{item.drug.type}</th>
                                    </div>

                                ))}
                            </tr>
                        </thead>
                        {/* <thead>
                            <tr>
                                <th></th>
                            {onePatient?.prescriptions?.map((item, index) => (
                                <Fragment key={index}>
                                    <th>{item.drug.dosage_notes[0] ? item.drug.dosage_notes[0] : 'No notes for this dosage'}</th>
                                    <th>{item.drug.dosage_notes[1] ? item.drug.dosage_notes[1] : 'No notes for this dosage'}</th>
                                    <th>{item.drug.dosage_notes[2] ? item.drug.dosage_notes[2] : 'No notes for this dosage'}</th>
                                </Fragment>
                            ))}
                            </tr>
                        </thead> 
                       
                        <tbody>
                        {onePatient?.prescriptions?.map((item) => (
                            <tr>
                                <td>Day</td>
                             {/* tutor support to learn itinery statements 
                                {item.time_of_dosages[0]?(
                                    <>
                                        <td>
                                            <input className="checkbox" id="checked" type="checkbox" />
                                            <label for="agreement">{item.time_of_dosages[1]}</label> 
                                        </td>
                                    </>
                                ):(
                                    <>
                                        <td></td>
                                    </>
                                )}
                                {item.time_of_dosages[1]?(
                                    <>
                                        <td>
                                            <input className="checkbox" id="checked" type="checkbox" />
                                            <label for="agreement">{item.time_of_dosages[1]}</label> 
                                        </td>
                                    </>
                                ):(
                                    <>
                                        <td></td>
                                    </>
                                )}
                              
                                {item.time_of_dosages[2]?(
                                    <>
                                        <td>
                                            <input className="checkbox" id="checked" type="checkbox" />
                                            <label for="agreement">{item.time_of_dosages[1]}</label> 
                                        </td>
                                    </>
                                ):(
                                    <>
                                        <td></td>
                                    </>
                                )}
                            </tr>
                        ))}
                        </tbody>
                        */}
                    </table>
                </section>
                <section>
                    <div className='button'>
                        <Link to="/dosageHelperPDF"> Print Dosage Helper for client </Link>
                    </div>
                </section>
            </>
            ) : (
              <span> Error... no prescriptions found.</span>  
            )}
        </div>
    );
}
export default DosageHelperChartPDF;
