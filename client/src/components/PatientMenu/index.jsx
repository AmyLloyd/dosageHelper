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
                            
                            <h3>{oneClient?.username}'s animals</h3>

                            <div className='container flex-row'>
                               
                            {oneClient?.patients?.map((item) => (
                                <div key={item._id} className='card  my-2 mx-2'>
                                
                                        <h3><span className='field-text' > Name: </span>    {item.name}</h3>
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
  
            ):(<h1>You need to be logged in</h1>)
            }

        </>
    );
};

export default PatientMenu;
