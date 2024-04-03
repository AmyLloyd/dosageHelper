import PatientMenu from "../components/PatientMenu";
import PatientForm from "../components/PatientForm";

const Client = () => {
    return (
        <div className='center-a'>
           {/* <h2 className='center'>Patients List</h2>          */}
            <div className='flex-row center'>
                <div className="container">   
                    <PatientMenu />
                </div>
                <div className='sidebar'>
                    <PatientForm />
                </div>
            </div>
        </div>

    )
}


export default Client;

