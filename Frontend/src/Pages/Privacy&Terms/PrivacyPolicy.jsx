import React from 'react';
import {
  Box,
  Container,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Paper,
  Breadcrumbs,
  Link,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import {
  Security as SecurityIcon,
  VerifiedUser as VerifiedUserIcon,
  FindInPage as FindInPageIcon,
  ArrowRight as ArrowRightIcon,
  Home as HomeIcon,
  Description as DescriptionIcon,
} from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';

function PrivacyPolicy() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  return (
    <Box sx={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #121212 0%, #181818 100%)',
      py: { xs: 4, md: 8 },
      color: '#ffffff',
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
              '&:hover': { color: '#1DB954' },
              zIndex: 1,
              position: 'relative',
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
            <DescriptionIcon fontSize="small" sx={{ mr: 0.5 }} />
            Privacy Policy
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
            Privacy Policy
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
            At MelodyHub, we value your privacy and are committed to protecting your personal information.
            This Privacy Policy explains how we collect, use, and safeguard your data when you use our service.
          </Typography>
          <Typography 
            variant="caption" 
            display="block" 
            sx={{ 
              mt: 2, 
              color: 'rgba(255,255,255,0.5)' 
            }}
          >
            Last updated: May 24, 2025
          </Typography>
        </Box>
        
        {/* Content */}
        <Paper 
          elevation={3}
          sx={{
            bgcolor: 'rgba(30,30,30,0.7)',
            borderRadius: 2,
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.05)',
            overflow: 'hidden',
            position: 'relative',
            mb: 6,
            boxShadow: '0 10px 30px rgba(0,0,0,0.25)',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '4px',
              background: 'linear-gradient(90deg, #1DB954, #1ed760)',
            }
          }}
        >
          <Box sx={{ p: { xs: 3, md: 5 } }}>
            <Box sx={{ mb: 5, display: 'flex', alignItems: 'center' }}>
              <SecurityIcon sx={{ fontSize: 30, color: '#1DB954', mr: 2 }} />
              <Typography variant="h5" component="h2" sx={{ fontWeight: 600 }}>
                Information We Collect
              </Typography>
            </Box>
            
            <List>
              {[
                {
                  primary: 'Personal Information',
                  secondary: 'When you create an account, we collect your name, email address, and profile picture.'
                },
                {
                  primary: 'Usage Data',
                  secondary: 'We collect information about how you interact with our service, including songs you listen to, playlists you create, and artists you follow.'
                },
                {
                  primary: 'Device Information',
                  secondary: 'We collect information about your device, including IP address, browser type, and operating system.'
                },
                {
                  primary: 'Cookies and Similar Technologies',
                  secondary: 'We use cookies and similar tracking technologies to track activity on our service and hold certain information.'
                }
              ].map((item, index) => (
                <ListItem 
                  key={index} 
                  sx={{ 
                    py: 2, 
                    px: 0,
                    borderBottom: index < 3 ? '1px solid rgba(255,255,255,0.08)' : 'none'
                  }}
                >
                  <ListItemIcon>
                    <ArrowRightIcon sx={{ color: '#1DB954' }} />
                  </ListItemIcon>
                  <ListItemText 
                    primary={
                      <Typography variant="h6" component="h3" sx={{ fontSize: '1.1rem', fontWeight: 600 }}>
                        {item.primary}
                      </Typography>
                    } 
                    secondary={
                      <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)', mt: 0.5 }}>
                        {item.secondary}
                      </Typography>
                    }
                  />
                </ListItem>
              ))}
            </List>
            
            <Divider sx={{ my: 5, borderColor: 'rgba(255,255,255,0.1)' }} />
            
            <Box sx={{ mb: 5, display: 'flex', alignItems: 'center' }}>
              <VerifiedUserIcon sx={{ fontSize: 30, color: '#1DB954', mr: 2 }} />
              <Typography variant="h5" component="h2" sx={{ fontWeight: 600 }}>
                How We Use Your Information
              </Typography>
            </Box>
            
            <List>
              {[
                {
                  primary: 'Provide and Maintain Our Service',
                  secondary: 'To deliver the music streaming services you request, manage your account, and send you service-related notifications.'
                },
                {
                  primary: 'Improve User Experience',
                  secondary: 'To analyze usage patterns, troubleshoot issues, and develop new features based on how you interact with our service.'
                },
                {
                  primary: 'Personalized Recommendations',
                  secondary: 'To recommend songs, artists, and playlists that match your listening preferences and history.'
                },
                {
                  primary: 'Communication',
                  secondary: 'To respond to your inquiries, provide customer support, and send you updates about our service.'
                }
              ].map((item, index) => (
                <ListItem 
                  key={index} 
                  sx={{ 
                    py: 2, 
                    px: 0,
                    borderBottom: index < 3 ? '1px solid rgba(255,255,255,0.08)' : 'none'
                  }}
                >
                  <ListItemIcon>
                    <ArrowRightIcon sx={{ color: '#1DB954' }} />
                  </ListItemIcon>
                  <ListItemText 
                    primary={
                      <Typography variant="h6" component="h3" sx={{ fontSize: '1.1rem', fontWeight: 600 }}>
                        {item.primary}
                      </Typography>
                    } 
                    secondary={
                      <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)', mt: 0.5 }}>
                        {item.secondary}
                      </Typography>
                    }
                  />
                </ListItem>
              ))}
            </List>
            
            <Divider sx={{ my: 5, borderColor: 'rgba(255,255,255,0.1)' }} />
            
            <Box sx={{ mb: 5, display: 'flex', alignItems: 'center' }}>
              <FindInPageIcon sx={{ fontSize: 30, color: '#1DB954', mr: 2 }} />
              <Typography variant="h5" component="h2" sx={{ fontWeight: 600 }}>
                Your Rights and Choices
              </Typography>
            </Box>
            
            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" component="h3" sx={{ fontWeight: 600, mb: 2 }}>
                Account Information
              </Typography>
              <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.9)', mb: 2, lineHeight: 1.7 }}>
                You can update or delete your account information at any time through your account settings. 
                Note that we may retain certain information as required by law or for legitimate business purposes.
              </Typography>
            </Box>
            
            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" component="h3" sx={{ fontWeight: 600, mb: 2 }}>
                Cookies and Tracking Technologies
              </Typography>
              <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.9)', mb: 2, lineHeight: 1.7 }}>
                Most web browsers are set to accept cookies by default. You can modify your browser settings to decline cookies 
                if you prefer, but this may affect your ability to use certain features of our service.
              </Typography>
            </Box>
            
            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" component="h3" sx={{ fontWeight: 600, mb: 2 }}>
                Data Retention
              </Typography>
              <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.9)', mb: 2, lineHeight: 1.7 }}>
                We retain your personal information for as long as necessary to provide you with our services and as required for 
                legal compliance. When we no longer need to use your information, we will take steps to securely delete or anonymize it.
              </Typography>
            </Box>
            
            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" component="h3" sx={{ fontWeight: 600, mb: 2 }}>
                Data Security
              </Typography>
              <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.9)', mb: 2, lineHeight: 1.7 }}>
                We implement appropriate technical and organizational measures to protect your personal information from 
                unauthorized access, loss, or alteration. However, no method of electronic transmission or storage is 100% secure, 
                and we cannot guarantee absolute security.
              </Typography>
            </Box>
            
            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" component="h3" sx={{ fontWeight: 600, mb: 2 }}>
                Changes to This Policy
              </Typography>
              <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.9)', mb: 2, lineHeight: 1.7 }}>
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy 
                on this page and updating the "Last updated" date. You are advised to review this Privacy Policy periodically for any changes.
              </Typography>
            </Box>
            
            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" component="h3" sx={{ fontWeight: 600, mb: 2 }}>
                Contact Us
              </Typography>
              <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.9)', mb: 1, lineHeight: 1.7 }}>
                If you have any questions about this Privacy Policy, please contact us at:
              </Typography>
              <Typography 
                component="a" 
                href="mailto:privacy@melodyhub.com" 
                sx={{ 
                  color: '#1DB954',
                  textDecoration: 'none',
                  '&:hover': { textDecoration: 'underline' }
                }}
              >
                privacy@melodyhub.com
              </Typography>
            </Box>
          </Box>
        </Paper>
        
        {/* Footer */}
        <Box sx={{ textAlign: 'center', mt: 6, color: 'rgba(255,255,255,0.5)', pb: 4 }}>
          <Typography variant="body2">
            © 2025 MelodyHub. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default PrivacyPolicy;