import { useState } from 'react';
import DosageHelperChartPDF from '../components/DosageHelperChartPDF';
import { Link } from 'react-router-dom';
import { useVetContext } from '../utils/GlobalState';


function DosageHelperPDF() {
    const [state, dispatch] = useVetContext();

    console.log(state.currentClient, "state.currentClient");


    return (
        <div>
            <h2>dosageHelper Chart</h2>
            <DosageHelperChartPDF />        

            <Link to={`/patients/:${state.currentPatient}`} />

        </div>
    )
}

export default DosageHelperPDF;