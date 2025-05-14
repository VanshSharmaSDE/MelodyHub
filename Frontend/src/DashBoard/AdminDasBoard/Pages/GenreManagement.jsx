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
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
  Stack,
  Chip,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  List,
  ListItem,
  ListItemButton,
  ListItemAvatar,
  Avatar,
  Divider,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TablePagination,
  CircularProgress,
  Tooltip,
} from '@mui/material';

// Icons
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import CategoryIcon from '@mui/icons-material/Category';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ImageIcon from '@mui/icons-material/Image';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ViewStreamIcon from '@mui/icons-material/ViewStream';
import ViewModuleIcon from '@mui/icons-material/ViewModule';

function GenreManagement({ showNotification }) {
  // State management
  const [genres, setGenres] = useState([]);
  const [filteredGenres, setFilteredGenres] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [actionMenuAnchorEl, setActionMenuAnchorEl] = useState(null);
  const [selectedGenreId, setSelectedGenreId] = useState(null);
  const [viewMode, setViewMode] = useState('grid');
  
  // Loading state simulation
  const [isLoading, setIsLoading] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    coverImage: '',
    featured: false,
    sortOrder: 0,
  });

  // Load mock data
  useEffect(() => {
    setIsLoading(true);
    // Simulate API call delay
    setTimeout(() => {
      const mockGenres = [
        {
          id: 1,
          name: 'Pop',
          description: 'Contemporary commercial music with mass appeal',
          coverImage: 'https://via.placeholder.com/300?text=Pop',
          trackCount: 2845,
          artistCount: 340,
          featured: true,
          sortOrder: 1,
        },
        {
          id: 2,
          name: 'Rock',
          description: 'Guitar-driven music with strong rhythms',
          coverImage: 'https://via.placeholder.com/300?text=Rock',
          trackCount: 2156,
          artistCount: 287,
          featured: true,
          sortOrder: 2,
        },
        {
          id: 3,
          name: 'Hip Hop',
          description: 'Music characterized by rapping, beats and samples',
          coverImage: 'https://via.placeholder.com/300?text=Hip+Hop',
          trackCount: 1934,
          artistCount: 245,
          featured: true,
          sortOrder: 3,
        },
        {
          id: 4,
          name: 'R&B',
          description: 'Rhythm and blues with elements of soul and funk',
          coverImage: 'https://via.placeholder.com/300?text=R%26B',
          trackCount: 1532,
          artistCount: 198,
          featured: true,
          sortOrder: 4,
        },
        {
          id: 5,
          name: 'Electronic',
          description: 'Music produced with electronic instruments and technology',
          coverImage: 'https://via.placeholder.com/300?text=Electronic',
          trackCount: 2087,
          artistCount: 256,
          featured: true,
          sortOrder: 5,
        },
        {
          id: 6,
          name: 'Jazz',
          description: 'Complex improvisation, syncopation, and swing',
          coverImage: 'https://via.placeholder.com/300?text=Jazz',
          trackCount: 876,
          artistCount: 124,
          featured: false,
          sortOrder: 6,
        },
        {
          id: 7,
          name: 'Classical',
          description: 'Orchestral music from the Western tradition',
          coverImage: 'https://via.placeholder.com/300?text=Classical',
          trackCount: 1243,
          artistCount: 78,
          featured: false,
          sortOrder: 7,
        },
        {
          id: 8,
          name: 'Country',
          description: 'Folk-influenced music often with narrative lyrics',
          coverImage: 'https://via.placeholder.com/300?text=Country',
          trackCount: 1453,
          artistCount: 167,
          featured: false,
          sortOrder: 8,
        },
        {
          id: 9,
          name: 'Reggae',
          description: 'Jamaican music characterized by offbeat rhythms',
          coverImage: 'https://via.placeholder.com/300?text=Reggae',
          trackCount: 645,
          artistCount: 87,
          featured: false,
          sortOrder: 9,
        },
        {
          id: 10,
          name: 'Folk',
          description: 'Traditional music passed through generations',
          coverImage: 'https://via.placeholder.com/300?text=Folk',
          trackCount: 753,
          artistCount: 97,
          featured: false,
          sortOrder: 10,
        },
        {
          id: 11,
          name: 'Metal',
          description: 'Heavy distorted guitars, dense drumming, and intense vocals',
          coverImage: 'https://via.placeholder.com/300?text=Metal',
          trackCount: 1034,
          artistCount: 142,
          featured: false,
          sortOrder: 11,
        },
        {
          id: 12,
          name: 'Blues',
          description: 'Melancholic lyrics, specific chord progressions and call-and-response',
          coverImage: 'https://via.placeholder.com/300?text=Blues',
          trackCount: 532,
          artistCount: 76,
          featured: false,
          sortOrder: 12,
        },
      ];
      setGenres(mockGenres);
      setFilteredGenres(mockGenres);
      setIsLoading(false);
    }, 1000);
  }, []);
  
  // Filter genres based on search term
  useEffect(() => {
    if (searchTerm) {
      const filtered = genres.filter(genre => 
        genre.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        genre.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredGenres(filtered);
      setPage(0);
    } else {
      setFilteredGenres(genres);
    }
  }, [searchTerm, genres]);
  
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
  
  // Handle view mode change
  const handleViewModeChange = (mode) => {
    setViewMode(mode);
  };
  
  // Handle genre dialog
  const handleOpenDialog = (genre = null) => {
    if (genre) {
      setSelectedGenre(genre);
      setFormData({
        name: genre.name,
        description: genre.description,
        coverImage: genre.coverImage,
        featured: genre.featured,
        sortOrder: genre.sortOrder,
      });
    } else {
      setSelectedGenre(null);
      setFormData({
        name: '',
        description: '',
        coverImage: 'https://via.placeholder.com/300?text=New+Genre',
        featured: false,
        sortOrder: genres.length + 1,
      });
    }
    setDialogOpen(true);
  };
  
  const handleCloseDialog = () => {
    setDialogOpen(false);
  };
  
  // Handle delete dialog
  const handleOpenDeleteDialog = (genreId) => {
    setSelectedGenreId(genreId);
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
      [name]: name === 'featured' ? checked : (name === 'sortOrder' ? parseInt(value) : value),
    });
  };
  
  // Handle genre action menu
  const handleGenreActionClick = (event, genreId) => {
    setActionMenuAnchorEl(event.currentTarget);
    setSelectedGenreId(genreId);
  };
  
  const handleGenreActionClose = () => {
    setActionMenuAnchorEl(null);
    setSelectedGenreId(null);
  };
  
  // Handle genre actions
  const handleEditGenre = () => {
    const genre = genres.find(g => g.id === selectedGenreId);
    handleGenreActionClose();
    handleOpenDialog(genre);
  };
  
  const handleDeleteGenre = () => {
    handleGenreActionClose();
    handleOpenDeleteDialog(selectedGenreId);
  };
  
  const handleViewGenre = () => {
    const genre = genres.find(g => g.id === selectedGenreId);
    handleGenreActionClose();
    showNotification(`Viewing ${genre.name} genre details`, 'info');
  };
  
  const confirmDeleteGenre = () => {
    // In a real app, this would call an API to delete the genre
    const updatedGenres = genres.filter(genre => genre.id !== selectedGenreId);
    setGenres(updatedGenres);
    handleCloseDeleteDialog();
    showNotification('Genre deleted successfully', 'success');
  };
  
  // Handle save genre
  const handleSaveGenre = () => {
    // Validation
    if (!formData.name || !formData.description) {
      showNotification('Please fill in all required fields', 'error');
      return;
    }
    
    // Set loading state
    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      if (selectedGenre) {
        // Update existing genre
        const updatedGenres = genres.map(genre => {
          if (genre.id === selectedGenre.id) {
            return {
              ...genre,
              name: formData.name,
              description: formData.description,
              coverImage: formData.coverImage,
              featured: formData.featured,
              sortOrder: formData.sortOrder,
            };
          }
          return genre;
        });
        setGenres(updatedGenres);
        showNotification('Genre updated successfully', 'success');
      } else {
        // Create new genre
        const newGenre = {
          id: genres.length + 1,
          name: formData.name,
          description: formData.description,
          coverImage: formData.coverImage,
          trackCount: 0,
          artistCount: 0,
          featured: formData.featured,
          sortOrder: formData.sortOrder,
        };
        setGenres([...genres, newGenre]);
        showNotification('Genre created successfully', 'success');
      }
      handleCloseDialog();
      setIsLoading(false);
    }, 1000);
  };
  
  // Calculate pagination
  const displayedGenres = filteredGenres.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  
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
          <Typography variant="h4" sx={{ fontWeight: 700 }}>Genre Management</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            Manage music genres and categories
          </Typography>
        </Box>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
        >
          Add Genre
        </Button>
      </Stack>
      
      {/* Search and view toggle */}
      <Stack 
        direction={{ xs: 'column', sm: 'row' }} 
        spacing={2} 
        alignItems="center" 
        justifyContent="space-between"
        sx={{ mb: 3 }}
      >
        <TextField
          placeholder="Search genres"
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
        
        <Box sx={{ display: 'flex', border: 1, borderColor: 'divider', borderRadius: 1 }}>
          <Tooltip title="List view">
            <IconButton 
              color={viewMode === 'list' ? 'primary' : 'default'}
              onClick={() => handleViewModeChange('list')}
            >
              <ViewStreamIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Grid view">
            <IconButton
              color={viewMode === 'grid' ? 'primary' : 'default'}
              onClick={() => handleViewModeChange('grid')}
            >
              <ViewModuleIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Stack>
      
      {/* Loading indicator */}
      {isLoading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <CircularProgress />
        </Box>
      )}
      
      {/* Grid View */}
      {!isLoading && viewMode === 'grid' && (
        <Grid container spacing={3}>
          {displayedGenres.map((genre) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={genre.id}>
              <Card
                elevation={3}
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.2s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="140"
                  image={genre.coverImage}
                  alt={genre.name}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" component="div" gutterBottom>
                    {genre.name}
                    {genre.featured && (
                      <CheckCircleIcon 
                        color="primary" 
                        fontSize="small" 
                        sx={{ ml: 0.5, verticalAlign: 'middle' }}
                      />
                    )}
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
                    {genre.description}
                  </Typography>
                  
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        {genre.trackCount} tracks
                      </Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      {genre.artistCount} artists
                    </Typography>
                  </Box>
                </CardContent>
                <Divider />
                <CardActions>
                  <Button
                    size="small"
                    onClick={() => handleOpenDialog(genre)}
                    startIcon={<EditIcon />}
                  >
                    Edit
                  </Button>
                  <Box sx={{ flexGrow: 1 }} />
                  <IconButton
                    size="small"
                    onClick={(e) => handleGenreActionClick(e, genre.id)}
                  >
                    <MoreVertIcon fontSize="small" />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
      
      {/* List View */}
      {!isLoading && viewMode === 'list' && (
        <TableContainer component={Paper} variant="outlined">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Tracks</TableCell>
                <TableCell>Artists</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Sort Order</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {displayedGenres.map((genre) => (
                <TableRow hover key={genre.id}>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar
                        variant="rounded"
                        src={genre.coverImage}
                        alt={genre.name}
                        sx={{ width: 40, height: 40, mr: 2 }}
                      />
                      <Typography variant="body1" fontWeight={500}>
                        {genre.name}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography 
                      variant="body2" 
                      sx={{
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        maxWidth: 250,
                      }}
                    >
                      {genre.description}
                    </Typography>
                  </TableCell>
                  <TableCell>{genre.trackCount}</TableCell>
                  <TableCell>{genre.artistCount}</TableCell>
                  <TableCell>
                    {genre.featured ? (
                      <Chip 
                        icon={<CheckCircleIcon />} 
                        label="Featured" 
                        color="primary" 
                        size="small" 
                      />
                    ) : (
                      <Chip label="Standard" size="small" variant="outlined" />
                    )}
                  </TableCell>
                  <TableCell>{genre.sortOrder}</TableCell>
                  <TableCell align="right">
                    <IconButton
                      size="small"
                      onClick={() => handleOpenDialog(genre)}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={(e) => handleGenreActionClick(e, genre.id)}
                    >
                      <MoreVertIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredGenres.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      )}
      
      {/* Empty state */}
      {!isLoading && displayedGenres.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <CategoryIcon sx={{ fontSize: 60, color: 'text.secondary', opacity: 0.5, mb: 2 }} />
          <Typography variant="h6" color="text.secondary">
            No genres found
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Try changing your search or create a new genre
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
            <Button 
              variant="outlined" 
              onClick={() => setSearchTerm('')}
            >
              Clear Search
            </Button>
            <Button 
              variant="contained" 
              color="primary"
              startIcon={<AddIcon />}
              onClick={() => handleOpenDialog()}
            >
              Add Genre
            </Button>
          </Box>
        </Box>
      )}
      
      {/* Genre Action Menu */}
      <Menu
        anchorEl={actionMenuAnchorEl}
        open={Boolean(actionMenuAnchorEl)}
        onClose={handleGenreActionClose}
      >
        <MenuItem onClick={handleEditGenre}>
          <ListItemIcon>
            <ModeEditIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Edit</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleViewGenre}>
          <ListItemIcon>
            <VisibilityIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>View Details</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleDeleteGenre} sx={{ color: 'error.main' }}>
          <ListItemIcon sx={{ color: 'error.main' }}>
            <DeleteIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Delete</ListItemText>
        </MenuItem>
      </Menu>
      
      {/* Genre Dialog */}
      <Dialog 
        open={dialogOpen} 
        onClose={handleCloseDialog}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>
          {selectedGenre ? 'Edit Genre' : 'Add New Genre'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 0 }}>
            <Grid item xs={12} sm={4}>
              <Box sx={{ position: 'relative' }}>
                <Box
                  component="img"
                  src={formData.coverImage || 'https://via.placeholder.com/300?text=Genre+Image'}
                  alt="Genre Cover"
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
                  startIcon={<ImageIcon />}
                  fullWidth
                >
                  Upload Image
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={() => {
                      // In a real app, this would upload the file
                      showNotification('Image upload functionality would be implemented here', 'info');
                    }}
                  />
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} sm={8}>
              <TextField
                label="Genre Name"
                name="name"
                value={formData.name}
                onChange={handleFormInputChange}
                fullWidth
                required
                margin="normal"
              />
              <TextField
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleFormInputChange}
                fullWidth
                multiline
                rows={3}
                required
                margin="normal"
              />
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={6}>
                  <TextField
                    label="Sort Order"
                    name="sortOrder"
                    type="number"
                    value={formData.sortOrder}
                    onChange={handleFormInputChange}
                    fullWidth
                    margin="normal"
                    InputProps={{
                      inputProps: { min: 1 }
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Button
                    variant="outlined"
                    fullWidth
                    color={formData.featured ? "primary" : "inherit"}
                    startIcon={formData.featured ? <CheckCircleIcon /> : null}
                    onClick={() => setFormData({ ...formData, featured: !formData.featured })}
                    sx={{ mt: 2, height: 52 }}
                  >
                    {formData.featured ? "Featured" : "Set as Featured"}
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button 
            onClick={handleSaveGenre} 
            variant="contained" 
            color="primary"
            disabled={isLoading}
          >
            {isLoading ? <CircularProgress size={24} /> : (selectedGenre ? 'Update' : 'Create')}
          </Button>
        </DialogActions>
      </Dialog>
      
      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={handleCloseDeleteDialog}
      >
        <DialogTitle>Delete Genre</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this genre? This action cannot be undone and will affect all associated tracks and playlists.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog}>Cancel</Button>
          <Button 
            onClick={confirmDeleteGenre} 
            color="error"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default GenreManagement;