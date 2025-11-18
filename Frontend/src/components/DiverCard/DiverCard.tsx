import React from 'react';
import { Card, Typography, Box, Chip, Button } from '@mui/joy';
import { Link, Links } from 'react-router-dom';
import './DiverCard.css';

interface Diver {
  id: number;
  name: string;
  experience: string;
  location: string;
  age: number;
  totalDives: number;
  specialties: string[];
  certifications: string[];
  imageUrl: string;
}

interface DiverProps {
  diver: Diver
}

const DiverCard: React.FC<DiverProps> = ({ diver }: DiverProps) => {
  return (
    <Card key={diver.id} className="diver-card">
      <Box className="diver-card-content">
        <div className="diver-avatar-container">
          <img src={diver.imageUrl} className="diver-avatar" />
        </div>
        <Box className="diver-info">
          <Link to={`/diver/${diver.id}`} className="diver-name-link">
            <Typography level="h4">{diver.name}</Typography>
          </Link>
          <Box className="diver-details">
            <Typography className="diver-location">
              📍 {diver.location}
            </Typography>
            <Typography className="diver-age-dives">
              {diver.age} years • {diver.totalDives} dives
            </Typography>
            <Typography className="diver-experience">
              Experience: {diver.experience}
            </Typography>
          </Box>

          <Box className="diver-tags">
            {diver.certifications.map((cert, index) => (
              <Chip
                key={`cert-${index}`}
                size="sm"
                variant="outlined"
                color="primary"
                className="diver-tag"
              >
                {cert}
              </Chip>
            ))}

            {diver.specialties.map((specialty, index) => (
              <Chip
                key={`spec-${index}`}
                size="sm"
                variant="soft"
                color="neutral"
                className="diver-tag"
              >
                {specialty}
              </Chip>
            ))}
          </Box>
        </Box>
        <div>
          <Button>
            <Link to={`/diver/${diver.id}`} style={{color: "white"}}>View Details</Link>
          </Button>
        </div>
      </Box>
    </Card>
  );
};

export default DiverCard;