import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  IconButton,
  useMediaQuery,
  useTheme,
  CircularProgress,
  Breadcrumbs,
  Link,
} from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import HomeIcon from '@mui/icons-material/Home';
import ExploreIcon from '@mui/icons-material/Explore';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import api from '../../services/api';

function Discover() {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Data states
  const [latestSongs, setLatestSongs] = useState([]);
  const [recentlyPlayed, setRecentlyPlayed] = useState([]);
  const [playlists, setPlaylists] = useState([]);

  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      // Fetch all necessary data in parallel
      const [songsRes, recentlyPlayedRes, playlistsRes] = await Promise.all([
        api.get('/user/songs'), // Latest songs
        api.get('/user/songs/recently-played'), // Recently played
        api.get('/user/playlists') // User's playlists
      ]);

      // Set latest songs
      if (songsRes.data?.data) {
        setLatestSongs(songsRes.data.data.map(song => ({
          id: song._id,
          title: song.title,
          artist: song.artist,
          image: song.coverImage || '/default-song.jpg',
          audioFile: song.audioFile
        })));
      }

      // Set recently played
      if (recentlyPlayedRes.data?.data) {
        setRecentlyPlayed(recentlyPlayedRes.data.data.map(item => ({
          id: item.song._id,
          title: item.song.title,
          artist: item.song.artist,
          image: item.song.coverImage || '/default-song.jpg',
          audioFile: item.song.audioFile
        })));
      }

      // Set playlists
      if (playlistsRes.data?.data) {
        setPlaylists(playlistsRes.data.data);
      }
    } catch (err) {
      console.error('Error fetching discover data:', err);
      setError('Failed to load music data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handlePlaySong = async (songId) => {
    try {
      // Track that the user played this song
      await api.post(`/user/songs/${songId}/play`);
      
      // Here you would connect to your audio player
      console.log(`Playing song ${songId}`);
    } catch (err) {
      console.error('Error playing song:', err);
    }
  };

  // Render a placeholder if no data is available
  const renderPlaceholder = (message) => (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column',
      alignItems: 'center', 
      justifyContent: 'center', 
      py: 5,
      bgcolor: 'rgba(255,255,255,0.05)',
      borderRadius: 2
    }}>
      <Typography variant="h6" color="text.secondary" align="center">
        {message || "No content available"}
      </Typography>
    </Box>
  );

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #121212 0%, #181818 100%)',
        pt: { xs: 8, md: 10 },
        pb: 8,
      }}
    >
      <Container maxWidth="lg">
        {/* Breadcrumb Navigation */}
        <Breadcrumbs 
          separator="›" 
          aria-label="breadcrumb"
          sx={{ 
            mb: 4, 
            '& .MuiBreadcrumbs-ol': { 
              flexWrap: 'wrap' 
            },
            '& .MuiBreadcrumbs-separator': { 
              color: 'rgba(255,255,255,0.4)' 
            }
          }}
        >
          <Link 
            component={RouterLink} 
            to="/"
            sx={{ 
              display: 'flex', 
              alignItems: 'center',
              color: 'rgba(255,255,255,0.7)',
              textDecoration: 'none',
              '&:hover': { color: '#1DB954' }
            }}
          >
            <HomeIcon fontSize="small" sx={{ mr: 0.5 }} />
            Home
          </Link>
          <Typography 
            sx={{ 
              display: 'flex', 
              alignItems: 'center',
              color: '#1DB954' 
            }}
          >
            <ExploreIcon fontSize="small" sx={{ mr: 0.5 }} />
            Discover
          </Typography>
        </Breadcrumbs>

        {/* Header */}
        <Box 
          sx={{ 
            mb: 5, 
            animation: 'fadeIn 0.8s ease-out',
            '@keyframes fadeIn': {
              '0%': { opacity: 0, transform: 'translateY(-20px)' },
              '100%': { opacity: 1, transform: 'translateY(0)' }
            }
          }}
        >
          <Typography 
            component="h1" 
            variant="h3" 
            sx={{ 
              fontWeight: 700,
              mb: 2,
              fontSize: { xs: '2.2rem', sm: '2.5rem', md: '3rem' },
              background: 'linear-gradient(90deg, #FFFFFF 0%, #1DB954 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Discover Music
          </Typography>
          <Typography 
            variant="subtitle1" 
            sx={{ 
              color: 'rgba(255,255,255,0.7)',
              maxWidth: '700px',
              lineHeight: 1.6,
            }}
          >
            Explore the latest songs, your recently played tracks, and your personal playlists.
          </Typography>
        </Box>

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 10 }}>
            <CircularProgress color="primary" />
          </Box>
        ) : error ? (
          <Box sx={{
            py: 4,
            px: 3,
            bgcolor: 'rgba(255, 0, 0, 0.1)',
            borderRadius: 2,
            border: '1px solid rgba(255, 0, 0, 0.3)'
          }}>
            <Typography color="error">{error}</Typography>
          </Box>
        ) : (
          <>
            {/* Latest Songs */}
            <Box sx={{ mb: 6 }}>
              <Typography 
                variant="h5" 
                component="h2" 
                sx={{ 
                  fontWeight: 700, 
                  mb: 3,
                  borderLeft: '4px solid #1DB954',
                  pl: 2,
                  py: 1
                }}
              >
                Latest Songs
              </Typography>

              {latestSongs.length > 0 ? (
                <Grid container spacing={2}>
                  {latestSongs.slice(0, 12).map((song) => (
                    <Grid item xs={6} sm={4} md={2} key={song.id}>
                      <Card
                        onMouseEnter={() => setHoveredCard(`song-${song.id}`)}
                        onMouseLeave={() => setHoveredCard(null)}
                        onClick={() => handlePlaySong(song.id)}
                        sx={{
                          bgcolor: 'rgba(30,30,30,0.6)',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            bgcolor: 'rgba(40,40,40,0.9)',
                            transform: 'translateY(-5px)',
                            boxShadow: '0 8px 15px rgba(0,0,0,0.3)',
                          },
                          position: 'relative',
                          borderRadius: 2,
                          cursor: 'pointer',
                        }}
                      >
                        <Box sx={{ position: 'relative' }}>
                          <CardMedia
                            component="img"
                            height={isMobile ? "120" : "140"}
                            image={song.image}
                            alt={song.title}
                            sx={{
                              transition: 'transform 0.3s ease-out',
                              ...(hoveredCard === `song-${song.id}` && {
                                transform: 'scale(1.05)',
                                filter: 'brightness(0.7)',
                              }),
                            }}
                          />

                          {/* Play button overlay */}
                          <IconButton
                            size="small"
                            onClick={() => navigate(`/user/dashboard`)}
                            sx={{
                              position: 'absolute',
                              right: 8,
                              bottom: 8,
                              bgcolor: '#1DB954',
                              width: 34,
                              height: 34,
                              transform: hoveredCard === `song-${song.id}`
                                ? 'scale(1)'
                                : 'scale(0)',
                              opacity: hoveredCard === `song-${song.id}` ? 1 : 0,
                              transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                              '&:hover': {
                                bgcolor: '#1ed760',
                                transform: 'scale(1.1)',
                              },
                              boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
                            }}
                          >
                            <PlayArrowIcon sx={{ fontSize: 20 }} />
                          </IconButton>
                        </Box>

                        <CardContent sx={{ p: 2 }}>
                          <Typography
                            variant="subtitle1"
                            component="h3"
                            noWrap
                            sx={{
                              fontWeight: 600,
                              lineHeight: 1.3,
                              fontSize: { xs: '0.85rem', sm: '0.95rem', md: '1rem' },
                            }}
                          >
                            {song.title}
                          </Typography>

                          <Typography
                            variant="body2"
                            color="text.secondary"
                            noWrap
                            sx={{
                              fontSize: { xs: '0.75rem', sm: '0.8rem' }
                            }}
                          >
                            {song.artist}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              ) : renderPlaceholder("No songs available")}
            </Box>

            {/* Recently Played */}
            <Box sx={{ mb: 6 }}>
              <Typography 
                variant="h5" 
                component="h2" 
                sx={{ 
                  fontWeight: 700, 
                  mb: 3,
                  borderLeft: '4px solid #1DB954',
                  pl: 2,
                  py: 1
                }}
              >
                Recently Played
              </Typography>

              {recentlyPlayed.length > 0 ? (
                <Grid container spacing={2}>
                  {recentlyPlayed.slice(0, 6).map((song) => (
                    <Grid item xs={6} sm={4} md={2} key={song.id}>
                      <Card
                        onMouseEnter={() => setHoveredCard(`recent-${song.id}`)}
                        onMouseLeave={() => setHoveredCard(null)}
                        onClick={() => handlePlaySong(song.id)}
                        sx={{
                          bgcolor: 'rgba(30,30,30,0.6)',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            bgcolor: 'rgba(40,40,40,0.9)',
                            transform: 'translateY(-5px)',
                            boxShadow: '0 8px 15px rgba(0,0,0,0.3)',
                          },
                          position: 'relative',
                          borderRadius: 2,
                          cursor: 'pointer',
                        }}
                      >
                        <Box sx={{ position: 'relative' }}>
                          <CardMedia
                            component="img"
                            height={isMobile ? "120" : "140"}
                            image={song.image}
                            alt={song.title}
                            sx={{
                              transition: 'transform 0.3s ease-out',
                              ...(hoveredCard === `recent-${song.id}` && {
                                transform: 'scale(1.05)',
                                filter: 'brightness(0.7)',
                              }),
                            }}
                          />

                          {/* Play button overlay */}
                          <IconButton
                            size="small"
                            onClick={() => navigate(`/user/dashboard`)}
                            sx={{
                              position: 'absolute',
                              right: 8,
                              bottom: 8,
                              bgcolor: '#1DB954',
                              width: 34,
                              height: 34,
                              transform: hoveredCard === `recent-${song.id}`
                                ? 'scale(1)'
                                : 'scale(0)',
                              opacity: hoveredCard === `recent-${song.id}` ? 1 : 0,
                              transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                              '&:hover': {
                                bgcolor: '#1ed760',
                                transform: 'scale(1.1)',
                              },
                              boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
                            }}
                          >
                            <PlayArrowIcon sx={{ fontSize: 20 }} />
                          </IconButton>
                        </Box>

                        <CardContent sx={{ p: 2 }}>
                          <Typography
                            variant="subtitle1"
                            component="h3"
                            noWrap
                            sx={{
                              fontWeight: 600,
                              lineHeight: 1.3,
                              fontSize: { xs: '0.85rem', sm: '0.95rem', md: '1rem' },
                            }}
                          >
                            {song.title}
                          </Typography>

                          <Typography
                            variant="body2"
                            color="text.secondary"
                            noWrap
                            sx={{
                              fontSize: { xs: '0.75rem', sm: '0.8rem' }
                            }}
                          >
                            {song.artist}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              ) : renderPlaceholder("No recently played songs")}
            </Box>

            {/* Your Playlists */}
            <Box sx={{ mb: 6 }}>
              <Typography 
                variant="h5" 
                component="h2" 
                sx={{ 
                  fontWeight: 700, 
                  mb: 3,
                  borderLeft: '4px solid #1DB954',
                  pl: 2,
                  py: 1
                }}
              >
                Your Playlists
              </Typography>

              {playlists.length > 0 ? (
                <Grid container spacing={3}>
                  {playlists.map((playlist) => (
                    <Grid item xs={12} sm={6} md={3} key={playlist._id}>
                      <Card
                        onMouseEnter={() => setHoveredCard(`playlist-${playlist._id}`)}
                        onMouseLeave={() => setHoveredCard(null)}
                        onClick={() => navigate(`/user/dashboard`)}
                        sx={{
                          bgcolor: 'rgba(30,30,30,0.6)',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            bgcolor: 'rgba(40,40,40,0.9)',
                            transform: 'translateY(-8px)',
                            boxShadow: '0 10px 20px rgba(0,0,0,0.3)',
                          },
                          position: 'relative',
                          overflow: 'hidden',
                          borderRadius: 2,
                          cursor: 'pointer',
                          height: '100%',
                        }}
                      >
                        <Box sx={{ position: 'relative' }}>
                          <CardMedia
                            component="img"
                            height={isMobile ? "140" : "180"}
                            image={playlist.coverImage || '/default-playlist.jpg'}
                            alt={playlist.name}
                            sx={{
                              transition: 'transform 0.3s ease-out',
                              ...(hoveredCard === `playlist-${playlist._id}` && {
                                transform: 'scale(1.05)',
                              }),
                            }}
                          />

                          {/* Play button overlay */}
                          <Box
                            sx={{
                              position: 'absolute',
                              top: 0,
                              left: 0,
                              width: '100%',
                              height: '100%',
                              bgcolor: hoveredCard === `playlist-${playlist._id}`
                                ? 'rgba(0,0,0,0.5)'
                                : 'rgba(0,0,0,0)',
                              transition: 'background-color 0.3s ease',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}
                          >
                            <IconButton
                              sx={{
                                bgcolor: '#1DB954',
                                width: 50,
                                height: 50,
                                transform: hoveredCard === `playlist-${playlist._id}`
                                  ? 'scale(1) translateY(0)'
                                  : 'scale(0.5) translateY(20px)',
                                opacity: hoveredCard === `playlist-${playlist._id}` ? 1 : 0,
                                transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                                '&:hover': {
                                  bgcolor: '#1ed760',
                                  transform: 'scale(1.05) translateY(0) !important',
                                },
                                boxShadow: '0 8px 16px rgba(0,0,0,0.3)',
                              }}
                            >
                              <PlayArrowIcon sx={{ fontSize: 30 }} />
                            </IconButton>
                          </Box>
                        </Box>

                        <CardContent sx={{ padding: 2 }}>
                          <Typography
                            variant="h6"
                            component="h3"
                            noWrap
                            sx={{
                              fontWeight: 600,
                              fontSize: { xs: '1rem', md: '1.1rem' },
                              mb: 0.5,
                            }}
                          >
                            {playlist.name}
                          </Typography>

                          <Typography
                            variant="body2"
                            sx={{
                              height: '40px',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              display: '-webkit-box',
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: 'vertical',
                              color: 'rgba(255,255,255,0.7)',
                              mb: 1.5
                            }}
                          >
                            {playlist.description || 'No description'}
                          </Typography>
                          
                          <Typography variant="caption" color="text.secondary">
                            {playlist.songs?.length || 0} songs
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              ) : renderPlaceholder("No playlists created yet")}
            </Box>
          </>
        )}
        
        {/* Footer */}
        <Box sx={{ textAlign: 'center', mt: 6, color: 'rgba(255,255,255,0.5)', pb: 4 }}>
          <Typography variant="body2">
            © 2025 MelodyHub. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default Discover;