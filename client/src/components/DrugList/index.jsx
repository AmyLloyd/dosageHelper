import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { useVetContext } from '../../utils/GlobalState';
import { QUERY_ALL_DRUGS } from '../../utils/queries';
import { UPDATE_CURRENT_DRUG } from '../../utils/actions';

function DrugList() {
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
            <h2>Drug data </h2>
            <div className='container'>
            <table>
                <thead>
                    <tr>
                        <th>DRUG ID</th>
                        <th>DRUG NAME </th>
                        <th>DRUG STRENGTH</th>
                        <th>DRUG TYPE</th>
                    </tr>
                </thead>
                <tbody>
                {data?.drugs.map((item) => (
                    <tr key={item._id}>
                        <td>{item._id}</td>
                        <td>{item.name}</td>        
                        <td>{item.strength}</td>
                        <td>{item.type}</td>  
                    </tr>
                ))}

                </tbody>
            </table>
            </div>
        </div>
    )
}

export default DrugList;