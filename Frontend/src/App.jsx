import React from 'react';
import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import theme from './theme/theme';
import Login from './Pages/Auth/Login';
import Signup from './Pages/Auth/Signup';
import ForgotPassword from './Pages/Auth/ForgotPassword';
import HomePage from './Pages/Home/HomePage';
import Player from './Pages/Acessability/Player';
import Discover from './Pages/Acessability/Discover';
import UserDashboard from './DashBoard/UserDashBoard/UserDashBoardPage';
import AdminDashboard from './DashBoard/AdminDasBoard/AdminDashBoardPage';
import NotFound from './Pages/NotFound/404';
import UnderDevelopment from './Pages/NotFound/UnderDevelopment';

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
              <Route path="/signup" element={<Signup />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/player" element={<Player/>} />
              <Route path="/discover" element={<Discover />} />
              <Route path="/userdashboard" element={<UserDashboard />} />
              <Route path="/admindashboard" element={<AdminDashboard />} />
              <Route path="/under-development" element={<UnderDevelopment />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Box>
    
        </Box>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;