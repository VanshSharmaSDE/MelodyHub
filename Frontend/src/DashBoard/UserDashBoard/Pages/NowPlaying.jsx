import React from 'react';
import { 
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Button,
  Grid,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';

function NowPlaying({ data }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  if (!data) return null;
  
  return (
    <Box sx={{ mb: 5 }}>
      <Card
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          bgcolor: 'rgba(25,25,25,0.95)',
          borderRadius: 3,
          overflow: 'hidden',
          background: `linear-gradient(to right, rgba(18,18,18,0.8) 0%, rgba(18,18,18,0.8) 100%), url(${data.image}) no-repeat center/cover`,
          boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
          p: { xs: 0, sm: 3 },
          animation: 'fadeIn 0.6s ease-out',
          '@keyframes fadeIn': {
            '0%': { opacity: 0, transform: 'translateY(10px)' },
            '100%': { opacity: 1, transform: 'translateY(0)' }
          }
        }}
      >
        <CardMedia
          component="img"
          sx={{
            width: { xs: '100%', sm: 180 },
            height: { xs: 180, sm: 180 },
            objectFit: 'cover',
            borderRadius: { xs: 0, sm: 2 },
            boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
          }}
          image={data.image}
          alt={data.title}
        />
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column',
          justifyContent: 'center',
          flexGrow: 1,
          px: { xs: 3, sm: 4 },
          py: { xs: 3, sm: 0 }
        }}>
          <Typography variant="overline" sx={{ color: '#1DB954', fontWeight: 600 }}>
            NOW PLAYING
          </Typography>
          <Typography 
            variant={isMobile ? 'h5' : 'h4'} 
            component="h2" 
            sx={{ 
              fontWeight: 700, 
              mb: 1,
              mt: 0.5
            }}
          >
            {data.title}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 2 }}>
            {data.artist}
          </Typography>
          
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                startIcon={data.playing ? <PauseIcon /> : <PlayArrowIcon />}
                sx={{
                  borderRadius: 6,
                  px: 3,
                  py: 1,
                  fontWeight: 700,
                  boxShadow: '0 4px 12px rgba(29, 185, 84, 0.5)',
                  '&:hover': {
                    boxShadow: '0 6px 16px rgba(29, 185, 84, 0.6)',
                  }
                }}
              >
                {data.playing ? 'Pause' : 'Play'}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Card>
    </Box>
  );
}

export default NowPlaying;