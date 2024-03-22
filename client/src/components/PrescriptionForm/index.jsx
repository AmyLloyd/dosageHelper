import { useState } from 'react';
import { useVetContext } from '../../utils/GlobalState';
import { useQuery } from '@apollo/client';
import { useMutation } from '@apollo/client';
import { QUERY_ALL_DRUGS } from '../../utils/queries';
import { ADD_PRESCRIPTION_TO_PATIENT } from '../../utils/mutations';

// import DrugDropdown from '../DrugDropdown';

function PrescriptionForm() {
    const [state, dispatch] = useVetContext();

    const { data } = useQuery(QUERY_ALL_DRUGS);

    const [formState, setFormState] = useState({ 
        drug_id:'',  
        dose_frequency: '', 
        course_length:'',
        number_of_dosages: '', 
        time_of_dosages: [], 
        dosage_notes: '', 
        instructions: ''
    });

    const [addPrescriptionToPatient, { error }] = useMutation(ADD_PRESCRIPTION_TO_PATIENT);

    console.log(formState, "formState");

    const currentPatientId = state.currentPatient;
    // const currentDrugId = state.currentDrug;
   

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            const { newPrescription } = await addPrescriptionToPatient({
                variables: {
                    drug_id: formState.drug_id,
                    dose_frequency: formState.dose_frequency,
                    course_length: formState.course_length,
                    number_of_dosages: formState.number_of_dosages,
                    time_of_dosages: formState.time_of_dosages,
                    dosage_notes: formState.dosage_notes,
                    instructions: formState.instructions,
                    patient_id: currentPatientId
                    },
            });

            // const mutationResponse = await addDrugToPrescription({
            //   variables: {
            //     drug_id: currentDrugId,
            //     prescription_id: newPrescription._id
            //   }
              
            // })
        } catch (e) {
            console.log(e);
        }
    };

    const handleChangeVal = (event) => {
      const { name, value } = event.target;

      setFormState({
        ...formState,
        [name]: [value],
      });
    };

    const handleChangeDropdown = (event) => {
      const selectElement = document.querySelector('#selectDrug');
      const output = selectElement.value;
      const name = selectElement.name;
      document.querySelector('.output').textContent = output;

      setFormState({
        ...formState,
        [name]: output,
      });
    };
    
//     <script type="text/javascript">
//     function getOption() {
//         selectElement = 
//               document.querySelector('#selectDrug');
//         output = selectElement.value;
//         document.querySelector('.output').textContent = output;
//     }
// </script>

    const handleChangeInt = (event) => {
        const numericValue = parseInt(event.target.value, 10);
        const { name } = event.target;

        setFormState({
            ...formState,
            [name]: numericValue,
        });
    };

    const handleCheckboxChange = (event) => {
      const { value } = event.target;
      const selected = [];
      //Stuck here because when pushed onto array it replaces the previous element. Or perhaps it starts a new array each time.
      if(event.target.checked) {
        selected.push(event.target.value);
      }
      console.log(selected, "selected");
      setFormState({
        ...formState,
        time_of_dosages: selected
      })
    };

    return (
        <div className = "container my-1 background-br py-2 px-2">
           <h2>Add a Prescription</h2>
           <form onSubmit={handleFormSubmit}>
              <div> 
                  <label> Chooose a drug 
                          <select id="selectDrug" name="drug_id" placeholder="Search..." onChange={handleChangeDropdown} >
                          {data?.drugs.map((item) => (
                              <option key={item._id} name="drug_id" value={item._id}>{item.name} {item.strength} {item.type}</option>
                          ))}
                          </select>
                  </label>
                  <p>The chosen drug is: 
                    <span className="output"></span>
                  </p>
              </div>
              <div className="flex-row space-between my-2">
                <label htmlFor="dose_frequency">Dose frequency:</label>
                <input 
                placeholder="Take every __ days"
                name="dose_frequency"
                type="number"
                id="dose_frequency"
                onChange={handleChangeInt}
                />
              </div>
              <div className="flex-row space-between my-2">
                <label htmlFor="course_length">Course_length: </label>
                <input 
                placeholder="Enter a number of days"
                name="course_length"
                type="number"
                id="course_length"
                onChange={handleChangeInt}
                />
              </div>
              {/* <div className="flex-row space-between my-2">
                <label htmlFor="number_of_dosages"> Number_of_dosages: </label>
                <input 
                placeholder="How many dosages are required each day?"
                name="number_of_dosages"
                type="number_of_dosages"
                id="number_of_dosages"
                onChange={handleChange}
                />
              </div> */}
              <div className="flex-row space-between my-2">
                <label htmlFor="time_of_dosages">Time_of_dosages: </label>
                <input type="checkbox" value="am" onChange={handleCheckboxChange}/>
                <label htmlFor="am">am</label><br/>
                <input type="checkbox" value="noon" onChange={handleCheckboxChange}/>
                <label htmlFor="noon">noon</label>
                <input type="checkbox" value="pm" onChange={handleCheckboxChange}/>
                <label htmlFor="pm">pm</label>
              </div>
{/* 
                placeholder="am / noon / pm"
                name="time_of_dosages"
                type="time_of_dosages"
                id="time_of_dosages"
                onChange={handleChange}
                /> */}
              
              <div className="flex-row space-between my-2">
                <label htmlFor="dosage_notes">dosage_notes: </label>
                <input 
                placeholder="Are there any special notes for particular doses?"
                name="dosage_notes"
                type="dosage_notes"
                id="dosage_notes"
                onChange={handleChangeVal}
                />
              </div>
              <div className="flex-row space-between my-2">
                <label htmlFor="instructions"> instructions: </label>
                <input 
                placeholder="Overall instructions"
                name="instructions"
                type="instructions"
                id="instructions"
                onChange={handleChangeVal}
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