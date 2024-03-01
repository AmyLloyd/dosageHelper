import { useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { useVetContext } from '../../utils/GlobalState';
import { REMOVE_CLIENT } from '../../utils/mutations';
import { Link } from 'react-router-dom';
import { 
    UPDATE_CLIENTS,
    UPDATE_CURRENT_CLIENT,
} from '../../utils/actions';

import { QUERY_MY_CLIENTS } from '../../utils/queries';


import './styles.css';


function ClientMenu() {
    const [state, dispatch] = useVetContext();

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

    const handleClick = (id) => {
        dispatch({ 
            type: UPDATE_CURRENT_CLIENT,
            currentClient: id,
        });
    };

    const [removeClient, { error }] = useMutation
    (REMOVE_CLIENT, {
        refetchQueries: [
            QUERY_MY_CLIENTS, 'myclients'
        ]
    });

    const handleRemoveClient = async (client) => {
        try {
            const { data } = await removeClient({
                variables: { skill },
            });
        } catch (err) {
            console.error(err);
        }
    };

    if(!clients.length) {
        return <h4> No clients yet</h4>;
    }



    return (
  

                    <div className='container flex-row py-2 px-2'>


            <h2> Choose a Client: </h2>
                    <div className='card'>

                        {clients.map((item) => (
                                <div className='my-2 mx-2 flex-item'
                                key={item._id}>
                                    <Link to={`/clients/${item._id}`}>
                                        <button
                                            
                                            onClick={() => {
                                                handleClick(item._id);
                                            }}
                                        >
                                            {item.username}
                                        </button>
                                    </Link>
                                </div>
                        ))}
                    <div>
                </div>
            </div>

        </div>
    );
}

export default ClientMenu;