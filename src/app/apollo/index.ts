import { ApolloClient, InMemoryCache } from '@apollo/client';

export const client = new ApolloClient({
  uri: process.env.REACT_APP_API_GRAPHQL,
  cache: new InMemoryCache(),
});
