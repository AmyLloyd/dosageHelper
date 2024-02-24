import { Outlet } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

<<<<<<< HEAD
// import Navigation from './components/Navigation';
=======
import Navbar from './components/Navigation';
>>>>>>> 98e891cc1451838850c7b8a4d31933f5cf783e43
import { VetProvider } from './utils/GlobalState';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div>
        <VetProvider>
<<<<<<< HEAD
          {/* <Navigation /> */}
=======
          <Navbar />
>>>>>>> 98e891cc1451838850c7b8a4d31933f5cf783e43
          <Outlet />
        </VetProvider>
      </div>
    </ApolloProvider>
  );
}

export default App;