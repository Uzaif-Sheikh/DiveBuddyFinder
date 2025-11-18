import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CssVarsProvider } from '@mui/joy/styles';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import DiverInfo from './pages/DiverInfo/DiverInfo';
import Welcome from './pages/Welcome/Welcome';
import VerifyCode from './pages/VerifyCode/VerifyCode';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword';
import ResetPassword from './pages/ResetPassword/ResetPassword';
import SearchDivers from './pages/SearchDivers/SearchDivers';
import ScrollTop from './components/ScrollTop/ScrollTop';

function App() {
  return (
    <CssVarsProvider>
      <Router>
        <ScrollTop>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/diver/:id" element={<DiverInfo />} />
            <Route path="/welcome/:id" element={<Welcome />} />
            <Route path="/verify-code" element={<VerifyCode />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
            <Route path="/search-divers" element={<SearchDivers />} />
          </Routes>
        </ScrollTop>
      </Router>
    </CssVarsProvider>
  );
}

export default App;
