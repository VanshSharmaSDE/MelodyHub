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
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import {
  Gavel as GavelIcon,
  ExpandMore as ExpandMoreIcon,
  Build as BuildIcon,
  Block as BlockIcon,
  Copyright as CopyrightIcon,
  Home as HomeIcon,
  Description as DescriptionIcon,
  ArrowRight as ArrowRightIcon,
} from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';

function TermsOfService() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
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
            <DescriptionIcon fontSize="small" sx={{ mr: 0.5 }} />
            Terms of Service
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
            Terms of Service
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
            Please read these Terms of Service carefully before using MelodyHub.
            By accessing or using our service, you agree to be bound by these terms.
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
              <GavelIcon sx={{ fontSize: 30, color: '#1DB954', mr: 2 }} />
              <Typography variant="h5" component="h2" sx={{ fontWeight: 600 }}>
                Agreement to Terms
              </Typography>
            </Box>
            
            <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.9)', mb: 4, lineHeight: 1.7 }}>
              By accessing or using MelodyHub, you agree to be bound by these Terms of Service and our Privacy Policy. 
              If you disagree with any part of the terms, you may not access the service.
            </Typography>
            
            <Divider sx={{ my: 5, borderColor: 'rgba(255,255,255,0.1)' }} />
            
            <Box sx={{ mb: 5, display: 'flex', alignItems: 'center' }}>
              <BuildIcon sx={{ fontSize: 30, color: '#1DB954', mr: 2 }} />
              <Typography variant="h5" component="h2" sx={{ fontWeight: 600 }}>
                Service Terms & Limitations
              </Typography>
            </Box>
            
            <Box sx={{ mb: 5 }}>
              <Typography variant="h6" component="h3" sx={{ fontWeight: 600, mb: 3 }}>
                User Accounts
              </Typography>
              
              <List>
                {[
                  'You must create an account to use certain features of our service.',
                  'You are responsible for maintaining the confidentiality of your account credentials.',
                  'You are responsible for all activities that occur under your account.',
                  'You must be at least 13 years old to create an account and use our service.'
                ].map((item, index) => (
                  <ListItem 
                    key={index} 
                    sx={{ 
                      py: 1, 
                      px: 0 
                    }}
                  >
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      <ArrowRightIcon sx={{ color: '#1DB954', fontSize: 20 }} />
                    </ListItemIcon>
                    <ListItemText 
                      primary={
                        <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.9)' }}>
                          {item}
                        </Typography>
                      } 
                    />
                  </ListItem>
                ))}
              </List>
            </Box>
            
            <Box sx={{ mb: 5 }}>
              <Typography variant="h6" component="h3" sx={{ fontWeight: 600, mb: 3 }}>
                User Content
              </Typography>
              
              <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.9)', mb: 3, lineHeight: 1.7 }}>
                Our service allows you to create playlists, share content, and interact with other users. By
                uploading or sharing content through our service, you:
              </Typography>
              
              <List>
                {[
                  'Retain all ownership rights to your content.',
                  'Grant MelodyHub a worldwide, non-exclusive, royalty-free license to use, reproduce, and distribute your content in connection with the service.',
                  'Represent that you own or have the necessary rights to your content and that it does not violate the rights of any third party.'
                ].map((item, index) => (
                  <ListItem 
                    key={index} 
                    sx={{ 
                      py: 1, 
                      px: 0 
                    }}
                  >
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      <ArrowRightIcon sx={{ color: '#1DB954', fontSize: 20 }} />
                    </ListItemIcon>
                    <ListItemText 
                      primary={
                        <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.9)' }}>
                          {item}
                        </Typography>
                      } 
                    />
                  </ListItem>
                ))}
              </List>
            </Box>
            
            <Box sx={{ mb: 5 }}>
              <Typography variant="h6" component="h3" sx={{ fontWeight: 600, mb: 3 }}>
                Subscriptions
              </Typography>
              
              <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.9)', mb: 3, lineHeight: 1.7 }}>
                MelodyHub offers both free and premium subscription plans. By subscribing to a premium plan:
              </Typography>
              
              <List>
                {[
                  'You agree to pay the subscription fees as they become due.',
                  'Subscriptions will automatically renew unless cancelled at least 24 hours before the end of the current billing period.',
                  'Refunds are only available as required by law or at our sole discretion.'
                ].map((item, index) => (
                  <ListItem 
                    key={index} 
                    sx={{ 
                      py: 1, 
                      px: 0 
                    }}
                  >
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      <ArrowRightIcon sx={{ color: '#1DB954', fontSize: 20 }} />
                    </ListItemIcon>
                    <ListItemText 
                      primary={
                        <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.9)' }}>
                          {item}
                        </Typography>
                      } 
                    />
                  </ListItem>
                ))}
              </List>
            </Box>
            
            <Divider sx={{ my: 5, borderColor: 'rgba(255,255,255,0.1)' }} />
            
            <Box sx={{ mb: 5, display: 'flex', alignItems: 'center' }}>
              <BlockIcon sx={{ fontSize: 30, color: '#1DB954', mr: 2 }} />
              <Typography variant="h5" component="h2" sx={{ fontWeight: 600 }}>
                Prohibited Activities
              </Typography>
            </Box>
            
            <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.9)', mb: 3, lineHeight: 1.7 }}>
              You agree not to engage in any of the following prohibited activities:
            </Typography>
            
            <List>
              {[
                'Using the service for any illegal purpose or in violation of any laws.',
                'Uploading or sharing content that infringes on intellectual property rights.',
                'Attempting to access restricted areas of the service or circumvent security measures.',
                'Using the service to distribute malware, viruses, or other harmful code.',
                'Engaging in any activity that disrupts or interferes with the service.',
                'Scraping, data mining, or otherwise collecting data from the service without permission.',
                'Impersonating another user or entity.'
              ].map((item, index) => (
                <ListItem 
                  key={index} 
                  sx={{ 
                    py: 1, 
                    px: 0 
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 36 }}>
                    <ArrowRightIcon sx={{ color: '#1DB954', fontSize: 20 }} />
                  </ListItemIcon>
                  <ListItemText 
                    primary={
                      <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.9)' }}>
                        {item}
                      </Typography>
                    } 
                  />
                </ListItem>
              ))}
            </List>
            
            <Divider sx={{ my: 5, borderColor: 'rgba(255,255,255,0.1)' }} />
            
            <Box sx={{ mb: 5, display: 'flex', alignItems: 'center' }}>
              <CopyrightIcon sx={{ fontSize: 30, color: '#1DB954', mr: 2 }} />
              <Typography variant="h5" component="h2" sx={{ fontWeight: 600 }}>
                Intellectual Property
              </Typography>
            </Box>
            
            <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.9)', mb: 4, lineHeight: 1.7 }}>
              The service and its original content, features, and functionality are owned by MelodyHub and are protected by
              international copyright, trademark, patent, trade secret, and other intellectual property laws.
            </Typography>
            
            <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.9)', mb: 4, lineHeight: 1.7 }}>
              MelodyHub respects the intellectual property rights of others. If you believe that material available on our service
              infringes on your copyright, please notify us at <Link href="mailto:copyright@melodyhub.com" sx={{ color: '#1DB954' }}>copyright@melodyhub.com</Link>.
            </Typography>
            
            <Divider sx={{ my: 5, borderColor: 'rgba(255,255,255,0.1)' }} />
            
            <Typography variant="h5" component="h2" sx={{ fontWeight: 600, mb: 4 }}>
              Additional Terms
            </Typography>
            
            <Box sx={{ mb: 5 }}>
              {[
                {
                  title: 'Termination',
                  content: 'We may terminate or suspend your account and access to the service immediately, without prior notice or liability, for any reason, including if you breach the Terms of Service.'
                },
                {
                  title: 'Disclaimer',
                  content: 'The service is provided on an "AS IS" and "AS AVAILABLE" basis. MelodyHub makes no warranties, either express or implied, regarding the service.'
                },
                {
                  title: 'Limitation of Liability',
                  content: 'In no event shall MelodyHub, its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages.'
                },
                {
                  title: 'Changes to Terms',
                  content: 'We reserve the right to modify or replace these Terms at any time. We will provide notice of any changes by posting the new Terms on this page and updating the "last updated" date.'
                },
                {
                  title: 'Governing Law',
                  content: 'These Terms shall be governed by the laws of the jurisdiction in which MelodyHub is established, without regard to its conflict of law provisions.'
                }
              ].map((item, index) => (
                <Accordion 
                  key={index}
                  sx={{ 
                    bgcolor: 'rgba(30,30,30,0.5)', 
                    color: '#fff',
                    mb: 1.5,
                    '&:before': {
                      display: 'none',
                    },
                    '&.Mui-expanded': {
                      margin: '0 0 12px 0',
                    }
                  }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon sx={{ color: '#1DB954' }} />}
                    sx={{ 
                      borderLeft: '3px solid #1DB954',
                      '&:hover': {
                        bgcolor: 'rgba(29, 185, 84, 0.1)',
                      },
                    }}
                  >
                    <Typography variant="h6" component="h3" sx={{ fontWeight: 600 }}>
                      {item.title}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.9)', lineHeight: 1.7 }}>
                      {item.content}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              ))}
            </Box>
            
            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" component="h3" sx={{ fontWeight: 600, mb: 2 }}>
                Contact Us
              </Typography>
              <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.9)', mb: 1, lineHeight: 1.7 }}>
                If you have any questions about these Terms of Service, please contact us at:
              </Typography>
              <Typography 
                component="a" 
                href="mailto:terms@melodyhub.com" 
                sx={{ 
                  color: '#1DB954',
                  textDecoration: 'none',
                  '&:hover': { textDecoration: 'underline' }
                }}
              >
                terms@melodyhub.com
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

export default TermsOfService;