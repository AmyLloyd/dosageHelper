import ClientMenu from '../components/ClientMenu';
import ClientForm from '../components/ClientForm';

function Home() {
    
    return (
        <div>
            <h1>Welcome, Vet!</h1>
            <h4>Here are your clients:</h4>
            <ClientMenu />
            <ClientForm />
        </div>
    )
}

export default Home;