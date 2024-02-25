import "./styles.css"

function PrescriptionItem(item) {
    const {
        _id,
        key,
        created_at,
        // quantity,
        // dose_frequency,
        // drug,
        // dosage_notes,
        // number_of_dosages,
        // time_of_dosages,
        // dosage_checked_at
    } = item;

    return (
        <div>
            <tr>
                <td>{_id}</td>
                <td>{created_at}</td>
                <td></td>
                <td>
                    <button 
                    type="button"
                    // onClick={() => {
                    //     console.log("PrescriptionList.js: Dispatched checked!");
                    //     return dispatch({ 
                    //         type: DOSAGE_CHECKED,
                    //         payload: dosage_checked_at
                    //     });
                    // }}
                    >
                        <span role="img" aria-label="delete">
                            ✖️
                        </span>
                    </button>
                </td>
            </tr>
        </div>
    );
        
}

export default PrescriptionItem;