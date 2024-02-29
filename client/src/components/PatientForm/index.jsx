import { useState } from 'react';
import { useVetContext } from '../../utils/GlobalState';
import { useMutation } from '@apollo/client';
import { ADD_PATIENT_TO_CLIENT } from '../../utils/mutations';


function PatientForm() {
    const [state, dispatch] = useVetContext();

    console.log(state.currentClient, "state.currentClient");

    const [formState, setFormState] = useState({ name: '', animal_type:'', condition_description: ''});
    const [addPatientToClient, { error }] = useMutation(ADD_PATIENT_TO_CLIENT);
    const id = state.currentClient;
   

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            const mutationResponse = await addPatientToClient({
                variables: {
                    name: formState.name,
                    animal_type: formState.animal_type,
                    condition_description: formState.condition_description,
                    client_id: id
                    },
            });
        } catch (e) {
            console.log(e);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState({
            ...formState,
            [name]: value,
        });
    };

    return (
        <div className = "container my-1 background-br py-2 px-2">
           <h2>Add a Patient</h2>
           <form onSubmit={handleFormSubmit}>
              <div className="flex-row space-between my-2">
                <label htmlFor="name">Name: </label>
                <input 
                placeholder="name"
                name="name"
                type="name"
                id="name"
                onChange={handleChange}
                />
              </div>
              <div className="flex-row space-between my-2">
                <label htmlFor="animal_type">Animal Type: </label>
                <input 
                placeholder="animal type"
                name="animal_type"
                type="animal_type"
                id="animal_type"
                onChange={handleChange}
                />
              </div>
              <div className="flex-row space-between my-2">
                <label htmlFor="condition_description">Condition Description: </label>
                <input 
                placeholder="condition description"
                name="condition_description"
                type="condition_description"
                id="condition_description"
                onChange={handleChange}
                />
              </div>
              {error ? (
                <div>
                <p className="error-text">Please check new patient credentials and try again.</p>
                </div>
              ) : null}
              <div className="flex-row flex-end">
                <button type="submit">Submit</button>
              </div>
            </form>
        </div>
    );
}

export default PatientForm;
