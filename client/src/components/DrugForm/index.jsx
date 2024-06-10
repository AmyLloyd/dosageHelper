import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_DRUG_TO_PRESCRIPTION } from '../../utils/mutations';

function DrugForm() {
    const [formState, setFormState] = useState({ username: '', email:'', password: ''});
    const [addDrugToPrescription, { error }] = useMutation(ADD_DRUG_TO_PRESCRIPTION);

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            const mutationResponse = await addDrugToPrescription({
                variables: {
                    name: formState.name,
                    strength: formState.strength,
                    type: formState.type
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
        <div className = "container-form background-br">
           <h2>Add a new drug</h2>
           <form onSubmit={handleFormSubmit}>
              <div className="my-2">
                <label htmlFor="name">Name: </label>
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
                <label htmlFor="strength">Strength: </label>
                <div>
                  <input 
                  placeholder="strength"
                  name="strength"
                  type="strength"
                  id="strength"
                  onChange={handleChange}
                  />
                </div>
              </div>
              <div className="my-2">
                <label htmlFor="type">Type: </label>
                <div>
                  <input 
                  placeholder="type"
                  name="type"
                  type="type"
                  id="type"
                  onChange={handleChange}
                  />
                </div>
              </div>
              {error ? (
                <div>
                <p className="error-text">Please check new drug details before trying again.</p>
                </div>
              ) : null}
              <div className="flex-row flex-end">
                <button type="submit">Submit</button>
              </div>
            </form>
        </div>
    );
}

export default DrugForm;
