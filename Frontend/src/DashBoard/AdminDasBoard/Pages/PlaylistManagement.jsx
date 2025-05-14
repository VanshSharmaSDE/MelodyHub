import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  InputAdornment,
  IconButton,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
  Menu,
  ListItemIcon,
  ListItemText,
  Checkbox,
  FormControlLabel,
  Pagination,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Divider,
} from '@mui/material';

// Icons
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import FeaturedPlaylistIcon from '@mui/icons-material/FeaturedPlaylist';
import QueueMusicIcon from '@mui/icons-material/QueueMusic';
import PersonIcon from '@mui/icons-material/Person';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import VisibilityIcon from '@mui/icons-material/Visibility';

function PlaylistManagement({ showNotification }) {
  // State management
  const [playlists, setPlaylists] = useState([]);
  const [filteredPlaylists, setFilteredPlaylists] = useState([]);
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(9);
  const [searchTerm, setSearchTerm] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [tracksDialogOpen, setTracksDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [filterAnchorEl, setFilterAnchorEl] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [actionMenuAnchorEl, setActionMenuAnchorEl] = useState(null);
  const [selectedPlaylistId, setSelectedPlaylistId] = useState(null);
  
  // Form state
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    coverImage: '',
    isFeatured: false,
    isPublic: true,
    tracks: [],
    curatedBy: 'Musicify Team',
  });
  
  const categories = [
    'Top Charts', 'Chill', 'Focus', 'Workout', 'Party', 'Mood', 'Decades', 'Hip Hop', 'Pop', 
    'Rock', 'Electronic', 'Jazz', 'R&B', 'Country', 'Classical'
  ];
  
  // Mock track data
  const allTracks = [
    { id: 1, title: 'Track 1', artist: 'Artist A', duration: 184 },
    { id: 2, title: 'Track 2', artist: 'Artist B', duration: 221 },
    { id: 3, title: 'Track 3', artist: 'Artist C', duration: 197 },
    { id: 4, title: 'Track 4', artist: 'Artist D', duration: 240 },
    { id: 5, title: 'Track 5', artist: 'Artist E', duration: 178 },
    { id: 6, title: 'Track 6', artist: 'Artist F', duration: 205 },
    { id: 7, title: 'Track 7', artist: 'Artist G', duration: 193 },
    { id: 8, title: 'Track 8', artist: 'Artist H', duration: 230 },
    { id: 9, title: 'Track 9', artist: 'Artist I', duration: 210 },
    { id: 10, title: 'Track 10', artist: 'Artist J', duration: 245 },
  ];

  // Load mock data
  useEffect(() => {
    // This would be an API call in production
    const mockPlaylists = Array(30).fill().map((_, i) => ({
      id: i + 1,
      title: `Playlist ${i + 1}`,
      description: `Description for Playlist ${i + 1}. This is a ${i % 3 === 0 ? 'featured' : 'regular'} playlist curated by our team.`,
      category: categories[Math.floor(Math.random() * categories.length)],
      coverImage: `https://via.placeholder.com/300?text=Playlist+${i+1}`,
      followers: Math.floor(Math.random() * 1000000),
      isFeatured: i % 3 === 0,
      isPublic: Math.random() > 0.2,
      createdAt: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toLocaleDateString(),
      updatedAt: new Date(Date.now() - Math.floor(Math.random() * 1000000000)).toLocaleDateString(),
      tracks: Array(Math.floor(Math.random() * 10) + 5).fill().map(() => {
        const randomTrack = allTracks[Math.floor(Math.random() * allTracks.length)];
        return { ...randomTrack };
      }),
      curatedBy: Math.random() > 0.7 ? 'User Curator' : 'Musicify Team',
    }));
    
    setPlaylists(mockPlaylists);
    setFilteredPlaylists(mockPlaylists);
  }, []);
  
  // Filter playlists based on search term and category
  useEffect(() => {
    let filtered = playlists;
    
    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(playlist => 
        playlist.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        playlist.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        playlist.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply category filter
    if (categoryFilter !== 'all') {
      if (categoryFilter === 'featured') {
        filtered = filtered.filter(playlist => playlist.isFeatured);
      } else {
        filtered = filtered.filter(playlist => playlist.category === categoryFilter);
      }
    }
    
    setFilteredPlaylists(filtered);
    setPage(1);
  }, [searchTerm, categoryFilter, playlists]);
  
  // Helper functions
  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };
  
  const formatFollowers = (followers) => {
    if (followers >= 1000000) {
      return `${(followers / 1000000).toFixed(1)}M`;
    } else if (followers >= 1000) {
      return `${(followers / 1000).toFixed(1)}K`;
    }
    return followers;
  };
  
  // Handle page change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  
  // Handle search
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };
  
  // Handle filter menu
  const handleFilterClick = (event) => {
    setFilterAnchorEl(event.currentTarget);
  };
  
  const handleFilterMenuClose = () => {
    setFilterAnchorEl(null);
  };
  
  // Handle category filter change
  const handleCategoryFilterChange = (event) => {
    setCategoryFilter(event.target.value);
    handleFilterMenuClose();
  };
  
  // Handle playlist dialog
  const handleOpenDialog = (playlist = null) => {
    if (playlist) {
      setSelectedPlaylist(playlist);
      setFormData({
        title: playlist.title,
        description: playlist.description,
        category: playlist.category,
        coverImage: playlist.coverImage,
        isFeatured: playlist.isFeatured,
        isPublic: playlist.isPublic,
        tracks: playlist.tracks,
        curatedBy: playlist.curatedBy,
      });
    } else {
      setSelectedPlaylist(null);
      setFormData({
        title: '',
        description: '',
        category: '',
        coverImage: 'https://via.placeholder.com/300?text=New+Playlist',
        isFeatured: false,
        isPublic: true,
        tracks: [],
        curatedBy: 'Musicify Team',
      });
    }
    setDialogOpen(true);
  };
  
  const handleCloseDialog = () => {
    setDialogOpen(false);
  };
  
  // Handle tracks dialog
  const handleOpenTracksDialog = () => {
    setTracksDialogOpen(true);
  };
  
  const handleCloseTracksDialog = () => {
    setTracksDialogOpen(false);
  };
  
  // Handle delete dialog
  const handleOpenDeleteDialog = (playlistId) => {
    setSelectedPlaylistId(playlistId);
    setDeleteDialogOpen(true);
  };
  
  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
  };
  
  // Handle form input change
  const handleFormInputChange = (event) => {
    const { name, value, checked } = event.target;
    setFormData({
      ...formData,
      [name]: name === 'isFeatured' || name === 'isPublic' ? checked : value,
    });
  };
  
  // Handle track selection
  const handleTrackSelection = (track) => {
    const existingTrack = formData.tracks.find(t => t.id === track.id);
    
    if (existingTrack) {
      // Remove the track
      setFormData({
        ...formData,
        tracks: formData.tracks.filter(t => t.id !== track.id)
      });
    } else {
      // Add the track
      setFormData({
        ...formData,
        tracks: [...formData.tracks, track]
      });
    }
  };
  
  // Handle playlist action menu
  const handlePlaylistActionClick = (event, playlistId) => {
    setActionMenuAnchorEl(event.currentTarget);
    setSelectedPlaylistId(playlistId);
  };
  
  const handlePlaylistActionClose = () => {
    setActionMenuAnchorEl(null);
    setSelectedPlaylistId(null);
  };
  
  // Handle playlist actions
  const handleEditPlaylist = () => {
    const playlist = playlists.find(p => p.id === selectedPlaylistId);
    handlePlaylistActionClose();
    handleOpenDialog(playlist);
  };
  
  const handleDeletePlaylist = () => {
    handlePlaylistActionClose();
    handleOpenDeleteDialog(selectedPlaylistId);
  };
  
  const confirmDeletePlaylist = () => {
    // In a real app, this would call an API to delete the playlist
    const updatedPlaylists = playlists.filter(playlist => playlist.id !== selectedPlaylistId);
    setPlaylists(updatedPlaylists);
    handleCloseDeleteDialog();
    showNotification('Playlist deleted successfully', 'success');
  };
  
  // Handle save playlist
  const handleSavePlaylist = () => {
    // Validation
    if (!formData.title || !formData.description || !formData.category) {
      showNotification('Please fill in all required fields', 'error');
      return;
    }
    
    if (formData.tracks.length === 0) {
      showNotification('Playlist must contain at least one track', 'error');
      return;
    }
    
    if (selectedPlaylist) {
      // Update existing playlist
      const updatedPlaylists = playlists.map(playlist => {
        if (playlist.id === selectedPlaylist.id) {
          return {
            ...playlist,
            title: formData.title,
            description: formData.description,
            category: formData.category,
            coverImage: formData.coverImage,
            isFeatured: formData.isFeatured,
            isPublic: formData.isPublic,
            tracks: formData.tracks,
            updatedAt: new Date().toLocaleDateString(),
            curatedBy: formData.curatedBy,
          };
        }
        return playlist;
      });
      setPlaylists(updatedPlaylists);
      showNotification('Playlist updated successfully', 'success');
    } else {
      // Create new playlist
      const newPlaylist = {
        id: playlists.length + 1,
        title: formData.title,
        description: formData.description,
        category: formData.category,
        coverImage: formData.coverImage,
        followers: 0,
        isFeatured: formData.isFeatured,
        isPublic: formData.isPublic,
        tracks: formData.tracks,
        createdAt: new Date().toLocaleDateString(),
        updatedAt: new Date().toLocaleDateString(),
        curatedBy: formData.curatedBy,
      };
      setPlaylists([...playlists, newPlaylist]);
      showNotification('Playlist created successfully', 'success');
    }
    handleCloseDialog();
  };
  
  // Calculate pagination
  const count = Math.ceil(filteredPlaylists.length / rowsPerPage);
  const currentPlaylists = filteredPlaylists.slice((page - 1) * rowsPerPage, page * rowsPerPage);
  
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
          <Typography variant="h4" sx={{ fontWeight: 700 }}>Playlist Management</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            Create and manage curated playlists for your users
          </Typography>
        </Box>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
        >
          Create Playlist
        </Button>
      </Stack>
      
      {/* Search and filters */}
      <Stack 
        direction={{ xs: 'column', sm: 'row' }} 
        spacing={2} 
        alignItems="center" 
        sx={{ mb: 3 }}
      >
        <TextField
          placeholder="Search playlists"
          variant="outlined"
          size="small"
          fullWidth
          value={searchTerm}
          onChange={handleSearch}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{ flexGrow: 1 }}
        />
        <Button
          variant="outlined"
          startIcon={<FilterListIcon />}
          onClick={handleFilterClick}
          sx={{ width: { xs: '100%', sm: 'auto' } }}
        >
          Filter
        </Button>
      </Stack>
      
      {/* Filter menu */}
      <Menu
        anchorEl={filterAnchorEl}
        open={Boolean(filterAnchorEl)}
        onClose={handleFilterMenuClose}
      >
        <Box sx={{ p: 2, width: 200 }}>
          <Typography variant="subtitle2" sx={{ mb: 1.5 }}>Filter by Category</Typography>
          <FormControl fullWidth size="small">
            <Select
              value={categoryFilter}
              onChange={handleCategoryFilterChange}
              displayEmpty
            >
              <MenuItem value="all">All Categories</MenuItem>
              <MenuItem value="featured">Featured Playlists</MenuItem>
              <Divider />
              {categories.map((category) => (
                <MenuItem key={category} value={category}>{category}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Menu>
      
      {/* Playlists Grid */}
      <Grid container spacing={3}>
        {currentPlaylists.map((playlist) => (
          <Grid item xs={12} sm={6} md={4} key={playlist.id}>
            <Card
              elevation={3}
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                transition: 'transform 0.2s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                },
              }}
            >
              {playlist.isFeatured && (
                <Chip
                  label="Featured"
                  color="primary"
                  size="small"
                  sx={{
                    position: 'absolute',
                    top: 10,
                    right: 10,
                    zIndex: 1,
                    fontWeight: 600,
                  }}
                />
              )}
              <CardMedia
                component="img"
                height="180"
                image={playlist.coverImage}
                alt={playlist.title}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" component="div" gutterBottom>
                  {playlist.title}
                </Typography>
                <Typography 
                  variant="body2" 
                  color="text.secondary"
                  sx={{
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    mb: 2,
                    height: '40px',
                  }}
                >
                  {playlist.description}
                </Typography>
                
                <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
                  <Chip 
                    label={playlist.category} 
                    size="small"
                    sx={{ 
                      bgcolor: 'rgba(29, 185, 84, 0.1)', 
                      color: '#1DB954',
                      fontWeight: 500,
                    }}
                  />
                  {!playlist.isPublic && (
                    <Chip 
                      label="Private" 
                      size="small"
                      sx={{ 
                        bgcolor: 'rgba(255, 255, 255, 0.1)',
                        fontWeight: 500,
                      }}
                    />
                  )}
                </Stack>
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <QueueMusicIcon sx={{ fontSize: 16, color: 'text.secondary', mr: 0.5 }} />
                    <Typography variant="caption" color="text.secondary">
                      {playlist.tracks.length} tracks
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <PersonIcon sx={{ fontSize: 16, color: 'text.secondary', mr: 0.5 }} />
                    <Typography variant="caption" color="text.secondary">
                      {formatFollowers(playlist.followers)} followers
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
              <Divider />
              <CardActions sx={{ justifyContent: 'space-between', p: 1 }}>
                <Typography variant="caption" color="text.secondary">
                  Updated {playlist.updatedAt}
                </Typography>
                <IconButton
                  size="small"
                  onClick={(e) => handlePlaylistActionClick(e, playlist.id)}
                >
                  <MoreVertIcon fontSize="small" />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      
      {/* Empty state */}
      {currentPlaylists.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <PlaylistAddIcon sx={{ fontSize: 60, color: 'text.secondary', opacity: 0.5, mb: 2 }} />
          <Typography variant="h6" color="text.secondary">
            No playlists found
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Try changing your search or filters
          </Typography>
          <Button 
            variant="contained" 
            color="primary"
            onClick={() => {
              setSearchTerm('');
              setCategoryFilter('all');
            }}
          >
            Clear Filters
          </Button>
        </Box>
      )}
      
      {/* Pagination */}
      {currentPlaylists.length > 0 && (
        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
          <Pagination 
            count={count} 
            page={page} 
            onChange={handleChangePage}
            color="primary"
            showFirstButton
            showLastButton
          />
        </Box>
      )}
      
      {/* Playlist Action Menu */}
      <Menu
        anchorEl={actionMenuAnchorEl}
        open={Boolean(actionMenuAnchorEl)}
        onClose={handlePlaylistActionClose}
      >
        <MenuItem onClick={handleEditPlaylist}>
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Edit</ListItemText>
        </MenuItem>
        <MenuItem 
          onClick={() => {
            handlePlaylistActionClose();
            const playlist = playlists.find(p => p.id === selectedPlaylistId);
            showNotification(`Viewing ${playlist.title} details`, 'info');
          }}
        >
          <ListItemIcon>
            <VisibilityIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>View Details</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleDeletePlaylist} sx={{ color: 'error.main' }}>
          <ListItemIcon sx={{ color: 'error.main' }}>
            <DeleteIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Delete</ListItemText>
        </MenuItem>
      </Menu>
      
      {/* Playlist Dialog */}
      <Dialog 
        open={dialogOpen} 
        onClose={handleCloseDialog}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>
          {selectedPlaylist ? 'Edit Playlist' : 'Create New Playlist'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={3} sx={{ mt: 0 }}>
            <Grid item xs={12} md={4}>
              <Box sx={{ position: 'relative' }}>
                <Box
                  component="img"
                  src={formData.coverImage || 'https://via.placeholder.com/300?text=Playlist+Cover'}
                  alt="Playlist Cover"
                  sx={{
                    width: '100%',
                    borderRadius: 2,
                    aspectRatio: '1/1',
                    objectFit: 'cover',
                    mb: 2,
                  }}
                />
                <Button
                  variant="contained"
                  component="label"
                  fullWidth
                >
                  Upload Cover
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={() => {
                      // In a real app, this would upload the file
                      showNotification('Cover image upload functionality would be implemented here', 'info');
                    }}
                  />
                </Button>
              </Box>
              
              <Paper sx={{ p: 2, mt: 2 }} variant="outlined">
                <Typography variant="subtitle2" gutterBottom>Selected Tracks</Typography>
                <Divider sx={{ mb: 1 }} />
                
                {formData.tracks.length === 0 ? (
                  <Typography variant="body2" color="text.secondary" align="center" sx={{ py: 2 }}>
                    No tracks selected
                  </Typography>
                ) : (
                  <List dense sx={{ maxHeight: 200, overflow: 'auto' }}>
                    {formData.tracks.map((track, index) => (
                      <ListItem 
                        key={track.id} 
                        disablePadding 
                        secondaryAction={
                          <IconButton 
                            edge="end" 
                            size="small"
                            onClick={() => handleTrackSelection(track)}
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        }
                      >
                        <ListItemAvatar sx={{ minWidth: 36 }}>
                          <Avatar sx={{ width: 24, height: 24, bgcolor: 'primary.main', fontSize: '0.75rem' }}>
                            {index + 1}
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText 
                          primary={track.title}
                          secondary={track.artist}
                          primaryTypographyProps={{ variant: 'body2', noWrap: true }}
                          secondaryTypographyProps={{ variant: 'caption', noWrap: true }}
                        />
                      </ListItem>
                    ))}
                  </List>
                )}
                
                <Button
                  variant="outlined"
                  fullWidth
                  startIcon={<PlaylistAddIcon />}
                  onClick={handleOpenTracksDialog}
                  sx={{ mt: 1 }}
                >
                  Manage Tracks
                </Button>
              </Paper>
            </Grid>
            
            <Grid item xs={12} md={8}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    label="Playlist Title"
                    name="title"
                    value={formData.title}
                    onChange={handleFormInputChange}
                    fullWidth
                    required
                    margin="dense"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Description"
                    name="description"
                    value={formData.description}
                    onChange={handleFormInputChange}
                    fullWidth
                    required
                    multiline
                    rows={3}
                    margin="dense"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth margin="dense">
                    <InputLabel>Category</InputLabel>
                    <Select
                      name="category"
                      value={formData.category}
                      onChange={handleFormInputChange}
                      label="Category"
                      required
                    >
                      {categories.map((category) => (
                        <MenuItem key={category} value={category}>{category}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Curated By"
                    name="curatedBy"
                    value={formData.curatedBy}
                    onChange={handleFormInputChange}
                    fullWidth
                    margin="dense"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={formData.isFeatured}
                        onChange={handleFormInputChange}
                        name="isFeatured"
                        color="primary"
                      />
                    }
                    label="Feature on Homepage"
                    sx={{ mt: 2 }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={formData.isPublic}
                        onChange={handleFormInputChange}
                        name="isPublic"
                        color="primary"
                      />
                    }
                    label="Public Playlist"
                    sx={{ mt: 2 }}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button 
            onClick={handleSavePlaylist} 
            variant="contained" 
            color="primary"
            disabled={formData.tracks.length === 0}
          >
            {selectedPlaylist ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
      
      {/* Track Selection Dialog */}
      <Dialog
        open={tracksDialogOpen}
        onClose={handleCloseTracksDialog}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>Manage Playlist Tracks</DialogTitle>
        <DialogContent>
          <TextField
            placeholder="Search tracks"
            variant="outlined"
            fullWidth
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            sx={{ mb: 2 }}
          />
          
          <TableContainer component={Paper} variant="outlined">
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox">
                    <Checkbox
                      indeterminate={formData.tracks.length > 0 && formData.tracks.length < allTracks.length}
                      checked={formData.tracks.length === allTracks.length}
                      onChange={() => {
                        if (formData.tracks.length === allTracks.length) {
                          setFormData({...formData, tracks: []});
                        } else {
                          setFormData({...formData, tracks: [...allTracks]});
                        }
                      }}
                    />
                  </TableCell>
                  <TableCell>Track</TableCell>
                  <TableCell>Artist</TableCell>
                  <TableCell align="right">Duration</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {allTracks.map((track) => {
                  const isSelected = formData.tracks.some(t => t.id === track.id);
                  return (
                    <TableRow
                      key={track.id}
                      hover
                      selected={isSelected}
                      onClick={() => handleTrackSelection(track)}
                      sx={{ cursor: 'pointer' }}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox checked={isSelected} />
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <MusicNoteIcon sx={{ mr: 1, fontSize: 16, color: isSelected ? 'primary.main' : 'inherit' }} />
                          {track.title}
                        </Box>
                      </TableCell>
                      <TableCell>{track.artist}</TableCell>
                      <TableCell align="right">{formatDuration(track.duration)}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions>
          <Typography variant="body2" sx={{ flexGrow: 1, pl: 2 }}>
            {formData.tracks.length} tracks selected
          </Typography>
          <Button onClick={handleCloseTracksDialog}>Cancel</Button>
          <Button 
            onClick={handleCloseTracksDialog} 
            variant="contained" 
            color="primary"
          >
            Confirm Selection
          </Button>
        </DialogActions>
      </Dialog>
      
      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={handleCloseDeleteDialog}
      >
        <DialogTitle>Delete Playlist</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this playlist? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog}>Cancel</Button>
          <Button 
            onClick={confirmDeletePlaylist} 
            color="error"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default PlaylistManagement;