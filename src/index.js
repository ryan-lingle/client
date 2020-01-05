import React from 'react';
import ReactDOM from 'react-dom';

import './style/index.scss'
import App from './app/app.js';

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
        window.location.href = "/login";
      } else if (message === "UNCONFIRMED") {
        window.location.href = "/email_unconfirmed";
      }
      return "stf";
    });
  }
});

const uploadLink = createUploadLink({
  uri: process.env.REACT_APP_HTTP_ENDPOINT,
  headers: {
    id: localStorage.getItem('id'),
    token: localStorage.getItem('token'),
  },
});

const wsLink = new WebSocketLink({
  uri: process.env.REACT_APP_WS_ENDPOINT,
  options: {
    reconnect: true,
    timeout: 60000,
    connectionParams: {
      id: localStorage.getItem('id'),
      token: localStorage.getItem('token'),
    }
  }
});

wsLink.subscriptionClient.maxConnectTimeGenerator.duration = () => wsLink.subscriptionClient.maxConnectTimeGenerator.max

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
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>, document.getElementById('root')
);

Number.prototype.toMoney = function() {
  return this.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0});
};

export default client;
