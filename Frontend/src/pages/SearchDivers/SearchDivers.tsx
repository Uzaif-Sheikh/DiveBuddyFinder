import React, { useState, useEffect } from 'react';
import { Typography, Box, Container, Input, Button, Chip, Card, Avatar, Select, Option, Checkbox, FormLabel } from '@mui/joy';
import { Link } from 'react-router-dom';
import PageTemplate from '../../components/PageTemplate';
import './SearchDivers.css';
import DiverCard from '../../components/DiverCard/DiverCard';

// Mock data for divers
const mockDivers = Array.from({ length: 24 }, (_, i) => ({
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

// Location options for filter
const locationOptions = ['Sydney', 'Melbourne', 'Brisbane', 'Perth', 'Gold Coast'];

// Certification options for filter
const certificationOptions = [
  'Open Water Diver',
  'Advanced Open Water',
  'Rescue Diver',
  'Divemaster',
  'Night Diver Specialty',
  'Deep Diver Specialty'
];

// Experience level options
const experienceOptions = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];

const SearchDivers: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    locations: [] as string[],
    certifications: [] as string[],
    experience: [] as string[],
    ageRange: { min: 18, max: 80 },
    minDives: 0
  });
  const [filteredDivers, setFilteredDivers] = useState(mockDivers);
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('name');
  const itemsPerPage = 8;

  // Apply filters and search
  useEffect(() => {
    let result = [...mockDivers];
    
    // Apply search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(diver => 
        diver.name.toLowerCase().includes(query) || 
        diver.location.toLowerCase().includes(query) ||
        diver.specialties.some(s => s.toLowerCase().includes(query))
      );
    }
    
    // Apply location filter
    if (filters.locations.length > 0) {
      result = result.filter(diver => filters.locations.includes(diver.location));
    }
    
    // Apply certification filter
    if (filters.certifications.length > 0) {
      result = result.filter(diver => 
        diver.certifications.some(cert => filters.certifications.includes(cert))
      );
    }
    
    // Apply experience filter
    if (filters.experience.length > 0) {
      result = result.filter(diver => filters.experience.includes(diver.experience));
    }
    
    // Apply age filter
    result = result.filter(diver => 
      diver.age >= filters.ageRange.min && diver.age <= filters.ageRange.max
    );
    
    // Apply minimum dives filter
    result = result.filter(diver => diver.totalDives >= filters.minDives);
    
    // Apply sorting
    result.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'location':
          return a.location.localeCompare(b.location);
        case 'age':
          return a.age - b.age;
        case 'dives':
          return b.totalDives - a.totalDives;
        default:
          return 0;
      }
    });
    
    setFilteredDivers(result);
    setCurrentPage(1); // Reset to first page when filters change
  }, [searchQuery, filters, sortBy]);

  // Get current page divers
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentDivers = filteredDivers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredDivers.length / itemsPerPage);

  const handleFilterChange = (
    filterType: 'locations' | 'certifications' | 'experience',
    value: string[]
  ) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const handleAgeRangeChange = (key: 'min' | 'max', value: string) => {
    const numValue = parseInt(value) || 0;
    setFilters(prev => ({
      ...prev,
      ageRange: {
        ...prev.ageRange,
        [key]: numValue
      }
    }));
  };

  const handleMinDivesChange = (value: string) => {
    const numValue = parseInt(value) || 0;
    setFilters(prev => ({
      ...prev,
      minDives: numValue
    }));
  };

  const clearAllFilters = () => {
    setFilters({
      locations: [],
      certifications: [],
      experience: [],
      ageRange: { min: 18, max: 80 },
      minDives: 0
    });
    setSearchQuery('');
  };

  return (
    <PageTemplate>
      <Container maxWidth="lg">
        <Box className="search-page-container">
          <Typography level="h2" className="search-title">
            Find Your Dive Buddy
          </Typography>
          
          <Box className="search-controls">
            <Input
              placeholder="Search by name, location or specialties..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
              size="lg"
            />
            
            <Button 
              onClick={() => setShowFilters(!showFilters)}
              variant={showFilters ? "solid" : "outlined"}
              color="primary"
              className="filter-button"
            >
              {showFilters ? "Hide Filters" : "Show Filters"}
            </Button>
          </Box>
          
          {showFilters && (
            <Box className="filters-container">
              <Box className="filters-header">
                <Typography level="h4">Filters</Typography>
                <Button variant="plain" onClick={clearAllFilters}>Clear All</Button>
              </Box>
              
              <Box className="filters-grid">
                <Box className="filter-group">
                  <FormLabel>Location</FormLabel>
                  <Select
                    multiple
                    placeholder="Select locations"
                    value={filters.locations}
                    onChange={(_, newValue) => handleFilterChange('locations', newValue as string[])}
                  >
                    {locationOptions.map(location => (
                      <Option key={location} value={location}>
                        {location}
                      </Option>
                    ))}
                  </Select>
                </Box>
                
                <Box className="filter-group">
                  <FormLabel>Certifications</FormLabel>
                  <Select
                    multiple
                    placeholder="Select certifications"
                    value={filters.certifications}
                    onChange={(_, newValue) => handleFilterChange('certifications', newValue as string[])}
                  >
                    {certificationOptions.map(cert => (
                      <Option key={cert} value={cert}>
                        {cert}
                      </Option>
                    ))}
                  </Select>
                </Box>
                
                <Box className="filter-group">
                  <FormLabel>Experience Level</FormLabel>
                  <Select
                    multiple
                    placeholder="Select experience level"
                    value={filters.experience}
                    onChange={(_, newValue) => handleFilterChange('experience', newValue as string[])}
                  >
                    {experienceOptions.map(exp => (
                      <Option key={exp} value={exp}>
                        {exp}
                      </Option>
                    ))}
                  </Select>
                </Box>
                
                <Box className="filter-group">
                  <FormLabel>Age Range</FormLabel>
                  <Box className="range-inputs">
                    <Input
                      type="number"
                      placeholder="Min"
                      value={filters.ageRange.min}
                      onChange={(e) => handleAgeRangeChange('min', e.target.value)}
                      size="sm"
                    />
                    <span>to</span>
                    <Input
                      type="number"
                      placeholder="Max"
                      value={filters.ageRange.max}
                      onChange={(e) => handleAgeRangeChange('max', e.target.value)}
                      size="sm"
                    />
                  </Box>
                </Box>
                
                <Box className="filter-group">
                  <FormLabel>Minimum Dives</FormLabel>
                  <Input
                    type="number"
                    placeholder="Minimum number of dives"
                    value={filters.minDives}
                    onChange={(e) => handleMinDivesChange(e.target.value)}
                  />
                </Box>
              </Box>
            </Box>
          )}
          
          <Box className="results-header">
            <Typography>
              {filteredDivers.length} divers found
            </Typography>
            
            <Box className="sort-container">
              <Typography>Sort by:</Typography>
              <Select
                value={sortBy}
                onChange={(_, value) => setSortBy(value as string)}
                size="sm"
              >
                <Option value="name">Name</Option>
                <Option value="location">Location</Option>
                <Option value="age">Age</Option>
                <Option value="dives">Most Dives</Option>
              </Select>
            </Box>
          </Box>
          
          {filteredDivers.length === 0 ? (
            <Box className="no-results">
              <Typography level="h4">No Divers Found</Typography>
              <Typography>
                Try adjusting your search criteria or clearing some filters.
              </Typography>
              <Button onClick={clearAllFilters} sx={{ mt: 2 }}>
                Clear All Filters
              </Button>
            </Box>
          ) : (
            <>
              <Box className="divers-grid">
                {currentDivers.map(diver => (
                  <DiverCard diver={diver}/>
                ))}
              </Box>
              
              <Box className="pagination">
                <Button 
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(prev => prev - 1)}
                  variant="plain"
                >
                  Previous
                </Button>
                
                <Box className="page-numbers">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <Button
                      key={page}
                      variant={page === currentPage ? 'solid' : 'plain'}
                      color={page === currentPage ? 'primary' : 'neutral'}
                      onClick={() => setCurrentPage(page)}
                      className="page-number"
                    >
                      {page}
                    </Button>
                  ))}
                </Box>
                
                <Button 
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(prev => prev + 1)}
                  variant="plain"
                >
                  Next
                </Button>
              </Box>
            </>
          )}
        </Box>
      </Container>
    </PageTemplate>
  );
};

export default SearchDivers; 