import React from 'react';
import { Typography, Box, } from '@mui/joy';
import './DiversList.css';
import DiverCard from './DiverCard/DiverCard';

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

const mockDivers: Diver[] = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  name: `Diver ${i + 1}`,
  location: ['Sydney', 'Melbourne', 'Brisbane', 'Perth', 'Gold Coast'][Math.floor(Math.random() * 5)],
  age: Math.floor(Math.random() * 30) + 20,
  experience: ['Beginner', 'Intermediate', 'Advanced', 'Expert'][Math.floor(Math.random() * 4)],
  totalDives: Math.floor(Math.random() * 200) + 5,
  specialties: [
    'Deep Diving',
    'Night Diving',
    'Wreck Diving',
    'Cave Diving',
    'Underwater Photography',
    'Coral Conservation',
    'Technical Diving'
  ].sort(() => 0.5 - Math.random()).slice(0, Math.floor(Math.random() * 3) + 1),
  certifications: [
    'Open Water Diver',
    'Advanced Open Water',
    'Rescue Diver',
    'Divemaster',
    'Night Diver Specialty',
    'Deep Diver Specialty'
  ].sort(() => 0.5 - Math.random()).slice(0, Math.floor(Math.random() * 3) + 1),
  imageUrl: `https://i.pravatar.cc/150?img=${(i % 70) + 1}`
}));

const DiversList: React.FC = () => {
  return (
    <Box className="divers-list-container">
      <Typography level="h2" className="divers-list-title">
        Popular Divers
      </Typography>
      <Box className="divers-grid">
        {mockDivers.map((diver) => (
          <DiverCard diver={diver} />
        ))}
      </Box>
    </Box>
  );
};

export default DiversList; 