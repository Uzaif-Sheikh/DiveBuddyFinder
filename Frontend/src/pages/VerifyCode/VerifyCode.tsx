import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Box, Container, Button, Input } from '@mui/joy';
import PageTemplate from '../../components/PageTemplate';
import './VerifyCode.css';

const VerifyCode: React.FC = () => {
  const navigate = useNavigate();
  const [verificationCode, setVerificationCode] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVerificationCode(e.target.value);
    if (error) setError('');
  };

  const handleResendCode = () => {
    // Logic to resend verification code
    alert('A new verification code has been sent to your email.');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!verificationCode.trim()) {
      setError('Please enter the verification code');
      return;
    }
    
    setIsSubmitting(true);
    setError('');
    
    // Simulate API call for verification
    setTimeout(() => {
      setIsSubmitting(false);
      
      // For demo purposes, any 6-digit code is considered valid
      if (/^\d{6}$/.test(verificationCode)) {
        // Redirect to welcome page on success
        navigate('/welcome');
      } else {
        setError('Invalid verification code. Please try again.');
      }
    }, 1500);
  };

  return (
    <PageTemplate>
      <Container maxWidth="lg">
        <Box className="verify-container">
          <Typography level="h3" className="verify-title">
            Verify Your Account
          </Typography>
          
          <Typography className="verify-subtitle">
            We've sent a 6-digit verification code to your email.
            Please enter it below to complete your registration.
          </Typography>
          
          <form onSubmit={handleSubmit} className="verify-form">
            <Box className="code-input-container">
              <Input
                value={verificationCode}
                onChange={handleCodeChange}
                placeholder="Enter 6-digit code"
                size="lg"
                className="code-input"
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
              className="verify-button"
              loading={isSubmitting}
              disabled={isSubmitting}
            >
              Verify
            </Button>
            
            <Box className="resend-container">
              <Typography>
                Didn't receive the code?
              </Typography>
              <Button 
                onClick={handleResendCode} 
                variant="plain" 
                size="sm"
                disabled={isSubmitting}
              >
                Resend Code
              </Button>
            </Box>
          </form>
        </Box>
      </Container>
    </PageTemplate>
  );
};

export default VerifyCode; 