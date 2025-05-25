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
  Checkbox,
  Breadcrumbs
} from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import HomeIcon from '@mui/icons-material/Home';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import LoginIcon from '@mui/icons-material/Login';
import api from '../../services/api';
import { storeAuth, setAuthToken } from '../../utils/auth';

function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'agreeToTerms' ? checked : value
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

    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }

    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.agreeToTerms) {
      errors.agreeToTerms = 'You must agree to the terms and conditions';
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
      const userData = {
        name: formData.name,
        email: formData.email,
        password: formData.password
      };

      const response = await api.post('/auth/register', userData);

      // Store auth data
      const { token, user } = response.data;
      storeAuth(token, user);
      setAuthToken(token);

      // Navigate to the appropriate dashboard based on user role
      if (user.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/user/dashboard');
      }
    } catch (err) {
      console.error('Registration error:', err);
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
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
            <PersonAddIcon fontSize="small" sx={{ mr: 0.5 }} />
            Sign Up
          </Typography>
        </Breadcrumbs>

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
                  MELODY<span style={{ color: '#1DB954' }}>HUB</span>
                </Typography>
              </Box>

              <Typography variant="h4" sx={{ fontWeight: 700, mb: 1, textAlign: 'center' }}>
                Create Your Account
              </Typography>

              <Typography variant="body1" sx={{ mb: 4, textAlign: 'center', color: '#b3b3b3' }}>
                Join MelodyHub to start streaming your favorite songs
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
                  id="name"
                  name="name"
                  label="Full Name"
                  type="text"
                  variant="outlined"
                  value={formData.name}
                  onChange={handleChange}
                  error={!!formErrors.name}
                  helperText={formErrors.name}
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

                <TextField
                  fullWidth
                  id="confirmPassword"
                  name="confirmPassword"
                  label="Confirm Password"
                  type={showConfirmPassword ? 'text' : 'password'}
                  variant="outlined"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  error={!!formErrors.confirmPassword}
                  helperText={formErrors.confirmPassword}
                  InputProps={{
                    sx: { borderRadius: 2, fontSize: '1.1rem' },
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          edge="end"
                          sx={{ color: 'rgba(255,255,255,0.7)' }}
                        >
                          {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
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

                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.agreeToTerms}
                      onChange={handleChange}
                      name="agreeToTerms"
                      sx={{
                        color: 'rgba(255,255,255,0.5)',
                        '&.Mui-checked': {
                          color: '#1DB954',
                        },
                      }}
                    />
                  }
                  label={
                    <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                      I agree to the{' '}
                      <Link
                        component={RouterLink}
                        to="/terms-of-service"
                        sx={{ color: '#1DB954' }}
                      >
                        Terms of Service
                      </Link>{' '}
                      and{' '}
                      <Link
                        component={RouterLink}
                        to="/privacy-policy"
                        sx={{ color: '#1DB954' }}
                      >
                        Privacy Policy
                      </Link>
                    </Typography>
                  }
                  sx={{ color: 'rgba(255,255,255,0.7)' }}
                />

                {formErrors.agreeToTerms && (
                  <Typography variant="caption" color="error" sx={{ mt: -2, display: 'block' }}>
                    {formErrors.agreeToTerms}
                  </Typography>
                )}

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
                    mt: 1,
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0 6px 16px rgba(29, 185, 84, 0.6)',
                      background: 'linear-gradient(90deg, #1DB954, #1ed760)',
                    }
                  }}
                >
                  {loading ? <CircularProgress size={24} color="inherit" /> : 'Sign Up'}
                </Button>
              </Box>

              <Box sx={{ textAlign: 'center', mt: 2 }}>
                <Typography variant="body1" sx={{ color: '#b3b3b3' }}>
                  Already have an account?{' '}
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
                    Log in
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

export default Signup;