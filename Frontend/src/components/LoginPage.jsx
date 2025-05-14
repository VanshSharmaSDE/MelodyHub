import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Tabs,
  Tab,
  InputAdornment,
  IconButton,
  Divider,
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import AppleIcon from '@mui/icons-material/Apple';

function Login() {
  const [tab, setTab] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  
  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
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
        <Paper
          elevation={6}
          sx={{
            borderRadius: 4,
            overflow: 'hidden',
            bgcolor: '#181818',
            boxShadow: '0 10px 40px rgba(0,0,0,0.3)',
            transition: 'transform 0.3s ease',
            animation: 'fadeIn 0.6s ease-out',
            '@keyframes fadeIn': {
              '0%': { opacity: 0, transform: 'translateY(30px)' },
              '100%': { opacity: 1, transform: 'translateY(0)' }
            }
          }}
        >
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs
              value={tab}
              onChange={handleTabChange}
              variant="fullWidth"
              sx={{
                '& .MuiTab-root': {
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  py: 3,
                  color: '#b3b3b3',
                },
                '& .Mui-selected': {
                  color: '#1DB954 !important',
                },
                '& .MuiTabs-indicator': {
                  backgroundColor: '#1DB954',
                  height: 3,
                }
              }}
            >
              <Tab label="Login" />
              <Tab label="Register" />
            </Tabs>
          </Box>
          
          <Box sx={{ p: 5 }}>
            {tab === 0 ? (
              // Login Form
              <Box component="form" sx={{ '& > :not(style)': { mb: 3 } }}>
                <Typography variant="h4" sx={{ fontWeight: 700, mb: 4, textAlign: 'center' }}>
                  Welcome Back
                </Typography>
                
                <TextField
                  fullWidth
                  label="Email or Username"
                  variant="outlined"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      fontSize: '1.1rem',
                      backgroundColor: 'rgba(255,255,255,0.05)',
                    },
                  }}
                />
                
                <TextField
                  fullWidth
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  variant="outlined"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      fontSize: '1.1rem',
                      backgroundColor: 'rgba(255,255,255,0.05)',
                    },
                  }}
                  InputProps={{
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
                  >
                    Forgot Password?
                  </Button>
                </Box>
                
                <Button 
                  fullWidth
                  variant="contained"
                  color="primary"
                  size="large"
                  sx={{
                    py: 1.5,
                    borderRadius: 2,
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    boxShadow: '0 4px 12px rgba(29, 185, 84, 0.4)',
                    transition: 'all 0.3s ease',
                    mt: 2,
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0 6px 16px rgba(29, 185, 84, 0.6)',
                    }
                  }}
                >
                  Login
                </Button>
                
                <Box sx={{ display: 'flex', alignItems: 'center', my: 3 }}>
                  <Divider sx={{ flexGrow: 1 }} />
                  <Typography variant="body1" sx={{ mx: 2, color: '#b3b3b3' }}>
                    OR
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
            ) : (
              // Register Form
              <Box component="form" sx={{ '& > :not(style)': { mb: 3 } }}>
                <Typography variant="h4" sx={{ fontWeight: 700, mb: 4, textAlign: 'center' }}>
                  Create Account
                </Typography>
                
                <TextField
                  fullWidth
                  label="Full Name"
                  variant="outlined"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      fontSize: '1.1rem',
                      backgroundColor: 'rgba(255,255,255,0.05)',
                    },
                  }}
                />
                
                <TextField
                  fullWidth
                  label="Email Address"
                  variant="outlined"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      fontSize: '1.1rem',
                      backgroundColor: 'rgba(255,255,255,0.05)',
                    },
                  }}
                />
                
                <TextField
                  fullWidth
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  variant="outlined"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      fontSize: '1.1rem',
                      backgroundColor: 'rgba(255,255,255,0.05)',
                    },
                  }}
                  InputProps={{
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
                />
                
                <Button 
                  fullWidth
                  variant="contained"
                  color="primary"
                  size="large"
                  sx={{
                    py: 1.5,
                    borderRadius: 2,
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    boxShadow: '0 4px 12px rgba(29, 185, 84, 0.4)',
                    transition: 'all 0.3s ease',
                    mt: 2,
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0 6px 16px rgba(29, 185, 84, 0.6)',
                    }
                  }}
                >
                  Sign Up
                </Button>
                
                <Typography variant="body2" align="center" sx={{ mt: 2, color: '#b3b3b3' }}>
                  By signing up, you agree to our Terms and Privacy Policy
                </Typography>
                
                <Box sx={{ display: 'flex', alignItems: 'center', my: 3 }}>
                  <Divider sx={{ flexGrow: 1 }} />
                  <Typography variant="body1" sx={{ mx: 2, color: '#b3b3b3' }}>
                    OR
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
            )}
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}

export default Login;