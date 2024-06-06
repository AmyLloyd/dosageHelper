import DosageHelperChartPDF from '../components/DosageHelperChartPDF';
import { useVetContext } from '../utils/GlobalState';
import ReturnButtons from '../components/ReturnButtons';

function DosageHelperPDF() {
    // const [state, dispatch] = useVetContext();
    return (
        <div>
            <h2>dosageHelper Chart</h2>
            {/* <ReturnButtons />        */}
            <DosageHelperChartPDF />        
        </div>
    )
}

export default DosageHelperPDF;