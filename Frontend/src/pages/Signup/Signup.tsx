import React, { useState } from 'react';
import { Alert, Box, CircularProgress, Container, Input, Button } from '@mui/joy';
import PageTemplate from '../../components/PageTemplate';
import { Link } from 'react-router-dom';
import './Signup.css';
import { registerApi } from '../../api/authApi';

const Signup: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [error, setError] = useState<string>('');
  const [processing, setProcessing] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle signup logic here
    try {
      setProcessing(true);
      const res = await registerApi({'email': formData.email, 'password': formData.password});
      
      if(!res.ok) {
        setError(String(res.error));
      }

      console.log(res);

    } catch (error) {
      setError(String(error));
    }

    setProcessing(false);
    setFormData(_ => ({
      email: '',
      confirmPassword: '',
      password: ''
    }));
    console.log('Signup attempt with:', formData);
  };

  return (
    <PageTemplate>
      <Container maxWidth="lg">
        <Box className="signup-container">
          <form className="signup-form" onSubmit={handleSubmit}>
            <h2 className="signup-title">Create an Account</h2>
            {error.length > 0 && <Alert color="danger">{error}</Alert>}
            <div className="form-group">
              <label htmlFor="email" className="form-label">Email</label>
              <Input
                type="email"
                id="email"
                name="email"
                className="form-input"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">Password</label>
              <Input
                type="password"
                id="password"
                name="password"
                className="form-input"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
              <Input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                className="form-input"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>

            {
              processing && <div className='circular-progress'><CircularProgress variant="soft" /></div>
            }

            <Button type="submit" className="signup-button">
              Sign Up
            </Button>

            <div className="login-link">
              Already have an account? <Link to="/login">Login</Link>
            </div>
          </form>
        </Box>
      </Container>
    </PageTemplate>
  );
};

export default Signup; 