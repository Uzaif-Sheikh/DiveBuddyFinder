import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Box, Container, Button, TextField, FormLabel } from '@mui/joy';
import PageTemplate from '../components/PageTemplate';
import './Welcome.css';

// Mock certificate data for the lookup
const availableCertificates = [
  { id: 1, name: 'Open Water Diver', organization: 'PADI' },
  { id: 2, name: 'Advanced Open Water Diver', organization: 'PADI' },
  { id: 3, name: 'Rescue Diver', organization: 'PADI' },
  { id: 4, name: 'Divemaster', organization: 'PADI' },
  { id: 5, name: 'Open Water Diver', organization: 'SSI' },
  { id: 6, name: 'Advanced Adventurer', organization: 'SSI' },
  { id: 7, name: 'Rescue Diver', organization: 'SSI' },
  { id: 8, name: 'Divemaster', organization: 'SSI' },
  { id: 9, name: 'Night Diving Specialty', organization: 'PADI' },
  { id: 10, name: 'Deep Diving Specialty', organization: 'PADI' }
];

const Welcome: React.FC = () => {
  const navigate = useNavigate();
  
  const [diverInfo, setDiverInfo] = useState({
    firstName: '',
    lastName: '',
    age: '',
    totalDives: '',
    bio: '',
    image: null
  });
  
  const [address, setAddress] = useState({
    street: '',
    city: '',
    state: '',
    postalCode: '',
    country: ''
  });
  
  const [certificateSearch, setCertificateSearch] = useState('');
  const [selectedCertificates, setSelectedCertificates] = useState<Array<{ id: number, name: string, organization: string }>>([]);
  const [filteredCertificates, setFilteredCertificates] = useState<Array<{ id: number, name: string, organization: string }>>([]);

  const handleDiverInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setDiverInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAddress(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setDiverInfo(prev => ({ ...prev, image: e.target.files?.[0] }));
    }
  };

  const handleCertificateSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCertificateSearch(value);
    
    if (value.trim() === '') {
      setFilteredCertificates([]);
    } else {
      const filtered = availableCertificates.filter(cert => 
        cert.name.toLowerCase().includes(value.toLowerCase()) || 
        cert.organization.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredCertificates(filtered);
    }
  };

  const addCertificate = (certificate: { id: number, name: string, organization: string }) => {
    if (!selectedCertificates.some(cert => cert.id === certificate.id)) {
      setSelectedCertificates(prev => [...prev, certificate]);
    }
    setCertificateSearch('');
    setFilteredCertificates([]);
  };

  const removeCertificate = (id: number) => {
    setSelectedCertificates(prev => prev.filter(cert => cert.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log({
      diverInfo,
      address,
      selectedCertificates
    });
    // Redirect to home page or profile page
    navigate('/');
  };

  return (
    <PageTemplate>
      <Container maxWidth="md">
        <Box className="welcome-container">
          <Typography level="h3" className="welcome-title">
            Complete Your Diver Profile
          </Typography>
          <Typography className="welcome-subtitle">
            Let's set up your profile so other divers can get to know you
          </Typography>

          <form onSubmit={handleSubmit} className="profile-form">
            {/* Diver Information Section */}
            <Box className="form-section">
              <Typography level="h4" className="section-title">
                Diver Information
              </Typography>
              
              <Box className="form-row">
                <Box className="form-group">
                  <FormLabel>First Name</FormLabel>
                  <TextField
                    name="firstName"
                    value={diverInfo.firstName}
                    onChange={handleDiverInfoChange}
                    required
                  />
                </Box>
                
                <Box className="form-group">
                  <FormLabel>Last Name</FormLabel>
                  <TextField
                    name="lastName"
                    value={diverInfo.lastName}
                    onChange={handleDiverInfoChange}
                    required
                  />
                </Box>
              </Box>
              
              <Box className="form-row">
                <Box className="form-group">
                  <FormLabel>Age</FormLabel>
                  <TextField
                    name="age"
                    type="number"
                    value={diverInfo.age}
                    onChange={handleDiverInfoChange}
                    required
                  />
                </Box>
                
                <Box className="form-group">
                  <FormLabel>Total Dives</FormLabel>
                  <TextField
                    name="totalDives"
                    type="number"
                    value={diverInfo.totalDives}
                    onChange={handleDiverInfoChange}
                    required
                  />
                </Box>
              </Box>
              
              <Box className="form-group">
                <FormLabel>Profile Picture</FormLabel>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="file-input"
                />
              </Box>
              
              <Box className="form-group">
                <FormLabel>Bio / About</FormLabel>
                <TextField
                  name="bio"
                  multiline
                  minRows={4}
                  value={diverInfo.bio}
                  onChange={handleDiverInfoChange}
                  placeholder="Tell others about yourself and your diving experience..."
                />
              </Box>
            </Box>
            
            {/* Address Information Section */}
            <Box className="form-section">
              <Typography level="h4" className="section-title">
                Address Information
              </Typography>
              
              <Box className="form-group">
                <FormLabel>Street Address</FormLabel>
                <TextField
                  name="street"
                  value={address.street}
                  onChange={handleAddressChange}
                  required
                />
              </Box>
              
              <Box className="form-row">
                <Box className="form-group">
                  <FormLabel>City</FormLabel>
                  <TextField
                    name="city"
                    value={address.city}
                    onChange={handleAddressChange}
                    required
                  />
                </Box>
                
                <Box className="form-group">
                  <FormLabel>State/Province</FormLabel>
                  <TextField
                    name="state"
                    value={address.state}
                    onChange={handleAddressChange}
                    required
                  />
                </Box>
              </Box>
              
              <Box className="form-row">
                <Box className="form-group">
                  <FormLabel>Postal Code</FormLabel>
                  <TextField
                    name="postalCode"
                    value={address.postalCode}
                    onChange={handleAddressChange}
                    required
                  />
                </Box>
                
                <Box className="form-group">
                  <FormLabel>Country</FormLabel>
                  <TextField
                    name="country"
                    value={address.country}
                    onChange={handleAddressChange}
                    required
                  />
                </Box>
              </Box>
            </Box>
            
            {/* Certificates Section */}
            <Box className="form-section">
              <Typography level="h4" className="section-title">
                Diving Certificates
              </Typography>
              
              <Box className="form-group">
                <FormLabel>Search Certificates</FormLabel>
                <TextField
                  value={certificateSearch}
                  onChange={handleCertificateSearch}
                  placeholder="Type to search certificates..."
                />
                
                {filteredCertificates.length > 0 && (
                  <Box className="certificate-dropdown">
                    {filteredCertificates.map(cert => (
                      <Box 
                        key={cert.id} 
                        className="certificate-option"
                        onClick={() => addCertificate(cert)}
                      >
                        {cert.name} ({cert.organization})
                      </Box>
                    ))}
                  </Box>
                )}
              </Box>
              
              <Box className="selected-certificates">
                <Typography level="body1" fontWeight="bold">
                  Selected Certificates:
                </Typography>
                
                {selectedCertificates.length === 0 ? (
                  <Typography level="body2" className="no-certificates">
                    No certificates selected yet
                  </Typography>
                ) : (
                  <Box className="certificate-list">
                    {selectedCertificates.map(cert => (
                      <Box key={cert.id} className="certificate-tag">
                        <span>{cert.name} ({cert.organization})</span>
                        <button 
                          type="button" 
                          className="remove-certificate"
                          onClick={() => removeCertificate(cert.id)}
                        >
                          ×
                        </button>
                      </Box>
                    ))}
                  </Box>
                )}
              </Box>
              
              <Box className="form-submit">
                <Button type="submit" size="lg">
                  Complete Profile
                </Button>
              </Box>
            </Box>
          </form>
        </Box>
      </Container>
    </PageTemplate>
  );
};

export default Welcome; 