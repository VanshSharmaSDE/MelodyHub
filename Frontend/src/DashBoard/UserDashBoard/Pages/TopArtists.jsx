import React from 'react';
import { 
  Box,
  Typography,
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Avatar,
} from '@mui/material';

function TopArtists({ data }) {
  return (
    <Box sx={{ mb: 5 }}>
      <Typography 
        variant="h5" 
        component="h2" 
        sx={{ 
          fontWeight: 700,
          mb: 3,
          fontSize: { xs: '1.5rem', md: '1.7rem' }
        }}
      >
        Your Top Artists
      </Typography>
      
      <Grid container spacing={2}>
        {data.map((artist) => (
          <Grid item xs={6} sm={4} md={3} lg={2.4} key={artist.id}>
            <Card
              sx={{
                bgcolor: 'rgba(30,30,30,0.7)',
                borderRadius: 2,
                overflow: 'hidden',
                transition: 'all 0.3s ease',
                '&:hover': {
                  bgcolor: 'rgba(40,40,40,0.7)',
                  transform: 'translateY(-5px)',
                },
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <CardActionArea sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Box sx={{ 
                  width: '80%',
                  pt: 3,
                  pb: 1,
                }}>
                  <Avatar
                    src={artist.image}
                    alt={artist.name}
                    sx={{
                      width: '100%',
                      height: 'auto',
                      paddingTop: '100%',
                      position: 'relative',
                      borderRadius: '50%',
                      boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
                      '& .MuiAvatar-img': {
                        position: 'absolute',
                        top: 0,
                        width: '100%',
                        height: '100%',
                      },
                    }}
                  />
                </Box>
                <CardContent sx={{ flexGrow: 1, width: '100%', textAlign: 'center' }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 0.5 }} noWrap>
                    {artist.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Artist
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default TopArtists;