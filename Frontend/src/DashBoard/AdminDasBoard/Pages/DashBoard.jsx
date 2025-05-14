import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Button,
  IconButton,
  CardActions,
  Chip,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  PeopleOutline,
  LibraryMusicOutlined,
  MusicNoteOutlined,
  PersonOutlined,
  MoreVertOutlined,
  TrendingUpOutlined,
  TrendingDownOutlined,
  ReportProblemOutlined,
  AttachMoneyOutlined,
} from '@mui/icons-material';
import { 
  Chart as ChartJS, 
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  Filler
} from 'chart.js';
import { Line, Bar, Pie, Doughnut } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  Filler
);

function Dashboard({ showNotification }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));
  
  // Statistics data - would come from API
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalArtists: 0,
    totalAlbums: 0,
    totalTracks: 0,
    recentUsers: [],
    pendingReports: [],
    revenueData: [],
    userGrowth: [],
    genreDistribution: [],
    topPlaylists: [],
  });
  
  // Simulate fetching data
  useEffect(() => {
    // This would be an API call in production
    setStats({
      totalUsers: 25489,
      totalArtists: 3245,
      totalAlbums: 12078,
      totalTracks: 152342,
      recentUsers: [
        { id: 1, name: 'James Wilson', email: 'james@example.com', date: '2023-05-13', avatar: null },
        { id: 2, name: 'Sarah Johnson', email: 'sarah@example.com', date: '2023-05-12', avatar: null },
        { id: 3, name: 'Robert Brown', email: 'robert@example.com', date: '2023-05-12', avatar: null },
        { id: 4, name: 'Lisa Anderson', email: 'lisa@example.com', date: '2023-05-11', avatar: null },
      ],
      pendingReports: [
        { id: 1, type: 'Content', title: 'Inappropriate lyrics', status: 'Open', date: '2023-05-14' },
        { id: 2, type: 'User', title: 'Fake artist profile', status: 'In Review', date: '2023-05-13' },
        { id: 3, type: 'Copyright', title: 'Copyright claim on track', status: 'Open', date: '2023-05-12' },
      ],
      revenueData: [
        { month: 'Jan', revenue: 45000 },
        { month: 'Feb', revenue: 52000 },
        { month: 'Mar', revenue: 49000 },
        { month: 'Apr', revenue: 63000 },
        { month: 'May', revenue: 58000 },
        { month: 'Jun', revenue: 70000 },
      ],
      userGrowth: [
        { month: 'Jan', users: 21500 },
        { month: 'Feb', users: 22400 },
        { month: 'Mar', users: 23100 },
        { month: 'Apr', users: 24300 },
        { month: 'May', users: 24900 },
        { month: 'Jun', users: 25500 },
      ],
      genreDistribution: [
        { genre: 'Pop', percentage: 28 },
        { genre: 'Hip-Hop', percentage: 22 },
        { genre: 'Rock', percentage: 18 },
        { genre: 'Electronic', percentage: 14 },
        { genre: 'R&B', percentage: 10 },
        { genre: 'Others', percentage: 8 },
      ],
      topPlaylists: [
        { id: 1, title: "Today's Top Hits", followers: 26543210, tracks: 50 },
        { id: 2, title: "Chill Vibes", followers: 15821430, tracks: 45 },
        { id: 3, title: "Workout Energy", followers: 12453890, tracks: 38 },
        { id: 4, title: "Rock Classics", followers: 9876540, tracks: 42 },
      ],
    });
  }, []);

  // Chart data preparation
  const revenueChartData = {
    labels: stats.revenueData.map(item => item.month),
    datasets: [
      {
        label: 'Monthly Revenue ($)',
        data: stats.revenueData.map(item => item.revenue),
        borderColor: '#1DB954',
        backgroundColor: 'rgba(29, 185, 84, 0.1)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const userGrowthChartData = {
    labels: stats.userGrowth.map(item => item.month),
    datasets: [
      {
        label: 'Users',
        data: stats.userGrowth.map(item => item.users),
        backgroundColor: '#1DB954',
      },
    ],
  };

  const genreChartData = {
    labels: stats.genreDistribution.map(item => item.genre),
    datasets: [
      {
        data: stats.genreDistribution.map(item => item.percentage),
        backgroundColor: [
          '#1DB954',
          '#1ED760',
          '#1aa34a',
          '#2dd76e',
          '#4edc86',
          '#6ee29e',
        ],
        borderWidth: 0,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: theme.palette.text.secondary,
          padding: 20,
        },
      },
      tooltip: {
        backgroundColor: theme.palette.background.paper,
        titleColor: theme.palette.text.primary,
        bodyColor: theme.palette.text.secondary,
        borderColor: theme.palette.divider,
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
          color: theme.palette.divider,
        },
        ticks: {
          color: theme.palette.text.secondary,
        },
      },
      y: {
        grid: {
          color: theme.palette.divider,
        },
        ticks: {
          color: theme.palette.text.secondary,
        },
      },
    },
  };

  return (
    <Box>
      {/* Welcome header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
          Welcome to Admin Dashboard
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Overview of your music streaming platform's performance and management.
        </Typography>
      </Box>
      
      {/* Stats cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ 
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: 3,
            height: '100%'
          }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar sx={{ bgcolor: 'rgba(29, 185, 84, 0.1)', color: '#1DB954', mr: 2 }}>
                  <PeopleOutline />
                </Avatar>
                <Typography variant="h6" component="div">
                  Total Users
                </Typography>
              </Box>
              <Typography variant="h4" component="div" sx={{ fontWeight: 700, mb: 1 }}>
                {stats.totalUsers.toLocaleString()}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Chip 
                  icon={<TrendingUpOutlined fontSize="small" />} 
                  label="2.5% growth" 
                  size="small"
                  sx={{ 
                    bgcolor: 'rgba(29, 185, 84, 0.1)', 
                    color: '#1DB954',
                    fontWeight: 600,
                    height: 24,
                  }} 
                />
                <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                  from last month
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ 
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: 3,
            height: '100%'
          }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar sx={{ bgcolor: 'rgba(29, 185, 84, 0.1)', color: '#1DB954', mr: 2 }}>
                  <PersonOutlined />
                </Avatar>
                <Typography variant="h6" component="div">
                  Total Artists
                </Typography>
              </Box>
              <Typography variant="h4" component="div" sx={{ fontWeight: 700, mb: 1 }}>
                {stats.totalArtists.toLocaleString()}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Chip 
                  icon={<TrendingUpOutlined fontSize="small" />} 
                  label="3.8% growth" 
                  size="small"
                  sx={{ 
                    bgcolor: 'rgba(29, 185, 84, 0.1)', 
                    color: '#1DB954',
                    fontWeight: 600,
                    height: 24
                  }} 
                />
                <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                  from last month
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ 
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: 3,
            height: '100%'
          }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar sx={{ bgcolor: 'rgba(29, 185, 84, 0.1)', color: '#1DB954', mr: 2 }}>
                  <LibraryMusicOutlined />
                </Avatar>
                <Typography variant="h6" component="div">
                  Total Albums
                </Typography>
              </Box>
              <Typography variant="h4" component="div" sx={{ fontWeight: 700, mb: 1 }}>
                {stats.totalAlbums.toLocaleString()}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Chip 
                  icon={<TrendingUpOutlined fontSize="small" />} 
                  label="5.2% growth" 
                  size="small"
                  sx={{ 
                    bgcolor: 'rgba(29, 185, 84, 0.1)', 
                    color: '#1DB954',
                    fontWeight: 600,
                    height: 24
                  }} 
                />
                <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                  from last month
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ 
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: 3,
            height: '100%'
          }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar sx={{ bgcolor: 'rgba(29, 185, 84, 0.1)', color: '#1DB954', mr: 2 }}>
                  <MusicNoteOutlined />
                </Avatar>
                <Typography variant="h6" component="div">
                  Total Tracks
                </Typography>
              </Box>
              <Typography variant="h4" component="div" sx={{ fontWeight: 700, mb: 1 }}>
                {stats.totalTracks.toLocaleString()}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Chip 
                  icon={<TrendingUpOutlined fontSize="small" />} 
                  label="4.7% growth" 
                  size="small"
                  sx={{ 
                    bgcolor: 'rgba(29, 185, 84, 0.1)', 
                    color: '#1DB954',
                    fontWeight: 600,
                    height: 24
                  }} 
                />
                <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                  from last month
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      
      {/* Charts */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={8}>
          <Card sx={{ 
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: 3,
            height: '100%'
          }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6">Revenue Overview</Typography>
                <IconButton size="small">
                  <MoreVertOutlined fontSize="small" />
                </IconButton>
              </Box>
              <Box sx={{ height: 300 }}>
                <Line data={revenueChartData} options={chartOptions} />
              </Box>
            </CardContent>
            <Divider />
            <CardActions sx={{ justifyContent: 'flex-end', p: 1.5 }}>
              <Button size="small" color="primary">View detailed report</Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ 
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: 3,
            height: '100%'
          }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6">Genre Distribution</Typography>
                <IconButton size="small">
                  <MoreVertOutlined fontSize="small" />
                </IconButton>
              </Box>
              <Box sx={{ height: 300, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Doughnut data={genreChartData} options={{
                  ...chartOptions,
                  cutout: '70%',
                }} />
              </Box>
            </CardContent>
            <Divider />
            <CardActions sx={{ justifyContent: 'flex-end', p: 1.5 }}>
              <Button size="small" color="primary">View all genres</Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
      
      {/* User Growth and Reports */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6}>
          <Card sx={{ 
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: 3,
            height: '100%'
          }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6">User Growth</Typography>
                <IconButton size="small">
                  <MoreVertOutlined fontSize="small" />
                </IconButton>
              </Box>
              <Box sx={{ height: 250 }}>
                <Bar data={userGrowthChartData} options={chartOptions} />
              </Box>
            </CardContent>
            <Divider />
            <CardActions sx={{ justifyContent: 'flex-end', p: 1.5 }}>
              <Button size="small" color="primary">View user analytics</Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card sx={{ 
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: 3,
            height: '100%'
          }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6">Pending Reports</Typography>
                <Chip 
                  label={`${stats.pendingReports.length} reports`} 
                  size="small"
                  color="primary"
                  sx={{ fontWeight: 600 }}
                />
              </Box>
              <List>
                {stats.pendingReports.map(report => (
                  <ListItem
                    key={report.id}
                    sx={{
                      borderRadius: 1,
                      mb: 1,
                      '&:hover': { bgcolor: 'rgba(255,255,255,0.05)' },
                      border: '1px solid rgba(255,255,255,0.1)',
                      px: 2,
                      py: 1,
                    }}
                  >
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: 'rgba(255, 171, 0, 0.1)', color: '#ffab00' }}>
                        <ReportProblemOutlined />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText 
                      primary={report.title}
                      secondary={
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 0.5 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Chip 
                              label={report.type} 
                              size="small"
                              sx={{ 
                                bgcolor: 'rgba(255,255,255,0.1)', 
                                mr: 1,
                                fontSize: '0.7rem',
                                height: 20,
                              }}
                            />
                            <Chip 
                              label={report.status} 
                              size="small"
                              sx={{ 
                                bgcolor: report.status === 'Open' ? 'rgba(255, 86, 48, 0.1)' : 'rgba(66, 153, 225, 0.1)',
                                color: report.status === 'Open' ? '#ff5630' : '#4299e1',
                                fontSize: '0.7rem',
                                height: 20,
                              }}
                            />
                          </Box>
                          <Typography variant="caption" color="text.secondary">
                            {report.date}
                          </Typography>
                        </Box>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
            <Divider />
            <CardActions sx={{ justifyContent: 'flex-end', p: 1.5 }}>
              <Button 
                size="small" 
                color="primary"
                onClick={() => {
                  showNotification('Navigated to full reports view');
                }}
              >
                View all reports
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
      
      {/* Recent users and top playlists */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card sx={{ 
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: 3,
            height: '100%'
          }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>Recent Users</Typography>
              <List>
                {stats.recentUsers.map(user => (
                  <ListItem
                    key={user.id}
                    sx={{
                      borderRadius: 1,
                      mb: 1,
                      '&:hover': { bgcolor: 'rgba(255,255,255,0.05)' },
                      border: '1px solid rgba(255,255,255,0.1)',
                      px: 2,
                      py: 1,
                    }}
                  >
                    <ListItemAvatar>
                      <Avatar src={user.avatar}>
                        {user.name.charAt(0)}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText 
                      primary={user.name}
                      secondary={user.email}
                    />
                    <Typography variant="caption" color="text.secondary">
                      {user.date}
                    </Typography>
                  </ListItem>
                ))}
              </List>
            </CardContent>
            <Divider />
            <CardActions sx={{ justifyContent: 'flex-end', p: 1.5 }}>
              <Button 
                size="small" 
                color="primary"
                onClick={() => {
                  showNotification('Navigated to user management');
                }}
              >
                View all users
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card sx={{ 
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: 3,
            height: '100%'
          }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>Top Playlists</Typography>
              <List>
                {stats.topPlaylists.map(playlist => (
                  <ListItem
                    key={playlist.id}
                    sx={{
                      borderRadius: 1,
                      mb: 1,
                      '&:hover': { bgcolor: 'rgba(255,255,255,0.05)' },
                      border: '1px solid rgba(255,255,255,0.1)',
                      px: 2,
                      py: 1,
                    }}
                  >
                    <ListItemText 
                      primary={playlist.title}
                      secondary={`${playlist.tracks} tracks`}
                    />
                    <Box>
                      <Typography variant="body2" align="right" sx={{ fontWeight: 600 }}>
                        {(playlist.followers / 1000000).toFixed(1)}M
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        followers
                      </Typography>
                    </Box>
                  </ListItem>
                ))}
              </List>
            </CardContent>
            <Divider />
            <CardActions sx={{ justifyContent: 'flex-end', p: 1.5 }}>
              <Button 
                size="small" 
                color="primary"
                onClick={() => {
                  showNotification('Navigated to playlist management');
                }}
              >
                View all playlists
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Dashboard;