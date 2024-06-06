import { useParams, Link } from 'react-router-dom';
import { useVetContext } from '../../utils/GlobalState';

function ReturnButtons() {
    const [state, dispatch] = useVetContext();

    console.log(state, 'state');

    return (
        <div>
            <button className='button my-2 mx-2'>
                <Link to={`/patients/:${state.currentPatient}`}>Return to Prescription History</Link> 
            </button>
            <button className='button my-2 mx-2'>
                <Link to={`/clients/${state.currentClient}`}>Return to the patient list</Link>
            </button>
        </div>
    );
}

export default ReturnButtons;
