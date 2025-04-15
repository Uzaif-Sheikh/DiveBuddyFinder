import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CssVarsProvider } from '@mui/joy/styles';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import DiverInfo from './pages/DiverInfo/DiverInfo';
import Welcome from './pages/Welcome/Welcome';

function App() {
  return (
    <CssVarsProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/diver/:id" element={<DiverInfo />} />
          <Route path="/welcome" element={<Welcome />} />
        </Routes>
      </Router>
    </CssVarsProvider>
  );
}

export default App;
