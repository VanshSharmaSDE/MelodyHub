import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Link,
  Alert,
  IconButton,
  CircularProgress,
  Breadcrumbs
} from '@mui/material';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import EmailIcon from '@mui/icons-material/Email';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import HomeIcon from '@mui/icons-material/Home';
import LoginIcon from '@mui/icons-material/Login';
import LockResetIcon from '@mui/icons-material/LockReset';
import api from '../../services/api';

function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!email.trim()) {
      setError('Please enter your email address');
      return;
    }
    
    setLoading(true);
    
    try {
      await api.post('/auth/forgot-password', { email });
      setIsSubmitted(true);
    } catch (err) {
      console.error('Forgot password error:', err);
      setError(err.response?.data?.message || 
        'Failed to send reset email. Please check your email address and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        py: 8,
        background: 'linear-gradient(135deg, #121212 30%, #151515 100%)',
              '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '300px',
        background: 'linear-gradient(180deg, rgba(29,185,84,0.15) 0%, rgba(29,185,84,0) 100%)',
        zIndex: 0
      }

      }}
    >
      <Container maxWidth="sm">
        {/* Breadcrumb Navigation */}
        <Breadcrumbs 
          separator="›" 
          aria-label="breadcrumb"
          sx={{ 
            mb: 3,
            mt: 2,
            position: 'absolute',
            top: 20,
            left: 20,
            '& .MuiBreadcrumbs-ol': { 
              flexWrap: 'wrap' 
            },
            '& .MuiBreadcrumbs-separator': { 
              color: 'rgba(255,255,255,0.4)' 
            }
          }}
        >
          <Link 
            component={RouterLink} 
            to="/"
            sx={{ 
              display: 'flex', 
              alignItems: 'center',
              color: 'rgba(255,255,255,0.7)',
              textDecoration: 'none',
              '&:hover': { color: '#1DB954' }
            }}
          >
            <HomeIcon fontSize="small" sx={{ mr: 0.5 }} />
            Home
          </Link>
          <Link 
            component={RouterLink} 
            to="/login"
            sx={{ 
              display: 'flex', 
              alignItems: 'center',
              color: 'rgba(255,255,255,0.7)',
              textDecoration: 'none',
              '&:hover': { color: '#1DB954' }
            }}
          >
            <LoginIcon fontSize="small" sx={{ mr: 0.5 }} />
            Login
          </Link>
          <Typography 
            sx={{ 
              display: 'flex', 
              alignItems: 'center',
              color: '#1DB954' 
            }}
          >
            <LockResetIcon fontSize="small" sx={{ mr: 0.5 }} />
            Reset Password
          </Typography>
        </Breadcrumbs>
        
        <Box sx={{ 
          position: 'relative',
          animation: 'fadeIn 0.6s ease-out',
          '@keyframes fadeIn': {
            '0%': { opacity: 0, transform: 'translateY(30px)' },
            '100%': { opacity: 1, transform: 'translateY(0)' }
          }
        }}>
          <Paper
            elevation={6}
            sx={{
              borderRadius: 4,
              overflow: 'hidden',
              bgcolor: '#181818',
              boxShadow: '0 10px 40px rgba(0,0,0,0.3)',
              transition: 'transform 0.3s ease',
            }}
          >
            <Box sx={{ position: 'relative' }}>
              <Box sx={{ 
                width: '100%', 
                height: 8, 
                background: 'linear-gradient(90deg, #1DB954, #1ed760)',
                boxShadow: '0 2px 10px rgba(29, 185, 84, 0.5)'
              }} />
              <Box sx={{ p: 5 }}>
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  mb: 3
                }}>
                  <MusicNoteIcon 
                    sx={{ 
                      color: '#1DB954', 
                      fontSize: '2.5rem', 
                      mr: 1,
                      filter: 'drop-shadow(0 0 8px rgba(29, 185, 84, 0.3))'
                    }}
                  />
                  <Typography 
                    variant="h5" 
                    component="div"
                    sx={{ 
                      fontWeight: 800,
                      fontSize: { xs: '1.8rem', md: '2rem' },
                      color: 'white',
                      letterSpacing: '-0.5px',
                      textShadow: '0 2px 4px rgba(0,0,0,0.3)'
                    }}
                  >
                    MELODY<span style={{ color: '#1DB954' }}>HUB</span>
                  </Typography>
                </Box>

                <Typography variant="h4" sx={{ fontWeight: 700, mb: 1, textAlign: 'center' }}>
                  Reset Password
                </Typography>
                
                <Typography variant="body1" sx={{ mb: 4, textAlign: 'center', color: '#b3b3b3' }}>
                  Enter your email address and we'll send you a link to reset your password
                </Typography>
                
                {isSubmitted ? (
                  <Box sx={{ textAlign: 'center' }}>
                    <Box 
                      sx={{
                        width: 80,
                        height: 80,
                        borderRadius: '50%',
                        backgroundColor: 'rgba(29, 185, 84, 0.1)',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        margin: '0 auto 24px'
                      }}
                    >
                      <EmailIcon sx={{ fontSize: 40, color: '#1DB954' }} />
                    </Box>

                    <Alert 
                      severity="success" 
                      sx={{ 
                        mb: 3,
                        backgroundColor: 'rgba(29, 185, 84, 0.1)',
                        color: '#fff',
                        '& .MuiAlert-icon': {
                          color: '#1DB954'
                        }
                      }}
                    >
                      Reset link sent! Please check your email inbox.
                    </Alert>
                    
                    <Typography variant="body2" sx={{ mb: 3, color: '#b3b3b3' }}>
                      If you don't see the email in your inbox, please check your spam folder.
                    </Typography>
                    
                    <Button
                      fullWidth
                      variant="outlined"
                      color="primary"
                      onClick={() => navigate('/login')}
                      sx={{
                        py: 1.5,
                        borderRadius: 2,
                        fontSize: '1rem',
                        fontWeight: 600,
                        borderColor: '#1DB954',
                        color: '#1DB954',
                        '&:hover': {
                          borderColor: '#1DB954',
                          backgroundColor: 'rgba(29, 185, 84, 0.08)'
                        }
                      }}
                    >
                      Return to Login
                    </Button>
                  </Box>
                ) : (
                  <Box component="form" onSubmit={handleSubmit} sx={{ '& > :not(style)': { mb: 3 } }}>
                    {error && (
                      <Alert 
                        severity="error" 
                        sx={{ 
                          mb: 3,
                          backgroundColor: 'rgba(211, 47, 47, 0.1)',
                          color: '#ff5252',
                          '& .MuiAlert-icon': {
                            color: '#ff5252'
                          }
                        }}
                      >
                        {error}
                      </Alert>
                    )}
                    
                    <TextField
                      fullWidth
                      name="email"
                      label="Email Address"
                      type="email"
                      variant="outlined"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      InputProps={{
                        sx: { borderRadius: 2, fontSize: '1.1rem' }
                      }}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          backgroundColor: 'rgba(255,255,255,0.05)',
                          '&:hover fieldset': {
                            borderColor: 'rgba(29, 185, 84, 0.5)',
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: '#1DB954',
                          },
                        },
                      }}
                    />
                    
                    <Button 
                      fullWidth
                      type="submit"
                      variant="contained"
                      color="primary"
                      size="large"
                      disabled={loading}
                      sx={{
                        py: 1.5,
                        borderRadius: 2,
                        fontSize: '1.1rem',
                        fontWeight: 600,
                        boxShadow: '0 4px 12px rgba(29, 185, 84, 0.4)',
                        background: 'linear-gradient(90deg, #1DB954, #1ed760)',
                        transition: 'all 0.3s ease',
                        mt: 2,
                        '&:hover': {
                          transform: 'translateY(-2px)',
                          boxShadow: '0 6px 16px rgba(29, 185, 84, 0.6)',
                          background: 'linear-gradient(90deg, #1DB954, #1ed760)',
                        }
                      }}
                    >
                      {loading ? <CircularProgress size={24} color="inherit" /> : 'Send Reset Link'}
                    </Button>
                  </Box>
                )}
                
                <Box sx={{ textAlign: 'center', mt: 4 }}>
                  <Typography variant="body1" sx={{ color: '#b3b3b3' }}>
                    Remember your password?{' '}
                    <Link
                      component={RouterLink}
                      to="/login"
                      sx={{ 
                        color: '#1DB954', 
                        textDecoration: 'none',
                        fontWeight: 600,
                        '&:hover': {
                          textDecoration: 'underline'
                        }
                      }}
                    >
                      Login
                    </Link>
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Paper>
        </Box>
      </Container>
    </Box>
  );
}

export default ForgotPassword;