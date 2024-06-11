import { useState, useEffect } from 'react';
import { useVetContext } from '../../utils/GlobalState';
import { useQuery } from '@apollo/client';
import { useMutation } from '@apollo/client';
import { QUERY_ALL_DRUGS } from '../../utils/queries';
import { QUERY_MY_CLIENTS } from '../../utils/queries';
import { ADD_PRESCRIPTION_TO_PATIENT } from '../../utils/mutations';
import { UPDATE_CLIENTS } from '../../utils/actions';

function PrescriptionForm() {
  const [state, dispatch] = useVetContext();
    const [formState, setFormState] = useState({ 
        drug_id:'',  
        dose_frequency: 0, 
        course_length:0,
        number_of_dosages: 0, 
        time_of_dosages: [], 
        dosage_notes: [], 
        instructions: '',
        quantity:0,
        active:true,
        created_at:new Date(),
    });

    const { data: drugs } = useQuery(QUERY_ALL_DRUGS);
    const [addPrescriptionToPatient, { error }] = useMutation(ADD_PRESCRIPTION_TO_PATIENT,  { refetchQueries: [
      QUERY_MY_CLIENTS, 'myClients']}
    );
    const currentPatientId = state.currentPatient; 
    // const currentPatientId = useVetContext().state.currentPatient; 

    const { data: clientData } = useQuery (QUERY_MY_CLIENTS);

    useEffect(() => {
      if(clientData) {
        dispatch({
          type: UPDATE_CLIENTS,
          clients: clientData.myClients.clients
        });
      }
    }, [clientData, dispatch])

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {         
            const mutationResponse = await addPrescriptionToPatient({
                variables: {
                    drug_id: formState.drug_id,
                    dose_frequency: formState.dose_frequency,
                    course_length: formState.course_length,
                    number_of_dosages: formState.number_of_dosages,
                    time_of_dosages: formState.time_of_dosages,
                    dosage_notes: formState.dosage_notes,
                    instructions: formState.instructions,
                    quantity: formState.number_of_dosages,
                    patient_id: currentPatientId
                    },     
            });
        } catch (e) {
            console.log(e);
        }
    };

    const handleChangeVal = (event) => {
      const { name, value } = event.target;
      setFormState({
        ...formState,
        [name]: value,
      });
    };

    const handleChangeDropdown = (event) => {
      const selectElement = document.querySelector('#selectDrug');
      const output = selectElement.value;
      const name = selectElement.name;
      setFormState({
        ...formState,
        [name]: output,
      });
    };

    const handleChangeCheckbox = (event) => {
      const selected = [];
      const checkboxEl = document.querySelector('#selected');
      const input = checkboxEl.children;
      for (var i=0; i < input.length; i++){
        if (input[i].checked){
          selected.push(input[i].value)
        } 
      }
      setFormState({
        ...formState,
        time_of_dosages: selected,
        number_of_dosages: selected.length,
      })
    }

    const handleChangeArray = async (event) => {
     try {
      const data = [];
      const inputEl = document.querySelector('#input');
      const input = inputEl.children;
      for(var i = 0; i < input.length; i++){
        if(input[i].value){
          data.push(input[i].value)
        }
      }     
      setFormState({
        ...formState,
        dosage_notes: data
      });
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
        <div>
          <div className = "container-form background-br max-width">
           <h5>Add a Prescription</h5>
           <form onSubmit={handleFormSubmit}>
            <div className="flex-container">
            <div className="flex-row space-between my-2"> 
                  <label> Choose a drug 
                          <select id="selectDrug" name="drug_id" placeholder="Search..." onChange={handleChangeDropdown} >
                          {drugs?.drugs.map((item) => (
                              <option key={item._id} name="drug_id" placeholder="Drug name" value={item._id}>{item.name} {item.strength} {item.type}</option>
                          ))}
                          </select>
                  </label>
              </div>
              <div className="flex-row space-between my-2">
                <label htmlFor="dose_frequency">Dose frequency (1-7 days):</label>
                <input 
                placeholder=""
                name="dose_frequency"
                type="number"
                id="dose_frequency"
                min="1"
                max="7"
                onChange={handleChangeInt}
                />
              </div>
              <div className="flex-row space-between my-2">
                <label htmlFor="course_length">Course length (1-93 days): </label>
                <input 
                placeholder=""
                name="course_length"
                type="number"
                id="course_length"
                min="1"
                max="93"
                onChange={handleChangeInt}
                />
              </div>

              <div className="flex-row space-between my-2">
                <label htmlFor="course_length">Doses per day (1-3):</label>
                <input 
                placeholder=""
                name="number_of_dosages"
                type="number"
                min="1"
                max="3"
                id="number_of_dosages"
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
              <div className="my-2" onChange={handleChangeArray} id='input'>
                <label htmlFor="dosage_notes">Dosage notes: </label>
                <div>
                  <label htmlFor="am">am</label><br/>
                  <input type="text" placeholder="am notes"/><br/>
                  <label htmlFor="noon">noon</label><br/>
                  <input type="text" placeholder="noon notes"/><br/>
                  <label htmlFor="pm">pm</label><br/>
                  <input type="text" placeholder="pm notes"/><br/>
                </div>
              </div>
              <div className="flex-row space-between my-2">
                <label htmlFor="instructions"> Instructions: </label>
                <input 
                placeholder="Overall instructions"
                name="instructions"
                type="text"
                id="instructions"
                onChange={handleChangeVal}
                />
              </div>
            </div>
              
              {error ? (
                <div>
                <p className="error-text">Please check new prescription details and try again.</p>
                </div>
              ) : null}
              <div className="flex-row flex-end">
                <button type="submit" value="submit">Submit</button>
              </div>
            </form>
          </div>
        </div>
        
    );
}

export default PrescriptionForm;