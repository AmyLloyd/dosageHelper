import { useState, useEffect } from 'react';
import { useVetContext } from '../../utils/GlobalState';
import { useMutation } from '@apollo/client';
import { ADD_PATIENT_TO_CLIENT } from '../../utils/mutations';
import { QUERY_MY_CLIENTS } from '../../utils/queries';
import { useQuery } from '@apollo/client';
import { UPDATE_CLIENTS } from '../../utils/actions';


function PatientForm() {
    const [state, dispatch] = useVetContext();
    const [formState, setFormState] = useState({ name: '', animal_type:'', condition_description: ''});
    const [addPatientToClient, { error }] = useMutation( ADD_PATIENT_TO_CLIENT );
    
    const id = state.currentClient;
   
    const { clients } = state;

    const { data: clientData } = useQuery (QUERY_MY_CLIENTS);


    useEffect(() => {
        if(clientData) {
            dispatch({
                type: UPDATE_CLIENTS,

                clients: clientData.myClients.clients

            });
        }
    }, [clientData, dispatch]);

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
            await updatePage();
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
        <div className = "background-br py-2 px-2">
           <h2>Add a Patient</h2>
           <form onSubmit={handleFormSubmit}>
              <div className="my-2">
                <label htmlFor="name">Name</label>
                <div>
                    <input 
                    placeholder="name"
                    name="name"
                    type="name"
                    id="name"
                    onChange={handleChange}
                    />
                </div>
              </div>
              <div className="my-2">
                <label htmlFor="animal_type">Animal Type</label>
                <div>
                    <input 
                    placeholder="animal type"
                    name="animal_type"
                    type="animal_type"
                    id="animal_type"
                    onChange={handleChange}
                    />
                </div>
              </div>
              <div className="my-2">
                <label htmlFor="condition_description">Condition Description: </label>
                <div>
                    <input 
                    placeholder="condition description"
                    name="condition_description"
                    type="condition_description"
                    id="condition_description"
                    onChange={handleChange}
                    />
                </div>

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
