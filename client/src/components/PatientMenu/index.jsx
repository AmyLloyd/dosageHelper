import { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { useVetContext } from '../../utils/GlobalState';
import {
    UPDATE_PATIENTS,
    UPDATE_CURRENT_PATIENT,
} from '../../utils/actions';
import { QUERY_PATIENT_BY_ID } from '../../utils/queries';
import './PatientMenu.css';

function PatientMenu() {
    const [state, dispatch] = useVetContext();

    const { patients } = state;

    const { data: patientData } = useQuery(QUERY_PATIENT_BY_ID);

    useEffect(() => {
        if (patientData) {
            dispatch({
                type: UPDATE_PATIENTS,
                patients: patientData.patients
            });
        }
    }, [patientData, dispatch]); 

    const handleClick = (id) => {
        dispatch({
            type:UPDATE_CURRENT_PATIENT,
            currentPatient: id, 
        });
    };

    return (
        <div>
            <h2>Choose a Patient:</h2>
            {patients.map((item) => (
                <button
                    key={item._id}
                    onClick={() => {
                        handleClick(item._id);
                    }}
                >
                    {item.name}
                </button>
            ))}
            <button onClick={() => { handleClick('') }}>All</button>
        </div>
    );
}

export default PatientMenu;