import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  IconButton,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  ListItemSecondaryAction,
  Divider,
  Chip,
  Stack,
  Tabs,
  Tab,
  CircularProgress,
  LinearProgress,
  Skeleton,
  Menu,
  MenuItem,
  Badge,
  Tooltip,
  ListItemIcon
} from '@mui/material';
import { styled } from '@mui/material/styles';

// Icons
import FavoriteIcon from '@mui/icons-material/Favorite';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import AlbumIcon from '@mui/icons-material/Album';
import PersonIcon from '@mui/icons-material/Person';
import PlaylistPlayIcon from '@mui/icons-material/PlaylistPlay';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import SettingsIcon from '@mui/icons-material/Settings';
import HeadphonesIcon from '@mui/icons-material/Headphones';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import HistoryIcon from '@mui/icons-material/History';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import StarIcon from '@mui/icons-material/Star';
import AddIcon from '@mui/icons-material/Add';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import GetAppIcon from '@mui/icons-material/GetApp';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

// Chart.js
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip as ChartTooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  ChartTooltip,
  Legend,
  ArcElement
);

// Styled components
const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.3s, box-shadow 0.3s',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: `0 8px 16px rgba(0, 0, 0, 0.1)`,
  },
}));

const ProgressContainer = styled(Box)(({ theme }) => ({
  height: 4,
  width: '100%',
  backgroundColor: theme.palette.grey[200],
  borderRadius: 2,
  position: 'relative',
}));

const Progress = styled(Box)(({ theme, value }) => ({
  height: '100%',
  borderRadius: 2,
  background: `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.light} 100%)`,
  width: `${value}%`,
}));

function UserDashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [tabValue, setTabValue] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const [profileMenuAnchor, setProfileMenuAnchor] = useState(null);
  const [notificationMenuAnchor, setNotificationMenuAnchor] = useState(null);
  
  // Mock data
  const [userData, setUserData] = useState({
    username: 'music_lover',
    name: 'Alex Johnson',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    memberSince: 'May 2023',
    plan: 'Premium',
    planRenewal: '2025-06-15',
    totalListeningTime: 4327, // minutes
    favoriteGenres: ['Pop', 'Rock', 'Electronic'],
    listeningHistory: [
      { day: 'Mon', minutes: 45 },
      { day: 'Tue', minutes: 62 },
      { day: 'Wed', minutes: 38 },
      { day: 'Thu', minutes: 91 },
      { day: 'Fri', minutes: 134 },
      { day: 'Sat', minutes: 157 },
      { day: 'Sun', minutes: 103 },
    ],
    recentlyPlayed: [],
    favoriteArtists: [],
    playlists: [],
    recommendations: [],
  });

  useEffect(() => {
    // Simulate API loading delay
    const timer = setTimeout(() => {
      // Set mock data
      setUserData({
        ...userData,
        recentlyPlayed: [
          {
            id: 1,
            title: 'Hold On',
            artist: 'Justin Bieber',
            album: 'Justice',
            coverArt: 'https://via.placeholder.com/100?text=Album+1',
            playedAt: '2 hours ago',
            duration: '3:21',
          },
          {
            id: 2,
            title: 'Blinding Lights',
            artist: 'The Weeknd',
            album: 'After Hours',
            coverArt: 'https://via.placeholder.com/100?text=Album+2',
            playedAt: '3 hours ago',
            duration: '3:22',
          },
          {
            id: 3,
            title: 'Bad Habits',
            artist: 'Ed Sheeran',
            album: '=',
            coverArt: 'https://via.placeholder.com/100?text=Album+3',
            playedAt: 'Yesterday',
            duration: '4:01',
          },
          {
            id: 4,
            title: 'Good 4 U',
            artist: 'Olivia Rodrigo',
            album: 'SOUR',
            coverArt: 'https://via.placeholder.com/100?text=Album+4',
            playedAt: 'Yesterday',
            duration: '2:58',
          },
          {
            id: 5,
            title: 'Levitating',
            artist: 'Dua Lipa',
            album: 'Future Nostalgia',
            coverArt: 'https://via.placeholder.com/100?text=Album+5',
            playedAt: '2 days ago',
            duration: '3:23',
          },
        ],
        favoriteArtists: [
          {
            id: 1,
            name: 'Taylor Swift',
            image: 'https://via.placeholder.com/100?text=Artist+1',
            followers: '85.4M',
          },
          {
            id: 2,
            name: 'The Weeknd',
            image: 'https://via.placeholder.com/100?text=Artist+2',
            followers: '75.1M',
          },
          {
            id: 3,
            name: 'Drake',
            image: 'https://via.placeholder.com/100?text=Artist+3',
            followers: '65.8M',
          },
          {
            id: 4,
            name: 'Ariana Grande',
            image: 'https://via.placeholder.com/100?text=Artist+4',
            followers: '80.2M',
          },
        ],
        playlists: [
          {
            id: 1,
            name: 'My Favorites',
            tracks: 43,
            coverArt: 'https://via.placeholder.com/100?text=Playlist+1',
            lastUpdated: '3 days ago',
          },
          {
            id: 2,
            name: 'Workout Mix',
            tracks: 25,
            coverArt: 'https://via.placeholder.com/100?text=Playlist+2',
            lastUpdated: '1 week ago',
          },
          {
            id: 3,
            name: 'Chill Vibes',
            tracks: 32,
            coverArt: 'https://via.placeholder.com/100?text=Playlist+3',
            lastUpdated: '2 weeks ago',
          },
          {
            id: 4,
            name: 'Road Trip',
            tracks: 18,
            coverArt: 'https://via.placeholder.com/100?text=Playlist+4',
            lastUpdated: '1 month ago',
          },
        ],
        recommendations: [
          {
            id: 1,
            title: 'Shivers',
            artist: 'Ed Sheeran',
            album: '=',
            coverArt: 'https://via.placeholder.com/100?text=Recom+1',
          },
          {
            id: 2,
            title: 'Easy On Me',
            artist: 'Adele',
            album: '30',
            coverArt: 'https://via.placeholder.com/100?text=Recom+2',
          },
          {
            id: 3,
            title: 'Stay',
            artist: 'The Kid LAROI, Justin Bieber',
            album: 'F*CK LOVE 3: OVER YOU',
            coverArt: 'https://via.placeholder.com/100?text=Recom+3',
          },
          {
            id: 4,
            title: 'Heat Waves',
            artist: 'Glass Animals',
            album: 'Dreamland',
            coverArt: 'https://via.placeholder.com/100?text=Recom+4',
          },
          {
            id: 5,
            title: 'INDUSTRY BABY',
            artist: 'Lil Nas X, Jack Harlow',
            album: 'MONTERO',
            coverArt: 'https://via.placeholder.com/100?text=Recom+5',
          },
        ],
      });
      
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
  
  // Handle menu open
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  // Handle menu close
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  
  // Handle profile menu
  const handleProfileMenuOpen = (event) => {
    setProfileMenuAnchor(event.currentTarget);
  };
  
  const handleProfileMenuClose = () => {
    setProfileMenuAnchor(null);
  };
  
  // Handle notification menu
  const handleNotificationMenuOpen = (event) => {
    setNotificationMenuAnchor(event.currentTarget);
  };
  
  const handleNotificationMenuClose = () => {
    setNotificationMenuAnchor(null);
  };

  // Format listening time
  const formatListeningTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    
    if (days > 0) {
      return `${days} day${days !== 1 ? 's' : ''} ${hours % 24} hr`;
    } else {
      return `${hours} hr ${minutes % 60} min`;
    }
  };
  
  // Chart data
  const listeningHistoryData = {
    labels: userData.listeningHistory.map(item => item.day),
    datasets: [
      {
        label: 'Listening Time (minutes)',
        data: userData.listeningHistory.map(item => item.minutes),
        backgroundColor: 'rgba(29, 185, 84, 0.6)',
        borderColor: '#1DB954',
        borderWidth: 2,
        borderRadius: 5,
      },
    ],
  };
  
  // Chart options
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          borderDash: [2, 2],
        },
      },
    },
  };

  return (
    <Box sx={{ pb: 4 }}>
      {/* Header with user info and actions */}
      <Paper 
        elevation={0} 
        sx={{ 
          p: 3, 
          mb: 3, 
          borderRadius: 2,
          backgroundImage: 'linear-gradient(to right, rgba(29, 185, 84, 0.9), rgba(30, 215, 96, 0.9))',
          color: 'white',
        }}
      >
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} sm={8} md={9}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Avatar 
                src={userData.avatar} 
                sx={{ 
                  width: 80, 
                  height: 80,
                  border: '3px solid white',
                  mr: 2,
                }}
              />
              <Box>
                <Typography variant="h4" sx={{ fontWeight: 700 }}>
                  Welcome back, {userData.name}
                </Typography>
                <Typography variant="body1">
                  @{userData.username} • Member since {userData.memberSince}
                </Typography>
                <Box sx={{ mt: 1, display: 'flex', alignItems: 'center' }}>
                  <Chip 
                    label={userData.plan} 
                    sx={{ 
                      bgcolor: 'rgba(255, 255, 255, 0.3)',
                      color: 'white',
                      fontWeight: 'bold',
                      mr: 1
                    }} 
                  />
                  <Typography variant="caption">
                    Next renewal: {userData.planRenewal}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4} md={3} sx={{ textAlign: { xs: 'left', sm: 'right' } }}>
            <Stack direction="row" spacing={1} sx={{ justifyContent: { xs: 'flex-start', sm: 'flex-end' } }}>
              <Button variant="contained" sx={{ bgcolor: 'white', color: '#1DB954', '&:hover': { bgcolor: 'rgba(255,255,255,0.8)' } }}>
                Edit Profile
              </Button>
              <IconButton 
                sx={{ bgcolor: 'rgba(255,255,255,0.3)', '&:hover': { bgcolor: 'rgba(255,255,255,0.2)' } }}
                onClick={handleProfileMenuOpen}
              >
                <AccountCircleIcon />
              </IconButton>
              <IconButton 
                sx={{ bgcolor: 'rgba(255,255,255,0.3)', '&:hover': { bgcolor: 'rgba(255,255,255,0.2)' } }}
                onClick={handleNotificationMenuOpen}
              >
                <Badge badgeContent={3} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
            </Stack>
          </Grid>
        </Grid>
      </Paper>
      
      {/* Profile Menu */}
      <Menu
        anchorEl={profileMenuAnchor}
        open={Boolean(profileMenuAnchor)}
        onClose={handleProfileMenuClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleProfileMenuClose}>Profile Settings</MenuItem>
        <MenuItem onClick={handleProfileMenuClose}>Account Settings</MenuItem>
        <MenuItem onClick={handleProfileMenuClose}>Payment Methods</MenuItem>
        <Divider />
        <MenuItem onClick={handleProfileMenuClose}>Help Center</MenuItem>
        <MenuItem onClick={handleProfileMenuClose}>Sign Out</MenuItem>
      </Menu>
      
      {/* Notification Menu */}
      <Menu
        anchorEl={notificationMenuAnchor}
        open={Boolean(notificationMenuAnchor)}
        onClose={handleNotificationMenuClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        PaperProps={{
          sx: { width: 320, maxHeight: 400 }
        }}
      >
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="subtitle1" fontWeight="bold">Notifications</Typography>
          <Button size="small">Mark all as read</Button>
        </Box>
        <Divider />
        <List sx={{ py: 0 }}>
          <ListItem divider>
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: 'primary.main' }}>
                <MusicNoteIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText 
              primary="New Release from Taylor Swift" 
              secondary="Check out the new album 'Midnight Memories'" 
              secondaryTypographyProps={{ noWrap: true }}
            />
          </ListItem>
          <ListItem divider>
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: 'success.main' }}>
                <PlaylistPlayIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText 
              primary="Playlist Update" 
              secondary="'My Favorites' playlist was updated" 
            />
          </ListItem>
          <ListItem>
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: 'info.main' }}>
                <PersonIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText 
              primary="Friend Activity" 
              secondary="Alex started following you" 
            />
          </ListItem>
        </List>
        <Divider />
        <Box sx={{ p: 1, textAlign: 'center' }}>
          <Button fullWidth>View All Notifications</Button>
        </Box>
      </Menu>
      
      {/* Loading indicator */}
      {isLoading && (
        <Box sx={{ my: 4, textAlign: 'center' }}>
          <CircularProgress size={60} sx={{ color: '#1DB954' }} />
          <Typography variant="body1" sx={{ mt: 2 }}>Loading your dashboard...</Typography>
        </Box>
      )}
      
      {!isLoading && (
        <>
          {/* Stats Summary Cards */}
          <Grid container spacing={3} sx={{ mb: 3 }}>
            <Grid item xs={12} sm={6} md={3}>
              <StyledCard>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Typography variant="subtitle1" color="text.secondary">Total Listening Time</Typography>
                    <Avatar sx={{ bgcolor: 'primary.main', width: 40, height: 40 }}>
                      <HeadphonesIcon />
                    </Avatar>
                  </Box>
                  <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1 }}>
                    {formatListeningTime(userData.totalListeningTime)}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <TrendingUpIcon sx={{ color: 'success.main', mr: 0.5, fontSize: '1rem' }} />
                    <Typography variant="body2" color="success.main">+8.2% from last month</Typography>
                  </Box>
                </CardContent>
              </StyledCard>
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <StyledCard>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Typography variant="subtitle1" color="text.secondary">Favorite Genre</Typography>
                    <Avatar sx={{ bgcolor: '#1976d2', width: 40, height: 40 }}>
                      <EqualizerIcon />
                    </Avatar>
                  </Box>
                  <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1 }}>
                    {userData.favoriteGenres[0]}
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {userData.favoriteGenres.slice(1).map((genre, index) => (
                      <Chip key={index} label={genre} size="small" />
                    ))}
                  </Box>
                </CardContent>
              </StyledCard>
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <StyledCard>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Typography variant="subtitle1" color="text.secondary">Playlists Created</Typography>
                    <Avatar sx={{ bgcolor: '#e53935', width: 40, height: 40 }}>
                      <PlaylistPlayIcon />
                    </Avatar>
                  </Box>
                  <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1 }}>
                    {userData.playlists.length}
                  </Typography>
                  <Button 
                    startIcon={<AddIcon />} 
                    variant="outlined" 
                    size="small"
                  >
                    Create New
                  </Button>
                </CardContent>
              </StyledCard>
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <StyledCard>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Typography variant="subtitle1" color="text.secondary">Weekly Activity</Typography>
                    <Avatar sx={{ bgcolor: '#43a047', width: 40, height: 40 }}>
                      <TrendingUpIcon />
                    </Avatar>
                  </Box>
                  <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Box 
                        sx={{ 
                          width: 10, 
                          height: 10, 
                          borderRadius: '50%', 
                          bgcolor: 'primary.main',
                          mr: 0.5 
                        }} 
                      />
                      <Typography variant="caption">Tracks</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Box 
                        sx={{ 
                          width: 10, 
                          height: 10, 
                          borderRadius: '50%', 
                          bgcolor: 'secondary.main',
                          mr: 0.5 
                        }} 
                      />
                      <Typography variant="caption">Playlists</Typography>
                    </Box>
                  </Stack>
                  <ProgressContainer>
                    <Progress value={72} />
                  </ProgressContainer>
                </CardContent>
              </StyledCard>
            </Grid>
          </Grid>
          
          {/* Main content tabs */}
          <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
            <Tabs 
              value={tabValue} 
              onChange={handleTabChange} 
              variant="scrollable"
              scrollButtons="auto"
              textColor="primary"
              indicatorColor="primary"
            >
              <Tab icon={<HistoryIcon />} label="Recently Played" iconPosition="start" />
              <Tab icon={<FavoriteIcon />} label="Favorites" iconPosition="start" />
              <Tab icon={<PlaylistPlayIcon />} label="My Playlists" iconPosition="start" />
              <Tab icon={<StarIcon />} label="Recommendations" iconPosition="start" />
              <Tab icon={<EqualizerIcon />} label="Listening Stats" iconPosition="start" />
            </Tabs>
          </Box>
          
          {/* Recently Played */}
          {tabValue === 0 && (
            <Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6">Recently Played</Typography>
                <Button endIcon={<KeyboardArrowRightIcon />} size="small">
                  Full History
                </Button>
              </Box>
              
              <Paper sx={{ mb: 3, overflow: 'hidden' }}>
                <List sx={{ py: 0 }}>
                  {userData.recentlyPlayed.map((track, index) => (
                    <React.Fragment key={track.id}>
                      <ListItem 
                        secondaryAction={
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Typography variant="body2" color="text.secondary" sx={{ mr: 2 }}>
                              {track.duration}
                            </Typography>
                            <IconButton onClick={handleMenuOpen}>
                              <MoreVertIcon fontSize="small" />
                            </IconButton>
                          </Box>
                        }
                      >
                        <ListItemAvatar>
                          <Avatar 
                            variant="rounded"
                            alt={track.title} 
                            src={track.coverArt}
                            sx={{ width: 50, height: 50 }}
                          />
                        </ListItemAvatar>
                        <ListItemText 
                          primary={track.title} 
                          secondary={
                            <Box>
                              <Typography variant="body2" component="span">
                                {track.artist}
                              </Typography>
                              <Typography variant="caption" sx={{ display: 'block', color: 'text.secondary' }}>
                                Played {track.playedAt}
                              </Typography>
                            </Box>
                          }
                          primaryTypographyProps={{ fontWeight: 500 }}
                        />
                      </ListItem>
                      {index < userData.recentlyPlayed.length - 1 && <Divider variant="inset" component="li" />}
                    </React.Fragment>
                  ))}
                </List>
              </Paper>
              
              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <Typography variant="h6" sx={{ mb: 2 }}>Top Artists</Typography>
                  <Stack spacing={2}>
                    {userData.favoriteArtists.map((artist) => (
                      <Card key={artist.id} variant="outlined">
                        <Box sx={{ display: 'flex', alignItems: 'center', p: 2 }}>
                          <Avatar 
                            src={artist.image} 
                            sx={{ width: 60, height: 60, mr: 2 }}
                          />
                          <Box sx={{ flexGrow: 1 }}>
                            <Typography variant="subtitle1" fontWeight="bold">{artist.name}</Typography>
                            <Typography variant="body2" color="text.secondary">{artist.followers} followers</Typography>
                          </Box>
                          <IconButton>
                            <PlayArrowIcon />
                          </IconButton>
                        </Box>
                      </Card>
                    ))}
                  </Stack>
                </Grid>
                
                <Grid item xs={12} md={8}>
                  <Typography variant="h6" sx={{ mb: 2 }}>Listening Activity</Typography>
                  <Paper sx={{ p: 2 }}>
                    <Box sx={{ height: 300 }}>
                      <Bar data={listeningHistoryData} options={chartOptions} />
                    </Box>
                  </Paper>
                </Grid>
              </Grid>
            </Box>
          )}
          
          {/* Favorites Tab */}
          {tabValue === 1 && (
            <Box>
              <Typography variant="h6" sx={{ mb: 2 }}>Your Favorite Tracks</Typography>
              
              <Grid container spacing={3}>
                {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                  <Grid item xs={12} sm={6} md={3} key={item}>
                    <StyledCard>
                      <CardMedia
                        component="img"
                        height="160"
                        image={`https://via.placeholder.com/300?text=Favorite+${item}`}
                        alt={`Favorite ${item}`}
                      />
                      <CardContent>
                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                          Favorite Track {item}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Artist {item}
                        </Typography>
                      </CardContent>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', px: 2, pb: 1 }}>
                        <IconButton size="small">
                          <PlayArrowIcon />
                        </IconButton>
                        <IconButton size="small" color="primary">
                          <FavoriteIcon />
                        </IconButton>
                      </Box>
                    </StyledCard>
                  </Grid>
                ))}
              </Grid>
              
              <Typography variant="h6" sx={{ mb: 2, mt: 4 }}>Your Favorite Artists</Typography>
              <Grid container spacing={3}>
                {userData.favoriteArtists.map((artist) => (
                  <Grid item xs={12} sm={6} md={3} key={artist.id}>
                    <StyledCard>
                      <Box sx={{ position: 'relative' }}>
                        <CardMedia
                          component="img"
                          height="200"
                          image={artist.image}
                          alt={artist.name}
                        />
                        <Box
                          sx={{
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            right: 0,
                            bgcolor: 'rgba(0, 0, 0, 0.6)',
                            p: 2,
                          }}
                        >
                          <Typography variant="subtitle1" sx={{ color: 'white', fontWeight: 'bold' }}>
                            {artist.name}
                          </Typography>
                          <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                            {artist.followers} followers
                          </Typography>
                        </Box>
                      </Box>
                    </StyledCard>
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}
          
          {/* My Playlists Tab */}
          {tabValue === 2 && (
            <Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6">My Playlists</Typography>
                <Button variant="contained" startIcon={<AddIcon />}>
                  Create Playlist
                </Button>
              </Box>
              
              <Grid container spacing={3}>
                {userData.playlists.map((playlist) => (
                  <Grid item xs={12} sm={6} md={3} key={playlist.id}>
                    <StyledCard>
                      <CardMedia
                        component="img"
                        height="180"
                        image={playlist.coverArt}
                        alt={playlist.name}
                      />
                      <CardContent>
                        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                          {playlist.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {playlist.tracks} tracks • Updated {playlist.lastUpdated}
                        </Typography>
                      </CardContent>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 1 }}>
                        <Button startIcon={<PlayArrowIcon />} size="small">
                          Play
                        </Button>
                        <IconButton size="small">
                          <MoreVertIcon />
                        </IconButton>
                      </Box>
                    </StyledCard>
                  </Grid>
                ))}
              </Grid>
              
              <Box sx={{ mt: 4, p: 3, bgcolor: 'background.default', borderRadius: 2, textAlign: 'center' }}>
                <Typography variant="h6" gutterBottom>Need inspiration?</Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  Discover curated playlists made just for you based on your listening habits.
                </Typography>
                <Button variant="outlined">Explore Featured Playlists</Button>
              </Box>
            </Box>
          )}
          
          {/* Recommendations Tab */}
          {tabValue === 3 && (
            <Box>
              <Typography variant="h6" sx={{ mb: 2 }}>Recommended For You</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Based on your recent listening history, you might enjoy these tracks
              </Typography>
              
              <Grid container spacing={3}>
                {userData.recommendations.map((track) => (
                  <Grid item xs={12} sm={6} md={4} key={track.id}>
                    <StyledCard>
                      <Box sx={{ display: 'flex' }}>
                        <CardMedia
                          component="img"
                          sx={{ width: 120 }}
                          image={track.coverArt}
                          alt={track.title}
                        />
                        <CardContent sx={{ flex: '1 0 auto' }}>
                          <Typography variant="subtitle1" fontWeight="bold">{track.title}</Typography>
                          <Typography variant="body2" color="text.secondary">{track.artist}</Typography>
                          <Typography variant="caption" color="text.secondary" display="block" sx={{ mt: 1 }}>{track.album}</Typography>
                          <Box sx={{ display: 'flex', mt: 1 }}>
                            <Button size="small" startIcon={<PlayArrowIcon />} sx={{ mr: 1 }}>
                              Play
                            </Button>
                            <IconButton size="small">
                              <FavoriteIcon fontSize="small" />
                            </IconButton>
                          </Box>
                        </CardContent>
                      </Box>
                    </StyledCard>
                  </Grid>
                ))}
              </Grid>
              
              <Typography variant="h6" sx={{ mb: 2, mt: 4 }}>Weekly Discovery</Typography>
              <Grid container spacing={3}>
                {[1, 2, 3, 4].map((item) => (
                  <Grid item xs={12} sm={6} md={3} key={`discovery-${item}`}>
                    <StyledCard>
                      <CardMedia
                        component="img"
                        height="180"
                        image={`https://via.placeholder.com/300?text=Discovery+${item}`}
                        alt={`Discovery ${item}`}
                      />
                      <CardContent>
                        <Typography variant="subtitle1" fontWeight="bold">
                          {item === 1 ? "New Releases" : item === 2 ? "Similar Artists" : item === 3 ? "Popular Tracks" : "Mix for You"}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {item === 1 ? "Fresh tracks from artists you follow" : 
                           item === 2 ? "Discover artists similar to your favorites" : 
                           item === 3 ? "Top tracks you might enjoy" : 
                           "Personalized mix based on your taste"}
                        </Typography>
                      </CardContent>
                      <Box sx={{ p: 1 }}>
                        <Button fullWidth variant="outlined" startIcon={<PlayArrowIcon />}>
                          Listen Now
                        </Button>
                      </Box>
                    </StyledCard>
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}
          
          {/* Listening Stats Tab */}
          {tabValue === 4 && (
            <Box>
              <Typography variant="h6" sx={{ mb: 2 }}>Your Listening Stats</Typography>
              
              <Grid container spacing={3}>
                <Grid item xs={12} md={7}>
                  <Paper sx={{ p: 2 }}>
                    <Typography variant="subtitle1" gutterBottom>Weekly Listening Activity</Typography>
                    <Box sx={{ height: 300 }}>
                      <Bar data={listeningHistoryData} options={chartOptions} />
                    </Box>
                  </Paper>
                </Grid>
                
                <Grid item xs={12} md={5}>
                  <Paper sx={{ p: 2, height: '100%' }}>
                    <Typography variant="subtitle1" gutterBottom>Top Genres</Typography>
                    <Box sx={{ mt: 3 }}>
                      {[
                        { genre: 'Pop', percentage: 35 },
                        { genre: 'Rock', percentage: 25 },
                        { genre: 'Electronic', percentage: 20 },
                        { genre: 'Hip-Hop', percentage: 15 },
                        { genre: 'Other', percentage: 5 },
                      ].map((item, index) => (
                        <Box key={index} sx={{ mb: 2 }}>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
                            <Typography variant="body2">{item.genre}</Typography>
                            <Typography variant="body2" color="text.secondary">{item.percentage}%</Typography>
                          </Box>
                          <LinearProgress
                            variant="determinate"
                            value={item.percentage}
                            sx={{ 
                              height: 8, 
                              borderRadius: 2,
                              bgcolor: 'rgba(0,0,0,0.08)',
                              '& .MuiLinearProgress-bar': {
                                bgcolor: index === 0 ? '#1DB954' : 
                                       index === 1 ? '#1976d2' : 
                                       index === 2 ? '#9c27b0' : 
                                       index === 3 ? '#ff9800' : '#e91e63',
                              }
                            }}
                          />
                        </Box>
                      ))}
                    </Box>
                  </Paper>
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <Paper sx={{ p: 2 }}>
                    <Typography variant="subtitle1" gutterBottom>Listening Habits</Typography>
                    <Grid container spacing={2} sx={{ mt: 1 }}>
                      <Grid item xs={6}>
                        <Box sx={{ textAlign: 'center', p: 2, borderRadius: 2, bgcolor: 'background.default' }}>
                          <Typography variant="h5" fontWeight="bold" color="primary.main">42%</Typography>
                          <Typography variant="body2">Morning Listener</Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={6}>
                        <Box sx={{ textAlign: 'center', p: 2, borderRadius: 2, bgcolor: 'background.default' }}>
                          <Typography variant="h5" fontWeight="bold" color="primary.main">3.2 hrs</Typography>
                          <Typography variant="body2">Daily Average</Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={6}>
                        <Box sx={{ textAlign: 'center', p: 2, borderRadius: 2, bgcolor: 'background.default' }}>
                          <Typography variant="h5" fontWeight="bold" color="primary.main">Saturday</Typography>
                          <Typography variant="body2">Most Active Day</Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={6}>
                        <Box sx={{ textAlign: 'center', p: 2, borderRadius: 2, bgcolor: 'background.default' }}>
                          <Typography variant="h5" fontWeight="bold" color="primary.main">639</Typography>
                          <Typography variant="body2">Unique Tracks</Typography>
                        </Box>
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <Paper sx={{ p: 2 }}>
                    <Typography variant="subtitle1" gutterBottom>Most Played Tracks</Typography>
                    <List dense>
                      {[
                        { title: 'Track 1', artist: 'Artist 1', plays: 42 },
                        { title: 'Track 2', artist: 'Artist 2', plays: 39 },
                        { title: 'Track 3', artist: 'Artist 3', plays: 35 },
                        { title: 'Track 4', artist: 'Artist 4', plays: 32 },
                        { title: 'Track 5', artist: 'Artist 5', plays: 28 },
                      ].map((track, index) => (
                        <ListItem key={index} divider={index < 4}>
                          <ListItemAvatar>
                            <Avatar sx={{ bgcolor: index < 3 ? 'primary.main' : 'text.secondary' }}>
                              {index + 1}
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText 
                            primary={track.title} 
                            secondary={track.artist} 
                          />
                          <Typography variant="body2">{track.plays} plays</Typography>
                        </ListItem>
                      ))}
                    </List>
                  </Paper>
                </Grid>
              </Grid>
              
              <Box sx={{ mt: 3, textAlign: 'center' }}>
                <Button variant="contained" startIcon={<GetAppIcon />}>
                  Export Listening History
                </Button>
              </Box>
            </Box>
          )}
        </>
      )}
      
      {/* Track options menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose}>Play Next</MenuItem>
        <MenuItem onClick={handleMenuClose}>Add to Queue</MenuItem>
        <MenuItem onClick={handleMenuClose}>Add to Playlist</MenuItem>
        <MenuItem onClick={handleMenuClose}>Go to Artist</MenuItem>
        <MenuItem onClick={handleMenuClose}>Go to Album</MenuItem>
        <Divider />
        <MenuItem onClick={handleMenuClose}>
          <ListItemIcon>
            <FavoriteIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Add to Favorites</ListItemText>
        </MenuItem>
      </Menu>
    </Box>
  );
}

export default UserDashboard;