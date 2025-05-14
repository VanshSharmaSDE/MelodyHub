import React from 'react';
import { 
  Box, 
  Typography, 
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  ListItemSecondaryAction,
  IconButton,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Tabs,
  Tab,
} from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';

function SearchResults({ query, onPlayTrack }) {
  const [tabValue, setTabValue] = React.useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
  
  // This would be replaced with actual search API call
  const dummyResults = {
    tracks: [
      { 
        id: 1, 
        title: 'Blinding Lights', 
        artist: 'The Weeknd', 
        album: 'After Hours',
        duration: '3:22',
        image: 'https://via.placeholder.com/60'
      },
      { 
        id: 2, 
        title: 'Save Your Tears', 
        artist: 'The Weeknd', 
        album: 'After Hours',
        duration: '3:35',
        image: 'https://via.placeholder.com/60'
      },
      { 
        id: 3, 
        title: 'Don\'t Start Now', 
        artist: 'Dua Lipa', 
        album: 'Future Nostalgia',
        duration: '3:03',
        image: 'https://via.placeholder.com/60'
      },
      { 
        id: 4, 
        title: 'Levitating', 
        artist: 'Dua Lipa', 
        album: 'Future Nostalgia',
        duration: '3:23',
        image: 'https://via.placeholder.com/60'
      },
      { 
        id: 5, 
        title: 'Watermelon Sugar', 
        artist: 'Harry Styles', 
        album: 'Fine Line',
        duration: '2:54',
        image: 'https://via.placeholder.com/60'
      },
    ],
    albums: [
      {
        id: 1,
        title: 'After Hours',
        artist: 'The Weeknd',
        year: 2020,
        image: 'https://via.placeholder.com/150'
      },
      {
        id: 2,
        title: 'Future Nostalgia',
        artist: 'Dua Lipa',
        year: 2020,
        image: 'https://via.placeholder.com/150'
      },
      {
        id: 3,
        title: 'Fine Line',
        artist: 'Harry Styles',
        year: 2019,
        image: 'https://via.placeholder.com/150'
      },
    ],
    artists: [
      {
        id: 1,
        name: 'The Weeknd',
        followers: '65.2M',
        image: 'https://via.placeholder.com/150'
      },
      {
        id: 2,
        name: 'Dua Lipa',
        followers: '48.7M',
        image: 'https://via.placeholder.com/150'
      },
      {
        id: 3,
        name: 'Harry Styles',
        followers: '52.1M',
        image: 'https://via.placeholder.com/150'
      },
    ]
  };

  return (
    <Box sx={{ px: { xs: 2, sm: 3, md: 4 }, py: { xs: 2, md: 3 }, pt: { xs: 8, md: 3 } }}>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 4 }}>
        Search results for "{query}"
      </Typography>
      
      <Tabs 
        value={tabValue} 
        onChange={handleTabChange}
        variant="fullWidth"
        sx={{
          mb: 4,
          '& .MuiTab-root': {
            color: '#B3B3B3',
            fontWeight: 600,
            fontSize: '1rem',
            '&.Mui-selected': {
              color: '#fff',
            }
          },
          '& .MuiTabs-indicator': {
            backgroundColor: '#1DB954',
          }
        }}
      >
        <Tab label="Tracks" />
        <Tab label="Albums" />
        <Tab label="Artists" />
      </Tabs>
      
      {tabValue === 0 && (
        <List>
          {dummyResults.tracks.map((track) => (
            <ListItem 
              key={track.id}
              button
              onClick={() => onPlayTrack(track)}
              sx={{
                borderRadius: 1,
                '&:hover': {
                  bgcolor: 'rgba(255, 255, 255, 0.1)',
                }
              }}
            >
              <ListItemAvatar>
                <Avatar 
                  variant="square"
                  src={track.image} 
                  alt={track.title}
                  sx={{ borderRadius: 1, width: 50, height: 50 }}
                />
              </ListItemAvatar>
              <ListItemText
                primary={track.title}
                secondary={`${track.artist} • ${track.album}`}
                primaryTypographyProps={{
                  fontWeight: 500,
                  variant: 'body1',
                }}
                sx={{ ml: 1 }}
              />
              <ListItemSecondaryAction>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography 
                    variant="body2" 
                    color="text.secondary"
                    sx={{ mr: 2, display: { xs: 'none', sm: 'block' } }}
                  >
                    {track.duration}
                  </Typography>
                  <IconButton 
                    edge="end" 
                    sx={{ 
                      color: '#1DB954',
                      '&:hover': {
                        transform: 'scale(1.1)',
                      }
                    }}
                    onClick={() => onPlayTrack(track)}
                  >
                    <PlayArrowIcon />
                  </IconButton>
                </Box>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      )}
      
      {tabValue === 1 && (
        <Grid container spacing={3}>
          {dummyResults.albums.map((album) => (
            <Grid item xs={6} sm={4} md={3} lg={2} key={album.id}>
              <Card
                sx={{
                  bgcolor: 'rgba(30,30,30,0.7)',
                  borderRadius: 2,
                  overflow: 'hidden',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    bgcolor: 'rgba(40,40,40,0.7)',
                    transform: 'translateY(-5px)',
                    boxShadow: '0 10px 20px rgba(0,0,0,0.3)',
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="170"
                  image={album.image}
                  alt={album.title}
                />
                <CardContent>
                  <Typography variant="subtitle1" component="div" sx={{ fontWeight: 600 }} noWrap>
                    {album.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {album.artist} • {album.year}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
      
      {tabValue === 2 && (
        <Grid container spacing={3}>
          {dummyResults.artists.map((artist) => (
            <Grid item xs={6} sm={4} md={3} key={artist.id}>
              <Card
                sx={{
                  bgcolor: 'rgba(30,30,30,0.7)',
                  borderRadius: 2,
                  overflow: 'hidden',
                  transition: 'all 0.3s ease',
                  textAlign: 'center',
                  p: 2,
                  '&:hover': {
                    bgcolor: 'rgba(40,40,40,0.7)',
                    transform: 'translateY(-5px)',
                    boxShadow: '0 10px 20px rgba(0,0,0,0.3)',
                  },
                }}
              >
                <Avatar
                  src={artist.image}
                  alt={artist.name}
                  sx={{
                    width: 120,
                    height: 120,
                    margin: '0 auto',
                    mb: 2,
                    borderRadius: '50%'
                  }}
                />
                <Typography variant="subtitle1" component="div" sx={{ fontWeight: 600 }}>
                  {artist.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {artist.followers} followers
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}

export default SearchResults;