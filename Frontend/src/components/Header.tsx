import React from 'react';
import { Typography, Box, Button } from '@mui/joy';
import { Link } from 'react-router-dom';
import './Header.css';
import { loadUser } from '../utils/storage';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store/store';
import { logoutUser } from '../store/UserReducer';

const Header: React.FC = () => {

  const accessToken = loadUser();
  const dispatch = useDispatch<AppDispatch>();

  return (
    <Box className="header-container">
      <Typography level="h2" className="header-title">
        <Link to="/" className="header-link">
          DiveBuddyFinder
        </Link>
      </Typography>
      <Box className="header-user-actions">
        {accessToken === null ? 
        (<Button className="header-login-button" variant="outlined" color="primary" component={Link} to="/login">
          Login
        </Button>)
        :
        (<Button className="header-login-button" variant="outlined" color="primary" onClick={() => dispatch(logoutUser())}>
          Logout
        </Button>)
        }
        
      </Box>
    </Box>
  );
};

export default Header;