import React, { useState } from 'react';
import { Box, Container, Input, Button } from '@mui/joy';
import PageTemplate from '../../components/PageTemplate';
import { Link } from 'react-router-dom';
import './Login.css';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Login attempt with:', { email, password });
  };

  return (
    <PageTemplate>
      <Container maxWidth="lg">
        <Box className="login-container">
          <form className="login-form" onSubmit={handleSubmit}>
            <h2 className="login-title">Login to DiveBuddyFinder</h2>
            
            <div className="form-group">
              <label htmlFor="email" className="form-label">Email</label>
              <Input
                type="email"
                id="email"
                className="form-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">Password</label>
              <Input
                type="password"
                id="password"
                className="form-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <Button type="submit" className="login-button">
              Login
            </Button>

            <div className="signup-link">
              Don't have an account? <Link to="/signup">Sign up</Link>
            </div>
            <div className="signup-link">
              <Link to="/forgot-password">forgot password?</Link>
            </div>
          </form>
        </Box>
      </Container>
    </PageTemplate>
  );
};

export default Login; 