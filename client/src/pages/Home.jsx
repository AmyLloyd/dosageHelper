import ClientMenu from '../components/ClientMenu';

import ClientForm from '../components/ClientForm';


function Home() {
    
    return (
        <div className='row'>
                <div className='column left'>   
                    <ClientMenu />
                </div>
                <div className='column side'>
                    <ClientForm />
                </div>
        </div>
    )
}

export default Home;