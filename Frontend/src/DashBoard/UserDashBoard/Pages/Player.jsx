import React, { useState } from 'react';
import { 
  Box, 
  IconButton, 
  Typography, 
  Slider,
  Grid,
  Avatar,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import RepeatIcon from '@mui/icons-material/Repeat';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeDownIcon from '@mui/icons-material/VolumeDown';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MenuIcon from '@mui/icons-material/Menu';

function Player({ track, onDrawerToggle }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));
  
  const [isPlaying, setIsPlaying] = useState(track?.playing || false);
  const [progress, setProgress] = useState(30);
  const [volume, setVolume] = useState(70);
  const [liked, setLiked] = useState(false);

  // This would be connected to your audio player
  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };
  
  const handleProgressChange = (event, newValue) => {
    setProgress(newValue);
  };
  
  const handleVolumeChange = (event, newValue) => {
    setVolume(newValue);
  };
  
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };
  
  if (!track) return null;
  
  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        bgcolor: 'rgba(24, 24, 24, 0.98)',
        borderTop: '1px solid rgba(255,255,255,0.1)',
        px: { xs: 1, sm: 3 },
        py: 1.5,
        zIndex: 10,
        backdropFilter: 'blur(10px)',
      }}
    >
      <Grid container alignItems="center" spacing={2}>
        {/* Mobile menu button - only shown on mobile */}
        {isMobile && (
          <Grid item>
            <IconButton onClick={onDrawerToggle} sx={{ color: '#B3B3B3' }}>
              <MenuIcon />
            </IconButton>
          </Grid>
        )}
        
        {/* Song info - left side */}
        <Grid item xs={isSmall ? 8 : 3}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar
              src={track.image}
              alt={track.title}
              variant="square"
              sx={{ width: 48, height: 48, mr: 2, borderRadius: 1 }}
            />
            <Box sx={{ minWidth: 0 }}>
              <Typography variant="body1" noWrap sx={{ fontWeight: 600, fontSize: '0.9rem' }}>
                {track.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" noWrap sx={{ fontSize: '0.8rem' }}>
                {track.artist}
              </Typography>
            </Box>
            {!isSmall && (
              <IconButton
                color={liked ? "primary" : "default"}
                sx={{ ml: 2 }}
                onClick={() => setLiked(!liked)}
              >
                {liked ? <FavoriteIcon fontSize="small" /> : <FavoriteBorderIcon fontSize="small" />}
              </IconButton>
            )}
          </Box>
        </Grid>
        
        {/* Player controls - middle */}
        <Grid item xs={12} sm={6} 
          sx={{ 
            order: { xs: 3, sm: 2 },
            width: '100%',
          }}
        >
          {/* Controls */}
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
            <IconButton sx={{ color: '#B3B3B3', display: { xs: 'none', sm: 'flex' } }}>
              <ShuffleIcon fontSize="small" />
            </IconButton>
            <IconButton sx={{ color: '#fff', mx: { xs: 1, sm: 2 } }}>
              <SkipPreviousIcon />
            </IconButton>
            <IconButton
              sx={{
                color: '#fff',
                bgcolor: '#fff',
                p: 1,
                mx: { xs: 1, sm: 1.5 },
                '&:hover': { bgcolor: '#fff', transform: 'scale(1.05)' },
              }}
              onClick={togglePlay}
            >
              {isPlaying ? (
                <PauseIcon sx={{ color: '#000' }} />
              ) : (
                <PlayArrowIcon sx={{ color: '#000' }} />
              )}
            </IconButton>
            <IconButton sx={{ color: '#fff', mx: { xs: 1, sm: 2 } }}>
              <SkipNextIcon />
            </IconButton>
            <IconButton sx={{ color: '#B3B3B3', display: { xs: 'none', sm: 'flex' } }}>
              <RepeatIcon fontSize="small" />
            </IconButton>
          </Box>
          
          {/* Progress bar */}
          <Box sx={{ display: 'flex', alignItems: 'center', px: { xs: 0, sm: 2 } }}>
            <Typography variant="caption" color="text.secondary" sx={{ mr: 1, minWidth: 35, textAlign: 'right' }}>
              {formatTime(progress * 3)}
            </Typography>
            <Slider
              size="small"
              value={progress}
              onChange={handleProgressChange}
              aria-label="song progress"
              sx={{
                color: '#1DB954',
                height: 4,
                '& .MuiSlider-thumb': {
                  width: 8,
                  height: 8,
                  transition: '0.2s',
                  '&::before': {
                    boxShadow: '0 2px 12px 0 rgba(0,0,0,0.4)',
                  },
                  '&:hover, &.Mui-focusVisible': {
                    boxShadow: '0 0 0 8px rgba(29, 185, 84, 0.16)',
                  },
                  '&.Mui-active': {
                    width: 12,
                    height: 12,
                  },
                },
                '& .MuiSlider-rail': {
                  opacity: 0.28,
                },
              }}
            />
            <Typography variant="caption" color="text.secondary" sx={{ ml: 1, minWidth: 35 }}>
              {formatTime(300)}
            </Typography>
          </Box>
        </Grid>
        
        {/* Volume control - right side */}
        <Grid item xs={3} 
          sx={{ 
            display: { xs: 'none', sm: 'block' },
            order: 3,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
            <VolumeDownIcon sx={{ color: '#B3B3B3', mr: 1.5 }} />
            <Slider
              size="small"
              value={volume}
              onChange={handleVolumeChange}
              aria-label="Volume"
              sx={{
                color: '#1DB954',
                width: 100,
                height: 4,
                '& .MuiSlider-thumb': {
                  width: 8,
                  height: 8,
                  '&:hover': {
                    boxShadow: '0 0 0 8px rgba(29, 185, 84, 0.16)',
                  }
                },
              }}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Player;