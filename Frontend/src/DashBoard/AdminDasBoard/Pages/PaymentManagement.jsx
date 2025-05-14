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
  Card,
  CardContent,
  Grid,
  Tooltip,
  Divider,
  CircularProgress,
  Avatar,
} from '@mui/material';
import { styled } from '@mui/material/styles';

// Icons
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ReceiptIcon from '@mui/icons-material/Receipt';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import VisibilityIcon from '@mui/icons-material/Visibility';
import GetAppIcon from '@mui/icons-material/GetApp';
import EmailIcon from '@mui/icons-material/Email';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import SettingsBackupRestoreIcon from '@mui/icons-material/SettingsBackupRestore';
import EventIcon from '@mui/icons-material/Event';
import PersonIcon from '@mui/icons-material/Person';

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
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';

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
  ArcElement
);

// Custom styled component for the revenue card
const StyledRevenueCard = styled(Card)(({ theme }) => ({
  background: 'linear-gradient(45deg, #1DB954 30%, #1ED761 90%)',
  boxShadow: '0 6px 20px rgba(29, 185, 84, 0.3)',
  color: theme.palette.common.white,
  position: 'relative',
  overflow: 'hidden',
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    background: 'radial-gradient(circle at bottom right, rgba(255,255,255,0.2) 0%, transparent 70%)',
  },
}));

function PaymentManagement({ showNotification }) {
  // State management
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
  const [refundDialogOpen, setRefundDialogOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [actionMenuAnchorEl, setActionMenuAnchorEl] = useState(null);
  const [selectedTransactionId, setSelectedTransactionId] = useState(null);
  const [tabValue, setTabValue] = useState(0);
  const [filterAnchorEl, setFilterAnchorEl] = useState(null);
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    totalRevenue: 0,
    monthlyRevenue: 0,
    transactionCount: 0,
    activeSubscriptions: 0,
    revenueByType: [],
    monthlyTrend: [],
    refundRate: 0,
  });
  const [refundReason, setRefundReason] = useState('');
  
  const transactionTypes = ['Subscription', 'One-time', 'Refund', 'Payout'];
  const transactionStatuses = ['Completed', 'Pending', 'Failed', 'Refunded', 'Disputed'];
  
  // Load mock data
  useEffect(() => {
    // Simulate API call delay
    const timer = setTimeout(() => {
      // Generate mock transactions
      const mockTransactions = Array(100).fill().map((_, i) => {
        const isRefund = Math.random() > 0.85;
        const isPayout = !isRefund && Math.random() > 0.9;
        const amount = isPayout ? 
          (Math.random() * 1000 + 500).toFixed(2) : 
          isRefund ? 
            -(Math.random() * 20 + 5).toFixed(2) : 
            (Math.random() * 20 + 5).toFixed(2);
        
        const type = isPayout ? 'Payout' : isRefund ? 'Refund' : Math.random() > 0.7 ? 'One-time' : 'Subscription';
        
        return {
          id: `TXN-${100000 + i}`,
          date: new Date(Date.now() - Math.floor(Math.random() * 90 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0],
          amount: parseFloat(amount),
          currency: 'USD',
          type,
          status: isRefund ? 'Refunded' : Math.random() > 0.9 ? ['Failed', 'Pending', 'Disputed'][Math.floor(Math.random() * 3)] : 'Completed',
          user: {
            id: Math.floor(Math.random() * 1000) + 1,
            name: `User ${Math.floor(Math.random() * 1000) + 1}`,
            email: `user${Math.floor(Math.random() * 1000) + 1}@example.com`,
          },
          paymentMethod: Math.random() > 0.7 ? 'PayPal' : 'Credit Card',
          cardType: Math.random() > 0.7 ? null : ['Visa', 'Mastercard', 'Amex', 'Discover'][Math.floor(Math.random() * 4)],
          last4: Math.random() > 0.7 ? null : `${Math.floor(Math.random() * 10000)}`.padStart(4, '0'),
          subscriptionPlan: type === 'Subscription' ? ['Premium Monthly', 'Premium Annual', 'Family Plan', 'Student Plan'][Math.floor(Math.random() * 4)] : null,
          invoiceUrl: `https://example.com/invoices/${100000 + i}`,
          refundReason: isRefund ? ['Customer request', 'Payment error', 'Service issue', 'Duplicate payment'][Math.floor(Math.random() * 4)] : null,
        };
      });
      
      // Calculate stats
      const totalRevenue = mockTransactions.reduce((sum, t) => sum + t.amount, 0).toFixed(2);
      const last30Days = new Date();
      last30Days.setDate(last30Days.getDate() - 30);
      const last30DaysTxn = mockTransactions.filter(t => new Date(t.date) >= last30Days);
      const monthlyRevenue = last30DaysTxn.reduce((sum, t) => sum + t.amount, 0).toFixed(2);
      
      const activeSubscriptions = mockTransactions.filter(t => 
        t.type === 'Subscription' && 
        t.status === 'Completed' && 
        new Date(t.date) >= last30Days
      ).length;
      
      // Revenue by type
      const revenueByType = [
        { type: 'Premium Monthly', value: parseFloat((totalRevenue * 0.45).toFixed(2)) },
        { type: 'Premium Annual', value: parseFloat((totalRevenue * 0.35).toFixed(2)) },
        { type: 'Family Plan', value: parseFloat((totalRevenue * 0.15).toFixed(2)) },
        { type: 'Student Plan', value: parseFloat((totalRevenue * 0.05).toFixed(2)) },
      ];
      
      // Monthly trend (last 6 months)
      const monthlyTrend = [];
      for (let i = 5; i >= 0; i--) {
        const month = new Date();
        month.setMonth(month.getMonth() - i);
        
        const monthStart = new Date(month.getFullYear(), month.getMonth(), 1);
        const monthEnd = new Date(month.getFullYear(), month.getMonth() + 1, 0);
        
        const monthTransactions = mockTransactions.filter(t => 
          new Date(t.date) >= monthStart && new Date(t.date) <= monthEnd
        );
        
        const monthRevenue = monthTransactions.reduce((sum, t) => sum + t.amount, 0);
        
        monthlyTrend.push({
          month: month.toLocaleDateString('en-US', { month: 'short' }),
          revenue: parseFloat(monthRevenue.toFixed(2)),
        });
      }
      
      // Refund rate
      const refundedAmount = Math.abs(mockTransactions.filter(t => t.status === 'Refunded').reduce((sum, t) => sum + t.amount, 0));
      const grossRevenue = mockTransactions.filter(t => t.type !== 'Refund' && t.type !== 'Payout').reduce((sum, t) => sum + (t.amount > 0 ? t.amount : 0), 0);
      const refundRate = ((refundedAmount / grossRevenue) * 100).toFixed(2);
      
      // Set all data
      setTransactions(mockTransactions);
      setFilteredTransactions(mockTransactions);
      setStats({
        totalRevenue: parseFloat(totalRevenue),
        monthlyRevenue: parseFloat(monthlyRevenue),
        transactionCount: mockTransactions.length,
        activeSubscriptions,
        revenueByType,
        monthlyTrend,
        refundRate: parseFloat(refundRate),
      });
      
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Filter transactions based on search term, tab, and filters
  useEffect(() => {
    let filtered = transactions;
    
    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(txn => 
        txn.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        txn.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        txn.user.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply tab filter
    if (tabValue === 1) { // Subscriptions
      filtered = filtered.filter(txn => txn.type === 'Subscription');
    } else if (tabValue === 2) { // Refunds
      filtered = filtered.filter(txn => txn.status === 'Refunded' || txn.type === 'Refund');
    }
    
    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(txn => txn.status === statusFilter);
    }
    
    // Apply type filter
    if (typeFilter !== 'all') {
      filtered = filtered.filter(txn => txn.type === typeFilter);
    }
    
    // Apply date filter
    if (dateFilter !== 'all') {
      const now = new Date();
      let filterDate;
      
      switch (dateFilter) {
        case 'today':
          filterDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
          break;
        case 'yesterday':
          filterDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1);
          break;
        case 'week':
          filterDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7);
          break;
        case 'month':
          filterDate = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
          break;
        default:
          filterDate = null;
      }
      
      if (filterDate) {
        filtered = filtered.filter(txn => new Date(txn.date) >= filterDate);
      }
    }
    
    setFilteredTransactions(filtered);
    setPage(0);
  }, [searchTerm, tabValue, statusFilter, typeFilter, dateFilter, transactions]);
  
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
  
  // Handle filter changes
  const handleStatusFilterChange = (event) => {
    setStatusFilter(event.target.value);
  };
  
  const handleTypeFilterChange = (event) => {
    setTypeFilter(event.target.value);
  };
  
  const handleDateFilterChange = (event) => {
    setDateFilter(event.target.value);
  };
  
  // Handle transaction action menu
  const handleTransactionActionClick = (event, txnId) => {
    setActionMenuAnchorEl(event.currentTarget);
    setSelectedTransactionId(txnId);
  };
  
  const handleTransactionActionClose = () => {
    setActionMenuAnchorEl(null);
    setSelectedTransactionId(null);
  };
  
  // Handle transaction details dialog
  const handleOpenDetailsDialog = (transaction) => {
    setSelectedTransaction(transaction);
    setDetailsDialogOpen(true);
  };
  
  const handleCloseDetailsDialog = () => {
    setDetailsDialogOpen(false);
    setSelectedTransaction(null);
  };
  
  // Handle refund dialog
  const handleOpenRefundDialog = (transaction) => {
    setSelectedTransaction(transaction);
    setRefundReason('');
    setRefundDialogOpen(true);
  };
  
  const handleCloseRefundDialog = () => {
    setRefundDialogOpen(false);
    setSelectedTransaction(null);
  };
  
  // Handle refund reason change
  const handleRefundReasonChange = (event) => {
    setRefundReason(event.target.value);
  };
  
  // Handle transaction actions
  const handleViewTransaction = () => {
    const transaction = transactions.find(t => t.id === selectedTransactionId);
    handleTransactionActionClose();
    handleOpenDetailsDialog(transaction);
  };
  
  const handleRefundTransaction = () => {
    const transaction = transactions.find(t => t.id === selectedTransactionId);
    handleTransactionActionClose();
    handleOpenRefundDialog(transaction);
  };
  
  const handleSendReceipt = () => {
    handleTransactionActionClose();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      showNotification('Receipt sent successfully', 'success');
      setIsLoading(false);
    }, 1000);
  };
  
  const handleDownloadInvoice = () => {
    handleTransactionActionClose();
    showNotification('Invoice download initiated', 'info');
  };
  
  // Process refund
  const handleProcessRefund = () => {
    if (!refundReason) {
      showNotification('Please provide a refund reason', 'error');
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const updatedTransactions = transactions.map(txn => {
        if (txn.id === selectedTransaction.id) {
          return {
            ...txn,
            status: 'Refunded',
            refundReason,
          };
        }
        return txn;
      });
      
      // Add refund transaction
      const refundTransaction = {
        id: `TXN-R${selectedTransaction.id.slice(4)}`,
        date: new Date().toISOString().split('T')[0],
        amount: -Math.abs(selectedTransaction.amount),
        currency: selectedTransaction.currency,
        type: 'Refund',
        status: 'Completed',
        user: selectedTransaction.user,
        paymentMethod: selectedTransaction.paymentMethod,
        cardType: selectedTransaction.cardType,
        last4: selectedTransaction.last4,
        subscriptionPlan: selectedTransaction.subscriptionPlan,
        invoiceUrl: `https://example.com/invoices/refund-${selectedTransaction.id.slice(4)}`,
        refundReason,
        originalTransaction: selectedTransaction.id,
      };
      
      setTransactions([refundTransaction, ...updatedTransactions]);
      handleCloseRefundDialog();
      showNotification('Refund processed successfully', 'success');
      setIsLoading(false);
    }, 1500);
  };
  
  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return '#4caf50'; // Green
      case 'Pending':
        return '#ff9800'; // Orange
      case 'Failed':
        return '#f44336'; // Red
      case 'Refunded':
        return '#9e9e9e'; // Gray
      case 'Disputed':
        return '#e91e63'; // Pink
      default:
        return '#9e9e9e'; // Gray
    }
  };
  
  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(amount);
  };
  
  // Prepare chart data
  const revenueChartData = {
    labels: stats.monthlyTrend.map(item => item.month),
    datasets: [
      {
        label: 'Monthly Revenue',
        data: stats.monthlyTrend.map(item => item.revenue),
        backgroundColor: 'rgba(29, 185, 84, 0.6)',
        borderColor: '#1DB954',
        borderWidth: 2,
      }
    ]
  };
  
  const subscriptionChartData = {
    labels: stats.revenueByType.map(item => item.type),
    datasets: [
      {
        label: 'Revenue by Plan',
        data: stats.revenueByType.map(item => item.value),
        backgroundColor: ['#1DB954', '#1ED761', '#20F572', '#37FA88'],
        borderWidth: 0,
      }
    ]
  };
  
  // Chart options
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return formatCurrency(context.parsed.y);
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: false,
          drawBorder: false,
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          borderDash: [2, 2],
        },
        ticks: {
          callback: function(value) {
            return '$' + value;
          }
        }
      }
    }
  };
  
  const pieChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '65%',
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          padding: 20,
        },
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const label = context.label || '';
            const value = formatCurrency(context.parsed);
            return `${label}: ${value}`;
          }
        }
      }
    },
  };
  
  // Calculate displayed transactions for pagination
  const displayedTransactions = filteredTransactions.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  
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
          <Typography variant="h4" sx={{ fontWeight: 700 }}>Payment Management</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            Track revenue, subscriptions, and manage payments
          </Typography>
        </Box>
      </Stack>
      
      {/* Loading indicator for initial load */}
      {isLoading && transactions.length === 0 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 8 }}>
          <CircularProgress size={60} />
        </Box>
      )}
      
      {/* Dashboard Stats */}
      {!isLoading && (
        <>
          <Grid container spacing={3} sx={{ mb: 4 }}>
            {/* Total Revenue Card */}
            <Grid item xs={12} sm={6} md={3}>
              <StyledRevenueCard>
                <CardContent>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Avatar
                      sx={{
                        bgcolor: 'rgba(255, 255, 255, 0.3)',
                        color: 'white',
                        width: 40,
                        height: 40,
                      }}
                    >
                      <AttachMoneyIcon />
                    </Avatar>
                    <Box>
                      <Typography variant="overline" sx={{ opacity: 0.8 }}>
                        Total Revenue
                      </Typography>
                      <Typography variant="h4" sx={{ fontWeight: 700 }}>
                        {formatCurrency(stats.totalRevenue)}
                      </Typography>
                    </Box>
                  </Stack>
                </CardContent>
              </StyledRevenueCard>
            </Grid>
            
            {/* Monthly Revenue Card */}
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                    <Box>
                      <Typography variant="overline" color="text.secondary">
                        Monthly Revenue
                      </Typography>
                      <Typography variant="h5" sx={{ fontWeight: 700 }}>
                        {formatCurrency(stats.monthlyRevenue)}
                      </Typography>
                    </Box>
                    <Avatar
                      variant="rounded"
                      sx={{
                        bgcolor: 'rgba(29, 185, 84, 0.1)',
                        color: '#1DB954',
                      }}
                    >
                      <TrendingUpIcon />
                    </Avatar>
                  </Stack>
                  
                  <Box sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
                    <Chip 
                      icon={<TrendingUpIcon sx={{ fontSize: '0.8rem !important' }} />}
                      label="12% growth" 
                      size="small" 
                      color="success"
                      sx={{ height: 20, fontSize: '0.75rem' }}
                    />
                    <Typography variant="caption" color="text.secondary" sx={{ ml: 1 }}>
                      vs last month
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            
            {/* Active Subscriptions Card */}
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                    <Box>
                      <Typography variant="overline" color="text.secondary">
                        Active Subscriptions
                      </Typography>
                      <Typography variant="h5" sx={{ fontWeight: 700 }}>
                        {stats.activeSubscriptions}
                      </Typography>
                    </Box>
                    <Avatar
                      variant="rounded"
                      sx={{
                        bgcolor: 'rgba(25, 118, 210, 0.1)',
                        color: '#1976d2',
                      }}
                    >
                      <CreditCardIcon />
                    </Avatar>
                  </Stack>
                  
                  <Box sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
                    <Typography variant="caption" color="text.secondary">
                      Renewal rate:
                    </Typography>
                    <Typography variant="caption" color="success.main" sx={{ fontWeight: 600, ml: 1 }}>
                      94%
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            
            {/* Refund Rate Card */}
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                    <Box>
                      <Typography variant="overline" color="text.secondary">
                        Refund Rate
                      </Typography>
                      <Typography variant="h5" sx={{ fontWeight: 700 }}>
                        {stats.refundRate}%
                      </Typography>
                    </Box>
                    <Avatar
                      variant="rounded"
                      sx={{
                        bgcolor: 'rgba(211, 47, 47, 0.1)',
                        color: '#d32f2f',
                      }}
                    >
                      <SettingsBackupRestoreIcon />
                    </Avatar>
                  </Stack>
                  
                  <Box sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
                    <Chip 
                      icon={<TrendingDownIcon sx={{ fontSize: '0.8rem !important' }} />}
                      label="2.4% decrease" 
                      size="small" 
                      color="success"
                      sx={{ height: 20, fontSize: '0.75rem' }}
                    />
                    <Typography variant="caption" color="text.secondary" sx={{ ml: 1 }}>
                      vs last quarter
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          
          {/* Charts */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            {/* Revenue trend chart */}
            <Grid item xs={12} md={8}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>Revenue Trend</Typography>
                  <Box sx={{ height: 300 }}>
                    <Bar data={revenueChartData} options={chartOptions} />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            
            {/* Subscription breakdown */}
            <Grid item xs={12} md={4}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>Revenue by Plan</Typography>
                  <Box sx={{ height: 300, display: 'flex', justifyContent: 'center', position: 'relative' }}>
                    <Doughnut data={subscriptionChartData} options={pieChartOptions} />
                    <Box sx={{ 
                      position: 'absolute', 
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      width: '100%',
                      maxWidth: '100px',
                      textAlign: 'center',
                    }}>
                      <Typography variant="caption" color="text.secondary">
                        Total
                      </Typography>
                      <Typography variant="h6" sx={{ fontWeight: 700 }}>
                        {formatCurrency(stats.totalRevenue)}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          
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
                },
              }}
            >
              <Tab label="All Transactions" />
              <Tab label="Subscriptions" />
              <Tab label="Refunds" />
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
              placeholder="Search transactions"
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
            <Box sx={{ p: 2, width: 250 }}>
              <Typography variant="subtitle2" sx={{ mb: 1.5 }}>Filter by Status</Typography>
              <FormControl fullWidth size="small" sx={{ mb: 2 }}>
                <Select
                  value={statusFilter}
                  onChange={handleStatusFilterChange}
                  displayEmpty
                >
                  <MenuItem value="all">All Statuses</MenuItem>
                  {transactionStatuses.map((status) => (
                    <MenuItem key={status} value={status}>{status}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              
              <Typography variant="subtitle2" sx={{ mb: 1.5 }}>Filter by Type</Typography>
              <FormControl fullWidth size="small" sx={{ mb: 2 }}>
                <Select
                  value={typeFilter}
                  onChange={handleTypeFilterChange}
                  displayEmpty
                >
                  <MenuItem value="all">All Types</MenuItem>
                  {transactionTypes.map((type) => (
                    <MenuItem key={type} value={type}>{type}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              
              <Typography variant="subtitle2" sx={{ mb: 1.5 }}>Filter by Date</Typography>
              <FormControl fullWidth size="small">
                <Select
                  value={dateFilter}
                  onChange={handleDateFilterChange}
                  displayEmpty
                >
                  <MenuItem value="all">All Time</MenuItem>
                  <MenuItem value="today">Today</MenuItem>
                  <MenuItem value="yesterday">Yesterday</MenuItem>
                  <MenuItem value="week">Last 7 Days</MenuItem>
                  <MenuItem value="month">Last 30 Days</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Menu>
          
          {/* Transactions Table */}
          <TableContainer component={Paper} variant="outlined">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Transaction ID</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Customer</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Payment Method</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={8} align="center" sx={{ py: 3 }}>
                      <CircularProgress size={40} />
                    </TableCell>
                  </TableRow>
                ) : displayedTransactions.length > 0 ? (
                  displayedTransactions.map((transaction) => (
                    <TableRow 
                      key={transaction.id}
                      hover
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {transaction.id}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <EventIcon sx={{ fontSize: 16, mr: 0.5, color: 'text.secondary' }} />
                          <Typography variant="body2">{transaction.date}</Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Avatar 
                            sx={{ 
                              width: 24, 
                              height: 24, 
                              fontSize: '0.75rem',
                              bgcolor: 'primary.dark',
                              mr: 1,
                            }}
                          >
                            {transaction.user.name.charAt(0)}
                          </Avatar>
                          <Box>
                            <Typography variant="body2">{transaction.user.name}</Typography>
                            <Typography variant="caption" color="text.secondary">{transaction.user.email}</Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Chip 
                          label={transaction.type} 
                          size="small"
                          color={
                            transaction.type === 'Subscription' ? 'primary' :
                            transaction.type === 'Refund' ? 'default' :
                            transaction.type === 'Payout' ? 'warning' : 
                            'success'
                          }
                          variant="outlined"
                        />
                        {transaction.subscriptionPlan && (
                          <Typography variant="caption" display="block" color="text.secondary" sx={{ mt: 0.5 }}>
                            {transaction.subscriptionPlan}
                          </Typography>
                        )}
                      </TableCell>
                      <TableCell>
                        <Typography 
                          variant="body2" 
                          color={transaction.amount < 0 ? 'error.main' : 'success.main'}
                          sx={{ fontWeight: 600 }}
                        >
                          {formatCurrency(transaction.amount)}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip 
                          label={transaction.status} 
                          size="small"
                          sx={{ 
                            bgcolor: `${getStatusColor(transaction.status)}20`,
                            color: getStatusColor(transaction.status),
                            borderColor: getStatusColor(transaction.status),
                          }}
                          variant="outlined"
                        />
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          {transaction.paymentMethod === 'Credit Card' ? (
                            <CreditCardIcon fontSize="small" sx={{ mr: 1 }} />
                          ) : (
                            <AccountBalanceWalletIcon fontSize="small" sx={{ mr: 1 }} />
                          )}
                          <Typography variant="body2">
                            {transaction.paymentMethod}
                            {transaction.cardType && transaction.last4 && (
                              <Typography variant="caption" display="block" color="text.secondary">
                                {transaction.cardType} •••• {transaction.last4}
                              </Typography>
                            )}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell align="right">
                        <IconButton
                          size="small"
                          onClick={() => handleOpenDetailsDialog(transaction)}
                        >
                          <VisibilityIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={(e) => handleTransactionActionClick(e, transaction.id)}
                        >
                          <MoreVertIcon fontSize="small" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} align="center" sx={{ py: 3 }}>
                      <Box sx={{ py: 3 }}>
                        <ReceiptIcon sx={{ fontSize: 40, color: 'text.secondary', opacity: 0.3, mb: 1 }} />
                        <Typography variant="body1" gutterBottom>
                          No transactions found
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Try changing your filters or search term
                        </Typography>
                      </Box>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, 50]}
              component="div"
              count={filteredTransactions.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableContainer>
        </>
      )}
      
      {/* Transaction Action Menu */}
      <Menu
        anchorEl={actionMenuAnchorEl}
        open={Boolean(actionMenuAnchorEl)}
        onClose={handleTransactionActionClose}
      >
        <MenuItem onClick={handleViewTransaction}>
          <ListItemIcon>
            <VisibilityIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>View Details</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleDownloadInvoice}>
          <ListItemIcon>
            <GetAppIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Download Invoice</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleSendReceipt}>
          <ListItemIcon>
            <EmailIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Send Receipt</ListItemText>
        </MenuItem>
        {selectedTransactionId && 
          transactions.find(t => t.id === selectedTransactionId)?.status === 'Completed' &&
          transactions.find(t => t.id === selectedTransactionId)?.type !== 'Refund' &&
          transactions.find(t => t.id === selectedTransactionId)?.amount > 0 && (
            <MenuItem onClick={handleRefundTransaction}>
              <ListItemIcon>
                <SettingsBackupRestoreIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Process Refund</ListItemText>
            </MenuItem>
        )}
      </Menu>
      
      {/* Transaction Details Dialog */}
      <Dialog
        open={detailsDialogOpen}
        onClose={handleCloseDetailsDialog}
        maxWidth="md"
        fullWidth
      >
        {selectedTransaction && (
          <>
            <DialogTitle>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6">Transaction Details</Typography>
                <Chip 
                  label={selectedTransaction.status} 
                  size="small"
                  sx={{ 
                    bgcolor: `${getStatusColor(selectedTransaction.status)}20`,
                    color: getStatusColor(selectedTransaction.status),
                    borderColor: getStatusColor(selectedTransaction.status),
                  }}
                  variant="outlined"
                />
              </Box>
            </DialogTitle>
            <DialogContent>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle1" gutterBottom>Transaction Information</Typography>
                  <Paper variant="outlined" sx={{ p: 2 }}>
                    <Stack spacing={2}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="body2" color="text.secondary">Transaction ID</Typography>
                        <Typography variant="body2" fontWeight={500}>{selectedTransaction.id}</Typography>
                      </Box>
                      
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="body2" color="text.secondary">Date</Typography>
                        <Typography variant="body2">{selectedTransaction.date}</Typography>
                      </Box>
                      
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="body2" color="text.secondary">Type</Typography>
                        <Chip 
                          label={selectedTransaction.type} 
                          size="small"
                          color={
                            selectedTransaction.type === 'Subscription' ? 'primary' :
                            selectedTransaction.type === 'Refund' ? 'default' :
                            selectedTransaction.type === 'Payout' ? 'warning' : 
                            'success'
                          }
                          variant="outlined"
                        />
                      </Box>
                      
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="body2" color="text.secondary">Amount</Typography>
                        <Typography 
                          variant="body2" 
                          fontWeight={600}
                          color={selectedTransaction.amount < 0 ? 'error.main' : 'success.main'}
                        >
                          {formatCurrency(selectedTransaction.amount)}
                        </Typography>
                      </Box>
                      
                      {selectedTransaction.subscriptionPlan && (
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                          <Typography variant="body2" color="text.secondary">Plan</Typography>
                          <Typography variant="body2">{selectedTransaction.subscriptionPlan}</Typography>
                        </Box>
                      )}
                      
                      {selectedTransaction.refundReason && (
                        <Box>
                          <Typography variant="body2" color="text.secondary" gutterBottom>Refund Reason</Typography>
                          <Paper variant="outlined" sx={{ p: 1, bgcolor: 'background.default' }}>
                            <Typography variant="body2">{selectedTransaction.refundReason}</Typography>
                          </Paper>
                        </Box>
                      )}
                    </Stack>
                  </Paper>
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle1" gutterBottom>Customer Information</Typography>
                  <Paper variant="outlined" sx={{ p: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Avatar 
                        sx={{ 
                          width: 40, 
                          height: 40,
                          bgcolor: 'primary.dark',
                          mr: 2,
                        }}
                      >
                        {selectedTransaction.user.name.charAt(0)}
                      </Avatar>
                      <Box>
                        <Typography variant="body1" fontWeight={500}>{selectedTransaction.user.name}</Typography>
                        <Typography variant="body2" color="text.secondary">{selectedTransaction.user.email}</Typography>
                      </Box>
                    </Box>
                    
                    <Divider sx={{ my: 2 }} />
                    
                    <Typography variant="subtitle2" gutterBottom>Payment Method</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      {selectedTransaction.paymentMethod === 'Credit Card' ? (
                        <CreditCardIcon sx={{ mr: 1 }} />
                      ) : (
                        <AccountBalanceWalletIcon sx={{ mr: 1 }} />
                      )}
                      <Typography variant="body2">
                        {selectedTransaction.paymentMethod}
                        {selectedTransaction.cardType && selectedTransaction.last4 && (
                          <Typography variant="body2" color="text.secondary">
                            {selectedTransaction.cardType} ending in {selectedTransaction.last4}
                          </Typography>
                        )}
                      </Typography>
                    </Box>
                    
                    <Box sx={{ mt: 3 }}>
                      <Button
                        variant="outlined"
                        startIcon={<GetAppIcon />}
                        fullWidth
                        onClick={handleDownloadInvoice}
                      >
                        Download Invoice
                      </Button>
                    </Box>
                  </Paper>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDetailsDialog}>Close</Button>
              {selectedTransaction.status === 'Completed' && 
                selectedTransaction.type !== 'Refund' &&
                selectedTransaction.amount > 0 && (
                <Button 
                  color="primary" 
                  onClick={() => {
                    handleCloseDetailsDialog();
                    handleOpenRefundDialog(selectedTransaction);
                  }}
                  startIcon={<SettingsBackupRestoreIcon />}
                >
                  Process Refund
                </Button>
              )}
            </DialogActions>
          </>
        )}
      </Dialog>
      
      {/* Refund Dialog */}
      <Dialog
        open={refundDialogOpen}
        onClose={handleCloseRefundDialog}
        maxWidth="sm"
        fullWidth
      >
        {selectedTransaction && (
          <>
            <DialogTitle>Process Refund</DialogTitle>
            <DialogContent>
              <DialogContentText gutterBottom>
                You are about to refund transaction {selectedTransaction.id} for {formatCurrency(Math.abs(selectedTransaction.amount))}.
              </DialogContentText>
              
              <Box sx={{ mb: 3, mt: 2 }}>
                <Typography variant="subtitle2" gutterBottom>Transaction Details</Typography>
                <Paper variant="outlined" sx={{ p: 2 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Typography variant="body2" color="text.secondary">Customer</Typography>
                      <Typography variant="body2">{selectedTransaction.user.name}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2" color="text.secondary">Date</Typography>
                      <Typography variant="body2">{selectedTransaction.date}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2" color="text.secondary">Amount</Typography>
                      <Typography variant="body2" fontWeight={600} color="success.main">
                        {formatCurrency(Math.abs(selectedTransaction.amount))}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2" color="text.secondary">Payment Method</Typography>
                      <Typography variant="body2">{selectedTransaction.paymentMethod}</Typography>
                    </Grid>
                  </Grid>
                </Paper>
              </Box>
              
              <Typography variant="subtitle2" gutterBottom>Refund Reason (Required)</Typography>
              <TextField
                autoFocus
                margin="dense"
                id="reason"
                fullWidth
                multiline
                rows={3}
                variant="outlined"
                value={refundReason}
                onChange={handleRefundReasonChange}
                placeholder="Please provide a reason for this refund..."
                required
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseRefundDialog}>Cancel</Button>
              <Button 
                color="primary" 
                variant="contained"
                onClick={handleProcessRefund}
                disabled={!refundReason || isLoading}
              >
                {isLoading ? <CircularProgress size={24} /> : 'Process Refund'}
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
}

export default PaymentManagement;