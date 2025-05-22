import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/App';
import { I18nProvider } from './app/i18n';
import { ThemeProvider } from './app/theme';
import './assets/scss/style.scss';
import store from './app/store';
import { Provider } from 'react-redux';
import { ApolloProvider } from '@apollo/client';
import { client } from './app/apollo';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <I18nProvider>
        <ThemeProvider>
          <ApolloProvider client={client}>
            <App />
          </ApolloProvider>
        </ThemeProvider>
      </I18nProvider>
    </Provider>
  </React.StrictMode>
);
