// query getAllVets {
//     vets {
//       _id
//       username
//       email
//       password
//       clients {
//         username
//         patients {
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
