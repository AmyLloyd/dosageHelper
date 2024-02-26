import DrugList from '../components/DrugList';

import PrescriptionForm from '../components/PrescriptionForm';

function Prescription() {
    
    return (
        <div>
            <h2>Create a new prescription for the current client</h2>
            <DrugList />
            <PrescriptionForm />
        </div>
    )
}

export default Prescription;