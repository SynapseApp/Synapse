import { Route, BrowserRouter, Routes, Navigate } from 'react-router-dom';
import AuthPage from './pages/Auth';
import RootPage from './pages/Root';
import Home from './pages/Home';
import { useEffect, useState } from 'react';

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await fetch('http://localhost:3000/auth/api/auth', { credentials: 'include' });
      const data = await response.json();
      setAuthenticated(data.authenticated);
      setAuthChecked(true); // Mark authentication check as complete
    } catch (error) {
      console.log(error);
      setAuthenticated(false);
      setAuthChecked(true); // Mark authentication check as complete
    }
  };

  // Render a loading state until authentication check is complete
  if (!authChecked) {
    return <div>Loading...</div>;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootPage />} />
        <Route path="/home" element={authenticated ? <Home /> : <Navigate to="/auth" />} />
        <Route path="/auth" element={<AuthPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
