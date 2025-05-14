import React from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Button, 
  Paper, 
  LinearProgress 
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ConstructionIcon from '@mui/icons-material/Construction';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MusicNoteIcon from '@mui/icons-material/MusicNote';

function UnderDevelopment() {
  const navigate = useNavigate();
  
  const handleBack = () => {
    navigate('/');
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        py: 8,
        background: 'linear-gradient(135deg, #121212 30%, #151515 100%)',
      }}
    >
      <Container maxWidth="md">
        <Paper
          elevation={6}
          sx={{
            borderRadius: 4,
            overflow: 'hidden',
            bgcolor: '#181818',
            boxShadow: '0 10px 40px rgba(0,0,0,0.3)',
            textAlign: 'center',
            py: 8,
            px: { xs: 3, md: 8 },
            position: 'relative',
            animation: 'fadeIn 0.6s ease-out',
            '@keyframes fadeIn': {
              '0%': { opacity: 0, transform: 'translateY(30px)' },
              '100%': { opacity: 1, transform: 'translateY(0)' }
            }
          }}
        >
          <Box sx={{ mb: 4, display: 'flex', justifyContent: 'center' }}>
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
          
          <Box sx={{ mb: 4, display: 'flex', justifyContent: 'center' }}>
            <ConstructionIcon sx={{ fontSize: 80, color: '#1DB954', mb: 2 }} />
          </Box>
          
          <Typography 
            variant="h3" 
            component="h1" 
            sx={{ 
              fontWeight: 800, 
              mb: 2,
              fontSize: { xs: '2rem', md: '2.5rem' },
              color: 'white',
            }}
          >
            Under Development
          </Typography>
          
          <Typography 
            variant="h5" 
            component="h2" 
            sx={{ 
              fontWeight: 500, 
              mb: 3,
              color: '#1DB954'
            }}
          >
            We're fine-tuning this experience
          </Typography>
          
          <Typography 
            variant="body1" 
            sx={{ 
              mb: 5, 
              color: '#b3b3b3',
              fontSize: '1.1rem',
              maxWidth: '600px',
              mx: 'auto'
            }}
          >
            Our team is working hard to bring you an amazing feature.
            Check back soon to experience the newest additions to Musicify.
          </Typography>
          
          <Box sx={{ px: 4, mb: 5 }}>
            <Typography variant="body2" sx={{ mb: 1, color: 'rgba(255,255,255,0.7)', textAlign: 'left' }}>
              Development Progress
            </Typography>
            <LinearProgress 
              variant="determinate" 
              value={75} 
              sx={{
                height: 8,
                borderRadius: 4,
                bgcolor: 'rgba(255,255,255,0.1)',
                '& .MuiLinearProgress-bar': {
                  bgcolor: '#1DB954',
                }
              }}
            />
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
              <Typography variant="body2" sx={{ color: '#1DB954' }}>
                75% Complete
              </Typography>
            </Box>
          </Box>
          
          <Button 
            variant="contained" 
            color="primary"
            size="large"
            startIcon={<ArrowBackIcon />}
            onClick={handleBack}
            sx={{
              py: 1.5,
              px: 4,
              borderRadius: 2,
              fontSize: '1.1rem',
              fontWeight: 600,
              boxShadow: '0 4px 12px rgba(29, 185, 84, 0.4)',
              background: 'linear-gradient(90deg, #1DB954, #1ed760)',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 6px 16px rgba(29, 185, 84, 0.6)',
              }
            }}
          >
            Back to Home
          </Button>
        </Paper>
      </Container>
    </Box>
  );
}

export default UnderDevelopment;