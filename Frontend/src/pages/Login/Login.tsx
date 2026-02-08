import React, { use, useState } from 'react';
import { Alert, Box, CircularProgress, Container, Input, Button } from '@mui/joy';
import { useDispatch, useSelector } from 'react-redux';
import PageTemplate from '../../components/PageTemplate';
import { Link } from 'react-router-dom';
import './Login.css';
import { AppDispatch, RootState } from '../../store/store';
import { loginUserAsync } from '../../store/UserReducer';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const [processing, setProcessing] = useState(false);
	const navigate = useNavigate();
	const isverified = useSelector((state: RootState) => state.users.user?.isVerifed);

	const dispatch = useDispatch<AppDispatch>();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		// Handle login logic here
		setProcessing(true);
		try {

			const res = await dispatch(loginUserAsync({ email, password }));
			console.log("login Res:", isverified);
			if (res.payload && typeof res.payload === 'object' && 'isVerified' in res.payload) {
				if(isverified === false) {
					navigate('/verify-code');
				} else {
					navigate('/');
				}
			}
			
			if (res.payload && typeof res.payload === 'object' && 'error' in res.payload) {
				setError(res.payload.error as string);
			}
		} catch (error) {
			setError(String(error));
		}
		setProcessing(false);
		setEmail('');
		setPassword('');
	}



	return (
		<PageTemplate>
			<Container maxWidth="lg">
				<Box className="login-container">
					<form className="login-form" onSubmit={handleSubmit}>
						<h2 className="login-title">Login to DiveBuddyFinder</h2>
						{error.length > 0 && <Alert color="danger">{error}</Alert>}
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
						{
							processing && <div className='circular-progress'><CircularProgress variant="soft" /></div>
						}
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