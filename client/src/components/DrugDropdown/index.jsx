import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { useVetContext } from '../../utils/GlobalState';
import { QUERY_ALL_DRUGS } from '../../utils/queries';
import { UPDATE_CURRENT_DRUG } from '../../utils/actions';

function DrugDropdown() {
    const [state, dispatch] = useVetContext();

    const [formState, setFormState] = useState({ 
        drug_id: '', 
    });

    console.log(formState, "formState");

    const { data } = useQuery(QUERY_ALL_DRUGS);

    // console.log(data, "data");

    // const handleClick = (id) => {
    //     dispatch({ 
    //         type: UPDATE_CURRENT_DRUG,
    //         currentDrug: id,
    //     });
    // };

    const handleChange = (event) => {
        const numericValue = parseInt(event.target.value, 10);
        const { name } = event.target;

        setFormState({
            ...formState,
            [name]: numericValue,
        });
    };

    return (
        <div> 
        <label> Chooose a drug 
                <select name="drug_id" placeholder="Choose name" onChange={handleChange} >
                {data?.drugs.map((item) => (
                    <option key={item._id} value={item.name}>{item.name} {item.strength} {item.type}</option>
                ))}
                </select>
        </label>

    </div>

    )
}

export default DrugDropdown;