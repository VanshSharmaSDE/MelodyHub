import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Stack,
  Divider,
  Button,
  IconButton,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Chip,
  Tooltip,
  CircularProgress,
  ToggleButtonGroup,
  ToggleButton,
  LinearProgress,
  useTheme,
} from '@mui/material';
import { styled } from '@mui/material/styles';

// Icons
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import PersonIcon from '@mui/icons-material/Person';
import DevicesIcon from '@mui/icons-material/Devices';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import TodayIcon from '@mui/icons-material/Today';
import DateRangeIcon from '@mui/icons-material/DateRange';
import GetAppIcon from '@mui/icons-material/GetApp';
import RefreshIcon from '@mui/icons-material/Refresh';
import HeadphonesIcon from '@mui/icons-material/Headphones';
import AlbumIcon from '@mui/icons-material/Album';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import RepeatIcon from '@mui/icons-material/Repeat';
import PublicIcon from '@mui/icons-material/Public';
import WebIcon from '@mui/icons-material/Web';
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import TabletIcon from '@mui/icons-material/Tablet';
import DesktopWindowsIcon from '@mui/icons-material/DesktopWindows';

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
  RadialLinearScale,
  Filler,
} from 'chart.js';
import { Line, Bar, Doughnut, Radar } from 'react-chartjs-2';

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
  ArcElement,
  RadialLinearScale,
  Filler
);

// Styled components
const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  transition: 'transform 0.3s, box-shadow 0.3s',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: `0 10px 20px rgba(0, 0, 0, 0.2)`,
  },
}));

const PercentageIndicator = styled(Box)(({ theme, value }) => ({
  display: 'flex',
  alignItems: 'center',
  color: value >= 0 ? theme.palette.success.main : theme.palette.error.main,
  fontWeight: 600,
}));

function AnalyticsView({ showNotification }) {
  const theme = useTheme();
  // State for controls
  const [timeRange, setTimeRange] = useState('month');
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({
    users: {},
    content: {},
    engagement: {},
    devices: {},
  });
  const [chartView, setChartView] = useState('users');
  
  // Load analytics data
  useEffect(() => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      // Generate mock data
      const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      
      // Users data
      const usersData = {
        totalUsers: 25487,
        newUsers: 845,
        activeUsers: 12543,
        userGrowth: 12.4,
        retention: 87.2,
        demographics: {
          age: [
            { group: '13-17', percentage: 8 },
            { group: '18-24', percentage: 27 },
            { group: '25-34', percentage: 35 },
            { group: '35-44', percentage: 16 },
            { group: '45-54', percentage: 9 },
            { group: '55+', percentage: 5 },
          ],
          gender: [
            { group: 'Male', percentage: 58 },
            { group: 'Female', percentage: 40 },
            { group: 'Other', percentage: 2 },
          ],
        },
        userTrend: {
          daily: Array.from({length: 7}, (_, i) => ({
            day: days[i % 7],
            users: Math.floor(Math.random() * 500) + 10000,
            growth: (Math.random() * 10 - 5).toFixed(1)
          })),
          monthly: Array.from({length: 12}, (_, i) => ({
            month: months[i % 12],
            users: Math.floor(Math.random() * 5000) + 20000,
            growth: (Math.random() * 20 - 5).toFixed(1)
          })),
        },
        subscriptionDistribution: [
          { plan: 'Free', users: 17842 },
          { plan: 'Premium', users: 5249 },
          { plan: 'Family', users: 1872 },
          { plan: 'Student', users: 524 },
        ],
        topCountries: [
          { country: 'United States', users: 8245, change: 5.2 },
          { country: 'United Kingdom', users: 3564, change: 7.8 },
          { country: 'Germany', users: 2921, change: 6.3 },
          { country: 'Canada', users: 2453, change: 4.1 },
          { country: 'France', users: 1982, change: 8.5 },
        ],
      };
      
      // Content data
      const contentData = {
        totalTracks: 2543981,
        totalAlbums: 245765,
        totalArtists: 482354,
        totalPlaylists: 18764,
        newContent: {
          tracks: 5432,
          albums: 387,
          artists: 1243,
          playlists: 574,
        },
        topGenres: [
          { genre: 'Pop', percentage: 27 },
          { genre: 'Hip-Hop', percentage: 21 },
          { genre: 'Rock', percentage: 18 },
          { genre: 'Electronic', percentage: 12 },
          { genre: 'R&B', percentage: 9 },
          { genre: 'Others', percentage: 13 },
        ],
        topTracks: Array.from({length: 5}, (_, i) => ({
          id: i + 1,
          title: `Track ${i + 1}`,
          artist: `Artist ${i + 1}`,
          plays: Math.floor(Math.random() * 1000000) + 500000,
          growth: (Math.random() * 30).toFixed(1)
        })),
        topArtists: Array.from({length: 5}, (_, i) => ({
          id: i + 1,
          name: `Artist ${i + 1}`,
          followers: Math.floor(Math.random() * 2000000) + 1000000,
          growth: (Math.random() * 20).toFixed(1)
        })),
        contentGrowth: {
          tracks: 23.4,
          albums: 18.7,
          artists: 15.2,
          playlists: 27.8,
        }
      };
      
      // Engagement data
      const engagementData = {
        totalPlays: 85437218,
        averagePlayTime: 27.4, // minutes
        completionRate: 73.5, // percentage
        bounceRate: 21.2, // percentage
        engagement: 8.7, // out of 10
        likesPerUser: 14.3,
        playlistsPerUser: 3.7,
        sharesPerUser: 1.2,
        engagementTrend: {
          daily: Array.from({length: 7}, (_, i) => ({
            day: days[i % 7],
            plays: Math.floor(Math.random() * 3000000) + 10000000,
            avgTime: (Math.random() * 10 + 20).toFixed(1)
          })),
          monthly: Array.from({length: 12}, (_, i) => ({
            month: months[i % 12],
            plays: Math.floor(Math.random() * 10000000) + 70000000,
            avgTime: (Math.random() * 10 + 20).toFixed(1)
          })),
        },
        contentInteractions: {
          plays: 67,
          likes: 12,
          playlists: 8,
          shares: 3,
          downloads: 10,
        },
        peakHours: [
          { hour: '6AM', percentage: 2 },
          { hour: '9AM', percentage: 8 },
          { hour: '12PM', percentage: 12 },
          { hour: '3PM', percentage: 15 },
          { hour: '6PM', percentage: 25 },
          { hour: '9PM', percentage: 30 },
          { hour: '12AM', percentage: 8 },
          { hour: '3AM', percentage: 0 },
        ],
      };
      
      // Device data
      const deviceData = {
        deviceDistribution: [
          { device: 'Mobile', percentage: 62 },
          { device: 'Desktop', percentage: 26 },
          { device: 'Tablet', percentage: 8 },
          { device: 'Others', percentage: 4 },
        ],
        operatingSystems: [
          { os: 'iOS', percentage: 43 },
          { os: 'Android', percentage: 38 },
          { os: 'Windows', percentage: 12 },
          { os: 'macOS', percentage: 6 },
          { os: 'Others', percentage: 1 },
        ],
        browsers: [
          { browser: 'Chrome', percentage: 45 },
          { browser: 'Safari', percentage: 30 },
          { browser: 'Firefox', percentage: 10 },
          { browser: 'Edge', percentage: 8 },
          { browser: 'Others', percentage: 7 },
        ],
        networkTypes: [
          { network: 'WiFi', percentage: 73 },
          { network: 'Mobile Data', percentage: 25 },
          { network: 'Others', percentage: 2 },
        ],
      };
      
      setData({
        users: usersData,
        content: contentData,
        engagement: engagementData,
        devices: deviceData,
      });
      
      setIsLoading(false);
    }, 1500);
  }, [timeRange]);
  
  // Handle time range change
  const handleTimeRangeChange = (event) => {
    setTimeRange(event.target.value);
  };
  
  // Handle chart view change
  const handleChartViewChange = (event, newView) => {
    if (newView !== null) {
      setChartView(newView);
    }
  };
  
  // Format large numbers
  const formatNumber = (number) => {
    if (number >= 1000000) {
      return `${(number / 1000000).toFixed(1)}M`;
    } else if (number >= 1000) {
      return `${(number / 1000).toFixed(1)}K`;
    }
    return number.toLocaleString();
  };
  
  // Prepare chart data for users trend
  const usersTrendData = {
    labels: timeRange === 'day' 
      ? data.users?.userTrend?.daily?.map(item => item.day) 
      : data.users?.userTrend?.monthly?.map(item => item.month),
    datasets: [
      {
        label: 'Users',
        data: timeRange === 'day'
          ? data.users?.userTrend?.daily?.map(item => item.users)
          : data.users?.userTrend?.monthly?.map(item => item.users),
        fill: true,
        backgroundColor: 'rgba(29, 185, 84, 0.2)',
        borderColor: '#1DB954',
        tension: 0.3,
      }
    ]
  };
  
  // Prepare chart data for engagement trend
  const engagementTrendData = {
    labels: timeRange === 'day'
      ? data.engagement?.engagementTrend?.daily?.map(item => item.day)
      : data.engagement?.engagementTrend?.monthly?.map(item => item.month),
    datasets: [
      {
        type: 'line',
        label: 'Avg. Play Time (min)',
        data: timeRange === 'day'
          ? data.engagement?.engagementTrend?.daily?.map(item => item.avgTime)
          : data.engagement?.engagementTrend?.monthly?.map(item => item.avgTime),
        borderColor: '#1DB954',
        backgroundColor: 'rgba(29, 185, 84, 0.2)',
        yAxisID: 'y1',
      },
      {
        type: 'bar',
        label: 'Plays',
        data: timeRange === 'day'
          ? data.engagement?.engagementTrend?.daily?.map(item => item.plays)
          : data.engagement?.engagementTrend?.monthly?.map(item => item.plays),
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        yAxisID: 'y',
      }
    ]
  };
  
  // Prepare chart data for subscription distribution
  const subscriptionData = {
    labels: data.users?.subscriptionDistribution?.map(item => item.plan),
    datasets: [
      {
        data: data.users?.subscriptionDistribution?.map(item => item.users),
        backgroundColor: ['#1DB954', '#1E88E5', '#F44336', '#FFC107'],
        borderWidth: 0,
      }
    ]
  };
  
  // Prepare chart data for device distribution
  const deviceDistributionData = {
    labels: data.devices?.deviceDistribution?.map(item => item.device),
    datasets: [
      {
        data: data.devices?.deviceDistribution?.map(item => item.percentage),
        backgroundColor: ['#1DB954', '#1E88E5', '#F44336', '#FFC107'],
        borderWidth: 0,
      }
    ]
  };
  
  // Prepare chart data for content interactions
  const contentInteractionsData = {
    labels: Object.keys(data.engagement?.contentInteractions || {}),
    datasets: [
      {
        label: 'Interactions',
        data: Object.values(data.engagement?.contentInteractions || {}),
        backgroundColor: 'rgba(29, 185, 84, 0.6)',
      }
    ]
  };
  
  // Prepare chart data for peak hours
  const peakHoursData = {
    labels: data.engagement?.peakHours?.map(item => item.hour),
    datasets: [
      {
        label: 'User Activity',
        data: data.engagement?.peakHours?.map(item => item.percentage),
        backgroundColor: 'rgba(29, 185, 84, 0.6)',
        borderColor: '#1DB954',
      }
    ]
  };
  
  // Prepare chart data for genres
  const genresData = {
    labels: data.content?.topGenres?.map(item => item.genre),
    datasets: [
      {
        label: 'Genre Distribution',
        data: data.content?.topGenres?.map(item => item.percentage),
        backgroundColor: [
          'rgba(29, 185, 84, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 99, 132, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)',
        ],
      }
    ]
  };
  
  // Chart options
  const lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: false,
        grid: {
          borderDash: [2, 2],
        },
      },
    },
  };
  
  const mixedChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        type: 'linear',
        display: true,
        position: 'left',
        title: {
          display: true,
          text: 'Plays',
        },
        grid: {
          borderDash: [2, 2],
        },
      },
      y1: {
        type: 'linear',
        display: true,
        position: 'right',
        title: {
          display: true,
          text: 'Minutes',
        },
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  };
  
  const doughnutChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '70%',
    plugins: {
      legend: {
        position: 'right',
        labels: {
          padding: 20,
        },
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const label = context.label || '';
            const value = context.raw;
            const total = context.chart.data.datasets[0].data.reduce((a, b) => a + b, 0);
            const percentage = Math.round((value / total) * 100);
            return `${label}: ${formatNumber(value)} (${percentage}%)`;
          }
        }
      }
    },
  };
  
  const barChartOptions = {
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
        ticks: {
          callback: function(value) {
            return value + '%';
          }
        }
      },
    },
  };
  
  return (
    <Box sx={{ pb: 4 }}>
      {/* Header */}
      <Stack 
        direction={{ xs: 'column', md: 'row' }} 
        justifyContent="space-between" 
        alignItems={{ xs: 'stretch', md: 'center' }}
        spacing={2} 
        sx={{ mb: 3 }}
      >
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700 }}>Analytics</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            Platform performance insights and user behavior analysis
          </Typography>
        </Box>
        
        <Stack direction="row" spacing={2} alignItems="center">
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel>Time Range</InputLabel>
            <Select
              value={timeRange}
              onChange={handleTimeRangeChange}
              label="Time Range"
              disabled={isLoading}
            >
              <MenuItem value="day">Last 7 Days</MenuItem>
              <MenuItem value="month">Last 12 Months</MenuItem>
            </Select>
          </FormControl>
          
          <Button 
            variant="outlined" 
            startIcon={<GetAppIcon />}
            onClick={() => showNotification('Analytics report downloaded', 'success')}
            disabled={isLoading}
          >
            Export
          </Button>
          
          <IconButton 
            onClick={() => {
              setIsLoading(true);
              setTimeout(() => {
                showNotification('Analytics data refreshed', 'success');
                setIsLoading(false);
              }, 1500);
            }}
            disabled={isLoading}
          >
            <RefreshIcon />
          </IconButton>
        </Stack>
      </Stack>
      
      {/* Loading indicator */}
      {isLoading && <LinearProgress sx={{ mb: 3 }} />}
      
      {/* Analytics navigation */}
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'center' }}>
        <ToggleButtonGroup
          value={chartView}
          exclusive
          onChange={handleChartViewChange}
          aria-label="analytics view"
          disabled={isLoading}
        >
          <ToggleButton value="users" aria-label="users">
            <PersonIcon sx={{ mr: 1 }} />
            Users
          </ToggleButton>
          <ToggleButton value="content" aria-label="content">
            <MusicNoteIcon sx={{ mr: 1 }} />
            Content
          </ToggleButton>
          <ToggleButton value="engagement" aria-label="engagement">
            <SignalCellularAltIcon sx={{ mr: 1 }} />
            Engagement
          </ToggleButton>
          <ToggleButton value="devices" aria-label="devices">
            <DevicesIcon sx={{ mr: 1 }} />
            Devices
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>
      
      {/* Users Analytics */}
      {chartView === 'users' && !isLoading && (
        <>
          {/* Metrics Overview */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} sm={6} md={3}>
              <StyledCard>
                <CardContent>
                  <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                    <Box>
                      <Typography variant="overline" color="text.secondary">
                        Total Users
                      </Typography>
                      <Typography variant="h5" sx={{ fontWeight: 700 }}>
                        {formatNumber(data.users.totalUsers)}
                      </Typography>
                    </Box>
                    <Avatar
                      variant="rounded"
                      sx={{
                        bgcolor: 'rgba(29, 185, 84, 0.1)',
                        color: '#1DB954',
                      }}
                    >
                      <PersonIcon />
                    </Avatar>
                  </Stack>
                  
                  <Box sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
                    <PercentageIndicator value={data.users.userGrowth}>
                      {data.users.userGrowth >= 0 ? <TrendingUpIcon fontSize="small" sx={{ mr: 0.5 }} /> : <TrendingDownIcon fontSize="small" sx={{ mr: 0.5 }} />}
                      {data.users.userGrowth}%
                    </PercentageIndicator>
                    <Typography variant="caption" color="text.secondary" sx={{ ml: 1 }}>
                      vs. last {timeRange === 'day' ? 'week' : 'year'}
                    </Typography>
                  </Box>
                </CardContent>
              </StyledCard>
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <StyledCard>
                <CardContent>
                  <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                    <Box>
                      <Typography variant="overline" color="text.secondary">
                        New Users
                      </Typography>
                      <Typography variant="h5" sx={{ fontWeight: 700 }}>
                        {formatNumber(data.users.newUsers)}
                      </Typography>
                    </Box>
                    <Avatar
                      variant="rounded"
                      sx={{
                        bgcolor: 'rgba(25, 118, 210, 0.1)',
                        color: '#1976d2',
                      }}
                    >
                      <PersonIcon />
                    </Avatar>
                  </Stack>
                  
                  <Box sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
                    <Typography variant="caption" color="text.secondary">
                      Last {timeRange === 'day' ? '7 days' : '30 days'}
                    </Typography>
                  </Box>
                </CardContent>
              </StyledCard>
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <StyledCard>
                <CardContent>
                  <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                    <Box>
                      <Typography variant="overline" color="text.secondary">
                        Active Users
                      </Typography>
                      <Typography variant="h5" sx={{ fontWeight: 700 }}>
                        {formatNumber(data.users.activeUsers)}
                      </Typography>
                    </Box>
                    <Avatar
                      variant="rounded"
                      sx={{
                        bgcolor: 'rgba(211, 47, 47, 0.1)',
                        color: '#d32f2f',
                      }}
                    >
                      <PersonIcon />
                    </Avatar>
                  </Stack>
                  
                  <Box sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
                    <Typography variant="caption" color="text.secondary">
                      {Math.round(data.users.activeUsers / data.users.totalUsers * 100)}% of total users
                    </Typography>
                  </Box>
                </CardContent>
              </StyledCard>
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <StyledCard>
                <CardContent>
                  <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                    <Box>
                      <Typography variant="overline" color="text.secondary">
                        Retention Rate
                      </Typography>
                      <Typography variant="h5" sx={{ fontWeight: 700 }}>
                        {data.users.retention}%
                      </Typography>
                    </Box>
                    <Avatar
                      variant="rounded"
                      sx={{
                        bgcolor: 'rgba(76, 175, 80, 0.1)',
                        color: '#4caf50',
                      }}
                    >
                      <RepeatIcon />
                    </Avatar>
                  </Stack>
                  
                  <Box sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
                    <Typography variant="caption" color="text.secondary">
                      30-day rolling average
                    </Typography>
                  </Box>
                </CardContent>
              </StyledCard>
            </Grid>
          </Grid>
          
          <Grid container spacing={3}>
            {/* User Trend Chart */}
            <Grid item xs={12} md={8}>
              <StyledCard>
                <CardContent>
                  <Typography variant="h6" gutterBottom>User Growth Trend</Typography>
                  <Box sx={{ height: 300 }}>
                    <Line data={usersTrendData} options={lineChartOptions} />
                  </Box>
                </CardContent>
              </StyledCard>
            </Grid>
            
            {/* Subscription Distribution */}
            <Grid item xs={12} md={4}>
              <StyledCard>
                <CardContent>
                  <Typography variant="h6" gutterBottom>Subscription Distribution</Typography>
                  <Box sx={{ height: 300, display: 'flex', justifyContent: 'center', position: 'relative' }}>
                    <Doughnut data={subscriptionData} options={doughnutChartOptions} />
                  </Box>
                </CardContent>
              </StyledCard>
            </Grid>
            
            {/* Top Countries */}
            <Grid item xs={12} md={6}>
              <StyledCard>
                <CardContent>
                  <Typography variant="h6" gutterBottom>Top Countries</Typography>
                  <List>
                    {data.users.topCountries.map((country, index) => (
                      <ListItem key={index} divider={index < data.users.topCountries.length - 1}>
                        <ListItemAvatar>
                          <Avatar>
                            <PublicIcon />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={country.country}
                          secondary={`${formatNumber(country.users)} users`}
                        />
                        <PercentageIndicator value={country.change}>
                          {country.change >= 0 ? <TrendingUpIcon fontSize="small" sx={{ mr: 0.5 }} /> : <TrendingDownIcon fontSize="small" sx={{ mr: 0.5 }} />}
                          {country.change}%
                        </PercentageIndicator>
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
              </StyledCard>
            </Grid>
            
            {/* Demographics */}
            <Grid item xs={12} md={6}>
              <StyledCard>
                <CardContent>
                  <Typography variant="h6" gutterBottom>Demographics</Typography>
                  <Typography variant="subtitle2" gutterBottom>Age Distribution</Typography>
                  <Box sx={{ mb: 3 }}>
                    {data.users.demographics.age.map((item) => (
                      <Box key={item.group} sx={{ mb: 1 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                          <Typography variant="body2">{item.group}</Typography>
                          <Typography variant="body2" color="text.secondary">{item.percentage}%</Typography>
                        </Box>
                        <LinearProgress 
                          variant="determinate" 
                          value={item.percentage} 
                          sx={{ 
                            height: 8, 
                            borderRadius: 4,
                            bgcolor: 'rgba(0,0,0,0.1)',
                            '.MuiLinearProgress-bar': {
                              bgcolor: '#1DB954',
                            }
                          }} 
                        />
                      </Box>
                    ))}
                  </Box>
                  
                  <Typography variant="subtitle2" gutterBottom>Gender Distribution</Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
                    {data.users.demographics.gender.map((item) => (
                      <Box key={item.group} sx={{ textAlign: 'center' }}>
                        <Box 
                          sx={{
                            width: 50,
                            height: 50,
                            borderRadius: '50%',
                            border: `3px solid ${item.group === 'Male' ? '#1976d2' : item.group === 'Female' ? '#e91e63' : '#ff9800'}`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            mb: 1,
                            mx: 'auto',
                          }}
                        >
                          <Typography variant="body1" fontWeight={600}>{item.percentage}%</Typography>
                        </Box>
                        <Typography variant="body2">{item.group}</Typography>
                      </Box>
                    ))}
                  </Box>
                </CardContent>
              </StyledCard>
            </Grid>
          </Grid>
        </>
      )}
      
      {/* Content Analytics */}
      {chartView === 'content' && !isLoading && (
        <>
          {/* Content Metrics Overview */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} sm={6} md={3}>
              <StyledCard>
                <CardContent>
                  <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                    <Box>
                      <Typography variant="overline" color="text.secondary">
                        Total Tracks
                      </Typography>
                      <Typography variant="h5" sx={{ fontWeight: 700 }}>
                        {formatNumber(data.content.totalTracks)}
                      </Typography>
                    </Box>
                    <Avatar
                      variant="rounded"
                      sx={{
                        bgcolor: 'rgba(29, 185, 84, 0.1)',
                        color: '#1DB954',
                      }}
                    >
                      <MusicNoteIcon />
                    </Avatar>
                  </Stack>
                  
                  <Box sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
                    <PercentageIndicator value={data.content.contentGrowth.tracks}>
                      <TrendingUpIcon fontSize="small" sx={{ mr: 0.5 }} />
                      {data.content.contentGrowth.tracks}%
                    </PercentageIndicator>
                    <Typography variant="caption" color="text.secondary" sx={{ ml: 1 }}>
                      growth
                    </Typography>
                  </Box>
                </CardContent>
              </StyledCard>
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <StyledCard>
                <CardContent>
                  <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                    <Box>
                      <Typography variant="overline" color="text.secondary">
                        Total Albums
                      </Typography>
                      <Typography variant="h5" sx={{ fontWeight: 700 }}>
                        {formatNumber(data.content.totalAlbums)}
                      </Typography>
                    </Box>
                    <Avatar
                      variant="rounded"
                      sx={{
                        bgcolor: 'rgba(25, 118, 210, 0.1)',
                        color: '#1976d2',
                      }}
                    >
                      <AlbumIcon />
                    </Avatar>
                  </Stack>
                  
                  <Box sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
                    <PercentageIndicator value={data.content.contentGrowth.albums}>
                      <TrendingUpIcon fontSize="small" sx={{ mr: 0.5 }} />
                      {data.content.contentGrowth.albums}%
                    </PercentageIndicator>
                    <Typography variant="caption" color="text.secondary" sx={{ ml: 1 }}>
                      growth
                    </Typography>
                  </Box>
                </CardContent>
              </StyledCard>
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <StyledCard>
                <CardContent>
                  <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                    <Box>
                      <Typography variant="overline" color="text.secondary">
                        Total Artists
                      </Typography>
                      <Typography variant="h5" sx={{ fontWeight: 700 }}>
                        {formatNumber(data.content.totalArtists)}
                      </Typography>
                    </Box>
                    <Avatar
                      variant="rounded"
                      sx={{
                        bgcolor: 'rgba(211, 47, 47, 0.1)',
                        color: '#d32f2f',
                      }}
                    >
                      <PersonIcon />
                    </Avatar>
                  </Stack>
                  
                  <Box sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
                    <PercentageIndicator value={data.content.contentGrowth.artists}>
                      <TrendingUpIcon fontSize="small" sx={{ mr: 0.5 }} />
                      {data.content.contentGrowth.artists}%
                    </PercentageIndicator>
                    <Typography variant="caption" color="text.secondary" sx={{ ml: 1 }}>
                      growth
                    </Typography>
                  </Box>
                </CardContent>
              </StyledCard>
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <StyledCard>
                <CardContent>
                  <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                    <Box>
                      <Typography variant="overline" color="text.secondary">
                        Total Playlists
                      </Typography>
                      <Typography variant="h5" sx={{ fontWeight: 700 }}>
                        {formatNumber(data.content.totalPlaylists)}
                      </Typography>
                    </Box>
                    <Avatar
                      variant="rounded"
                      sx={{
                        bgcolor: 'rgba(76, 175, 80, 0.1)',
                        color: '#4caf50',
                      }}
                    >
                      <QueueMusicIcon />
                    </Avatar>
                  </Stack>
                  
                  <Box sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
                    <PercentageIndicator value={data.content.contentGrowth.playlists}>
                      <TrendingUpIcon fontSize="small" sx={{ mr: 0.5 }} />
                      {data.content.contentGrowth.playlists}%
                    </PercentageIndicator>
                    <Typography variant="caption" color="text.secondary" sx={{ ml: 1 }}>
                      growth
                    </Typography>
                  </Box>
                </CardContent>
              </StyledCard>
            </Grid>
          </Grid>
          
          <Grid container spacing={3}>
            {/* Genre Distribution */}
            <Grid item xs={12} md={6}>
              <StyledCard>
                <CardContent>
                  <Typography variant="h6" gutterBottom>Genre Distribution</Typography>
                  <Box sx={{ height: 300 }}>
                    <Doughnut data={genresData} options={doughnutChartOptions} />
                  </Box>
                </CardContent>
              </StyledCard>
            </Grid>
            
            {/* New Content */}
            <Grid item xs={12} md={6}>
              <StyledCard>
                <CardContent>
                  <Typography variant="h6" gutterBottom>New Content This Month</Typography>
                  <Grid container spacing={2} sx={{ mt: 1 }}>
                    <Grid item xs={6} sm={3}>
                      <Box sx={{ textAlign: 'center' }}>
                        <Avatar
                          sx={{ 
                            width: 60, 
                            height: 60, 
                            bgcolor: '#1DB954', 
                            mx: 'auto',
                            mb: 1,
                          }}
                        >
                          <MusicNoteIcon fontSize="large" />
                        </Avatar>
                        <Typography variant="h6">{formatNumber(data.content.newContent.tracks)}</Typography>
                        <Typography variant="body2" color="text.secondary">Tracks</Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                      <Box sx={{ textAlign: 'center' }}>
                        <Avatar
                          sx={{ 
                            width: 60, 
                            height: 60, 
                            bgcolor: '#1976d2', 
                            mx: 'auto',
                            mb: 1,
                          }}
                        >
                          <AlbumIcon fontSize="large" />
                        </Avatar>
                        <Typography variant="h6">{formatNumber(data.content.newContent.albums)}</Typography>
                        <Typography variant="body2" color="text.secondary">Albums</Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                      <Box sx={{ textAlign: 'center' }}>
                        <Avatar
                          sx={{ 
                            width: 60, 
                            height: 60, 
                            bgcolor: '#d32f2f', 
                            mx: 'auto',
                            mb: 1,
                          }}
                        >
                          <PersonIcon fontSize="large" />
                        </Avatar>
                        <Typography variant="h6">{formatNumber(data.content.newContent.artists)}</Typography>
                        <Typography variant="body2" color="text.secondary">Artists</Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                      <Box sx={{ textAlign: 'center' }}>
                        <Avatar
                          sx={{ 
                            width: 60, 
                            height: 60, 
                            bgcolor: '#4caf50', 
                            mx: 'auto',
                            mb: 1,
                          }}
                        >
                          <QueueMusicIcon fontSize="large" />
                        </Avatar>
                        <Typography variant="h6">{formatNumber(data.content.newContent.playlists)}</Typography>
                        <Typography variant="body2" color="text.secondary">Playlists</Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </CardContent>
              </StyledCard>
            </Grid>
            
            {/* Top Tracks */}
            <Grid item xs={12} md={6}>
              <StyledCard>
                <CardContent>
                  <Typography variant="h6" gutterBottom>Top Tracks</Typography>
                  <List>
                    {data.content.topTracks.map((track, index) => (
                      <ListItem key={index} divider={index < data.content.topTracks.length - 1}>
                        <ListItemAvatar>
                          <Avatar sx={{ bgcolor: '#1DB954' }}>
                            {index + 1}
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={track.title}
                          secondary={track.artist}
                        />
                        <Box sx={{ textAlign: 'right' }}>
                          <Typography variant="body2" fontWeight={600}>
                            {formatNumber(track.plays)} plays
                          </Typography>
                          <PercentageIndicator value={track.growth}>
                            <TrendingUpIcon fontSize="small" sx={{ mr: 0.5 }} />
                            {track.growth}%
                          </PercentageIndicator>
                        </Box>
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
              </StyledCard>
            </Grid>
            
            {/* Top Artists */}
            <Grid item xs={12} md={6}>
              <StyledCard>
                <CardContent>
                  <Typography variant="h6" gutterBottom>Top Artists</Typography>
                  <List>
                    {data.content.topArtists.map((artist, index) => (
                      <ListItem key={index} divider={index < data.content.topArtists.length - 1}>
                        <ListItemAvatar>
                          <Avatar>
                            {artist.name.charAt(0)}
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={artist.name}
                          secondary={`${formatNumber(artist.followers)} followers`}
                        />
                        <PercentageIndicator value={artist.growth}>
                          <TrendingUpIcon fontSize="small" sx={{ mr: 0.5 }} />
                          {artist.growth}%
                        </PercentageIndicator>
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
              </StyledCard>
            </Grid>
          </Grid>
        </>
      )}
      
      {/* Engagement Analytics */}
      {chartView === 'engagement' && !isLoading && (
        <>
          {/* Engagement Metrics Overview */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} sm={6} md={3}>
              <StyledCard>
                <CardContent>
                  <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                    <Box>
                      <Typography variant="overline" color="text.secondary">
                        Total Plays
                      </Typography>
                      <Typography variant="h5" sx={{ fontWeight: 700 }}>
                        {formatNumber(data.engagement.totalPlays)}
                      </Typography>
                    </Box>
                    <Avatar
                      variant="rounded"
                      sx={{
                        bgcolor: 'rgba(29, 185, 84, 0.1)',
                        color: '#1DB954',
                      }}
                    >
                      <HeadphonesIcon />
                    </Avatar>
                  </Stack>
                </CardContent>
              </StyledCard>
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <StyledCard>
                <CardContent>
                  <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                    <Box>
                      <Typography variant="overline" color="text.secondary">
                        Avg. Play Time
                      </Typography>
                      <Typography variant="h5" sx={{ fontWeight: 700 }}>
                        {data.engagement.averagePlayTime} min
                      </Typography>
                    </Box>
                    <Avatar
                      variant="rounded"
                      sx={{
                        bgcolor: 'rgba(25, 118, 210, 0.1)',
                        color: '#1976d2',
                      }}
                    >
                      <AccessTimeIcon />
                    </Avatar>
                  </Stack>
                </CardContent>
              </StyledCard>
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <StyledCard>
                <CardContent>
                  <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                    <Box>
                      <Typography variant="overline" color="text.secondary">
                        Completion Rate
                      </Typography>
                      <Typography variant="h5" sx={{ fontWeight: 700 }}>
                        {data.engagement.completionRate}%
                      </Typography>
                    </Box>
                    <Avatar
                      variant="rounded"
                      sx={{
                        bgcolor: 'rgba(76, 175, 80, 0.1)',
                        color: '#4caf50',
                      }}
                    >
                      <CheckCircleIcon />
                    </Avatar>
                  </Stack>
                </CardContent>
              </StyledCard>
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <StyledCard>
                <CardContent>
                  <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                    <Box>
                      <Typography variant="overline" color="text.secondary">
                        Interactions per User
                      </Typography>
                      <Typography variant="h5" sx={{ fontWeight: 700 }}>
                        {data.engagement.likesPerUser + data.engagement.playlistsPerUser + data.engagement.sharesPerUser}
                      </Typography>
                    </Box>
                    <Avatar
                      variant="rounded"
                      sx={{
                        bgcolor: 'rgba(211, 47, 47, 0.1)',
                        color: '#d32f2f',
                      }}
                    >
                      <ThumbUpIcon />
                    </Avatar>
                  </Stack>
                </CardContent>
              </StyledCard>
            </Grid>
          </Grid>
          
          <Grid container spacing={3}>
            {/* Engagement Trend Chart */}
            <Grid item xs={12}>
              <StyledCard>
                <CardContent>
                  <Typography variant="h6" gutterBottom>Engagement Trend</Typography>
                  <Box sx={{ height: 300 }}>
                    <Bar data={engagementTrendData} options={mixedChartOptions} />
                  </Box>
                </CardContent>
              </StyledCard>
            </Grid>
            
            {/* Content Interactions */}
            <Grid item xs={12} md={6}>
              <StyledCard>
                <CardContent>
                  <Typography variant="h6" gutterBottom>Content Interactions</Typography>
                  <Box sx={{ height: 300 }}>
                    <Bar data={contentInteractionsData} options={barChartOptions} />
                  </Box>
                </CardContent>
              </StyledCard>
            </Grid>
            
            {/* Peak Hours */}
            <Grid item xs={12} md={6}>
              <StyledCard>
                <CardContent>
                  <Typography variant="h6" gutterBottom>Peak Hours</Typography>
                  <Box sx={{ height: 300 }}>
                    <Line 
                      data={peakHoursData} 
                      options={{
                        ...barChartOptions,
                        elements: {
                          line: {
                            tension: 0.4,
                            fill: true,
                          },
                          point: {
                            radius: 4,
                          },
                        },
                      }} 
                    />
                  </Box>
                </CardContent>
              </StyledCard>
            </Grid>
          </Grid>
        </>
      )}
      
      {/* Device Analytics */}
      {chartView === 'devices' && !isLoading && (
        <>
          <Grid container spacing={3}>
            {/* Device Distribution */}
            <Grid item xs={12} md={6}>
              <StyledCard>
                <CardContent>
                  <Typography variant="h6" gutterBottom>Device Distribution</Typography>
                  <Box sx={{ height: 300 }}>
                    <Doughnut data={deviceDistributionData} options={doughnutChartOptions} />
                  </Box>
                </CardContent>
              </StyledCard>
            </Grid>
            
            {/* Operating Systems */}
            <Grid item xs={12} md={6}>
              <StyledCard>
                <CardContent>
                  <Typography variant="h6" gutterBottom>Operating Systems</Typography>
                  <Box sx={{ mt: 3 }}>
                    {data.devices.operatingSystems.map((item) => (
                      <Box key={item.os} sx={{ mb: 2 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                          <Typography variant="body2">{item.os}</Typography>
                          <Typography variant="body2" color="text.secondary">{item.percentage}%</Typography>
                        </Box>
                        <LinearProgress 
                          variant="determinate" 
                          value={item.percentage} 
                          sx={{ 
                            height: 8, 
                            borderRadius: 4,
                            bgcolor: 'rgba(0,0,0,0.1)',
                            '.MuiLinearProgress-bar': {
                              bgcolor: item.os === 'iOS' ? '#999' :
                                      item.os === 'Android' ? '#3ddc84' :
                                      item.os === 'Windows' ? '#0078d7' :
                                      item.os === 'macOS' ? '#999' : '#666',
                            }
                          }} 
                        />
                      </Box>
                    ))}
                  </Box>
                </CardContent>
              </StyledCard>
            </Grid>
            
            {/* Browsers */}
            <Grid item xs={12} md={6}>
              <StyledCard>
                <CardContent>
                  <Typography variant="h6" gutterBottom>Browsers</Typography>
                  <Box sx={{ mt: 3 }}>
                    {data.devices.browsers.map((item) => (
                      <Box key={item.browser} sx={{ mb: 2 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                          <Typography variant="body2">{item.browser}</Typography>
                          <Typography variant="body2" color="text.secondary">{item.percentage}%</Typography>
                        </Box>
                        <LinearProgress 
                          variant="determinate" 
                          value={item.percentage} 
                          sx={{ 
                            height: 8, 
                            borderRadius: 4,
                            bgcolor: 'rgba(0,0,0,0.1)',
                            '.MuiLinearProgress-bar': {
                              bgcolor: item.browser === 'Chrome' ? '#4285f4' :
                                      item.browser === 'Safari' ? '#1DB954' :
                                      item.browser === 'Firefox' ? '#ff9400' :
                                      item.browser === 'Edge' ? '#0078d7' : '#666',
                            }
                          }} 
                        />
                      </Box>
                    ))}
                  </Box>
                </CardContent>
              </StyledCard>
            </Grid>
            
            {/* Network Types */}
            <Grid item xs={12} md={6}>
              <StyledCard>
                <CardContent>
                  <Typography variant="h6" gutterBottom>Network Types</Typography>
                  <Grid container spacing={2} sx={{ mt: 2 }}>
                    {data.devices.networkTypes.map((item) => (
                      <Grid item xs={4} key={item.network}>
                        <Box sx={{ textAlign: 'center' }}>
                          <Box 
                            sx={{
                              width: 80,
                              height: 80,
                              borderRadius: '50%',
                              border: `8px solid ${item.network === 'WiFi' ? '#1DB954' : item.network === 'Mobile Data' ? '#1976d2' : '#999'}`,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              mb: 1,
                              mx: 'auto',
                            }}
                          >
                            <Typography variant="h6" fontWeight={600}>{item.percentage}%</Typography>
                          </Box>
                          <Typography variant="body1">{item.network}</Typography>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                  
                  <Box sx={{ mt: 3, textAlign: 'center' }}>
                    <Typography variant="body2" color="text.secondary">
                      Network performance affects user experience.
                      <br/>
                      WiFi users have 2.3x longer session durations than mobile data users.
                    </Typography>
                  </Box>
                </CardContent>
              </StyledCard>
            </Grid>
            
            {/* Device Icons */}
            <Grid item xs={12}>
              <StyledCard>
                <CardContent>
                  <Typography variant="h6" gutterBottom>Device Usage</Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-around', mt: 3, mb: 2 }}>
                    <Box sx={{ textAlign: 'center' }}>
                      <SmartphoneIcon sx={{ fontSize: 60, color: '#1DB954' }} />
                      <Typography variant="body1" sx={{ mt: 1 }}>{data.devices.deviceDistribution[0].percentage}%</Typography>
                      <Typography variant="body2" color="text.secondary">Mobile</Typography>
                    </Box>
                    
                    <Box sx={{ textAlign: 'center' }}>
                      <DesktopWindowsIcon sx={{ fontSize: 60, color: '#1976d2' }} />
                      <Typography variant="body1" sx={{ mt: 1 }}>{data.devices.deviceDistribution[1].percentage}%</Typography>
                      <Typography variant="body2" color="text.secondary">Desktop</Typography>
                    </Box>
                    
                    <Box sx={{ textAlign: 'center' }}>
                      <TabletIcon sx={{ fontSize: 60, color: '#ff9800' }} />
                      <Typography variant="body1" sx={{ mt: 1 }}>{data.devices.deviceDistribution[2].percentage}%</Typography>
                      <Typography variant="body2" color="text.secondary">Tablet</Typography>
                    </Box>
                    
                    <Box sx={{ textAlign: 'center' }}>
                      <DevicesIcon sx={{ fontSize: 60, color: '#9e9e9e' }} />
                      <Typography variant="body1" sx={{ mt: 1 }}>{data.devices.deviceDistribution[3].percentage}%</Typography>
                      <Typography variant="body2" color="text.secondary">Others</Typography>
                    </Box>
                  </Box>
                  
                  <Divider sx={{ my: 2 }} />
                  
                  <Box sx={{ textAlign: 'center', mt: 2 }}>
                    <Button
                      variant="outlined"
                      onClick={() => showNotification('Detailed device report generated', 'success')}
                      startIcon={<GetAppIcon />}
                    >
                      Download Device Report
                    </Button>
                  </Box>
                </CardContent>
              </StyledCard>
            </Grid>
          </Grid>
        </>
      )}
      
      {/* Empty state */}
      {isLoading && (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <CircularProgress size={60} />
          <Typography variant="h6" sx={{ mt: 2 }}>
            Loading analytics data...
          </Typography>
        </Box>
      )}
    </Box>
  );
}

export default AnalyticsView;