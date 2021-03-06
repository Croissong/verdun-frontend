import React from 'react';
import { render } from 'react-dom';
import App from './App';
import { HelmetProvider } from 'react-helmet-async';
import * as serviceWorker from './serviceWorker';

import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { ApolloLink } from 'apollo-link';
import { ApolloProvider } from '@apollo/react-hooks';
// Pass your GraphQL endpoint to uri

const client = new ApolloClient({
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors)
        graphQLErrors.map(({ message, locations, path }) =>
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
          )
        );
      if (networkError) console.log(`[Network error]: ${networkError}`);
    }),
    new HttpLink({
      uri: '/api',
      credentials: 'same-origin'
    })
  ]),
  cache: new InMemoryCache()
});

const ApolloApp = () => (
  <HelmetProvider>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </HelmetProvider>
);

render(ApolloApp(), document.getElementById('root'));

serviceWorker.register();
