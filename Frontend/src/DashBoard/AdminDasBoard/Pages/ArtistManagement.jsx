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
  DialogContentText,
  DialogTitle,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
  Menu,
  ListItemIcon,
  ListItemText,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  Badge,
  Switch,
  FormControlLabel,
  Pagination,
  Rating,
  Tab,
  Tabs,
  Divider,
} from '@mui/material';

// Icons
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import VerifiedIcon from '@mui/icons-material/Verified';
import AlbumIcon from '@mui/icons-material/Album';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import PersonIcon from '@mui/icons-material/Person';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import LanguageIcon from '@mui/icons-material/Language';

function ArtistManagement({ showNotification }) {
  // State management
  const [artists, setArtists] = useState([]);
  const [filteredArtists, setFilteredArtists] = useState([]);
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(8);
  const [searchTerm, setSearchTerm] = useState('');
  const [artistDialogOpen, setArtistDialogOpen] = useState(false);
  const [artistDetailsDialogOpen, setArtistDetailsDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedArtist, setSelectedArtist] = useState(null);
  const [filterAnchorEl, setFilterAnchorEl] = useState(null);
  const [statusFilter, setStatusFilter] = useState('all');
  const [actionMenuAnchorEl, setActionMenuAnchorEl] = useState(null);
  const [selectedArtistId, setSelectedArtistId] = useState(null);
  const [tabValue, setTabValue] = useState(0);
  const [verificationDialogOpen, setVerificationDialogOpen] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    country: '',
    genre: '',
    biography: '',
    profileImage: '',
    isVerified: false,
    social: {
      instagram: '',
      twitter: '',
      website: '',
    },
    monthlyListeners: 0,
  });
  
  const genres = [
    'Pop', 'Rock', 'Hip Hop', 'R&B', 'Country', 'Electronic', 'Jazz', 'Classical', 'Reggae', 'Folk', 'Metal', 'Blues'
  ];
  
  const countries = [
    'United States', 'United Kingdom', 'Canada', 'Australia', 'France', 'Germany', 'Japan', 'Brazil', 'South Korea', 'Nigeria', 'Sweden', 'Jamaica'
  ];

  // Load mock data
  useEffect(() => {
    // This would be an API call in production
    const mockArtists = Array(30).fill().map((_, i) => ({
      id: i + 1,
      name: `Artist ${i + 1}`,
      country: countries[Math.floor(Math.random() * countries.length)],
      genre: genres[Math.floor(Math.random() * genres.length)],
      biography: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget ultricies ultrices, nunc nisl aliquet nunc, quis.',
      profileImage: `https://via.placeholder.com/300?text=Artist+${i+1}`,
      isVerified: Math.random() > 0.7,
      joinDate: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toLocaleDateString(),
      albums: Math.floor(Math.random() * 10) + 1,
      tracks: Math.floor(Math.random() * 50) + 5,
      monthlyListeners: Math.floor(Math.random() * 10000000) + 10000,
      social: {
        instagram: Math.random() > 0.3 ? `artist${i+1}` : '',
        twitter: Math.random() > 0.3 ? `artist${i+1}` : '',
        website: Math.random() > 0.5 ? `https://artist${i+1}.com` : '',
      },
      pendingVerification: !Math.random() > 0.7 && Math.random() > 0.5,
      rating: Math.floor(Math.random() * 5) + 1,
    }));
    
    setArtists(mockArtists);
    setFilteredArtists(mockArtists);
  }, []);
  
  // Filter artists based on search term and status
  useEffect(() => {
    let filtered = artists;
    
    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(artist => 
        artist.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        artist.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
        artist.genre.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply status filter
    if (statusFilter === 'verified') {
      filtered = filtered.filter(artist => artist.isVerified);
    } else if (statusFilter === 'unverified') {
      filtered = filtered.filter(artist => !artist.isVerified);
    } else if (statusFilter === 'pending') {
      filtered = filtered.filter(artist => artist.pendingVerification);
    }
    
    // Apply tab filter
    if (tabValue === 1) {
      filtered = filtered.filter(artist => artist.pendingVerification);
    } else if (tabValue === 2) {
      filtered = filtered.filter(artist => artist.isVerified);
    }
    
    setFilteredArtists(filtered);
    setPage(1);
  }, [searchTerm, statusFilter, tabValue, artists]);
  
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
  
  // Handle status filter change
  const handleStatusFilterChange = (event) => {
    setStatusFilter(event.target.value);
    handleFilterMenuClose();
  };
  
  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
  
  // Handle artist dialog
  const handleOpenArtistDialog = (artist = null) => {
    if (artist) {
      setSelectedArtist(artist);
      setFormData({
        name: artist.name,
        country: artist.country,
        genre: artist.genre,
        biography: artist.biography,
        profileImage: artist.profileImage,
        isVerified: artist.isVerified,
        social: artist.social,
        monthlyListeners: artist.monthlyListeners,
      });
    } else {
      setSelectedArtist(null);
      setFormData({
        name: '',
        country: '',
        genre: '',
        biography: '',
        profileImage: 'https://via.placeholder.com/300?text=New+Artist',
        isVerified: false,
        social: {
          instagram: '',
          twitter: '',
          website: '',
        },
        monthlyListeners: 0,
      });
    }
    setArtistDialogOpen(true);
  };
  
  const handleCloseArtistDialog = () => {
    setArtistDialogOpen(false);
    setSelectedArtist(null);
  };
  
  // Handle artist details dialog
  const handleOpenArtistDetailsDialog = (artistId) => {
    const artist = artists.find(a => a.id === artistId);
    setSelectedArtist(artist);
    setArtistDetailsDialogOpen(true);
  };
  
  const handleCloseArtistDetailsDialog = () => {
    setArtistDetailsDialogOpen(false);
    setSelectedArtist(null);
  };
  
  // Handle delete dialog
  const handleOpenDeleteDialog = (artistId) => {
    setSelectedArtistId(artistId);
    setDeleteDialogOpen(true);
  };
  
  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
    setSelectedArtistId(null);
  };
  
  // Handle verification dialog
  const handleOpenVerificationDialog = (artistId) => {
    const artist = artists.find(a => a.id === artistId);
    setSelectedArtist(artist);
    setVerificationDialogOpen(true);
  };
  
  const handleCloseVerificationDialog = () => {
    setVerificationDialogOpen(false);
    setSelectedArtist(null);
  };
  
  // Handle form input change
  const handleFormInputChange = (event) => {
    const { name, value, checked } = event.target;
    
    if (name.includes('.')) {
      // Handle nested properties (e.g., social.instagram)
      const [parent, child] = name.split('.');
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent],
          [child]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: name === 'isVerified' ? checked : value,
      });
    }
  };
  
  // Handle artist action menu
  const handleArtistActionClick = (event, artistId) => {
    setActionMenuAnchorEl(event.currentTarget);
    setSelectedArtistId(artistId);
  };
  
  const handleArtistActionClose = () => {
    setActionMenuAnchorEl(null);
    setSelectedArtistId(null);
  };
  
  // Handle artist actions
  const handleEditArtist = () => {
    const artist = artists.find(a => a.id === selectedArtistId);
    handleArtistActionClose();
    handleOpenArtistDialog(artist);
  };
  
  const handleViewArtistDetails = () => {
    handleArtistActionClose();
    handleOpenArtistDetailsDialog(selectedArtistId);
  };
  
  const handleDeleteArtist = () => {
    handleArtistActionClose();
    handleOpenDeleteDialog(selectedArtistId);
  };
  
  const handleVerifyArtistAction = () => {
    handleArtistActionClose();
    handleOpenVerificationDialog(selectedArtistId);
  };
  
  const confirmDeleteArtist = () => {
    // In a real app, this would call an API to delete the artist
    const updatedArtists = artists.filter(artist => artist.id !== selectedArtistId);
    setArtists(updatedArtists);
    handleCloseDeleteDialog();
    showNotification('Artist deleted successfully', 'success');
  };
  
  const handleVerificationStatus = (approve) => {
    // In a real app, this would call an API to update the artist's verification status
    const updatedArtists = artists.map(artist => {
      if (artist.id === selectedArtist.id) {
        return {
          ...artist,
          isVerified: approve,
          pendingVerification: false,
        };
      }
      return artist;
    });
    setArtists(updatedArtists);
    handleCloseVerificationDialog();
    showNotification(`Artist ${approve ? 'verified' : 'verification rejected'} successfully`, 'success');
  };
  
  // Handle save artist
  const handleSaveArtist = () => {
    // Validation
    if (!formData.name || !formData.country || !formData.genre) {
      showNotification('Please fill in all required fields', 'error');
      return;
    }
    
    if (selectedArtist) {
      // Update existing artist
      const updatedArtists = artists.map(artist => {
        if (artist.id === selectedArtist.id) {
          return {
            ...artist,
            name: formData.name,
            country: formData.country,
            genre: formData.genre,
            biography: formData.biography,
            profileImage: formData.profileImage,
            isVerified: formData.isVerified,
            social: formData.social,
            monthlyListeners: formData.monthlyListeners,
          };
        }
        return artist;
      });
      setArtists(updatedArtists);
      showNotification('Artist updated successfully', 'success');
    } else {
      // Create new artist
      const newArtist = {
        id: artists.length + 1,
        name: formData.name,
        country: formData.country,
        genre: formData.genre,
        biography: formData.biography,
        profileImage: formData.profileImage,
        isVerified: formData.isVerified,
        joinDate: new Date().toLocaleDateString(),
        albums: 0,
        tracks: 0,
        monthlyListeners: formData.monthlyListeners,
        social: formData.social,
        pendingVerification: false,
        rating: 0,
      };
      setArtists([...artists, newArtist]);
      showNotification('Artist created successfully', 'success');
    }
    handleCloseArtistDialog();
  };
  
  // Format large numbers
  const formatNumber = (number) => {
    if (number >= 1000000) {
      return `${(number / 1000000).toFixed(1)}M`;
    } else if (number >= 1000) {
      return `${(number / 1000).toFixed(1)}K`;
    }
    return number;
  };
  
  // Calculate pagination
  const count = Math.ceil(filteredArtists.length / rowsPerPage);
  const currentArtists = filteredArtists.slice((page - 1) * rowsPerPage, page * rowsPerPage);
  
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
          <Typography variant="h4" sx={{ fontWeight: 700 }}>Artist Management</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            Manage artists, verification, and profiles
          </Typography>
        </Box>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => handleOpenArtistDialog()}
        >
          Add Artist
        </Button>
      </Stack>
      
      {/* Tabs */}
      <Box sx={{ mb: 3 }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          TabIndicatorProps={{
            style: { backgroundColor: '#1DB954' }
          }}
          sx={{
            borderBottom: 1,
            borderColor: 'divider',
            '& .MuiTab-root': {
              textTransform: 'none',
              fontWeight: 600,
              minWidth: 120,
            },
          }}
        >
          <Tab label="All Artists" />
          <Tab 
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="body1" sx={{ mr: 1 }}>Pending Verification</Typography>
                <Chip
                  label={artists.filter(a => a.pendingVerification).length}
                  size="small"
                  color="primary"
                  sx={{ height: 20 }}
                />
              </Box>
            }
          />
          <Tab label="Verified Artists" />
        </Tabs>
      </Box>
      
      {/* Search and filters */}
      <Stack 
        direction={{ xs: 'column', sm: 'row' }} 
        spacing={2} 
        alignItems="center" 
        sx={{ mb: 3 }}
      >
        <TextField
          placeholder="Search artists"
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
        <Box sx={{ p: 2, minWidth: 200 }}>
          <Typography variant="subtitle2" sx={{ mb: 1.5 }}>Filter by Status</Typography>
          <FormControl fullWidth size="small">
            <Select
              value={statusFilter}
              onChange={handleStatusFilterChange}
              displayEmpty
            >
              <MenuItem value="all">All Status</MenuItem>
              <MenuItem value="verified">Verified</MenuItem>
              <MenuItem value="unverified">Unverified</MenuItem>
              <MenuItem value="pending">Pending Verification</MenuItem>
            </Select>
          </FormControl>

          <Typography variant="subtitle2" sx={{ mb: 1.5, mt: 2 }}>Filter by Genre</Typography>
          <FormControl fullWidth size="small">
            <Select
              value={formData.genre}
              onChange={handleFormInputChange}
              displayEmpty
              name="genre"
            >
              <MenuItem value="">All Genres</MenuItem>
              {genres.map((genre) => (
                <MenuItem key={genre} value={genre}>{genre}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Menu>
      
      {/* Artists Grid */}
      <Grid container spacing={3}>
        {currentArtists.map((artist) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={artist.id}>
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
              {artist.isVerified && (
                <Badge
                  sx={{
                    position: 'absolute',
                    top: 12,
                    right: 12,
                    zIndex: 1,
                  }}
                  badgeContent={
                    <VerifiedIcon 
                      sx={{ 
                        color: '#1DB954',
                        bgcolor: '#1a1a1a',
                        borderRadius: '50%',
                        fontSize: 22,
                      }}
                    />
                  }
                />
              )}
              
              {artist.pendingVerification && (
                <Chip
                  label="Pending Verification"
                  color="warning"
                  size="small"
                  sx={{
                    position: 'absolute',
                    top: 10,
                    left: 10,
                    zIndex: 1,
                    fontWeight: 600,
                  }}
                />
              )}
              
              <CardMedia
                component="img"
                sx={{
                  height: 200,
                  objectFit: 'cover',
                  objectPosition: 'center top',
                }}
                image={artist.profileImage}
                alt={artist.name}
              />
              <CardContent sx={{ flexGrow: 1, pb: 1 }}>
                <Typography variant="h6" component="div" gutterBottom noWrap>
                  {artist.name}
                </Typography>
                <Box sx={{ mb: 1 }}>
                  <Chip 
                    label={artist.genre}
                    size="small"
                    sx={{ 
                      bgcolor: 'rgba(29, 185, 84, 0.1)', 
                      color: '#1DB954',
                      fontWeight: 500,
                      mr: 0.5,
                      mb: 0.5
                    }}
                  />
                  <Chip 
                    label={artist.country}
                    size="small"
                    sx={{ 
                      bgcolor: 'rgba(255, 255, 255, 0.1)',
                      fontWeight: 500,
                      mb: 0.5
                    }}
                  />
                </Box>
                
                <Stack direction="row" spacing={1} sx={{ mb: 2, mt: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <ThumbUpIcon sx={{ fontSize: 14, color: 'text.secondary', mr: 0.5 }} />
                    <Typography variant="caption" color="text.secondary">
                      {formatNumber(artist.monthlyListeners)} listeners
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <AlbumIcon sx={{ fontSize: 14, color: 'text.secondary', mr: 0.5 }} />
                    <Typography variant="caption" color="text.secondary">
                      {artist.albums} albums
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <MusicNoteIcon sx={{ fontSize: 14, color: 'text.secondary', mr: 0.5 }} />
                    <Typography variant="caption" color="text.secondary">
                      {artist.tracks} tracks
                    </Typography>
                  </Box>
                </Stack>
                
                <Rating 
                  value={artist.rating} 
                  readOnly 
                  size="small" 
                  sx={{ mb: 1 }}
                />
              </CardContent>
              <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
                <Button
                  size="small"
                  variant="outlined"
                  startIcon={<VisibilityIcon />}
                  onClick={() => handleOpenArtistDetailsDialog(artist.id)}
                >
                  View
                </Button>
                <IconButton
                  size="small"
                  onClick={(e) => handleArtistActionClick(e, artist.id)}
                >
                  <MoreVertIcon fontSize="small" />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      
      {/* Empty state */}
      {currentArtists.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <PersonIcon sx={{ fontSize: 60, color: 'text.secondary', opacity: 0.5, mb: 2 }} />
          <Typography variant="h6" color="text.secondary">
            No artists found
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Try changing your search or filters
          </Typography>
          <Button 
            variant="contained" 
            color="primary"
            onClick={() => {
              setSearchTerm('');
              setStatusFilter('all');
              setTabValue(0);
            }}
          >
            Clear Filters
          </Button>
        </Box>
      )}
      
      {/* Pagination */}
      {currentArtists.length > 0 && (
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
      
      {/* Artist Action Menu */}
      <Menu
        anchorEl={actionMenuAnchorEl}
        open={Boolean(actionMenuAnchorEl)}
        onClose={handleArtistActionClose}
      >
        <MenuItem onClick={handleViewArtistDetails}>
          <ListItemIcon>
            <VisibilityIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>View Details</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleEditArtist}>
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Edit</ListItemText>
        </MenuItem>
        {artists.find(a => a.id === selectedArtistId)?.pendingVerification && (
          <MenuItem onClick={handleVerifyArtistAction}>
            <ListItemIcon>
              <VerifiedIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Review Verification</ListItemText>
          </MenuItem>
        )}
        <MenuItem onClick={handleDeleteArtist} sx={{ color: 'error.main' }}>
          <ListItemIcon sx={{ color: 'error.main' }}>
            <DeleteIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Delete</ListItemText>
        </MenuItem>
      </Menu>
      
      {/* Artist Dialog */}
      <Dialog 
        open={artistDialogOpen} 
        onClose={handleCloseArtistDialog}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>
          {selectedArtist ? 'Edit Artist' : 'Add New Artist'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={3} sx={{ mt: 0 }}>
            <Grid item xs={12} md={4}>
              <Box sx={{ position: 'relative' }}>
                <Box
                  component="img"
                  src={formData.profileImage || 'https://via.placeholder.com/300?text=Artist+Profile'}
                  alt="Artist Profile"
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
                  Upload Image
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={() => {
                      // In a real app, this would upload the file
                      showNotification('Profile image upload functionality would be implemented here', 'info');
                    }}
                  />
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={8}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    label="Artist Name"
                    name="name"
                    value={formData.name}
                    onChange={handleFormInputChange}
                    fullWidth
                    required
                    margin="dense"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth margin="dense">
                    <InputLabel>Country</InputLabel>
                    <Select
                      name="country"
                      value={formData.country}
                      onChange={handleFormInputChange}
                      label="Country"
                      required
                    >
                      {countries.map((country) => (
                        <MenuItem key={country} value={country}>{country}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
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
                <Grid item xs={12}>
                  <TextField
                    label="Biography"
                    name="biography"
                    value={formData.biography}
                    onChange={handleFormInputChange}
                    fullWidth
                    multiline
                    rows={3}
                    margin="dense"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle2" sx={{ mt: 1, mb: 1 }}>Social Media</Typography>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    label="Instagram"
                    name="social.instagram"
                    value={formData.social.instagram}
                    onChange={handleFormInputChange}
                    fullWidth
                    margin="dense"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <InstagramIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    label="Twitter"
                    name="social.twitter"
                    value={formData.social.twitter}
                    onChange={handleFormInputChange}
                    fullWidth
                    margin="dense"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <TwitterIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    label="Website"
                    name="social.website"
                    value={formData.social.website}
                    onChange={handleFormInputChange}
                    fullWidth
                    margin="dense"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LanguageIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Monthly Listeners"
                    name="monthlyListeners"
                    type="number"
                    value={formData.monthlyListeners}
                    onChange={handleFormInputChange}
                    fullWidth
                    margin="dense"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={formData.isVerified}
                        onChange={handleFormInputChange}
                        name="isVerified"
                        color="primary"
                      />
                    }
                    label="Verified Artist"
                    sx={{ mt: 2 }}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseArtistDialog}>Cancel</Button>
          <Button 
            onClick={handleSaveArtist} 
            variant="contained" 
            color="primary"
          >
            {selectedArtist ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
      
      {/* Artist Details Dialog */}
      <Dialog 
        open={artistDetailsDialogOpen} 
        onClose={handleCloseArtistDetailsDialog}
        fullWidth
        maxWidth="md"
      >
        {selectedArtist && (
          <>
            <DialogTitle>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                {selectedArtist.name}
                {selectedArtist.isVerified && (
                  <VerifiedIcon sx={{ color: '#1DB954', ml: 1 }} />
                )}
              </Box>
            </DialogTitle>
            <DialogContent>
              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <Box
                    component="img"
                    src={selectedArtist.profileImage}
                    alt={selectedArtist.name}
                    sx={{
                      width: '100%',
                      borderRadius: 2,
                      mb: 2,
                    }}
                  />
                  
                  <Paper sx={{ p: 2, mb: 2 }} variant="outlined">
                    <Typography variant="subtitle2" gutterBottom>Artist Info</Typography>
                    <Divider sx={{ mb: 1.5 }} />
                    
                    <Box sx={{ display: 'flex', mb: 1 }}>
                      <Typography variant="body2" sx={{ minWidth: 80, fontWeight: 500 }}>Country:</Typography>
                      <Typography variant="body2">{selectedArtist.country}</Typography>
                    </Box>
                    
                    <Box sx={{ display: 'flex', mb: 1 }}>
                      <Typography variant="body2" sx={{ minWidth: 80, fontWeight: 500 }}>Joined:</Typography>
                      <Typography variant="body2">{selectedArtist.joinDate}</Typography>
                    </Box>
                    
                    <Box sx={{ display: 'flex', mb: 1 }}>
                      <Typography variant="body2" sx={{ minWidth: 80, fontWeight: 500 }}>Status:</Typography>
                      <Typography variant="body2">
                        {selectedArtist.isVerified ? (
                          <Chip 
                            label="Verified" 
                            size="small"
                            color="primary"
                            icon={<VerifiedIcon />}
                          />
                        ) : selectedArtist.pendingVerification ? (
                          <Chip 
                            label="Pending Verification" 
                            size="small"
                            color="warning"
                          />
                        ) : (
                          <Chip 
                            label="Unverified" 
                            size="small"
                            color="default"
                          />
                        )}
                      </Typography>
                    </Box>
                  </Paper>
                  
                  <Paper sx={{ p: 2 }} variant="outlined">
                    <Typography variant="subtitle2" gutterBottom>Social Media</Typography>
                    <Divider sx={{ mb: 1.5 }} />
                    
                    <Stack spacing={1}>
                      {selectedArtist.social.instagram && (
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <InstagramIcon sx={{ mr: 1, fontSize: 20 }} />
                          <Typography variant="body2">@{selectedArtist.social.instagram}</Typography>
                        </Box>
                      )}
                      
                      {selectedArtist.social.twitter && (
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <TwitterIcon sx={{ mr: 1, fontSize: 20 }} />
                          <Typography variant="body2">@{selectedArtist.social.twitter}</Typography>
                        </Box>
                      )}
                      
                      {selectedArtist.social.website && (
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <LanguageIcon sx={{ mr: 1, fontSize: 20 }} />
                          <Typography variant="body2" noWrap>{selectedArtist.social.website}</Typography>
                        </Box>
                      )}
                      
                      {!selectedArtist.social.instagram && !selectedArtist.social.twitter && !selectedArtist.social.website && (
                        <Typography variant="body2" color="text.secondary">
                          No social media linked
                        </Typography>
                      )}
                    </Stack>
                  </Paper>
                </Grid>
                
                <Grid item xs={12} md={8}>
                  <Typography variant="h6" gutterBottom>Biography</Typography>
                  <Typography variant="body1" paragraph>
                    {selectedArtist.biography || 'No biography available.'}
                  </Typography>
                  
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="subtitle1" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                      <ThumbUpIcon sx={{ mr: 1, fontSize: 20 }} />
                      Monthly Listeners: {formatNumber(selectedArtist.monthlyListeners)}
                    </Typography>
                    
                    <Rating 
                      value={selectedArtist.rating} 
                      readOnly 
                      sx={{ mb: 1 }}
                    />
                  </Box>
                  
                  <Divider sx={{ my: 2 }} />
                  
                  <Box>
                    <Typography variant="h6" gutterBottom>Content</Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Paper
                          variant="outlined"
                          sx={{ 
                            p: 2, 
                            textAlign: 'center',
                            bgcolor: 'rgba(30,30,30,0.4)',
                          }}
                        >
                          <AlbumIcon sx={{ fontSize: 30, mb: 1, color: 'primary.main' }} />
                          <Typography variant="h5">{selectedArtist.albums}</Typography>
                          <Typography variant="body2" color="text.secondary">Albums</Typography>
                        </Paper>
                      </Grid>
                      <Grid item xs={6}>
                        <Paper
                          variant="outlined"
                          sx={{ 
                            p: 2, 
                            textAlign: 'center',
                            bgcolor: 'rgba(30,30,30,0.4)',
                          }}
                        >
                          <MusicNoteIcon sx={{ fontSize: 30, mb: 1, color: 'primary.main' }} />
                          <Typography variant="h5">{selectedArtist.tracks}</Typography>
                          <Typography variant="body2" color="text.secondary">Tracks</Typography>
                        </Paper>
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseArtistDetailsDialog}>Close</Button>
              <Button
                variant="outlined"
                startIcon={<EditIcon />}
                onClick={() => {
                  handleCloseArtistDetailsDialog();
                  handleOpenArtistDialog(selectedArtist);
                }}
              >
                Edit
              </Button>
              {selectedArtist.pendingVerification && (
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<VerifiedIcon />}
                  onClick={() => {
                    handleCloseArtistDetailsDialog();
                    handleOpenVerificationDialog(selectedArtist.id);
                  }}
                >
                  Review Verification
                </Button>
              )}
            </DialogActions>
          </>
        )}
      </Dialog>
      
      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={handleCloseDeleteDialog}
      >
        <DialogTitle>Delete Artist</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this artist? This action cannot be undone and will remove all associated content.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog}>Cancel</Button>
          <Button 
            onClick={confirmDeleteArtist} 
            color="error"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      
      {/* Verification Dialog */}
      <Dialog
        open={verificationDialogOpen}
        onClose={handleCloseVerificationDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Verification Request</DialogTitle>
        <DialogContent>
          {selectedArtist && (
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar
                  src={selectedArtist.profileImage}
                  alt={selectedArtist.name}
                  sx={{ width: 60, height: 60, mr: 2 }}
                />
                <Box>
                  <Typography variant="h6">{selectedArtist.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {selectedArtist.genre} • {selectedArtist.country}
                  </Typography>
                </Box>
              </Box>
              
              <Divider sx={{ my: 2 }} />
              
              <Typography variant="body1" paragraph>
                This artist has requested verification. Please review their profile information and confirm they meet verification requirements.
              </Typography>
              
              <List>
                <ListItem>
                  <ListItemIcon>
                    <PersonIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Identity Confirmation"
                    secondary="Verify the artist's identity documents"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <MusicNoteIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Content Ownership"
                    secondary={`${selectedArtist.tracks} tracks across ${selectedArtist.albums} albums`}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <ThumbUpIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Audience Size"
                    secondary={`${formatNumber(selectedArtist.monthlyListeners)} monthly listeners`}
                  />
                </ListItem>
              </List>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button 
            startIcon={<CancelIcon />}
            onClick={() => handleVerificationStatus(false)}
            color="error"
          >
            Reject
          </Button>
          <Button 
            variant="contained"
            startIcon={<CheckCircleIcon />}
            onClick={() => handleVerificationStatus(true)}
            color="primary"
          >
            Approve Verification
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default ArtistManagement;