import ClientMenu from '../components/ClientMenu';

import ClientForm from '../components/ClientForm';


function Home() {
    
    return (
        <div className='center-a'>
            {/* <h2 className='center underline'>Welcome Vet!</h2> */}
            <div className='flex-row center'>
                <div className='container'>
                    <ClientMenu />
                </div>
                <div className='sidebar'>
                    <ClientForm />
                </div>
            </div>
        </div>
    )
}

export default Home;