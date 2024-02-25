import { useState } from 'react';
// import { UPDATE_CLIENTS } from '../../utils/actions';
// import { useVetContext } from '../../utils/GlobalState';
import { useMutation } from '@apollo/client';
import { ADD_CLIENT_TO_VET } from '../../utils/mutations';

function ClientForm() {
    const [formState, setFormState] = useState({ username: '', email:'', password: ''});
    const [addClientToVet, { error }] = useMutation(ADD_CLIENT_TO_VET);

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            const mutationResponse = await addClientToVet({
                variables: {
                    username: formState.username,
                    email: formState.email,
                    password: formState.password
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
           <h2>Add a Client</h2>
           <form onSubmit={handleFormSubmit}>
              <div className="flex-row space-between my-2">
                <label htmlFor="username">Username: </label>
                <input 
                placeholder="username"
                name="username"
                type="username"
                id="username"
                onChange={handleChange}
                />
              </div>
              <div className="flex-row space-between my-2">
                <label htmlFor="email">Email address: </label>
                <input 
                placeholder="newclient@text.com"
                name="email"
                type="email"
                id="email"
                onChange={handleChange}
                />
              </div>
              <div className="flex-row space-between my-2">
                <label htmlFor="password">Password: </label>
                <input 
                placeholder="*****"
                name="password"
                type="password"
                id="pwd"
                onChange={handleChange}
                />
              </div>
              {error ? (
                <div>
                <p className="error-text">Please check new client credentials and try again.</p>
                </div>
              ) : null}
              <div className="flex-row flex-end">
                <button type="submit">Submit</button>
              </div>
            </form>
        </div>
    );
}

export default ClientForm;
