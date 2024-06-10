import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useVetContext } from '../../utils/GlobalState';
import Auth from '../../utils/auth';
import { UPDATE_CURRENT_PATIENT } from '../../utils/actions';
import './styles.css'

function PatientMenu() {
    const [state, dispatch] = useVetContext();
    const { id } = useParams();
    // const [currentClient, setCurrentClient] = useState({});

    const { clients } = state;

    //saved in local state
    let [oneClient, setOneClient] = useState();

    useEffect(() => {

        if (clients.length) {

            // setCurrentClient(clients.find((client) => client._id === id));
            oneClient = clients.find((client) => client._id === id)
            setOneClient(oneClient);
        }

    }, [clients, id]);
    //Code available here for idb and caching in activity 22.26

    const handleClick = (id) => {
        dispatch({
            type: UPDATE_CURRENT_PATIENT,
            currentPatient: id,
        });
    };

    return (
        <>
            <div className="container-list">
            {Auth.loggedIn() ? (
                <div className='center'>
                    {state.currentClient && clients ? (
                        <div>
                            
                            <h2>{oneClient?.username}'s animals</h2>

                            <div className='flex-row'>
                               
                            {oneClient?.patients?.map((item) => (
                                <div key={item._id} className='card mx-1 my-1'>
                                
                                        <h4>{item.name}</h4>
                                        <p><span className='field-text' >Animal type:</span>    {item.animal_type}</p>
                                        <p><span className='field-text' >Condition:</span>    {item.condition_description}</p>
                                        <Link to={`/patients/${item._id}`}>
                                            <button 
                                            onClick={() => {
                                            handleClick(item._id);
                                            }}
                                            >
                                                See {item.name}'s prescriptions
                                            </button>
                                        </Link>
            
                                </div>
                            ))}
                            </div>
                        </div>
                    ) : null}
                </div>
  
            ):(<h2>You need to be logged in</h2>)
            }
            </div>
        </>
    );
};

export default PatientMenu;
