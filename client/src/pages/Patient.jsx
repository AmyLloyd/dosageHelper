import PrescriptionList from "../components/PrescriptionList";
import PrescriptionForm from "../components/PrescriptionForm";
import DrugList from "../components/DrugList";

function Patient() {
    
    


    return (
        <div>
            <PrescriptionList />
            <DrugList />
            <PrescriptionForm />
        </div>
    )
}

export default Patient;