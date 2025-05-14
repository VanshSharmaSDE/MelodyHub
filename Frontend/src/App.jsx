import React from 'react';
import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import theme from './theme/theme';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Feature';
import Footer from './components/Footer';
import Login from './components/LoginPage';
import HomePage from './Pages/HomePage';
import Player from './components/Player';
import Discover from './components/DiscoverPage';
import UserDashboard from './DashBoard/UserDashBoard/UserDashBoardPage';
import AdminDashboard from './DashBoard/AdminDasBoard/AdminDashBoardPage';

function App() {
  return (
  <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
    
          <Box sx={{ flexGrow: 1 }}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/player" element={<Player/>} />
              <Route path="/discover" element={<Discover />} />
              <Route path="/userdashboard" element={<UserDashboard />} />
              <Route path="/admindashboard" element={<AdminDashboard />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </Box>
    
        </Box>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;