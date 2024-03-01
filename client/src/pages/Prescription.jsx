import DrugList from '../components/DrugList';

import PrescriptionForm from '../components/PrescriptionForm';

function Prescription() {
    
    return (
        <div >
            <h2>Create a new prescription for the current client</h2>
            <div className='flex-row'>
                <div className="flex-item">
                    <DrugList />
                </div>
                <div className='flex-item'>
                    <PrescriptionForm />
                </div>
           </div>

            
        </div>
    )
}

export default Prescription;