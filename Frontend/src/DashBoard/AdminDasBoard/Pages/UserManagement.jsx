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
  Avatar,
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
  Divider,
  Card,
  CardContent,
  Grid,
  Menu,
  ListItemIcon,
  ListItemText,
  Tabs,
  Tab,
} from '@mui/material';

// Icons
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import BlockIcon from '@mui/icons-material/Block';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EmailIcon from '@mui/icons-material/Email';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import SortIcon from '@mui/icons-material/Sort';

function UserManagement({ showNotification }) {
  // State management
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [tabValue, setTabValue] = useState(0);
  const [filterAnchorEl, setFilterAnchorEl] = useState(null);
  const [sortAnchorEl, setSortAnchorEl] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userDialogOpen, setUserDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState('all');
  const [actionMenuAnchorEl, setActionMenuAnchorEl] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState(null);
  
  // Form state
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    country: '',
    status: 'active',
    role: 'user',
  });
  
  // Load mock data
  useEffect(() => {
    // This would be an API call in production
    const mockUsers = Array(100).fill().map((_, i) => ({
      id: i + 1,
      fullName: `User ${i + 1}`,
      email: `user${i + 1}@example.com`,
      country: ['USA', 'UK', 'Canada', 'Australia', 'Germany', 'France', 'Spain', 'Italy'][Math.floor(Math.random() * 8)],
      joinDate: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString().split('T')[0],
      status: ['active', 'inactive', 'suspended'][Math.floor(Math.random() * 3)],
      subscriptionType: ['free', 'premium', 'family', 'student'][Math.floor(Math.random() * 4)],
      role: Math.random() > 0.9 ? 'admin' : 'user',
    }));
    
    setUsers(mockUsers);
    setFilteredUsers(mockUsers);
  }, []);
  
  // Filter users based on search term and status
  useEffect(() => {
    let filtered = users;
    
    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(user => 
        user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(user => user.status === statusFilter);
    }
    
    // Apply tab filter
    if (tabValue === 1) {
      filtered = filtered.filter(user => user.subscriptionType !== 'free');
    } else if (tabValue === 2) {
      filtered = filtered.filter(user => user.role === 'admin');
    }
    
    setFilteredUsers(filtered);
    setPage(0);
  }, [searchTerm, statusFilter, tabValue, users]);
  
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
  
  // Handle sort menu
  const handleSortClick = (event) => {
    setSortAnchorEl(event.currentTarget);
  };
  
  const handleSortMenuClose = () => {
    setSortAnchorEl(null);
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
  
  // Handle user dialog
  const handleOpenUserDialog = (user = null) => {
    if (user) {
      setSelectedUser(user);
      setFormData({
        fullName: user.fullName,
        email: user.email,
        country: user.country,
        status: user.status,
        role: user.role,
      });
    } else {
      setSelectedUser(null);
      setFormData({
        fullName: '',
        email: '',
        country: '',
        status: 'active',
        role: 'user',
      });
    }
    setUserDialogOpen(true);
  };
  
  const handleCloseUserDialog = () => {
    setUserDialogOpen(false);
    setSelectedUser(null);
  };
  
  // Handle delete dialog
  const handleOpenDeleteDialog = (userId) => {
    setSelectedUserId(userId);
    setDeleteDialogOpen(true);
  };
  
  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
    setSelectedUserId(null);
  };
  
  // Handle form input change
  const handleFormInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  
  // Handle user action menu
  const handleUserActionClick = (event, userId) => {
    setActionMenuAnchorEl(event.currentTarget);
    setSelectedUserId(userId);
  };
  
  const handleUserActionClose = () => {
    setActionMenuAnchorEl(null);
    setSelectedUserId(null);
  };
  
  // Handle user actions
  const handleEditUser = () => {
    const user = users.find(u => u.id === selectedUserId);
    handleUserActionClose();
    handleOpenUserDialog(user);
  };
  
  const handleViewUser = () => {
    handleUserActionClose();
    showNotification(`Viewing user details: ${selectedUserId}`);
  };
  
  const handleDeleteUser = () => {
    handleUserActionClose();
    handleOpenDeleteDialog(selectedUserId);
  };
  
  const confirmDeleteUser = () => {
    // In a real app, this would call an API to delete the user
    const updatedUsers = users.filter(user => user.id !== selectedUserId);
    setUsers(updatedUsers);
    handleCloseDeleteDialog();
    showNotification('User deleted successfully', 'success');
  };
  
  const handleToggleUserStatus = () => {
    // In a real app, this would call an API to update the user status
    const updatedUsers = users.map(user => {
      if (user.id === selectedUserId) {
        return {
          ...user,
          status: user.status === 'active' ? 'suspended' : 'active',
        };
      }
      return user;
    });
    setUsers(updatedUsers);
    handleUserActionClose();
    showNotification('User status updated successfully', 'success');
  };
  
  // Handle save user
  const handleSaveUser = () => {
    // Validation
    if (!formData.fullName || !formData.email) {
      showNotification('Please fill in all required fields', 'error');
      return;
    }
    
    if (selectedUser) {
      // Update existing user
      const updatedUsers = users.map(user => {
        if (user.id === selectedUser.id) {
          return {
            ...user,
            fullName: formData.fullName,
            email: formData.email,
            country: formData.country,
            status: formData.status,
            role: formData.role,
          };
        }
        return user;
      });
      setUsers(updatedUsers);
      showNotification('User updated successfully', 'success');
    } else {
      // Create new user
      const newUser = {
        id: users.length + 1,
        fullName: formData.fullName,
        email: formData.email,
        country: formData.country,
        joinDate: new Date().toISOString().split('T')[0],
        status: formData.status,
        subscriptionType: 'free',
        role: formData.role,
      };
      setUsers([...users, newUser]);
      showNotification('User created successfully', 'success');
    }
    handleCloseUserDialog();
  };
  
  // Handle sort by
  const handleSortBy = (field) => {
    const sorted = [...users].sort((a, b) => {
      if (a[field] < b[field]) return -1;
      if (a[field] > b[field]) return 1;
      return 0;
    });
    setUsers(sorted);
    handleSortMenuClose();
    showNotification(`Sorted by ${field}`, 'success');
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
          <Typography variant="h4" sx={{ fontWeight: 700 }}>User Management</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            Manage your users, subscriptions, and permissions
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
            onClick={() => handleOpenUserDialog()}
          >
            Add User
          </Button>
          <Button
            variant="outlined"
            startIcon={<CloudDownloadIcon />}
            onClick={() => showNotification('Exporting user data', 'info')}
          >
            Export
          </Button>
        </Stack>
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
          <Tab label="All Users" />
          <Tab label="Premium Users" />
          <Tab label="Admins" />
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
          placeholder="Search users"
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
        <Button
          variant="outlined"
          startIcon={<SortIcon />}
          onClick={handleSortClick}
          sx={{ width: { xs: '100%', sm: 'auto' } }}
        >
          Sort
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
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="inactive">Inactive</MenuItem>
              <MenuItem value="suspended">Suspended</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Divider />
        <Box sx={{ p: 2 }}>
          <Button
            variant="text"
            onClick={() => {
              setStatusFilter('all');
              handleFilterMenuClose();
            }}
            sx={{ width: '100%' }}
          >
            Clear Filters
          </Button>
        </Box>
        </Menu>
        {/* Sort menu */}
        <Menu
          anchorEl={sortAnchorEl}
          open={Boolean(sortAnchorEl)}
          onClose={handleSortMenuClose}
        >
            <Box sx={{ p: 2, minWidth: 200 }}>
                <Typography variant="subtitle2" sx={{ mb: 1.5 }}>Sort by</Typography>
                <Stack spacing={1}>
                <Button
                    variant="text"
                    onClick={() => handleSortBy('fullName')}
                    startIcon={<SortIcon />}
                    sx={{ justifyContent: 'flex-start' }}
                >
                    Full Name
                </Button>
                <Button
                    variant="text"
                    onClick={() => handleSortBy('email')}
                    startIcon={<SortIcon />}
                    sx={{ justifyContent: 'flex-start' }}
                >
                    Email
                </Button>
                <Button
                    variant="text"
                    onClick={() => handleSortBy('country')}
                    startIcon={<SortIcon />}
                    sx={{ justifyContent: 'flex-start' }}
                >
                    Country
                </Button>
                </Stack>
            </Box>
            <Divider />
            <Box sx={{ p: 2 }}>
                <Button
                variant="text"
                onClick={() => {
                    setStatusFilter('all');
                    handleSortMenuClose();
                }}
                sx={{ width: '100%' }}
                >
                Clear Sort
                </Button>
            </Box>
        </Menu>
        {/* User table */}
     

        <TableContainer component={Paper} elevation={1} sx={{ borderRadius: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Full Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Country</TableCell>
              <TableCell>Join Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Subscription Type</TableCell>
              <TableCell>Role</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(user => (
              <TableRow key={user.id}>
                <TableCell>{user.fullName}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.country}</TableCell>
                <TableCell>{user.joinDate}</TableCell>
                <TableCell>
                  {user.status === 'active' && (
                    <Chip label="Active" color="success" size="small" />
                  )}
                  {user.status === 'inactive' && (
                    <Chip label="Inactive" color="warning" size="small" />
                  )}
                  {user.status === 'suspended' && (
                    <Chip label="Suspended" color="error" size="small" />
                  )}
                </TableCell>
                <TableCell>{user.subscriptionType}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell align="right">
                  <IconButton
                    onClick={(event) => handleUserActionClick(event, user.id)}
                    size="small"
                  >
                    <MoreVertIcon fontSize="small" />
                  </IconButton>
                  {/* Action menu */}
                  <Menu
                    anchorEl={actionMenuAnchorEl}
                    open={Boolean(actionMenuAnchorEl) && selectedUserId === user.id}
                    onClose={handleUserActionClose}
                  >
                    <MenuItem onClick={handleEditUser}>
                      <ListItemIcon><EditIcon fontSize="small" /></ListItemIcon>Edit
                    </MenuItem>
                    <MenuItem onClick={handleViewUser}>
                      <ListItemIcon><VisibilityIcon fontSize="small" /></ListItemIcon>View
                    </MenuItem>
                    {user.status !== 'suspended' && (
                      <>
                        <MenuItem onClick

                            // {handleToggleUserStatus}    
>
                            <ListItemIcon><BlockIcon fontSize="small" /></ListItemIcon>Block
                        </MenuItem>
                        </>
                    )}
                    <MenuItem onClick={handleDeleteUser}>
                      <ListItemIcon><DeleteIcon fontSize="small" /></ListItemIcon>Delete
                    </MenuItem>
                    </Menu>
                    </TableCell>
                    </TableRow>
                    ))}
                    </TableBody>
                    </Table>
                    <TablePagination
                      rowsPerPageOptions={[5, 10, 25]}
                      component="div"
                      count={filteredUsers.length}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      onPageChange={handleChangePage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                        labelRowsPerPage="Rows per page"
                        labelDisplayedRows={({ from, to, count }) => `${from}-${to} of ${count}`}
                        sx={{
                            '& .MuiTablePagination-toolbar': {
                                bgcolor: 'background.paper',
                                borderTop: '1px solid',
                                borderColor: 'divider',
                            },
                            }}
                    />
                </TableContainer>
                {/* User dialog */}
                <Dialog
                    open={userDialogOpen}
                    onClose={handleCloseUserDialog}
                    fullWidth
                    maxWidth="sm"
                    sx={{ '& .MuiDialog-paper': { borderRadius: 2 } }}
                >
                    <DialogTitle>
                        {selectedUser ? 'Edit User' : 'Add User'}
                    </DialogTitle>
                    <DialogContent>
                        <Stack spacing={2}>
                            <TextField
                                label="Full Name"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleFormInputChange}
                                fullWidth
                            />
                            <TextField
                                label="Email"
                                name="email"
                                value={formData.email}
                                onChange={handleFormInputChange}
                                fullWidth
                            />
                            <TextField
                                label="Country"
                                name="country"
                                value={formData.country}
                                onChange={handleFormInputChange}
                                fullWidth
                            />
                            <FormControl fullWidth>
                                <InputLabel>Status</InputLabel>
                                <Select
                                    name="status"
                                    value={formData.status}
                                    onChange={handleFormInputChange}
                                    fullWidth
                                    size="small"
                                >
                                    <MenuItem value="active">Active</MenuItem>
                                    <MenuItem value="inactive">Inactive</MenuItem>
                                    <MenuItem value="suspended">Suspended</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl fullWidth>
                                <InputLabel>Role</InputLabel>
                                <Select
                                    name="role"
                                    value={formData.role}
                                    onChange={handleFormInputChange}
                                    fullWidth
                                    size="small"
                                >
                                    <MenuItem value="user">User</MenuItem>
                                    <MenuItem value="admin">Admin</MenuItem>
                                </Select>
                            </FormControl>
                        </Stack>
                    </DialogContent>
                    <DialogActions sx={{ p: 2 }}>
                        <Button onClick={handleCloseUserDialog} color="error" startIcon={<CancelIcon />}>
                            Cancel
                        </Button>
                        <Button onClick={handleSaveUser} color="primary" startIcon={<SaveIcon />}>
                            Save
                        </Button>
                    </DialogActions>
                </Dialog>
                {/* Delete dialog */}
                <Dialog
                    open={deleteDialogOpen}
                    onClose={handleCloseDeleteDialog}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    sx={{ '& .MuiDialog-paper': { borderRadius: 2 } }}
                >
                    <DialogTitle id="alert-dialog-title">
                        Confirm Deletion
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Are you sure you want to delete this user? This action cannot be undone.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions sx={{ p: 2 }}>
                        <Button onClick={handleCloseDeleteDialog} color="error" startIcon={<CancelIcon />}>
                            Cancel
                        </Button>
                        <Button onClick={confirmDeleteUser} color="primary" startIcon={<CheckCircleIcon />}>
                            Delete
                        </Button>
                    </DialogActions>
                </Dialog>
            </Box>
        );
    }
export default UserManagement;
