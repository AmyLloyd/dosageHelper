import "./PrescriptionItem.css"

function PrescriptionItem(item) {
    const {
        _id,
        key,
        quantity,
        drug_id,
        drug_name,
        dosage_notes,
        number_of_dosages,
        time_of_dosages,
        dosage_checked_at
    } = item;

    return (
        <tr key={prescription.id}>
            <td>{prescription.id}</td>
            <td>{prescription.created_at}</td>
            <td>{prescription.dose_frequency}</td>
            <td>
                <button 
                type="button"
                onClick={() => {
                    console.log("PrescriptionList.js: Dispatched checked!");
                    return dispatch({ 
                        type: DOSAGE_CHECKED,
                        payload: prescription.dosage_checked_at
                    });
                }}
                >
                    <span role="img" aria-label="delete">
                        ✖️
                    </span>
                </button>
            </td>
        </tr>
    );
        
}

export default PrescriptionItem;