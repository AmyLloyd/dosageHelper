import DrugList from '../components/DrugList';

function Prescription() {
    
    return (
        <div >
            <h2>Create a new prescription for the current client</h2>
            <div className='flex-row'>

                <div className='flex-item'>
                    <DrugList />
                </div>
           </div>

            
        </div>
    )
}

export default Prescription;