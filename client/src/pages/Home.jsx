import ClientMenu from '../components/ClientMenu';
import ClientForm from '../components/ClientForm';

function Home() {
    
    return (
        <div>
            <h1>Welcome Vet!</h1>
            <ClientMenu />
            <ClientForm />
        </div>
    )
}

export default Home;