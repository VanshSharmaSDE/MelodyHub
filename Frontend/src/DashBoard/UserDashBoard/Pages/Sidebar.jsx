import React, { useState } from 'react';
import { 
  Box, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText, 
  Typography, 
  Divider,
  TextField,
  InputAdornment,
  IconButton,
  Button,
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import AddBoxIcon from '@mui/icons-material/AddBox';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DownloadIcon from '@mui/icons-material/Download';
import CloseIcon from '@mui/icons-material/Close';
import { grey } from '@mui/material/colors';

function Sidebar({ userData, currentView, onViewChange, onSearch, mobile = false }) {
  const [searchValue, setSearchValue] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    onSearch(value);
  };
  
  const clearSearch = () => {
    setSearchValue('');
    onSearch('');
  };
  
  // Sample user playlists - would come from API
  const userPlaylists = [
    { id: 1, name: 'Liked Songs' },
    { id: 2, name: 'Chill Vibes' },
    { id: 3, name: 'Workout Mix' },
    { id: 4, name: 'Road Trip Playlist' },
    { id: 5, name: 'Focus Flow' },
  ];
  
  return (
    <Box
      sx={{
        width: { xs: 240, md: 240 },
        flexShrink: 0,
        bgcolor: 'rgba(18, 18, 18, 0.9)',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        borderRight: '1px solid rgba(255,255,255,0.1)',
      }}
    >
      {mobile && (
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          p: 2
        }}>
          <Typography 
            variant="h6" 
            sx={{ 
              fontWeight: 800, 
              color: '#1DB954',
              letterSpacing: '1px', 
            }}
          >
            MUSICIFY
          </Typography>
        </Box>
      )}
      
      <Box sx={{ p: 2 }}>
        <Box
          sx={{
            mb: 2,
            borderRadius: 1.5,
            bgcolor: 'rgba(255,255,255,0.1)',
            transition: 'all 0.3s ease',
            position: 'relative',
          }}
        >
          <TextField
            value={searchValue}
            onChange={handleSearch}
            placeholder="Search..."
            variant="outlined"
            fullWidth
            size="small"
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: searchValue || isSearchFocused ? '#fff' : grey[400] }} />
                </InputAdornment>
              ),
              endAdornment: searchValue ? (
                <InputAdornment position="end">
                  <IconButton edge="end" onClick={clearSearch} size="small">
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </InputAdornment>
              ) : null,
              sx: {
                borderRadius: 1.5,
                color: '#fff',
                '& .MuiOutlinedInput-notchedOutline': {
                  border: 'none',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  border: 'none',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  border: 'none',
                  boxShadow: 'none',
                },
              }
            }}
          />
        </Box>
      </Box>
      
      <List disablePadding>
        {[
          { text: 'Home', icon: <HomeIcon />, value: 'home' },
          { text: 'Your Library', icon: <LibraryMusicIcon />, value: 'library' },
        ].map((item) => (
          <ListItem
            button
            key={item.text}
            onClick={() => onViewChange(item.value)}
            selected={currentView === item.value}
            sx={{
              py: 1.5,
              px: 2,
              '&.Mui-selected': {
                bgcolor: 'rgba(255,255,255,0.1)',
              },
              '&.Mui-selected:hover': {
                bgcolor: 'rgba(255,255,255,0.15)',
              },
              '&:hover': {
                bgcolor: 'rgba(255,255,255,0.05)',
              },
            }}
          >
            <ListItemIcon sx={{ color: currentView === item.value ? '#fff' : grey[400], minWidth: 40 }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText 
              primary={item.text} 
              primaryTypographyProps={{ 
                fontWeight: currentView === item.value ? 700 : 400,
                color: currentView === item.value ? '#fff' : grey[300]
              }} 
            />
          </ListItem>
        ))}

        <Box sx={{ p: 2, pt: 3 }}>
          <Button
            startIcon={<AddBoxIcon />}
            sx={{
              color: grey[400],
              textTransform: 'none',
              justifyContent: 'flex-start',
              '&:hover': {
                color: '#fff',
                bgcolor: 'transparent',
              },
              fontSize: '0.9rem',
              fontWeight: 600,
              px: 0,
            }}
          >
            Create Playlist
          </Button>
          
          <Button
            startIcon={<FavoriteIcon />}
            sx={{
              color: grey[400],
              textTransform: 'none',
              justifyContent: 'flex-start',
              '&:hover': {
                color: '#fff',
                bgcolor: 'transparent',
              },
              fontSize: '0.9rem',
              fontWeight: 600,
              mt: 1,
              px: 0,
            }}
          >
            Liked Songs
          </Button>
          
          <Button
            startIcon={<DownloadIcon />}
            sx={{
              color: grey[400],
              textTransform: 'none',
              justifyContent: 'flex-start',
              '&:hover': {
                color: '#fff',
                bgcolor: 'transparent',
              },
              fontSize: '0.9rem',
              fontWeight: 600,
              mt: 1,
              px: 0,
            }}
          >
            Installed
          </Button>
        </Box>
      </List>
      
      <Divider sx={{ bgcolor: 'rgba(255,255,255,0.1)' }} />
      
      <Box sx={{ flexGrow: 1, overflowY: 'auto', py: 1 }}>
        <List dense disablePadding>
          {userPlaylists.map((playlist) => (
            <ListItem
              button
              key={playlist.id}
              sx={{
                py: 0.8,
                px: 2,
                '&:hover': {
                  bgcolor: 'rgba(255,255,255,0.05)',
                },
              }}
            >
              <ListItemText 
                primary={playlist.name} 
                primaryTypographyProps={{ 
                  color: grey[400],
                  fontWeight: 400,
                  fontSize: '0.9rem',
                  noWrap: true,
                  '&:hover': {
                    color: '#fff',
                  }
                }} 
              />
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
}

export default Sidebar;