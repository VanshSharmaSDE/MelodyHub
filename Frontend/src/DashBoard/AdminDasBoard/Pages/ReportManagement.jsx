import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  IconButton,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
  Stack,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Tabs,
  Tab,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TablePagination,
  FormControl,
  InputLabel,
  Select,
  InputAdornment,
  Avatar,
  Badge,
  Tooltip,
  Divider,
  CircularProgress,
  TextareaAutosize,
  Grid,
} from '@mui/material';

// Icons
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import FlagIcon from '@mui/icons-material/Flag';
import BlockIcon from '@mui/icons-material/Block';
import PersonIcon from '@mui/icons-material/Person';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import AlbumIcon from '@mui/icons-material/Album';
import CommentIcon from '@mui/icons-material/Comment';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EmailIcon from '@mui/icons-material/Email';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import CancelIcon from '@mui/icons-material/Cancel';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CopyrightIcon from '@mui/icons-material/Copyright';

function ReportManagement({ showNotification }) {
  // State management
  const [reports, setReports] = useState([]);
  const [filteredReports, setFilteredReports] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [resolveDialogOpen, setResolveDialogOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);
  const [actionMenuAnchorEl, setActionMenuAnchorEl] = useState(null);
  const [selectedReportId, setSelectedReportId] = useState(null);
  const [tabValue, setTabValue] = useState(0);
  const [filterAnchorEl, setFilterAnchorEl] = useState(null);
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [resolution, setResolution] = useState({
    action: 'none',
    comment: '',
  });
  
  // Report types and statuses for filtering
  const reportTypes = ['Content', 'User', 'Copyright', 'Technical', 'Other'];
  const reportStatuses = ['Open', 'In Progress', 'Resolved', 'Closed', 'Rejected'];
  
  // Load mock data
  useEffect(() => {
    // Simulate API call delay
    const timer = setTimeout(() => {
      const mockReports = Array(50).fill().map((_, i) => ({
        id: i + 1,
        title: `Report #${i + 1}: ${['Inappropriate content', 'Copyright claim', 'Offensive user behavior', 'Technical issue', 'Account problem'][Math.floor(Math.random() * 5)]}`,
        description: `Detailed description for report #${i + 1}. ${Math.random() > 0.5 ? 'This requires immediate attention.' : 'This should be reviewed when possible.'}`,
        type: reportTypes[Math.floor(Math.random() * reportTypes.length)],
        status: reportStatuses[Math.floor(Math.random() * reportStatuses.length)],
        priority: ['Low', 'Medium', 'High', 'Critical'][Math.floor(Math.random() * 4)],
        reportedBy: {
          id: Math.floor(Math.random() * 1000) + 1,
          name: `User ${Math.floor(Math.random() * 1000) + 1}`,
          avatar: null,
        },
        contentId: Math.floor(Math.random() * 1000) + 1,
        contentType: ['Track', 'Album', 'Playlist', 'User', 'Comment'][Math.floor(Math.random() * 5)],
        contentName: `${['Track', 'Album', 'Playlist', 'User', 'Comment'][Math.floor(Math.random() * 5)]} ${Math.floor(Math.random() * 100) + 1}`,
        dateReported: new Date(Date.now() - Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000)).toLocaleDateString(),
        lastUpdated: new Date(Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)).toLocaleDateString(),
        assignedTo: Math.random() > 0.7 ? {
          id: Math.floor(Math.random() * 10) + 1,
          name: `Admin ${Math.floor(Math.random() * 10) + 1}`,
          avatar: null,
        } : null,
        resolutionComment: Math.random() > 0.7 ? `Resolution comment for report #${i + 1}` : null,
        resolutionDate: Math.random() > 0.7 ? new Date(Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)).toLocaleDateString() : null,
      }));
      
      setReports(mockReports);
      setFilteredReports(mockReports);
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Filter reports based on search term, tab, and filters
  useEffect(() => {
    let filtered = reports;
    
    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(report => 
        report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.reportedBy.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.contentName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply tab filter
    if (tabValue === 1) {
      filtered = filtered.filter(report => report.status === 'Open' || report.status === 'In Progress');
    } else if (tabValue === 2) {
      filtered = filtered.filter(report => report.status === 'Resolved' || report.status === 'Closed');
    }
    
    // Apply type filter
    if (typeFilter !== 'all') {
      filtered = filtered.filter(report => report.type === typeFilter);
    }
    
    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(report => report.status === statusFilter);
    }
    
    setFilteredReports(filtered);
    setPage(0);
  }, [searchTerm, tabValue, typeFilter, statusFilter, reports]);
  
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
  
  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
  
  // Handle filter menu
  const handleFilterClick = (event) => {
    setFilterAnchorEl(event.currentTarget);
  };
  
  const handleFilterMenuClose = () => {
    setFilterAnchorEl(null);
  };
  
  // Handle filters
  const handleTypeFilterChange = (event) => {
    setTypeFilter(event.target.value);
  };
  
  const handleStatusFilterChange = (event) => {
    setStatusFilter(event.target.value);
  };
  
  // Handle report action menu
  const handleReportActionClick = (event, reportId) => {
    setActionMenuAnchorEl(event.currentTarget);
    setSelectedReportId(reportId);
  };
  
  const handleReportActionClose = () => {
    setActionMenuAnchorEl(null);
    setSelectedReportId(null);
  };
  
  // Handle report dialog
  const handleOpenDialog = (report) => {
    setSelectedReport(report);
    setDialogOpen(true);
  };
  
  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedReport(null);
  };
  
  // Handle resolve dialog
  const handleOpenResolveDialog = (report) => {
    setSelectedReport(report);
    setResolution({
      action: 'none',
      comment: '',
    });
    setResolveDialogOpen(true);
    handleReportActionClose();
  };
  
  const handleCloseResolveDialog = () => {
    setResolveDialogOpen(false);
    setSelectedReport(null);
  };
  
  // Handle action change
  const handleResolutionActionChange = (event) => {
    setResolution({
      ...resolution,
      action: event.target.value,
    });
  };
  
  // Handle comment change
  const handleResolutionCommentChange = (event) => {
    setResolution({
      ...resolution,
      comment: event.target.value,
    });
  };
  
  // Handle report actions
  const handleViewReport = () => {
    const report = reports.find(r => r.id === selectedReportId);
    handleReportActionClose();
    handleOpenDialog(report);
  };
  
  const handleResolveReport = () => {
    const report = reports.find(r => r.id === selectedReportId);
    handleOpenResolveDialog(report);
  };
  
  const handleAssignToMe = () => {
    // In a real app, this would call an API
    const updatedReports = reports.map(report => {
      if (report.id === selectedReportId) {
        return {
          ...report,
          status: 'In Progress',
          assignedTo: {
            id: 1, // Current admin ID
            name: 'Current Admin',
            avatar: null,
          },
          lastUpdated: new Date().toLocaleDateString(),
        };
      }
      return report;
    });
    setReports(updatedReports);
    handleReportActionClose();
    showNotification('Report has been assigned to you', 'success');
  };
  
  // Handle form submission for resolution
  const handleSubmitResolution = () => {
    if (resolution.action === 'none') {
      showNotification('Please select an action', 'error');
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const updatedReports = reports.map(report => {
        if (report.id === selectedReport.id) {
          return {
            ...report,
            status: resolution.action === 'reject' ? 'Rejected' : 'Resolved',
            resolutionComment: resolution.comment,
            resolutionDate: new Date().toLocaleDateString(),
            lastUpdated: new Date().toLocaleDateString(),
          };
        }
        return report;
      });
      
      setReports(updatedReports);
      setIsLoading(false);
      handleCloseResolveDialog();
      showNotification('Report has been processed successfully', 'success');
    }, 1000);
  };
  
  // Handle delete report
  const handleDeleteReport = () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const updatedReports = reports.filter(report => report.id !== selectedReportId);
      setReports(updatedReports);
      setIsLoading(false);
      handleReportActionClose();
      showNotification('Report has been deleted', 'success');
    }, 1000);
  };
  
  // Get icon based on content type
  const getContentTypeIcon = (contentType) => {
    switch (contentType) {
      case 'Track':
        return <MusicNoteIcon />;
      case 'Album':
        return <AlbumIcon />;
      case 'User':
        return <PersonIcon />;
      case 'Comment':
        return <CommentIcon />;
      default:
        return <FlagIcon />;
    }
  };
  
  // Get priority color
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'Critical':
        return 'error';
      case 'High':
        return 'warning';
      case 'Medium':
        return 'info';
      case 'Low':
        return 'success';
      default:
        return 'default';
    }
  };
  
  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case 'Open':
        return '#ff5252'; // Red
      case 'In Progress':
        return '#2196f3'; // Blue
      case 'Resolved':
        return '#4caf50'; // Green
      case 'Closed':
        return '#9e9e9e'; // Gray
      case 'Rejected':
        return '#ff9800'; // Orange
      default:
        return '#9e9e9e'; // Gray
    }
  };
  
  // Get status icon
  const getStatusIcon = (status) => {
    switch (status) {
      case 'Open':
        return <ReportProblemIcon />;
      case 'In Progress':
        return <AccessTimeIcon />;
      case 'Resolved':
        return <CheckCircleIcon />;
      case 'Closed':
        return <DoneAllIcon />;
      case 'Rejected':
        return <CancelIcon />;
      default:
        return <FlagIcon />;
    }
  };
  
  // Calculate displayed reports for pagination
  const displayedReports = filteredReports.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  
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
          <Typography variant="h4" sx={{ fontWeight: 700 }}>Reports & Issues</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            Manage user reports, content flags, and platform issues
          </Typography>
        </Box>
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
          <Tab label="All Reports" />
          <Tab 
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="body1" sx={{ mr: 1 }}>Active Issues</Typography>
                <Badge
                  badgeContent={reports.filter(r => r.status === 'Open' || r.status === 'In Progress').length}
                  color="error"
                  max={99}
                />
              </Box>
            }
          />
          <Tab label="Resolved" />
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
          placeholder="Search reports"
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
        <Box sx={{ p: 2, width: 240 }}>
          <Typography variant="subtitle2" sx={{ mb: 1.5 }}>Filter by Type</Typography>
          <FormControl fullWidth size="small" sx={{ mb: 2 }}>
            <Select
              value={typeFilter}
              onChange={handleTypeFilterChange}
              displayEmpty
            >
              <MenuItem value="all">All Types</MenuItem>
              {reportTypes.map((type) => (
                <MenuItem key={type} value={type}>{type}</MenuItem>
              ))}
            </Select>
          </FormControl>
          
          <Typography variant="subtitle2" sx={{ mb: 1.5 }}>Filter by Status</Typography>
          <FormControl fullWidth size="small">
            <Select
              value={statusFilter}
              onChange={handleStatusFilterChange}
              displayEmpty
            >
              <MenuItem value="all">All Statuses</MenuItem>
              {reportStatuses.map((status) => (
                <MenuItem key={status} value={status}>{status}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Menu>
      
      {/* Loading indicator */}
      {isLoading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <CircularProgress />
        </Box>
      )}
      
      {/* Reports table */}
      {!isLoading && (
        <TableContainer component={Paper} variant="outlined">
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                <TableCell>Report</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Reported</TableCell>
                <TableCell>Content</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Priority</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {displayedReports.map((report) => (
                <TableRow
                  key={report.id}
                  sx={{ 
                    '&:last-child td, &:last-child th': { border: 0 },
                    '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.05)' },
                  }}
                >
                  <TableCell>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {report.title}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        #{report.id} • {report.dateReported}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Chip 
                      label={report.type} 
                      size="small"
                      variant="outlined"
                      icon={report.type === 'Copyright' ? <CopyrightIcon fontSize="small" /> : undefined}
                    />
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar
                        sx={{ 
                          width: 24, 
                          height: 24, 
                          bgcolor: 'primary.dark',
                          fontSize: '0.75rem',
                          mr: 1,
                        }}
                      >
                        {report.reportedBy.name.charAt(0)}
                      </Avatar>
                      <Typography variant="body2">
                        {report.reportedBy.name}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <IconButton size="small" sx={{ mr: 0.5 }}>
                        {getContentTypeIcon(report.contentType)}
                      </IconButton>
                      <Typography variant="body2">
                        {report.contentName}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Chip 
                      icon={getStatusIcon(report.status)}
                      label={report.status} 
                      size="small"
                      sx={{ 
                        bgcolor: `${getStatusColor(report.status)}20`,
                        color: getStatusColor(report.status),
                        borderColor: getStatusColor(report.status),
                      }}
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell>
                    <Chip 
                      label={report.priority} 
                      size="small"
                      color={getPriorityColor(report.priority)}
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                      size="small"
                      onClick={() => handleOpenDialog(report)}
                    >
                      <VisibilityIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={(e) => handleReportActionClick(e, report.id)}
                    >
                      <MoreVertIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
              
              {displayedReports.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} align="center" sx={{ py: 3 }}>
                    <ReportProblemIcon sx={{ fontSize: 40, color: 'text.secondary', opacity: 0.3, mb: 1 }} />
                    <Typography variant="body1" sx={{ mb: 1 }}>
                      No reports found
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Try changing your filters or search term
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25, 50]}
            component="div"
            count={filteredReports.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      )}
      
      {/* Report Action Menu */}
      <Menu
        anchorEl={actionMenuAnchorEl}
        open={Boolean(actionMenuAnchorEl)}
        onClose={handleReportActionClose}
      >
        <MenuItem onClick={handleViewReport}>
          <ListItemIcon>
            <VisibilityIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>View Details</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleResolveReport}>
          <ListItemIcon>
            <CheckCircleIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Resolve Report</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleAssignToMe}>
          <ListItemIcon>
            <PersonIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Assign to Me</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleDeleteReport} sx={{ color: 'error.main' }}>
          <ListItemIcon sx={{ color: 'error.main' }}>
            <DeleteIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Delete Report</ListItemText>
        </MenuItem>
      </Menu>
      
      {/* Report Details Dialog */}
      <Dialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
      >
        {selectedReport && (
          <>
            <DialogTitle>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6">Report #{selectedReport.id}</Typography>
                <Chip 
                  label={selectedReport.status} 
                  size="small"
                  sx={{ 
                    bgcolor: `${getStatusColor(selectedReport.status)}20`,
                    color: getStatusColor(selectedReport.status),
                    borderColor: getStatusColor(selectedReport.status),
                  }}
                  variant="outlined"
                  icon={getStatusIcon(selectedReport.status)}
                />
              </Box>
            </DialogTitle>
            <DialogContent>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Typography variant="h6">{selectedReport.title}</Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
                    <Chip 
                      label={selectedReport.type} 
                      size="small"
                      variant="outlined"
                    />
                    <Chip 
                      label={selectedReport.priority} 
                      size="small"
                      color={getPriorityColor(selectedReport.priority)}
                      variant="outlined"
                    />
                    <Chip 
                      label={`Reported on ${selectedReport.dateReported}`}
                      size="small"
                      variant="outlined"
                      icon={<FlagIcon fontSize="small" />}
                    />
                  </Box>
                </Grid>
                
                <Grid item xs={12}>
                  <Divider />
                </Grid>
                
                <Grid item xs={12} md={7}>
                  <Typography variant="subtitle1" gutterBottom>Description</Typography>
                  <Paper variant="outlined" sx={{ p: 2, bgcolor: 'background.paper' }}>
                    <Typography variant="body2">{selectedReport.description}</Typography>
                  </Paper>
                  
                  {selectedReport.resolutionComment && (
                    <Box sx={{ mt: 3 }}>
                      <Typography variant="subtitle1" gutterBottom>Resolution</Typography>
                      <Paper variant="outlined" sx={{ p: 2, bgcolor: 'background.paper' }}>
                        <Typography variant="body2">{selectedReport.resolutionComment}</Typography>
                        
                        {selectedReport.resolutionDate && (
                          <Typography variant="caption" sx={{ display: 'block', mt: 1, color: 'text.secondary' }}>
                            Resolved on {selectedReport.resolutionDate}
                          </Typography>
                        )}
                      </Paper>
                    </Box>
                  )}
                </Grid>
                
                <Grid item xs={12} md={5}>
                  <Typography variant="subtitle1" gutterBottom>Report Details</Typography>
                  <Paper variant="outlined" sx={{ p: 2, mb: 3 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5 }}>
                      <Typography variant="body2" color="text.secondary">Reported By</Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar
                          sx={{ 
                            width: 24, 
                            height: 24, 
                            fontSize: '0.75rem',
                            mr: 1,
                          }}
                        >
                          {selectedReport.reportedBy.name.charAt(0)}
                        </Avatar>
                        <Typography variant="body2">{selectedReport.reportedBy.name}</Typography>
                      </Box>
                    </Box>
                    
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5 }}>
                      <Typography variant="body2" color="text.secondary">Content Type</Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <IconButton size="small" sx={{ mr: 0.5 }}>
                          {getContentTypeIcon(selectedReport.contentType)}
                        </IconButton>
                        <Typography variant="body2">{selectedReport.contentType}</Typography>
                      </Box>
                    </Box>
                    
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5 }}>
                      <Typography variant="body2" color="text.secondary">Content Name</Typography>
                      <Typography variant="body2">{selectedReport.contentName}</Typography>
                    </Box>
                    
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5 }}>
                      <Typography variant="body2" color="text.secondary">Assigned To</Typography>
                      {selectedReport.assignedTo ? (
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Avatar
                            sx={{ 
                              width: 24, 
                              height: 24, 
                              fontSize: '0.75rem',
                              mr: 1,
                              bgcolor: 'primary.main',
                            }}
                          >
                            {selectedReport.assignedTo.name.charAt(0)}
                          </Avatar>
                          <Typography variant="body2">{selectedReport.assignedTo.name}</Typography>
                        </Box>
                      ) : (
                        <Typography variant="body2" color="text.secondary">Unassigned</Typography>
                      )}
                    </Box>
                    
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="body2" color="text.secondary">Last Updated</Typography>
                      <Typography variant="body2">{selectedReport.lastUpdated}</Typography>
                    </Box>
                  </Paper>
                  
                  {selectedReport.status !== 'Resolved' && selectedReport.status !== 'Closed' && (
                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      onClick={() => {
                        handleCloseDialog();
                        handleOpenResolveDialog(selectedReport);
                      }}
                    >
                      Resolve This Report
                    </Button>
                  )}
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog}>Close</Button>
            </DialogActions>
          </>
        )}
      </Dialog>
      
      {/* Resolve Report Dialog */}
      <Dialog
        open={resolveDialogOpen}
        onClose={handleCloseResolveDialog}
        maxWidth="sm"
        fullWidth
      >
        {selectedReport && (
          <>
            <DialogTitle>Resolve Report #{selectedReport.id}</DialogTitle>
            <DialogContent>
              <FormControl fullWidth sx={{ mb: 3, mt: 1 }}>
                <InputLabel>Select Action</InputLabel>
                <Select
                  value={resolution.action}
                  onChange={handleResolutionActionChange}
                  label="Select Action"
                >
                  <MenuItem value="none">-- Select Action --</MenuItem>
                  <MenuItem value="content_removed">Remove Content</MenuItem>
                  <MenuItem value="user_warned">Warn User</MenuItem>
                  <MenuItem value="user_suspended">Suspend User</MenuItem>
                  <MenuItem value="copyright_takedown">Copyright Takedown</MenuItem>
                  <MenuItem value="issue_fixed">Fix Technical Issue</MenuItem>
                  <MenuItem value="no_action">No Action Required</MenuItem>
                  <MenuItem value="reject">Reject Report</MenuItem>
                </Select>
              </FormControl>
              
              <Typography variant="subtitle2" gutterBottom>Resolution Comment</Typography>
              <TextField
                fullWidth
                multiline
                rows={4}
                placeholder="Add details about how this report was resolved..."
                value={resolution.comment}
                onChange={handleResolutionCommentChange}
                variant="outlined"
              />
              
              <DialogContentText sx={{ mt: 2, color: 'text.secondary' }}>
                This report will be marked as resolved and the reporter will be notified.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseResolveDialog}>Cancel</Button>
              <Button 
                variant="contained" 
                color="primary"
                onClick={handleSubmitResolution}
                disabled={resolution.action === 'none'}
              >
                {isLoading ? <CircularProgress size={24} /> : 'Submit Resolution'}
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
}

export default ReportManagement;