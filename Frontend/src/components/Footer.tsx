import React from 'react';
import { Typography, Box } from '@mui/joy';
import './Footer.css';

const Footer: React.FC = () => {
  return (
    <Box className="footer-container">
      <Typography className="footer-text">
        &copy; {new Date().getFullYear()} DiveBuddyFinder. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer; 