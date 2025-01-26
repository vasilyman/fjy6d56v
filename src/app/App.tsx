import React from 'react';
import { ThemeProvider } from './theme';
import { Layout } from './layout';
import { I18nProvider } from './i18n';

function App() {
  return (
    <I18nProvider>
      <ThemeProvider>
        <Layout></Layout>
      </ThemeProvider>
    </I18nProvider>
  );
}

export default App;
