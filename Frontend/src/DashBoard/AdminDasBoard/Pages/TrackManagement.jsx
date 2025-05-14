import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
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
  Grid,
  Menu,
  ListItemIcon,
  ListItemText,
  FormControlLabel,
  Switch,
  Slider,
  Autocomplete,
} from '@mui/material';

// Icons
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

function TrackManagement({ showNotification }) {
  // State management
  const [tracks, setTracks] = useState([]);
  const [filteredTracks, setFilteredTracks] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedTrack, setSelectedTrack] = useState(null);
  const [filterAnchorEl, setFilterAnchorEl] = useState(null);
  const [genreFilter, setGenreFilter] = useState('all');
  const [actionMenuAnchorEl, setActionMenuAnchorEl] = useState(null);
  const [selectedTrackId, setSelectedTrackId] = useState(null);
  
  // Form state
  const [formData, setFormData] = useState({
    title: '',
    artist: '',
    album: '',
    genre: '',
    duration: 0,
    releaseDate: '',
    isExplicit: false,
    featuredArtists: [],
  });
  
  const genres = [
    'Pop', 'Rock', 'Hip Hop', 'R&B', 'Country', 'Electronic', 'Jazz', 'Classical', 'Reggae', 'Folk', 'Metal', 'Blues'
  ];
  
  const artists = [
    'The Weeknd', 'Taylor Swift', 'Drake', 'Billie Eilish', 'Ed Sheeran', 'Ariana Grande', 'Post Malone', 
    'Dua Lipa', 'Justin Bieber', 'BTS', 'Lady Gaga', 'Harry Styles'
  ];

  // Load mock data
  useEffect(() => {
    // This would be an API call in production
    const mockTracks = Array(100).fill().map((_, i) => ({
      id: i + 1,
      title: `Track ${i + 1}`,
      artist: artists[Math.floor(Math.random() * artists.length)],
      album: `Album ${Math.floor(i / 10) + 1}`,
      genre: genres[Math.floor(Math.random() * genres.length)],
      duration: Math.floor(Math.random() * 300) + 120, // 2-7 minutes in seconds
      plays: Math.floor(Math.random() * 10000000),
      releaseDate: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toLocaleDateString(),
      isExplicit: Math.random() > 0.7,
      featuredArtists: Math.random() > 0.7 ? [artists[Math.floor(Math.random() * artists.length)]] : [],
    }));
    
    setTracks(mockTracks);
    setFilteredTracks(mockTracks);
  }, []);
  
  // Filter tracks based on search term and genre
  useEffect(() => {
    let filtered = tracks;
    
    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(track => 
        track.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        track.artist.toLowerCase().includes(searchTerm.toLowerCase()) ||
        track.album.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply genre filter
    if (genreFilter !== 'all') {
      filtered = filtered.filter(track => track.genre === genreFilter);
    }
    
    setFilteredTracks(filtered);
    setPage(0);
  }, [searchTerm, genreFilter, tracks]);
  
  // Helper functions
  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };
  
  const formatPlays = (plays) => {
    if (plays >= 1000000) {
      return `${(plays / 1000000).toFixed(1)}M`;
    } else if (plays >= 1000) {
      return `${(plays / 1000).toFixed(1)}K`;
    }
    return plays;
  };
  
  // Handle page change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  
  // Handle rows per page change
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
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
  
  // Handle genre filter change
  const handleGenreFilterChange = (event) => {
    setGenreFilter(event.target.value);
    handleFilterMenuClose();
  };
  
  // Handle track dialog
  const handleOpenDialog = (track = null) => {
    if (track) {
      setSelectedTrack(track);
      setFormData({
        title: track.title,
        artist: track.artist,
        album: track.album,
        genre: track.genre,
        duration: track.duration,
        releaseDate: track.releaseDate,
        isExplicit: track.isExplicit,
        featuredArtists: track.featuredArtists,
      });
    } else {
      setSelectedTrack(null);
      setFormData({
        title: '',
        artist: '',
        album: '',
        genre: '',
        duration: 180,
        releaseDate: new Date().toLocaleDateString(),
        isExplicit: false,
        featuredArtists: [],
      });
    }
    setDialogOpen(true);
  };
  
  const handleCloseDialog = () => {
    setDialogOpen(false);
  };
  
  // Handle delete dialog
  const handleOpenDeleteDialog = (trackId) => {
    setSelectedTrackId(trackId);
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
      [name]: name === 'isExplicit' ? checked : value,
    });
  };
  
  // Handle featured artists change
  const handleFeaturedArtistsChange = (event, newValue) => {
    setFormData({
      ...formData,
      featuredArtists: newValue,
    });
  };
  
  // Handle track action menu
  const handleTrackActionClick = (event, trackId) => {
    setActionMenuAnchorEl(event.currentTarget);
    setSelectedTrackId(trackId);
  };
  
  const handleTrackActionClose = () => {
    setActionMenuAnchorEl(null);
    setSelectedTrackId(null);
  };
  
  // Handle track actions
  const handleEditTrack = () => {
    const track = tracks.find(t => t.id === selectedTrackId);
    handleTrackActionClose();
    handleOpenDialog(track);
  };
  
  const handleDeleteTrack = () => {
    handleTrackActionClose();
    handleOpenDeleteDialog(selectedTrackId);
  };
  
  const confirmDeleteTrack = () => {
    // In a real app, this would call an API to delete the track
    const updatedTracks = tracks.filter(track => track.id !== selectedTrackId);
    setTracks(updatedTracks);
    handleCloseDeleteDialog();
    showNotification('Track deleted successfully', 'success');
  };
  
  // Handle save track
  const handleSaveTrack = () => {
    // Validation
    if (!formData.title || !formData.artist || !formData.album || !formData.genre) {
      showNotification('Please fill in all required fields', 'error');
      return;
    }
    
    if (selectedTrack) {
      // Update existing track
      const updatedTracks = tracks.map(track => {
        if (track.id === selectedTrack.id) {
          return {
            ...track,
            title: formData.title,
            artist: formData.artist,
            album: formData.album,
            genre: formData.genre,
            duration: formData.duration,
            releaseDate: formData.releaseDate,
            isExplicit: formData.isExplicit,
            featuredArtists: formData.featuredArtists,
          };
        }
        return track;
      });
      setTracks(updatedTracks);
      showNotification('Track updated successfully', 'success');
    } else {
      // Create new track
      const newTrack = {
        id: tracks.length + 1,
        title: formData.title,
        artist: formData.artist,
        album: formData.album,
        genre: formData.genre,
        duration: formData.duration,
        plays: 0,
        releaseDate: formData.releaseDate,
        isExplicit: formData.isExplicit,
        featuredArtists: formData.featuredArtists,
      };
      setTracks([...tracks, newTrack]);
      showNotification('Track created successfully', 'success');
    }
    handleCloseDialog();
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
          <Typography variant="h4" sx={{ fontWeight: 700 }}>Track Management</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            Manage your music tracks, metadata, and playback settings
          </Typography>
        </Box>
        <Stack 
          direction="row" 
          spacing={1}
          sx={{ 
            width: { xs: '100%', md: 'auto' },
            justifyContent: { xs: 'center', md: 'flex-start' }
          }}
        >
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={() => handleOpenDialog()}
          >
            Add Track
          </Button>
          <Button
            variant="outlined"
            startIcon={<CloudUploadIcon />}
            onClick={() => showNotification('Bulk upload started', 'info')}
          >
            Bulk Upload
          </Button>
        </Stack>
      </Stack>
      
      {/* Search and filters */}
      <Stack 
        direction={{ xs: 'column', sm: 'row' }} 
        spacing={2} 
        alignItems="center" 
        sx={{ mb: 3 }}
      >
        <TextField
          placeholder="Search tracks"
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
          <Typography variant="subtitle2" sx={{ mb: 1.5 }}>Filter by Genre</Typography>
          <FormControl fullWidth size="small">
            <Select
              value={genreFilter}
              onChange={handleGenreFilterChange}
              displayEmpty
            >
              <MenuItem value="all">All Genres</MenuItem>
              {genres.map((genre) => (
                <MenuItem key={genre} value={genre}>{genre}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Menu>
      
      {/* Tracks Table */}
      <Paper sx={{ width: '100%', overflow: 'hidden', mb: 3 }}>
        <TableContainer sx={{ maxHeight: 600 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell width="40%">Track Information</TableCell>
                <TableCell>Album</TableCell>
                <TableCell>Genre</TableCell>
                <TableCell>Duration</TableCell>
                <TableCell>Plays</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredTracks
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((track) => (
                  <TableRow hover key={track.id}>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box 
                          sx={{ 
                            width: 40, 
                            height: 40, 
                            bgcolor: 'rgba(30, 30, 30, 0.7)', 
                            borderRadius: 1,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            mr: 2,
                          }}
                        >
                          <MusicNoteIcon />
                        </Box>
                        <Box>
                          <Typography variant="body1" sx={{ fontWeight: 500 }}>
                            {track.title}
                            {track.isExplicit && (
                              <Chip 
                                label="Explicit" 
                                size="small"
                                sx={{ 
                                  ml: 1, 
                                  height: 20, 
                                  fontSize: '0.7rem',
                                  bgcolor: 'rgba(255,255,255,0.1)',
                                }}
                              />
                            )}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {track.artist}
                            {track.featuredArtists.length > 0 && ` ft. ${track.featuredArtists.join(', ')}`}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>{track.album}</TableCell>
                    <TableCell>
                      <Chip 
                        label={track.genre} 
                        size="small"
                        sx={{ 
                          bgcolor: 'rgba(29, 185, 84, 0.1)',
                          color: '#1DB954',
                          fontWeight: 500,
                        }}
                      />
                    </TableCell>
                    <TableCell>{formatDuration(track.duration)}</TableCell>
                    <TableCell>{formatPlays(track.plays)}</TableCell>
                    <TableCell align="right">
                      <IconButton
                        size="small"
                        onClick={() => showNotification(`Playing: ${track.title}`, 'info')}
                      >
                        <PlayArrowIcon fontSize="small" />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={(e) => handleTrackActionClick(e, track.id)}
                      >
                        <MoreVertIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 50, 100]}
          component="div"
          count={filteredTracks.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      
      {/* Track Action Menu */}
      <Menu
        anchorEl={actionMenuAnchorEl}
        open={Boolean(actionMenuAnchorEl)}
        onClose={handleTrackActionClose}
      >
        <MenuItem onClick={handleEditTrack}>
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Edit</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleDeleteTrack}>
          <ListItemIcon>
            <DeleteIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Delete</ListItemText>
        </MenuItem>
      </Menu>
      
      {/* Track Dialog */}
      <Dialog 
        open={dialogOpen} 
        onClose={handleCloseDialog}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>
          {selectedTrack ? 'Edit Track' : 'Add New Track'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={3} sx={{ mt: 0 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Track Title"
                name="title"
                value={formData.title}
                onChange={handleFormInputChange}
                fullWidth
                required
                margin="dense"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Artist"
                name="artist"
                value={formData.artist}
                onChange={handleFormInputChange}
                fullWidth
                required
                margin="dense"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Album"
                name="album"
                value={formData.album}
                onChange={handleFormInputChange}
                fullWidth
                required
                margin="dense"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth margin="dense">
                <InputLabel id="genre-select-label">Genre</InputLabel>
                <Select
                  labelId="genre-select-label"
                  name="genre"
                  value={formData.genre}
                  onChange={handleFormInputChange}
                  label="Genre"
                  required
                >
                  {genres.map((genre) => (
                    <MenuItem key={genre} value={genre}>{genre}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Autocomplete
                multiple
                id="featured-artists"
                options={artists}
                value={formData.featuredArtists}
                onChange={handleFeaturedArtistsChange}
                renderInput={(params) => (
                  <TextField 
                    {...params} 
                    label="Featured Artists"
                    margin="dense"
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Release Date"
                name="releaseDate"
                value={formData.releaseDate}
                onChange={handleFormInputChange}
                fullWidth
                margin="dense"
              />
            </Grid>
            <Grid item xs={12}>
              <Typography gutterBottom>
                Duration: {formatDuration(formData.duration)}
              </Typography>
              <Slider
                value={formData.duration}
                min={30}
                max={600}
                step={1}
                onChange={(e, newValue) => setFormData({ ...formData, duration: newValue })}
                valueLabelDisplay="auto"
                valueLabelFormat={formatDuration}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.isExplicit}
                    onChange={handleFormInputChange}
                    name="isExplicit"
                    color="primary"
                  />
                }
                label="Explicit Content"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button 
            onClick={handleSaveTrack} 
            variant="contained" 
            color="primary"
          >
            {selectedTrack ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
      
      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={handleCloseDeleteDialog}
      >
        <DialogTitle>Delete Track</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this track? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog}>Cancel</Button>
          <Button 
            onClick={confirmDeleteTrack} 
            color="error"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default TrackManagement;