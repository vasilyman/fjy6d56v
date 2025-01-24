import React from 'react';
import { ThemeProvider } from './theme';
import { Layout } from './layout';

function App() {
  return (
    <ThemeProvider>
      <Layout></Layout>
    </ThemeProvider>
  );
}

export default App;
