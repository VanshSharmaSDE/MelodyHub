import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Tabs,
  Tab,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  FormControlLabel,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  CircularProgress,
  AppBar,
  Toolbar,
  Divider,
  Card,
  CardContent,
  CardMedia,
  Avatar,
  Chip,
  Tooltip,
  Stack,
  useTheme,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  ListItemSecondaryAction,
  Checkbox
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  MusicNote as MusicIcon,
  Person as PersonIcon,
  Dashboard as DashboardIcon,
  Logout as LogoutIcon,
  PhotoCamera as CameraIcon,
  AudioFile as AudioFileIcon,
  Info as InfoIcon,
  QueueMusic as PlaylistIcon,
  AddCircle as AddCircleIcon,
  RemoveCircle as RemoveCircleIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

function AdminDashboard() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  const [users, setUsers] = useState([]);
  const [songs, setSongs] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [stats, setStats] = useState(null);
  const [openSongDialog, setOpenSongDialog] = useState(false);
  const [openPlaylistDialog, setOpenPlaylistDialog] = useState(false);
  const [openSongSelectionDialog, setOpenSongSelectionDialog] = useState(false);
  const [selectedSong, setSelectedSong] = useState(null);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [songForm, setSongForm] = useState({
    title: '',
    artist: '',
    album: '',
    genre: 'pop',
    releaseYear: new Date().getFullYear(),
    duration: 0,
    coverImage: null,
    audioFile: null
  });

  const [playlistForm, setPlaylistForm] = useState({
    name: '',
    description: '',
    coverImage: null,
    isDefault: true,
    isPublic: true,
    songs: []
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    setError('');

    try {
      // Get stats
      const statsRes = await api.get('/admin/stats');
      setStats(statsRes.data.data);

      // Get users based on active tab
      if (activeTab === 1) {
        const usersRes = await api.get('/admin/users');
        setUsers(usersRes.data.data);
      }

      // Get songs based on active tab
      if (activeTab === 2) {
        const songsRes = await api.get('/admin/songs');
        setSongs(songsRes.data.data);
      }

      // Get playlists based on active tab
      if (activeTab === 3) {
        const playlistsRes = await api.get('/admin/playlists');
        setPlaylists(playlistsRes.data.data);
      }
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
      setError(err.response?.data?.message || 'Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);

    // Fetch data based on the selected tab
    if (newValue === 1 && users.length === 0) {
      fetchUsers();
    } else if (newValue === 2 && songs.length === 0) {
      fetchSongs();
    } else if (newValue === 3 && playlists.length === 0) {
      fetchPlaylists();
    }
  };

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await api.get('/admin/users');
      setUsers(res.data.data);
    } catch (err) {
      console.error('Error fetching users:', err);
      setError(err.response?.data?.message || 'Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  const fetchSongs = async () => {
    setLoading(true);
    try {
      const res = await api.get('/admin/songs');
      setSongs(res.data.data);
    } catch (err) {
      console.error('Error fetching songs:', err);
      setError(err.response?.data?.message || 'Failed to load songs');
    } finally {
      setLoading(false);
    }
  };

  const fetchPlaylists = async () => {
    setLoading(true);
    try {
      const res = await api.get('/admin/playlists');
      setPlaylists(res.data.data);
    } catch (err) {
      console.error('Error fetching playlists:', err);
      setError(err.response?.data?.message || 'Failed to load playlists');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user?')) {
      return;
    }

    try {
      await api.delete(`/admin/users/${userId}`);
      // Remove the deleted user from the state
      setUsers(users.filter(user => user._id !== userId));
    } catch (err) {
      console.error('Error deleting user:', err);
      setError(err.response?.data?.message || 'Failed to delete user');
    }
  };

  const handleAddSong = () => {
    setSelectedSong(null);
    setSongForm({
      title: '',
      artist: '',
      album: '',
      genre: 'pop',
      releaseYear: new Date().getFullYear(),
      duration: 0,
      coverImage: null,
      audioFile: null
    });
    setOpenSongDialog(true);
  };

  const handleEditSong = (song) => {
    setSelectedSong(song);
    setSongForm({
      title: song.title,
      artist: song.artist,
      album: song.album || '',
      genre: song.genre,
      releaseYear: song.releaseYear,
      duration: song.duration,
      coverImage: null,
      audioFile: null
    });
    setOpenSongDialog(true);
  };

  const handleDeleteSong = async (songId) => {
    if (!window.confirm('Are you sure you want to delete this song?')) {
      return;
    }

    try {
      await api.delete(`/admin/songs/${songId}`);
      // Remove the deleted song from the state
      setSongs(songs.filter(song => song._id !== songId));
    } catch (err) {
      console.error('Error deleting song:', err);
      setError(err.response?.data?.message || 'Failed to delete song');
    }
  };

  const handleSongFormChange = (e) => {
    const { name, value, files } = e.target;

    if (name === 'coverImage' || name === 'audioFile') {
      setSongForm(prev => ({
        ...prev,
        [name]: files[0]
      }));
    } else {
      setSongForm(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmitSong = async (e) => {
    e.preventDefault();

    // Create FormData object to send files
    const formData = new FormData();
    Object.keys(songForm).forEach(key => {
      if (songForm[key] !== null) {
        formData.append(key, songForm[key]);
      }
    });

    try {
      if (selectedSong) {
        // Update existing song
        await api.put(`/admin/songs/${selectedSong._id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        // Refresh songs list
        fetchSongs();
      } else {
        // Upload new song
        await api.post('/admin/songs', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        // Refresh songs list
        fetchSongs();
      }

      // Close dialog
      setOpenSongDialog(false);
    } catch (err) {
      console.error('Error submitting song:', err);
      setError(err.response?.data?.message || 'Failed to save song');
    }
  };

  // ===== PLAYLIST MANAGEMENT FUNCTIONS =====

  const handleAddPlaylist = () => {
    setSelectedPlaylist(null);
    setPlaylistForm({
      name: '',
      description: '',
      coverImage: null,
      isDefault: true,
      isPublic: true,
      songs: []
    });
    setOpenPlaylistDialog(true);
  };

  const handleEditPlaylist = (playlist) => {
    setSelectedPlaylist(playlist);
    setPlaylistForm({
      name: playlist.name,
      description: playlist.description || '',
      coverImage: null,
      isDefault: playlist.isDefault,
      isPublic: playlist.isPublic,
      songs: playlist.songs.map(song => song._id || song) // Handle both populated and referenced songs
    });
    setOpenPlaylistDialog(true);
  };

  const handleDeletePlaylist = async (playlistId) => {
    if (!window.confirm('Are you sure you want to delete this playlist?')) {
      return;
    }

    try {
      await api.delete(`/admin/playlists/${playlistId}`);
      // Remove the deleted playlist from the state
      setPlaylists(playlists.filter(playlist => playlist._id !== playlistId));
    } catch (err) {
      console.error('Error deleting playlist:', err);
      setError(err.response?.data?.message || 'Failed to delete playlist');
    }
  };

  const handlePlaylistFormChange = (e) => {
    const { name, value, files, type, checked } = e.target;

    if (name === 'coverImage') {
      setPlaylistForm(prev => ({
        ...prev,
        [name]: files[0]
      }));
    } else if (type === 'checkbox') {
      setPlaylistForm(prev => ({
        ...prev,
        [name]: checked
      }));
    } else {
      setPlaylistForm(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmitPlaylist = async (e) => {
    e.preventDefault();

    // Create FormData object to send files
    const formData = new FormData();
    Object.keys(playlistForm).forEach(key => {
      if (key === 'songs') {
        // Skip songs array - will be added separately after playlist creation
        return;
      }

      if (playlistForm[key] !== null) {
        formData.append(key, playlistForm[key]);
      }
    });

    try {
      let playlistId;

      if (selectedPlaylist) {
        // Update existing playlist
        const res = await api.put(`/admin/playlists/${selectedPlaylist._id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        playlistId = selectedPlaylist._id;
      } else {
        // Create new playlist
        const res = await api.post('/admin/playlists', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        playlistId = res.data.data._id;
      }

      // Add songs to playlist if this is a new playlist or songs have changed
      if (playlistForm.songs.length > 0 && !selectedPlaylist) {
        for (const songId of playlistForm.songs) {
          await api.put(`/admin/playlists/${playlistId}/songs/${songId}`);
        }
      }

      // Refresh playlists list
      fetchPlaylists();

      // Close dialog
      setOpenPlaylistDialog(false);
    } catch (err) {
      console.error('Error submitting playlist:', err);
      setError(err.response?.data?.message || 'Failed to save playlist');
    }
  };

  const handleOpenSongSelection = () => {
    setOpenSongSelectionDialog(true);
  };

  const handleSongSelectionChange = (songId) => {
    setPlaylistForm(prev => {
      const songIndex = prev.songs.indexOf(songId);

      if (songIndex === -1) {
        // Add song
        return {
          ...prev,
          songs: [...prev.songs, songId]
        };
      } else {
        // Remove song
        return {
          ...prev,
          songs: prev.songs.filter(id => id !== songId)
        };
      }
    });
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '#121212',
      minHeight: '100vh'
    }}>
      <AppBar position="static" sx={{ backgroundColor: '#1a1a1a', boxShadow: 1 }}>
        <Toolbar>
          <MusicIcon sx={{ mr: 2, color: '#1DB954' }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
            MelodyHub Admin
          </Typography>
          <Button
            color="inherit"
            startIcon={<LogoutIcon />}
            onClick={handleLogout}
            sx={{
              borderRadius: 2,
              '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' }
            }}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 4, mb: 4, flexGrow: 1 }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" color="primary" fontWeight="bold" sx={{ mb: 2 }}>
            Dashboard Overview
          </Typography>

          <Paper
            elevation={3}
            sx={{
              backgroundColor: '#1e1e1e',
              color: '#fff',
              borderRadius: 2,
              overflow: 'hidden'
            }}
          >
            <Tabs
              value={activeTab}
              onChange={handleTabChange}
              variant="scrollable"
              scrollButtons="auto"
              sx={{
                '& .MuiTabs-indicator': {
                  backgroundColor: '#1DB954',
                  height: 3
                },
                '& .Mui-selected': {
                  color: '#1DB954 !important',
                },
                '& .MuiTab-root': {
                  fontSize: '1rem',
                  py: 2
                }
              }}
            >
              <Tab icon={<DashboardIcon />} label="Dashboard" iconPosition="start" sx={{ color: '#fff' }} />
              <Tab icon={<PersonIcon />} label="Users" iconPosition="start" sx={{ color: '#fff' }} />
              <Tab icon={<MusicIcon />} label="Songs" iconPosition="start" sx={{ color: '#fff' }} />
              <Tab icon={<PlaylistIcon />} label="Playlists" iconPosition="start" sx={{ color: '#fff' }} />
            </Tabs>
          </Paper>
        </Box>

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
            <CircularProgress color="primary" size={60} />
          </Box>
        ) : error ? (
          <Paper sx={{ p: 3, backgroundColor: '#2a2a2a', color: '#ff6b6b', borderRadius: 2 }}>
            <Typography>{error}</Typography>
          </Paper>
        ) : (
          <>
            {/* Dashboard Tab */}
            {activeTab === 0 && stats && (
              <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                  <Card sx={{ backgroundColor: '#1e1e1e', color: '#fff', height: '100%', borderRadius: 2 }}>
                    <CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Avatar sx={{ bgcolor: 'rgba(29, 185, 84, 0.2)', mr: 2 }}>
                          <PersonIcon sx={{ color: '#1DB954' }} />
                        </Avatar>
                        <Typography variant="h6" sx={{ color: '#1DB954' }}>
                          User Statistics
                        </Typography>
                      </Box>
                      <Typography variant="h3" fontWeight="bold">
                        {stats.totalUsers}
                      </Typography>
                      <Typography variant="subtitle1" sx={{ color: '#b3b3b3', mt: 1 }}>
                        Total Registered Users
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Card sx={{ backgroundColor: '#1e1e1e', color: '#fff', height: '100%', borderRadius: 2 }}>
                    <CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Avatar sx={{ bgcolor: 'rgba(29, 185, 84, 0.2)', mr: 2 }}>
                          <MusicIcon sx={{ color: '#1DB954' }} />
                        </Avatar>
                        <Typography variant="h6" sx={{ color: '#1DB954' }}>
                          Music Statistics
                        </Typography>
                      </Box>
                      <Typography variant="h3" fontWeight="bold">
                        {stats.totalSongs}
                      </Typography>
                      <Typography variant="subtitle1" sx={{ color: '#b3b3b3', mt: 1 }}>
                        Total Available Songs
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid item xs={12}>
                  <Card sx={{ backgroundColor: '#1e1e1e', color: '#fff', borderRadius: 2 }}>
                    <CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                        <Avatar sx={{ bgcolor: 'rgba(29, 185, 84, 0.2)', mr: 2 }}>
                          <MusicIcon sx={{ color: '#1DB954' }} />
                        </Avatar>
                        <Typography variant="h6" sx={{ color: '#1DB954' }}>
                          Songs by Genre
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                        {stats.songsByGenre.map((genre) => (
                          <Chip
                            key={genre._id}
                            label={`${genre._id.charAt(0).toUpperCase() + genre._id.slice(1)}: ${genre.count}`}
                            sx={{
                              bgcolor: 'rgba(29, 185, 84, 0.1)',
                              color: '#fff',
                              fontWeight: 'medium',
                              fontSize: '0.9rem',
                              py: 2.5
                            }}
                          />
                        ))}
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            )}

            {/* Users Tab */}
            {activeTab === 1 && (
              <Card sx={{ backgroundColor: '#1e1e1e', color: '#fff', borderRadius: 2 }}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar sx={{ bgcolor: 'rgba(29, 185, 84, 0.2)', mr: 2 }}>
                        <PersonIcon sx={{ color: '#1DB954' }} />
                      </Avatar>
                      <Typography variant="h6" sx={{ color: '#1DB954' }}>
                        Manage Users
                      </Typography>
                    </Box>
                  </Box>

                  <TableContainer sx={{ borderRadius: 1, overflow: 'hidden' }}>
                    <Table>
                      <TableHead sx={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}>
                        <TableRow>
                          <TableCell sx={{ color: '#b3b3b3', borderBottom: '1px solid #333', fontWeight: 'bold' }}>Name</TableCell>
                          <TableCell sx={{ color: '#b3b3b3', borderBottom: '1px solid #333', fontWeight: 'bold' }}>Email</TableCell>
                          <TableCell sx={{ color: '#b3b3b3', borderBottom: '1px solid #333', fontWeight: 'bold' }}>Role</TableCell>
                          <TableCell sx={{ color: '#b3b3b3', borderBottom: '1px solid #333', fontWeight: 'bold' }}>Actions</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {users.map((user) => (
                          <TableRow key={user._id} hover sx={{ '&:hover': { backgroundColor: 'rgba(255,255,255,0.03)' } }}>
                            <TableCell sx={{ color: '#fff', borderBottom: '1px solid #333' }}>{user.name}</TableCell>
                            <TableCell sx={{ color: '#fff', borderBottom: '1px solid #333' }}>{user.email}</TableCell>
                            <TableCell sx={{ color: '#fff', borderBottom: '1px solid #333' }}>
                              <Chip
                                label={user.role}
                                size="small"
                                sx={{
                                  backgroundColor: user.role === 'admin' ? 'rgba(29, 185, 84, 0.2)' : 'rgba(64, 115, 255, 0.2)',
                                  color: user.role === 'admin' ? '#1DB954' : '#4073ff',
                                  fontWeight: 'medium'
                                }}
                              />
                            </TableCell>
                            <TableCell sx={{ color: '#fff', borderBottom: '1px solid #333' }}>
                              <Tooltip title={user.role === 'admin' ? "Can't delete admin users" : "Delete user"}>
                                <span>
                                  <IconButton
                                    color="error"
                                    onClick={() => handleDeleteUser(user._id)}
                                    disabled={user.role === 'admin'}
                                    size="small"
                                  >
                                    <DeleteIcon />
                                  </IconButton>
                                </span>
                              </Tooltip>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </CardContent>
              </Card>
            )}

            {/* Songs Tab */}
            {activeTab === 2 && (
              <Card sx={{ backgroundColor: '#1e1e1e', color: '#fff', borderRadius: 2 }}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar sx={{ bgcolor: 'rgba(29, 185, 84, 0.2)', mr: 2 }}>
                        <MusicIcon sx={{ color: '#1DB954' }} />
                      </Avatar>
                      <Typography variant="h6" sx={{ color: '#1DB954' }}>
                        Manage Songs
                      </Typography>
                    </Box>
                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={<AddIcon />}
                      onClick={handleAddSong}
                      sx={{ borderRadius: 2, px: 3, py: 1 }}
                    >
                      Add Song
                    </Button>
                  </Box>

                  <TableContainer sx={{ borderRadius: 1, overflow: 'hidden' }}>
                    <Table>
                      <TableHead sx={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}>
                        <TableRow>
                          <TableCell sx={{ color: '#b3b3b3', borderBottom: '1px solid #333', fontWeight: 'bold' }}>Cover</TableCell>
                          <TableCell sx={{ color: '#b3b3b3', borderBottom: '1px solid #333', fontWeight: 'bold' }}>Title</TableCell>
                          <TableCell sx={{ color: '#b3b3b3', borderBottom: '1px solid #333', fontWeight: 'bold' }}>Artist</TableCell>
                          <TableCell sx={{ color: '#b3b3b3', borderBottom: '1px solid #333', fontWeight: 'bold' }}>Genre</TableCell>
                          <TableCell sx={{ color: '#b3b3b3', borderBottom: '1px solid #333', fontWeight: 'bold' }}>Duration</TableCell>
                          <TableCell sx={{ color: '#b3b3b3', borderBottom: '1px solid #333', fontWeight: 'bold' }}>Actions</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {songs.map((song) => (
                          <TableRow key={song._id} hover sx={{ '&:hover': { backgroundColor: 'rgba(255,255,255,0.03)' } }}>
                            <TableCell sx={{ color: '#fff', borderBottom: '1px solid #333' }}>
                              <Box
                                component="img"
                                src={song.coverImage}
                                alt={song.title}
                                sx={{
                                  width: 50,
                                  height: 50,
                                  borderRadius: 1,
                                  objectFit: 'cover',
                                  boxShadow: '0 2px 8px rgba(0,0,0,0.3)'
                                }}
                              />
                            </TableCell>
                            <TableCell sx={{ color: '#fff', borderBottom: '1px solid #333', fontWeight: 'medium' }}>{song.title}</TableCell>
                            <TableCell sx={{ color: '#fff', borderBottom: '1px solid #333' }}>{song.artist}</TableCell>
                            <TableCell sx={{ color: '#fff', borderBottom: '1px solid #333' }}>
                              <Chip
                                label={song.genre}
                                size="small"
                                sx={{
                                  backgroundColor: 'rgba(29, 185, 84, 0.1)',
                                  color: '#1DB954'
                                }}
                              />
                            </TableCell>
                            <TableCell sx={{ color: '#fff', borderBottom: '1px solid #333' }}>
                              {formatDuration(song.duration)}
                            </TableCell>
                            <TableCell sx={{ color: '#fff', borderBottom: '1px solid #333' }}>
                              <Stack direction="row" spacing={1}>
                                <Tooltip title="Edit song">
                                  <IconButton
                                    onClick={() => handleEditSong(song)}
                                    size="small"
                                    sx={{
                                      color: '#1DB954',
                                      '&:hover': { backgroundColor: 'rgba(29, 185, 84, 0.1)' }
                                    }}
                                  >
                                    <EditIcon />
                                  </IconButton>
                                </Tooltip>
                                <Tooltip title="Delete song">
                                  <IconButton
                                    color="error"
                                    onClick={() => handleDeleteSong(song._id)}
                                    size="small"
                                    sx={{ '&:hover': { backgroundColor: 'rgba(244, 67, 54, 0.1)' } }}
                                  >
                                    <DeleteIcon />
                                  </IconButton>
                                </Tooltip>
                              </Stack>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </CardContent>
              </Card>
            )}

            {/* Playlists Tab */}
            {activeTab === 3 && (
              <Card sx={{ backgroundColor: '#1e1e1e', color: '#fff', borderRadius: 2 }}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar sx={{ bgcolor: 'rgba(29, 185, 84, 0.2)', mr: 2 }}>
                        <PlaylistIcon sx={{ color: '#1DB954' }} />
                      </Avatar>
                      <Typography variant="h6" sx={{ color: '#1DB954' }}>
                        Manage Playlists
                      </Typography>
                    </Box>
                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={<AddIcon />}
                      onClick={handleAddPlaylist}
                      sx={{ borderRadius: 2, px: 3, py: 1 }}
                    >
                      Create Playlist
                    </Button>
                  </Box>

                  {playlists.length === 0 ? (
                    <Box sx={{ textAlign: 'center', p: 5, bgcolor: 'rgba(0, 0, 0, 0.2)', borderRadius: 2 }}>
                      <PlaylistIcon sx={{ fontSize: 60, color: '#666', mb: 2 }} />
                      <Typography variant="h6" sx={{ mb: 2, color: '#b3b3b3' }}>
                        No playlists created yet
                      </Typography>
                      <Button
                        variant="contained"
                        color="primary"
                        startIcon={<AddIcon />}
                        onClick={handleAddPlaylist}
                        sx={{ borderRadius: 2, px: 3, py: 1 }}
                      >
                        Create First Playlist
                      </Button>
                    </Box>
                  ) : (
                    <Grid container spacing={3}>
                      {playlists.map((playlist) => (
                        <Grid item xs={12} sm={6} md={4} key={playlist._id}>
                          <Card sx={{
                            bgcolor: '#252525',
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            transition: 'transform 0.2s ease',
                            '&:hover': {
                              transform: 'translateY(-4px)',
                              boxShadow: '0 8px 16px rgba(0,0,0,0.3)'
                            }
                          }}>
                            <CardMedia
                              component="img"
                              height={180}
                              image={playlist.coverImage || '/default-playlist.jpg'}
                              alt={playlist.name}
                              sx={{ objectFit: 'cover' }}
                            />

                            <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                                <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                                  {playlist.name}
                                </Typography>
                                <Box>
                                  {playlist.isDefault && (
                                    <Chip
                                      label="Default"
                                      size="small"
                                      sx={{
                                        bgcolor: 'rgba(29, 185, 84, 0.2)',
                                        color: '#1DB954',
                                        fontWeight: 'medium',
                                        mr: 0.5
                                      }}
                                    />
                                  )}
                                  {!playlist.isPublic && (
                                    <Chip
                                      label="Private"
                                      size="small"
                                      sx={{
                                        bgcolor: 'rgba(244, 67, 54, 0.2)',
                                        color: '#F44336',
                                        fontWeight: 'medium'
                                      }}
                                    />
                                  )}
                                </Box>
                              </Box>

                              <Typography variant="body2" color="text.secondary" sx={{
                                mb: 2,
                                display: '-webkit-box',
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: 'vertical',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                minHeight: '40px'
                              }}>
                                {playlist.description || 'No description'}
                              </Typography>

                              <Box sx={{ mt: 'auto' }}>
                                <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
                                  {playlist.songs?.length || 0} songs
                                </Typography>

                                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                  <Button
                                    size="small"
                                    startIcon={<EditIcon />}
                                    onClick={() => handleEditPlaylist(playlist)}
                                    sx={{
                                      color: '#1DB954',
                                      '&:hover': { backgroundColor: 'rgba(29, 185, 84, 0.1)' }
                                    }}
                                  >
                                    Edit
                                  </Button>
                                  <Button
                                    size="small"
                                    startIcon={<DeleteIcon />}
                                    onClick={() => handleDeletePlaylist(playlist._id)}
                                    sx={{
                                      color: '#ff5252',
                                      '&:hover': { backgroundColor: 'rgba(244, 67, 54, 0.1)' }
                                    }}
                                  >
                                    Delete
                                  </Button>
                                </Box>
                              </Box>
                            </CardContent>
                          </Card>
                        </Grid>
                      ))}
                    </Grid>
                  )}
                </CardContent>
              </Card>
            )}
          </>
        )}
      </Container>

      {/* Improved Song Dialog */}
      <Dialog
        open={openSongDialog}
        onClose={() => setOpenSongDialog(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            backgroundColor: '#1e1e1e',
            color: '#fff',
            borderRadius: 2,
            boxShadow: '0 8px 32px rgba(0,0,0,0.5)'
          }
        }}
      >
        <DialogTitle sx={{
          bgcolor: 'rgba(29, 185, 84, 0.1)',
          color: '#1DB954',
          fontSize: '1.5rem',
          pb: 2,
          display: 'flex',
          alignItems: 'center',
        }}>
          <MusicIcon sx={{ mr: 1 }} />
          {selectedSong ? 'Edit Song' : 'Add New Song'}
        </DialogTitle>

        <DialogContent sx={{ py: 3 }}>
          <Grid container spacing={3}>
            {/* Left column - Cover Image and Audio File */}
            <Grid item xs={12} md={4}>
              <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <Box
                  sx={{
                    border: '2px dashed #333',
                    borderRadius: 2,
                    height: 220,
                    mb: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    bgcolor: 'rgba(255,255,255,0.03)',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                >
                  {songForm.coverImage ? (
                    <Box
                      component="img"
                      src={songForm.coverImage instanceof File ? URL.createObjectURL(songForm.coverImage) : songForm.coverImage}
                      alt="Cover Preview"
                      sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  ) : (
                    <>
                      <CameraIcon sx={{ fontSize: 40, color: '#666', mb: 1 }} />
                      <Typography variant="body2" color="#666" align="center">
                        Cover Image
                      </Typography>
                    </>
                  )}

                  <Button
                    variant="contained"
                    component="label"
                    sx={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      bgcolor: 'rgba(0,0,0,0.7)',
                      borderRadius: 0,
                      '&:hover': {
                        bgcolor: 'rgba(29, 185, 84, 0.7)',
                      }
                    }}
                  >
                    {songForm.coverImage ? 'Change Image' : 'Upload Cover'}
                    <input
                      type="file"
                      accept="image/*"
                      name="coverImage"
                      onChange={handleSongFormChange}
                      hidden
                    />
                  </Button>
                </Box>

                <Box
                  sx={{
                    border: '2px dashed #333',
                    borderRadius: 2,
                    p: 2,
                    mt: 'auto',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    bgcolor: 'rgba(255,255,255,0.03)',
                  }}
                >
                  <AudioFileIcon sx={{ fontSize: 30, color: songForm.audioFile ? '#1DB954' : '#666', mb: 1 }} />
                  <Typography variant="body2" color={songForm.audioFile ? '#1DB954' : '#666'} align="center" gutterBottom>
                    {songForm.audioFile ? songForm.audioFile.name : 'No audio file selected'}
                  </Typography>

                  <Button
                    variant="outlined"
                    component="label"
                    startIcon={<AudioFileIcon />}
                    fullWidth
                    sx={{
                      mt: 1,
                      borderColor: songForm.audioFile ? '#1DB954' : '#333',
                      color: songForm.audioFile ? '#1DB954' : '#fff',
                      '&:hover': {
                        borderColor: '#1DB954',
                        bgcolor: 'rgba(29, 185, 84, 0.1)',
                      }
                    }}
                  >
                    {songForm.audioFile ? 'Change Audio' : 'Upload Audio File'}
                    <input
                      type="file"
                      accept="audio/*"
                      name="audioFile"
                      onChange={handleSongFormChange}
                      hidden
                    />
                  </Button>
                </Box>
              </Box>
            </Grid>

            {/* Right column - Song Details */}
            <Grid item xs={12} md={8}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    label="Title"
                    name="title"
                    value={songForm.title}
                    onChange={handleSongFormChange}
                    variant="outlined"
                    InputLabelProps={{ sx: { color: '#b3b3b3' } }}
                    InputProps={{ sx: { color: '#fff' } }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': { borderColor: '#333' },
                        '&:hover fieldset': { borderColor: '#444' },
                        '&.Mui-focused fieldset': { borderColor: '#1DB954' }
                      }
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    label="Artist"
                    name="artist"
                    value={songForm.artist}
                    onChange={handleSongFormChange}
                    variant="outlined"
                    InputLabelProps={{ sx: { color: '#b3b3b3' } }}
                    InputProps={{ sx: { color: '#fff' } }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': { borderColor: '#333' },
                        '&:hover fieldset': { borderColor: '#444' },
                        '&.Mui-focused fieldset': { borderColor: '#1DB954' }
                      }
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Album (Optional)"
                    name="album"
                    value={songForm.album}
                    onChange={handleSongFormChange}
                    variant="outlined"
                    InputLabelProps={{ sx: { color: '#b3b3b3' } }}
                    InputProps={{ sx: { color: '#fff' } }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': { borderColor: '#333' },
                        '&:hover fieldset': { borderColor: '#444' },
                        '&.Mui-focused fieldset': { borderColor: '#1DB954' }
                      }
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel sx={{ color: '#b3b3b3' }}>Genre</InputLabel>
                    <Select
                      name="genre"
                      value={songForm.genre}
                      onChange={handleSongFormChange}
                      label="Genre"
                      sx={{
                        color: '#fff',
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#333'
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#444'
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#1DB954'
                        }
                      }}
                    >
                      <MenuItem value="pop">Pop</MenuItem>
                      <MenuItem value="rock">Rock</MenuItem>
                      <MenuItem value="hip-hop">Hip-Hop</MenuItem>
                      <MenuItem value="jazz">Jazz</MenuItem>
                      <MenuItem value="classical">Classical</MenuItem>
                      <MenuItem value="electronic">Electronic</MenuItem>
                      <MenuItem value="other">Other</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    label="Release Year"
                    name="releaseYear"
                    value={songForm.releaseYear}
                    onChange={handleSongFormChange}
                    type="number"
                    variant="outlined"
                    InputProps={{
                      inputProps: { min: 1900, max: new Date().getFullYear() },
                      sx: { color: '#fff' }
                    }}
                    InputLabelProps={{ sx: { color: '#b3b3b3' } }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': { borderColor: '#333' },
                        '&:hover fieldset': { borderColor: '#444' },
                        '&.Mui-focused fieldset': { borderColor: '#1DB954' }
                      }
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    label="Duration (seconds)"
                    name="duration"
                    value={songForm.duration}
                    onChange={handleSongFormChange}
                    type="number"
                    variant="outlined"
                    InputProps={{
                      inputProps: { min: 1 },
                      sx: { color: '#fff' }
                    }}
                    InputLabelProps={{ sx: { color: '#b3b3b3' } }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': { borderColor: '#333' },
                        '&:hover fieldset': { borderColor: '#444' },
                        '&.Mui-focused fieldset': { borderColor: '#1DB954' }
                      }
                    }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    bgcolor: 'rgba(255,255,255,0.03)',
                    p: 2,
                    borderRadius: 1,
                    mt: 1
                  }}>
                    <InfoIcon sx={{ color: '#b3b3b3', mr: 1.5 }} />
                    <Typography variant="body2" color="#b3b3b3">
                      {selectedSong
                        ? "If you don't upload new files, the existing ones will be kept."
                        : "Please ensure audio files are in MP3 format and cover images are high quality."}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>

        <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)' }} />

        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button
            onClick={() => setOpenSongDialog(false)}
            variant="text"
            sx={{
              color: '#b3b3b3',
              '&:hover': {
                color: '#fff',
                backgroundColor: 'rgba(255,255,255,0.1)'
              }
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmitSong}
            variant="contained"
            color="primary"
            disabled={!songForm.title || !songForm.artist || (!songForm.audioFile && !selectedSong)}
            sx={{
              px: 3,
              borderRadius: 2,
              fontWeight: 'medium',
              boxShadow: 2
            }}
          >
            {selectedSong ? 'Update Song' : 'Upload Song'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Playlist Dialog */}
      <Dialog
        open={openPlaylistDialog}
        onClose={() => setOpenPlaylistDialog(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            backgroundColor: '#1e1e1e',
            color: '#fff',
            borderRadius: 2,
            boxShadow: '0 8px 32px rgba(0,0,0,0.5)'
          }
        }}
      >
        <DialogTitle sx={{
          bgcolor: 'rgba(29, 185, 84, 0.1)',
          color: '#1DB954',
          fontSize: '1.5rem',
          pb: 2,
          display: 'flex',
          alignItems: 'center',
        }}>
          <PlaylistIcon sx={{ mr: 1 }} />
          {selectedPlaylist ? 'Edit Playlist' : 'Create New Playlist'}
        </DialogTitle>

        <DialogContent sx={{ py: 3 }}>
          <Grid container spacing={3}>
            {/* Left column - Cover Image and settings */}
            <Grid item xs={12} md={4}>
              <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <Box
                  sx={{
                    border: '2px dashed #333',
                    borderRadius: 2,
                    height: 220,
                    mb: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    bgcolor: 'rgba(255,255,255,0.03)',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                >
                  {playlistForm.coverImage ? (
                    <Box
                      component="img"
                      src={playlistForm.coverImage instanceof File ? URL.createObjectURL(playlistForm.coverImage) : playlistForm.coverImage}
                      alt="Cover Preview"
                      sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  ) : selectedPlaylist ? (
                    <Box
                      component="img"
                      src={selectedPlaylist.coverImage || '/default-playlist.jpg'}
                      alt="Playlist Cover"
                      sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  ) : (
                    <>
                      <CameraIcon sx={{ fontSize: 40, color: '#666', mb: 1 }} />
                      <Typography variant="body2" color="#666" align="center">
                        Playlist Cover
                      </Typography>
                    </>
                  )}

                  <Button
                    variant="contained"
                    component="label"
                    sx={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      bgcolor: 'rgba(0,0,0,0.7)',
                      borderRadius: 0,
                      '&:hover': {
                        bgcolor: 'rgba(29, 185, 84, 0.7)',
                      }
                    }}
                  >
                    {(playlistForm.coverImage || selectedPlaylist?.coverImage) ? 'Change Cover' : 'Upload Cover'}
                    <input
                      type="file"
                      accept="image/*"
                      name="coverImage"
                      onChange={handlePlaylistFormChange}
                      hidden
                    />
                  </Button>
                </Box>

                <Box sx={{ mt: 2 }}>
                  <Typography variant="h6" gutterBottom>
                    Playlist Settings
                  </Typography>

                  <FormControlLabel
                    control={
                      <Switch
                        checked={playlistForm.isDefault}
                        onChange={handlePlaylistFormChange}
                        name="isDefault"
                        color="primary"
                      />
                    }
                    label={
                      <Box sx={{ ml: 1 }}>
                        <Typography variant="body1">Default Playlist</Typography>
                        <Typography variant="caption" color="#b3b3b3">
                          Available to all users by default
                        </Typography>
                      </Box>
                    }
                  />

                  <FormControlLabel
                    control={
                      <Switch
                        checked={playlistForm.isPublic}
                        onChange={handlePlaylistFormChange}
                        name="isPublic"
                        color="primary"
                      />
                    }
                    label={
                      <Box sx={{ ml: 1 }}>
                        <Typography variant="body1">Public</Typography>
                        <Typography variant="caption" color="#b3b3b3">
                          Visible in public listings
                        </Typography>
                      </Box>
                    }
                  />
                </Box>
              </Box>
            </Grid>

            {/* Right column - Playlist Details */}
            <Grid item xs={12} md={8}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    label="Playlist Name"
                    name="name"
                    value={playlistForm.name}
                    onChange={handlePlaylistFormChange}
                    variant="outlined"
                    InputLabelProps={{ sx: { color: '#b3b3b3' } }}
                    InputProps={{ sx: { color: '#fff' } }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': { borderColor: '#333' },
                        '&:hover fieldset': { borderColor: '#444' },
                        '&.Mui-focused fieldset': { borderColor: '#1DB954' }
                      }
                    }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Description"
                    name="description"
                    value={playlistForm.description}
                    onChange={handlePlaylistFormChange}
                    multiline
                    rows={3}
                    variant="outlined"
                    InputLabelProps={{ sx: { color: '#b3b3b3' } }}
                    InputProps={{ sx: { color: '#fff' } }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': { borderColor: '#333' },
                        '&:hover fieldset': { borderColor: '#444' },
                        '&.Mui-focused fieldset': { borderColor: '#1DB954' }
                      }
                    }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 2
                  }}>
                    <Typography variant="h6">
                      Songs in Playlist
                    </Typography>
                    <Button
                      variant="outlined"
                      startIcon={<AddIcon />}
                      onClick={handleOpenSongSelection}
                      sx={{
                        borderColor: '#1DB954',
                        color: '#1DB954',
                        '&:hover': {
                          borderColor: '#1DB954',
                          bgcolor: 'rgba(29, 185, 84, 0.1)',
                        }
                      }}
                    >
                      Add Songs
                    </Button>
                  </Box>

                  <Box sx={{
                    border: '1px solid #333',
                    borderRadius: 1,
                    height: 220,
                    overflow: 'auto',
                    mb: 2,
                    p: 1,
                    '&::-webkit-scrollbar': {
                      width: '8px'
                    },
                    '&::-webkit-scrollbar-track': {
                      background: 'rgba(0,0,0,0.1)'
                    },
                    '&::-webkit-scrollbar-thumb': {
                      background: '#333'
                    },
                    '&::-webkit-scrollbar-thumb:hover': {
                      background: '#444'
                    }
                  }}>
                    {playlistForm.songs.length === 0 ? (
                      <Box sx={{
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'column'
                      }}>
                        <MusicIcon sx={{ fontSize: 50, color: '#666', mb: 1 }} />
                        <Typography variant="body2" color="#666" align="center">
                          No songs added yet
                        </Typography>
                      </Box>
                    ) : (
                      <List dense>
                        {playlistForm.songs.map((songId) => {
                          // Find full song details
                          const song = songs.find(s => s._id === songId);
                          return song ? (
                            <ListItem
                              key={song._id}
                              sx={{
                                borderRadius: 1,
                                mb: 0.5,
                                bgcolor: 'rgba(255,255,255,0.03)',
                                '&:hover': { bgcolor: 'rgba(255,255,255,0.05)' }
                              }}
                            >
                              <ListItemAvatar>
                                <Avatar
                                  variant="rounded"
                                  src={song.coverImage}
                                  alt={song.title}
                                />
                              </ListItemAvatar>
                              <ListItemText
                                primary={song.title}
                                secondary={song.artist}
                                primaryTypographyProps={{
                                  variant: 'body1',
                                  color: 'white',
                                  noWrap: true
                                }}
                                secondaryTypographyProps={{
                                  variant: 'body2',
                                  color: '#b3b3b3',
                                  noWrap: true
                                }}
                              />
                              <ListItemSecondaryAction>
                                <IconButton
                                  edge="end"
                                  size="small"
                                  onClick={() => handleSongSelectionChange(song._id)}
                                >
                                  <RemoveCircleIcon sx={{ color: '#ff5252' }} />
                                </IconButton>
                              </ListItemSecondaryAction>
                            </ListItem>
                          ) : null;
                        })}
                      </List>
                    )}
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>

        <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)' }} />

        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button
            onClick={() => setOpenPlaylistDialog(false)}
            variant="text"
            sx={{
              color: '#b3b3b3',
              '&:hover': {
                color: '#fff',
                backgroundColor: 'rgba(255,255,255,0.1)'
              }
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmitPlaylist}
            variant="contained"
            color="primary"
            disabled={!playlistForm.name}
            sx={{
              px: 3,
              borderRadius: 2,
              fontWeight: 'medium',
              boxShadow: 2
            }}
          >
            {selectedPlaylist ? 'Update Playlist' : 'Create Playlist'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Song Selection Dialog for Playlists */}
      <Dialog
        open={openSongSelectionDialog}
        onClose={() => setOpenSongSelectionDialog(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            backgroundColor: '#1e1e1e',
            color: '#fff',
            borderRadius: 2,
            boxShadow: '0 8px 32px rgba(0,0,0,0.5)'
          }
        }}
      >
        <DialogTitle sx={{
          bgcolor: 'rgba(29, 185, 84, 0.1)',
          color: '#1DB954',
          fontSize: '1.5rem',
          pb: 2,
          display: 'flex',
          alignItems: 'center',
        }}>
          <MusicIcon sx={{ mr: 1 }} />
          Add Songs to Playlist
        </DialogTitle>

        <DialogContent sx={{ py: 2 }}>
          <List sx={{
            '&::-webkit-scrollbar': {
              width: '8px'
            },
            '&::-webkit-scrollbar-track': {
              background: 'rgba(0,0,0,0.1)'
            },
            '&::-webkit-scrollbar-thumb': {
              background: '#333'
            },
            '&::-webkit-scrollbar-thumb:hover': {
              background: '#444'
            }
          }}>
            {songs.length === 0 ? (
              <Typography variant="body1" sx={{ textAlign: 'center', py: 3, color: '#b3b3b3' }}>
                No songs available. Please add songs first.
              </Typography>
            ) : (
              songs.map(song => {
                const isSelected = playlistForm.songs.includes(song._id);

                return (
                  <ListItem
                    key={song._id}
                    sx={{
                      borderRadius: 1,
                      mb: 0.5,
                      bgcolor: isSelected ? 'rgba(29, 185, 84, 0.1)' : 'rgba(255,255,255,0.03)',
                      '&:hover': { bgcolor: isSelected ? 'rgba(29, 185, 84, 0.15)' : 'rgba(255,255,255,0.05)' }
                    }}
                  >
                    <ListItemAvatar>
                      <Avatar
                        variant="rounded"
                        src={song.coverImage}
                        alt={song.title}
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={song.title}
                      secondary={`${song.artist} • ${formatDuration(song.duration)}`}
                      primaryTypographyProps={{
                        variant: 'body1',
                        color: isSelected ? '#1DB954' : 'white',
                        noWrap: true
                      }}
                      secondaryTypographyProps={{
                        variant: 'body2',
                        color: '#b3b3b3',
                        noWrap: true
                      }}
                    />
                    <ListItemSecondaryAction>
                      <Checkbox
                        edge="end"
                        checked={isSelected}
                        onChange={() => handleSongSelectionChange(song._id)}
                        sx={{
                          color: '#666',
                          '&.Mui-checked': {
                            color: '#1DB954',
                          },
                        }}
                      />
                    </ListItemSecondaryAction>
                  </ListItem>
                );
              })
            )}
          </List>
        </DialogContent>

        <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)' }} />

        <DialogActions sx={{ px: 3, py: 2, justifyContent: 'space-between' }}>
          <Box>
            <Typography variant="body2" color="#b3b3b3">
              {playlistForm.songs.length} songs selected
            </Typography>
          </Box>
          <Box>
            <Button
              onClick={() => setOpenSongSelectionDialog(false)}
              variant="text"
              sx={{
                mr: 1,
                color: '#b3b3b3',
                '&:hover': {
                  color: '#fff',
                  backgroundColor: 'rgba(255,255,255,0.1)'
                }
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={() => setOpenSongSelectionDialog(false)}
              variant="contained"
              color="primary"
              sx={{
                px: 3,
                borderRadius: 2,
                fontWeight: 'medium',
                boxShadow: 2
              }}
            >
              Confirm Selection
            </Button>
          </Box>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default AdminDashboard;