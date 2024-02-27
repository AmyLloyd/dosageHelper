import { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { useVetContext } from '../../utils/GlobalState';

import { 
    UPDATE_CLIENTS,
    UPDATE_CURRENT_CLIENT,
} from '../../utils/actions';

import { QUERY_MY_CLIENTS } from '../../utils/queries';

function ClientMenu() {
    const [state, dispatch] = useVetContext();

    const { clients } = state;

    const { data: clientData } = useQuery (QUERY_MY_CLIENTS);

    useEffect(() => {
        if(clientData) {
            dispatch({
                type: UPDATE_CLIENTS,
                clients: clientData.clients,
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
            <h2> Choose a Client: </h2>{clients.map((item) => (
                <button 
                key={item._id}
                onClick={() => {
                    handleClick(item._id);
                }}
            >
                {item.username}
            </button>
            ))}
            <button onClick={() => { handleClick('') }}>All</button>
        </div>
    );
}

export default ClientMenu;