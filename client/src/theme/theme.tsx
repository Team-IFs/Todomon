import { createTheme } from '@mui/material/styles';
import { grey } from '@mui/material/colors';
import { PaletteMode } from '@mui/material';
import { getDataLocalStorage } from '../utils/localstorage';

export const LIGHT = 'light', DARK = 'dark';

const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    primary: {
      ...grey,
      ...(mode === DARK && {
        main: grey[600]
      }),
    },
    ...(mode === DARK && {
      background: {
        default: grey[900],
        paper: grey[800],
      },
    }),
    text: {
      ...(mode === LIGHT
        ? {
            primary: grey[900],
            secondary: grey[800],
          }
        : {
            primary: '#fff',
            secondary: grey[500],
          }),
    },
  },
});

const currentTheme = getDataLocalStorage('darkMode') ? DARK : LIGHT;
export const darkModeTheme = createTheme(getDesignTokens(currentTheme));