import React from 'react';
import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import theme from './theme/theme';
import PrivateRoute from './utils/PrivateRoute';
import Login from './Pages/Auth/Login';
import Signup from './Pages/Auth/Signup';
import ForgotPassword from './Pages/Auth/ForgotPassword';
import ResetPassword from './Pages/Auth/ResetPassword';
import HomePage from './Pages/Home/HomePage';
import Player from './Pages/Acessability/Player';
import Discover from './Pages/Acessability/Discover';
import UserDashboard from './DashBoard/UserDashBoard/UserDashBoardPage';
import AdminDashboard from './DashBoard/AdminDasBoard/AdminDashBoardPage';
import NotFound from './Pages/NotFound/404';
import UnderDevelopment from './Pages/NotFound/UnderDevelopment';
import Unauthorized from './Pages/NotFound/Unauthorize';
import PrivacyPolicy from './Pages/Privacy&Terms/PrivacyPolicy';
import TermsOfService from './Pages/Privacy&Terms/TermsOfService';
import ContactUs from './Pages/Acessability/Contact';
import { setAuthToken } from './utils/auth';
import { MusicProvider } from './context/MusicContext';
import MusicPlayer from './components/MusicPlayer';
import { SnackbarProvider } from 'notistack';

// Check for token in localStorage
if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  return (
    <SnackbarProvider maxSnack={3}>
      <MusicProvider>
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
              <Box sx={{ flexGrow: 1 }}>
                <Routes>
                  {/* Public routes */}
                  <Route path="/" element={<HomePage />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/forgot-password" element={<ForgotPassword />} />
                  <Route path="/reset-password/:resetToken" element={<ResetPassword />} />
                  <Route path="/unauthorized" element={<Unauthorized />} />
                  <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                  <Route path="/terms-of-service" element={<TermsOfService />} />
                  <Route path="/contact" element={<ContactUs />} />

                  {/* Protected routes */}
                  <Route path="/player" element={
                    <PrivateRoute>
                      <Player />
                    </PrivateRoute>
                  } />
                  <Route path="/discover" element={
                    <PrivateRoute>
                      <Discover />
                    </PrivateRoute>
                  } />
                  <Route path="/user/dashboard" element={
                    <PrivateRoute>
                      <UserDashboard />
                    </PrivateRoute>
                  } />

                  {/* Admin routes */}
                  <Route path="/admin/dashboard" element={
                    <PrivateRoute adminOnly={true}>
                      <AdminDashboard />
                    </PrivateRoute>
                  } />

                  <Route path="/under-development" element={<UnderDevelopment />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Box>
              
              {/* Global Music Player that appears across all authenticated pages */}
              <MusicPlayer />
            </Box>
          </ThemeProvider>
        </BrowserRouter>
      </MusicProvider>
    </SnackbarProvider>
  );
}

export default App;