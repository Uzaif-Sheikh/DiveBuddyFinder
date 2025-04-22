import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Typography, Box, Container, Button, Input, FormLabel } from '@mui/joy';
import PageTemplate from '../../components/PageTemplate';
import './ResetPassword.css';

const ResetPassword: React.FC = () => {
  const { token } = useParams<{ token: string }>();

  const navigate = useNavigate();
  const [passwords, setPasswords] = useState({
    password: '',
    confirmPassword: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({
    password: '',
    confirmPassword: ''
  });

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswords(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear errors as user types
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validatePasswords = () => {
    const newErrors = {
      password: '',
      confirmPassword: ''
    };
    
    if (!passwords.password) {
      newErrors.password = 'Password is required';
    } else if (passwords.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long';
    }
    
    if (!passwords.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (passwords.password !== passwords.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return !newErrors.password && !newErrors.confirmPassword;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validatePasswords()) {
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call for password reset
    setTimeout(() => {
      setIsSubmitting(false);
      // Redirect to login page after successful password reset
      navigate('/login');
    }, 1500);
  };

  // Show error if no token provided
  if (!token) {
    return (
      <PageTemplate>
        <Container maxWidth="sm">
          <Box className="reset-password-container">
            <Typography level="h3" className="reset-password-title">
              Invalid Reset Link
            </Typography>
            <Typography className="error-message">
              This password reset link is invalid or has expired. Please request a new password reset link.
            </Typography>
            <Button 
              onClick={() => navigate('/forgot-password')}
              size="lg"
              className="back-button"
            >
              Back to Forgot Password
            </Button>
          </Box>
        </Container>
      </PageTemplate>
    );
  }

  return (
    <PageTemplate>
      <Container maxWidth="sm">
        <Box className="reset-password-container">
          <Typography level="h3" className="reset-password-title">
            Reset Your Password
          </Typography>
          
          <Typography className="reset-password-subtitle">
            Please create a new password for your account
          </Typography>
          
          <form onSubmit={handleSubmit} className="reset-password-form">
            <Box className="form-group">
              <FormLabel>New Password</FormLabel>
              <Input
                type="password"
                name="password"
                value={passwords.password}
                onChange={handlePasswordChange}
                size="lg"
                error={!!errors.password}
              />
              {errors.password && (
                <Typography className="field-error">
                  {errors.password}
                </Typography>
              )}
            </Box>
            
            <Box className="form-group">
              <FormLabel>Confirm Password</FormLabel>
              <Input
                type="password"
                name="confirmPassword"
                value={passwords.confirmPassword}
                onChange={handlePasswordChange}
                size="lg"
                error={!!errors.confirmPassword}
              />
              {errors.confirmPassword && (
                <Typography className="field-error">
                  {errors.confirmPassword}
                </Typography>
              )}
            </Box>
            
            <Box className="password-requirements">
              <Typography className="requirements-title">
                Password must:
              </Typography>
              <ul className="requirements-list">
                <li>Be at least 8 characters long</li>
                <li>Include at least one uppercase letter</li>
                <li>Include at least one number</li>
                <li>Include at least one special character</li>
              </ul>
            </Box>
            
            <Button 
              type="submit" 
              size="lg" 
              className="submit-button"
              loading={isSubmitting}
              disabled={isSubmitting}
            >
              Reset Password
            </Button>
          </form>
        </Box>
      </Container>
    </PageTemplate>
  );
};

export default ResetPassword; 