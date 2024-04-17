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
        dosage_notes: [], 
        instructions: '',
        quantity:''
    });

    const [addPrescriptionToPatient, { error }] = useMutation(ADD_PRESCRIPTION_TO_PATIENT);

    const currentPatientId = state.currentPatient;
    // const currentDrugId = state.currentDrug;
    console.log(currentPatientId, "currentPatientId");
   

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
          console.log(formState.drug_id, "formState.drug_id");
            const { newPrescription } = await addPrescriptionToPatient({
                variables: {
                    drug_id: formState.drug_id,
                    dose_frequency: formState.dose_frequency,
                    course_length: formState.course_length,
                    number_of_dosages: formState.number_of_dosages,
                    time_of_dosages: formState.time_of_dosages,
                    dosage_notes: formState.dosage_notes,
                    instructions: formState.instructions,
                    quantity: formState.number_of_dosages * (formState.course_length / formState.dose_frequency),
                    patient_id: currentPatientId
                    },

            });

            console.log(newPrescription, "newPrescription");

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
      console.log(event.target, 'event.target');
      const selectElement = document.querySelector('#selectDrug');
      console.log(selectElement, "selectElement");
      const output = selectElement.value;
      console.log(selectElement.value, 'selectElement.value');
      const name = selectElement.name;
      console.log(output, 'output');
      document.querySelector('.output').textContent = output;
      console.log(output, 'output');

      setFormState({
        ...formState,
        [name]: output,
      });
    };

    const handleChangeCheckbox = (event) => {
      console.log(event.target);
      const selected = [];
      const checkboxEl = document.querySelector('#selected');
      const input = checkboxEl.children;

      for (var i=0; i < input.length; i++){
        if (input[i].checked){
          selected.push(input[i].value)
        } 
      }
      console.log(selected.length, "selected.length");

      setFormState({
        ...formState,
        time_of_dosages: selected,
        number_of_dosages: selected.length,
      })
    }

    const handleChangeArray = async (event) => {
     try {
      const data = [];
      const input = event.target.children;
      console.log(input, "input");

      for(var i=0; i < input.length; i++){
        if (input[i].value) {
          data.push(input[i].value)
        }
      }
      console.log(data, 'data');

      setFormState({
        ...formState,
        dosage_notes: data
      });
      console.log(formState, 'formState');
    } catch(e) {
      console.log(e);
    }
  };
      

    const handleChangeInt = (event) => {
      const numericValue = parseInt(event.target.value, 10);
      const { name } = event.target;

      setFormState({
          ...formState,
          [name]: numericValue,
      });

  };

    return (
        <div className = "container-form background-br mx-2 my-2 px-2 py-2">
           <h2>Add a Prescription</h2>
           <form onSubmit={handleFormSubmit}>
              <div> 
                  <label> Choose a drug 
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
                <label htmlFor="course_length">Course length: </label>
                <input 
                placeholder="Enter a number of days"
                name="course_length"
                type="number"
                id="course_length"
                onChange={handleChangeInt}
                />
              </div>

              <div className="flex-row space-between my-2" id="selected" onChange={handleChangeCheckbox}>
                <label htmlFor="time_of_dosages">Time of dosages: </label>
                <input type="checkbox" value="am"/>
                <label htmlFor="am">am</label><br/>
                <input type="checkbox" value="noon"/>
                <label htmlFor="noon">noon</label>
                <input type="checkbox" value="pm"/>
                <label htmlFor="pm">pm</label>
              </div>

              <div className="flex-row space-between my-2" onChange={handleChangeArray}>
                <label htmlFor="dosage_notes">Dosage notes: </label>
                <label htmlFor="am">am</label><br/>
                <input type="text" placeholder="am notes"/>
                <label htmlFor="noon">noon</label>
                <input type="text" placeholder="noon notes"/>
                <label htmlFor="pm">pm</label>
                <input type="text" placeholder="pm notes"/>
              </div>
              <div className="flex-row space-between my-2">
                <label htmlFor="instructions"> Instructions: </label>
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