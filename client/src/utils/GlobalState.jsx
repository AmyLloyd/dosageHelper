
import { createContext, useContext, useReducer } from "react";
import { reducer } from './reducers'

const VetContext = createContext();
const { Provider } = VetContext;

const VetProvider = ({ value = [], ...props }) => {
  //to use uderReducer hook we have to consider the reducer and the inital state objects that need to be passed
  //Instead of calling the methods from inside components as we have before, now we will call dispatch(), which accepts an object that contains type and payload attributes.
  //
    const [state, dispatch] = useReducer(reducer, {
    clients: [],
    patients: [],
    prescriptions: [],
//     cartOpen: false,
    drugs: [],
    //This is for the client to check when they have administered meds (later in development)
    checked: false,
//     prescription: '',
  });

  return <Provider value={[state, dispatch]} {...props} />;
};

const useVetContext = () => {
  return useContext(VetContext);
};

export { VetProvider, useVetContext };

//Alternatives: 22.10 useReducer shows could table display od data with checkbox

//OR 22.22 student typedefs review qwith product items on shopping website