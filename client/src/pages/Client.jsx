import PatientMenu from "../components/PatientMenu";
import PatientForm from "../components/PatientForm";

const Client = () => {
    return (
        <div className='center'>
           <h2 className='center'>Patients List</h2>         
            <div className="container">   
                <PatientMenu />
                <PatientForm />
            </div>
        </div>

    )
}

export default Client;

