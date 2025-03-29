import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Navbar from './components/layout/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import JobListings from './pages/JobListings';
import Contact from './pages/Contact';
import CompanyShowcase from './pages/CompanyShowcase';
import Login from './pages/Login';
import { AuthProvider, useAuth } from './context/AuthContext';

const theme = createTheme({
  palette: {
    primary: {
      main: '#131921',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

// Protected Route component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route 
              path="/jobs" 
              element={
                <ProtectedRoute>
                  <JobListings />
                </ProtectedRoute>
              } 
            />
            <Route path="/contact" element={<Contact />} />
            <Route 
              path="/companies" 
              element={
                <ProtectedRoute>
                  <CompanyShowcase />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App; 