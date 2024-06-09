import NewDrugForm from '../components/NewDrugForm';
import DrugList from '../components/DrugList';

function Drug() {
    return (
        <div className='center-a'>
            <div className='flex-row center'>
                <div className="container">   
                    <DrugList />
                </div>
                <div className='sidebar'>
                    <NewDrugForm />
                </div>
            </div>
        </div>
    )
}
export default Drug;