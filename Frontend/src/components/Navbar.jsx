import React, { useState, useEffect } from 'react';
import { 
  AppBar, 
  Box, 
  Toolbar, 
  Typography, 
  Button, 
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Container,
  useMediaQuery,
  useTheme
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { Link, useNavigate } from 'react-router-dom';
import { isAuthenticated, isAdmin, clearAuth } from '../utils/auth';

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isAdminUser, setIsAdminUser] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();

  const navItems = ['Home', 'Discover'];

  // Check authentication status when component mounts
  useEffect(() => {
    const checkAuth = () => {
      const authStatus = isAuthenticated();
      setLoggedIn(authStatus);
      setIsAdminUser(isAdmin());
    };
    
    checkAuth();
    
    // You could add an event listener for storage changes if needed
    // to handle login/logout in other tabs
    const handleStorageChange = () => {
      checkAuth();
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  
  const handleDashboardClick = () => {
    if (isAdminUser) {
      navigate('/admin/dashboard');
    } else {
      navigate('/user/dashboard');
    }
  };
  
  const handleLogout = () => {
    clearAuth();
    setLoggedIn(false);
    setIsAdminUser(false);
    navigate('/login');
  };

  return (
    <AppBar 
      position="sticky" 
      elevation={0}
      sx={{ 
        backgroundColor: 'rgba(18, 18, 18, 0.9)', 
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ height: 80 }}>
          <Typography 
            variant="h6" 
            component="div"
            sx={{
              flexGrow: 1, 
              fontWeight: 800,
              fontSize: { xs: '1.8rem', md: '2rem' },
              color: '#1DB954',
              letterSpacing: '1px',
              animation: 'fadeIn 0.6s ease-in',
              '@keyframes fadeIn': {
                '0%': { opacity: 0, transform: 'translateY(-10px)' },
                '100%': { opacity: 1, transform: 'translateY(0)' }
              }
            }}
          >
            MUSICIFY
          </Typography>

          {isMobile ? (
            <IconButton
              color="inherit"
              aria-label="open menu"
              edge="end"
              onClick={handleDrawerToggle}
              sx={{
                animation: 'fadeIn 0.6s ease-in',
                '@keyframes fadeIn': {
                  '0%': { opacity: 0 },
                  '100%': { opacity: 1 }
                }
              }}
            >
              <MenuIcon sx={{ fontSize: '2rem' }} />
            </IconButton>
          ) : (
            <Box sx={{ 
              display: 'flex', 
              gap: 2,
              animation: 'fadeIn 0.6s ease-in',
              '@keyframes fadeIn': {
                '0%': { opacity: 0, transform: 'translateY(-10px)' },
                '100%': { opacity: 1, transform: 'translateY(0)' }
              }
            }}>
              {navItems.map((item) => (
                <Link 
                  key={item} 
                  to={`/${item.toLowerCase()}`}
                  style={{ textDecoration: 'none' }}
                >
                  <Button 
                    sx={{ 
                      color: '#B3B3B3', 
                      fontSize: '1.1rem',
                      padding: '8px 16px',
                      transition: 'all 0.2s ease',
                      '&:hover': { 
                        color: '#1DB954',
                        transform: 'translateY(-2px)'
                      }
                    }}
                  >
                    {item}
                  </Button>
                </Link>
              ))}

              {/* Dashboard button - only visible when logged in */}
              {loggedIn && (
                <Button 
                  startIcon={<DashboardIcon />}
                  onClick={handleDashboardClick}
                  sx={{ 
                    color: '#1DB954', 
                    fontSize: '1.1rem',
                    padding: '8px 16px',
                    transition: 'all 0.2s ease',
                    '&:hover': { 
                      color: '#fff',
                      transform: 'translateY(-2px)'
                    }
                  }}
                >
                  Dashboard
                </Button>
              )}

              {loggedIn ? (
                <Button 
                  variant="outlined" 
                  color="error"
                  onClick={handleLogout}
                  sx={{ 
                    ml: 1,
                    fontWeight: 600,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'scale(1.05)',
                    }
                  }}
                >
                  Logout
                </Button>
              ) : (
                <Link to="/login" style={{ textDecoration: 'none' }}>
                  <Button 
                    variant="contained" 
                    color="primary" 
                    sx={{ 
                      ml: 1,
                      fontWeight: 700,
                      boxShadow: '0 4px 12px rgba(29, 185, 84, 0.5)',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'scale(1.05)',
                        boxShadow: '0 6px 15px rgba(29, 185, 84, 0.6)',
                      }
                    }}
                  >
                    Try Premium
                  </Button>
                </Link>
              )}
            </Box>
          )}
        </Toolbar>
      </Container>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        sx={{
          '& .MuiDrawer-paper': { 
            width: 280,
            bgcolor: '#121212',
            borderLeft: '1px solid rgba(255, 255, 255, 0.1)'
          },
        }}
      >
        <Box sx={{ p: 2, textAlign: 'center' }}>
          <Typography 
            variant="h6" 
            sx={{ 
              fontWeight: 800, 
              color: '#1DB954',
              fontSize: '1.8rem',
              my: 2
            }}
          >
            MUSICIFY
          </Typography>

          <List sx={{ mt: 4 }}>
            {navItems.map((item) => (
              <ListItem 
                button 
                key={item}
                component={Link}
                to={`/${item.toLowerCase()}`}
                sx={{
                  borderRadius: 2,
                  mb: 1,
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    bgcolor: 'rgba(29, 185, 84, 0.1)',
                  }
                }}
              >
                <ListItemText 
                  primary={item} 
                  primaryTypographyProps={{ 
                    fontSize: '1.2rem', 
                    align: 'center',
                    fontWeight: 500
                  }} 
                />
              </ListItem>
            ))}

            {/* Dashboard button in mobile menu - only visible when logged in */}
            {loggedIn && (
              <ListItem 
                button 
                onClick={handleDashboardClick}
                sx={{
                  borderRadius: 2,
                  mb: 1,
                  transition: 'all 0.2s ease',
                  bgcolor: 'rgba(29, 185, 84, 0.1)',
                  '&:hover': {
                    bgcolor: 'rgba(29, 185, 84, 0.2)',
                  }
                }}
              >
                <ListItemText 
                  primary="Dashboard" 
                  primaryTypographyProps={{ 
                    fontSize: '1.2rem', 
                    align: 'center',
                    fontWeight: 700,
                    color: '#1DB954'
                  }} 
                />
              </ListItem>
            )}

            {loggedIn ? (
              <Button 
                variant="outlined" 
                color="error" 
                fullWidth 
                onClick={handleLogout}
                sx={{ 
                  mt: 3,
                  py: 1.5,
                  fontSize: '1.1rem'
                }}
              >
                Logout
              </Button>
            ) : (
              <Button 
                variant="contained" 
                color="primary" 
                fullWidth
                component={Link}
                to="/login" 
                sx={{ 
                  mt: 3,
                  py: 1.5,
                  fontSize: '1.1rem'
                }}
              >
                Try Premium
              </Button>
            )}
          </List>
        </Box>
      </Drawer>
    </AppBar>
  );
}

export default Navbar;