import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { useVetContext } from '../../utils/GlobalState';
import { QUERY_ALL_DRUGS } from '../../utils/queries';
import { UPDATE_CURRENT_DRUG } from '../../utils/actions';

function DrugDropdown() {
    const [state, dispatch] = useVetContext();

    const { data } = useQuery(QUERY_ALL_DRUGS);

    console.log(data, "data");

    const handleClick = (id) => {
        dispatch({ 
            type: UPDATE_CURRENT_DRUG,
            currentDrug: id,
        });
    };

    return (
            <div> 
                <label> Chooose a drug 
                    
                        <select >
                        {data?.drugs.map((item) => (
                            <option key={item._id} value="{item._id}">{item.name} {item.strength} {item.type}</option>
                        ))}
                        </select>

                 
                </label>
            </div>
    )
}

export default DrugDropdown;