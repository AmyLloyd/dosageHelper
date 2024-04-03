import NewDrugForm from '../components/NewDrugForm';
import DrugList from '../components/DrugList';

function Drug() {
    
    return (
            <div>
                <div className='center px-2 py-2'>
                    <DrugList />
                </div>
                <div className='flex-row center'>
                        <NewDrugForm />
                </div>
            </div>
    )
}

export default Drug;