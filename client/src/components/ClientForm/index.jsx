import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_CLIENT_TO_VET } from '../../utils/mutations';
import { QUERY_MY_CLIENTS } from '../../utils/queries';

function ClientForm() {
    const [formState, setFormState] = useState({ username: '', email:'', password: ''});
    const [addClientToVet, { error }] = useMutation(ADD_CLIENT_TO_VET, { refetchQueries: [
      QUERY_MY_CLIENTS, 'myClients']}
    );

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
            setFormState({ username: '', email: '', password: '' });
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
        <div>
          <div className = "container-form background-br">
          <h5>Add a Client</h5>
           <form onSubmit={handleFormSubmit}>
            <div className="flex-container">
              <div className="my-2">
                <label htmlFor="username">Username</label>
                <div>
                  <input 
                  placeholder="username"
                  name="username"
                  type="username"
                  value={formState.username}
                  id="username"
                  onChange={handleChange}
                  />
                </div>
              </div>
              <div className="my-2">
                <label htmlFor="email">Email address </label>
                <div>
                  <input 
                  placeholder="newclient@text.com"
                  name="email"
                  type="email"
                  value={formState.email}
                  id="email"
                  onChange={handleChange}
                  />
                </div>
              </div>
              <div className="my-2">
                <label htmlFor="password">Password</label>
                <div>
                <input 
                placeholder="*****"
                name="password"
                type="password"
                value={formState.password}
                id="pwd"
                onChange={handleChange}
                />
                </div>
              </div>
            </div>
              {error ? (
                <div>
                <p className="error-text">Please check new client credentials and try again.</p>
                </div>
              ) : null}
              <div>
                <button type="submit" className="center-a">Submit</button>
              </div>
            </form>
        </div>
      </div>
           
    );
}

export default ClientForm;
