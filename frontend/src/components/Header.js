import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import logo from '../assets/images/logo.png';
import Login from './Login';
import Signup from './Signup';
import { useAuth } from '../context/authContext';
import { useNavigate } from 'react-router-dom';


export default function Header() {

  const mockUser = {
    isLoggedIn: localStorage.getItem('isLoggedIn') === 'true',
    profileName: localStorage.getItem('username'),
  };

  const [user, setUser] = React.useState(mockUser);
  const navigate = useNavigate();

  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
    setUser({ isLoggedIn: false, profileName: '' });
  };

  return (
    <Box>
      <AppBar position="static">
        <Toolbar
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            margin: '0px 30px',
          }}
        >
          <Box
            component="img"
            src={logo}
            alt="Logo"
            sx={{ width: '50px', height: '50px' }}
          />

          <Typography
            variant="h5"
            component="div"
            color="secondary"
            sx={{
              textAlign: 'center',
              flexGrow: 1,
              fontWeight: 'bold',
            }}
          >
            CritiQuill
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            {user.isLoggedIn ? (
              <>
                <Typography
                  variant="body1"
                  component="div"
                  color="secondary"
                  sx={{ marginRight: '16px' }}
                >
                  {user.profileName}
                </Typography>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Login />
                <Signup />
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
