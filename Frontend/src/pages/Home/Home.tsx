import React from 'react';
import { Typography, Button, Box } from '@mui/joy';
import PageTemplate from '../../components/PageTemplate';
import DiversList from '../../components/DiversList';
import './Home.css';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {

  const navigator = useNavigate();

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
            <Button size="lg" color="primary" onClick={() => navigator('/search-divers')}>
              Find a Buddy
            </Button>
            <Button size="lg" variant="outlined" color="neutral" onClick={() => navigator('/signup')}>
              Create Profile
            </Button>
          </Box>
        </div>
      </Box>
      <DiversList />
      <Box className="see-more-divers">
        <Button endDecorator="→" size="lg" variant="outlined" onClick={() => navigator('/search-divers')}>
          checkout more divers
        </Button>
      </Box>
    </PageTemplate>
  );
};

export default Home; 