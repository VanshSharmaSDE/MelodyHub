import React, { useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  IconButton,
  Slider,
  Paper,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  LinearProgress,
} from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import RepeatIcon from '@mui/icons-material/Repeat';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeDownIcon from '@mui/icons-material/VolumeDown';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import MoreVertIcon from '@mui/icons-material/MoreVert';

// Sample data
const currentSong = {
  title: "Blinding Lights",
  artist: "The Weeknd",
  album: "After Hours",
  cover: "https://via.placeholder.com/400x400",
  duration: 219, // in seconds
};

const playlist = [
  {
    id: 1,
    title: "Blinding Lights",
    artist: "The Weeknd",
    duration: "3:39",
    cover: "https://via.placeholder.com/80x80",
    playing: true,
  },
  {
    id: 2,
    title: "Save Your Tears",
    artist: "The Weeknd",
    duration: "3:58",
    cover: "https://via.placeholder.com/80x80",
    playing: false,
  },
  {
    id: 3,
    title: "Take My Breath",
    artist: "The Weeknd",
    duration: "3:46",
    cover: "https://via.placeholder.com/80x80",
    playing: false,
  },
  {
    id: 4,
    title: "Starboy",
    artist: "The Weeknd ft. Daft Punk",
    duration: "4:12",
    cover: "https://via.placeholder.com/80x80",
    playing: false,
  },
  {
    id: 5,
    title: "Die For You",
    artist: "The Weeknd",
    duration: "4:43",
    cover: "https://via.placeholder.com/80x80",
    playing: false,
  },
];

function Player() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [progress, setProgress] = useState(45);
  const [volume, setVolume] = useState(70);
  
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };
  
  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };
  
  const handleVolumeChange = (event, newValue) => {
    setVolume(newValue);
  };
  
  const handleProgressChange = (event, newValue) => {
    setProgress(newValue);
  };
  
  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };
  
  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #121212 30%, #0A0A0A 100%)',
        pt: 10,
        pb: 12,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Left side: Album Art & Player Controls */}
          <Grid item xs={12} md={5} lg={4}
            sx={{
              animation: 'slideIn 0.5s ease-out',
              '@keyframes slideIn': {
                '0%': { opacity: 0, transform: 'translateX(-30px)' },
                '100%': { opacity: 1, transform: 'translateX(0)' }
              }
            }}
          >
            <Paper
              elevation={6}
              sx={{
                bgcolor: 'rgba(30, 30, 30, 0.7)',
                borderRadius: 4,
                overflow: 'hidden',
                p: 3,
                backdropFilter: 'blur(10px)',
                boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
              }}
            >
              <Box
                sx={{
                  width: '100%',
                  aspectRatio: '1/1',
                  mb: 4,
                  borderRadius: 3,
                  overflow: 'hidden',
                  boxShadow: '0 8px 20px rgba(0,0,0,0.4)',
                  position: 'relative',
                  '&:before': {
                    content: '""',
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0) 50%)',
                    zIndex: 1,
                  }
                }}
              >
                <Box
                  component="img"
                  src={currentSong.cover}
                  alt={currentSong.title}
                  sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.3s ease',
                    animation: isPlaying ? 'pulse 2s infinite ease-in-out' : 'none',
                    '@keyframes pulse': {
                      '0%': { transform: 'scale(1)' },
                      '50%': { transform: 'scale(1.03)' },
                      '100%': { transform: 'scale(1)' }
                    }
                  }}
                />
              </Box>
              
              <Box sx={{ textAlign: 'center', mb: 4 }}>
                <Typography
                  variant="h4"
                  gutterBottom
                  sx={{ 
                    fontWeight: 700,
                    fontSize: { xs: '1.6rem', sm: '2rem' }
                  }}
                >
                  {currentSong.title}
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  sx={{ fontSize: '1.1rem' }}
                >
                  {currentSong.artist}
                </Typography>
              </Box>
              
              <Box sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2" color="text.secondary">
                    {formatTime(progress / 100 * currentSong.duration)}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {formatTime(currentSong.duration)}
                  </Typography>
                </Box>
                <Slider
                  value={progress}
                  onChange={handleProgressChange}
                  aria-label="Progress"
                  sx={{
                    color: '#1DB954',
                    height: 4,
                    '& .MuiSlider-thumb': {
                      width: 12,
                      height: 12,
                      transition: '0.2s',
                      '&:hover, &.Mui-focusVisible': {
                        boxShadow: '0 0 0 8px rgba(29, 185, 84, 0.16)',
                      },
                      '&:before': {
                        boxShadow: '0 0 1px rgba(0,0,0,0)',
                      },
                    },
                    '& .MuiSlider-rail': {
                      opacity: 0.3,
                    },
                  }}
                />
              </Box>
              
              <Box sx={{ 
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 3
              }}>
                <IconButton 
                  onClick={toggleFavorite}
                  color={isFavorite ? "primary" : "default"}
                  sx={{
                    transition: 'transform 0.2s',
                    '&:hover': { transform: 'scale(1.1)' }
                  }}
                >
                  {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                </IconButton>
                
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <IconButton sx={{ mx: 0.5 }}>
                    <ShuffleIcon />
                  </IconButton>
                  <IconButton
                    sx={{
                      mx: 0.5,
                      fontSize: '2.2rem',
                      '&:hover': { transform: 'scale(1.1)' },
                      transition: 'transform 0.2s',
                    }}
                  >
                    <SkipPreviousIcon fontSize="inherit" />
                  </IconButton>
                  <IconButton
                    onClick={handlePlayPause}
                    sx={{
                      mx: 1,
                      backgroundColor: '#1DB954',
                      p: { xs: 1.5, sm: 2 },
                      color: '#fff',
                      '&:hover': {
                        backgroundColor: '#1ed760',
                        transform: 'scale(1.05)',
                      },
                      transition: 'all 0.2s',
                    }}
                  >
                    {isPlaying ? (
                      <PauseIcon sx={{ fontSize: { xs: '2rem', sm: '2.5rem' } }} />
                    ) : (
                      <PlayArrowIcon sx={{ fontSize: { xs: '2rem', sm: '2.5rem' } }} />
                    )}
                  </IconButton>
                  <IconButton
                    sx={{
                      mx: 0.5,
                      fontSize: '2.2rem',
                      '&:hover': { transform: 'scale(1.1)' },
                      transition: 'transform 0.2s',
                    }}
                  >
                    <SkipNextIcon fontSize="inherit" />
                  </IconButton>
                  <IconButton sx={{ mx: 0.5 }}>
                    <RepeatIcon />
                  </IconButton>
                </Box>
                
                <IconButton>
                  <MoreVertIcon />
                </IconButton>
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <VolumeDownIcon sx={{ color: 'text.secondary', mr: 1.5 }} />
                <Slider
                  value={volume}
                  onChange={handleVolumeChange}
                  aria-label="Volume"
                  sx={{
                    color: '#1DB954',
                    '& .MuiSlider-thumb': {
                      width: 12,
                      height: 12,
                    },
                    '& .MuiSlider-rail': {
                      opacity: 0.3,
                    },
                  }}
                />
                <VolumeUpIcon sx={{ color: 'text.secondary', ml: 1.5 }} />
              </Box>
            </Paper>
          </Grid>
          
          {/* Right side: Playlist */}
          <Grid item xs={12} md={7} lg={8}
            sx={{
              animation: 'slideInRight 0.5s ease-out',
              '@keyframes slideInRight': {
                '0%': { opacity: 0, transform: 'translateX(30px)' },
                '100%': { opacity: 1, transform: 'translateX(0)' }
              }
            }}
          >
            <Paper
              elevation={3}
              sx={{
                bgcolor: 'rgba(30, 30, 30, 0.7)',
                backdropFilter: 'blur(10px)',
                borderRadius: 4,
                overflow: 'hidden',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Box sx={{ p: 3, borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                <Typography variant="h5" sx={{ fontWeight: 700 }}>
                  {currentSong.album} - Playlist
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  {playlist.length} songs • {formatTime(playlist.length * 4 * 60)} total
                </Typography>
              </Box>
              
              <List sx={{ flexGrow: 1, overflow: 'auto', py: 0 }}>
                {playlist.map((song, index) => (
                  <ListItem
                    key={song.id}
                    sx={{
                      py: 2,
                      borderBottom: '1px solid rgba(255,255,255,0.05)',
                      backgroundColor: song.playing ? 'rgba(29,185,84,0.1)' : 'transparent',
                      '&:hover': {
                        backgroundColor: 'rgba(255,255,255,0.05)',
                      },
                      transition: 'background-color 0.2s',
                    }}
                  >
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mr: 2, width: 20, textAlign: 'center' }}
                    >
                      {index + 1}
                    </Typography>
                    <ListItemAvatar>
                      <Avatar variant="rounded" src={song.cover} alt={song.title} />
                    </ListItemAvatar>
                    <ListItemText
                      primary={song.title}
                      secondary={song.artist}
                      sx={{
                        '& .MuiListItemText-primary': {
                          color: song.playing ? '#1DB954' : 'inherit',
                          fontWeight: song.playing ? 600 : 400,
                        },
                      }}
                    />
                    {song.playing && (
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          mr: 2,
                          width: 30,
                          justifyContent: 'center',
                        }}
                      >
                        <Box
                          sx={{
                            width: 4,
                            height: 16,
                            backgroundColor: '#1DB954',
                            mx: 0.5,
                            borderRadius: 2,
                            animation: 'soundBars1 0.5s infinite alternate',
                            '@keyframes soundBars1': {
                              '0%': { height: 4 },
                              '100%': { height: 16 }
                            }
                          }}
                        />
                        <Box
                          sx={{
                            width: 4,
                            height: 24,
                            backgroundColor: '#1DB954',
                            mx: 0.5,
                            borderRadius: 2,
                            animation: 'soundBars2 0.7s infinite alternate',
                            '@keyframes soundBars2': {
                              '0%': { height: 8 },
                              '100%': { height: 24 }
                            }
                          }}
                        />
                        <Box
                          sx={{
                            width: 4,
                            height: 12,
                            backgroundColor: '#1DB954',
                            mx: 0.5,
                            borderRadius: 2,
                            animation: 'soundBars3 0.6s infinite alternate',
                            '@keyframes soundBars3': {
                              '0%': { height: 5 },
                              '100%': { height: 12 }
                            }
                          }}
                        />
                      </Box>
                    )}
                    <Typography variant="body2" color="text.secondary">
                      {song.duration}
                    </Typography>
                    <IconButton
                      size="small"
                      sx={{ ml: 2, opacity: 0.6, '&:hover': { opacity: 1 } }}
                    >
                      <MoreVertIcon fontSize="small" />
                    </IconButton>
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default Player;