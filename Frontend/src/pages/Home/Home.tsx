import React from 'react';
import { Typography, Button, Box, Container } from '@mui/joy';
import PageTemplate from '../../components/PageTemplate';
import DiversList from '../../components/DiversList';
import './Home.css';

const Home: React.FC = () => {
  return (
    <PageTemplate>
        <Box className="home-container">
          <div className="home-main">
            <Typography level="h1" className="home-title">
              Find Your Dive Buddy
            </Typography>
            <Typography level="h4" className="home-subtitle">
              Connect with fellow divers and explore the underwater world together
            </Typography>
            <Box className="button-container">
              <Button size="lg" color="primary">
                Find a Buddy
              </Button>
              <Button size="lg" variant="outlined" color="neutral">
                Create Profile
              </Button>
            </Box>
          </div>
        </Box>
        <DiversList />
    </PageTemplate>
  );
};

export default Home; 