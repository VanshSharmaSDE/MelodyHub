import React, { useEffect } from 'react';
import { Box, Container, CssBaseline, ThemeProvider, Typography, Button, Grid, Card, CardContent, CardMedia } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import PlaylistPlayIcon from '@mui/icons-material/PlaylistPlay';
import DevicesIcon from '@mui/icons-material/Devices';
import theme from '../../theme/theme';


// Featured playlists data
const featuredPlaylists = [
  {
    id: 1,
    title: "Today's Top Hits",
    description: "The hottest tracks right now",
    image: "https://i.scdn.co/image/ab67706f000000035d87659dcadef82dd0e73f56",
  },
  {
    id: 2,
    title: "Chill Vibes",
    description: "Relaxing beats for your day",
    image: "https://i.scdn.co/image/ab67706f00000003bd0e19e810bb4b55ab164a95",
  },
  {
    id: 3,
    title: "Chill Vibes",
    description: "Relaxing beats for your day",
    image: "https://i.scdn.co/image/ab67706f00000003bd0e19e810bb4b55ab164a95",
  },
  {
    id: 4,
    title: "Chill Vibes",
    description: "Relaxing beats for your day",
    image: "https://i.scdn.co/image/ab67706f00000003bd0e19e810bb4b55ab164a95",
  },
  {
    id: 5,
    title: "Chill Vibes",
    description: "Relaxing beats for your day",
    image: "https://i.scdn.co/image/ab67706f00000003bd0e19e810bb4b55ab164a95",
  },
  {
    id: 6,
    title: "Chill Vibes",
    description: "Relaxing beats for your day",
    image: "https://i.scdn.co/image/ab67706f00000003bd0e19e810bb4b55ab164a95",
  },
    {
    id: 7,
    title: "Chill Vibes",
    description: "Relaxing beats for your day",
    image: "https://i.scdn.co/image/ab67706f00000003bd0e19e810bb4b55ab164a95",
  },

    {
    id: 8,
    title: "Chill Vibes",
    description: "Relaxing beats for your day",
    image: "https://i.scdn.co/image/ab67706f00000003bd0e19e810bb4b55ab164a95",
  },
  {
    id: 9,
    title: "Chill Vibes",
    description: "Relaxing beats for your day",
    image: "https://i.scdn.co/image/ab67706f00000003bd0e19e810bb4b55ab164a95",
  },
];

const HomePage = () => {
  // Animation for green circles
  useEffect(() => {
    const createCircle = () => {
      const circle = document.createElement('div');
      circle.classList.add('moving-circle');

      // Random size between 10px and 60px
      const size = Math.random() * 50 + 10;
      circle.style.width = `${size}px`;
      circle.style.height = `${size}px`;

      // Random position within viewport
      circle.style.left = `${Math.random() * 100}vw`;
      circle.style.top = `${Math.random() * 100}vh`;

      // Random opacity between 0.1 and 0.3
      circle.style.opacity = (Math.random() * 0.2 + 0.1).toString();

      // Random animation duration between 15s and 45s
      const duration = Math.random() * 30 + 15;
      circle.style.animationDuration = `${duration}s`;

      // Random direction for animation
      circle.style.animationDirection = Math.random() > 0.5 ? 'alternate' : 'alternate-reverse';

      document.getElementById('circles-container').appendChild(circle);

      // Remove circle after animation completes to prevent memory issues
      setTimeout(() => {
        circle.remove();
      }, duration * 1000);
    };

    // Create initial set of circles
    for (let i = 0; i < 10; i++) {
      createCircle();
    }

    // Add new circles periodically
    const interval = setInterval(createCircle, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        backgroundColor: 'background.default',
        color: 'white'
      }}>
        {/* Animated circles container */}
        <Box
          id="circles-container"
          sx={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            overflow: 'hidden',
            zIndex: 0,
            pointerEvents: 'none'
          }}
        />

        <Navbar />

        <Box component="main" sx={{ flexGrow: 1, position: 'relative', zIndex: 1 }}>
          {/* Hero Section */}
          <Box
            sx={{
              pt: { xs: 10, md: 16 },
              pb: { xs: 8, md: 14 },
              px: { xs: 2, sm: 4, md: 8 },
              textAlign: 'center',
              position: 'relative',
            }}
          >
            <Container maxWidth="md">
              <Typography variant="h1" component="h1" gutterBottom>
                Music for Everyone
              </Typography>
              <Typography variant="h5" sx={{ mb: 4, opacity: 0.8 }}>
                Millions of songs. No credit card needed.
              </Typography>
              <Button
                variant="contained"
                size="large"
                color="primary"
                startIcon={<PlayArrowIcon />}
                sx={{
                  py: 1.5,
                  px: 4,
                  borderRadius: '500px',
                  fontWeight: 'bold',
                  fontSize: '1rem',
                }}
                onClick={() => window.location.href = '/login'}
              >
                GET STARTED
              </Button>
            </Container>
          </Box>

          {/* Features Section */}
          <Box
            sx={{
              py: 8,
              px: { xs: 2, sm: 4, md: 8 },
              backgroundColor: 'rgba(24, 24, 24, 0.8)',
            }}
          >
            <Container maxWidth="lg">
              <Typography variant="h2" component="h2" align="center" gutterBottom>
                Why MelodyHub?
              </Typography>
              <Grid container spacing={4} sx={{ mt: 4 }} style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Grid item xs={12} sm={6} md={3}>
                  <Box sx={{ textAlign: 'center', p: 2 }}>
                    <LibraryMusicIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
                    <Typography variant="h6" component="h3" gutterBottom>
                      Millions of Songs
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      Access to over 70 million songs from artists all over the world.
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Box sx={{ textAlign: 'center', p: 2 }}>
                    <PlaylistPlayIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
                    <Typography variant="h6" component="h3" gutterBottom>
                      Curated Playlists
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      Expert-curated playlists for any mood, activity, or occasion.
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Box sx={{ textAlign: 'center', p: 2 }}>
                    <DevicesIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
                    <Typography variant="h6" component="h3" gutterBottom>
                      Listen Anywhere
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      Stream music on all your devices with seamless integration.
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Box sx={{ textAlign: 'center', p: 2 }}>
                    <PlayArrowIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
                    <Typography variant="h6" component="h3" gutterBottom>
                      Ad-Free Listening
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      Enjoy uninterrupted music with our premium subscription.
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Container>
          </Box>

          {/* Featured Playlists Section */}
          <Box
            sx={{
              py: 8,
              px: { xs: 2, sm: 4, md: 8 },
            }}
          >
            <Container maxWidth="lg">
              <Typography variant="h2" component="h2" sx={{ mb: 4 }}>
                Featured Playlists
              </Typography>
              <Grid container spacing={3}>
                {featuredPlaylists.map((playlist) => (
                  <Grid item key={playlist.id} xs={12} sm={6} md={3}>
                    <Card
                      sx={{
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        backgroundColor: 'background.paper',
                        transition: 'transform 0.3s',
                        '&:hover': {
                          transform: 'translateY(-10px)',
                          '& .MUI-playButton': {
                            opacity: 1,
                            transform: 'scale(1)',
                          }
                        }
                      }}
                    >
                      <Box sx={{ position: 'relative' }}>
                        <CardMedia
                          component="img"
                          image={playlist.image}
                          alt={playlist.title}
                          sx={{ height: 180 }}
                        />
                        <Box
                          className="MUI-playButton"
                          sx={{
                            position: 'absolute',
                            bottom: 8,
                            right: 8,
                            bgcolor: 'primary.main',
                            borderRadius: '50%',
                            width: 50,
                            height: 50,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            opacity: 0,
                            transform: 'scale(0.8)',
                            transition: 'all 0.3s',
                            boxShadow: '0 8px 16px rgba(30, 215, 96, 0.3)',
                            '&:hover': {
                              transform: 'scale(1.1) !important',
                              bgcolor: 'primary.light',
                            }
                          }}
                        >
                          <PlayArrowIcon sx={{ fontSize: 30 }} />
                        </Box>
                      </Box>
                      <CardContent sx={{ flexGrow: 1 }}>
                        <Typography variant="h6" component="h3" noWrap>
                          {playlist.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {playlist.description}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Container>
          </Box>

          {/* Call to Action */}
          <Box
            sx={{
              py: 10,
              px: { xs: 2, sm: 4, md: 8 },
              textAlign: 'center',
              backgroundColor: 'background.paper',
              position: 'relative',
            }}
          >
            <Container maxWidth="md">
              <Typography variant="h2" component="h2" gutterBottom>
                Ready to start listening?
              </Typography>
              <Typography variant="h5" sx={{ mb: 4, opacity: 0.8 }}>
                Join MelodyHub today and get three months free.
              </Typography>
              <Button
                variant="contained"
                size="large"
                color="primary"
                sx={{
                  py: 1.5,
                  px: 4,
                  borderRadius: '500px',
                  fontWeight: 'bold',
                  fontSize: '1rem',
                }}
                onClick={() => window.location.href = '/signup'}
              >
                SIGN UP FREE
              </Button>
            </Container>
          </Box>
        </Box>

        <Footer />
      </Box>

      {/* CSS for the animated green circles */}
      <style jsx global>{`
        @keyframes float {
          0% {
            transform: translate(0, 0) rotate(0deg) scale(1);
          }
          25% {
            transform: translate(100px, 50px) rotate(90deg) scale(1.1);
          }
          50% {
            transform: translate(50px, 100px) rotate(180deg) scale(1);
          }
          75% {
            transform: translate(-50px, 50px) rotate(270deg) scale(0.9);
          }
          100% {
            transform: translate(0, 0) rotate(360deg) scale(1);
          }
        }
        
        .moving-circle {
          position: absolute;
          border-radius: 50%;
          background: linear-gradient(135deg, #1DB954 0%, #1ed760 100%);
          filter: blur(5px);
          pointer-events: none;
          animation: float linear infinite;
          z-index: 0;
        }
      `}</style>
    </ThemeProvider>
  );
};

export default HomePage;