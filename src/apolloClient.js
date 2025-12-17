import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { ApolloLink } from '@apollo/client';

// Error handling link
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => {
      console.error(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`);
    });
  }
  if (networkError) {
    console.error(`[Network error]: ${networkError}`);
    console.error('Make sure the server is running on http://localhost:4000');
  }
});

// HTTP link
const httpLink = new HttpLink({
  uri: 'http://localhost:4000/graphql',
});

// Combine links
const link = ApolloLink.from([errorLink, httpLink]);

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'network-only',
      errorPolicy: 'none',
    },
    query: {
      fetchPolicy: 'network-only',
      errorPolicy: 'none',
    },
    mutate: {
      errorPolicy: 'none',
    },
  },
});

export default client;
