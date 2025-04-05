import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Paper,
  Box,
  Divider,
  CircularProgress,
  Alert,
} from '@mui/material';
import { fetchJobsStart, fetchJobsSuccess, fetchJobsFailure } from '../store/jobsSlice';

const JobsPage = () => {
  const dispatch = useDispatch();
  const { jobs, loading, error } = useSelector((state) => state.jobs);
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchJobs = async () => {
      dispatch(fetchJobsStart());
      try {
        const response = await axios.get('http://localhost:3000/api/job/all', {
          headers: { Authorization: `Bearer ${token}` }
        });
        dispatch(fetchJobsSuccess(response.data.jobs));
      } catch (err) {
        dispatch(fetchJobsFailure('Failed to fetch jobs'));
      }
    };

    fetchJobs();
  }, [dispatch, token]);

  if (loading) return (
    <Container sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
      <CircularProgress />
    </Container>
  );
  
  if (error) return (
    <Container sx={{ mt: 4 }}>
      <Alert severity="error">{error}</Alert>
    </Container>
  );

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Available Jobs
      </Typography>
      <Grid container spacing={3}>
        {jobs.map((job) => (
          <Grid item xs={12} md={6} key={job._id}>
            <Card elevation={3}>
              <CardContent>
                <Typography variant="h5" component="div" gutterBottom>
                  {job.jobTitle}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                  {job.companyName}
                </Typography>
                <Divider sx={{ my: 1.5 }} />
                <Typography variant="body1" paragraph>
                  {job.description}
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="h6" color="primary">
                    ${job.salary.toLocaleString()}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Posted: {new Date(job.createdAt).toLocaleDateString()}
                  </Typography>
                </Box>
              </CardContent>
              <CardActions>
                <Button size="small" color="primary">
                  Learn More
                </Button>
                <Button size="small" color="primary">
                  Apply Now
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      {jobs.length === 0 && (
        <Paper sx={{ p: 3, mt: 2, textAlign: 'center' }}>
          <Typography variant="body1">
            No jobs available at the moment.
          </Typography>
        </Paper>
      )}
    </Container>
  );
};

export default JobsPage; 