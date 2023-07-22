import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ThemeProvider } from '@emotion/react';
import { RecoilRoot } from 'recoil';
import { darkModeTheme } from '../src/theme/theme'
import { CssBaseline } from '@mui/material';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <RecoilRoot>
    <ThemeProvider theme={darkModeTheme}>
      <CssBaseline/>
      <App />
    </ThemeProvider>
  </RecoilRoot>
);

