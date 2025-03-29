import React from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Paper,
  Card,
  CardContent,
} from '@mui/material';

const About = () => {
  const teamMembers = [
    {
      name: 'John Doe',
      role: 'CEO & Founder',
      bio: 'With over 15 years of experience in the tech industry, John leads our mission to connect talent with opportunity.',
    },
    {
      name: 'Jane Smith',
      role: 'Head of Operations',
      bio: 'Jane brings expertise in streamlining processes and ensuring smooth operations across our platform.',
    },
    {
      name: 'Mike Johnson',
      role: 'Technical Lead',
      bio: 'Mike oversees our technical infrastructure and ensures we stay at the forefront of technology.',
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
            About Us
          </Typography>
          <Typography variant="h5" paragraph>
            Connecting talent with opportunity
          </Typography>
        </Container>
      </Box>

      {/* Mission Section */}
      <Container maxWidth="lg" sx={{ mb: 6 }}>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography variant="h4" component="h2" gutterBottom>
              Our Mission
            </Typography>
            <Typography variant="body1" paragraph>
              At Job Portal, we're dedicated to revolutionizing the way people find jobs and companies hire talent. 
              Our platform serves as a bridge between job seekers and employers, making the hiring process more 
              efficient and effective for both parties.
            </Typography>
            <Typography variant="body1" paragraph>
              We believe that everyone deserves the opportunity to find meaningful work that aligns with their 
              skills, interests, and career goals. Through our innovative platform, we're making this vision a 
              reality for thousands of professionals worldwide.
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper
              elevation={3}
              sx={{
                p: 4,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              <Typography variant="h5" component="h3" gutterBottom>
                Our Values
              </Typography>
              <Box component="ul" sx={{ pl: 2 }}>
                <Typography component="li" variant="body1" paragraph>
                  Innovation: Constantly improving our platform with cutting-edge technology
                </Typography>
                <Typography component="li" variant="body1" paragraph>
                  Integrity: Maintaining the highest standards of honesty and transparency
                </Typography>
                <Typography component="li" variant="body1" paragraph>
                  Impact: Making a positive difference in people's careers and lives
                </Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      {/* Team Section */}
      <Box sx={{ bgcolor: 'grey.100', py: 6 }}>
        <Container maxWidth="lg">
          <Typography variant="h4" component="h2" gutterBottom align="center">
            Our Team
          </Typography>
          <Grid container spacing={4}>
            {teamMembers.map((member) => (
              <Grid item xs={12} md={4} key={member.name}>
                <Card sx={{ height: '100%' }}>
                  <CardContent>
                    <Typography variant="h5" component="h3" gutterBottom>
                      {member.name}
                    </Typography>
                    <Typography color="primary" gutterBottom>
                      {member.role}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {member.bio}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default About; 