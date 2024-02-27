import PrescriptionList from "../components/PrescriptionList";
import PrescriptionForm from "../components/PrescriptionForm";
import DrugList from "../components/DrugList";

function Patient() {
    
    


    return (
        <div className='center'>
            <h2>Your prescriptions:</h2>
            <PrescriptionList />

        </div>
    )
}

export default Patient;