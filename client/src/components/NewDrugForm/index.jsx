import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_DRUG } from '../../utils/mutations';


function NewDrugForm() {
    const [formState, setFormState] = useState({ name: '', strength:'', type: ''});
    const [addDrug, { error }] = useMutation(ADD_DRUG);

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            const mutationResponse = await addDrug({
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
        <div className = "container my-1">
           <h2>Add a new drug</h2>
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
                <label htmlFor="strength">Strength: </label>
                <input 
                placeholder="strength"
                name="strength"
                type="strength"
                id="strength"
                onChange={handleChange}
                />
              </div>
              <div className="flex-row space-between my-2">
                <label htmlFor="type">Type: </label>
                <input 
                placeholder="type"
                name="type"
                type="type"
                id="type"
                onChange={handleChange}
                />
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

export default NewDrugForm;
