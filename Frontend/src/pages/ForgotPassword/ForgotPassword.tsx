import React, { useState } from 'react';
import { Typography, Box, Container, Button, Input } from '@mui/joy';
import PageTemplate from '../../components/PageTemplate';
import './ForgotPassword.css';

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (error) setError('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      setError('Please enter your email address');
      return;
    }
    
    // Simple email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }
    
    setIsSubmitting(true);
    setError('');
    
    // Simulate API call for sending reset link
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1500);
  };

  return (
    <PageTemplate>
      <Container maxWidth="sm">
        <Box className="forgot-password-container">
          <Typography level="h3" className="forgot-password-title">
            Forgot Password
          </Typography>
          
          {isSubmitted ? (
            <Box className="success-message">
              <Typography className="success-text">
                Password reset link has been sent to {email}
              </Typography>
              <Typography className="check-email-text">
                Please check your email inbox and follow the instructions to reset your password.
              </Typography>
              <Typography className="note-text">
                If you don't see the email, please check your spam folder.
              </Typography>
            </Box>
          ) : (
            <>
              <Typography className="forgot-password-subtitle">
                Enter your email address and we'll send you a link to reset your password.
              </Typography>
              
              <form onSubmit={handleSubmit} className="forgot-password-form">
                <Box className="email-input-container">
                  <Input
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                    placeholder="Enter your email address"
                    size="lg"
                    required
                    error={!!error}
                  />
                </Box>
                
                {error && (
                  <Typography className="error-message">
                    {error}
                  </Typography>
                )}
                
                <Button 
                  type="submit" 
                  size="lg" 
                  className="submit-button"
                  loading={isSubmitting}
                  disabled={isSubmitting}
                >
                  Send Reset Link
                </Button>
              </form>
            </>
          )}
        </Box>
      </Container>
    </PageTemplate>
  );
};

export default ForgotPassword; 