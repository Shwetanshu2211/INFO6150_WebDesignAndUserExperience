import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const CompanyShowcase = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      const response = await axios.get('/api/company');
      setCompanies(response.data);
    } catch (err) {
      setError('Failed to fetch company data');
      console.error('Error fetching companies:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCompanyClick = (company) => {
    setSelectedCompany(company);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedCompany(null);
  };

  const getImageUrl = (imagePath) => {
    if (!imagePath) return 'https://via.placeholder.com/400x200?text=Company+Image';
    return `http://localhost:3000${imagePath}`;
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography color="error" align="center">
          {error}
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Company Showcase
      </Typography>
      <Grid container spacing={3}>
        {companies.map((company) => (
          <Grid item xs={12} sm={6} md={4} key={company._id}>
            <Card 
              sx={{ 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column',
                cursor: 'pointer',
                '&:hover': {
                  boxShadow: 6,
                }
              }}
              onClick={() => handleCompanyClick(company)}
            >
              <CardMedia
                component="img"
                height="200"
                image={getImageUrl(company.imagePath)}
                alt={company.name}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h2">
                  {company.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {company.industry}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {company.location}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
      >
        {selectedCompany && (
          <>
            <DialogTitle>{selectedCompany.name}</DialogTitle>
            <DialogContent>
              <Box sx={{ mb: 2 }}>
                <img
                  src={getImageUrl(selectedCompany.imagePath)}
                  alt={selectedCompany.name}
                  style={{ width: '100%', height: 'auto', marginBottom: '1rem' }}
                />
                <Typography variant="body1" paragraph>
                  {selectedCompany.description}
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  Industry: {selectedCompany.industry}
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  Location: {selectedCompany.location}
                </Typography>
                {selectedCompany.website && (
                  <Typography variant="subtitle1">
                    Website: <a href={selectedCompany.website} target="_blank" rel="noopener noreferrer">{selectedCompany.website}</a>
                  </Typography>
                )}
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog}>Close</Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Container>
  );
};

export default CompanyShowcase; 