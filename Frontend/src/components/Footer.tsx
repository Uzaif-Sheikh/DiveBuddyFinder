import React from 'react';
import { Box, Typography } from '@mui/joy';
import './Footer.css';

const Footer: React.FC = () => {
  return (
    <Box className="footer-container">
      <div className="footer-content">
        <div className="footer-section">
          <Typography className="footer-title">About DiveBuddyFinder</Typography>
          <Typography className="footer-text">
            DiveBuddyFinder was created to solve a common problem in the diving community - finding reliable 
            dive buddies. Whether you're an experienced diver or just starting out, having a compatible 
            buddy is crucial for safe and enjoyable diving experiences. This platform helps connect divers 
            and snorkelers in Sydney, making it easier to plan adventures and explore the underwater world together.
          </Typography>
        </div>
        
        <div className="footer-section">
          <Typography className="footer-title">Contribute</Typography>
          <Typography className="footer-text">
            This is an open-source project, and we welcome contributions from the community. Whether you're 
            a developer, designer, or diving enthusiast, your input can help make DiveBuddyFinder better for everyone.
          </Typography>
          <a 
            href="https://github.com/Uzaif-Sheikh/DiveBuddyFinder" 
            className="footer-link" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            Contribute on GitHub →
          </a>
        </div>
      </div>
      
      <div className="copyright">
        © {new Date().getFullYear()} DiveBuddyFinder. Created with ❤️ by <a href="https://github.com/Uzaif-Sheikh"
            className="footer-link" 
            target="_blank">Uzaif</a>
      </div>
    </Box>
  );
};

export default Footer; 