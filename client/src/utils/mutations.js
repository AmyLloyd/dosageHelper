import { gql } from '@apollo/client';

export const SIGNUP = gql `
    mutation signUpVet($username: String!, $email: String!, $password: String!) {
        signUpVet(username: $username, email: $email, password: $password) {
            token
            vet {
                _id
                username
                email
            }
        }
    }
`;

export const LOGIN = gql `

mutation LoginVet($email: String!, $password: String!) {
    loginVet(email: $email, password: $password) {
      token
      vet {
        _id
        username
        clients {
          email
          username
        }
      }
    }
  }
`;

export const ADD_CLIENT_TO_VET = gql`
    mutation addClientToVet($username: String!, $email: String!, $password: String!) {
        addClientToVet(username: $username, email: $email, password: $password) {
            clients {
                _id
                username
                email
                password
                is_client
            }
        }
    }
`;

export const ADD_PATIENT_TO_CLIENT = gql`
    mutation AddPatientToClient($name: String!, $animal_type: String!, $condition_description: String!, $client_id: ID!) {
        addPatientToClient(name: $name, animal_type: $animal_type, condition_description: $condition_description, client_id: $client_id ) {

            _id
            username 
            patients{
                _id
                name
            }
        }
    }
`;

export const ADD_DRUG_TO_PRESCRIPTION = gql`
    mutation addDrugToPrescription($drug_id: ID!, $prescription_id: ID!){
        addDrugToPrescription(drug_id: $drug_id, prescription_id: $prescription_id ) {
        _id

        created_at
        drug{
            _id
            name
        }
        }
    }
`;

// export const REMOVE_DRUG = gql`
//     mutation removeDrug($drugId: ID!) {
//         removeDrug(drugId: $drugId) {
//             _id
//             name
//         }
//     }
// `;

export const ADD_PRESCRIPTION_TO_PATIENT = gql`
    mutation AddPrescriptionToPatient($drug_id: ID!, $dose_frequency: Int, $instructions: String, $quantity: Int, $course_length: Int, $prescriber: ID, $number_of_dosages: Int, $time_of_dosages: [String], $dosage_notes: [String], $patient_id: ID!) {
        addPrescriptionToPatient(drug_id: $drug_id, dose_frequency: $dose_frequency, instructions: $instructions, quantity: $quantity, course_length: $course_length, prescriber: $prescriber, number_of_dosages: $number_of_dosages, time_of_dosages: $time_of_dosages, dosage_notes: $dosage_notes, patient_id: $patient_id) {
        name
        animal_type
        condition_description
        prescriptions {
            _id
            created_at
            drug {
            name
            }
            
        }
        }
    }
`;

export const UPDATE_VET = gql`
mutation UpdateVet($password: String, $username: String) {
    updateVet(password: $password, username: $username) {
      username
      email
      clients {
        username
        patients{
          name
        }
      }
    }
  }
`;

export const UPDATE_PRESCRIPTION= gql`
mutation UpdatePrescription($prescription_id: ID!, $dosage_checked_at: [String]) {
    updatePrescription(prescription_id: $prescription_id,dosage_checked_at: $dosage_checked_at) {
        created_at
        time_of_dosages
        dosage_notes
        number_of_dosages
        dose_frequency
        dosage_checked_at
        drug{
            _id
            name
            }
        _id
        }
  }
`;

export const REMOVE_CLIENT = gql`
mutation removeClient($id: ID!) {
    removeClient(client: $client_id) {
        _id
        username
        clients{
            _id
            username
            email
        }
    }
}`

export const ADD_DRUG = gql`
mutation addDrug($name: String!, $strength: String, $type: String) {
    addDrug(name:$name, strength: $strength, type:$type){
        _id
        name
        strength
        type
    }
}`

export const TOGGLE_ACTIVE_PRESCRIPTION = gql`
mutation ToggleActivePrescription($prescriptionId: ID!) {
    toggleActivePrescription(prescription_id: $prescriptionId) {
      active
      _id
    }
  }`

export const TOGGLE_INACTIVE_PRESCRIPTION = gql`
mutation ToggleInactivePrescription($prescriptionId: ID!) {
    toggleInactivePrescription(prescription_id: $prescriptionId) {
      _id
      active
    }
  }`