import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Typography, Box, Button, Input, FormLabel, Textarea, CircularProgress } from '@mui/joy';
import PageTemplate from '../../components/PageTemplate';
import { debounce } from '../../utils/debounce';
import { toBase64 } from '../../utils/toBase64';
import { addressApi } from '../../api/addressApi';
import { AddressResult } from '../../api/addressApi';
import { Certificate } from '../../api/certificateApi';
import { getCertificateAsync } from '../../store/certificateReducer';
import { createDiverAsync, DiverState, setDiverState } from '../../store/diverReducer';
import { AppDispatch, RootState } from '../../store/store';
import './Welcome.css';
import { useDispatch, useSelector } from 'react-redux';


const Welcome: React.FC = () => {
  const { id } = useParams<{ id: string}>();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  
  const imageRef = React.useRef<HTMLInputElement>(null);
  const diverInfo = useSelector((state: RootState) => state.diver);
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
  const [selectedCertificates, setSelectedCertificates] = useState<Array<Certificate>>([]);
  const [filteredCertificates, setFilteredCertificates] = useState<Array<Certificate>>([]);
  const availableCertificates = useSelector((state: RootState) => state.certificate.certificates);

  const handleDiverInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    dispatch(setDiverState({
      ...diverInfo,
      [name]: value
    }));
  };
  const [imgFile, setImgFile] = useState<File | null>(null);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImgFile(file);
      const imgBase64 = file ? await toBase64(file) : null;
      if(file.type.startsWith('image/')) {
        dispatch(setDiverState({
          ...diverInfo,
          img: imgBase64
        }));
      } else {
        dispatch(setDiverState({
          ...diverInfo,
          img: null
        }));
        alert('Please select a valid image file');
      }
    }
  };

  useEffect(() => {
    dispatch(getCertificateAsync());
  }, []);

  const handleCertificateSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCertificateSearch(value);
    
    if (value.trim() === '') {
      setFilteredCertificates([]);
    } else {
      const filtered = availableCertificates.filter(cert => 
        cert.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredCertificates(filtered);
    }
  };

  const addCertificate = (certificate: Certificate) => {
    if (!selectedCertificates.some(cert => cert.id === certificate.id)) {
      setSelectedCertificates(prev => [...prev, certificate]);
    }
    setCertificateSearch('');
    setFilteredCertificates([]);
  };

  const removeCertificate = (id: string) => {
    setSelectedCertificates(prev => prev.filter(cert => cert.id !== id));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    
    const payload: DiverState = {
      id: id!,
      firstName: diverInfo.firstName,
      lastName: diverInfo.lastName,
      age: diverInfo.age,
      totalDives: diverInfo.totalDives,
      bio: diverInfo.bio,
      img: diverInfo.img,
      location: {
        postcode: address.postalCode,
        suburb: address.suburb,
        state: address.state,
        countryCode: address.country_code
      },
      certificates: selectedCertificates.map(cert => cert.id)
    }
    await dispatch(createDiverAsync(payload));
    navigate('/');
  };

  const selectAddress = (address: AddressResult) => {
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
    }, 500)
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
              { diverInfo.img &&
              <Box className="form-row">
                <img 
                  src={diverInfo.img}
                  alt="Profile Preview" 
                  className="profile-preview"
                />
              </Box>
              }
              <Box className="form-group">
                <FormLabel>Profile Picture</FormLabel>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="file-input"
                  ref={imageRef}
                />
                {imgFile &&
                <><span className="file-name">{imgFile.name}</span>
                <button 
                  type="button" 
                  className="remove-image-button"
                  onClick={() => {
                    dispatch(setDiverState({
                      ...diverInfo,
                      img: null
                    }));
                    if (imageRef.current) {
                      imageRef.current.value = '';
                    }
                    setImgFile(null);
                  }}
                >
                  X
                </button></>}
              </Box>
              
              <Box className="form-group">
                <FormLabel>About</FormLabel>
                <Textarea
                  minRows={4}
                  name="bio"
                  value={diverInfo.bio}
                  onChange={handleDiverInfoChange}
                  placeholder="Tell others about yourself and your diving experience..."
                  required
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
                <span className="address-hint">Start typing your suburb, city, and postcode to search</span>
                <Input
                  name="street"
                  value={addressLookup}
                  onChange={addressOnChange}
                  placeholder='Search your Postcode or City...'
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
                        onChange={e => setAddress({...address, postalCode: e.target.value})}
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
                      onChange={e => setAddress({...address, postalCode: e.target.value})}
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
                        <span>{cert.name} ({cert.agency})</span>
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
                        <div className="certificate-info">
                          <span>{cert.name} ({cert.agency})</span>
                          <span className="certificate-url" onClick={() => window.open(cert.url, '_blank')}>[Info]</span>
                        </div>
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