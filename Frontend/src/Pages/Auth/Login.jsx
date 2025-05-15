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
  CircularProgress,
  InputAdornment,
  IconButton,
  FormControlLabel,
  Checkbox
} from '@mui/material';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import api from '../../services/api';
import { storeAuth, setAuthToken } from '../../utils/auth';

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const redirectPath = location.state?.from?.pathname || '/user/dashboard';

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'rememberMe' ? checked : value
    });
    
    // Clear error when field is edited
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: ''
      });
    }
  };
  
  const validateForm = () => {
    const errors = {};
    
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    if (!formData.password) {
      errors.password = 'Password is required';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    setError('');
    
    try {
      const response = await api.post('/auth/login', {
        email: formData.email,
        password: formData.password
      });
      
      // Store auth data
      const { token, user } = response.data;
      storeAuth(token, user);
      setAuthToken(token);
      
      // Navigate based on user role
      if (user.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate(redirectPath);
      }
    } catch (err) {
      console.error('Login error:', err);
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate('/');
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        py: 8,
        background: 'linear-gradient(135deg, #121212 30%, #151515 100%)',
      }}
    >
      <Container maxWidth="sm">
        {/* Back button */}
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={handleBack}
          sx={{
            position: 'absolute',
            top: 20,
            left: 20,
            color: '#fff',
            textTransform: 'none',
            fontSize: '1rem',
            '&:hover': {
              backgroundColor: 'rgba(255,255,255,0.1)'
            }
          }}
        >
          Back to Home
        </Button>

        <Paper
          elevation={6}
          sx={{
            borderRadius: 4,
            overflow: 'hidden',
            bgcolor: '#181818',
            boxShadow: '0 10px 40px rgba(0,0,0,0.3)',
            animation: 'fadeIn 0.6s ease-out',
            '@keyframes fadeIn': {
              '0%': { opacity: 0, transform: 'translateY(30px)' },
              '100%': { opacity: 1, transform: 'translateY(0)' }
            }
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
                  MUSIC<span style={{ color: '#1DB954' }}>IFY</span>
                </Typography>
              </Box>

              <Typography variant="h4" sx={{ fontWeight: 700, mb: 1, textAlign: 'center' }}>
                Welcome Back
              </Typography>
              
              <Typography variant="body1" sx={{ mb: 4, textAlign: 'center', color: '#b3b3b3' }}>
                Log in to continue your musical journey
              </Typography>

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

              <Box component="form" onSubmit={handleSubmit} sx={{ '& > :not(style)': { mb: 3 } }}>
                <TextField
                  fullWidth
                  id="email"
                  name="email"
                  label="Email Address"
                  type="email"
                  variant="outlined"
                  value={formData.email}
                  onChange={handleChange}
                  error={!!formErrors.email}
                  helperText={formErrors.email}
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
                
                <TextField
                  fullWidth
                  id="password"
                  name="password"
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  variant="outlined"
                  value={formData.password}
                  onChange={handleChange}
                  error={!!formErrors.password}
                  helperText={formErrors.password}
                  InputProps={{
                    sx: { borderRadius: 2, fontSize: '1.1rem' },
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                          sx={{ color: 'rgba(255,255,255,0.7)' }}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    )
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
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <FormControlLabel
                    control={
                      <Checkbox 
                        checked={formData.rememberMe}
                        onChange={handleChange}
                        name="rememberMe"
                        sx={{
                          color: 'rgba(255,255,255,0.5)',
                          '&.Mui-checked': {
                            color: '#1DB954',
                          },
                        }}
                      />
                    }
                    label="Remember me"
                    sx={{ color: 'rgba(255,255,255,0.7)' }}
                  />
                  
                  <Link 
                    component={RouterLink} 
                    to="/forgot-password"
                    sx={{ 
                      color: '#1DB954',
                      textDecoration: 'none',
                      '&:hover': {
                        textDecoration: 'underline',
                      }
                    }}
                  >
                    Forgot password?
                  </Link>
                </Box>
                
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
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0 6px 16px rgba(29, 185, 84, 0.6)',
                      background: 'linear-gradient(90deg, #1DB954, #1ed760)',
                    }
                  }}
                >
                  {loading ? <CircularProgress size={24} color="inherit" /> : 'Log In'}
                </Button>
              </Box>
              
              <Box sx={{ textAlign: 'center', mt: 2 }}>
                <Typography variant="body1" sx={{ color: '#b3b3b3' }}>
                  Don't have an account?{' '}
                  <Link 
                    component={RouterLink} 
                    to="/signup"
                    sx={{ 
                      color: '#1DB954', 
                      textDecoration: 'none',
                      fontWeight: 600,
                      '&:hover': {
                        textDecoration: 'underline'
                      }
                    }}
                  >
                    Sign up
                  </Link>
                </Typography>
              </Box>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}

export default Login;