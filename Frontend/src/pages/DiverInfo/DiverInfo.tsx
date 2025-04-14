import React from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Box, Container } from '@mui/joy';
import PageTemplate from '../../components/PageTemplate';
import './DiverInfo.css';

interface Certificate {
  title: string;
  date: string;
  organization: string;
}

const mockDiverData = {
  id: '1243',
  name: 'John Smith',
  location: 'Sydney, Australia',
  experience: '5 years',
  totalDives: 150,
  specialties: ['Deep Diving', 'Night Diving', 'Wreck Diving'],
  about: 'Passionate diver with extensive experience in various diving conditions. Always eager to explore new diving spots and meet fellow diving enthusiasts.',
  imageUrl: 'https://i.pravatar.cc/300',
  certificates: [
    {
      title: 'Advanced Open Water Diver',
      date: 'June 2020',
      organization: 'PADI'
    },
    {
      title: 'Rescue Diver',
      date: 'August 2021',
      organization: 'PADI'
    },
    {
      title: 'Deep Diving Specialty',
      date: 'March 2022',
      organization: 'PADI'
    }
  ],
  socials: {
    facebook: 'https://facebook.com/johnsmith',
    instagram: 'https://instagram.com/johnsmith',
    linkedin: 'https://linkedin.com/in/johnsmith'
  }
};

const DiverInfo: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  // In a real app, you would fetch the diver data based on the ID
  const diver = mockDiverData;

  return (
    <PageTemplate>
      <Container>
        <div className="diver-info-container">
          <div className="profile-section">
            <img src={diver.imageUrl} alt={diver.name} className="profile-image" />
            <div className="profile-details">
              <Typography className="profile-name">{diver.name}</Typography>
              <Typography className="profile-location">{diver.location}</Typography>
              
              <div className="detail-item">
                <div className="detail-label">Experience</div>
                <div className="detail-value">{diver.experience}</div>
              </div>
              
              <div className="detail-item">
                <div className="detail-label">Total Dives</div>
                <div className="detail-value">{diver.totalDives}</div>
              </div>
              
              <div className="detail-item">
                <div className="detail-label">Specialties</div>
                <div className="detail-value">{diver.specialties.join(', ')}</div>
              </div>
              
              <div className="detail-item">
                <div className="detail-label">About</div>
                <div className="detail-value">{diver.about}</div>
              </div>
            </div>
          </div>

          <div className="certificates-section">
            <Typography className="section-title">Certificates</Typography>
            <div className="certificates-grid">
              {diver.certificates.map((cert, index) => (
                <div key={index} className="certificate-card">
                  <div className="certificate-title">{cert.title}</div>
                  <div className="certificate-date">
                    {cert.organization} - {cert.date}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="socials-section">
            <a href={diver.socials.facebook} className="social-link facebook" target="_blank" rel="noopener noreferrer">
              Facebook
            </a>
            <a href={diver.socials.instagram} className="social-link instagram" target="_blank" rel="noopener noreferrer">
              Instagram
            </a>
            <a href={diver.socials.linkedin} className="social-link linkedin" target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
          </div>
        </div>
      </Container>
    </PageTemplate>
  );
};

export default DiverInfo; 