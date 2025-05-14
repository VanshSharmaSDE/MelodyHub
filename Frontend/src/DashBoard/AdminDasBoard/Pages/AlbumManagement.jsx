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
} from '@mui/material';

// Icons
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import AlbumIcon from '@mui/icons-material/Album';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ViewListIcon from '@mui/icons-material/ViewList';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import DateRangeIcon from '@mui/icons-material/DateRange';

function AlbumManagement({ showNotification }) {
  // State management
  const [albums, setAlbums] = useState([]);
  const [filteredAlbums, setFilteredAlbums] = useState([]);
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(12);
  const [searchTerm, setSearchTerm] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [filterAnchorEl, setFilterAnchorEl] = useState(null);
  const [genreFilter, setGenreFilter] = useState('all');
  const [actionMenuAnchorEl, setActionMenuAnchorEl] = useState(null);
  const [selectedAlbumId, setSelectedAlbumId] = useState(null);
  const [viewMode, setViewMode] = useState('grid');
  
  // Form state
  const [formData, setFormData] = useState({
    title: '',
    artist: '',
    genre: '',
    releaseDate: '',
    trackCount: 0,
    isFeatured: false,
    description: '',
    coverImage: '',
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
    const mockAlbums = Array(50).fill().map((_, i) => ({
      id: i + 1,
      title: `Album ${i + 1}`,
      artist: artists[Math.floor(Math.random() * artists.length)],
      genre: genres[Math.floor(Math.random() * genres.length)],
      releaseDate: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toLocaleDateString(),
      coverImage: `https://via.placeholder.com/300?text=Album+${i+1}`,
      trackCount: Math.floor(Math.random() * 15) + 5,
      isFeatured: Math.random() > 0.8,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget ultricies ultrices.',
    }));
    
    setAlbums(mockAlbums);
    setFilteredAlbums(mockAlbums);
  }, []);
  
  // Filter albums based on search term and genre
  useEffect(() => {
    let filtered = albums;
    
    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(album => 
        album.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        album.artist.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply genre filter
    if (genreFilter !== 'all') {
      filtered = filtered.filter(album => album.genre === genreFilter);
    }
    
    setFilteredAlbums(filtered);
    setPage(1);
  }, [searchTerm, genreFilter, albums]);
  
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
  
  // Handle genre filter change
  const handleGenreFilterChange = (event) => {
    setGenreFilter(event.target.value);
    handleFilterMenuClose();
  };
  
  // Handle view mode change
  const handleViewModeChange = (mode) => {
    setViewMode(mode);
  };
  
  // Handle album dialog
  const handleOpenDialog = (album = null) => {
    if (album) {
      setSelectedAlbum(album);
      setFormData({
        title: album.title,
        artist: album.artist,
        genre: album.genre,
        releaseDate: album.releaseDate,
        trackCount: album.trackCount,
        isFeatured: album.isFeatured,
        description: album.description,
        coverImage: album.coverImage,
      });
    } else {
      setSelectedAlbum(null);
      setFormData({
        title: '',
        artist: '',
        genre: '',
        releaseDate: new Date().toLocaleDateString(),
        trackCount: 1,
        isFeatured: false,
        description: '',
        coverImage: 'https://via.placeholder.com/300?text=New+Album',
      });
    }
    setDialogOpen(true);
  };
  
  const handleCloseDialog = () => {
    setDialogOpen(false);
  };
  
  // Handle delete dialog
  const handleOpenDeleteDialog = (albumId) => {
    setSelectedAlbumId(albumId);
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
      [name]: name === 'isFeatured' ? checked : (name === 'trackCount' ? parseInt(value) : value),
    });
  };
  
  // Handle album action menu
  const handleAlbumActionClick = (event, albumId) => {
    setActionMenuAnchorEl(event.currentTarget);
    setSelectedAlbumId(albumId);
  };
  
  const handleAlbumActionClose = () => {
    setActionMenuAnchorEl(null);
    setSelectedAlbumId(null);
  };
  
  // Handle album actions
  const handleEditAlbum = () => {
    const album = albums.find(a => a.id === selectedAlbumId);
    handleAlbumActionClose();
    handleOpenDialog(album);
  };
  
  const handleDeleteAlbum = () => {
    handleAlbumActionClose();
    handleOpenDeleteDialog(selectedAlbumId);
  };
  
  const confirmDeleteAlbum = () => {
    // In a real app, this would call an API to delete the album
    const updatedAlbums = albums.filter(album => album.id !== selectedAlbumId);
    setAlbums(updatedAlbums);
    handleCloseDeleteDialog();
    showNotification('Album deleted successfully', 'success');
  };
  
  // Handle save album
  const handleSaveAlbum = () => {
    // Validation
    if (!formData.title || !formData.artist || !formData.genre) {
      showNotification('Please fill in all required fields', 'error');
      return;
    }
    
    if (selectedAlbum) {
      // Update existing album
      const updatedAlbums = albums.map(album => {
        if (album.id === selectedAlbum.id) {
          return {
            ...album,
            title: formData.title,
            artist: formData.artist,
            genre: formData.genre,
            releaseDate: formData.releaseDate,
            trackCount: formData.trackCount,
            isFeatured: formData.isFeatured,
            description: formData.description,
            coverImage: formData.coverImage,
          };
        }
        return album;
      });
      setAlbums(updatedAlbums);
      showNotification('Album updated successfully', 'success');
    } else {
      // Create new album
      const newAlbum = {
        id: albums.length + 1,
        title: formData.title,
        artist: formData.artist,
        genre: formData.genre,
        releaseDate: formData.releaseDate,
        trackCount: formData.trackCount,
        isFeatured: formData.isFeatured,
        description: formData.description,
        coverImage: formData.coverImage,
      };
      setAlbums([...albums, newAlbum]);
      showNotification('Album created successfully', 'success');
    }
    handleCloseDialog();
  };
  
  // Calculate pagination
  const count = Math.ceil(filteredAlbums.length / rowsPerPage);
  const currentAlbums = filteredAlbums.slice((page - 1) * rowsPerPage, page * rowsPerPage);
  
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
          <Typography variant="h4" sx={{ fontWeight: 700 }}>Album Management</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            Manage your albums, collections, and releases
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
            Add Album
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
      
      {/* Search, filters and view toggle */}
      <Stack 
        direction={{ xs: 'column', sm: 'row' }} 
        spacing={2} 
        justifyContent="space-between"
        alignItems={{ xs: 'stretch', sm: 'center' }}
        sx={{ mb: 3 }}
      >
        <TextField
          placeholder="Search albums"
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={handleSearch}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{ width: { xs: '100%', sm: '50%' } }}
        />
        
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            variant="outlined"
            startIcon={<FilterListIcon />}
            onClick={handleFilterClick}
          >
            Filter
          </Button>
          
          <Box sx={{ display: 'flex', border: 1, borderColor: 'divider', borderRadius: 1 }}>
            <IconButton 
              color={viewMode === 'list' ? 'primary' : 'default'}
              onClick={() => handleViewModeChange('list')}
            >
              <ViewListIcon />
            </IconButton>
            <IconButton
              color={viewMode === 'grid' ? 'primary' : 'default'}
              onClick={() => handleViewModeChange('grid')}
            >
              <ViewModuleIcon />
            </IconButton>
          </Box>
        </Box>
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
      
      {/* Albums Grid/List View */}
      {viewMode === 'grid' ? (
        <Grid container spacing={3}>
          {currentAlbums.map((album) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={album.id}>
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
                {album.isFeatured && (
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
                  height="220"
                  image={album.coverImage}
                  alt={album.title}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" component="div" gutterBottom>
                    {album.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {album.artist}
                  </Typography>
                  <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 2 }}>
                    <Chip 
                      label={album.genre} 
                      size="small"
                      sx={{ 
                        bgcolor: 'rgba(29, 185, 84, 0.1)', 
                        color: '#1DB954',
                        fontWeight: 500,
                      }}
                    />
                    <Typography variant="caption" color="text.secondary">
                      {album.trackCount} tracks
                    </Typography>
                  </Stack>
                  <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                    <CalendarTodayIcon sx={{ fontSize: 14, color: 'text.secondary', mr: 0.5 }} />
                    <Typography variant="caption" color="text.secondary">
                      {album.releaseDate}
                    </Typography>
                  </Box>
                </CardContent>
                <CardActions sx={{ justifyContent: 'flex-end', p: 1 }}>
                  <IconButton
                    size="small"
                    onClick={(e) => handleAlbumActionClick(e, album.id)}
                  >
                    <MoreVertIcon fontSize="small" />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Paper sx={{ width: '100%', mb: 3, overflowX: 'auto' }}>
          <Box sx={{ display: 'table', width: '100%', tableLayout: 'fixed' }}>
            {/* Table header */}
            <Box sx={{ display: 'table-header-group' }}>
              <Box sx={{ display: 'table-row', bgcolor: 'rgba(30, 30, 30, 0.6)' }}>
                <Box sx={{ display: 'table-cell', py: 1.5, px: 2, width: '40%' }}>Album</Box>
                <Box sx={{ display: 'table-cell', py: 1.5, px: 2 }}>Artist</Box>
                <Box sx={{ display: 'table-cell', py: 1.5, px: 2 }}>Genre</Box>
                <Box sx={{ display: 'table-cell', py: 1.5, px: 2 }}>Release Date</Box>
                <Box sx={{ display: 'table-cell', py: 1.5, px: 2 }}>Tracks</Box>
                <Box sx={{ display: 'table-cell', py: 1.5, px: 2, width: '100px' }}>Actions</Box>
              </Box>
            </Box>
            
            {/* Table body */}
            <Box sx={{ display: 'table-row-group' }}>
              {currentAlbums.map((album) => (
                <Box 
                  key={album.id} 
                  sx={{ 
                    display: 'table-row',
                    '&:hover': { bgcolor: 'rgba(30, 30, 30, 0.4)' },
                    borderBottom: 1,
                    borderColor: 'divider',
                  }}
                >
                  <Box 
                    sx={{ 
                      display: 'table-cell', 
                      py: 1.5, 
                      px: 2,
                      verticalAlign: 'middle',
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Box
                        component="img"
                        src={album.coverImage}
                        alt={album.title}
                        sx={{ 
                          width: 50, 
                          height: 50, 
                          borderRadius: 1,
                          mr: 2,
                          objectFit: 'cover',
                        }}
                      />
                      <Typography variant="body1" sx={{ fontWeight: 500 }}>
                        {album.title}
                        {album.isFeatured && (
                          <Chip 
                            label="Featured" 
                            color="primary" 
                            size="small" 
                            sx={{ ml: 1, height: 20, fontSize: '0.7rem' }} 
                          />
                        )}
                      </Typography>
                    </Box>
                  </Box>
                  <Box 
                    sx={{ 
                      display: 'table-cell', 
                      py: 1.5, 
                      px: 2,
                      verticalAlign: 'middle',
                    }}
                  >
                    {album.artist}
                  </Box>
                  <Box 
                    sx={{ 
                      display: 'table-cell', 
                      py: 1.5, 
                      px: 2,
                      verticalAlign: 'middle',
                    }}
                  >
                    <Chip 
                      label={album.genre} 
                      size="small"
                      sx={{ 
                        bgcolor: 'rgba(29, 185, 84, 0.1)', 
                        color: '#1DB954',
                        fontWeight: 500,
                      }}
                    />
                  </Box>
                  <Box 
                    sx={{ 
                      display: 'table-cell', 
                      py: 1.5, 
                      px: 2,
                      verticalAlign: 'middle',
                    }}
                  >
                    {album.releaseDate}
                  </Box>
                  <Box 
                    sx={{ 
                      display: 'table-cell', 
                      py: 1.5, 
                      px: 2,
                      verticalAlign: 'middle',
                    }}
                  >
                    {album.trackCount}
                  </Box>
                  <Box 
                    sx={{ 
                      display: 'table-cell', 
                      py: 1.5, 
                      px: 2,
                      verticalAlign: 'middle',
                    }}
                  >
                    <IconButton
                      size="small"
                      onClick={(e) => handleAlbumActionClick(e, album.id)}
                    >
                      <MoreVertIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        </Paper>
      )}
      
      {/* Pagination */}
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
      
      {/* Album Action Menu */}
      <Menu
        anchorEl={actionMenuAnchorEl}
        open={Boolean(actionMenuAnchorEl)}
        onClose={handleAlbumActionClose}
      >
        <MenuItem onClick={handleEditAlbum}>
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Edit</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleDeleteAlbum}>
          <ListItemIcon>
            <DeleteIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Delete</ListItemText>
        </MenuItem>
      </Menu>
      
      {/* Album Dialog */}
      <Dialog 
        open={dialogOpen} 
        onClose={handleCloseDialog}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>
          {selectedAlbum ? 'Edit Album' : 'Add New Album'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={3} sx={{ mt: 0 }}>
            <Grid item xs={12} md={4}>
              <Box sx={{ position: 'relative' }}>
                <Box
                  component="img"
                  src={formData.coverImage || 'https://via.placeholder.com/300?text=Album+Cover'}
                  alt="Album Cover"
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
            </Grid>
            <Grid item xs={12} md={8}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    label="Album Title"
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
                  <FormControl fullWidth margin="dense">
                    <InputLabel>Genre</InputLabel>
                    <Select
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
                  <TextField
                    label="Release Date"
                    name="releaseDate"
                    value={formData.releaseDate}
                    onChange={handleFormInputChange}
                    fullWidth
                    margin="dense"
                    placeholder="MM/DD/YYYY"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <DateRangeIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Track Count"
                    name="trackCount"
                    type="number"
                    value={formData.trackCount}
                    onChange={handleFormInputChange}
                    fullWidth
                    margin="dense"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <AlbumIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Description"
                    name="description"
                    value={formData.description}
                    onChange={handleFormInputChange}
                    fullWidth
                    multiline
                    rows={3}
                    margin="dense"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formData.isFeatured}
                        onChange={handleFormInputChange}
                        name="isFeatured"
                        color="primary"
                      />
                    }
                    label="Feature this album on homepage"
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button 
            onClick={handleSaveAlbum} 
            variant="contained" 
            color="primary"
          >
            {selectedAlbum ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
      
      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={handleCloseDeleteDialog}
      >
        <DialogTitle>Delete Album</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this album? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog}>Cancel</Button>
          <Button 
            onClick={confirmDeleteAlbum} 
            color="error"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default AlbumManagement;