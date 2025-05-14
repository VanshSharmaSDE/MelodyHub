import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1DB954', // Spotify green
    },
    secondary: {
      main: '#000000', // Black
    },
    background: {
      default: '#121212',
      paper: '#181818',
    },
  },
  typography: {
    fontFamily: '"Poppins", "Arial", sans-serif',
    h1: {
      fontSize: '4rem',
      fontWeight: 700,
      '@media (max-width:600px)': {
        fontSize: '3rem',
      },
    },
    h2: {
      fontSize: '3rem',
      fontWeight: 700,
      '@media (max-width:600px)': {
        fontSize: '2.5rem',
      },
    },
    h3: {
      fontSize: '2rem',
      fontWeight: 600,
    },
    h6: {
      fontSize: '1.25rem',
      fontWeight: 600,
    },
    body1: {
      fontSize: '1.1rem',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 500,
          padding: '12px 30px',
          fontSize: '1rem',
          fontWeight: 600,
          textTransform: 'none',
          transition: 'all 0.3s ease',
        },
        containedPrimary: {
          '&:hover': {
            backgroundColor: '#1ed760',
            transform: 'scale(1.05)',
            boxShadow: '0 5px 15px rgba(29, 185, 84, 0.4)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          '&:hover': {
            transform: 'translateY(-8px)',
          },
        },
      },
    },
  },
});

export default theme;