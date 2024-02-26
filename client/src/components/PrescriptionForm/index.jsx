import { useState } from 'react';
import { useVetContext } from '../../utils/GlobalState';
import { useMutation } from '@apollo/client';
import { ADD_PRESCRIPTION_TO_PATIENT } from '../../utils/mutations';


function PrescriptionForm() {
    const [state, dispatch] = useVetContext();

    const [formState, setFormState] = useState({ 
        dose_frequency: '', 
        course_length:'',
        number_of_dosages: '', 
        time_of_dosages: '', 
        dosage_notes: '', 
        instructions: ''
    });

    const [addPrescriptionToPatient, { error }] = useMutation(ADD_PRESCRIPTION_TO_PATIENT);

    console.log(state, "state");

    const currentPatientId = state.currentPatient;
    const currentDrugId = state.currentDrug;
   

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            const newPrescription = await addPrescriptionToPatient({
                variables: {
                    dose_frequency: formState.dose_frequency,
                    course_length: formState.course_length,
                    number_of_dosages: formState.number_of_dosages,
                    time_of_dosages: formState.time_of_dosages,
                    dosage_notes: formState.dosage_notes,
                    instructions: formState.instructions,
                    patient_id: currentPatientId
                    },
            });

            const mutationResponse = await addDrugToPrescription({
              variables: {
                drug_id: currentDrugId,
                prescription_id:newPrescription._id
              }
              
            })
        } catch (e) {
            console.log(e);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState({
            ...formState,
            [name]: value,
        });
    };

    return (
        <div className = "container my-1">
           <h2>Add a Prescription</h2>
           <form onSubmit={handleFormSubmit}>
              <div className="flex-row space-between my-2">
                <label htmlFor="dose_frequency">Dose frequency:</label>
                <input 
                placeholder="Take every __ days (digit)"
                name="dose_frequency"
                type="dose_frequency"
                id="dose_frequency"
                onChange={handleChange}
                />
              </div>
              <div className="flex-row space-between my-2">
                <label htmlFor="course_length">Course_length: </label>
                <input 
                placeholder="Enter a number of days (digit)"
                name="course_length"
                type="course_length"
                id="course_length"
                onChange={handleChange}
                />
              </div>
              <div className="flex-row space-between my-2">
                <label htmlFor="number_of_dosages"> number_of_dosages: </label>
                <input 
                placeholder="How many dosages are required each day?"
                name="number_of_dosages"
                type="number_of_dosages"
                id="number_of_dosages"
                onChange={handleChange}
                />
              </div>
              <div className="flex-row space-between my-2">
                <label htmlFor="time_of_dosages">Time_of_dosages: </label>
                <input 
                placeholder="am / noon / pm"
                name="time_of_dosages"
                type="time_of_dosages"
                id="time_of_dosages"
                onChange={handleChange}
                />
              </div>
              <div className="flex-row space-between my-2">
                <label htmlFor="dosage_notes">dosage_notes: </label>
                <input 
                placeholder="Are there any special notes for particular doses?"
                name="dosage_notes"
                type="dosage_notes"
                id="dosage_notes"
                onChange={handleChange}
                />
              </div>
              <div className="flex-row space-between my-2">
                <label htmlFor="instructions"> instructions: </label>
                <input 
                placeholder="Overall instructions"
                name="instructions"
                type="instructions"
                id="instructions"
                onChange={handleChange}
                />
              </div>
              {error ? (
                <div>
                <p className="error-text">Please check new prescription details and try again.</p>
                </div>
              ) : null}
              <div className="flex-row flex-end">
                <button type="submit">Submit</button>
              </div>
            </form>
        </div>
    );
}

export default PrescriptionForm;
