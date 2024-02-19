
// mutation signUpVet($username: String!, $email: String!, $password: String!) {
//     signUpVet(username: $username, email: $email, password: $password) {
//       token
//       vet {
//         _id
//         username
//         email
//       }
//     }
//   }

// mutation LoginVet($email: String!, $password: String!) {
//     loginVet(email: $email, password: $password) {
//       token
//       vet {
//         _id
//         username
//         clients {
//           email
//           username
//         }
//       }
//     }
//   }

// mutation addClientToVet($username: String!, $email: String!, $password: String!) {
//     addClientToVet(username: $username, email: $email, password: $password) {
//       token 
//       client {
//         _id
//         username
//         email
//         password
//       }
//     }
//   }

// mutation AddPatientToClient($name: String!, $animal_type: String!, $condition_description: String!, $client_id: ID!) {
//     addPatientToClient(name: $name, animal_type: $animal_type, condition_description: $condition_description, client_id: $client_id ) {
//         username 
//         patients{
//           name
//           prescriptions{
//             _id
//           }
//         }
//     }
//   }

// mutation addDrugToPrescription($drug_id: ID!, $prescription_id: ID!){
//     addDrugToPrescription(drug_id: $drug_id, prescription_id: $prescription_id ) {
//       _id
//       drug{
//         _id
//         name
//       }
//     }
//   }

// mutation addClientToVet($username: String!, $email: String!, $password: String!) {
//     addClientToVet(username: $username, email: $email, password: $password) {
//       token 
//       client {
//         _id
//         username
//         email
//         password
//       }
//     }
//   }

// mutation AddPrescriptionToPatient($dose_frequency: Int!, $instructions: String, $quantity: Int, $course_length: Int, $prescriber: ID, $number_of_dosages: Int, $time_of_dosages: [String], $dosage_notes: String $patient_id: ID!) {
//     addPrescriptionToPatient(dose_frequency: $dose_frequency, instructions: $instructions, quantity: $quantity, course_length: $course_length, prescriber: $prescriber, number_of_dosages: $number_of_dosages, time_of_dosages: $time_of_dosages, dosage_notes: $dosage_notes, patient_id: $patient_id) {
//       name
//       animal_type
//       condition_description
//       prescriptions {
//         _id
//         created_at
//         dose_frequency
//         drug {
//           name
//         }
        
//       }
//     }
//   }

// mutation UpdateVet($password: String, $username: String) {
//     updateVet(password: $password, username: $username) {
//       username
//       email
//       clients {
//         username
//         patients{
//           name
//         }
//       }
//     }
//   }