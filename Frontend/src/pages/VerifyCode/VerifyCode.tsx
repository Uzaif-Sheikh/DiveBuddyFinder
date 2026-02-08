import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Box, Container, Button, Input } from '@mui/joy';
import PageTemplate from '../../components/PageTemplate';
import './VerifyCode.css';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { getVerificationCodeApi } from '../../api/authApi';

const VerifyCode: React.FC = () => {
  const navigate = useNavigate();
  const isVerifed = useSelector((state: RootState) => state.users.user?.isVerifed);
  const userEmail = useSelector((state: RootState) => state.users.user?.email);
  const accessToken = useSelector((state: RootState) => state.users.accessToken);

  if (isVerifed && isVerifed === true) {
    navigate('/');
    return null;
  }

  const [timeleft, setTimeLeft] = useState(60);
  const [verificationCode, setVerificationCode] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          return 60; // reset
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (timeleft === 60) {
      getVerificationCodeApi(userEmail || '', accessToken || '');
    }
  }, [timeleft]);

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVerificationCode(e.target.value);
    if (error) setError('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!verificationCode.trim()) {
      setError('Please enter the verification code');
      return;
    }

    
    setIsSubmitting(true);
    setError('');

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
              <Typography className="timer">
                {`Resend code in`}
                <span className='timerSec'>{` ${timeleft}s`}</span>
              </Typography>
            </Box>
          </form>
        </Box>
      </Container>
    </PageTemplate>
  );
};

export default VerifyCode; 