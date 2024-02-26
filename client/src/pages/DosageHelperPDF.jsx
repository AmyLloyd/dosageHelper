import { useState } from 'react';
import DosageHelperChart from '../components/DosageHelperChart';
import { Link } from 'react-router-dom';
import { useVetContext } from '../utils/GlobalState';

function DosageHelperPDF() {
    const [state, dispatch] = useVetContext();

    console.log(state.currentClient, "state.currentClient");


    return (
        <div>
            <DosageHelperChart />
            <Link to={`/patients/:${state.currentPatient}`} />

        </div>
    )
}

export default DosageHelperPDF;