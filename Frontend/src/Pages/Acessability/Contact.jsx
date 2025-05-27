import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Paper,
  Breadcrumbs,
  Link,
  Snackbar,
  Alert,
  useMediaQuery,
  useTheme,
  CircularProgress,
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
  const form = useRef();

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
  const [formErrors, setFormErrors] = useState({});
  const [focused, setFocused] = useState({
    name: false,
    email: false,
    subject: false,
    message: false,
    issueType: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when field is edited
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleFocus = (field) => {
    setFocused(prev => ({
      ...prev,
      [field]: true
    }));
  };

  const handleBlur = (field) => {
    setFocused(prev => ({
      ...prev,
      [field]: false
    }));
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }

    if (!formData.message.trim()) {
      errors.message = 'Message is required';
    }

    if (!formData.issueType) {
      errors.issueType = 'Please select an issue type';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const issueTypes = [
    { value: "account", label: "Account & Login", color: "#FF5722" },
    { value: "billing", label: "Billing & Subscription", color: "#FFC107" },
    { value: "playback", label: "Playback & Streaming", color: "#2196F3" },
    { value: "feature", label: "Feature Request", color: "#4CAF50" },
    { value: "bug", label: "Report a Bug", color: "#F44336" },
    { value: "other", label: "Other", color: "#9C27B0" }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      setSnackbarMessage('Please correct the errors in the form');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
      return;
    }

    setLoading(true);

    try {
      // Add current date and time
      const now = new Date();
      const formattedDate = now.toISOString().slice(0, 19).replace('T', ' ');

      // Create a hidden field for date
      const dateInput = document.createElement('input');
      dateInput.type = 'hidden';
      dateInput.name = 'date';
      dateInput.value = formattedDate;
      form.current.appendChild(dateInput);

      // Add issue type label
      const issueTypeLabel = issueTypes.find(type => type.value === formData.issueType)?.label || 'Other';

      const issueTypeLabelInput = document.createElement('input');
      issueTypeLabelInput.type = 'hidden';
      issueTypeLabelInput.name = 'issueTypeLabel';
      issueTypeLabelInput.value = issueTypeLabel;
      form.current.appendChild(issueTypeLabelInput);

      console.log('Sending email with data:', {
        ...formData,
        dateInput: formattedDate,
        issueTypeLabel: issueTypeLabel
      });

      // EmailJS send form
      const result = await emailjs.sendForm(
        'service_wkt3zj9',
        'template_hy2ew38',
        form.current,
        'eCU48RTYASuiPg0sV'
      );

      // Remove the temporary fields
      if (dateInput) form.current.removeChild(dateInput);
      if (issueTypeLabelInput) form.current.removeChild(issueTypeLabelInput);

      console.log('Email sent successfully:', result.text);
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
      console.error('Error sending email:', error);
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
      position: 'relative',
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '300px',
        background: 'linear-gradient(180deg, rgba(29,185,84,0.15) 0%, rgba(29,185,84,0) 100%)',
        zIndex: 0
      }
    }}>
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
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
          <Grid item xs={12} md={5} width={'100%'}>
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

              <Typography variant="body2" mt={4} color="rgba(255,255,255,0.5)">
                Our support team is available Monday through Friday from 9am to 5pm EST.
                For urgent inquiries during weekends, please use the emergency contact form.
              </Typography>
            </Paper>
          </Grid>

          {/* Custom Contact Form */}
          <Grid item xs={12} md={7} width={'100%'}>
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
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: '50%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    background: 'rgba(29, 185, 84, 0.15)',
                    mr: 2
                  }}
                >
                  <SendIcon sx={{ color: '#1DB954' }} />
                </Box>
                <Typography variant="h5" fontWeight="600">
                  Send Us a Message
                </Typography>
              </Box>

              <Box
                sx={{
                  mb: 4,
                  p: 2.5,
                  background: 'rgba(29, 185, 84, 0.05)',
                  borderRadius: 2,
                  border: '1px dashed rgba(29, 185, 84, 0.2)',
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <Box
                  sx={{
                    width: 10,
                    height: 10,
                    borderRadius: '50%',
                    bgcolor: '#1DB954',
                    mr: 2
                  }}
                />
                <Typography variant="body2" color="rgba(255,255,255,0.8)">
                  Fill in the form below with your details and inquiry. Our team will review your message and get back to you as soon as possible.
                </Typography>
              </Box>

              <form ref={form} onSubmit={handleSubmit}>
                <Box sx={{ mb: 4 }}>
                  <Box sx={{ mb: 0.75, display: 'flex', justifyContent: 'space-between' }}>
                    <label
                      htmlFor="name"
                      style={{
                        color: formErrors.name ? '#f44336' : 'rgba(255,255,255,0.7)',
                        fontWeight: 500,
                        fontSize: '0.875rem'
                      }}
                    >
                      Your Name <span style={{ color: '#f44336' }}>*</span>
                    </label>
                    {formErrors.name && (
                      <span style={{
                        color: '#f44336',
                        fontSize: '0.75rem',
                        fontWeight: 400
                      }}>
                        {formErrors.name}
                      </span>
                    )}
                  </Box>
                  <Box
                    sx={{
                      position: 'relative',
                      '&::before': focused.name && {
                        content: '""',
                        position: 'absolute',
                        left: 0,
                        top: 0,
                        width: '2px',
                        height: '100%',
                        backgroundColor: formErrors.name ? '#f44336' : '#1DB954',
                        transition: 'all 0.2s ease'
                      }
                    }}
                  >
                    <input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      onFocus={() => handleFocus('name')}
                      onBlur={() => handleBlur('name')}
                      style={{
                        width: '100%',
                        padding: '12px 14px',
                        backgroundColor: 'rgba(0,0,0,0.2)',
                        border: `1px solid ${formErrors.name ? '#f44336' : focused.name ? '#1DB954' : 'rgba(255,255,255,0.1)'}`,
                        borderRadius: '8px',
                        color: '#fff',
                        fontSize: '1rem',
                        outline: 'none',
                        transition: 'all 0.2s ease',
                        boxSizing: 'border-box'
                      }}
                      placeholder="Enter your full name"
                    />
                  </Box>
                </Box>

                <Box sx={{ mb: 4 }}>
                  <Box sx={{ mb: 0.75, display: 'flex', justifyContent: 'space-between' }}>
                    <label
                      htmlFor="email"
                      style={{
                        color: formErrors.email ? '#f44336' : 'rgba(255,255,255,0.7)',
                        fontWeight: 500,
                        fontSize: '0.875rem'
                      }}
                    >
                      Email Address <span style={{ color: '#f44336' }}>*</span>
                    </label>
                    {formErrors.email && (
                      <span style={{
                        color: '#f44336',
                        fontSize: '0.75rem',
                        fontWeight: 400
                      }}>
                        {formErrors.email}
                      </span>
                    )}
                  </Box>
                  <Box
                    sx={{
                      position: 'relative',
                      '&::before': focused.email && {
                        content: '""',
                        position: 'absolute',
                        left: 0,
                        top: 0,
                        width: '2px',
                        height: '100%',
                        backgroundColor: formErrors.email ? '#f44336' : '#1DB954',
                        transition: 'all 0.2s ease'
                      }
                    }}
                  >
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      onFocus={() => handleFocus('email')}
                      onBlur={() => handleBlur('email')}
                      style={{
                        width: '100%',
                        padding: '12px 14px',
                        backgroundColor: 'rgba(0,0,0,0.2)',
                        border: `1px solid ${formErrors.email ? '#f44336' : focused.email ? '#1DB954' : 'rgba(255,255,255,0.1)'}`,
                        borderRadius: '8px',
                        color: '#fff',
                        fontSize: '1rem',
                        outline: 'none',
                        transition: 'all 0.2s ease',
                        boxSizing: 'border-box'
                      }}
                      placeholder="Enter your email address"
                    />
                  </Box>
                </Box>

                <Box sx={{ mb: 4 }}>
                  <Box sx={{ mb: 0.75, display: 'flex', justifyContent: 'space-between' }}>
                    <label
                      htmlFor="issueType"
                      style={{
                        color: formErrors.issueType ? '#f44336' : 'rgba(255,255,255,0.7)',
                        fontWeight: 500,
                        fontSize: '0.875rem'
                      }}
                    >
                      Issue Type <span style={{ color: '#f44336' }}>*</span>
                    </label>
                    {formErrors.issueType && (
                      <span style={{
                        color: '#f44336',
                        fontSize: '0.75rem',
                        fontWeight: 400,
                      }}>
                        {formErrors.issueType}
                      </span>
                    )}
                  </Box>
                  <Box
                    sx={{
                      position: 'relative',
                      '&::before': focused.issueType && {
                        content: '""',
                        position: 'absolute',
                        left: 0,
                        top: 0,
                        width: '2px',
                        height: '100%',
                        backgroundColor: formErrors.issueType ? '#f44336' : '#1DB954',
                        transition: 'all 0.2s ease'
                      }
                    }}
                  >
                    <select
                      id="issueType"
                      name="issueType"
                      value={formData.issueType}
                      onChange={handleChange}
                      onFocus={() => handleFocus('issueType')}
                      onBlur={() => handleBlur('issueType')}
                      style={{
                        width: '100%',
                        padding: '12px 14px',
                        backgroundColor: 'rgba(0,0,0,0.2)',
                        border: `1px solid ${formErrors.issueType ? '#f44336' : focused.issueType ? '#1DB954' : 'rgba(255,255,255,0.1)'}`,
                        borderRadius: '8px',
                        color: '#fff',
                        fontSize: '1rem',
                        outline: 'none',
                        transition: 'all 0.2s ease',
                        appearance: 'none',
                        backgroundImage: 'url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'white\'%3e%3cpath d=\'M7 10l5 5 5-5z\'/%3e%3c/svg%3e")',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'right 10px center',
                        boxSizing: 'border-box'
                      }}
                    >
                      <option value="" disabled>Select an issue type</option>
                      {issueTypes.map(type => (
                        <option key={type.value} value={type.value} style={{ backgroundColor: 'black !important', }}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                  </Box>
                </Box>

                <Box sx={{ mb: 4 }}>
                  <Box sx={{ mb: 0.75 }}>
                    <label
                      htmlFor="subject"
                      style={{
                        color: 'rgba(255,255,255,0.7)',
                        fontWeight: 500,
                        fontSize: '0.875rem'
                      }}
                    >
                      Subject
                    </label>
                  </Box>
                  <Box
                    sx={{
                      position: 'relative',
                      '&::before': focused.subject && {
                        content: '""',
                        position: 'absolute',
                        left: 0,
                        top: 0,
                        width: '2px',
                        height: '100%',
                        backgroundColor: '#1DB954',
                        transition: 'all 0.2s ease'
                      }
                    }}
                  >
                    <input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      onFocus={() => handleFocus('subject')}
                      onBlur={() => handleBlur('subject')}
                      style={{
                        width: '100%',
                        padding: '12px 14px',
                        backgroundColor: 'rgba(0,0,0,0.2)',
                        border: `1px solid ${focused.subject ? '#1DB954' : 'rgba(255,255,255,0.1)'}`,
                        borderRadius: '8px',
                        color: '#fff',
                        fontSize: '1rem',
                        outline: 'none',
                        transition: 'all 0.2s ease',
                        boxSizing: 'border-box'
                      }}
                      placeholder="What's this about? (optional)"
                    />
                  </Box>
                </Box>

                <Box sx={{ mb: 4 }}>
                  <Box sx={{ mb: 0.75, display: 'flex', justifyContent: 'space-between' }}>
                    <label
                      htmlFor="message"
                      style={{
                        color: formErrors.message ? '#f44336' : 'rgba(255,255,255,0.7)',
                        fontWeight: 500,
                        fontSize: '0.875rem'
                      }}
                    >
                      Your Message <span style={{ color: '#f44336' }}>*</span>
                    </label>
                    {formErrors.message && (
                      <span style={{
                        color: '#f44336',
                        fontSize: '0.75rem',
                        fontWeight: 400
                      }}>
                        {formErrors.message}
                      </span>
                    )}
                  </Box>
                  <Box
                    sx={{
                      position: 'relative',
                      '&::before': focused.message && {
                        content: '""',
                        position: 'absolute',
                        left: 0,
                        top: 0,
                        width: '2px',
                        height: '100%',
                        backgroundColor: formErrors.message ? '#f44336' : '#1DB954',
                        transition: 'all 0.2s ease'
                      }
                    }}
                  >
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      onFocus={() => handleFocus('message')}
                      onBlur={() => handleBlur('message')}
                      style={{
                        width: '100%',
                        padding: '14px',
                        backgroundColor: 'rgba(0,0,0,0.2)',
                        border: `1px solid ${formErrors.message ? '#f44336' : focused.message ? '#1DB954' : 'rgba(255,255,255,0.1)'}`,
                        borderRadius: '8px',
                        color: '#fff',
                        fontSize: '1rem',
                        outline: 'none',
                        transition: 'all 0.2s ease',
                        minHeight: '150px',
                        resize: 'vertical',
                        boxSizing: 'border-box',
                        fontFamily: 'inherit'
                      }}
                      placeholder="How can we help you?"
                    />
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2, mb: 3 }}>
                  <button
                    type="submit"
                    disabled={loading}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '14px 32px',
                      borderRadius: '8px',
                      background: 'linear-gradient(90deg, #1DB954, #1ed760)',
                      color: '#fff',
                      fontSize: '1rem',
                      fontWeight: 600,
                      cursor: loading ? 'not-allowed' : 'pointer',
                      border: 'none',
                      boxShadow: '0 4px 10px rgba(29,185,84,0.3)',
                      transition: 'all 0.3s ease',
                      opacity: loading ? 0.8 : 1
                    }}
                    onMouseOver={(e) => {
                      if (!loading) {
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.boxShadow = '0 6px 14px rgba(29,185,84,0.4)';
                      }
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 4px 10px rgba(29,185,84,0.3)';
                    }}
                  >
                    {loading ? (
                      <>
                        <CircularProgress size={20} sx={{ color: 'white', mr: 1 }} />
                        Sending...
                      </>
                    ) : (
                      <>
                        <SendIcon sx={{ mr: 1.5, fontSize: '1.1rem' }} />
                        Send Message
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setFormData({
                        name: '',
                        email: '',
                        subject: '',
                        message: '',
                        issueType: '',
                      });
                      setFormErrors({});
                    }}
                    disabled={loading}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      color: 'rgba(255,255,255,0.6)',
                      cursor: loading ? 'not-allowed' : 'pointer',
                      fontSize: '0.9rem',
                      padding: '8px 12px',
                      transition: 'color 0.2s ease',
                    }}
                    onMouseOver={(e) => {
                      if (!loading) e.currentTarget.style.color = 'rgba(255,255,255,0.9)';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.color = 'rgba(255,255,255,0.6)';
                    }}
                  >
                    Clear Form
                  </button>
                </Box>

                <Box
                  sx={{
                    p: 2.5,
                    background: 'rgba(0,0,0,0.2)',
                    borderRadius: 1,
                    border: '1px solid rgba(255,255,255,0.05)'
                  }}
                >
                  <Typography variant="body2" color="rgba(255,255,255,0.5)" sx={{ fontSize: '0.8rem', lineHeight: 1.5 }}>
                    By submitting this form, you agree to our <Link href="/privacy-policy" sx={{ color: '#1DB954', textDecoration: 'none' }}>Privacy Policy</Link> and <Link href="/terms-of-service" sx={{ color: '#1DB954', textDecoration: 'none' }}>Terms of Service</Link>.
                    We'll use your information only to respond to your inquiry.
                  </Typography>
                </Box>
              </form>
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