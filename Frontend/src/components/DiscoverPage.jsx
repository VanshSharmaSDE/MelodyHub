import React from 'react';
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
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import StarIcon from '@mui/icons-material/Star';
import HeadphonesIcon from '@mui/icons-material/Headphones';

// Sample data
const genres = [
  "Pop", "Rock", "Hip Hop", "Electronic", "Jazz", "R&B", "Country", "Classical", "Metal"
];

const featuredPlaylists = [
  {
    id: 1,
    title: "Today's Top Hits",
    description: "The biggest hits right now",
    image: "https://via.placeholder.com/300x300",
    songs: 50,
    followers: "16M",
  },
  {
    id: 2,
    title: "Chill Vibes",
    description: "Laid back beats for relaxation",
    image: "https://via.placeholder.com/300x300",
    songs: 45,
    followers: "8.2M",
  },
  {
    id: 3,
    title: "Workout Energy",
    description: "Upbeat tracks for your workout",
    image: "https://via.placeholder.com/300x300",
    songs: 38,
    followers: "5.7M",
  },
  {
    id: 4,
    title: "Indie Discoveries",
    description: "New indie tracks to explore",
    image: "https://via.placeholder.com/300x300",
    songs: 42,
    followers: "3.1M",
  },
];

const newReleases = [
  {
    id: 1,
    title: "Midnight Memories",
    artist: "Leona Lewis",
    image: "https://via.placeholder.com/200x200",
    type: "Album",
  },
  {
    id: 2,
    title: "Golden Hour",
    artist: "JVKE",
    image: "https://via.placeholder.com/200x200",
    type: "Single",
  },
  {
    id: 3,
    title: "Heartbreak Weather",
    artist: "Taylor Swift",
    image: "https://via.placeholder.com/200x200",
    type: "Album",
  },
  {
    id: 4,
    title: "Dreamland",
    artist: "Glass Animals",
    image: "https://via.placeholder.com/200x200",
    type: "EP",
  },
  {
    id: 5,
    title: "Future Nostalgia",
    artist: "Dua Lipa",
    image: "https://via.placeholder.com/200x200",
    type: "Album",
  },
  {
    id: 6,
    title: "Positions",
    artist: "Ariana Grande",
    image: "https://via.placeholder.com/200x200",
    type: "Single",
  },
];

function Discover() {
  const [currentTab, setCurrentTab] = React.useState(0);
  
  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };
  
  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #121212 30%, #151515 100%)',
        pt: 10,
        pb: 8,
      }}
    >
      <Container maxWidth="lg">
        {/* Header & Search */}
        <Box 
          sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', md: 'row' }, 
            justifyContent: 'space-between',
            alignItems: { xs: 'flex-start', md: 'center' },
            mb: 4,
            animation: 'fadeIn 0.6s ease-out',
            '@keyframes fadeIn': {
              '0%': { opacity: 0, transform: 'translateY(-20px)' },
              '100%': { opacity: 1, transform: 'translateY(0)' }
            }
          }}
        >
          <Typography 
            variant="h3" 
            gutterBottom
            sx={{ 
              fontWeight: 800,
              fontSize: { xs: '2.2rem', md: '3rem' },
              mb: { xs: 3, md: 0 },
              background: 'linear-gradient(90deg, #FFFFFF 30%, #1DB954 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
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
                  <SearchIcon />
                </InputAdornment>
              ),
              sx: {
                bgcolor: 'rgba(255,255,255,0.08)',
                borderRadius: 2,
                '&:hover': {
                  bgcolor: 'rgba(255,255,255,0.12)',
                },
                pr: 1,
              }
            }}
            sx={{
              width: { xs: '100%', md: '300px' },
            }}
          />
        </Box>
        
        {/* Genre Chips */}
        <Box 
          sx={{ 
            mb: 5,
            overflowX: 'auto',
            pb: 2,
            scrollbarWidth: 'none',
            '&::-webkit-scrollbar': { display: 'none' },
            animation: 'slideInRight 0.8s ease-out',
            '@keyframes slideInRight': {
              '0%': { opacity: 0, transform: 'translateX(30px)' },
              '100%': { opacity: 1, transform: 'translateX(0)' }
            }
          }}
        >
          <Box sx={{ display: 'flex', gap: 1.5 }}>
            {genres.map((genre) => (
              <Chip
                key={genre}
                label={genre}
                clickable
                sx={{
                  bgcolor: 'rgba(255,255,255,0.1)',
                  color: '#fff',
                  fontSize: '0.95rem',
                  py: 2.5,
                  borderRadius: 6,
                  '&:hover': {
                    bgcolor: 'rgba(29, 185, 84, 0.3)',
                  },
                  transition: 'all 0.2s',
                }}
              />
            ))}
          </Box>
        </Box>
        
        {/* Tabs */}
        <Box sx={{ mb: 5 }}>
          <Tabs 
            value={currentTab} 
            onChange={handleTabChange}
            TabIndicatorProps={{
              style: {
                backgroundColor: '#1DB954',
                height: 3,
              }
            }}
            sx={{
              mb: 4,
              '& .MuiTab-root': {
                color: '#B3B3B3',
                fontSize: '1.1rem',
                fontWeight: 600,
                minWidth: 100,
                mr: 4,
                p: 0,
                '&.Mui-selected': {
                  color: '#FFFFFF',
                }
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
          <Box sx={{ 
            animation: 'fadeIn 0.5s ease-out',
            '@keyframes fadeIn': {
              '0%': { opacity: 0 },
              '100%': { opacity: 1 }
            }
          }}>
            {currentTab === 0 && (
              <Box>
                <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
                  Featured Playlists
                </Typography>
                <Grid container spacing={3}>
                  {featuredPlaylists.map((playlist) => (
                    <Grid item xs={12} sm={6} md={3} key={playlist.id}>
                      <Card 
                        sx={{ 
                          bgcolor: 'rgba(30,30,30,0.7)',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            transform: 'translateY(-8px)',
                            boxShadow: '0 10px 20px rgba(0,0,0,0.3)',
                          },
                          position: 'relative',
                          overflow: 'hidden',
                        }}
                      >
                        <CardMedia
                          component="img"
                          height="180"
                          image={playlist.image}
                          alt={playlist.title}
                        />
                        <CardContent>
                          <Typography variant="h6" gutterBottom noWrap sx={{ fontWeight: 600 }}>
                            {playlist.title}
                          </Typography>
                          <Typography variant="body2" color="text.secondary" gutterBottom>
                            {playlist.description}
                          </Typography>
                          <Box 
                            sx={{ 
                              display: 'flex', 
                              justifyContent: 'space-between',
                              mt: 1
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
                        <Button
                          variant="contained"
                          color="primary"
                          size="small"
                          sx={{
                            position: 'absolute',
                            right: 16,
                            bottom: 16,
                            opacity: 0,
                            transition: 'all 0.3s ease',
                            minWidth: 'unset',
                            width: 45,
                            height: 45,
                            borderRadius: '50%',
                            boxShadow: '0 4px 10px rgba(29,185,84,0.5)',
                            '& .MuiButton-startIcon': {
                              margin: 0
                            }
                          }}
                          startIcon={<HeadphonesIcon />}
                        >
                          {' '}
                        </Button>
                        <Box
                          sx={{
                            position: 'absolute',
                            inset: 0,
                            bgcolor: 'rgba(0,0,0,0.05)',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                              bgcolor: 'rgba(0,0,0,0.2)',
                              '& + button': {
                                opacity: 1,
                                transform: 'translateY(-8px)',
                              }
                            }
                          }}
                        />
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            )}
            
            {currentTab === 2 && (
              <Box>
                <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
                  New Releases
                </Typography>
                <Grid container spacing={2}>
                  {newReleases.map((release) => (
                    <Grid item xs={6} sm={4} md={2} key={release.id}>
                      <Card
                        sx={{
                          bgcolor: 'rgba(30,30,30,0.7)',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            transform: 'translateY(-5px)',
                            boxShadow: '0 8px 15px rgba(0,0,0,0.3)',
                          },
                          position: 'relative',
                        }}
                      >
                        <Box sx={{ position: 'relative' }}>
                          <CardMedia
                            component="img"
                            height="150"
                            image={release.image}
                            alt={release.title}
                          />
                          <Chip
                            label={release.type}
                            size="small"
                            sx={{
                              position: 'absolute',
                              top: 8,
                              right: 8,
                              bgcolor: release.type === 'Album' ? 'rgba(29,185,84,0.8)' : 'rgba(255,255,255,0.2)',
                              fontSize: '0.75rem',
                            }}
                          />
                        </Box>
                        <CardContent sx={{ p: 2 }}>
                          <Typography variant="subtitle1" noWrap sx={{ fontWeight: 600, lineHeight: 1.3 }}>
                            {release.title}
                          </Typography>
                          <Typography variant="body2" color="text.secondary" noWrap>
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
              <Box>
                <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
                  Featured Artists
                </Typography>
                <Grid container spacing={3}>
                  {[1, 2, 3, 4].map((item) => (
                    <Grid item xs={12} sm={6} md={3} key={item}>
                      <Card
                        sx={{
                          bgcolor: 'rgba(30,30,30,0.7)',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            transform: 'translateY(-8px)',
                            boxShadow: '0 10px 20px rgba(0,0,0,0.3)',
                          },
                          position: 'relative',
                          borderRadius: 4,
                          overflow: 'hidden',
                        }}
                      >
                        <Box sx={{ position: 'relative' }}>
                          <CardMedia
                            component="img"
                            height="200"
                            image={`https://via.placeholder.com/300x300?text=Artist+${item}`}
                            alt={`Featured Artist ${item}`}
                          />
                          <Box
                            sx={{
                              position: 'absolute',
                              inset: 0,
                              background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 50%)',
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
                            <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>
                              Artist Name {item}
                            </Typography>
                            <Typography variant="body2" sx={{ opacity: 0.7 }}>
                              {Math.floor(Math.random() * 30 + 5)} million monthly listeners
                            </Typography>
                          </Box>
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
        <Box sx={{ mt: 6 }}>
          <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
            Recently Played
          </Typography>
          <Grid container spacing={2}>
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <Grid item xs={4} sm={3} md={2} key={item}
                sx={{
                  animation: `fadeInUp 0.5s ease-out ${0.1 * item}s`,
                  opacity: 0,
                  '@keyframes fadeInUp': {
                    '0%': { opacity: 0, transform: 'translateY(20px)' },
                    '100%': { opacity: 1, transform: 'translateY(0)' }
                  },
                  animationFillMode: 'forwards',
                }}
              >
                <Card
                  sx={{
                    bgcolor: 'rgba(30,30,30,0.7)',
                    boxShadow: 'none',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      bgcolor: 'rgba(40,40,40,0.8)',
                      transform: 'translateY(-5px)',
                    },
                    borderRadius: 2,
                  }}
                >
                  <CardMedia
                    component="img"
                    height="130"
                    image={`https://via.placeholder.com/150x150?text=Track+${item}`}
                    alt={`Track ${item}`}
                    sx={{ borderRadius: '8px 8px 0 0' }}
                  />
                  <CardContent sx={{ p: 1.5 }}>
                    <Typography variant="subtitle2" noWrap sx={{ fontWeight: 600 }}>
                      Track Title {item}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" noWrap>
                      Artist {item}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}

export default Discover;