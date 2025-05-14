import React, { useState } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  TextField, 
  Button, 
  Paper, 
  InputAdornment, 
  IconButton, 
  Divider,
  Link
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import AppleIcon from '@mui/icons-material/Apple';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Login submitted:', formData);
  };
  
  const goToSignup = () => {
    navigate('/signup');
  };
  
  const goBack = () => {
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
        <Box sx={{ 
          position: 'relative',
          animation: 'fadeIn 0.6s ease-out',
          '@keyframes fadeIn': {
            '0%': { opacity: 0, transform: 'translateY(30px)' },
            '100%': { opacity: 1, transform: 'translateY(0)' }
          }
        }}>
          <Button 
            startIcon={<ArrowBackIcon />}
            onClick={goBack}
            sx={{
              position: 'absolute',
              top: -60,
              left: 0,
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
                <Typography variant="h4" sx={{ fontWeight: 700, mb: 1, textAlign: 'center' }}>
                  Welcome Back
                </Typography>
                
                <Typography variant="body1" sx={{ mb: 4, textAlign: 'center', color: '#b3b3b3' }}>
                  Login to continue to MelodyHub
                </Typography>
                
                <Box component="form" onSubmit={handleSubmit} sx={{ '& > :not(style)': { mb: 3 } }}>
                  <TextField
                    fullWidth
                    name="email"
                    label="Email or Username"
                    variant="outlined"
                    value={formData.email}
                    onChange={handleChange}
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
                    name="password"
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    variant="outlined"
                    value={formData.password}
                    onChange={handleChange}
                    InputProps={{
                      sx: { borderRadius: 2, fontSize: '1.1rem' },
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={togglePasswordVisibility}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                          </IconButton>
                        </InputAdornment>
                      ),
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
                  
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button 
                      sx={{ 
                        color: '#1DB954',
                        fontWeight: 500,
                        textTransform: 'none',
                        fontSize: '1rem',
                        '&:hover': {
                          backgroundColor: 'rgba(29, 185, 84, 0.08)'
                        }
                      }}
                      onClick={()=> window.location.href = '/forgot-password'}
                    >
                      Forgot Password?
                    </Button>
                  </Box>
                  
                  <Button 
                    fullWidth
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="large"
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
                    Login
                  </Button>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', my: 3 }}>
                    <Divider sx={{ flexGrow: 1 }} />
                    <Typography variant="body1" sx={{ mx: 2, color: '#b3b3b3' }}>
                      OR CONTINUE WITH
                    </Typography>
                    <Divider sx={{ flexGrow: 1 }} />
                  </Box>
                  
                  <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                    {[
                      { icon: <GoogleIcon />, label: 'Google' },
                      { icon: <FacebookIcon />, label: 'Facebook' },
                      { icon: <AppleIcon />, label: 'Apple' }
                    ].map((provider, i) => (
                      <Button
                        key={i}
                        variant="outlined"
                        startIcon={provider.icon}
                        sx={{
                          flex: 1,
                          py: 1.2,
                          borderColor: 'rgba(255,255,255,0.2)',
                          color: '#fff',
                          textTransform: 'none',
                          borderRadius: 2,
                          fontSize: '0.9rem',
                          '&:hover': {
                            borderColor: '#fff',
                            backgroundColor: 'rgba(255,255,255,0.05)'
                          }
                        }}
                      >
                        {provider.label}
                      </Button>
                    ))}
                  </Box>
                </Box>
                
                <Box sx={{ textAlign: 'center', mt: 4 }}>
                  <Typography variant="body1" sx={{ color: '#b3b3b3' }}>
                    Don't have an account?{' '}
                    <Link
                      component="button"
                      variant="body1"
                      onClick={goToSignup}
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
        </Box>
      </Container>
    </Box>
  );
}

export default Login;