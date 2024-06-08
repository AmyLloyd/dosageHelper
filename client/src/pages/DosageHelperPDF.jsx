import DosageHelperChartPDF from '../components/DosageHelperChartPDF';
import { useVetContext } from '../utils/GlobalState';

function DosageHelperPDF() {
    // const [state, dispatch] = useVetContext();
    return (
        <div>
            <DosageHelperChartPDF />        
        </div>
    )
}

export default DosageHelperPDF;