import PrescriptionList from "../components/PrescriptionList";

import PrescriptionForm from "../components/PrescriptionForm";
import DrugList from "../components/DrugList";

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

        // <div>
        //     <div className='center px-2 py-2'>
        //         <PrescriptionList />
        //     </div>
        //     <div className='flex-row center'>
        //             <PrescriptionForm />
        //     </div>
        // </div>

    )
}

export default Patient;