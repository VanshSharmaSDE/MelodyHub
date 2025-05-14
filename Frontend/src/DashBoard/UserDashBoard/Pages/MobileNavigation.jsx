import React from 'react';
import { 
  Box, 
  BottomNavigation, 
  BottomNavigationAction,
  Paper,
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';

function MobileNavigation({ currentView, onViewChange, onSearch }) {
  const handleNavChange = (event, newValue) => {
    if (newValue === 'search') {
      onSearch(' '); // Trigger search mode with empty query
    } else {
      onViewChange(newValue);
      onSearch(''); // Clear search when navigating away
    }
  };

  return (
    <Paper
      sx={{
        position: 'fixed',
        bottom: 70, // Above the player
        left: 0,
        right: 0,
        zIndex: 5,
        borderTop: '1px solid rgba(255,255,255,0.1)',
      }}
      elevation={3}
    >
      <BottomNavigation
        value={currentView === 'search' ? 'search' : currentView}
        onChange={handleNavChange}
        showLabels
        sx={{
          bgcolor: 'rgba(18,18,18,0.98)',
          backdropFilter: 'blur(10px)',
          height: 65,
          '& .MuiBottomNavigationAction-root': {
            color: '#B3B3B3',
            '&.Mui-selected': {
              color: '#fff',
            },
          },
        }}
      >
        <BottomNavigationAction 
          label="Home" 
          value="home" 
          icon={<HomeIcon />} 
        />
        <BottomNavigationAction 
          label="Search" 
          value="search" 
          icon={<SearchIcon />} 
        />
        <BottomNavigationAction 
          label="Your Library" 
          value="library" 
          icon={<LibraryMusicIcon />} 
        />
      </BottomNavigation>
    </Paper>
  );
}

export default MobileNavigation;