import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import Login from './components/Login';
import Register from './components/Register';
import AdminDashboard from './components/AdminDashboard';
import AddJob from './components/AddJob';
import JobsPage from './components/JobsPage';
import ProtectedRoute from './components/ProtectedRoute';
import ProtectedEmployeeRoute from './components/ProtectedEmployeeRoute';
import { logout } from './store/authSlice';

const App = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, userType } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Job Portal
          </Typography>
          {isAuthenticated ? (
            <>
              {userType === 'admin' && (
                <>
                  <Button color="inherit" component={Link} to="/admin/dashboard">
                    Dashboard
                  </Button>
                  <Button color="inherit" component={Link} to="/admin/add-job">
                    Add Job
                  </Button>
                </>
              )}
              {userType === 'employee' && (
                <Button color="inherit" component={Link} to="/jobs">
                  Jobs
                </Button>
              )}
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button color="inherit" component={Link} to="/login">
                Login
              </Button>
              <Button color="inherit" component={Link} to="/register">
                Register
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>

      <Container sx={{ mt: 4 }}>
        <Routes>
          <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to={userType === 'admin' ? '/admin/dashboard' : '/jobs'} />} />
          <Route path="/register" element={!isAuthenticated ? <Register /> : <Navigate to={userType === 'admin' ? '/admin/dashboard' : '/jobs'} />} />
          
          {/* Protected Admin Routes */}
          <Route element={<ProtectedRoute isAdminOnly />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/add-job" element={<AddJob />} />
          </Route>

          {/* Protected Employee Routes */}
          <Route element={<ProtectedEmployeeRoute />}>
            <Route path="/jobs" element={<JobsPage />} />
          </Route>
          
          {/* Redirect root to appropriate page based on auth status */}
          <Route path="/" element={
            isAuthenticated 
              ? <Navigate to={userType === 'admin' ? '/admin/dashboard' : '/jobs'} /> 
              : <Navigate to="/login" />
          } />
        </Routes>
      </Container>
    </Router>
  );
};

export default App; 