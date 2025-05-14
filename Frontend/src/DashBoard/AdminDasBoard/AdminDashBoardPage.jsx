import React, { useState, useEffect } from 'react';
import {
  Box,
  CssBaseline,
  Drawer,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  Container,
  Grid,
  Paper,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  Menu,
  MenuItem,
  Badge,
  ThemeProvider,
  createTheme,
  useMediaQuery,
  Collapse,
  Tabs,
  Tab,
  Alert,
  Snackbar,
  Button,
  LinearProgress,
} from '@mui/material';

// Icons
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import AlbumIcon from '@mui/icons-material/Album';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import LogoutIcon from '@mui/icons-material/Logout';
import BarChartIcon from '@mui/icons-material/BarChart';
import FeedbackIcon from '@mui/icons-material/Feedback';
import CategoryIcon from '@mui/icons-material/Category';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import QueueMusicIcon from '@mui/icons-material/QueueMusic';
import PaymentIcon from '@mui/icons-material/Payment';
import ReportIcon from '@mui/icons-material/Report';

// Dashboard Components
import Dashboard from './Pages/DashBoard';
import UserManagement from './Pages/UserManagement';
import ArtistManagement from './Pages/ArtistManagement';
import AlbumManagement from './Pages/AlbumManagement';
import TrackManagement from './Pages/TrackManagement';
import PlaylistManagement from './Pages/PlaylistManagement';
import GenreManagement from './Pages/GenreManagement';
import ReportManagement from './Pages/ReportManagement';
// import AnalyticsView from './Pages/AnalyticsView';
import PaymentManagement from './Pages/PaymentManagement';
import AnalyticsView from './Pages/AnalyticsView';
// import Settings from './Pages/Settings';

const drawerWidth = 260;

// Create a dark theme for the admin dashboard
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1DB954', // Spotify green
    },
    secondary: {
      main: '#191414', // Spotify black
    },
    background: {
      default: '#121212',
      paper: '#181818',
    },
    divider: 'rgba(255, 255, 255, 0.12)',
  },
  typography: {
    fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          textTransform: 'none',
          fontWeight: 600,
        },
        containedPrimary: {
          '&:hover': {
            backgroundColor: '#1ed760',
          },
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#121212',
          borderRight: '1px solid rgba(255, 255, 255, 0.12)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          margin: '4px 8px',
          '&.Mui-selected': {
            backgroundColor: 'rgba(29, 185, 84, 0.12)',
            '& .MuiListItemIcon-root': {
              color: '#1DB954',
            },
          },
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.08)',
          },
        },
      },
    },
  },
});

function AdminDashboard() {
  const [open, setOpen] = useState(true);
  const [view, setView] = useState('dashboard');
  const [menuOpen, setMenuOpen] = useState(null);
  const [notificationsOpen, setNotificationsOpen] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [contentManagementOpen, setContentManagementOpen] = useState(true);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [loading, setLoading] = useState(false);
  
  const isMobile = useMediaQuery(darkTheme.breakpoints.down('md'));
  
  // Close drawer on mobile by default
  useEffect(() => {
    setOpen(!isMobile);
  }, [isMobile]);

  // Sample notifications - would come from API
  useEffect(() => {
    setNotifications([
      {
        id: 1,
        message: 'New artist verification request',
        time: '2 hours ago',
        read: false,
      },
      {
        id: 2,
        message: 'User reported content needs review',
        time: '5 hours ago',
        read: false,
      },
      {
        id: 3,
        message: 'System update scheduled for tonight',
        time: 'Yesterday',
        read: true,
      },
    ]);
  }, []);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleNavItemClick = (newView) => {
    setLoading(true);
    setView(newView);
    // Simulate loading
    setTimeout(() => {
      setLoading(false);
    }, 500);
    if (isMobile) {
      setOpen(false);
    }
  };

  const handleMenuClick = (event) => {
    setMenuOpen(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuOpen(null);
  };

  const handleNotificationsClick = (event) => {
    setNotificationsOpen(event.currentTarget);
  };

  const handleNotificationsClose = () => {
    setNotificationsOpen(null);
  };

  const handleContentManagementClick = () => {
    setContentManagementOpen(!contentManagementOpen);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbar({ ...snackbar, open: false });
  };

  // Function to show notifications
  const showNotification = (message, severity = 'success') => {
    setSnackbar({
      open: true,
      message,
      severity,
    });
  };

  // Render the selected view
  const renderView = () => {
    switch (view) {
      case 'dashboard':
        return <Dashboard showNotification={showNotification} />;
      case 'users':
        return <UserManagement showNotification={showNotification} />;
      case 'artists':
        return <ArtistManagement showNotification={showNotification} />;
      case 'albums':
        return <AlbumManagement showNotification={showNotification} />;
      case 'tracks':
        return <TrackManagement showNotification={showNotification} />;
      case 'playlists':
        return <PlaylistManagement showNotification={showNotification} />;
      case 'genres':
        return <GenreManagement showNotification={showNotification} />;
      case 'reports':
        return <ReportManagement showNotification={showNotification} />;
      case 'analytics':
        return <AnalyticsView showNotification={showNotification} />;
      case 'payments':
        return <PaymentManagement showNotification={showNotification} />;
      case 'settings':
        return <Settings showNotification={showNotification} />;
      default:
        return <Dashboard showNotification={showNotification} />;
    }
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        
        {/* Top App Bar */}
        <AppBar
          position="fixed"
          sx={{
            backgroundColor: 'rgba(18, 18, 18, 0.98)',
            backdropFilter: 'blur(20px)',
            zIndex: (theme) => theme.zIndex.drawer + 1,
            transition: (theme) =>
              theme.transitions.create(['width', 'margin'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
              }),
            ...(open && {
              marginLeft: drawerWidth,
              width: `calc(100% - ${drawerWidth}px)`,
              transition: (theme) =>
                theme.transitions.create(['width', 'margin'], {
                  easing: theme.transitions.easing.sharp,
                  duration: theme.transitions.duration.enteringScreen,
                }),
            }),
          }}
          elevation={0}
        >
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              sx={{
                marginRight: 2,
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{
                flexGrow: 1,
                display: 'flex',
                alignItems: 'center',
              }}
            >
              {view === 'dashboard' && 'Admin Dashboard'}
              {view === 'users' && 'User Management'}
              {view === 'artists' && 'Artist Management'}
              {view === 'albums' && 'Album Management'}
              {view === 'tracks' && 'Track Management'}
              {view === 'playlists' && 'Playlist Management'}
              {view === 'genres' && 'Genre Management'}
              {view === 'reports' && 'Report Management'}
              {view === 'analytics' && 'Analytics & Insights'}
              {view === 'payments' && 'Payment Management'}
              {view === 'settings' && 'System Settings'}
            </Typography>
            
            {/* Notifications button */}
            <IconButton 
              color="inherit"
              onClick={handleNotificationsClick}
            >
              <Badge badgeContent={notifications.filter(n => !n.read).length} color="primary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            
            {/* User menu */}
            <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  cursor: 'pointer',
                }}
                onClick={handleMenuClick}
              >
                <Avatar 
                  sx={{ 
                    width: 36, 
                    height: 36,
                    bgcolor: 'primary.main',
                    fontSize: '0.9rem',
                    fontWeight: 'bold',
                  }}
                >
                  AP
                </Avatar>
                {!isMobile && (
                  <>
                    <Typography
                      variant="body2"
                      sx={{ ml: 1, fontWeight: 600, display: { xs: 'none', sm: 'block' } }}
                    >
                      Admin User
                    </Typography>
                    <ArrowDropDownIcon sx={{ display: { xs: 'none', sm: 'block' } }} />
                  </>
                )}
              </Box>
            </Box>
            
            {/* Notifications menu */}
            <Menu
              id="notifications-menu"
              anchorEl={notificationsOpen}
              open={Boolean(notificationsOpen)}
              onClose={handleNotificationsClose}
              PaperProps={{
                sx: {
                  mt: 1.5,
                  width: 360,
                  maxWidth: '100%',
                  maxHeight: 400,
                },
              }}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
              <Box sx={{ p: 2, pb: 1 }}>
                <Typography variant="h6">Notifications</Typography>
              </Box>
              <Divider />
              <List sx={{ py: 0 }}>
                {notifications.length > 0 ? (
                  notifications.map((notification) => (
                    <ListItemButton
                      key={notification.id}
                      sx={{
                        py: 2,
                        backgroundColor: notification.read ? 'transparent' : 'rgba(29, 185, 84, 0.08)',
                        '&:hover': {
                          backgroundColor: notification.read ? 'rgba(255, 255, 255, 0.05)' : 'rgba(29, 185, 84, 0.12)',
                        },
                      }}
                    >
                      <ListItemIcon>
                        <NotificationsIcon color={notification.read ? 'disabled' : 'primary'} />
                      </ListItemIcon>
                      <ListItemText
                        primary={notification.message}
                        primaryTypographyProps={{
                          variant: 'body2',
                          fontWeight: notification.read ? 400 : 600,
                        }}
                        secondary={notification.time}
                      />
                    </ListItemButton>
                  ))
                ) : (
                  <Box sx={{ p: 3, textAlign: 'center' }}>
                    <Typography variant="body2" color="text.secondary">
                      No notifications
                    </Typography>
                  </Box>
                )}
              </List>
              {notifications.length > 0 && (
                <Box sx={{ p: 1.5, textAlign: 'center' }}>
                  <Button
                    color="primary"
                    size="small"
                    onClick={() => {
                      handleNotificationsClose();
                      // Mark all as read logic
                      setNotifications(notifications.map(n => ({ ...n, read: true })));
                    }}
                  >
                    Mark all as read
                  </Button>
                </Box>
              )}
            </Menu>
            
            {/* User menu */}
            <Menu
              id="profile-menu"
              anchorEl={menuOpen}
              open={Boolean(menuOpen)}
              onClose={handleMenuClose}
              PaperProps={{
                sx: { mt: 1.5, width: 200 },
              }}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
              <MenuItem onClick={handleMenuClose}>
                <ListItemIcon>
                  <PersonIcon fontSize="small" />
                </ListItemIcon>
                Profile
              </MenuItem>
              <MenuItem onClick={handleMenuClose}>
                <ListItemIcon>
                  <SettingsIcon fontSize="small" />
                </ListItemIcon>
                Settings
              </MenuItem>
              <Divider />
              <MenuItem onClick={handleMenuClose}>
                <ListItemIcon>
                  <LogoutIcon fontSize="small" />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          </Toolbar>
          {loading && <LinearProgress color="primary" />}
        </AppBar>
        
        {/* Side Navigation Drawer */}
        <Drawer
          variant={isMobile ? "temporary" : "permanent"}
          open={open}
          onClose={handleDrawerClose}
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
              borderRight: '1px solid rgba(255, 255, 255, 0.12)',
            },
          }}
        >
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              px: [1],
              borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: 800,
                color: '#1DB954',
                pl: 1.5,
                fontSize: '1.5rem',
                letterSpacing: 1,
              }}
            >
              MUSICIFY
            </Typography>
            <IconButton onClick={handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Box sx={{ overflow: 'auto', mt: 2 }}>
            <List component="nav" sx={{ px: 2 }}>
              {/* Main Navigation */}
              <ListItemButton
                selected={view === 'dashboard'}
                onClick={() => handleNavItemClick('dashboard')}
              >
                <ListItemIcon>
                  <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
              </ListItemButton>
              
              <ListItemButton
                selected={view === 'users'}
                onClick={() => handleNavItemClick('users')}
              >
                <ListItemIcon>
                  <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary="Users" />
              </ListItemButton>
              
              <ListItemButton
                selected={view === 'artists'}
                onClick={() => handleNavItemClick('artists')}
              >
                <ListItemIcon>
                  <PersonIcon />
                </ListItemIcon>
                <ListItemText primary="Artists" />
              </ListItemButton>
              
              {/* Content Management Section */}
              <ListItemButton onClick={handleContentManagementClick}>
                <ListItemIcon>
                  <LibraryMusicIcon />
                </ListItemIcon>
                <ListItemText primary="Content Management" />
                {contentManagementOpen ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              
              <Collapse in={contentManagementOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItemButton
                    selected={view === 'albums'}
                    onClick={() => handleNavItemClick('albums')}
                    sx={{ pl: 4 }}
                  >
                    <ListItemIcon>
                      <AlbumIcon />
                    </ListItemIcon>
                    <ListItemText primary="Albums" />
                  </ListItemButton>
                  
                  <ListItemButton
                    selected={view === 'tracks'}
                    onClick={() => handleNavItemClick('tracks')}
                    sx={{ pl: 4 }}
                  >
                    <ListItemIcon>
                      <QueueMusicIcon />
                    </ListItemIcon>
                    <ListItemText primary="Tracks" />
                  </ListItemButton>
                  
                  <ListItemButton
                    selected={view === 'playlists'}
                    onClick={() => handleNavItemClick('playlists')}
                    sx={{ pl: 4 }}
                  >
                    <ListItemIcon>
                      <PlaylistAddIcon />
                    </ListItemIcon>
                    <ListItemText primary="Playlists" />
                  </ListItemButton>
                  
                  <ListItemButton
                    selected={view === 'genres'}
                    onClick={() => handleNavItemClick('genres')}
                    sx={{ pl: 4 }}
                  >
                    <ListItemIcon>
                      <CategoryIcon />
                    </ListItemIcon>
                    <ListItemText primary="Genres" />
                  </ListItemButton>
                </List>
              </Collapse>
              
              <Divider sx={{ my: 2 }} />
              
              <ListItemButton
                selected={view === 'analytics'}
                onClick={() => handleNavItemClick('analytics')}
              >
                <ListItemIcon>
                  <BarChartIcon />
                </ListItemIcon>
                <ListItemText primary="Analytics" />
              </ListItemButton>
              
              <ListItemButton
                selected={view === 'payments'}
                onClick={() => handleNavItemClick('payments')}
              >
                <ListItemIcon>
                  <PaymentIcon />
                </ListItemIcon>
                <ListItemText primary="Payments" />
              </ListItemButton>
              
              <ListItemButton
                selected={view === 'reports'}
                onClick={() => handleNavItemClick('reports')}
              >
                <ListItemIcon>
                  <ReportIcon />
                </ListItemIcon>
                <ListItemText primary="Reports & Issues" />
              </ListItemButton>
              
              <Divider sx={{ my: 2 }} />
              
              <ListItemButton
                selected={view === 'settings'}
                onClick={() => handleNavItemClick('settings')}
              >
                <ListItemIcon>
                  <SettingsIcon />
                </ListItemIcon>
                <ListItemText primary="Settings" />
              </ListItemButton>
            </List>
          </Box>
        </Drawer>
        
        {/* Main Content */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            overflow: 'auto',
            backgroundColor: theme => theme.palette.background.default,
            pt: { xs: 9, sm: 11 },
            pb: 8,
            minHeight: '100vh',
          }}
        >
          {renderView()}
        </Box>
        
        {/* Snackbar for notifications */}
        <Snackbar 
          open={snackbar.open} 
          autoHideDuration={6000} 
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
          <Alert 
            onClose={handleSnackbarClose} 
            severity={snackbar.severity} 
            variant="filled"
            sx={{ width: '100%' }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Box>
    </ThemeProvider> 
  );
}

export default AdminDashboard;