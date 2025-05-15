import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { isAuthenticated, isAdmin } from './auth';
import { Box, CircularProgress } from '@mui/material';

function PrivateRoute({ children, adminOnly = false }) {
  const location = useLocation();
  
  // Check if loading (you can implement loading state if needed)
  const [loading, setLoading] = React.useState(true);
  
  React.useEffect(() => {
    // Simulate checking auth state
    const checkAuth = () => {
      setTimeout(() => {
        setLoading(false);
      }, 100);
    };
    checkAuth();
  }, []);
  
  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center',
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #121212 30%, #151515 100%)',
        }}
      >
        <CircularProgress sx={{ color: '#1DB954' }} />
      </Box>
    );
  }
  
  // If admin route but user is not admin
  if (adminOnly && !isAdmin()) {
    return <Navigate to="/unauthorized" state={{ from: location }} replace />;
  }
  
  // If authenticated, render children
  if (isAuthenticated()) {
    return children;
  }
  
  // If not authenticated, redirect to login
  return <Navigate to="/login" state={{ from: location }} replace />;
}

export default PrivateRoute;