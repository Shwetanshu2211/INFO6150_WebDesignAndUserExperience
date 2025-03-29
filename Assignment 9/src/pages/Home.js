import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Container,
  Typography,
  Button,
  Box,
  Grid,
  Paper,
  Card,
  CardContent,
} from '@mui/material';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { isAuthenticated } = useAuth();

  const features = [
    {
      title: 'Find Your Dream Job',
      description: 'Browse through hundreds of job listings from top companies.',
      icon: '💼',
    },
    {
      title: 'Company Profiles',
      description: 'Explore detailed profiles of companies and their work culture.',
      icon: '🏢',
    },
    {
      title: 'Easy Application',
      description: 'Apply to jobs with just a few clicks and track your applications.',
      icon: '📝',
    },
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: 'primary.main',
          color: 'white',
          py: 8,
          mb: 6,
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="h2" component="h1" gutterBottom>
            Welcome to Job Portal
          </Typography>
          <Typography variant="h5" paragraph>
            Find your dream job or showcase your company to potential candidates
          </Typography>
          {!isAuthenticated && (
            <Button
              component={RouterLink}
              to="/login"
              variant="contained"
              color="secondary"
              size="large"
              sx={{ mt: 2 }}
            >
              Get Started
            </Button>
          )}
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ mb: 6 }}>
        <Typography variant="h4" component="h2" gutterBottom align="center">
          Why Choose Us
        </Typography>
        <Grid container spacing={4}>
          {features.map((feature) => (
            <Grid item xs={12} md={4} key={feature.title}>
              <Card sx={{ height: '100%' }}>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography variant="h1" sx={{ mb: 2 }}>
                    {feature.icon}
                  </Typography>
                  <Typography variant="h5" component="h3" gutterBottom>
                    {feature.title}
                  </Typography>
                  <Typography color="text.secondary">
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Call to Action */}
      <Box sx={{ bgcolor: 'grey.100', py: 6 }}>
        <Container maxWidth="md">
          <Paper
            sx={{
              p: 4,
              textAlign: 'center',
              bgcolor: 'primary.main',
              color: 'white',
            }}
          >
            <Typography variant="h4" component="h2" gutterBottom>
              Ready to Start Your Journey?
            </Typography>
            <Typography variant="h6" paragraph>
              Browse our job listings or showcase your company today
            </Typography>
            <Box sx={{ mt: 3 }}>
              <Button
                component={RouterLink}
                to="/jobs"
                variant="contained"
                color="secondary"
                size="large"
                sx={{ mr: 2 }}
              >
                Browse Jobs
              </Button>
              <Button
                component={RouterLink}
                to="/companies"
                variant="outlined"
                color="inherit"
                size="large"
              >
                View Companies
              </Button>
            </Box>
          </Paper>
        </Container>
      </Box>
    </Box>
  );
};

export default Home; 