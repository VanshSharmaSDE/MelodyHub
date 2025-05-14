import React, { useState } from 'react';
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
import { Link } from 'react-router-dom';

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const navItems = ['Home', 'Discover', 'Login'];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
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
              {navItems.map((item, index) => (
                <>
                {console.log(item)}
                <Link to={`/${item}`}>
                
                <Button 
                  key={item} 
                  sx={{ 
                    color: index >= 2 ? '#fff' : '#B3B3B3', 
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
                </>
              ))}
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
            <Button 
              variant="contained" 
              color="primary" 
              fullWidth 
              sx={{ 
                mt: 3,
                py: 1.5,
                fontSize: '1.1rem'
              }}
            >
              Try Premium
            </Button>
          </List>
        </Box>
      </Drawer>
    </AppBar>
  );
}

export default Navbar;