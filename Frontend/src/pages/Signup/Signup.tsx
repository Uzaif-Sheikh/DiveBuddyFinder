import React, { useState } from 'react';
import { Alert, Box, CircularProgress, Container, Input, Button } from '@mui/joy';
import PageTemplate from '../../components/PageTemplate';
import { Link, useNavigate } from 'react-router-dom';
import { resigterUserAsync } from '../../store/UserReducer';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import './Signup.css';

const Signup: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  const dispatch = useDispatch<AppDispatch>();
  const [error, setError] = useState<string>('');
  const [processing, setProcessing] = useState<boolean>(false);
  const navigator = useNavigate();

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
      const res = await dispatch(resigterUserAsync({ email: formData.email, password: formData.password }));

      if (res.payload && typeof res.payload === 'object' && ('isVerified' in res.payload)) {
        navigator('/verify-code');
      }
      if (res.payload && typeof res.payload === 'object' && 'error' in res.payload) {
        setError(res.payload.error as string);
      }

    } catch (error) {
      setError(String(error));
    }

    setProcessing(false);
    setFormData(_ => ({
      email: '',
      confirmPassword: '',
      password: ''
    }));
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

            <Button type="submit" className="signup-button" disabled={formData.password !== formData.confirmPassword}>
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