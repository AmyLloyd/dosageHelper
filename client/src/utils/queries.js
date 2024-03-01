import { gql } from '@apollo/client';

export const QUERY_VETS = gql`
    query getAllVets {
        vets {
        _id
        username
        email
        password
        clients {
            _id
            username
            patients{
            name
            }
        }
        }
    }
`;
 
export const QUERY_ALL_DRUGS = gql`
    query getDrug {
        drugs {
        _id
        name
        strength
        type
        },
    }
`;

export const QUERY_ME = gql`
    query getMe {
        me {
        _id
        username
        email
        }
    }
`;

export const QUERY_DRUG_BY_ID = gql`
query getDrugById($id: ID!) {
    drug(id: $id){
      _id
      name
      strength
      type
    }
  }
`;

export const QUERY_MY_CLIENTS = gql `

query myClients {
    myClients{
    _id
    username
    clients{
        username
        _id
        email
        is_client
        patients{
            _id
            name
            animal_type
            condition_description
            prescriptions{
                _id
                created_at
                dose_frequency
                instructions
                quantity
                course_length
                number_of_dosages
                dosage_checked_at
                time_of_dosages
                drug{
                    _id
                    name
                    strength
                    type
                }
                active
            }
        }
    }
  }
}
`

export const QUERY_PATIENTS_BY_CLIENT = gql `
    query getPatientsByClient($id: ID!) {
        client(id: $id){
            _id
            username
            patients{
                _id
                name
                animal_type
                condition_description
            }
        }
    }
`;

export const QUERY_ALL_PRESCRIPTIONS = gql `
    query getAllPrescriptions{
        prescriptions{
        _id
        course_length
        dosage_checked_at
        dosage_notes
        dose_frequency
        drug {
            _id
            name
            strength
            type
        }
        prescriber {
            _id
        }
        }
    }
`;

export const QUERY_PATIENT_BY_ID = gql `
    query getPatientById($id:ID!) {
        patient(id:$id){
        _id
        name
        animal_type
        prescriptions{
                _id
            created_at
            dose_frequency
            instructions
            quantity
            course_length
            prescriber {
                _id
                username
            }
            number_of_dosages
            time_of_dosages
            dosage_checked_at
            dosage_notes
            }
        }
    }
`;



// query getAllClients{
//     clients{
//       _id
//       username
//       patients{
//         _id
//         name
//         animal_type
//       }
//     }
//   }

// query getAllPatients{
//     patients{
//       _id
//       name
//       animal_type
//       condition_description
//     }
//   }

