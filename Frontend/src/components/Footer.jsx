import React, { useState } from 'react';
import { 
  Box, 
  Container, 
  Grid, 
  Typography, 
  Link, 
  IconButton, 
  TextField, 
  Button, 
  Divider, 
  useTheme, 
  useMediaQuery,
  Collapse,
  Paper
} from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import AppleIcon from '@mui/icons-material/Apple';
import AndroidIcon from '@mui/icons-material/Android';
import SendIcon from '@mui/icons-material/Send';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import EmailIcon from '@mui/icons-material/Email';
import HeadphonesIcon from '@mui/icons-material/Headphones';
import { useNavigate } from 'react-router-dom';

function Footer() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [expandedSection, setExpandedSection] = useState({
    links: !isMobile,
    company: !isMobile,
    legal: !isMobile
  });
  
  const toggleSection = (section) => {
    if (isMobile) {
      setExpandedSection(prev => ({
        ...prev,
        [section]: !prev[section]
      }));
    }
  };
  
  const handleNavigation = (path) => {
    navigate(path);
  };
  
  const handleSubscribe = (e) => {
    e.preventDefault();
    // Subscription logic would go here
    alert(`Thanks for subscribing with ${email}!`);
    setEmail('');
  };
  
  const currentYear = new Date().getFullYear();

  return (
    <Box 
      component="footer"
      sx={{ 
        bgcolor: '#080808', 
        py: { xs: 6, md: 8 },
        borderTop: '1px solid rgba(255, 255, 255, 0.05)',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: '-150px',
          left: '-100px',
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(29, 185, 84, 0.05) 0%, rgba(29, 185, 84, 0) 70%)',
          zIndex: 0,
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          bottom: '-100px',
          right: '-50px',
          width: '250px',
          height: '250px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(29, 185, 84, 0.03) 0%, rgba(29, 185, 84, 0) 70%)',
          zIndex: 0,
        }
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Grid container spacing={4}>
          {/* Main Content Area - Left Side */}
          <Grid item xs={12} md={8}>
            <Grid container spacing={12}>
              {/* Logo and Description */}
              <Grid item xs={12} md={6}>
                <Box sx={{ mb: 3 }}>
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    mb: 2 
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
                      variant="h6" 
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
                  
                  <Typography 
                    variant="body1" 
                    sx={{ 
                      color: '#B3B3B3',
                      mb: 4,
                      fontSize: { xs: '1rem', md: '1.1rem' },
                      maxWidth: '350px',
                      lineHeight: 1.7,
                    }}
                  >
                    Your ultimate destination for music discovery and enjoyment. Stream millions of songs, create personalized playlists, and connect with artists worldwide.
                  </Typography>
                  
                  {/* Social Media Links */}
                  <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
                    {[
                      { icon: <FacebookIcon />, name: 'Facebook' },
                      { icon: <InstagramIcon />, name: 'Instagram' },
                      { icon: <TwitterIcon />, name: 'Twitter' }, 
                      { icon: <YouTubeIcon />, name: 'YouTube' }
                    ].map((social, i) => (
                      <IconButton 
                        key={i} 
                        aria-label={`Follow us on ${social.name}`}
                        sx={{ 
                          color: 'white',
                          bgcolor: 'rgba(255, 255, 255, 0.07)',
                          transition: 'all 0.3s ease',
                          '&:hover': { 
                            bgcolor: '#1DB954',
                            transform: 'translateY(-5px)',
                            boxShadow: '0 5px 15px rgba(29, 185, 84, 0.3)'
                          }
                        }}
                      >
                        {social.icon}
                      </IconButton>
                    ))}
                  </Box>
                </Box>
              </Grid>

              <Grid item xs={12} md={6}>
                {/* Download App */}
                <Box sx={{ mb: 4, mt: { xs: 0, md: 2 } }}>
                  <Typography 
                    variant="subtitle1"
                    sx={{ 
                      fontWeight: 600, 
                      mb: 2, 
                      color: 'white',
                      fontSize: '1.1rem',
                      position: 'relative',
                      display: 'inline-block',
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        bottom: -5,
                        left: 0,
                        width: 24,
                        height: 2,
                        bgcolor: '#1DB954',
                        borderRadius: 3,
                      }
                    }}
                  >
                    Download Our App
                  </Typography>
                  
                  <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                    {[
                      { icon: <AppleIcon />, text: 'iOS App' },
                      { icon: <AndroidIcon />, text: 'Android App' }
                    ].map((app, i) => (
                      <Button
                        key={i}
                        variant="outlined"
                        startIcon={app.icon}
                        sx={{
                          borderColor: 'rgba(255,255,255,0.3)',
                          color: 'white',
                          textTransform: 'none',
                          px: 2,
                          '&:hover': {
                            borderColor: '#1DB954',
                            color: '#1DB954',
                            backgroundColor: 'rgba(29, 185, 84, 0.08)'
                          }
                        }}
                      >
                        {app.text}
                      </Button>
                    ))}
                  </Box>
                </Box>

                {/* Customer Support */}
                <Box sx={{ mb: 3 }}>
                  <Typography 
                    variant="subtitle1" 
                    sx={{ 
                      fontWeight: 600, 
                      mb: 2, 
                      color: 'white',
                      fontSize: '1.1rem',
                      position: 'relative',
                      display: 'inline-block',
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        bottom: -5,
                        left: 0,
                        width: 24,
                        height: 2,
                        bgcolor: '#1DB954',
                        borderRadius: 3,
                      }
                    }}
                  >
                    Need Help?
                  </Typography>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <HeadphonesIcon sx={{ color: '#1DB954', mr: 1, fontSize: '1.2rem' }} />
                    <Link
                      href="#/support"
                      underline="none"
                      sx={{
                        color: '#B3B3B3',
                        fontWeight: 500,
                        display: 'inline-block',
                        '&:hover': {
                          color: '#1DB954',
                        }
                      }}
                    >
                      Contact our support team
                    </Link>
                  </Box>
                </Box>
              </Grid>

              {/* Links Sections */}
              <Grid item xs={12} sm={6}>
                <Box sx={{ mb: { xs: 1, md: 3 } }}>
                  <Box 
                    onClick={() => toggleSection('links')}
                    sx={{ 
                      display: 'flex', 
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      cursor: isMobile ? 'pointer' : 'default',
                      '&:hover': isMobile ? { 
                        '& .MuiTypography-root': { color: '#1DB954' } 
                      } : {},
                    }}
                  >
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        fontSize: { xs: '1.2rem', md: '1.3rem' },
                        fontWeight: 700,
                        mb: isMobile ? 1 : 3,
                        position: 'relative',
                        display: 'inline-block',
                        color: 'white',
                        '&::after': !isMobile ? {
                          content: '""',
                          position: 'absolute',
                          bottom: -8,
                          left: 0,
                          width: 30,
                          height: 3,
                          bgcolor: '#1DB954',
                          borderRadius: 3,
                        } : {}
                      }}
                    >
                      Explore
                    </Typography>
                    
                    {isMobile && (
                      expandedSection.links ? 
                        <KeyboardArrowUpIcon sx={{ color: '#1DB954' }}/> : 
                        <KeyboardArrowDownIcon sx={{ color: '#B3B3B3' }}/>
                    )}
                  </Box>
                  
                  <Collapse in={expandedSection.links}>
                    <Box 
                      component="ul" 
                      sx={{ 
                        listStyle: 'none',
                        p: 0,
                        m: 0
                      }}
                    >
                      {[
                        { name: 'Home', path: '/' },
                        { name: 'Discover', path: '/discover' },
                        { name: 'Premium', path: '/premium' },
                        { name: 'Charts', path: '/charts' },
                        { name: 'Genres', path: '/genres' }
                      ].map((item) => (
                        <Box 
                          component="li" 
                          key={item.name} 
                          sx={{ mb: 2 }}
                        >
                          <Link 
                            component="button"
                            onClick={() => handleNavigation(item.path)}
                            underline="none" 
                            sx={{ 
                              color: '#B3B3B3',
                              fontSize: '1rem',
                              display: 'inline-block',
                              transition: 'all 0.2s',
                              '&:hover': { 
                                color: '#1DB954',
                                transform: 'translateX(5px)'
                              }
                            }}
                          >
                            {item.name}
                          </Link>
                        </Box>
                      ))}
                    </Box>
                  </Collapse>
                </Box>
              </Grid>
              
              {/* Company */}
              <Grid item xs={12} sm={6}>
                <Box sx={{ mb: { xs: 1, md: 3 } }}>
                  <Box 
                    onClick={() => toggleSection('company')}
                    sx={{ 
                      display: 'flex', 
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      cursor: isMobile ? 'pointer' : 'default',
                      '&:hover': isMobile ? { 
                        '& .MuiTypography-root': { color: '#1DB954' } 
                      } : {},
                    }}
                  >
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        fontSize: { xs: '1.2rem', md: '1.3rem' },
                        fontWeight: 700,
                        mb: isMobile ? 1 : 3,
                        position: 'relative',
                        display: 'inline-block',
                        color: 'white',
                        '&::after': !isMobile ? {
                          content: '""',
                          position: 'absolute',
                          bottom: -8,
                          left: 0,
                          width: 30,
                          height: 3,
                          bgcolor: '#1DB954',
                          borderRadius: 3,
                        } : {}
                      }}
                    >
                      Company
                    </Typography>
                    
                    {isMobile && (
                      expandedSection.company ? 
                        <KeyboardArrowUpIcon sx={{ color: '#1DB954' }}/> : 
                        <KeyboardArrowDownIcon sx={{ color: '#B3B3B3' }}/>
                    )}
                  </Box>
                  
                  <Collapse in={expandedSection.company}>
                    <Box 
                      component="ul" 
                      sx={{ 
                        listStyle: 'none',
                        p: 0,
                        m: 0
                      }}
                    >
                      {[
                        { name: 'About Us', path: '/about' },
                        { name: 'Careers', path: '/careers' },
                        { name: 'For Artists', path: '/artists' },
                        { name: 'Newsroom', path: '/news' },
                        { name: 'Partners', path: '/partners' }
                      ].map((item) => (
                        <Box 
                          component="li" 
                          key={item.name} 
                          sx={{ mb: 2 }}
                        >
                          <Link 
                            component="button"
                            onClick={() => handleNavigation(item.path)}
                            underline="none" 
                            sx={{ 
                              color: '#B3B3B3',
                              fontSize: '1rem',
                              display: 'inline-block',
                              transition: 'all 0.2s',
                              '&:hover': { 
                                color: '#1DB954',
                                transform: 'translateX(5px)'
                              }
                            }}
                          >
                            {item.name}
                          </Link>
                        </Box>
                      ))}
                    </Box>
                  </Collapse>
                </Box>
              </Grid>
            </Grid>
          </Grid>
          
          {/* Newsletter Section - Right Side */}
          <Grid item xs={12} md={4} width={'100%'} display="flex" justifyContent="center">
            <Paper 
              elevation={0}
              sx={{ 
                bgcolor: 'rgba(255,255,255,0.03)',
                p: { xs: 3, md: 4 },
                borderRadius: 3,
                border: '1px solid rgba(255,255,255,0.05)',
                height: '100%',
                position: 'relative',
                overflow: 'hidden',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: 3,
                  background: 'linear-gradient(90deg, #1DB954, rgba(29, 185, 84, 0.4))',
                }
              }}
            >
              <EmailIcon 
                sx={{ 
                  position: 'absolute',
                  bottom: -20,
                  right: -20,
                  fontSize: 120,
                  color: 'rgba(29, 185, 84, 0.03)',
                  transform: 'rotate(-10deg)',
                  zIndex: 0
                }}
              />
              
              <Box sx={{ position: 'relative', zIndex: 1 }}>
                <Typography 
                  variant="h5" 
                  sx={{ 
                    fontSize: { xs: '1.4rem', md: '1.5rem' },
                    fontWeight: 700,
                    mb: 1,
                    color: 'white',
                  }}
                >
                  Join Our Newsletter
                </Typography>
                
                <Typography 
                  variant="body1" 
                  sx={{ 
                    color: '#B3B3B3', 
                    mb: 3,
                    fontSize: '0.95rem',
                    lineHeight: 1.6
                  }}
                >
                  Subscribe for exclusive updates, new releases, and personalized music recommendations delivered directly to your inbox.
                </Typography>
                
                <Box 
                  component="form" 
                  onSubmit={handleSubscribe}
                  sx={{ 
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    mb: 3
                  }}
                >
                  <TextField
                    variant="outlined"
                    placeholder="Your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    fullWidth
                    required
                    type="email"
                    InputProps={{
                      sx: {
                        bgcolor: 'rgba(255,255,255,0.05)',
                        borderRadius: '8px',
                        '& input': { 
                          color: 'white',
                          p: '12px 14px',
                          '&::placeholder': {
                            color: 'rgba(255,255,255,0.5)',
                            opacity: 1
                          }
                        },
                        '& fieldset': { 
                          border: '1px solid rgba(255,255,255,0.1)',
                          '&:hover': {
                            borderColor: 'rgba(255,255,255,0.3)'
                          }
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#1DB954 !important',
                        }
                      }
                    }}
                  />
                  
                  <Button
                    variant="contained"
                    type="submit"
                    startIcon={<SendIcon />}
                    sx={{
                      bgcolor: '#1DB954',
                      py: '12px',
                      minWidth: '100%',
                      borderRadius: '8px',
                      textTransform: 'none',
                      fontWeight: 600,
                      fontSize: '1rem',
                      transition: 'all 0.3s',
                      boxShadow: '0 4px 10px rgba(29, 185, 84, 0.3)',
                      '&:hover': {
                        bgcolor: '#0DA945',
                        boxShadow: '0 6px 15px rgba(29, 185, 84, 0.4)',
                        transform: 'translateY(-2px)'
                      }
                    }}
                  >
                    Subscribe Now
                  </Button>
                </Box>
                
                <Typography 
                  variant="caption" 
                  sx={{ 
                    display: 'block',
                    color: 'rgba(255,255,255,0.4)',
                    fontSize: '0.75rem',
                    textAlign: 'center'
                  }}
                >
                  By subscribing, you agree to our Privacy Policy and consent to receive updates from us.
                </Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>
        
        {/* Legal and Copyright Section */}
        <Box sx={{ mt: { xs: 5, md: 7 } }}>
          <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.05)', mb: 4 }} />
          
          <Box 
            sx={{ 
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              justifyContent: 'space-between',
              alignItems: { xs: 'flex-start', md: 'center' },
            }}
          >
            <Typography 
              variant="body2" 
              sx={{ 
                color: 'rgba(255, 255, 255, 0.5)',
                fontSize: '0.9rem',
                mb: { xs: 3, md: 0 }
              }}
            >
              © {currentYear} Musicify. All rights reserved.
            </Typography>
            
            <Box 
              sx={{ 
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                gap: { xs: 1.5, sm: 4 }
              }}
            >
              {[
                { name: 'Privacy Policy', path: '/privacy' },
                { name: 'Terms of Use', path: '/terms' },
                { name: 'Cookies', path: '/cookies' },
                { name: 'Accessibility', path: '/accessibility' }
              ].map((item) => (
                <Link 
                  key={item.name} 
                  component="button" 
                  onClick={() => handleNavigation(item.path)}
                  underline="none" 
                  sx={{ 
                    color: 'rgba(255, 255, 255, 0.5)',
                    fontSize: '0.9rem',
                    transition: 'color 0.2s',
                    textAlign: { xs: 'left', sm: 'center' },
                    '&:hover': { color: '#1DB954' }
                  }}
                >
                  {item.name}
                </Link>
              ))}
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default Footer;