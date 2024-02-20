// import { createContext, useContext, useReducer } from "react";
// // import { reducer } from './reducers'

// const VetContext = createContext();
// const { Provider } = VetContext;

// const VetProvider = ({ value = [], ...props }) => {
//   const [state, dispatch] = useReducer(reducer, {
//     clients: [],
//     patients: [],
//     prescriptions: [],
// //     cartOpen: false,
//     drugs: [],
//     //This is for the client to check when they have administered meds (later in development)
//     checked: false,
// //     prescription: '',
//   });

//   return <Provider value={[state, dispatch]} {...props} />;
// };

// const useVetContext = () => {
//   return useContext(VetContext);
// };

// export { VetProvider, useVetContext };
