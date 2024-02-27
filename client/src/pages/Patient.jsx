import PrescriptionList from "../components/PrescriptionList";
import PrescriptionForm from "../components/PrescriptionForm";
import DrugList from "../components/DrugList";

function Patient() {
    
    


    return (
        <div className='center'>
            <h1>Your patients:</h1>
            <PrescriptionList />

        </div>
    )
}

export default Patient;