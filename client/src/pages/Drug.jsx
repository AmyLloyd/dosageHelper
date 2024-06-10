import NewDrugForm from '../components/NewDrugForm';
import DrugList from '../components/DrugList';

function Drug() {
    return (
        <div className='row'>
                <div className='column left'>   
                    <DrugList />
                </div>
                <div className='column side'>
                    <NewDrugForm />
                </div>
        </div>
    )
}
export default Drug;