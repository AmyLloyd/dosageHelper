import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { useMutation } from '@apollo/client';

import { useVetContext } from '../../utils/GlobalState';
import { QUERY_ALL_DRUGS } from '../../utils/queries';
import { REMOVE_DRUG } from '../../utils/mutations';
import { UPDATE_CURRENT_DRUG } from '../../utils/actions';



function DrugList() {
    const [state, dispatch] = useVetContext();

    const { data } = useQuery(QUERY_ALL_DRUGS);

    console.log(data, "data");

    const [removeDrugMutation, { error }] = useMutation(REMOVE_DRUG);

    //removeDrug
    const handleRemoveDrug = async (drugId) => {
        try {
          const { data } = await removeDrugMutation({ variables: { drugId } });
          console.log('Drug removed:', data.removeDrug);
          // Optionally, you can update your UI or perform other actions after successful deletion
        } catch (error) {
          console.error('Error removing drug:', error);
          // Optionally, handle errors or show error messages to the user
        }
      };

    // const handleClick = (id) => {
    //     dispatch({ 
    //         type: UPDATE_CURRENT_DRUG,
    //         currentDrug: id,
    //     });
    // };

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
                        <td>
                            <button onClick={() => handleRemoveDrug(item._id)}>Remove Drug</button>
                        </td>
                    </tr>
                ))}

                </tbody>
            </table>
            </div>
        </div>
    )
}

export default DrugList;