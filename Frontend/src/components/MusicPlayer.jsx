import React, { useState, useEffect, useRef, useContext } from 'react';
import {
  Box,
  Grid,
  Typography,
  IconButton,
  Slider,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider
} from '@mui/material';
import {
  PlayArrow,
  Pause,
  SkipNext,
  SkipPrevious,
  VolumeUp,
  VolumeOff,
  Favorite,
  FavoriteBorder,
  QueueMusic,
  Shuffle,
  Repeat,
  Close
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import api from '../services/api';
import { useSnackbar } from 'notistack';
import { MusicContext } from '../context/MusicContext';

const PlayerContainer = styled(Box)(({ theme }) => ({
  position: 'fixed',
  bottom: 0,
  left: 0,
  right: 0,
  padding: theme.spacing(2),
  display: 'flex',
  alignItems: 'center',
  backgroundColor: '#181818',
  borderTop: '1px solid rgba(255, 255, 255, 0.1)',
  zIndex: 10
}));

const QueueDrawer = styled(Drawer)(({ theme }) => ({
  '& .MuiDrawer-paper': {
    width: 320,
    backgroundColor: '#121212',
    borderLeft: '1px solid rgba(255, 255, 255, 0.1)'
  }
}));

function MusicPlayer() {
  const { 
    currentSong,
    setCurrentSong,
    queue,
    setQueue,
    isPlaying,
    setIsPlaying,
    likedSongs,
    setLikedSongs
  } = useContext(MusicContext);
  
  const { enqueueSnackbar } = useSnackbar();
  const audioRef = useRef(null);
  
  // State
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [repeat, setRepeat] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [queueOpen, setQueueOpen] = useState(false);
  
  // Handle audio events
  useEffect(() => {
    if (audioRef.current) {
      // Time update
      const handleTimeUpdate = () => {
        setCurrentTime(audioRef.current.currentTime);
      };
      
      // Duration change
      const handleDurationChange = () => {
        setDuration(audioRef.current.duration);
      };
      
      // Song ended
      const handleEnded = () => {
        if (repeat) {
          audioRef.current.currentTime = 0;
          audioRef.current.play();
        } else {
          playNextSong();
        }
      };
      
      // Add event listeners
      audioRef.current.addEventListener('timeupdate', handleTimeUpdate);
      audioRef.current.addEventListener('durationchange', handleDurationChange);
      audioRef.current.addEventListener('ended', handleEnded);
      
      // Cleanup
      return () => {
        if (audioRef.current) {
          audioRef.current.removeEventListener('timeupdate', handleTimeUpdate);
          audioRef.current.removeEventListener('durationchange', handleDurationChange);
          audioRef.current.removeEventListener('ended', handleEnded);
        }
      };
    }
  }, [repeat]);
  
  // Load song when currentSong changes
  useEffect(() => {
    if (currentSong && audioRef.current) {
      audioRef.current.src = currentSong.audioFile;
      audioRef.current.load();
      
      if (isPlaying) {
        audioRef.current.play().catch(error => {
          console.error('Error playing audio:', error);
          setIsPlaying(false);
        });
      }
      
      // Track played song
      trackPlayedSong(currentSong._id);
    }
  }, [currentSong]);
  
  // Update audio volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);
  
  // Track played song
  const trackPlayedSong = async (songId) => {
    try {
      await api.post(`/user/songs/${songId}/play`);
    } catch (error) {
      console.error('Error tracking played song:', error);
    }
  };
  
  // Toggle play/pause
  const togglePlayPause = () => {
    if (!currentSong) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(error => {
        console.error('Error playing audio:', error);
      });
    }
    
    setIsPlaying(!isPlaying);
  };
  
  // Play next song
  const playNextSong = () => {
    if (queue.length <= 1) return;
    
    // Get next song from queue
    const nextSong = queue[1];
    
    // Update queue (remove current song)
    setQueue(queue.slice(1));
    
    // Set new current song
    setCurrentSong(nextSong);
    setIsPlaying(true);
  };
  
  // Play previous song
  const playPreviousSong = () => {
    // If current time is more than 3 seconds, restart current song
    if (audioRef.current && audioRef.current.currentTime > 3) {
      audioRef.current.currentTime = 0;
      return;
    }
    
    // Otherwise, go to previous song if it exists in history
    // This would require tracking play history, which is not implemented yet
    // For now, just restart the current song
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
    }
  };
  
  // Handle volume change
  const handleVolumeChange = (event, newValue) => {
    setVolume(newValue);
    setIsMuted(false);
  };
  
  // Toggle mute
  const toggleMute = () => {
    setIsMuted(!isMuted);
  };
  
  // Handle seek
  const handleSeek = (event, newValue) => {
    if (audioRef.current) {
      audioRef.current.currentTime = newValue;
      setCurrentTime(newValue);
    }
  };
  
  // Format time (seconds to MM:SS)
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };
  
  // Toggle shuffle
  const toggleShuffle = () => {
    if (!shuffle && queue.length > 1) {
      // Get current song
      const currentSongInQueue = queue[0];
      
      // Shuffle the rest of the queue
      const restOfQueue = shuffleArray(queue.slice(1));
      
      // Set the new queue
      setQueue([currentSongInQueue, ...restOfQueue]);
    }
    
    setShuffle(!shuffle);
  };
  
  // Toggle repeat
  const toggleRepeat = () => {
    setRepeat(!repeat);
  };
  
  // Toggle like song
  const toggleLikeSong = async () => {
    if (!currentSong) return;
    
    try {
      const res = await api.put(`/user/songs/${currentSong._id}/like`);
      
      // Update liked songs
      if (res.data.liked) {
        setLikedSongs([...likedSongs, currentSong]);
        enqueueSnackbar('Added to your Liked Songs', { variant: 'success' });
      } else {
        setLikedSongs(likedSongs.filter(s => s._id !== currentSong._id));
        enqueueSnackbar('Removed from your Liked Songs', { variant: 'info' });
      }
    } catch (error) {
      console.error('Error toggling like:', error);
      enqueueSnackbar('Failed to update Liked Songs', { variant: 'error' });
    }
  };
  
  // Shuffle array (Fisher-Yates algorithm)
  const shuffleArray = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };
  
  // Check if song is liked
  const isLiked = () => {
    return currentSong && likedSongs.some(song => song._id === currentSong._id);
  };
  
  // If no song is playing, don't render the player
  if (!currentSong) {
    return null;
  }
  
  return (
    <>
      {/* Audio element */}
      <audio ref={audioRef} />
      
      {/* Music Player */}
      <PlayerContainer>
        <Grid container alignItems="center" spacing={2}>
          {/* Song Info */}
          <Grid item xs={12} md={3}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box
                component="img"
                src={currentSong.coverImage}
                alt={currentSong.title}
                sx={{ width: 56, height: 56, borderRadius: 1, mr: 2 }}
              />
              <Box>
                <Typography variant="subtitle1" noWrap>
                  {currentSong.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" noWrap>
                  {currentSong.artist}
                </Typography>
              </Box>
              <IconButton 
                size="small" 
                onClick={toggleLikeSong}
                sx={{ ml: 1 }}
              >
                {isLiked() ? (
                  <Favorite sx={{ color: '#1DB954' }} />
                ) : (
                  <FavoriteBorder />
                )}
              </IconButton>
            </Box>
          </Grid>
          
          {/* Player Controls */}
          <Grid item xs={12} md={6}>
            <Box sx={{ textAlign: 'center', mb: 1 }}>
              <IconButton onClick={toggleShuffle} color={shuffle ? "primary" : "inherit"}>
                <Shuffle />
              </IconButton>
              <IconButton onClick={playPreviousSong}>
                <SkipPrevious />
              </IconButton>
              <IconButton 
                sx={{ 
                  mx: 1,
                  backgroundColor: 'rgba(29, 185, 84, 0.1)',
                  '&:hover': { backgroundColor: 'rgba(29, 185, 84, 0.2)' }
                }} 
                onClick={togglePlayPause}
              >
                {isPlaying ? (
                  <Pause sx={{ color: '#1DB954', fontSize: 30 }} />
                ) : (
                  <PlayArrow sx={{ color: '#1DB954', fontSize: 30 }} />
                )}
              </IconButton>
              <IconButton onClick={playNextSong}>
                <SkipNext />
              </IconButton>
              <IconButton onClick={toggleRepeat} color={repeat ? "primary" : "inherit"}>
                <Repeat />
              </IconButton>
            </Box>
            
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="caption" color="text.secondary" sx={{ mr: 1, minWidth: 40, textAlign: 'right' }}>
                {formatTime(currentTime)}
              </Typography>
              <Slider
                value={currentTime}
                min={0}
                max={duration || 100}
                onChange={handleSeek}
                sx={{
                  color: '#1DB954',
                  '& .MuiSlider-thumb': {
                    display: 'none',
                    '&:hover, &.Mui-focusVisible': {
                      display: 'block'
                    }
                  },
                  '&:hover .MuiSlider-thumb': {
                    display: 'block'
                  }
                }}
              />
              <Typography variant="caption" color="text.secondary" sx={{ ml: 1, minWidth: 40 }}>
                {formatTime(duration)}
              </Typography>
            </Box>
          </Grid>
          
          {/* Volume Controls */}
          <Grid item xs={12} md={3}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
              <IconButton onClick={toggleMute}>
                {isMuted || volume === 0 ? <VolumeOff /> : <VolumeUp />}
              </IconButton>
              <Slider
                value={isMuted ? 0 : volume}
                min={0}
                max={1}
                step={0.01}
                onChange={handleVolumeChange}
                sx={{
                  width: 100,
                  ml: 1,
                  color: '#1DB954',
                  '& .MuiSlider-thumb': {
                    display: 'none',
                    '&:hover, &.Mui-focusVisible': {
                      display: 'block'
                    }
                  },
                  '&:hover .MuiSlider-thumb': {
                    display: 'block'
                  }
                }}
              />
              <IconButton
                onClick={() => setQueueOpen(true)}
                sx={{ ml: 2 }}
              >
                <QueueMusic />
              </IconButton>
            </Box>
          </Grid>
        </Grid>
      </PlayerContainer>
      
      {/* Queue Drawer */}
      <QueueDrawer
        anchor="right"
        open={queueOpen}
        onClose={() => setQueueOpen(false)}
      >
        <Box sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h6">
              Queue
            </Typography>
            <IconButton onClick={() => setQueueOpen(false)}>
              <Close />
            </IconButton>
          </Box>
          
          <Typography variant="subtitle1" sx={{ mb: 2 }}>
            Now Playing
          </Typography>
          
          {queue.length === 0 ? (
            <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', py: 4 }}>
              No songs in queue
            </Typography>
          ) : (
            <List>
              {queue.map((song, index) => (
                <ListItem
                  key={`${song._id}-${index}`}
                  button
                  onClick={() => {
                    if (index === 0) return; // Skip if it's current song
                    
                    // Move song to top of queue and play it
                    const newQueue = [...queue];
                    const selectedSong = newQueue.splice(index, 1)[0];
                    setQueue([selectedSong, ...newQueue]);
                    setCurrentSong(selectedSong);
                    setIsPlaying(true);
                  }}
                  sx={{
                    borderRadius: 1,
                    mb: 1,
                    backgroundColor: index === 0 ? 'rgba(29, 185, 84, 0.1)' : 'transparent',
                    '&:hover': {
                      backgroundColor: index === 0 ? 'rgba(29, 185, 84, 0.2)' : 'rgba(255, 255, 255, 0.05)'
                    }
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 40 }}>
                    {index === 0 && isPlaying ? (
                      <Pause sx={{ color: '#1DB954' }} />
                    ) : (
                      index === 0 ? (
                        <PlayArrow sx={{ color: '#1DB954' }} />
                      ) : (
                        <Typography>{index}</Typography>
                      )
                    )}
                  </ListItemIcon>
                  <ListItemText
                    primary={song.title}
                    secondary={song.artist}
                    primaryTypographyProps={{
                      color: index === 0 ? '#1DB954' : 'inherit',
                      noWrap: true
                    }}
                    secondaryTypographyProps={{
                      noWrap: true
                    }}
                  />
                  <Typography variant="body2" color="text.secondary">
                    {formatTime(song.duration)}
                  </Typography>
                </ListItem>
              ))}
            </List>
          )}
        </Box>
      </QueueDrawer>
    </>
  );
}

export default MusicPlayer;