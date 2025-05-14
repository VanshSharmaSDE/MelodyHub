import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Chip,
  TextField,
  InputAdornment,
  Tab,
  Tabs,
  Button,
  IconButton,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import StarIcon from '@mui/icons-material/Star';
import HeadphonesIcon from '@mui/icons-material/Headphones';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

// Constant chill vibes image for all items
const CHILL_VIBES_IMAGE = "https://i.scdn.co/image/ab67706f00000003bd0e19e810bb4b55ab164a95";

// Sample data
const genres = [
  "Pop", "Rock", "Hip Hop", "Electronic", "Jazz", "R&B", "Country", "Classical", "Metal"
];

const featuredPlaylists = [
  {
    id: 1,
    title: "Today's Top Hits",
    description: "The biggest hits right now",
    image: CHILL_VIBES_IMAGE,
    songs: 50,
    followers: "16M",
  },
  {
    id: 2,
    title: "Chill Vibes",
    description: "Laid back beats for relaxation",
    image: CHILL_VIBES_IMAGE,
    songs: 45,
    followers: "8.2M",
  },
  {
    id: 3,
    title: "Workout Energy",
    description: "Upbeat tracks for your workout",
    image: CHILL_VIBES_IMAGE,
    songs: 38,
    followers: "5.7M",
  },
  {
    id: 4,
    title: "Indie Discoveries",
    description: "New indie tracks to explore",
    image: CHILL_VIBES_IMAGE,
    songs: 42,
    followers: "3.1M",
  },
];

const newReleases = [
  {
    id: 1,
    title: "Midnight Memories",
    artist: "Leona Lewis",
    image: CHILL_VIBES_IMAGE,
    type: "Album",
  },
  {
    id: 2,
    title: "Golden Hour",
    artist: "JVKE",
    image: CHILL_VIBES_IMAGE,
    type: "Single",
  },
  {
    id: 3,
    title: "Heartbreak Weather",
    artist: "Taylor Swift",
    image: CHILL_VIBES_IMAGE,
    type: "Album",
  },
  {
    id: 4,
    title: "Dreamland",
    artist: "Glass Animals",
    image: CHILL_VIBES_IMAGE,
    type: "EP",
  },
  {
    id: 5,
    title: "Future Nostalgia",
    artist: "Dua Lipa",
    image: CHILL_VIBES_IMAGE,
    type: "Album",
  },
  {
    id: 6,
    title: "Positions",
    artist: "Ariana Grande",
    image: CHILL_VIBES_IMAGE,
    type: "Single",
  },
];

const featuredArtists = [
  {
    id: 1,
    name: "The Weeknd",
    listeners: "85.4 million monthly listeners",
    image: CHILL_VIBES_IMAGE,
  },
  {
    id: 2,
    name: "Billie Eilish",
    listeners: "66.2 million monthly listeners",
    image: CHILL_VIBES_IMAGE,
  },
  {
    id: 3,
    name: "Drake",
    listeners: "68.7 million monthly listeners",
    image: CHILL_VIBES_IMAGE,
  },
  {
    id: 4,
    name: "Doja Cat",
    listeners: "58.3 million monthly listeners",
    image: CHILL_VIBES_IMAGE,
  },
];

const recentlyPlayed = [
  {
    id: 1,
    title: "Blinding Lights",
    artist: "The Weeknd",
    image: CHILL_VIBES_IMAGE,
  },
  {
    id: 2,
    title: "As It Was",
    artist: "Harry Styles",
    image: CHILL_VIBES_IMAGE,
  },
  {
    id: 3,
    title: "Stay",
    artist: "The Kid LAROI, Justin Bieber",
    image: CHILL_VIBES_IMAGE,
  },
  {
    id: 4,
    title: "Easy On Me",
    artist: "Adele",
    image: CHILL_VIBES_IMAGE,
  },
  {
    id: 5,
    title: "Levitating",
    artist: "Dua Lipa",
    image: CHILL_VIBES_IMAGE,
  },
  {
    id: 6,
    title: "Bad Habits",
    artist: "Ed Sheeran",
    image: CHILL_VIBES_IMAGE,
  },
];

function Discover() {
  const [currentTab, setCurrentTab] = useState(0);
  const [hoveredCard, setHoveredCard] = useState(null);
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  
  useEffect(() => {
    // Apply animations to elements after component mounts
    const animationElements = document.querySelectorAll('.animate-in');
    animationElements.forEach((element, index) => {
      setTimeout(() => {
        element.classList.add('visible');
      }, 100 * index);
    });
  }, [currentTab]);
  
  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };
  
  const handleGoBack = () => {
    navigate('/'); // Navigate back to homepage
  };
  
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
        {/* Back Button */}
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={handleGoBack}
          sx={{
            color: '#fff',
            textTransform: 'none',
            fontSize: '1rem',
            mb: 3,
            fontWeight: 500,
            borderRadius: 2,
            pl: 1.5,
            '&:hover': {
              backgroundColor: 'rgba(255,255,255,0.1)'
            }
          }}
        >
          Back to Home
        </Button>

        {/* Header & Search */}
        <Box 
          sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', md: 'row' }, 
            justifyContent: 'space-between',
            alignItems: { xs: 'flex-start', md: 'center' },
            mb: { xs: 4, md: 5 },
            animation: 'fadeIn 0.6s ease-out',
            '@keyframes fadeIn': {
              '0%': { opacity: 0, transform: 'translateY(-20px)' },
              '100%': { opacity: 1, transform: 'translateY(0)' }
            }
          }}
        >
          <Typography 
            variant="h3" 
            component="h1"
            sx={{ 
              fontWeight: 800,
              fontSize: { xs: '2.2rem', sm: '2.5rem', md: '3rem' },
              mb: { xs: 3, md: 0 },
              background: 'linear-gradient(90deg, #FFFFFF 0%, #1DB954 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '-0.5px',
            }}
          >
            Discover New Music
          </Typography>
          
          <TextField
            placeholder="Search for songs, artists..."
            variant="outlined"
            size="medium"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: 'rgba(255,255,255,0.7)' }} />
                </InputAdornment>
              ),
              sx: {
                bgcolor: 'rgba(255,255,255,0.08)',
                borderRadius: 2,
                height: 48,
                '&:hover': {
                  bgcolor: 'rgba(255,255,255,0.12)',
                },
                pr: 1,
                '& fieldset': { 
                  border: 'none' 
                },
              }
            }}
            sx={{
              width: { xs: '100%', md: '300px' },
              '& .MuiOutlinedInput-root': {
                '&.Mui-focused': {
                  '& fieldset': {
                    borderColor: '#1DB954',
                    borderWidth: 2,
                  },
                },
              },
            }}
          />
        </Box>
        
        {/* Genre Chips */}
        <Box 
          sx={{ 
            mb: { xs: 4, md: 5 },
            position: 'relative',
          }}
          className="animate-in"
        >
          <Typography 
            variant="h6" 
            component="h2"
            sx={{ 
              mb: 2, 
              fontWeight: 600,
              opacity: 0.9,
            }}
          >
            Browse Genres
          </Typography>
          
          <Box
            sx={{ 
              overflowX: 'auto',
              pb: 1.5,
              pt: 0.5,
              scrollbarWidth: 'none',
              '&::-webkit-scrollbar': { display: 'none' },
              maskImage: isTablet ? 'linear-gradient(to right, black 85%, transparent 100%)' : 'none',
              '-webkit-mask-image': isTablet ? 'linear-gradient(to right, black 85%, transparent 100%)' : 'none',
            }}
          >
            <Box sx={{ display: 'flex', gap: 1.5, minWidth: 'max-content', pl: 0.5, pr: 0.5 }}>
              {genres.map((genre) => (
                <Chip
                  key={genre}
                  label={genre}
                  clickable
                  sx={{
                    bgcolor: 'rgba(255,255,255,0.1)',
                    color: '#fff',
                    fontSize: '0.9rem',
                    fontWeight: 500,
                    py: 2,
                    px: 0.5,
                    borderRadius: 3,
                    height: 36,
                    '&:hover': {
                      bgcolor: 'rgba(29, 185, 84, 0.3)',
                      boxShadow: '0 3px 10px rgba(29, 185, 84, 0.2)',
                    },
                    transition: 'all 0.2s',
                  }}
                />
              ))}
            </Box>
          </Box>
          
          {isTablet && (
            <Box 
              sx={{ 
                position: 'absolute',
                top: 38, 
                right: 0, 
                height: 36, 
                width: 40,
                background: 'linear-gradient(90deg, rgba(24, 24, 24, 0) 0%, rgba(24, 24, 24, 1) 100%)',
                pointerEvents: 'none',
                borderTopRightRadius: 3,
                borderBottomRightRadius: 3,
                zIndex: 1,
              }}
            />
          )}
        </Box>
        
        {/* Tabs */}
        <Box sx={{ mb: { xs: 4, md: 5 } }} className="animate-in">
          <Tabs 
            value={currentTab} 
            onChange={handleTabChange}
            variant={isMobile ? "scrollable" : "standard"}
            scrollButtons={isMobile ? "auto" : false}
            allowScrollButtonsMobile
            TabIndicatorProps={{
              style: {
                backgroundColor: '#1DB954',
                height: 3,
                borderRadius: 3,
              }
            }}
            sx={{
              mb: 4,
              '& .MuiTabs-flexContainer': {
                gap: { xs: 1, sm: 2 },
              },
              '& .MuiTab-root': {
                color: '#B3B3B3',
                fontSize: { xs: '0.9rem', sm: '1.1rem' },
                fontWeight: 600,
                minWidth: { xs: 'auto', sm: 120 },
                mr: { xs: 0, sm: 2 },
                p: { xs: '12px 16px', sm: '16px 24px' },
                '&.Mui-selected': {
                  color: '#FFFFFF',
                },
                textTransform: 'none',
              },
              '& .MuiTabs-indicator': {
                transition: 'all 0.3s',
              },
            }}
          >
            <Tab 
              icon={<TrendingUpIcon />}
              iconPosition="start"
              label="Top Charts" 
            />
            <Tab 
              icon={<StarIcon />}
              iconPosition="start"
              label="Featured" 
            />
            <Tab 
              icon={<HeadphonesIcon />}
              iconPosition="start"
              label="New Releases" 
            />
          </Tabs>
          
          {/* Tab content */}
          <Box 
            sx={{ 
              animation: 'fadeIn 0.5s ease-out',
              '@keyframes fadeIn': {
                '0%': { opacity: 0 },
                '100%': { opacity: 1 }
              },
              minHeight: '400px', // Ensures consistent height between tabs
            }}
          >
            {currentTab === 0 && (
              <Box className="animate-in">
                <Box sx={{ mb: 3 }}>
                  <Typography variant="h5" component="h2" sx={{ fontWeight: 700 }}>
                    Featured Playlists
                  </Typography>
                </Box>
                
                <Grid container spacing={2.5}>
                  {featuredPlaylists.map((playlist) => (
                    <Grid item xs={12} sm={6} md={3} key={playlist.id}>
                      <Card 
                        onMouseEnter={() => setHoveredCard(`playlist-${playlist.id}`)}
                        onMouseLeave={() => setHoveredCard(null)}
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
                        }}
                      >
                        <Box sx={{ position: 'relative' }}>
                          <CardMedia
                            component="img"
                            height={isMobile ? "140" : "180"}
                            image={playlist.image}
                            alt={playlist.title}
                            sx={{ 
                              transition: 'transform 0.3s ease-out',
                              ...(hoveredCard === `playlist-${playlist.id}` && {
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
                              bgcolor: hoveredCard === `playlist-${playlist.id}` 
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
                                transform: hoveredCard === `playlist-${playlist.id}` 
                                  ? 'scale(1) translateY(0)' 
                                  : 'scale(0.5) translateY(20px)',
                                opacity: hoveredCard === `playlist-${playlist.id}` ? 1 : 0,
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
                            {playlist.title}
                          </Typography>
                          
                          <Typography 
                            variant="body2" 
                            color="text.secondary" 
                            sx={{ 
                              mb: 1.5,
                              height: '40px',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              display: '-webkit-box',
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: 'vertical',
                            }}
                          >
                            {playlist.description}
                          </Typography>
                          
                          <Box 
                            sx={{ 
                              display: 'flex', 
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              mt: 'auto',
                            }}
                          >
                            <Typography variant="caption" color="text.secondary">
                              {playlist.songs} songs
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {playlist.followers} followers
                            </Typography>
                          </Box>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            )}
            
            {currentTab === 2 && (
              <Box className="animate-in">
                <Box sx={{ mb: 3 }}>
                  <Typography variant="h5" component="h2" sx={{ fontWeight: 700 }}>
                    New Releases
                  </Typography>
                </Box>
                
                <Grid container spacing={2}>
                  {newReleases.map((release, index) => (
                    <Grid 
                      item 
                      xs={6} 
                      sm={4} 
                      md={2} 
                      key={release.id}
                      className="animate-in"
                      sx={{ animationDelay: `${index * 0.05}s` }}
                    >
                      <Card
                        onMouseEnter={() => setHoveredCard(`release-${release.id}`)}
                        onMouseLeave={() => setHoveredCard(null)}
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
                        }}
                      >
                        <Box sx={{ position: 'relative' }}>
                          <CardMedia
                            component="img"
                            height={isMobile ? "120" : "140"}
                            image={release.image}
                            alt={release.title}
                            sx={{ 
                              transition: 'transform 0.3s ease-out',
                              ...(hoveredCard === `release-${release.id}` && {
                                transform: 'scale(1.05)',
                                filter: 'brightness(0.7)',
                              }),
                            }}
                          />
                          
                          <Chip
                            label={release.type}
                            size="small"
                            sx={{
                              position: 'absolute',
                              top: 8,
                              right: 8,
                              bgcolor: release.type === 'Album' 
                                ? 'rgba(29,185,84,0.8)' 
                                : 'rgba(255,255,255,0.2)',
                              color: '#fff',
                              fontSize: '0.7rem',
                              fontWeight: 600,
                              height: 20,
                              '& .MuiChip-label': { 
                                px: 1 
                              },
                            }}
                          />
                          
                          {/* Play button overlay */}
                          <IconButton
                            size="small"
                            sx={{
                              position: 'absolute',
                              right: 8,
                              bottom: 8,
                              bgcolor: '#1DB954',
                              width: 34,
                              height: 34,
                              transform: hoveredCard === `release-${release.id}` 
                                ? 'scale(1)' 
                                : 'scale(0)',
                              opacity: hoveredCard === `release-${release.id}` ? 1 : 0,
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
                            {release.title}
                          </Typography>
                          
                          <Typography 
                            variant="body2" 
                            color="text.secondary" 
                            noWrap
                            sx={{ 
                              fontSize: { xs: '0.75rem', sm: '0.8rem' } 
                            }}
                          >
                            {release.artist}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            )}
            
            {currentTab === 1 && (
              <Box className="animate-in">
                <Box sx={{ mb: 3 }}>
                  <Typography variant="h5" component="h2" sx={{ fontWeight: 700 }}>
                    Featured Artists
                  </Typography>
                </Box>
                
                <Grid container spacing={2.5}>
                  {featuredArtists.map((artist, index) => (
                    <Grid 
                      item 
                      xs={12} 
                      sm={6} 
                      md={3} 
                      key={artist.id}
                      className="animate-in"
                      sx={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <Card
                        onMouseEnter={() => setHoveredCard(`artist-${artist.id}`)}
                        onMouseLeave={() => setHoveredCard(null)}
                        sx={{
                          bgcolor: 'rgba(30,30,30,0.6)',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            bgcolor: 'rgba(40,40,40,0.9)',
                            transform: 'translateY(-8px)',
                            boxShadow: '0 10px 20px rgba(0,0,0,0.3)',
                          },
                          position: 'relative',
                          borderRadius: 3,
                          overflow: 'hidden',
                        }}
                      >
                        <Box sx={{ position: 'relative' }}>
                          <CardMedia
                            component="img"
                            height="200"
                            image={artist.image}
                            alt={artist.name}
                            sx={{ 
                              transition: 'all 0.5s ease',
                              ...(hoveredCard === `artist-${artist.id}` && {
                                filter: 'brightness(0.7)',
                              }),
                            }}
                          />
                          
                          <Box
                            sx={{
                              position: 'absolute',
                              inset: 0,
                              background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0) 70%)',
                            }}
                          />
                          
                          <Box
                            sx={{
                              position: 'absolute',
                              bottom: 0,
                              left: 0,
                              width: '100%',
                              p: 2,
                            }}
                          >
                            <Typography 
                              variant="h6" 
                              component="h3" 
                              sx={{ 
                                fontWeight: 700, 
                                mb: 0.5,
                                fontSize: { xs: '1.1rem', md: '1.25rem' },
                              }}
                            >
                              {artist.name}
                            </Typography>
                            
                            <Typography 
                              variant="body2" 
                              sx={{ 
                                opacity: 0.7,
                                fontSize: { xs: '0.75rem', md: '0.85rem' },
                              }}
                            >
                              {artist.listeners}
                            </Typography>
                          </Box>
                          
                          {/* Play button overlay */}
                          <IconButton
                            sx={{
                              position: 'absolute',
                              right: 16,
                              bottom: 16,
                              bgcolor: '#1DB954',
                              width: 45,
                              height: 45,
                              transform: hoveredCard === `artist-${artist.id}` 
                                ? 'translateY(0)' 
                                : 'translateY(60px)',
                              opacity: hoveredCard === `artist-${artist.id}` ? 1 : 0,
                              transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                              '&:hover': {
                                bgcolor: '#1ed760',
                                transform: 'scale(1.05)',
                              },
                              boxShadow: '0 6px 12px rgba(0,0,0,0.3)',
                            }}
                          >
                            <PlayArrowIcon sx={{ fontSize: 26 }} />
                          </IconButton>
                        </Box>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            )}
          </Box>
        </Box>
        
        {/* Recently Played */}
        <Box sx={{ mt: { xs: 5, md: 7 } }}>
          <Box sx={{ mb: 3 }}>
            <Typography 
              variant="h5" 
              component="h2" 
              sx={{ 
                fontWeight: 700,
                position: 'relative',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: -8,
                  left: 0,
                  width: 40,
                  height: 3,
                  bgcolor: '#1DB954',
                  borderRadius: 3,
                },
              }}
            >
              Recently Played
            </Typography>
          </Box>
          
          <Grid container spacing={2}>
            {recentlyPlayed.map((item, index) => (
              <Grid 
                item 
                xs={6} 
                sm={4} 
                md={2} 
                key={item.id}
                className="animate-in"
                sx={{
                  opacity: 0,
                  animationDelay: `${0.1 * index}s`,
                  '@keyframes fadeInUp': {
                    '0%': { opacity: 0, transform: 'translateY(20px)' },
                    '100%': { opacity: 1, transform: 'translateY(0)' }
                  },
                  animationName: 'fadeInUp',
                  animationDuration: '0.5s',
                  animationFillMode: 'forwards',
                  animationTimingFunction: 'ease-out',
                }}
              >
                <Card
                  onMouseEnter={() => setHoveredCard(`recent-${item.id}`)}
                  onMouseLeave={() => setHoveredCard(null)}
                  sx={{
                    bgcolor: 'rgba(30,30,30,0.6)',
                    boxShadow: 'none',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      bgcolor: 'rgba(40,40,40,0.8)',
                      transform: 'translateY(-5px)',
                      boxShadow: '0 6px 12px rgba(0,0,0,0.2)',
                    },
                    borderRadius: 2,
                    overflow: 'hidden',
                  }}
                >
                  <Box sx={{ position: 'relative' }}>
                    <CardMedia
                      component="img"
                      height={isMobile ? "100" : "130"}
                      image={item.image}
                      alt={item.title}
                      sx={{ 
                        transition: 'transform 0.3s ease-out',
                        ...(hoveredCard === `recent-${item.id}` && {
                          transform: 'scale(1.1)',
                          filter: 'brightness(0.7)',
                        }),
                      }}
                    />
                    
                    {/* Play button overlay */}
                    <Box
                      sx={{
                        position: 'absolute',
                        inset: 0,
                        bgcolor: hoveredCard === `recent-${item.id}` 
                          ? 'rgba(0,0,0,0.4)' 
                          : 'rgba(0,0,0,0)',
                        transition: 'background-color 0.3s',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <IconButton
                        size="small"
                        sx={{
                          bgcolor: '#1DB954',
                          width: 36,
                          height: 36,
                          transform: hoveredCard === `recent-${item.id}` 
                            ? 'scale(1)' 
                            : 'scale(0)',
                          opacity: hoveredCard === `recent-${item.id}` ? 1 : 0,
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
                  </Box>
                  
                  <CardContent sx={{ p: 1.5 }}>
                    <Typography 
                      variant="subtitle2" 
                      component="h3" 
                      noWrap 
                      sx={{ 
                        fontWeight: 600,
                        fontSize: { xs: '0.8rem', md: '0.9rem' },
                      }}
                    >
                      {item.title}
                    </Typography>
                    
                    <Typography 
                      variant="caption" 
                      color="text.secondary" 
                      noWrap
                      sx={{
                        fontSize: { xs: '0.7rem', md: '0.75rem' },
                        display: 'block',
                        mt: 0.5,
                      }}
                    >
                      {item.artist}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
      
      <style jsx global>{`
        .animate-in {
          opacity: 0;
          transform: translateY(10px);
          transition: opacity 0.5s ease, transform 0.5s ease;
        }
        
        .animate-in.visible {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </Box>
  );
}

export default Discover;