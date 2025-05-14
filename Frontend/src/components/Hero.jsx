import React from 'react';
import { Box, Container, Typography, Button, Grid } from '@mui/material';
import HeadphonesIcon from '@mui/icons-material/Headphones';

function Hero() {
  return (
    <Box 
      sx={{ 
        pt: { xs: 8, md: 12 },
        pb: { xs: 10, md: 14 },
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, #121212 30%, #151515 100%)',
      }}
    >
      {/* Background decorative elements */}
      <Box sx={{
        position: 'absolute',
        width: '500px',
        height: '500px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(29,185,84,0.08) 0%, rgba(29,185,84,0) 70%)',
        bottom: '-250px',
        left: '-100px',
      }} />
      
      <Box sx={{
        position: 'absolute',
        width: '400px',
        height: '400px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(29,185,84,0.05) 0%, rgba(29,185,84,0) 70%)',
        top: '-200px',
        right: '-100px',
      }} />

      <Container maxWidth="lg">
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={6} 
            sx={{
              animation: 'slideUp 0.8s ease-out',
              '@keyframes slideUp': {
                '0%': { opacity: 0, transform: 'translateY(40px)' },
                '100%': { opacity: 1, transform: 'translateY(0)' }
              }
            }}
          >
            <Typography 
              variant="h1"
              sx={{
                fontWeight: 800,
                mb: 2,
                background: 'linear-gradient(90deg, #FFFFFF 0%, #1DB954 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textAlign: { xs: 'center', md: 'left' },
              }}
            >
              Music For Everyone
            </Typography>
            
            <Typography 
              variant="h6"
              sx={{
                color: '#B3B3B3',
                mb: 5,
                lineHeight: 1.6,
                fontSize: { xs: '1.1rem', md: '1.25rem' },
                maxWidth: { xs: '100%', md: '90%' },
                textAlign: { xs: 'center', md: 'left' },
              }}
            >
              Stream millions of songs without limits. Discover new music and create your perfect playlist with premium sound quality.
            </Typography>
            
            <Box sx={{ 
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              gap: 2,
              justifyContent: { xs: 'center', md: 'flex-start' }
            }}>
              <Button 
                variant="contained" 
                color="primary"
                size="large"
                sx={{ 
                  px: 4,
                  py: 1.5,
                  fontSize: '1.2rem',
                  boxShadow: '0 8px 16px rgba(29, 185, 84, 0.4)',
                  animation: 'pulse 2s infinite',
                  '@keyframes pulse': {
                    '0%': { boxShadow: '0 0 0 0 rgba(29, 185, 84, 0.7)' },
                    '70%': { boxShadow: '0 0 0 10px rgba(29, 185, 84, 0)' },
                    '100%': { boxShadow: '0 0 0 0 rgba(29, 185, 84, 0)' }
                  }
                }}
              >
                Get Started Free
              </Button>
              
              <Button 
                variant="outlined"
                size="large"
                sx={{ 
                  px: 4,
                  py: 1.5,
                  fontSize: '1.2rem',
                  borderColor: 'rgba(255,255,255,0.5)',
                  color: '#fff',
                  '&:hover': {
                    borderColor: '#1DB954',
                    backgroundColor: 'rgba(29, 185, 84, 0.1)',
                  }
                }}
              >
                Learn More
              </Button>
            </Box>
          </Grid>
          
          <Grid item xs={12} md={6} sx={{ 
            display: 'flex',
            justifyContent: 'center',
            animation: 'fadeIn 1s ease-out',
            '@keyframes fadeIn': {
              '0%': { opacity: 0 },
              '100%': { opacity: 1 }
            }
          }}>
            <Box 
              sx={{ 
                position: 'relative',
                width: { xs: '280px', md: '350px' },
                height: { xs: '280px', md: '350px' },
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mt: { xs: 5, md: 0 }
              }}
            >
              {/* Circular background with animation */}
              <Box 
                sx={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, rgba(29,185,84,0.2) 0%, rgba(29,185,84,0.05) 100%)',
                  animation: 'rotate 20s linear infinite',
                  '@keyframes rotate': {
                    '0%': { transform: 'rotate(0deg)' },
                    '100%': { transform: 'rotate(360deg)' }
                  }
                }}
              />
              
              {/* Inner circle */}
              <Box 
                sx={{
                  position: 'absolute',
                  width: '80%',
                  height: '80%',
                  borderRadius: '50%',
                  background: '#181818',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <HeadphonesIcon sx={{ 
                  fontSize: { xs: 100, md: 120 },
                  color: '#1DB954',
                  animation: 'pulse 2s infinite ease-in-out',
                  '@keyframes pulse': {
                    '0%': { transform: 'scale(1)' },
                    '50%': { transform: 'scale(1.1)' },
                    '100%': { transform: 'scale(1)' }
                  }
                }} />
              </Box>
              
              {/* Music note decorations */}
              {[45, 135, 225, 315].map((angle, i) => (
                <Box 
                  key={i}
                  sx={{
                    position: 'absolute',
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    backgroundColor: i % 2 === 0 ? '#1DB954' : '#fff',
                    transform: `rotate(${angle}deg) translateX(${i % 2 === 0 ? 140 : 150}px)`,
                    animation: `float ${3 + i * 0.5}s ease-in-out infinite alternate`,
                    '@keyframes float': {
                      '0%': { transform: `rotate(${angle}deg) translateX(${i % 2 === 0 ? 140 : 150}px) translateY(0)` },
                      '100%': { transform: `rotate(${angle}deg) translateX(${i % 2 === 0 ? 140 : 150}px) translateY(-10px)` }
                    }
                  }}
                />
              ))}
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default Hero;