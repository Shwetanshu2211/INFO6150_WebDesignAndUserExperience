import React from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Chip,
} from '@mui/material';
import { useAuth } from '../context/AuthContext';

const jobPosts = [
  {
    id: 1,
    title: "Full Stack Developer",
    description:
      "Join our dynamic team to work on cutting-edge technologies. Develop and maintain sophisticated web applications for our diverse client base.",
    lastUpdated: "Last updated 2 days ago",
    requiredSkills: ["React", "Node.js", "MongoDB", "JavaScript"],
    salary: "$80,000 - $120,000"
  },
  {
    id: 2,
    title: "Digital Marketing Specialist",
    description:
      "Elevate our digital marketing strategies to promote our innovative products. Proficiency in SEO, SEM, and social media marketing is highly valued.",
    lastUpdated: "Last updated 1 day ago",
    requiredSkills: ["SEO", "Social Media", "Content Marketing", "Analytics"],
    salary: "$60,000 - $90,000"
  },
  {
    id: 3,
    title: "UX/UI Designer",
    description:
      "Shape engaging user experiences and create visually captivating designs. Work alongside cross-functional teams to turn ideas into reality.",
    lastUpdated: "Last updated 4 hours ago",
    requiredSkills: ["Figma", "Adobe XD", "User Research", "Prototyping"],
    salary: "$70,000 - $100,000"
  },
  {
    id: 4,
    title: "Data Scientist",
    description:
      "Leverage advanced analytics and machine learning to uncover insights from vast data sets. Proficiency with Python and R is a must.",
    lastUpdated: "Last updated 3 days ago",
    requiredSkills: ["Python", "R", "Machine Learning", "Data Analysis"],
    salary: "$90,000 - $130,000"
  },
  {
    id: 5,
    title: "Customer Support Representative",
    description:
      "Deliver unparalleled customer service and support. Exceptional communication skills and a knack for solving problems are key.",
    lastUpdated: "Last updated 6 hours ago",
    requiredSkills: ["Communication", "Problem Solving", "Customer Service"],
    salary: "$40,000 - $60,000"
  },
  {
    id: 6,
    title: "Project Manager",
    description:
      "Guide and coordinate project teams to ensure successful project delivery. Strong organizational and leadership skills are required.",
    lastUpdated: "Last updated 1 week ago",
    requiredSkills: ["Agile", "Leadership", "Risk Management", "Communication"],
    salary: "$85,000 - $120,000"
  },
];

const JobListings = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Job Listings
      </Typography>
      <Grid container spacing={3}>
        {jobPosts.map((job) => (
          <Grid item xs={12} md={6} key={job.id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h5" component="h2" gutterBottom>
                  {job.title}
                </Typography>
                <Typography color="text.secondary" gutterBottom>
                  {job.salary}
                </Typography>
                <Typography variant="body2" paragraph>
                  {job.description}
                </Typography>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    Required Skills:
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {job.requiredSkills.map((skill) => (
                      <Chip
                        key={skill}
                        label={skill}
                        size="small"
                        color="primary"
                        variant="outlined"
                      />
                    ))}
                  </Box>
                </Box>
                <Typography variant="caption" color="text.secondary">
                  {job.lastUpdated}
                </Typography>
              </CardContent>
              <Box sx={{ p: 2, pt: 0 }}>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  Apply Now
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default JobListings; 