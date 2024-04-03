import DrugList from '../components/DrugList';

import PrescriptionForm from '../components/PrescriptionForm';

function Prescription() {
    
    return (
        <div >
            <h2>Create a new prescription</h2>
            <div className='flex-row center'>
                    <PrescriptionForm />
           </div>

            
        </div>
    )
}

export default Prescription;