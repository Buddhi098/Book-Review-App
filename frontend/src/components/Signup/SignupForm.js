import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Container, Paper, Grid, Alert } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useAuth } from '../../context/authContext';

export default function SignUpForm() {
  const theme = useTheme();
  const { register } = useAuth();

  const [credentials, setCredentials] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [message, setMessage] = useState({ text: '', type: '' });

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    let tempErrors = { name: '', email: '', password: '', confirmPassword: '' };
    let isValid = true;

    if (!credentials.name) {
      tempErrors.name = 'Name is required';
      isValid = false;
    }

    if (!credentials.email) {
      tempErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(credentials.email)) {
      tempErrors.email = 'Email is invalid';
      isValid = false;
    }

    if (!credentials.password) {
      tempErrors.password = 'Password is required';
      isValid = false;
    } else if (credentials.password.length < 6) {
      tempErrors.password = 'Password must be at least 6 characters';
      isValid = false;
    }

    if (!credentials.confirmPassword) {
      tempErrors.confirmPassword = 'Please confirm your password';
      isValid = false;
    } else if (credentials.confirmPassword !== credentials.password) {
      tempErrors.confirmPassword = 'Passwords do not match';
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validate()) {
      console.log('Signup submitted:', credentials);
      const { confirmPassword, ...newCredentials } = credentials;

      try {
        const success = await register(newCredentials);
        if (success) {
          setMessage({ text: 'Account created successfully!', type: 'success' });
        } else {
          setMessage({ text: 'Failed to create an account. Please try again.', type: 'error' });
        }
      } catch (error) {
        setMessage({ text: 'An unexpected error occurred. Please try again.', type: 'error' });
      }
    }
  };

  return (
    <Container component="main" maxWidth="xs" sx={{ width: '400px' }}>
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          borderRadius: 3,
          backgroundColor: theme.palette.background.paper,
          boxShadow: theme.shadows[6],
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '500px' }}>
          <Typography
            variant="h5"
            component="h1"
            color="primary"
            sx={{ marginBottom: 3, margin: '10px auto', fontWeight: 'bold' }}
          >
            Create Your Account
          </Typography>

          {message.text && (
            <Alert severity={message.type} sx={{ width: '100%', mb: 2 }}>
              {message.text}
            </Alert>
          )}

          <TextField
            label="Full Name"
            name="name"
            value={credentials.name}
            onChange={handleChange}
            fullWidth
            variant="outlined"
            margin="normal"
            required
            helperText={errors.name}
            error={!!errors.name}
            sx={{
              borderRadius: 2,
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
              },
            }}
          />

          <TextField
            label="Email Address"
            name="email"
            value={credentials.email}
            onChange={handleChange}
            fullWidth
            variant="outlined"
            margin="normal"
            required
            helperText={errors.email}
            error={!!errors.email}
            sx={{
              borderRadius: 2,
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
              },
            }}
          />

          <TextField
            label="Password"
            name="password"
            type="password"
            value={credentials.password}
            onChange={handleChange}
            fullWidth
            variant="outlined"
            margin="normal"
            required
            helperText={errors.password}
            error={!!errors.password}
            sx={{
              borderRadius: 2,
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
              },
            }}
          />

          <TextField
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            value={credentials.confirmPassword}
            onChange={handleChange}
            fullWidth
            variant="outlined"
            margin="normal"
            required
            helperText={errors.confirmPassword}
            error={!!errors.confirmPassword}
            sx={{
              borderRadius: 2,
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
              },
            }}
          />

          <Button
            fullWidth
            variant="contained"
            color="primary"
            sx={{
              marginTop: 2,
              padding: '10px 20px',
              margin: '30px auto',
              fontWeight: 'bold',
              borderRadius: 2,
              marginBottom: 0,
              '&:hover': {
                backgroundColor: theme.palette.primary.dark,
              },
            }}
            onClick={handleSubmit}
          >
            Sign Up
          </Button>
          
          <Box container sx={{ marginTop: 0 }}>
            <Box item xs>
              <Button
                variant="text"
                color="grey"
                sx={{
                  textTransform: 'none',
                }}
                onClick={() => alert('Login Clicked')}
              >
                Already have an account? Login
              </Button>
            </Box>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}
