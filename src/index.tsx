import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/App';
import { I18nProvider } from './app/i18n';
import { ThemeProvider } from './app/theme';
import './assets/scss/style.scss';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <I18nProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </I18nProvider>
  </React.StrictMode>
);
