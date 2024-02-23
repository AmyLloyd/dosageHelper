import { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { useVetContext } from '../../utils/GlobalState';
import ClientItem  from '../ClientItem';

import { 
    UPDATE_CLIENTS,
    UPDATE_CURRENT_CLIENT,
} from '../../utils/actions';

import { QUERY_MY_CLIENTS } from '../../utils/queries';

import './ClientMenu.css';

function ClientMenu() {
    const [state, dispatch] = useVetContext();

    const { clients } = state;
    console.log(clients, 'clients');


    const { data: clientData } = useQuery (QUERY_MY_CLIENTS);
 

    useEffect(() => {
        if(clientData) {
            dispatch({
                type: UPDATE_CLIENTS,
                clients: clientData.myClients.clients,
            });
        }
    }, [clientData, dispatch]);

    const handleClick = (id) => {
        dispatch({ 
            type: UPDATE_CURRENT_CLIENT,
            currentClient: id,
        });
    };

    return (
        <div> 
            <h2> Choose a Client: </h2>
            {clients.map((item) => (
                
                    <ClientItem 
                        key={item._id}
                        _id={item._id}
                        onClick={() => {
                        handleClick(item._id);
                        }}                       
                        username={item.username}
                        email={item.email}
                    />
                      ))}
            <button onClick={() => { handleClick('') }}>All</button>
        </div>
    );
}

export default ClientMenu;