import { useEffect, useState, useRef } from 'react';
import { useQuery } from '@apollo/client';
import { useVetContext } from "../../utils/GlobalState";
import { Link } from 'react-router-dom';

//for printing PDF
import React from 'react';
//libraries needed for downloading PDF
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';


import { QUERY_PATIENT_BY_ID } from '../../utils/queries';
// import { UPDATE_PRESCRIPTION } from '../../utils/mutations';

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
        <>
            <button className="btn btn-primary button" type="submit" onClick={downloadPDF}>Download dosageHelper</button>
            {currentPatient && oneClient && oneClient.patients ? (
            <>

{/* Printable version of dosageHelper           */}
                <section className="prescr-list my-2 mx-2 py-2 px-2" ref={pdfRef}>
                    <h4>{onePatient.name} the {onePatient.animal_type}</h4>
                    <h6>Client name: {oneClient?.username}</h6>
                    <table>
                        <thead>
                            <tr>
                                <td></td>
                            {onePatient?.prescriptions?.map((item) => (
                                <th key={item._id} >
                                    <h4>{item.drug.name}</h4>
                                    <p class='field-text'>Strength: <span class='subheading'>{item.drug.strength}</span></p>
                                    <p class='field-text'>Type: <span class='subheading'>{item.drug.type}</span></p> 
                                </th>
                            ))}
                            </tr>
                        </thead>
                
                        <tbody>
                            {days.map((day) => (

                                <tr key={day}>
                                    <td class='subheading'>DAY:
                                        <div class='blank-width'></div>
                                    </td>
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
