import { createTheme } from '@mui/material/styles';

// Material 3 Theme Configuration
export const theme = createTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: { main: '#6750A4' },
        secondary: { main: '#625B71' },
        background: { default: '#FFFBFE', paper: '#F4EFF4' },
      },
    },
    dark: {
      palette: {
        primary: { main: '#D0BCFF' },
        secondary: { main: '#CCC2DC' },
        background: { default: '#1C1B1F', paper: '#2B2930' },
      },
    },
  },
  shape: {
    borderRadius: 16, // M3 standard
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 20, // Pill shape for M3
          padding: '10px 24px',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: 'none',
        },
      },
    },
  },
});
