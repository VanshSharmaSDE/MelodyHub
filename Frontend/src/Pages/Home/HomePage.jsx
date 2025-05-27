import React, { useState, useEffect, useRef } from 'react';
import { Box, Container, CssBaseline, ThemeProvider, Typography, Button, Grid, Card, CardContent, CardMedia, CircularProgress, Avatar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import PlaylistPlayIcon from '@mui/icons-material/PlaylistPlay';
import DevicesIcon from '@mui/icons-material/Devices';
import PersonIcon from '@mui/icons-material/Person';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import theme from '../../theme/theme';
import api from '../../services/api';

// CountUp component for animating numbers
const CountUp = ({ end, duration = 2000, prefix = '', suffix = '' }) => {
  const [count, setCount] = useState(0);
  const stepRef = useRef(null);
  const startTimeRef = useRef(null);

  useEffect(() => {
    // Reset count when end changes
    setCount(0);
    
    const animate = (timestamp) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const progress = timestamp - startTimeRef.current;
      const percentage = Math.min(progress / duration, 1);
      
      setCount(Math.floor(percentage * end));
      
      if (percentage < 1) {
        stepRef.current = requestAnimationFrame(animate);
      }
    };
    
    stepRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (stepRef.current) {
        cancelAnimationFrame(stepRef.current);
      }
    };
  }, [end, duration]);

  return <>{prefix}{count.toLocaleString()}{suffix}</>;
};

const HomePage = () => {
  const navigate = useNavigate();
  const [latestSongs, setLatestSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);
  // Update the stats state structure to match API response
  const [stats, setStats] = useState({
    stats: { users: 0, songs: 0 },
    popularGenres: [],
    recentUsers: []
  });
  const [statsLoaded, setStatsLoaded] = useState(false);

  // Check if user is logged in on component mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
      // Try to get user role
      try {
        const userData = localStorage.getItem('user');
        if (userData) {
          const parsedUser = JSON.parse(userData);
          setUserRole(parsedUser.role);
        }
      } catch (error) {
        console.error('Error parsing user data from localStorage:', error);
      }
    }
  }, []);
  
  // Fetch latest songs
  useEffect(() => {
    const fetchLatestSongs = async () => {
      try {
        setLoading(true);
        // Use the same endpoint as UserDashboard, but limit to 8 songs
        const songsRes = await api.get('/general/songs');
        // Sort by createdAt to get the newest songs first and take first 8
        const sortedSongs = songsRes.data.data
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 8);
        setLatestSongs(sortedSongs);
      } catch (error) {
        console.error('Error fetching latest songs:', error);
        setError('Failed to load latest music');
      } finally {
        setLoading(false);
      }
    };

    fetchLatestSongs();
  }, []);

  // Fetch stats - updated to match API response structure
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await api.get('/general/stats/quick');
        if (response.data.success && response.data.data) {
          setStats(response.data.data);
        } else {
          setStats({
            stats: { users: 0, songs: 0 },
            popularGenres: [],
            recentUsers: []
          });
        }
        setStatsLoaded(true);
      } catch (error) {
        console.error('Error fetching stats:', error);
        setStats({
          stats: { users: 0, songs: 0 },
          popularGenres: [],
          recentUsers: []
        });
        setStatsLoaded(true);
      }
    };
    
    fetchStats();
  }, []);

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

      document.getElementById('circles-container')?.appendChild(circle);

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

  // Handle button click based on login status
  const handleGetStartedClick = () => {
    if (isLoggedIn) {
      // If user is logged in, redirect to appropriate dashboard based on role
      if (userRole === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/user/dashboard');
      }
    } else {
      // If not logged in, redirect to login page
      navigate('/login');
    }
  };

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
                onClick={handleGetStartedClick}
              >
                {isLoggedIn ? 'GO TO DASHBOARD' : 'GET STARTED'}
              </Button>
            </Container>
          </Box>

          {/* Stats Section - Updated */}
          <Box
            sx={{
              py: 6,
              px: { xs: 2, sm: 4, md: 8 },
              backgroundColor: 'rgba(29, 185, 84, 0.05)',
              borderTop: '1px solid rgba(255, 255, 255, 0.1)',
              borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            <Container maxWidth="lg">
              <Typography variant="h2" component="h2" align="center" gutterBottom>
                Join Our Growing Community
              </Typography>
              <Typography variant="body1" align="center" sx={{ mb: 5, opacity: 0.8, maxWidth: '800px', mx: 'auto' }}>
                MelodyHub is rapidly growing with users and songs from around the world. 
                Be part of our music-loving community today!
              </Typography>
              
              <Grid container spacing={4} justifyContent="center">
                <Grid item xs={12} sm={6} md={4}>
                  <Box
                    sx={{ 
                      textAlign: 'center',
                      p: 4,
                      borderRadius: 4,
                      backgroundColor: 'rgba(0, 0, 0, 0.3)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      height: '100%'
                    }}
                  >
                    <Box sx={{ 
                      width: 80, 
                      height: 80, 
                      borderRadius: '50%',
                      backgroundColor: 'rgba(29, 185, 84, 0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 2
                    }}>
                      <PersonIcon sx={{ fontSize: 40, color: 'primary.main' }} />
                    </Box>
                    <Typography variant="h2" component="div" sx={{ fontWeight: 'bold', mb: 1 }}>
                      {statsLoaded ? (
                        <CountUp end={stats.stats.users} duration={2000} suffix="+" />
                      ) : (
                        <CircularProgress size={30} color="primary" />
                      )}
                    </Typography>
                    <Typography variant="h6" component="div" sx={{ opacity: 0.7 }}>
                      Active Users
                    </Typography>
                  </Box>
                </Grid>
                
                <Grid item xs={12} sm={6} md={4}>
                  <Box
                    sx={{ 
                      textAlign: 'center',
                      p: 4,
                      borderRadius: 4,
                      backgroundColor: 'rgba(0, 0, 0, 0.3)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      height: '100%'
                    }}
                  >
                    <Box sx={{ 
                      width: 80, 
                      height: 80, 
                      borderRadius: '50%',
                      backgroundColor: 'rgba(29, 185, 84, 0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 2
                    }}>
                      <MusicNoteIcon sx={{ fontSize: 40, color: 'primary.main' }} />
                    </Box>
                    <Typography variant="h2" component="div" sx={{ fontWeight: 'bold', mb: 1 }}>
                      {statsLoaded ? (
                        <CountUp end={stats.stats.songs} duration={2000} suffix="+" />
                      ) : (
                        <CircularProgress size={30} color="primary" />
                      )}
                    </Typography>
                    <Typography variant="h6" component="div" sx={{ opacity: 0.7 }}>
                      Songs Available
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
              
              {/* Popular Genres Section - New */}
              {statsLoaded && stats.popularGenres && stats.popularGenres.length > 0 && (
                <Box sx={{ mt: 6 }}>
                  <Typography variant="h4" align="center" gutterBottom>
                    Popular Genres
                  </Typography>
                  <Box sx={{ 
                    display: 'flex', 
                    flexWrap: 'wrap', 
                    justifyContent: 'center', 
                    gap: 2, 
                    mt: 3 
                  }}>
                    {stats.popularGenres.map((genre, index) => (
                      <Box
                        key={index}
                        sx={{
                          bgcolor: 'rgba(29, 185, 84, 0.1)',
                          color: 'white',
                          borderRadius: 4,
                          px: 3,
                          py: 1.5,
                          textAlign: 'center',
                          border: '1px solid rgba(29, 185, 84, 0.3)',
                          minWidth: '120px'
                        }}
                      >
                        <Typography variant="h6" sx={{ mb: 0.5, textTransform: 'capitalize' }}>
                          {genre._id}
                        </Typography>
                        <Typography variant="body2" sx={{ opacity: 0.7 }}>
                          {genre.count} Songs
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </Box>
              )}
              
              {/* Recent Users Section - New */}
              {statsLoaded && stats.recentUsers && stats.recentUsers.length > 0 && (
                <Box sx={{ mt: 6 }}>
                  <Typography variant="h4" align="center" gutterBottom>
                    Newest Members
                  </Typography>
                  <Box sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    flexWrap: 'wrap',
                    gap: 2,
                    mt: 3
                  }}>
                    {stats.recentUsers.map((user, index) => (
                      <Box
                        key={index}
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          bgcolor: 'rgba(0, 0, 0, 0.2)',
                          borderRadius: 4,
                          p: 1.5,
                          minWidth: { xs: '45%', md: '200px' }
                        }}
                      >
                        <Avatar
                          sx={{
                            bgcolor: `hsl(${index * 60}, 70%, 50%)`,
                            mr: 1.5
                          }}
                        >
                          {user.name.charAt(0).toUpperCase()}
                        </Avatar>
                        <Box>
                          <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                            {user.name}
                          </Typography>
                          <Typography variant="caption" sx={{ opacity: 0.6 }}>
                            Joined {new Date(user.createdAt).toLocaleDateString()}
                          </Typography>
                        </Box>
                      </Box>
                    ))}
                  </Box>
                </Box>
              )}
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
                      Custom Playlists
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      Create your own playlists for any mood, activity, or occasion.
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

          {/* Latest Music Section (formerly Featured Playlists) */}
          <Box
            sx={{
              py: 8,
              px: { xs: 2, sm: 4, md: 8 },
            }}
          >
            <Container maxWidth="lg">
              <Typography variant="h2" component="h2" sx={{ mb: 4 }}>
                Latest Music
              </Typography>
              
              {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
                  <CircularProgress color="primary" />
                </Box>
              ) : error ? (
                <Typography variant="body1" color="error" align="center">
                  {error}
                </Typography>
              ) : (
                <Grid container spacing={3}>
                  {latestSongs.map((song) => (
                    <Grid item key={song._id} xs={12} sm={6} md={3}>
                      <Card
                        sx={{
                          height: '100%',
                          width: '270px',
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
                        <Box sx={{ position: 'relative', paddingTop: '100%' }}>
                          <CardMedia
                            component="img"
                            image={song.coverImage || '/default-cover.jpg'}
                            alt={song.title}
                            sx={{ 
                              position: 'absolute',
                              top: 0,
                              left: 0,
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover'
                            }}
                          />
                          <Box
                            className="MUI-playButton"
                            onClick={() => navigate('/user/dashboard')}
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
                              cursor: 'pointer',
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
                            {song.title}
                          </Typography>
                          <Typography variant="body2" color="text.secondary" noWrap>
                            {song.artist}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              )}
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
                Join MelodyHub today 🎵
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
                onClick={() => navigate('/signup')}
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