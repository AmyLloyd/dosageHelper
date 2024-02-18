
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