import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
  Paper,
  Grid,
  Alert,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useAuth } from '../../context/authContext';
import { useNavigate } from 'react-router-dom';

export default function LoginForm() {
  const theme = useTheme();
  const { login } = useAuth();
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  const [loginError, setLoginError] = useState('');

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
    setLoginError('');
  };

  const validate = () => {
    let tempErrors = { email: '', password: '' };
    let isValid = true;

    // Email validation (basic format check)
    if (!credentials.email) {
      tempErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(credentials.email)) {
      tempErrors.email = 'Email is invalid';
      isValid = false;
    }

    // Password validation (minimum 6 characters)
    if (!credentials.password) {
      tempErrors.password = 'Password is required';
      isValid = false;
    } else if (credentials.password.length < 6) {
      tempErrors.password = 'Password must be at least 6 characters';
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validate()) {
      const newCredentials = {
        username: credentials.email,
        password: credentials.password,
      };

      try {
        const response = await login(newCredentials);
        if (!response) {
          setLoginError('Invalid email or password');
        } else {
          navigate("/dashboard")
          console.log('Login successful:', response);

        }
      } catch (error) {
        setLoginError('An unexpected error occurred');
        console.error('Login error:', error);
      }
    }
  };

  return (
    <Container component="main" maxWidth="xs" sx={{ minWidth: '400px' }}>
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          borderRadius: 3,
          backgroundColor: theme.palette.background.paper,
          boxShadow: theme.shadows[6],
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            height: '500px',
          }}
        >
          <Typography
            variant="h5"
            component="h1"
            color="primary"
            sx={{
              marginBottom: 3,
              margin: '40px auto',
              fontWeight: 'bold',
            }}
          >
            Login to Your Account
          </Typography>

          {/* Display login error */}
          {loginError && (
            <Alert severity="error" sx={{ width: '100%', marginBottom: 2 }}>
              {loginError}
            </Alert>
          )}

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
              '&:hover': {
                backgroundColor: theme.palette.primary.dark,
              },
            }}
            onClick={handleSubmit}
          >
            Login
          </Button>

          <Grid container sx={{ marginTop: 1 }}>
            <Grid item xs>
              <Button
                variant="text"
                color="primary"
                sx={{
                  textTransform: 'none',
                }}
                onClick={() => alert('Forgot Password Clicked')}
              >
                Forgot Password?
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="text"
                color="primary"
                sx={{
                  textTransform: 'none',
                }}
                onClick={() => alert('Sign Up Clicked')}
              >
                Don&apos;t have an account? Sign Up
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
}
