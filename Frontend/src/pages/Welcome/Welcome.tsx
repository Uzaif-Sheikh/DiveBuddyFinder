import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Box, Button, Input, FormLabel, Textarea, CircularProgress } from '@mui/joy';
import PageTemplate from '../../components/PageTemplate';
import { debounce } from '../../utils/debounce';
import { addressApi } from '../../api/addressApi';
import { AddressResult } from '../../api/addressApi';
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
  
  const [suggestedAddress, setSuggestedAddress] = useState<Array<AddressResult>>([]);

  const [addressLookup, setAddressLookup] = useState('');

  const [address, setAddress] = useState({
    osm_id: 0,
    suburb: '',
    state: '',
    postalCode: '',
    country: '',
    country_code: ''
  });
  
  const [certificateSearch, setCertificateSearch] = useState('');
  const [selectedCertificates, setSelectedCertificates] = useState<Array<{ id: number, name: string, organization: string }>>([]);
  const [filteredCertificates, setFilteredCertificates] = useState<Array<{ id: number, name: string, organization: string }>>([]);

  const handleDiverInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setDiverInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setDiverInfo(prev => ({ ...prev, image: null }));
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
    //navigate('/');
  };

  const selectAddress = (address: AddressResult) => {
    console.log(address);
    setAddress({
      osm_id: address?.osm_id,
      suburb: address?.address?.suburb ?? '',
      state: address?.address?.state ?? '',
      postalCode: address?.address?.postcode ?? '',
      country: address?.address?.country ?? '',
      country_code: address?.address?.country_code ?? ''
    })
    setAddressLookup('');
    setSuggestedAddress([]);
  };

  const debounceSearch = useCallback(
    debounce(async (value) => {
      if(value.length >= 4) {
        try {
          const data = await addressApi(value);
          setSuggestedAddress(data);
        } catch (error) {
          console.log(`Error with fetch`, error);
        }
      } else {
        setSuggestedAddress([]);
      }
    }, 300)
    ,
    []
  );


  const addressOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAddressLookup(value);
    debounceSearch(value);
  }

  return (
    <PageTemplate>
      <div className='welcome-main-container'>
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
                  <Input
                    name="firstName"
                    value={diverInfo.firstName}
                    onChange={handleDiverInfoChange}
                    required
                  />
                </Box>
                
                <Box className="form-group">
                  <FormLabel>Last Name</FormLabel>
                  <Input
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
                  <Input
                    name="age"
                    type="number"
                    value={diverInfo.age}
                    onChange={handleDiverInfoChange}
                    required
                  />
                </Box>
                
                <Box className="form-group">
                  <FormLabel>Total Dives</FormLabel>
                  <Input
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
                <FormLabel>About</FormLabel>
                <Textarea
                  minRows={4}
                  name="bio"
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
                <FormLabel>Address</FormLabel>
                <Input
                  name="street"
                  value={addressLookup}
                  onChange={addressOnChange}
                  placeholder='Search your Postcode or City...'
                  required
                />
                {(suggestedAddress.length > 0 || (suggestedAddress.length === 0 && addressLookup.length > 0)) && <Box className="addressLookup-dropdown">
                  {suggestedAddress.length === 0 && <CircularProgress variant="outlined"/>}
                    {suggestedAddress.map(add => (
                      <Box 
                        key={add.osm_id}
                        className="address-option"
                        onClick={() => selectAddress(add)}
                      >
                        {add.display_name}
                      </Box>
                    ))}
                  </Box>
                }  
              </Box>
              
              {address.osm_id && 
                <div>
                  <Box className="form-row">
                    <Box className="form-group">
                      <FormLabel>Suburb</FormLabel>
                      <Input
                        name="city"
                        value={address.suburb}
                        required
                        disabled={address.suburb.length === 0 ? false : true}
                      />
                    </Box>
                  
                    <Box className="form-group">
                      <FormLabel>State/Province</FormLabel>
                      <Input
                        name="state"
                        value={address.state}
                        required
                        disabled
                      />
                    </Box>
                </Box>
                
                <Box className="form-row">
                  <Box className="form-group">
                    <FormLabel>Postal Code</FormLabel>
                    <Input
                      name="postalCode"
                      value={address.postalCode}
                      required
                      disabled={address.postalCode.length === 0 ? false : true}
                    />
                  </Box>
                  
                  <Box className="form-group">
                    <FormLabel>Country</FormLabel>
                    <Input
                      name="country"
                      value={address.country}
                      required
                      disabled
                    />
                  </Box>
                </Box>
              </div>
              }
              

            </Box>
            
            {/* Certificates Section */}
            <Box className="form-section">
              <Typography level="h4" className="section-title">
                Diving Certificates
              </Typography>
              
              <Box className="form-group">
                <FormLabel>Search Certificates</FormLabel>
                <Input
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
                <Typography fontWeight="bold">
                  Selected Certificates:
                </Typography>
                
                {selectedCertificates.length === 0 ? (
                  <Typography className="no-certificates">
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
      </div>
        
    </PageTemplate>
  );
};

export default Welcome; 