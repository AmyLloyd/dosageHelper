import PatientMenu from "../components/PatientMenu";
import PatientForm from "../components/PatientForm";

function Client () {
    return (
        <div className='row'>
                <div className='column left'>   
                    <PatientMenu />
                </div>
                <div className='column side'>
                    <PatientForm />
                </div>
        </div>
    )
}

export default Client;

