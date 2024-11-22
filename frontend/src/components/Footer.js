import React from 'react';
import { Container, Grid, Typography, Link, Box, Grid2 } from '@mui/material';

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: '#222',
        color: '#fff',
        padding: '2rem 0',
        marginTop: '100px',
      }}
    >
      <Container maxWidth="lg">
        <Grid2 container spacing={4} justifyContent="space-between">
          <Grid2 item xs={12} sm={4}>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                CritiQuill
            </Typography>
            <Typography variant="body2" sx={{ marginTop: '0.5rem' }}>
              © 2024 CritiQuill. All Rights Reserved.
            </Typography>
          </Grid2>
          <Grid2 item xs={12} sm={4} container spacing={2}>
            <Grid2 item>
              <Link href="#" color="inherit" variant="body2">
                About Us
              </Link>
            </Grid2>
            <Grid2 item>
              <Link href="#" color="inherit" variant="body2">
                Privacy Policy
              </Link>
            </Grid2>
            <Grid2 item>
              <Link href="#" color="inherit" variant="body2">
                Terms of Service
              </Link>
            </Grid2>
          </Grid2>
          <Grid2 item xs={12} sm={4} container justifyContent="flex-end">
            <Grid2 item>
              <Link href="#" color="inherit" variant="body2" sx={{ marginRight: '1rem' }}>
                Facebook
              </Link>
            </Grid2>
            <Grid2 item>
              <Link href="#" color="inherit" variant="body2" sx={{ marginRight: '1rem' }}>
                Twitter
              </Link>
            </Grid2>
            <Grid2 item>
              <Link href="#" color="inherit" variant="body2">
                Instagram
              </Link>
            </Grid2>
          </Grid2>
        </Grid2>
      </Container>
    </Box>
  );
};

export default Footer;
