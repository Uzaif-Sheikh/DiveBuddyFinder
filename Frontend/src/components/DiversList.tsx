import React from 'react';
import { Card, Typography, Box, Stack, Chip } from '@mui/joy';
import './DiversList.css';

interface Diver {
  id: number;
  name: string;
  experience: string;
  location: string;
  specialties: string[];
  imageUrl: string;
}

const mockDivers: Diver[] = [
  {
    id: 1,
    name: "John Smith",
    experience: "Advanced Open Water",
    location: "Maldives",
    specialties: ["Deep Diving", "Wreck Diving"],
    imageUrl: "https://i.pravatar.cc/150?img=1"
  },
  {
    id: 2,
    name: "Sarah Johnson",
    experience: "Rescue Diver",
    location: "Great Barrier Reef",
    specialties: ["Coral Conservation", "Night Diving"],
    imageUrl: "https://i.pravatar.cc/150?img=2"
  },
  {
    id: 3,
    name: "Mike Chen",
    experience: "Master Scuba Diver",
    location: "Bali",
    specialties: ["Technical Diving", "Underwater Photography"],
    imageUrl: "https://i.pravatar.cc/150?img=3"
  },
  {
    id: 4,
    name: "John Smith",
    experience: "Advanced Open Water",
    location: "Maldives",
    specialties: ["Deep Diving", "Wreck Diving", "Night Diving", "Coral Conservation", "Technical Diving", "Underwater Photography"],
    imageUrl: "https://i.pravatar.cc/150?img=1"
  },
  {
    id: 5,
    name: "Sarah Johnson",
    experience: "Rescue Diver",
    location: "Great Barrier Reef",
    specialties: ["Coral Conservation", "Night Diving"],
    imageUrl: "https://i.pravatar.cc/150?img=2"
  },
  {
    id: 6,
    name: "Mike Chen",
    experience: "Master Scuba Diver",
    location: "Bali",
    specialties: ["Technical Diving", "Underwater Photography"],
    imageUrl: "https://i.pravatar.cc/150?img=3"
  },
  {
    id: 7,
    name: "Sarah Johnson",
    experience: "Rescue Diver",
    location: "Great Barrier Reef",
    specialties: ["Coral Conservation", "Night Diving"],
    imageUrl: "https://i.pravatar.cc/150?img=2"
  },
  {
    id: 8,
    name: "Mike Chen",
    experience: "Master Scuba Diver",
    location: "Bali",
    specialties: ["Technical Diving", "Underwater Photography"],
    imageUrl: "https://i.pravatar.cc/150?img=3"
  }
];

const DiversList: React.FC = () => {
  return (
    <Box className="divers-list-container">
      <Typography level="h2" className="divers-list-title">
        Popular Divers
      </Typography>
      <Box className="divers-grid">
        {mockDivers.map((diver) => (
          <Card key={diver.id} className="diver-card" color="primary">
            <Box className="diver-card-content">    
              <div className="diver-avatar-container">
                <img src={diver.imageUrl} className="diver-avatar"/>
              </div>
              <Box className="diver-info">
                <Typography level="h4">{diver.name}</Typography>
                <Typography level="body-sm" color="neutral">
                  {diver.experience}
                </Typography>
                <Typography level="body-sm" color="neutral">
                  {diver.location}
                </Typography>
                <Stack direction="row" spacing={1} className="specialties-container">
                  {diver.specialties.map((specialty, index) => (
                    <Chip key={index} size="sm" variant="soft" color="primary">
                      {specialty}
                    </Chip>
                  ))}
                </Stack>
              </Box>
            </Box>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default DiversList; 