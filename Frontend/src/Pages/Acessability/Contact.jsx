import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  Breadcrumbs,
  Link,
  Snackbar,
  Alert,
  MenuItem,
  FormControl,
  Select,
  InputLabel,
  useMediaQuery,
  useTheme,
  CircularProgress,
  Divider,
} from '@mui/material';
import {
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
  Send as SendIcon,
  Home as HomeIcon,
  ContactSupport as ContactSupportIcon,
} from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';

function ContactPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    issueType: '',
  });
  
  const [loading, setLoading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Form validation
    if (!formData.name || !formData.email || !formData.message || !formData.issueType) {
      setSnackbarMessage('Please fill in all required fields');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
      setLoading(false);
      return;
    }
    
    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setSnackbarMessage('Please enter a valid email address');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
      setLoading(false);
      return;
    }
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Here you would actually send the data to your backend
      // const response = await api.post('/contact', formData);
      
      setSnackbarMessage('Your message has been sent! We\'ll get back to you soon.');
      setSnackbarSeverity('success');
      setOpenSnackbar(true);
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        issueType: '',
      });
    } catch (error) {
      console.error('Error sending message:', error);
      setSnackbarMessage('Failed to send message. Please try again later.');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    } finally {
      setLoading(false);
    }
  };
  
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };
  
  const contactInfo = [
    {
      icon: <EmailIcon fontSize="large" sx={{ color: '#1DB954' }} />,
      title: "Email Us",
      details: "support@melodyhub.com",
      subtitle: "We'll respond within 24 hours"
    },
    {
      icon: <PhoneIcon fontSize="large" sx={{ color: '#1DB954' }} />,
      title: "Call Us",
      details: "+1 (555) 123-4567",
      subtitle: "Mon-Fri, 9am-5pm EST"
    },
    {
      icon: <LocationIcon fontSize="large" sx={{ color: '#1DB954' }} />,
      title: "Visit Us",
      details: "123 Music Avenue, Suite 456",
      subtitle: "San Francisco, CA 94107"
    }
  ];
  
  return (
    <Box sx={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #121212 0%, #181818 100%)',
      py: { xs: 4, md: 8 },
      color: '#ffffff',
    }}>
      <Container maxWidth="lg">
        {/* Breadcrumb Navigation */}
        <Breadcrumbs 
          separator="›" 
          aria-label="breadcrumb"
          sx={{ 
            mb: 4, 
            '& .MuiBreadcrumbs-ol': { 
              flexWrap: 'wrap' 
            },
            '& .MuiBreadcrumbs-separator': { 
              color: 'rgba(255,255,255,0.4)' 
            }
          }}
        >
          <Link 
            component={RouterLink} 
            to="/"
            sx={{ 
              display: 'flex', 
              alignItems: 'center',
              color: 'rgba(255,255,255,0.7)',
              textDecoration: 'none',
              '&:hover': { color: '#1DB954' }
            }}
          >
            <HomeIcon fontSize="small" sx={{ mr: 0.5 }} />
            Home
          </Link>
          <Typography 
            sx={{ 
              display: 'flex', 
              alignItems: 'center',
              color: '#1DB954' 
            }}
          >
            <ContactSupportIcon fontSize="small" sx={{ mr: 0.5 }} />
            Contact Us
          </Typography>
        </Breadcrumbs>
        
        {/* Header */}
        <Box 
          sx={{ 
            mb: 5, 
            textAlign: 'center',
            animation: 'fadeIn 0.8s ease-out',
            '@keyframes fadeIn': {
              '0%': { opacity: 0, transform: 'translateY(-20px)' },
              '100%': { opacity: 1, transform: 'translateY(0)' }
            }
          }}
        >
          <Typography 
            component="h1" 
            variant="h3" 
            sx={{ 
              fontWeight: 700,
              mb: 2,
              fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
              background: 'linear-gradient(90deg, #FFFFFF 0%, #1DB954 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Contact Us
          </Typography>
          <Typography 
            variant="subtitle1" 
            sx={{ 
              color: 'rgba(255,255,255,0.7)',
              maxWidth: '700px',
              mx: 'auto',
              lineHeight: 1.6,
            }}
          >
            Have questions, feedback, or need assistance with your MelodyHub account?
            We're here to help. Get in touch with our support team.
          </Typography>
        </Box>
        
        <Grid container spacing={4}>
          {/* Contact Information */}
          <Grid item xs={12} md={5}>
            <Paper 
              elevation={3}
              sx={{
                bgcolor: 'rgba(30,30,30,0.7)',
                borderRadius: 2,
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.05)',
                position: 'relative',
                overflow: 'hidden',
                height: '100%',
                p: { xs: 3, md: 4 },
                boxShadow: '0 10px 30px rgba(0,0,0,0.25)',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '4px',
                  height: '100%',
                  background: '#1DB954',
                }
              }}
            >
              <Typography variant="h5" fontWeight="600" mb={4}>
                Get In Touch
              </Typography>
              
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                {contactInfo.map((item, index) => (
                  <Box 
                    key={index}
                    sx={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 2,
                      transition: 'transform 0.3s ease',
                      '&:hover': {
                        transform: 'translateX(5px)'
                      }
                    }}
                  >
                    <Box 
                      sx={{
                        bgcolor: 'rgba(29, 185, 84, 0.1)',
                        p: 1.5,
                        borderRadius: '50%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}
                    >
                      {item.icon}
                    </Box>
                    <Box>
                      <Typography variant="h6" fontWeight="600" mb={0.5}>
                        {item.title}
                      </Typography>
                      <Typography variant="body1" color="#1DB954" fontWeight="500" mb={0.5}>
                        {item.details}
                      </Typography>
                      <Typography variant="body2" color="rgba(255,255,255,0.6)">
                        {item.subtitle}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
              
              <Box 
                sx={{ 
                  mt: 6, 
                  py: 3,
                  borderTop: '1px solid rgba(255,255,255,0.1)',
                  borderBottom: '1px solid rgba(255,255,255,0.1)',
                }}
              >
                <Typography variant="h6" fontWeight="600" mb={1}>
                  Follow Us
                </Typography>
                <Typography variant="body2" color="rgba(255,255,255,0.7)" mb={2}>
                  Stay updated with the latest news and releases
                </Typography>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  {['Twitter', 'Facebook', 'Instagram', 'YouTube'].map((platform) => (
                    <Button
                      key={platform}
                      variant="outlined"
                      size="small"
                      sx={{
                        borderColor: 'rgba(255,255,255,0.2)',
                        color: 'rgba(255,255,255,0.8)',
                        '&:hover': {
                          borderColor: '#1DB954',
                          color: '#1DB954',
                          backgroundColor: 'rgba(29,185,84,0.1)'
                        }
                      }}
                    >
                      {platform}
                    </Button>
                  ))}
                </Box>
              </Box>
              
              <Typography variant="body2" mt={4} color="rgba(255,255,255,0.5)">
                Our support team is available Monday through Friday from 9am to 5pm EST.
                For urgent inquiries during weekends, please use the emergency contact form.
              </Typography>
            </Paper>
          </Grid>
          
          {/* Contact Form */}
          <Grid item xs={12} md={7}>
            <Paper 
              elevation={3}
              component="form"
              onSubmit={handleSubmit}
              sx={{
                bgcolor: 'rgba(30,30,30,0.7)',
                borderRadius: 2,
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.05)',
                overflow: 'hidden',
                p: { xs: 3, md: 4 },
                boxShadow: '0 10px 30px rgba(0,0,0,0.25)',
                position: 'relative',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  height: '4px',
                  width: '30%',
                  background: '#1DB954',
                }
              }}
            >
              <Typography variant="h5" fontWeight="600" mb={3}>
                Send Us a Message
              </Typography>
              
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="name"
                    label="Your Name"
                    fullWidth
                    required
                    variant="outlined"
                    value={formData.name}
                    onChange={handleChange}
                    InputLabelProps={{ sx: { color: '#b3b3b3' } }}
                    InputProps={{ sx: { color: '#fff' } }}
                    sx={{
                      mb: 2,
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
                    name="email"
                    label="Email Address"
                    type="email"
                    fullWidth
                    required
                    variant="outlined"
                    value={formData.email}
                    onChange={handleChange}
                    InputLabelProps={{ sx: { color: '#b3b3b3' } }}
                    InputProps={{ sx: { color: '#fff' } }}
                    sx={{
                      mb: 2,
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': { borderColor: '#333' },
                        '&:hover fieldset': { borderColor: '#444' },
                        '&.Mui-focused fieldset': { borderColor: '#1DB954' }
                      }
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl 
                    fullWidth 
                    required 
                    sx={{
                      mb: 2,
                      '& .MuiOutlinedInput-root': {
                        color: '#fff',
                        '& fieldset': { borderColor: '#333' },
                        '&:hover fieldset': { borderColor: '#444' },
                        '&.Mui-focused fieldset': { borderColor: '#1DB954' }
                      }
                    }}
                  >
                    <InputLabel id="issue-type-label" sx={{ color: '#b3b3b3' }}>
                      Issue Type
                    </InputLabel>
                    <Select
                      labelId="issue-type-label"
                      id="issue-type"
                      name="issueType"
                      value={formData.issueType}
                      label="Issue Type"
                      onChange={handleChange}
                    >
                      <MenuItem value="account">Account & Login</MenuItem>
                      <MenuItem value="billing">Billing & Subscription</MenuItem>
                      <MenuItem value="playback">Playback & Streaming</MenuItem>
                      <MenuItem value="feature">Feature Request</MenuItem>
                      <MenuItem value="bug">Report a Bug</MenuItem>
                      <MenuItem value="other">Other</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="subject"
                    label="Subject"
                    fullWidth
                    variant="outlined"
                    value={formData.subject}
                    onChange={handleChange}
                    InputLabelProps={{ sx: { color: '#b3b3b3' } }}
                    InputProps={{ sx: { color: '#fff' } }}
                    sx={{
                      mb: 2,
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
                    name="message"
                    label="Your Message"
                    multiline
                    rows={6}
                    fullWidth
                    required
                    variant="outlined"
                    value={formData.message}
                    onChange={handleChange}
                    InputLabelProps={{ sx: { color: '#b3b3b3' } }}
                    InputProps={{ sx: { color: '#fff' } }}
                    sx={{
                      mb: 3,
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': { borderColor: '#333' },
                        '&:hover fieldset': { borderColor: '#444' },
                        '&.Mui-focused fieldset': { borderColor: '#1DB954' }
                      }
                    }}
                  />
                </Grid>
              </Grid>
              
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={loading}
                startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <SendIcon />}
                sx={{
                  py: 1.5,
                  px: 4,
                  borderRadius: 2,
                  fontSize: '1rem',
                  fontWeight: 500,
                  boxShadow: '0 4px 10px rgba(29,185,84,0.3)',
                  '&:hover': {
                    boxShadow: '0 6px 14px rgba(29,185,84,0.4)',
                  }
                }}
              >
                {loading ? 'Sending...' : 'Send Message'}
              </Button>
              
              <Typography variant="body2" color="rgba(255,255,255,0.5)" mt={3}>
                By submitting this form, you agree to our Privacy Policy and Terms of Service.
                We'll use your information only to respond to your inquiry.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
        
        {/* Footer */}
        <Box sx={{ textAlign: 'center', mt: 6, color: 'rgba(255,255,255,0.5)', pb: 4 }}>
          <Typography variant="body2">
            © 2025 MelodyHub. All rights reserved.
          </Typography>
        </Box>
      </Container>
      
      <Snackbar 
        open={openSnackbar} 
        autoHideDuration={6000} 
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbarSeverity} 
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default ContactPage;