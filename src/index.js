import React from 'react';
import ReactDOM from 'react-dom';

import App from './app';
import './style/index.scss'

import { ApolloProvider } from 'react-apollo';

import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { from, split } from 'apollo-link';
import { createUploadLink } from 'apollo-upload-client';
import { WebSocketLink } from 'apollo-link-ws';
import { onError } from 'apollo-link-error';
import { getMainDefinition } from 'apollo-utilities'


const cache = new InMemoryCache();

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message }) => {
      if (message === "AUTH") {
        localStorage.removeItem('token');
        window.location.reload();
      }
      return "stf";
    });
  }
});

const uploadLink = createUploadLink({
  uri: 'http://localhost:4000/graphql',
  headers: {
    id: localStorage.getItem('id'),
    token: localStorage.getItem('token'),
  },
})

const wsLink = new WebSocketLink({
  uri: `ws://localhost:4000/graphql`,
  options: {
    reconnect: true
  }
});

const link = split(
  // split based on operation type
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  uploadLink,
);


const client = new ApolloClient({
  cache,
  link: from([errorLink, link])
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>, document.getElementById('root')
);

export default client;
