import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { useVetContext } from '../../utils/GlobalState';
import { QUERY_ALL_DRUGS } from '../../utils/queries';
import { UPDATE_CURRENT_DRUG } from '../../utils/actions';

function DrugList() {
    const [state, dispatch] = useVetContext;

    const drugs = useQuery(QUERY_ALL_DRUGS);

    const handleClick = (id) => {
        dispatch({ 
            type: UPDATE_CURRENT_DRUG,
            currentDrug: id,
        });
    };

    return (
        <div>
            <h4>Drugs to choose from:</h4>
            {drugs.map((item) => (
                <div className='card mx-2 my-2'>
                    <p>{item.name}</p>
                    <p>{item.strength}</p>
                    <p>{item.type}</p>            
                    <button key={item._id}
                    onClick={() => {
                        handleclick(item._id);
                    }}>{item.name}</button>
                </div>
            ))}
        </div>
    )
}

export default DrugList;