
import { createContext, useContext, useReducer } from "react";
import { reducer } from './reducers'

const VetContext = createContext();
const { Provider } = VetContext;

const VetProvider = ({ value = [], ...props }) => {

    const [state, dispatch] = useReducer(reducer, {
    clients: [],
    patients: [],
    prescriptions: [],
    drugs: [],

    checked: false,

    currentClient: '',
    currentPatient:'',
    currentPrescription:'',
    currentDrug:'',
  });

  return <Provider value={[state, dispatch]} {...props} />;
};

const useVetContext = () => {
  return useContext(VetContext);
};

export { VetProvider, useVetContext };

//Alternatives: 22.10 useReducer shows could table display od data with checkbox

//OR 22.22 student typedefs review qwith product items on shopping website