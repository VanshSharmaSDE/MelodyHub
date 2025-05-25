import React, { useState } from 'react';
import {
    Box,
    Container,
    Typography,
    Grid,
    Paper,
    Button,
    Breadcrumbs,
    Link,
    Chip,
    Divider,
    Switch,
    useMediaQuery,
    useTheme,
} from '@mui/material';
import {
    Home as HomeIcon,
    WorkspacePremium as PremiumIcon,
    Check as CheckIcon,
    Info as InfoIcon,
    AccessTime as AccessTimeIcon,
    Launch as LaunchIcon,
    Star as StarIcon,
    ArrowForward as ArrowForwardIcon,
    LocalOffer as LocalOfferIcon,
    NotificationsActive as NotificationsActiveIcon,
} from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';

function PremiumPage() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const isSmall = useMediaQuery(theme.breakpoints.down('sm'));

    const [annualBilling, setAnnualBilling] = useState(true);
    const [showFuturePlans, setShowFuturePlans] = useState(false);

    // Calculate days remaining in early access
    const launchDate = new Date('2025-07-30'); // Example date - 2 months from "now"
    const today = new Date();
    const daysRemaining = Math.max(0, Math.ceil((launchDate - today) / (1000 * 60 * 60 * 24)));

    // Future pricing plans
    const plans = [
        {
            name: 'Free',
            price: 0,
            features: [
                'Limited song catalog (100 songs)',
                'Ad-supported streaming',
                'Standard audio quality',
                'Mobile app access',
                'Limited playlists (up to 5)',
            ],
            limitations: [
                'Contains advertisements',
                'No offline listening',
                'Limited skips (6 per hour)',
            ],
            cta: 'Always Free',
            color: '#666666',
            recommended: false
        },
        {
            name: 'Premium',
            price: annualBilling ? 9.99 : 12.99,
            features: [
                'Full song catalog access',
                'Ad-free listening experience',
                'High-quality audio (320kbps)',
                'Unlimited playlists',
                'Offline listening',
                'Unlimited skips',
                'Lyrics display',
                'Cross-device syncing',
            ],
            limitations: [],
            cta: 'Go Premium',
            discount: annualBilling ? '23% savings' : null,
            color: '#1DB954',
            recommended: true
        },
        {
            name: 'Family',
            price: annualBilling ? 14.99 : 19.99,
            features: [
                'All Premium features',
                'Up to 6 accounts',
                'Family mix playlists',
                'Explicit content filter',
                'Separate listening history',
                'Shared playlists option',
                'Premium for everyone in household',
            ],
            limitations: [
                'All members must reside at same address'
            ],
            cta: 'Choose Family',
            discount: annualBilling ? '25% savings' : null,
            color: '#E91E63',
            recommended: false
        }
    ];

    return (
        <Box
            sx={{
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

            }}
        >
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
                        <PremiumIcon fontSize="small" sx={{ mr: 0.5 }} />
                        Premium
                    </Typography>
                </Breadcrumbs>

                {/* Early Access Banner */}
                <Paper
                    sx={{
                        position: 'relative',
                        overflow: 'hidden',
                        borderRadius: 4,
                        mb: { xs: 4, md: 6 },
                        background: 'linear-gradient(135deg, #121212 0%, #1a1a1a 100%)',
                        border: '1px solid rgba(255,255,255,0.05)',
                    }}
                >
                    {/* Decorative elements */}
                    <Box
                        sx={{
                            position: 'absolute',
                            top: { xs: -100, md: -150 },
                            right: { xs: -100, md: -150 },
                            width: { xs: 200, md: 300 },
                            height: { xs: 200, md: 300 },
                            borderRadius: '50%',
                            background: 'radial-gradient(circle, rgba(29,185,84,0.3) 0%, rgba(29,185,84,0) 70%)',
                            zIndex: 0
                        }}
                    />

                    <Box
                        sx={{
                            position: 'absolute',
                            bottom: { xs: -120, md: -200 },
                            left: { xs: -120, md: -200 },
                            width: { xs: 250, md: 400 },
                            height: { xs: 250, md: 400 },
                            borderRadius: '50%',
                            background: 'radial-gradient(circle, rgba(29,185,84,0.15) 0%, rgba(29,185,84,0) 70%)',
                            zIndex: 0
                        }}
                    />

                    <Box sx={{ position: 'relative', zIndex: 1, p: { xs: 3, md: 5 } }}>
                        <Grid container spacing={4} alignItems="center">
                            <Grid item xs={12} md={7}>
                                <Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                        <Chip
                                            icon={<LaunchIcon />}
                                            label="EARLY ACCESS"
                                            sx={{
                                                bgcolor: 'rgba(29,185,84,0.2)',
                                                color: '#1DB954',
                                                fontWeight: 'bold',
                                                border: '1px solid rgba(29,185,84,0.3)',
                                                fontSize: { xs: '0.7rem', md: '0.8rem' }
                                            }}
                                        />
                                        <Box sx={{
                                            ml: 2,
                                            display: 'flex',
                                            alignItems: 'center',
                                            bgcolor: 'rgba(0,0,0,0.3)',
                                            px: 1.5,
                                            py: 0.5,
                                            borderRadius: 10
                                        }}>
                                            <AccessTimeIcon sx={{ color: '#ff9800', fontSize: { xs: 16, md: 18 }, mr: 0.5 }} />
                                            <Typography variant="caption" sx={{ color: '#ff9800', fontWeight: 500 }}>
                                                {daysRemaining} days remaining
                                            </Typography>
                                        </Box>
                                    </Box>

                                    <Typography
                                        variant="h3"
                                        component="h1"
                                        sx={{
                                            fontWeight: 800,
                                            mb: 2,
                                            fontSize: { xs: '1.8rem', sm: '2.2rem', md: '2.8rem' },
                                            background: 'linear-gradient(90deg, #FFFFFF 30%, #1DB954 100%)',
                                            WebkitBackgroundClip: 'text',
                                            WebkitTextFillColor: 'transparent',
                                        }}
                                    >
                                        MelodyHub Premium Features<br />Now Available for <span style={{ color: '#1DB954' }}>FREE</span>
                                    </Typography>

                                    <Typography
                                        variant="subtitle1"
                                        sx={{
                                            mb: 3,
                                            color: 'rgba(255,255,255,0.7)',
                                            maxWidth: 600,
                                            lineHeight: 1.6
                                        }}
                                    >
                                        As we celebrate our launch, we're offering <strong>all premium features completely free</strong> for a limited time. Experience everything MelodyHub has to offer before we introduce our subscription plans.
                                    </Typography>

                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            size="large"
                                            startIcon={<StarIcon />}
                                            sx={{
                                                borderRadius: 2,
                                                py: 1.2,
                                                px: 3,
                                                fontWeight: 600,
                                                boxShadow: '0 4px 12px rgba(29,185,84,0.3)',
                                                background: 'linear-gradient(90deg, #1DB954, #1ed760)',
                                                '&:hover': {
                                                    boxShadow: '0 6px 16px rgba(29,185,84,0.4)',
                                                    background: 'linear-gradient(90deg, #1DB954, #1ed760)',
                                                }
                                            }}
                                        >
                                            Get Free Premium
                                        </Button>

                                        <Button
                                            variant="outlined"
                                            color="primary"
                                            size="large"
                                            endIcon={<ArrowForwardIcon />}
                                            disabled
                                            sx={{
                                                borderRadius: 2,
                                                py: 1.2,
                                                px: 3,
                                                fontWeight: 600,
                                                '&:hover': {
                                                    bgcolor: 'rgba(29,185,84,0.1)'
                                                }
                                            }}
                                        //   onClick={() => setShowFuturePlans(!showFuturePlans)}
                                        >
                                            {/* {showFuturePlans ? 'Hide Future Pricing' : 'See  Pricing'} */}
                                            See Pricing
                                        </Button>
                                    </Box>
                                </Box>
                            </Grid>

                            <Grid item xs={12} md={5} sx={{ display: { xs: 'none', sm: 'block' } }}>
                                <Paper
                                    elevation={10}
                                    sx={{
                                        borderRadius: 4,
                                        overflow: 'hidden',
                                        bgcolor: 'rgba(29,185,84,0.05)',
                                        border: '1px solid rgba(29,185,84,0.2)',
                                        backdropFilter: 'blur(10px)',
                                        p: { xs: 2, md: 3 },
                                        transition: 'transform 0.3s ease',
                                        '&:hover': {
                                            transform: 'scale(1.02)'
                                        }
                                    }}
                                >
                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                        <Box
                                            sx={{
                                                mr: 2,
                                                p: 1,
                                                borderRadius: '50%',
                                                bgcolor: 'rgba(29,185,84,0.2)',
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center'
                                            }}
                                        >
                                            <NotificationsActiveIcon sx={{ color: '#1DB954' }} />
                                        </Box>
                                        <Typography variant="h6" fontWeight="600">
                                            What You Get During Early Access
                                        </Typography>
                                    </Box>

                                    <Divider sx={{ mb: 2, borderColor: 'rgba(255,255,255,0.1)' }} />

                                    <Grid container spacing={2} sx={{ mb: 1 }}>
                                        {[
                                            'Ad-free listening',
                                            'Unlimited skips',
                                            'Offline downloads',
                                            'High-quality audio',
                                            'Unlimited playlists',
                                            'Cross-device sync',
                                            'Lyrics display',
                                            'Full song catalog',
                                        ].map((feature, index) => (
                                            <Grid item xs={6} key={index}>
                                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                    <CheckIcon sx={{ color: '#1DB954', mr: 1, fontSize: '1rem' }} />
                                                    <Typography variant="body2">{feature}</Typography>
                                                </Box>
                                            </Grid>
                                        ))}
                                    </Grid>

                                    <Box
                                        sx={{
                                            p: 2,
                                            bgcolor: 'rgba(0,0,0,0.3)',
                                            borderRadius: 2,
                                            mt: 2,
                                            border: '1px solid rgba(255,255,255,0.05)'
                                        }}
                                    >
                                        <Box sx={{ display: 'flex', mb: 1 }}>
                                            <InfoIcon sx={{ color: '#ff9800', mr: 1, fontSize: '0.9rem' }} />
                                            <Typography variant="caption" sx={{ color: '#ff9800', fontWeight: 500 }}>
                                                LIMITED TIME OFFER
                                            </Typography>
                                        </Box>
                                        <Typography variant="caption" color="rgba(255,255,255,0.7)">
                                            After early access ends, you'll be notified before any charges apply. Cancel anytime.
                                        </Typography>
                                    </Box>
                                </Paper>
                            </Grid>
                        </Grid>
                    </Box>
                </Paper>

                {/* Future Pricing Plans Section */}
                {showFuturePlans && (
                    <Box sx={{ mb: 6 }}>
                        <Box sx={{ textAlign: 'center', mb: 4 }}>
                            <Typography
                                variant="h4"
                                component="h2"
                                sx={{
                                    fontWeight: 700,
                                    mb: 1,
                                    background: 'linear-gradient(90deg, #FFFFFF 0%, #1DB954 100%)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                }}
                            >
                                Future Pricing Plans
                            </Typography>
                            <Typography variant="subtitle1" color="rgba(255,255,255,0.7)" sx={{ maxWidth: 700, mx: 'auto' }}>
                                Here's what our subscription options will look like after the early access period ends.
                                Early adopters may be eligible for special loyalty discounts.
                            </Typography>

                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 3, mb: 4 }}>
                                <Typography mr={1} color="rgba(255,255,255,0.7)">Monthly</Typography>
                                <Switch
                                    checked={annualBilling}
                                    onChange={() => setAnnualBilling(!annualBilling)}
                                    color="primary"
                                />
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <Typography ml={1} color={annualBilling ? '#1DB954' : 'rgba(255,255,255,0.7)'}>
                                        Yearly
                                    </Typography>
                                    {annualBilling && (
                                        <Chip
                                            label="Save 20-25%"
                                            size="small"
                                            sx={{
                                                ml: 1,
                                                bgcolor: 'rgba(29,185,84,0.2)',
                                                color: '#1DB954',
                                                border: '1px solid rgba(29,185,84,0.3)',
                                                height: 24
                                            }}
                                        />
                                    )}
                                </Box>
                            </Box>
                        </Box>

                        <Grid container spacing={3}>
                            {plans.map((plan, index) => (
                                <Grid item xs={12} md={4} key={index}>
                                    <Paper
                                        sx={{
                                            p: 3,
                                            height: '100%',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            borderRadius: 3,
                                            position: 'relative',
                                            overflow: 'hidden',
                                            bgcolor: plan.recommended ? 'rgba(29,185,84,0.1)' : 'rgba(30,30,30,0.7)',
                                            border: plan.recommended ? '1px solid rgba(29,185,84,0.3)' : '1px solid rgba(255,255,255,0.05)',
                                            transition: 'transform 0.3s ease',
                                            '&:hover': {
                                                transform: 'translateY(-10px)'
                                            },
                                            ...(plan.recommended && {
                                                boxShadow: '0 10px 30px rgba(29,185,84,0.2)',
                                            })
                                        }}
                                    >
                                        {plan.recommended && (
                                            <Chip
                                                label="RECOMMENDED"
                                                size="small"
                                                sx={{
                                                    position: 'absolute',
                                                    top: 16,
                                                    right: 16,
                                                    bgcolor: '#1DB954',
                                                    color: '#fff',
                                                    fontWeight: 'bold',
                                                    fontSize: '0.7rem'
                                                }}
                                            />
                                        )}

                                        {plan.discount && (
                                            <Box
                                                sx={{
                                                    position: 'absolute',
                                                    top: 0,
                                                    left: 20,
                                                    bgcolor: '#1DB954',
                                                    color: '#fff',
                                                    px: 2,
                                                    py: 0.5,
                                                    fontWeight: 'bold',
                                                    fontSize: '0.7rem',
                                                    borderBottomLeftRadius: 8,
                                                    borderBottomRightRadius: 8,
                                                    boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
                                                }}
                                            >
                                                {plan.discount}
                                            </Box>
                                        )}

                                        <Box sx={{ mb: 2 }}>
                                            <Typography variant="h5" fontWeight="700" sx={{ mb: 0.5 }}>
                                                {plan.name}
                                            </Typography>

                                            <Box sx={{ display: 'flex', alignItems: 'baseline', mb: 1 }}>
                                                <Typography
                                                    variant="h3"
                                                    component="span"
                                                    sx={{
                                                        fontWeight: 800,
                                                        color: plan.color
                                                    }}
                                                >
                                                    ${plan.price}
                                                </Typography>
                                                <Typography
                                                    variant="subtitle1"
                                                    component="span"
                                                    sx={{ ml: 1, color: 'rgba(255,255,255,0.6)' }}
                                                >
                                                    / {annualBilling ? 'year' : 'month'}
                                                </Typography>
                                            </Box>

                                            {plan.price > 0 && (
                                                <Typography
                                                    variant="body2"
                                                    sx={{ color: 'rgba(255,255,255,0.6)', mb: 2 }}
                                                >
                                                    {annualBilling ? `Billed annually at $${plan.price * 12}` : 'Billed monthly'}
                                                </Typography>
                                            )}
                                        </Box>

                                        <Box sx={{ mb: 3 }}>
                                            <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)', mb: 2 }} />
                                            {plan.features.map((feature, idx) => (
                                                <Box
                                                    key={idx}
                                                    sx={{
                                                        display: 'flex',
                                                        alignItems: 'flex-start',
                                                        mb: 1.5
                                                    }}
                                                >
                                                    <CheckIcon
                                                        sx={{
                                                            color: plan.color,
                                                            mr: 1,
                                                            fontSize: '1.1rem',
                                                            mt: 0.2
                                                        }}
                                                    />
                                                    <Typography variant="body2">{feature}</Typography>
                                                </Box>
                                            ))}

                                            {plan.limitations.length > 0 && (
                                                <Box sx={{ mt: 2 }}>
                                                    {plan.limitations.map((limitation, idx) => (
                                                        <Typography
                                                            key={idx}
                                                            variant="body2"
                                                            sx={{
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                color: 'rgba(255,255,255,0.5)',
                                                                ml: 0.5,
                                                                mb: 0.5,
                                                                '&::before': {
                                                                    content: '"•"',
                                                                    mr: 1,
                                                                    fontSize: '1.5rem',
                                                                    lineHeight: 1,
                                                                    mt: -1
                                                                }
                                                            }}
                                                        >
                                                            {limitation}
                                                        </Typography>
                                                    ))}
                                                </Box>
                                            )}
                                        </Box>

                                        <Box sx={{ mt: 'auto' }}>
                                            <Button
                                                fullWidth
                                                variant={plan.recommended ? "contained" : "outlined"}
                                                color={plan.recommended ? "primary" : "inherit"}
                                                sx={{
                                                    borderRadius: 2,
                                                    py: 1.2,
                                                    fontWeight: 600,
                                                    ...(plan.recommended && {
                                                        backgroundImage: 'linear-gradient(90deg, #1DB954, #1ed760)',
                                                        boxShadow: '0 4px 12px rgba(29,185,84,0.3)',
                                                        '&:hover': {
                                                            boxShadow: '0 6px 16px rgba(29,185,84,0.4)',
                                                        }
                                                    }),
                                                    ...(!plan.recommended && {
                                                        borderColor: 'rgba(255,255,255,0.3)',
                                                        '&:hover': {
                                                            borderColor: 'rgba(255,255,255,0.6)',
                                                            bgcolor: 'rgba(255,255,255,0.05)'
                                                        }
                                                    })
                                                }}
                                                disabled
                                            >
                                                {plan.cta}
                                                <Box
                                                    component="span"
                                                    sx={{
                                                        ml: 1,
                                                        display: 'inline-block',
                                                        fontSize: '0.75rem',
                                                        py: 0.2,
                                                        px: 0.8,
                                                        borderRadius: 1,
                                                        bgcolor: 'rgba(0,0,0,0.2)',
                                                        color: 'rgba(255,255,255,0.7)'
                                                    }}
                                                >
                                                    Coming Soon
                                                </Box>
                                            </Button>
                                        </Box>
                                    </Paper>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                )}

                {/* FAQ Section */}
                <Box sx={{ mt: 6 }}>
                    <Typography variant="h5" fontWeight="700" sx={{ mb: 3 }}>
                        Common Questions
                    </Typography>

                    <Grid container spacing={3}>
                        {[
                            {
                                q: "How long will the free premium access last?",
                                a: "Our free premium access is available during the early access period, estimated to conclude by the end of July 2025. We'll notify all users before transitioning to paid plans."
                            },
                            {
                                q: "Will I be automatically charged when the free period ends?",
                                a: "No, we will never automatically charge you. When the free period ends, you'll receive a notification and can choose to subscribe or continue with our free tier."
                            },
                            {
                                q: "What happens to my downloaded music after the free period?",
                                a: "If you choose not to subscribe after the free period, you'll lose access to downloaded songs. Your playlists and favorites will remain, but you'll need a premium subscription to download songs again."
                            },
                            {
                                q: "Will pricing plans change from what's shown here?",
                                a: "The pricing shown is our current expectation, but we may adjust before official launch based on user feedback and market conditions. Early adopters may receive special loyalty discounts."
                            }
                        ].map((item, index) => (
                            <Grid item xs={12} md={6} key={index} width="100%">
                                <Paper sx={{
                                    p: 3,
                                    bgcolor: 'rgba(30,30,30,0.7)',
                                    borderRadius: 2,
                                    border: '1px solid rgba(255,255,255,0.05)',
                                }}>
                                    <Typography variant="h6" fontWeight="600" sx={{ mb: 1 }}>
                                        {item.q}
                                    </Typography>
                                    <Typography variant="body2" color="rgba(255,255,255,0.7)">
                                        {item.a}
                                    </Typography>
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>
                </Box>

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

export default PremiumPage;