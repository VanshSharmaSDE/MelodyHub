import React from 'react';
import { Box, Container, Grid, Typography, Link, IconButton } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';

function Footer() {
  return (
    <Box sx={{ 
      bgcolor: '#0A0A0A', 
      py: { xs: 6, md: 8 },
      borderTop: '1px solid rgba(255, 255, 255, 0.1)'
    }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography 
              variant="h6" 
              component="div"
              sx={{ 
                fontWeight: 800,
                fontSize: '2rem',
                color: '#1DB954',
                mb: 3
              }}
            >
              MUSICIFY
            </Typography>
            <Typography 
              variant="body1" 
              sx={{ 
                color: '#B3B3B3',
                mb: 4,
                fontSize: '1.1rem',
                maxWidth: '300px',
                lineHeight: 1.6
              }}
            >
              The best way to listen to music. Discover songs you'll love and enjoy music without limits.
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              {[<FacebookIcon />, <InstagramIcon />, <TwitterIcon />].map((icon, i) => (
                <IconButton 
                  key={i} 
                  sx={{ 
                    color: 'white',
                    bgcolor: 'rgba(255, 255, 255, 0.1)',
                    transition: 'all 0.3s ease',
                    '&:hover': { 
                      bgcolor: '#1DB954',
                      transform: 'translateY(-5px)'
                    }
                  }}
                >
                  {icon}
                </IconButton>
              ))}
            </Box>
          </Grid>
          
          <Grid item xs={12} sm={6} md={4}>
            <Typography 
              variant="h6" 
              sx={{ 
                mb: 3, 
                fontSize: '1.4rem',
                fontWeight: 600
              }}
            >
              Quick Links
            </Typography>
            <Box 
              component="ul" 
              sx={{ 
                listStyle: 'none',
                p: 0,
                m: 0
              }}
            >
              {['Home', 'Discover', 'Premium', 'Support'].map((item) => (
                <Box 
                  component="li" 
                  key={item} 
                  sx={{ 
                    mb: 2
                  }}
                >
                  <Link 
                    href="#" 
                    underline="none" 
                    sx={{ 
                      color: '#B3B3B3',
                      fontSize: '1.1rem',
                      display: 'inline-block',
                      transition: 'all 0.2s',
                      '&:hover': { 
                        color: '#1DB954',
                        transform: 'translateX(5px)'
                      }
                    }}
                  >
                    {item}
                  </Link>
                </Box>
              ))}
            </Box>
          </Grid>
          
          <Grid item xs={12} sm={6} md={4}>
            <Typography 
              variant="h6" 
              sx={{ 
                mb: 3,
                fontSize: '1.4rem',
                fontWeight: 600
              }}
            >
              Company
            </Typography>
            <Box 
              component="ul" 
              sx={{ 
                listStyle: 'none',
                p: 0,
                m: 0
              }}
            >
              {['About Us', 'Careers', 'For Artists', 'Legal'].map((item) => (
                <Box 
                  component="li" 
                  key={item} 
                  sx={{ 
                    mb: 2
                  }}
                >
                  <Link 
                    href="#" 
                    underline="none" 
                    sx={{ 
                      color: '#B3B3B3',
                      fontSize: '1.1rem',
                      display: 'inline-block',
                      transition: 'all 0.2s',
                      '&:hover': { 
                        color: '#1DB954',
                        transform: 'translateX(5px)'
                      }
                    }}
                  >
                    {item}
                  </Link>
                </Box>
              ))}
            </Box>
          </Grid>
        </Grid>
        
        <Box 
          sx={{ 
            mt: 6, 
            pt: 3, 
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: { xs: 'center', sm: 'center' },
            textAlign: { xs: 'center', sm: 'left' },
          }}
        >
          <Typography 
            variant="body2" 
            color="#B3B3B3"
            sx={{ 
              fontSize: '1rem',
              mb: { xs: 2, sm: 0 }
            }}
          >
            © 2025 Musicify. All rights reserved.
          </Typography>
          <Box 
            sx={{ 
              display: 'flex',
              gap: 3
            }}
          >
            {['Privacy Policy', 'Terms of Use', 'Cookies'].map((item) => (
              <Link 
                key={item} 
                href="#" 
                underline="none" 
                sx={{ 
                  color: '#B3B3B3',
                  fontSize: '1rem',
                  '&:hover': { color: '#1DB954' }
                }}
              >
                {item}
              </Link>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default Footer;