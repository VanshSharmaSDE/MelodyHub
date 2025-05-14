import React from 'react';
import { 
  Box,
  Typography,
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  IconButton,
} from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';

function RecentlyPlayed({ data, onPlayTrack }) {
  return (
    <Box sx={{ mb: 5 }}>
      <Typography 
        variant="h5" 
        component="h2" 
        sx={{ 
          fontWeight: 700,
          mb: 3,
          fontSize: { xs: '1.5rem', md: '1.7rem' }
        }}
      >
        Recently Played
      </Typography>
      
      <Grid container spacing={2}>
        {data.map((item) => (
          <Grid item xs={6} sm={4} md={3} lg={2.4} key={item.id}>
            <Card
              sx={{
                bgcolor: 'rgba(30,30,30,0.7)',
                borderRadius: 2,
                overflow: 'hidden',
                transition: 'all 0.3s ease',
                '&:hover': {
                  bgcolor: 'rgba(40,40,40,0.7)',
                  transform: 'translateY(-5px)',
                  '& .play-button': {
                    opacity: 1,
                    transform: 'translateY(0)',
                  }
                },
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
              }}
            >
              <CardActionArea sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <CardMedia
                  component="img"
                  image={item.image}
                  alt={item.title}
                  sx={{
                    width: '100%',
                    paddingTop: '100%', // 1:1 aspect ratio
                    height: 0,
                    position: 'relative',
                  }}
                />
                <CardContent sx={{ flexGrow: 1, width: '100%', p: 2 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 0.5 }} noWrap>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" noWrap>
                    {item.artist}
                  </Typography>
                </CardContent>
              </CardActionArea>
              
              <IconButton
                className="play-button"
                onClick={() => onPlayTrack(item)}
                sx={{
                  position: 'absolute',
                  right: 10,
                  bottom: 10,
                  bgcolor: '#1DB954',
                  color: '#fff',
                  '&:hover': {
                    bgcolor: '#1ed760',
                    transform: 'scale(1.05) !important',
                  },
                  opacity: 0,
                  transform: 'translateY(10px)',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
                }}
              >
                {item.playing ? <PauseIcon /> : <PlayArrowIcon />}
              </IconButton>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default RecentlyPlayed;