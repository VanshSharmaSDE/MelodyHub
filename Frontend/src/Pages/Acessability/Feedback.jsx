import React, { useState, useRef, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Button,
  Breadcrumbs,
  Link,
  Snackbar,
  Alert,
  Rating,
  useMediaQuery,
  useTheme,
  CircularProgress
} from '@mui/material';
import {
  Home as HomeIcon,
  Feedback as FeedbackIcon,
  ThumbUp as ThumbUpIcon,
  ThumbDown as ThumbDownIcon,
  Star as StarIcon,
  StarBorder as StarBorderIcon,
  Send as SendIcon,
  Done as DoneIcon 
} from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';

function FeedbackForm() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const form = useRef();
  
  // Form state
  const [formData, setFormData] = useState({
    rating: 0,
    usability: '',
    liked: '',
    improvements: '',
    recommend: '',
    additionalFeedback: '',
    date: '', // Added date field
    ratingText: '', // Added for EmailJS template
    usabilityText: '', // Added for EmailJS template
    recommendText: '' // Added for EmailJS template
  });
  
  // UI state
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [formErrors, setFormErrors] = useState({});
  const [focused, setFocused] = useState({});
  
  // Add current date/time when component mounts
  useEffect(() => {
    updateCurrentDate();
  }, []);

  // Update the date field
  const updateCurrentDate = () => {
    const now = new Date();
    // Format date as YYYY-MM-DD HH:MM:SS
    const formattedDate = now.toISOString().slice(0, 19).replace('T', ' ');
    
    setFormData(prev => ({
      ...prev,
      date: formattedDate,
    }));
  };
  
  const recommendOptions = [
    { value: 'very_likely', label: 'Very Likely' },
    { value: 'likely', label: 'Likely' },
    { value: 'neutral', label: 'Neutral' },
    { value: 'unlikely', label: 'Unlikely' },
    { value: 'very_unlikely', label: 'Very Unlikely' }
  ];
  
  const usabilityOptions = [
    { value: 'very_easy', label: 'Very Easy' },
    { value: 'easy', label: 'Easy' },
    { value: 'neutral', label: 'Neutral' },
    { value: 'difficult', label: 'Difficult' },
    { value: 'very_difficult', label: 'Very Difficult' }
  ];
  
  // Helper functions to get text values for the template
  const getRatingText = (rating) => {
    const texts = ['Poor', 'Below Average', 'Average', 'Good', 'Excellent'];
    return texts[parseInt(rating) - 1] || '';
  };

  const getUsabilityText = (usability) => {
    const map = {
      very_easy: 'Very Easy',
      easy: 'Easy',
      neutral: 'Neutral',
      difficult: 'Difficult',
      very_difficult: 'Very Difficult'
    };
    return map[usability] || '';
  };

  const getRecommendText = (recommend) => {
    const map = {
      very_likely: 'Very Likely',
      likely: 'Likely',
      neutral: 'Neutral',
      unlikely: 'Unlikely',
      very_unlikely: 'Very Unlikely'
    };
    return map[recommend] || '';
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Update text values for EmailJS template
    if (name === 'usability') {
      setFormData(prev => ({
        ...prev,
        usabilityText: getUsabilityText(value)
      }));
    }
    
    if (name === 'recommend') {
      setFormData(prev => ({
        ...prev,
        recommendText: getRecommendText(value)
      }));
    }
    
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
  
  const handleRatingChange = (newValue) => {
    setFormData(prev => ({
      ...prev,
      rating: newValue,
      ratingText: getRatingText(newValue) // Update rating text
    }));
    
    if (formErrors.rating) {
      setFormErrors(prev => ({
        ...prev,
        rating: ''
      }));
    }
  };
  
  const validateForm = () => {
    const errors = {};
    
    if (formData.rating === 0) {
      errors.rating = 'Please provide an overall rating';
    }
    
    if (!formData.usability) {
      errors.usability = 'Please select an option';
    }
    
    if (!formData.recommend) {
      errors.recommend = 'Please select an option';
    }
    
    // Liked and improvements fields are optional
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      setSnackbarMessage('Please complete all required fields');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
      return;
    }
    
    setLoading(true);
    
    try {
      // Create a dynamic form element to submit with EmailJS
      const dynamicForm = document.createElement('form');
      
      // Convert the rating to string for EmailJS template
      const formWithStringValues = {
        ...formData,
        rating: formData.rating.toString(),
        ratingText: formData.ratingText || getRatingText(formData.rating),
        usabilityText: formData.usabilityText || getUsabilityText(formData.usability),
        recommendText: formData.recommendText || getRecommendText(formData.recommend),
        date: formData.date || new Date().toISOString().slice(0, 19).replace('T', ' '),
        user: 'VanshSharmaSDEimport' // Adding user's login
      };
      
      // Add each field to the form
      Object.entries(formWithStringValues).forEach(([key, value]) => {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = key;
        input.value = value || '';
        dynamicForm.appendChild(input);
      });
      
      // Send the email using EmailJS
      const result = await emailjs.sendForm(
        'service_wkt3zj9', // Replace with your EmailJS service ID
        'template_8w6svfq', // Replace with your EmailJS template ID
        dynamicForm,
        'eCU48RTYASuiPg0sV' // Replace with your EmailJS public key
      );
      
      console.log('Email sent successfully:', result.text);
      setSubmitted(true);
      setSnackbarMessage('Thank you! Your feedback has been submitted successfully.');
      setSnackbarSeverity('success');
      setOpenSnackbar(true);
    } catch (error) {
      console.error('Error submitting feedback:', error);
      setSnackbarMessage('Failed to submit feedback. Please try again.');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    } finally {
      setLoading(false);
    }
  };
  
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };
  
  const handleStartNew = () => {
    updateCurrentDate();
    setFormData(prev => ({
      rating: 0,
      usability: '',
      liked: '',
      improvements: '',
      recommend: '',
      additionalFeedback: '',
      date: prev.date, // Keep the current date
      ratingText: '',
      usabilityText: '',
      recommendText: ''
    }));
    setFormErrors({});
    setSubmitted(false);
  };

  // Custom radio button component
  const CustomRadio = ({ value, name, checked, onChange, label }) => (
    <Box 
      component="label"
      sx={{ 
        display: 'block',
        position: 'relative',
        cursor: 'pointer',
        mb: 1,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          p: 1.5,
          pl: 2,
          borderRadius: 2,
          border: `1px solid ${checked ? '#1DB954' : 'rgba(255,255,255,0.1)'}`,
          backgroundColor: checked ? 'rgba(29,185,84,0.1)' : 'rgba(0,0,0,0.2)',
          transition: 'all 0.2s',
          '&:hover': {
            backgroundColor: checked ? 'rgba(29,185,84,0.15)' : 'rgba(0,0,0,0.25)',
            borderColor: checked ? '#1DB954' : 'rgba(255,255,255,0.2)',
          }
        }}
      >
        <Box 
          sx={{
            width: 20,
            height: 20,
            borderRadius: '50%',
            border: `2px solid ${checked ? '#1DB954' : 'rgba(255,255,255,0.3)'}`,
            mr: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {checked && (
            <Box 
              sx={{
                width: 10,
                height: 10,
                borderRadius: '50%',
                backgroundColor: '#1DB954',
              }}
            />
          )}
        </Box>
        <input 
          type="radio" 
          name={name}
          value={value}
          checked={checked}
          onChange={onChange}
          style={{ position: 'absolute', opacity: 0 }}
        />
        <Typography variant="body2">
          {label}
        </Typography>
      </Box>
    </Box>
  );

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
            <FeedbackIcon fontSize="small" sx={{ mr: 0.5 }} />
            Feedback
          </Typography>
        </Breadcrumbs>
        
        {/* Header */}
        <Box 
          sx={{ 
            mb: 5, 
            textAlign: 'center',
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
            Your Feedback Matters
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
            Help us improve MelodyHub by sharing your thoughts and experiences. 
            Your feedback directly influences our development roadmap.
          </Typography>
        </Box>
        
        {/* Feedback Form */}
        <Grid container justifyContent="center">
          <Grid item xs={12} md={10} lg={8}>
            <Paper 
              elevation={3}
              sx={{
                bgcolor: 'rgba(30,30,30,0.7)',
                borderRadius: 3,
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.05)',
                overflow: 'hidden',
                p: { xs: 3, md: 5 },
                boxShadow: '0 10px 30px rgba(0,0,0,0.25)',
                position: 'relative',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '4px',
                  background: 'linear-gradient(90deg, #1DB954 30%, rgba(29,185,84,0.3) 100%)',
                }
              }}
            >
              {submitted ? (
                /* Success Message */
                <Box sx={{ textAlign: 'center', py: 3 }}>
                  <Box 
                    sx={{
                      width: 80,
                      height: 80,
                      borderRadius: '50%',
                      backgroundColor: 'rgba(29, 185, 84, 0.1)',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      margin: '0 auto 24px'
                    }}
                  >
                    <DoneIcon sx={{ fontSize: 40, color: '#1DB954' }} />
                  </Box>
                  
                  <Typography variant="h4" fontWeight="700" sx={{ mb: 2 }}>
                    Thank You!
                  </Typography>
                  
                  <Typography variant="body1" sx={{ mb: 4, color: 'rgba(255,255,255,0.8)', maxWidth: 500, mx: 'auto' }}>
                    Your feedback has been submitted successfully. We greatly appreciate your input and will use it to improve MelodyHub.
                  </Typography>
                  
                  <Button
                    variant="outlined"
                    color="primary"
                    size="large"
                    onClick={handleStartNew}
                    sx={{ 
                      borderColor: 'rgba(29,185,84,0.5)',
                      color: '#1DB954',
                      '&:hover': {
                        borderColor: '#1DB954',
                        backgroundColor: 'rgba(29,185,84,0.1)',
                      },
                      px: 4,
                      py: 1,
                      borderRadius: 2
                    }}
                  >
                    Submit Another Response
                  </Button>
                </Box>
              ) : (
                /* Feedback Form */
                <Box component="form" ref={form} onSubmit={handleSubmit}>
                  {/* Hidden fields for EmailJS */}
                  <input type="hidden" name="date" value={formData.date} />
                  <input type="hidden" name="ratingText" value={formData.ratingText} />
                  <input type="hidden" name="usabilityText" value={formData.usabilityText} />
                  <input type="hidden" name="recommendText" value={formData.recommendText} />
                  <input type="hidden" name="user" value="VanshSharmaSDEimport" />
                
                  <Box sx={{ mb: 5 }}>
                    <Typography variant="h5" fontWeight="600" sx={{ mb: 1, display: 'flex', alignItems: 'center' }}>
                      <FeedbackIcon sx={{ mr: 1.5, color: '#1DB954' }} /> 
                      User Experience Feedback
                    </Typography>
                    <Typography variant="body2" color="rgba(255,255,255,0.6)">
                      Please share your honest opinions about your experience with MelodyHub. Fields marked with an asterisk (*) are required.
                    </Typography>
                  </Box>
                  
                  {/* Overall Rating */}
                  <Box sx={{ mb: 4 }}>
                    <Box sx={{ mb: 0.75, display: 'flex', justifyContent: 'space-between' }}>
                      <Typography 
                        component="label"
                        htmlFor="rating"
                        fontWeight={500}
                        color={formErrors.rating ? '#ff5252' : 'rgba(255,255,255,0.8)'}
                      >
                        Overall Rating <span style={{ color: '#ff5252' }}>*</span>
                      </Typography>
                      {formErrors.rating && (
                        <Typography color="#ff5252" fontSize="0.75rem">
                          {formErrors.rating}
                        </Typography>
                      )}
                    </Box>
                    <Box 
                      sx={{
                        p: 3,
                        border: `1px solid ${formErrors.rating ? '#ff5252' : 'rgba(255,255,255,0.1)'}`,
                        borderRadius: 2,
                        backgroundColor: 'rgba(0,0,0,0.2)',
                      }}
                    >
                      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Rating
                          name="rating"
                          value={formData.rating}
                          onChange={(event, newValue) => {
                            handleRatingChange(newValue);
                          }}
                          size="large"
                          icon={<StarIcon sx={{ color: '#1DB954', fontSize: 40 }} />}
                          emptyIcon={<StarBorderIcon sx={{ color: 'rgba(255,255,255,0.3)', fontSize: 40 }} />}
                          sx={{ mb: 1 }}
                        />
                        <Typography color="rgba(255,255,255,0.6)" variant="body2">
                          {formData.rating > 0 ? (
                            ['Poor', 'Below Average', 'Average', 'Good', 'Excellent'][formData.rating - 1]
                          ) : 'Select a rating'}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                  
                  {/* Usability */}
                  <Box sx={{ mb: 4 }}>
                    <Box sx={{ mb: 0.75, display: 'flex', justifyContent: 'space-between' }}>
                      <Typography 
                        component="label"
                        fontWeight={500}
                        color={formErrors.usability ? '#ff5252' : 'rgba(255,255,255,0.8)'}
                      >
                        How easy was MelodyHub to use? <span style={{ color: '#ff5252' }}>*</span>
                      </Typography>
                      {formErrors.usability && (
                        <Typography color="#ff5252" fontSize="0.75rem">
                          {formErrors.usability}
                        </Typography>
                      )}
                    </Box>
                    <Box sx={{ mt: 1 }}>
                      {usabilityOptions.map((option) => (
                        <CustomRadio
                          key={option.value}
                          value={option.value}
                          name="usability"
                          checked={formData.usability === option.value}
                          onChange={handleChange}
                          label={option.label}
                        />
                      ))}
                    </Box>
                  </Box>
                  
                  {/* What did you like */}
                  <Box sx={{ mb: 4 }}>
                    <Box sx={{ mb: 0.75 }}>
                      <label 
                        htmlFor="liked" 
                        style={{ 
                          color: 'rgba(255,255,255,0.8)',
                          fontWeight: 500,
                        }}
                      >
                        What did you like most about MelodyHub?
                      </label>
                    </Box>
                    <Box 
                      sx={{
                        position: 'relative',
                        '&::before': focused.liked && {
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
                      <textarea
                        id="liked"
                        name="liked"
                        value={formData.liked}
                        onChange={handleChange}
                        onFocus={() => handleFocus('liked')}
                        onBlur={() => handleBlur('liked')}
                        placeholder="Share the features or aspects you enjoyed (optional)"
                        style={{
                          width: '100%',
                          padding: '14px',
                          backgroundColor: 'rgba(0,0,0,0.2)',
                          border: `1px solid ${focused.liked ? '#1DB954' : 'rgba(255,255,255,0.1)'}`,
                          borderRadius: '8px',
                          color: '#fff',
                          fontSize: '1rem',
                          outline: 'none',
                          transition: 'all 0.2s ease',
                          minHeight: '100px',
                          resize: 'vertical',
                          boxSizing: 'border-box',
                          fontFamily: 'inherit'
                        }}
                      />
                    </Box>
                  </Box>
                  
                  {/* Improvements */}
                  <Box sx={{ mb: 4 }}>
                    <Box sx={{ mb: 0.75 }}>
                      <label 
                        htmlFor="improvements" 
                        style={{ 
                          color: 'rgba(255,255,255,0.8)',
                          fontWeight: 500,
                        }}
                      >
                        What could be improved?
                      </label>
                    </Box>
                    <Box 
                      sx={{
                        position: 'relative',
                        '&::before': focused.improvements && {
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
                      <textarea
                        id="improvements"
                        name="improvements"
                        value={formData.improvements}
                        onChange={handleChange}
                        onFocus={() => handleFocus('improvements')}
                        onBlur={() => handleBlur('improvements')}
                        placeholder="Tell us what we could do better (optional)"
                        style={{
                          width: '100%',
                          padding: '14px',
                          backgroundColor: 'rgba(0,0,0,0.2)',
                          border: `1px solid ${focused.improvements ? '#1DB954' : 'rgba(255,255,255,0.1)'}`,
                          borderRadius: '8px',
                          color: '#fff',
                          fontSize: '1rem',
                          outline: 'none',
                          transition: 'all 0.2s ease',
                          minHeight: '100px',
                          resize: 'vertical',
                          boxSizing: 'border-box',
                          fontFamily: 'inherit'
                        }}
                      />
                    </Box>
                  </Box>
                  
                  {/* Likelihood to Recommend */}
                  <Box sx={{ mb: 4 }}>
                    <Box sx={{ mb: 0.75, display: 'flex', justifyContent: 'space-between' }}>
                      <Typography 
                        component="label"
                        fontWeight={500}
                        color={formErrors.recommend ? '#ff5252' : 'rgba(255,255,255,0.8)'}
                      >
                        How likely are you to recommend MelodyHub? <span style={{ color: '#ff5252' }}>*</span>
                      </Typography>
                      {formErrors.recommend && (
                        <Typography color="#ff5252" fontSize="0.75rem">
                          {formErrors.recommend}
                        </Typography>
                      )}
                    </Box>
                    <Box sx={{ mt: 1 }}>
                      {recommendOptions.map((option) => (
                        <CustomRadio
                          key={option.value}
                          value={option.value}
                          name="recommend"
                          checked={formData.recommend === option.value}
                          onChange={handleChange}
                          label={option.label}
                        />
                      ))}
                    </Box>
                  </Box>
                  
                  {/* Additional Feedback */}
                  <Box sx={{ mb: 4 }}>
                    <Box sx={{ mb: 0.75 }}>
                      <label 
                        htmlFor="additionalFeedback" 
                        style={{ 
                          color: 'rgba(255,255,255,0.8)',
                          fontWeight: 500,
                        }}
                      >
                        Additional Comments
                      </label>
                    </Box>
                    <Box 
                      sx={{
                        position: 'relative',
                        '&::before': focused.additionalFeedback && {
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
                      <textarea
                        id="additionalFeedback"
                        name="additionalFeedback"
                        value={formData.additionalFeedback}
                        onChange={handleChange}
                        onFocus={() => handleFocus('additionalFeedback')}
                        onBlur={() => handleBlur('additionalFeedback')}
                        placeholder="Any other thoughts or suggestions you'd like to share with us (optional)"
                        style={{
                          width: '100%',
                          padding: '14px',
                          backgroundColor: 'rgba(0,0,0,0.2)',
                          border: `1px solid ${focused.additionalFeedback ? '#1DB954' : 'rgba(255,255,255,0.1)'}`,
                          borderRadius: '8px',
                          color: '#fff',
                          fontSize: '1rem',
                          outline: 'none',
                          transition: 'all 0.2s ease',
                          minHeight: '120px',
                          resize: 'vertical',
                          boxSizing: 'border-box',
                          fontFamily: 'inherit'
                        }}
                      />
                    </Box>
                  </Box>
                  
                  <Box sx={{ 
                    mt: 5, 
                    display: 'flex', 
                    flexDirection: { xs: 'column', sm: 'row' },
                    justifyContent: 'space-between',
                    alignItems: { xs: 'stretch', sm: 'center' },
                    gap: 2
                  }}>
                    <Button
                      type="submit"
                      variant="contained"
                      disabled={loading}
                      sx={{
                        py: 1.5,
                        px: 4,
                        borderRadius: 2,
                        fontSize: '1rem',
                        fontWeight: 600,
                        boxShadow: '0 4px 12px rgba(29,185,84,0.3)',
                        backgroundColor: '#1DB954',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        '&:hover': {
                          backgroundColor: '#19a74a',
                        }
                      }}
                    >
                      {loading ? (
                        <>
                          <CircularProgress size={20} sx={{ mr: 1, color: 'white' }} />
                          Submitting...
                        </>
                      ) : (
                        <>
                          <SendIcon sx={{ mr: 1 }} />
                          Submit Feedback
                        </>
                      )}
                    </Button>
                    
                    <Button
                      type="button"
                      variant="text"
                      disabled={loading}
                      onClick={() => {
                        setFormData(prev => ({
                          rating: 0,
                          usability: '',
                          liked: '',
                          improvements: '',
                          recommend: '',
                          additionalFeedback: '',
                          date: prev.date,
                          ratingText: '',
                          usabilityText: '',
                          recommendText: ''
                        }));
                        setFormErrors({});
                      }}
                      sx={{
                        color: 'rgba(255,255,255,0.6)',
                        '&:hover': {
                          backgroundColor: 'rgba(255,255,255,0.05)',
                          color: 'rgba(255,255,255,0.8)'
                        }
                      }}
                    >
                      Reset Form
                    </Button>
                  </Box>
                  
                  <Box 
                    sx={{ 
                      mt: 4,
                      p: 2,
                      borderRadius: 1,
                      bgcolor: 'rgba(0,0,0,0.2)',
                      border: '1px solid rgba(255,255,255,0.05)'
                    }}
                  >
                    <Typography variant="caption" color="rgba(255,255,255,0.5)">
                      By submitting this feedback, you agree that we may use your comments to improve our service. 
                      We value your privacy and will not share your personal information with third parties.
                    </Typography>
                  </Box>
                </Box>
              )}
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

export default FeedbackForm;