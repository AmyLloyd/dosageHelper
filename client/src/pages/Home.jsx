import ClientMenu from '../components/ClientMenu';
import ClientForm from '../components/ClientForm';

function Home() {
    
    return (
        <div className='center-a'>
            <h1 className='center'>Welcome Vet!</h1>
            <ClientMenu />
            <ClientForm />
        </div>
    )
}

export default Home;