import PrescriptionList from "../components/PrescriptionList";
import PrescriptionForm from "../components/PrescriptionForm";

function Patient() {
    return (
        <div className='center-a'>
         <div className='flex-row center'>
             <div className="container">   
                 <PrescriptionList />
             </div>
             <div className='sidebar'>
                 <PrescriptionForm />
             </div>
         </div>
     </div>
    )
}
export default Patient;