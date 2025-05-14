import React from 'react';
import { Box, Container, Typography, Grid, Card, CardContent } from '@mui/material';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import QueueMusicIcon from '@mui/icons-material/QueueMusic';
import AlbumIcon from '@mui/icons-material/Album';
import SurroundSoundIcon from '@mui/icons-material/SurroundSound';

function Features() {
  const features = [
    {
      icon: <MusicNoteIcon sx={{ fontSize: 40 }} />,
      title: "Millions of Songs",
      description: "Access to over 70 million songs from artists all around the world.",
    },
    {
      icon: <QueueMusicIcon sx={{ fontSize: 40 }} />,
      title: "Easy Playlists",
      description: "Create and share playlists of your favorite songs with friends.",
    },
    {
      icon: <AlbumIcon sx={{ fontSize: 40 }} />,
      title: "New Releases",
      description: "Be the first to hear newly released songs and albums.",
    },
    {
      icon: <SurroundSoundIcon sx={{ fontSize: 40 }} />,
      title: "HD Sound Quality",
      description: "Experience crystal clear sound with our premium quality audio.",
    },
  ];

  return (
    <Box sx={{ 
      py: { xs: 8, md: 12 },
      backgroundColor: '#0C0C0C',
      position: 'relative'
    }}>
      <Container maxWidth="lg">
        <Typography 
          variant="h2" 
          align="center"
          sx={{ 
            mb: { xs: 6, md: 8 },
            fontWeight: 700,
            animation: 'fadeInUp 0.8s ease-out',
            '@keyframes fadeInUp': {
              '0%': { opacity: 0, transform: 'translateY(20px)' },
              '100%': { opacity: 1, transform: 'translateY(0)' }
            }
          }}
        >
          Why Choose <Box component="span" sx={{ color: '#1DB954' }}>Musicify</Box>
        </Typography>

        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid 
              item 
              xs={12} 
              sm={6} 
              key={index}
              sx={{
                animation: `fadeInUp 0.8s ease-out ${0.2 + index * 0.1}s forwards`,
                opacity: 0,
                '@keyframes fadeInUp': {
                  '0%': { opacity: 0, transform: 'translateY(30px)' },
                  '100%': { opacity: 1, transform: 'translateY(0)' }
                }
              }}
            >
              <Card 
                sx={{ 
                  height: '100%',
                  backgroundColor: '#181818',
                  '&:hover': {
                    boxShadow: '0 10px 25px rgba(29, 185, 84, 0.2)',
                  }
                }}
              >
                <CardContent sx={{ p: 4 }}>
                  <Box sx={{ 
                    display: 'flex',
                    alignItems: 'center',
                    mb: 2.5,
                  }}>
                    <Box 
                      sx={{ 
                        bgcolor: 'rgba(29, 185, 84, 0.15)',
                        color: '#1DB954',
                        width: 70,
                        height: 70,
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mr: 2.5,
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          bgcolor: '#1DB954',
                          color: '#fff',
                          transform: 'rotate(10deg)',
                        }
                      }}
                    >
                      {feature.icon}
                    </Box>
                    <Typography 
                      variant="h3" 
                      component="h3"
                      sx={{ 
                        fontWeight: 700,
                        fontSize: { xs: '1.75rem', md: '2rem' }
                      }}
                    >
                      {feature.title}
                    </Typography>
                  </Box>
                  <Typography 
                    variant="body1" 
                    color="text.secondary"
                    sx={{ 
                      fontSize: '1.1rem',
                      lineHeight: 1.7,
                    }}
                  >
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

export default Features;