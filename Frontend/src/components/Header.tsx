import React from 'react';
import { Typography, Box } from '@mui/joy';
import { Link } from 'react-router-dom';
import './Header.css';

const Header: React.FC = () => {
  return (
    <Box className="header-container">
      <Typography level="h2" className="header-title">
        <Link to="/" className="header-link">
          DiveBuddyFinder
        </Link>
      </Typography>
    </Box>
  );
};

export default Header;