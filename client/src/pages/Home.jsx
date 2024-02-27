import ClientMenu from '../components/ClientMenu';

import ClientForm from '../components/ClientForm';


function Home() {
    
    return (

        <div className='center-a'>
            <h2 className='center'>Welcome Vet!</h2>

            <div>


                <ClientMenu />
                <ClientForm />

            </div>
        </div>
    )
}

export default Home;