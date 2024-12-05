import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_BACKEND_URL + "graphql", 
  credentials: "same-origin", 
});



export const apolloClient = new ApolloClient({
  link: (httpLink),
  cache: new InMemoryCache(),
});
