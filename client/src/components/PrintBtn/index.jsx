import React from 'react';
import { useRef } from 'react';
//libraries needed for downloading PDF
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export default function PrintBtn() {
    const pdfRef = useRef();
    const downloadPDF = () => {
      const input = pdfRef.current;
      html2canvas(input).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        {/*generates a pdf using jdPDF*/}
        const pdf = new jsPDF('p', 'mm', 'a4', true);
        // determines dimensions
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const imgWidth = canvas.width;
        const imgHeight = canvas.height;
        const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
        const imgX = (pdfWidth - imgWidth * ratio) / 2;
        const imgY = 30;
        //adds the image to the generated pdf
        pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
        pdf.save('resume.pdf');
      });
    };
    return (
      <>
        <div className="container" ref={pdfRef}>
          <h2 >Resume</h2>
          <div className="row text-start mt-3"> 
            <div className="col-sm-6"> 
              <h4> Front-end Proficiencies</h4>
              <ul>
                <li>HTML</li>
                <li>CSS</li>
                <li>Javascript</li>
                <li>JQuery</li>
                <li>responsive design</li>
                <li>React</li>
                <li>Bootstrap</li>
              </ul>
            </div>
            <div className="col-sm-6">  
              <h4>Back-end Proficiencies</h4>
              <ul>
                <li>APIs</li>
                <li>Node</li>
                <li>Express.js</li>
                <li>MySQL, Sequelize</li>
                <li>MongoDB, Mongoose</li>
                <li>GraphQL</li>
              </ul>
            </div>
          </div>
        </div>
        <button className="btn btn-primary button" type="submit" onClick={downloadPDF}>Download Resume</button>
      </>
      
    );
  }