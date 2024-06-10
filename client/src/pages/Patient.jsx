import PrescriptionList from "../components/PrescriptionList";
import PrescriptionForm from "../components/PrescriptionForm";

function Patient() {
    return (
         <div className='row'>
             <div className='column left'>   
                 <PrescriptionList />
             </div>
             <div className='column side'>
                 <PrescriptionForm />
             </div>
         </div>
    )
}
export default Patient;