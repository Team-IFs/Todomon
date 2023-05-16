import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { theme } from '../src/styles/theme';
import { ThemeProvider } from '@emotion/react';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <ThemeProvider theme={theme}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ThemeProvider>
);

