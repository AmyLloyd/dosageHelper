import { Outlet } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import Nav from './components/Nav';
// import { VetProvider } from './utils/GlobalState';

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

console.log(client, "client");

function App() {
  return (
    <ApolloProvider client={client}>
      <div>
        {/* <VetProvider> */}
          <Nav />
          <Outlet />
        {/* </VetProvider> */}
      </div>
    </ApolloProvider>
  );
}

export default App;