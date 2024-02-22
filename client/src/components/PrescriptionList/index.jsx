//import type variables
import {

 } from "../../utils/actions";
 import "./styles.css"

 import { useVetContext } from "../../utils/GlobalState";

 export default function PrescriptionList() {
    const [state, dispatch] = useVetContext();
    console.log(state, "state");

    return (
        <div>
    {/* Need to check defined */}
            {state.prescriptions ? (
                <>
                <section className="prescr-list">
                    <table>
                        <thead>
                            <tr>
                                <th>DRUG NAME</th>
                                <th>DOSE</th>
                                <th>DOSAGE TIME</th>
                                <th>DOSAGE NOTES</th>
                                <th>DOSAGE GIVEN</th>
                            </tr>
                        </thead>

                        <tbody>
                          {/* Access prescriptions from our state object returned from useReducer */}
                          {state.prescriptions.map((prescription) => (
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
                                            type: DRUG_CHECKED,
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
                          ))}
                        </tbody>
                    </table>
                </section>
            </>
            ) : (
              <span> Error... no prescriptions found.</span>  
            )}
        </div>
    );
 }