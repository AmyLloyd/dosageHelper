// query getAllVets {
//     vets {
//       _id
//       username
//       email
//       password
//       clients {
//         _id
//         username
//         patients{
//           name
//         }
//       }
//     }
//   }

// query getDrugs {
//     drugs{
//       _id
//       name
//       strength
//       type
//     },
//   }

// query getMe {
//     me {
//       _id
//       username
//       email
//     }
//   }

// query getDrugById($id: ID!) {
//     drug(id: $id){
//       _id
//       name
//       strength
//       type
//     }
//   }

// query myClients {
//     myClients {
//       _id
//       username
//       clients{
//         username
//       }
//     }
//   }

// query getDrugs {
//     drugs{
//       _id
//       name
//       strength
//       type
//     }
//   }

// query getAllPrescriptions{
//     prescriptions{
//       _id
//       course_length
//       dosage_checked_at
//       dosage_notes
//       dose_frequency
//       drug {
//         _id
//         name
//         strength
//         type
//       }
//       prescriber {
//         _id
//       }
//     }
//   }

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

// query getDrugById($id: ID!) {
//     drug(id: $id){
//       _id
//       name
//       strength
//       type
//     }
//   }

// query getPatientById($id:ID!) {
//     patient(id:$id){
//       _id
//       name
//       animal_type
//       prescriptions{
//         _id
//       created_at
//       dose_frequency
//       instructions
//       quantity
//       course_length
//       prescriber {
//         _id
//         username
//       }
//       number_of_dosages
//       time_of_dosages
//       dosage_checked_at
//       dosage_notes
//       }
//     }
//   }