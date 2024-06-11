import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_DRUG } from '../../utils/mutations';
import { QUERY_ALL_DRUGS } from '../../utils/queries';

function NewDrugForm() {
    const [formState, setFormState] = useState({ name: '', strength:'', type: ''});
    const [addDrug, { error }] = useMutation(ADD_DRUG, { refetchQueries: [ QUERY_ALL_DRUGS, 'drugs' ]} );

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
            setFormState({ name: '', strength: '', type: '' });
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
        <div className = "container-form background-br mx-2">
          <h5>Add new drug</h5>
           <form onSubmit={handleFormSubmit}>
            <div className="flex-container">
              <div className="my-2">
                <label htmlFor="name">Name: </label>
                <div>
                  <input 
                  placeholder="name"
                  name="name"
                  type="name"
                  value={formState.name}
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
                  value={formState.strength}
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
                  value={formState.type}
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
            </div>
              <div className="flex-row flex-end">
                <button type="submit" value="submit">Submit</button>
              </div>
            </form>
        </div>
    );
}

export default NewDrugForm;
