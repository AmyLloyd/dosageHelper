import NewDrugForm from '../components/NewDrugForm';
import DrugList from '../components/DrugList';

function Drug() {
    
    return (
        
        <div className='background-br'>

            <div>
                <DrugList />
                <h2>Add new drug</h2>

                <NewDrugForm />
            </div>
        </div>
    )
}

export default Drug;