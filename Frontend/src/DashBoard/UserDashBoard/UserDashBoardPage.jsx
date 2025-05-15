import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Stack,
  Card,
  CardMedia,
  CardContent,
  IconButton,
  TextField,
  InputAdornment,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Drawer,
  Divider,
  Chip,
  Tab,
  Tabs,
  Button,
  Avatar,
  CircularProgress,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tooltip,
  useMediaQuery,
  useTheme
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
  Add,
  Search,
  Person,
  QueueMusic,
  Download,
  MoreVert,
  MusicNote,
  Create,
  Delete,
  PlaylistAdd,
  Repeat,
  RepeatOne,
  Shuffle,
  LibraryMusic,
  Close
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import Slider from '@mui/material/Slider';
import { useSnackbar } from 'notistack';

// Custom styled components
const PlayerContainer = styled(Paper)(({ theme }) => ({
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

const PlaylistDrawer = styled(Drawer)(({ theme }) => ({
  '& .MuiDrawer-paper': {
    width: 320,
    backgroundColor: '#121212',
    borderLeft: '1px solid rgba(255, 255, 255, 0.1)'
  }
}));

const SongCard = styled(Card)(({ theme }) => ({
  backgroundColor: '#181818',
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: '#282828',
    transform: 'translateY(-4px)',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)'
  }
}));

function UserDashboard() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const audioRef = useRef(null);

  // State
  const [currentTab, setCurrentTab] = useState(0);
  const [songs, setSongs] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [likedSongs, setLikedSongs] = useState([]);
  const [savedSongs, setSavedSongs] = useState([]);
  const [recentlyPlayed, setRecentlyPlayed] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [repeat, setRepeat] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [playlistDrawerOpen, setPlaylistDrawerOpen] = useState(false);
  const [queue, setQueue] = useState([]);
  const [drawerPlaylist, setDrawerPlaylist] = useState(null);

  // Dialogs
  const [playlistDialog, setPlaylistDialog] = useState(false);
  const [songOptionsAnchor, setSongOptionsAnchor] = useState(null);
  const [selectedSong, setSelectedSong] = useState(null);
  const [selectPlaylistDialog, setSelectPlaylistDialog] = useState(false);


  // Form state
  const [playlistForm, setPlaylistForm] = useState({
    name: '',
    description: '',
    coverImage: null,
    isPublic: true
  });

  // Load initial data
  useEffect(() => {
    fetchDashboardData();
  }, []);

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
  }, [repeat, queue]);

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

  // Fetch all necessary data for the dashboard
  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      // Get user profile with liked and saved songs
      const profileRes = await api.get('/user/profile');
      setLikedSongs(profileRes.data.data.likedSongs || []);
      setSavedSongs(profileRes.data.data.savedSongs || []);

      // Get songs
      const songsRes = await api.get('/user/songs');
      setSongs(songsRes.data.data);

      // Get playlists
      const playlistsRes = await api.get('/user/playlists');
      setPlaylists(playlistsRes.data.data);

      // Get recently played
      const recentRes = await api.get('/user/songs/recently-played');
      setRecentlyPlayed(recentRes.data.data.map(item => item.song));
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      enqueueSnackbar('Error loading your dashboard data', { variant: 'error' });
    } finally {
      setLoading(false);
    }
  };

  // Track played song
  const trackPlayedSong = async (songId) => {
    try {
      await api.post(`/user/songs/${songId}/play`);
    } catch (error) {
      console.error('Error tracking played song:', error);
    }
  };

  // Play a song
  const playSong = (song) => {
    // If the song is already playing, toggle play/pause
    if (currentSong && currentSong._id === song._id) {
      togglePlayPause();
      return;
    }

    // Set current song and start playing
    setCurrentSong(song);
    setIsPlaying(true);

    // Create queue from current context
    let newQueue = [];

    if (currentTab === 0) {
      // Home - use recently played or all songs
      newQueue = recentlyPlayed.length > 0 ? [...recentlyPlayed] : [...songs];
    } else if (currentTab === 1) {
      // Browse - use all songs
      newQueue = [...songs];
    } else if (currentTab === 2) {
      // Liked songs
      newQueue = [...likedSongs];
    } else if (currentTab === 3) {
      // Library
      newQueue = [...savedSongs];
    } else if (drawerPlaylist) {
      // Playlist
      newQueue = [...drawerPlaylist.songs];
    }

    // Remove current song from queue
    newQueue = newQueue.filter(s => s._id !== song._id);

    // Shuffle if enabled
    if (shuffle) {
      newQueue = shuffleArray(newQueue);
    }

    // Set queue with current song at the beginning
    setQueue([song, ...newQueue]);
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

  // Toggle like song
  const toggleLikeSong = async (song, event) => {
    if (event) {
      event.stopPropagation();
    }

    try {
      const res = await api.put(`/user/songs/${song._id}/like`);

      // Update liked songs
      if (res.data.liked) {
        setLikedSongs([...likedSongs, song]);
        enqueueSnackbar('Added to your Liked Songs', { variant: 'success' });
      } else {
        setLikedSongs(likedSongs.filter(s => s._id !== song._id));
        enqueueSnackbar('Removed from your Liked Songs', { variant: 'info' });
      }
    } catch (error) {
      console.error('Error toggling like:', error);
      enqueueSnackbar('Failed to update Liked Songs', { variant: 'error' });
    }
  };

  // Toggle save song
  const toggleSaveSong = async (song, event) => {
    if (event) {
      event.stopPropagation();
    }

    try {
      const res = await api.put(`/user/songs/${song._id}/save`);

      // Update saved songs
      if (res.data.saved) {
        setSavedSongs([...savedSongs, song]);
        enqueueSnackbar('Added to your Library', { variant: 'success' });
      } else {
        setSavedSongs(savedSongs.filter(s => s._id !== song._id));
        enqueueSnackbar('Removed from your Library', { variant: 'info' });
      }
    } catch (error) {
      console.error('Error toggling save:', error);
      enqueueSnackbar('Failed to update Library', { variant: 'error' });
    }
  };

  // Download song
  const downloadSong = async (song, event) => {
    if (event) {
      event.stopPropagation();
    }

    try {
      // Direct download approach
      window.open(`${api.defaults.baseURL}/user/songs/${song._id}/download`, '_blank');
      enqueueSnackbar('Downloading song...', { variant: 'info' });
    } catch (error) {
      console.error('Error downloading song:', error);
      enqueueSnackbar('Failed to download song', { variant: 'error' });
    }
  };

  // Handle search
  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);

    try {
      const res = await api.get(`/user/songs/search?query=${searchQuery}`);
      setSearchResults(res.data.data);
    } catch (error) {
      console.error('Error searching songs:', error);
      enqueueSnackbar('Error searching for songs', { variant: 'error' });
    }
  };

  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
    setSearchQuery('');
    setSearchResults([]);
    setIsSearching(false);
  };

  // Open playlist drawer
  const openPlaylist = async (playlistId) => {
    try {
      const res = await api.get(`/user/playlists/${playlistId}`);
      setDrawerPlaylist(res.data.data);
      setPlaylistDrawerOpen(true);
    } catch (error) {
      console.error('Error opening playlist:', error);
      enqueueSnackbar('Failed to open playlist', { variant: 'error' });
    }
  };

  // Create new playlist
  const handleCreatePlaylist = async () => {
    try {
      // Create FormData for file upload
      const formData = new FormData();
      formData.append('name', playlistForm.name);
      formData.append('description', playlistForm.description || '');
      formData.append('isPublic', playlistForm.isPublic ? 'true' : 'false');

      if (playlistForm.coverImage) {
        formData.append('coverImage', playlistForm.coverImage);
      }

      const res = await api.post('/user/playlists', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      // Add new playlist to state
      setPlaylists([...playlists, res.data.data]);
      
      enqueueSnackbar('Playlist created successfully', { variant: 'success' });

      // Close dialog
      setPlaylistDialog(false);

      // Reset form
      setPlaylistForm({
        name: '',
        description: '',
        coverImage: null,
        isPublic: true
      });
    } catch (error) {
      console.error('Error creating playlist:', error);
      enqueueSnackbar('Failed to create playlist', { variant: 'error' });
    }
  };

  // Add song to playlist
  const addSongToPlaylist = async (playlistId) => {
    if (!selectedSong) return;

    try {
      await api.put(`/user/playlists/${playlistId}/songs/${selectedSong._id}`);

      // Update playlists
      const updatedPlaylists = await api.get('/user/playlists');
      setPlaylists(updatedPlaylists.data.data);

      // Update current drawer playlist if open
      if (drawerPlaylist && drawerPlaylist._id === playlistId) {
        const updatedPlaylist = await api.get(`/user/playlists/${playlistId}`);
        setDrawerPlaylist(updatedPlaylist.data.data);
      }

      enqueueSnackbar('Song added to playlist', { variant: 'success' });
    } catch (error) {
      console.error('Error adding song to playlist:', error);
      enqueueSnackbar('Failed to add song to playlist', { variant: 'error' });
    } finally {
      // Close dialogs
      setSelectPlaylistDialog(false);
      setSongOptionsAnchor(null);
      setSelectedSong(null);
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

  // Check if song is liked
  const isLiked = (songId) => {
    return likedSongs.some(song => song._id === songId);
  };

  // Check if song is saved
  const isSaved = (songId) => {
    return savedSongs.some(song => song._id === songId);
  };

  // Render song card
  const renderSongCard = (song) => {
    return (
      <Grid item xs={12} sm={6} md={4} lg={3} key={song._id}>
        <SongCard>
          <Box sx={{ position: 'relative' }}>
            <CardMedia
              component="img"
              height="160"
              image={song.coverImage}
              alt={song.title}
              sx={{ cursor: 'pointer' }}
              onClick={() => playSong(song)}
            />
            <IconButton
              sx={{
                position: 'absolute',
                bottom: 8,
                right: 8,
                backgroundColor: 'rgba(0,0,0,0.5)',
                '&:hover': { backgroundColor: 'rgba(0,0,0,0.7)' }
              }}
              onClick={() => playSong(song)}
            >
              {currentSong && currentSong._id === song._id && isPlaying ? (
                <Pause sx={{ color: '#1DB954' }} />
              ) : (
                <PlayArrow sx={{ color: '#1DB954' }} />
              )}
            </IconButton>
          </Box>
          <CardContent>
            <Typography gutterBottom variant="h6" component="div" noWrap>
              {song.title}
            </Typography>
            <Typography variant="body2" color="text.secondary" noWrap>
              {song.artist}
            </Typography>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
              <IconButton size="small" onClick={(e) => toggleLikeSong(song, e)}>
                {isLiked(song._id) ? (
                  <Favorite sx={{ color: '#1DB954' }} />
                ) : (
                  <FavoriteBorder />
                )}
              </IconButton>
              <IconButton size="small" onClick={(e) => {
                setSelectedSong(song);
                setSongOptionsAnchor(e.currentTarget);
              }}>
                <MoreVert />
              </IconButton>
            </Box>
          </CardContent>
        </SongCard>
      </Grid>
    );
  };

  // Render playlist card
  const renderPlaylistCard = (playlist) => {
    return (
      <Grid item xs={12} sm={6} md={4} lg={3} key={playlist._id}>
        <SongCard onClick={() => openPlaylist(playlist._id)}>
          <CardMedia
            component="img"
            height="160"
            image={playlist.coverImage || '/default-playlist.jpg'}
            alt={playlist.name}
          />
          <CardContent>
            <Typography gutterBottom variant="h6" component="div" noWrap>
              {playlist.name}
            </Typography>
            <Typography variant="body2" color="text.secondary" noWrap>
              {playlist.songs.length} songs
            </Typography>
          </CardContent>
        </SongCard>
      </Grid>
    );
  };

  return (
    <Box sx={{
      backgroundColor: '#121212',
      minHeight: '100vh',
      pb: 10 // Add padding for player
    }}>
      {/* Audio element */}
      <audio ref={audioRef} />

      {/* Main Content */}
      <Container maxWidth="xl" sx={{ pt: 4 }}>
        {/* Search Bar */}
        <Box sx={{ mb: 4 }}>
          <TextField
            fullWidth
            placeholder="Search for songs, artists or albums..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search sx={{ color: '#b3b3b3' }} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSearch}
                    disabled={!searchQuery.trim()}
                    sx={{ height: 40 }}
                  >
                    Search
                  </Button>
                </InputAdornment>
              ),
              sx: {
                backgroundColor: '#282828',
                borderRadius: 2,
                '&:hover': {
                  backgroundColor: '#333'
                }
              }
            }}
            sx={{
              '& .MuiOutlinedInput-notchedOutline': {
                border: 'none'
              }
            }}
          />
        </Box>

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
            <CircularProgress color="primary" />
          </Box>
        ) : (
          <>
            {isSearching ? (
              // Search Results
              <Box>
                <Typography variant="h5" sx={{ mb: 3 }}>
                  Search Results
                </Typography>
                {searchResults.length === 0 ? (
                  <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center', py: 4 }}>
                    No results found for "{searchQuery}"
                  </Typography>
                ) : (
                  <Grid container spacing={3}>
                    {searchResults.map(song => renderSongCard(song))}
                  </Grid>
                )}
                <Box sx={{ mt: 4, textAlign: 'center' }}>
                  <Button
                    variant="outlined"
                    onClick={() => {
                      setSearchQuery('');
                      setSearchResults([]);
                      setIsSearching(false);
                    }}
                  >
                    Clear Search
                  </Button>
                </Box>
              </Box>
            ) : (
              // Main Content
              <Box>
                {/* Tabs */}
                <Tabs
                  value={currentTab}
                  onChange={handleTabChange}
                  variant={isMobile ? "scrollable" : "standard"}
                  scrollButtons="auto"
                  sx={{
                    mb: 4,
                    '& .MuiTabs-indicator': {
                      backgroundColor: '#1DB954'
                    },
                    '& .Mui-selected': {
                      color: '#fff !important'
                    }
                  }}
                >
                  <Tab label="Home" />
                  <Tab label="Browse" />
                  <Tab label="Liked Songs" />
                  <Tab label="Library" />
                  <Tab label="Playlists" />
                </Tabs>

                {/* Home Tab */}
                {currentTab === 0 && (
                  <Box>
                    {/* Recently played section */}
                    {recentlyPlayed.length > 0 && (
                      <Box sx={{ mb: 6 }}>
                        <Typography variant="h5" sx={{ mb: 3 }}>
                          Recently Played
                        </Typography>
                        <Grid container spacing={3}>
                          {recentlyPlayed.slice(0, 4).map(song => renderSongCard(song))}
                        </Grid>
                      </Box>
                    )}

                    {/* Popular songs section */}
                    <Box sx={{ mb: 6 }}>
                      <Typography variant="h5" sx={{ mb: 3 }}>
                        Popular Songs
                      </Typography>
                      <Grid container spacing={3}>
                        {songs.slice(0, 8).map(song => renderSongCard(song))}
                      </Grid>
                    </Box>
                  </Box>
                )}

                {/* Browse Tab */}
                {currentTab === 1 && (
                  <Box>
                    <Typography variant="h5" sx={{ mb: 3 }}>
                      All Songs
                    </Typography>
                    <Grid container spacing={3}>
                      {songs.map(song => renderSongCard(song))}
                    </Grid>
                  </Box>
                )}

                {/* Liked Songs Tab */}
                {currentTab === 2 && (
                  <Box>
                    <Typography variant="h5" sx={{ mb: 3 }}>
                      Liked Songs
                    </Typography>
                    {likedSongs.length === 0 ? (
                      <Paper sx={{ p: 4, backgroundColor: '#282828', textAlign: 'center' }}>
                        <Typography variant="h6" sx={{ mb: 2 }}>
                          You haven't liked any songs yet
                        </Typography>
                        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                          Click the heart icon on a song to add it to your Liked Songs
                        </Typography>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => setCurrentTab(1)}
                        >
                          Browse Songs
                        </Button>
                      </Paper>
                    ) : (
                      <Grid container spacing={3}>
                        {likedSongs.map(song => renderSongCard(song))}
                      </Grid>
                    )}
                  </Box>
                )}

                {/* Library Tab */}
                {currentTab === 3 && (
                  <Box>
                    <Typography variant="h5" sx={{ mb: 3 }}>
                      Your Library
                    </Typography>
                    {savedSongs.length === 0 ? (
                      <Paper sx={{ p: 4, backgroundColor: '#282828', textAlign: 'center' }}>
                        <Typography variant="h6" sx={{ mb: 2 }}>
                          Your library is empty
                        </Typography>
                        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                          Save songs to your library to access them quickly
                        </Typography>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => setCurrentTab(1)}
                        >
                          Browse Songs
                        </Button>
                      </Paper>
                    ) : (
                      <Grid container spacing={3}>
                        {savedSongs.map(song => renderSongCard(song))}
                      </Grid>
                    )}
                  </Box>
                )}

                {/* Playlists Tab */}
                {currentTab === 4 && (
                  <Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                      <Typography variant="h5">
                        Your Playlists
                      </Typography>
                      <Button
                        variant="contained"
                        color="primary"
                        startIcon={<Add />}
                        onClick={() => setPlaylistDialog(true)}
                      >
                        Create Playlist
                      </Button>
                    </Box>

                    {playlists.length === 0 ? (
                      <Paper sx={{ p: 4, backgroundColor: '#282828', textAlign: 'center' }}>
                        <Typography variant="h6" sx={{ mb: 2 }}>
                          You haven't created any playlists yet
                        </Typography>
                        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                          Create a playlist to organize your favorite songs
                        </Typography>
                        <Button
                          variant="contained"
                          color="primary"
                          startIcon={<Add />}
                          onClick={() => setPlaylistDialog(true)}
                        >
                          Create First Playlist
                        </Button>
                      </Paper>
                    ) : (
                      <Grid container spacing={3}>
                        {playlists.map(playlist => renderPlaylistCard(playlist))}
                      </Grid>
                    )}
                  </Box>
                )}
              </Box>
            )}
          </>
        )}
      </Container>

      {/* Music Player */}
      {currentSong && (
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
                  onClick={() => toggleLikeSong(currentSong)}
                  sx={{ ml: 1 }}
                >
                  {isLiked(currentSong._id) ? (
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
                  onClick={() => setPlaylistDrawerOpen(true)}
                  sx={{ ml: 2 }}
                >
                  <QueueMusic />
                </IconButton>
              </Box>
            </Grid>
          </Grid>
        </PlayerContainer>
      )}

      {/* Playlist Drawer */}
      <PlaylistDrawer
        anchor="right"
        open={playlistDrawerOpen}
        onClose={() => setPlaylistDrawerOpen(false)}
      >
        <Box sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h6">
              {drawerPlaylist ? `Playlist: ${drawerPlaylist.name}` : 'Current Queue'}
            </Typography>
            <IconButton onClick={() => setPlaylistDrawerOpen(false)}>
              <Close />
            </IconButton>
          </Box>

          {drawerPlaylist ? (
            // Playlist songs
            <>
              <Box sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                <Box
                  component="img"
                  src={drawerPlaylist.coverImage || '/default-playlist.jpg'}
                  alt={drawerPlaylist.name}
                  sx={{ width: 60, height: 60, borderRadius: 1, mr: 2 }}
                />
                <Box>
                  <Typography variant="subtitle1">
                    {drawerPlaylist.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {drawerPlaylist.songs.length} songs
                  </Typography>
                </Box>
              </Box>

              {drawerPlaylist.description && (
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {drawerPlaylist.description}
                </Typography>
              )}

              <Divider sx={{ my: 2 }} />

              {drawerPlaylist.songs.length === 0 ? (
                <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', py: 4 }}>
                  This playlist is empty
                </Typography>
              ) : (
                <List>
                  {drawerPlaylist.songs.map((song, index) => (
                    <ListItem
                      key={song._id}
                      button
                      onClick={() => playSong(song)}
                      sx={{
                        borderRadius: 1,
                        mb: 1,
                        backgroundColor: currentSong && currentSong._id === song._id ? 'rgba(29, 185, 84, 0.1)' : 'transparent',
                        '&:hover': {
                          backgroundColor: currentSong && currentSong._id === song._id ? 'rgba(29, 185, 84, 0.2)' : 'rgba(255, 255, 255, 0.05)'
                        }
                      }}
                    >
                      <ListItemIcon sx={{ minWidth: 40 }}>
                        {currentSong && currentSong._id === song._id && isPlaying ? (
                          <Pause sx={{ color: '#1DB954' }} />
                        ) : (
                          <Typography color={currentSong && currentSong._id === song._id ? '#1DB954' : 'inherit'}>
                            {index + 1}
                          </Typography>
                        )}
                      </ListItemIcon>
                      <ListItemText
                        primary={song.title}
                        secondary={song.artist}
                        primaryTypographyProps={{
                          color: currentSong && currentSong._id === song._id ? '#1DB954' : 'inherit',
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
            </>
          ) : (
            // Current queue
            <>
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
            </>
          )}
        </Box>
      </PlaylistDrawer>

      {/* Create Playlist Dialog */}
      <Dialog
        open={playlistDialog}
        onClose={() => setPlaylistDialog(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            backgroundColor: '#282828',
            color: '#fff'
          }
        }}
      >
        <DialogTitle>Create New Playlist</DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Playlist Name"
              variant="outlined"
              value={playlistForm.name}
              onChange={(e) => setPlaylistForm({ ...playlistForm, name: e.target.value })}
              required
              sx={{
                mb: 3,
                '& label': { color: '#b3b3b3' },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: '#333' },
                  '&:hover fieldset': { borderColor: '#444' },
                  '&.Mui-focused fieldset': { borderColor: '#1DB954' }
                }
              }}
              InputLabelProps={{
                sx: { color: '#b3b3b3' }
              }}
            />

            <TextField
              fullWidth
              label="Description (Optional)"
              variant="outlined"
              value={playlistForm.description}
              onChange={(e) => setPlaylistForm({ ...playlistForm, description: e.target.value })}
              multiline
              rows={3}
              sx={{
                mb: 3,
                '& label': { color: '#b3b3b3' },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: '#333' },
                  '&:hover fieldset': { borderColor: '#444' },
                  '&.Mui-focused fieldset': { borderColor: '#1DB954' }
                }
              }}
              InputLabelProps={{
                sx: { color: '#b3b3b3' }
              }}
            />

            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              Playlist Cover Image (Optional)
            </Typography>

            <Button
              variant="outlined"
              component="label"
              fullWidth
              sx={{
                py: 1.5,
                mb: 3,
                borderColor: '#333',
                '&:hover': {
                  borderColor: '#1DB954'
                }
              }}
            >
              {playlistForm.coverImage ? 'Change Image' : 'Upload Image'}
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    setPlaylistForm({ ...playlistForm, coverImage: e.target.files[0] });
                  }
                }}
              />
            </Button>

            {playlistForm.coverImage && (
              <Box sx={{ mb: 3, textAlign: 'center' }}>
                <Box
                  component="img"
                  src={URL.createObjectURL(playlistForm.coverImage)}
                  alt="Playlist Cover Preview"
                  sx={{ width: 160, height: 160, borderRadius: 2 }}
                />
                <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                  {playlistForm.coverImage.name}
                </Typography>
              </Box>
            )}
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button
            onClick={() => setPlaylistDialog(false)}
            sx={{ color: '#b3b3b3' }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleCreatePlaylist}
            disabled={!playlistForm.name.trim()}
          >
            Create Playlist
          </Button>
        </DialogActions>
      </Dialog>

      {/* Song Options Menu */}
      <Menu
        anchorEl={songOptionsAnchor}
        open={Boolean(songOptionsAnchor)}
        onClose={() => {
          setSongOptionsAnchor(null);
          setSelectedSong(null);
        }}
        PaperProps={{
          sx: {
            backgroundColor: '#282828',
            color: '#fff'
          }
        }}
      >
        {selectedSong && (
          <>
            <MenuItem
              onClick={() => {
                toggleSaveSong(selectedSong);
                setSongOptionsAnchor(null);
                setSelectedSong(null);
              }}
            >
              <ListItemIcon>
                <LibraryMusic sx={{ color: isSaved(selectedSong._id) ? '#1DB954' : 'inherit' }} />
              </ListItemIcon>
              <ListItemText>
                {isSaved(selectedSong._id) ? 'Remove from Library' : 'Add to Library'}
              </ListItemText>
            </MenuItem>

            <MenuItem
              onClick={() => {
                setSelectPlaylistDialog(true);
                setSongOptionsAnchor(null);
              }}
            >
              <ListItemIcon>
                <PlaylistAdd sx={{ color: '#b3b3b3' }} />
              </ListItemIcon>
              <ListItemText>Add to Playlist</ListItemText>
            </MenuItem>

            <MenuItem
              onClick={() => {
                downloadSong(selectedSong);
                setSongOptionsAnchor(null);
                setSelectedSong(null);
              }}
            >
              <ListItemIcon>
                <Download sx={{ color: '#b3b3b3' }} />
              </ListItemIcon>
              <ListItemText>Download</ListItemText>
            </MenuItem>
          </>
        )}
      </Menu>

      {/* Select Playlist Dialog */}
      <Dialog
        open={selectPlaylistDialog}
        onClose={() => setSelectPlaylistDialog(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            backgroundColor: '#282828',
            color: '#fff'
          }
        }}
      >
        <DialogTitle>Add to Playlist</DialogTitle>
        <DialogContent>
          {playlists.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 3 }}>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                You don't have any playlists yet
              </Typography>
              <Button
                variant="contained"
                color="primary"
                startIcon={<Add />}
                onClick={() => {
                  setSelectPlaylistDialog(false);
                  setPlaylistDialog(true);
                }}
              >
                Create Playlist
              </Button>
            </Box>
          ) : (
            <List>
              {playlists.map(playlist => (
                <ListItem
                  button
                  key={playlist._id}
                  onClick={() => addSongToPlaylist(playlist._id)}
                >
                  <ListItemIcon>
                    <Box
                      component="img"
                      src={playlist.coverImage || '/default-playlist.jpg'}
                      alt={playlist.name}
                      sx={{ width: 40, height: 40, borderRadius: 1 }}
                    />
                  </ListItemIcon>
                  <ListItemText
                    primary={playlist.name}
                    secondary={`${playlist.songs.length} songs`}
                  />
                </ListItem>
              ))}
            </List>
          )}
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button
            onClick={() => setSelectPlaylistDialog(false)}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default UserDashboard;