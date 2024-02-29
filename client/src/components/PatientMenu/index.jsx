import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import PatientItem from '../../components/PatientItem';
import { useVetContext } from '../../utils/GlobalState';
import Auth from '../../utils/auth';

import {
    UPDATE_CURRENT_PATIENT,
} from '../../utils/actions';

import { QUERY_MY_CLIENTS } from '../../utils/queries';

import './styles.css'

function PatientMenu() {
    const [state, dispatch] = useVetContext();


    const { id } = useParams();
    // const [currentClient, setCurrentClient] = useState({});

    const { clients } = state;
    console.log(state.clients, 'state.clients');

    console.log(state.currentClient, "state.currentClient");
    //saved in local state
    let [oneClient, setOneClient] = useState();


    useEffect(() => {

        if (clients.length) {

            // setCurrentClient(clients.find((client) => client._id === id));
            oneClient = clients.find((client) => client._id === id)
            setOneClient(oneClient);
            console.log(oneClient);
        }

    }, [clients, id]);
    //Code available here for idb and caching in activity 22.26

    const handleClick = (id) => {
        console.log(id, "id here")
        dispatch({
            type: UPDATE_CURRENT_PATIENT,
            currentPatient: id,
        });
    };

    return (

        <>
            {Auth.loggedIn() ? (
                <div className='center'>
                    {state.currentClient && clients ? (
                        <div>
                            <h3>Here are you patients:</h3>
                            <h6>Animals of {oneClient?.username}</h6>

                            <div className='container flex-row'>
                               
                            {oneClient?.patients?.map((item) => (
                                <div className='card  my-2 mx-2'>
                                    
                                    <div  key={item._id}>
                                        <h3>{item.name}</h3>
                                        <p>{item.condition_description}</p>
                                        <p>{item.animal_type}</p>
                                        <Link to={`/patients/${item._id}`}>
                                            <button 
                                            onClick={() => {
                                            handleClick(item._id);
                                            }}
                                            >
                                                {item.username}
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            ))}
                            </div>
                        </div>
                    ) : null}
                </div>
  
            ):(<h1>You need to be logged in</h1>)
            }

        </>
    );
};

export default PatientMenu;
