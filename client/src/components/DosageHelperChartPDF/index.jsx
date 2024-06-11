import { useEffect, useState, useRef } from 'react';
import { useQuery } from '@apollo/client';
import { useVetContext } from "../../utils/GlobalState";
import { Link } from 'react-router-dom';

//for printing PDF
import React from 'react';
//libraries needed for downloading PDF
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

import './styles.css';

import { QUERY_PATIENT_BY_ID } from '../../utils/queries';
// import { UPDATE_PRESCRIPTION } from '../../utils/mutations';

function DosageHelperChartPDF() {
    const [state, dispatch] = useVetContext();
    const { currentClient } = state;
    const { currentPatient } = state;
    const clients  = state.clients;

    let [oneClient, setOneClient] = useState();
    console.log(oneClient, 'oneClient');
    let [onePatient, setOnePatient] = useState();
    console.log(onePatient, 'onePatient');
    let [activePrescriptions, setActivePrescriptions] = useState([]);
    console.log(activePrescriptions, 'activePrescriptions');

    useEffect(() => {
        if (clients.length) {
            console.log('useEffect working');
            const foundClient = clients.find((client) => client._id === currentClient);
            setOneClient(foundClient);    
            if (foundClient && foundClient.patients.length) {
                const foundPatient = foundClient.patients.find((patient) => patient._id === currentPatient);
                setOnePatient(foundPatient);
                if (foundPatient && foundPatient.prescriptions.length) {
                    const foundPrescriptions = foundPatient.prescriptions.filter((prescriptions) => prescriptions.active === true);
                    setActivePrescriptions(foundPrescriptions);
                }
            }
        }
    }, []);
  
    const days = ["1", "2", "3", "4", "5", "6,", "7", "8", "9", "10", "11", "12", "13", "14"];

    // For printing PDF
    const pdfRef = useRef();
    const downloadPDF = () => {
        const input = pdfRef.current;
        html2canvas(input).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            // generates a pdf using jdPDF
            const pdf = new jsPDF('p', 'mm', 'a4', true);
            //determines dimensions          
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();
            const imgWidth = canvas.width;
            const imgHeight = canvas.height;
            const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
            const imgX = (pdfWidth - imgWidth * ratio) / 2;
            const imgY = 30;
            //adds the image to the generated pdf
            pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
            pdf.save('dosageHelper.pdf');
        });
    };

    return (
        <div className="py-2 px-2">
            
            <h2>dosageHelper Chart
                <button className="mx-3" type="submit" onClick={downloadPDF}>Download dosageHelper</button>
        
            </h2>
                {currentPatient && oneClient && oneClient.patients && activePrescriptions ? (
                <>
  

    {/* Printable version of dosageHelper           */}
                    <section className="prescr-list overflow-hidden my-2 mx-2 py-2 px-2" ref={pdfRef}>
                        <h4>{onePatient.name} the {onePatient.animal_type}</h4>
                        <h6>Client name: {oneClient?.username}</h6>
                        <table>
                            <thead>
                                <tr>
                                    <td></td>
                                {activePrescriptions.map((item) => (
                                    <th key={item._id} >
                                        <h4>{item.drug.name}</h4>
                                        <p className='field-text'>Strength: <span className='subheading'>{item.drug.strength}</span></p>
                                        <p className='field-text'>Type: <span className='subheading'>{item.drug.type}</span></p> 
                                    </th>
                                ))}
                                </tr>
                            </thead>
                    
                            <tbody>
                                {days.map((day) => (

                                    <tr key={day}>
                                        <td className='subheading'>DAY:
                                            <div className='blank-width'></div>
                                        </td>
                                        {activePrescriptions.map((item) => (
                                        <td key={item._id} className='cell-format'>
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
            </div>
    )
}

export default DosageHelperChartPDF;
