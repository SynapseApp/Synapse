import { Route, BrowserRouter, Routes, Navigate } from 'react-router-dom';
import AuthPage from './pages/Auth';
import RootPage from './pages/Root';
import Home from './pages/Home';
import { useEffect, useState } from 'react';
// import UserContext from './Contexts/userContext';

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);
  // const [user, setUser] = useState(null);

  useEffect(() => {
    checkAuth();
  }, []);

  /**
   * Check the user's authentication status by sending a request to the server.
   * If the user is authenticated, update the 'authenticated' state to true.
   * If there's an error or the user is not authenticated, update the 'authenticated' state to false.
   * Set 'authChecked' state to true to mark the authentication check as complete.
   */
  const checkAuth = async () => {
    try {
      const response = await fetch('http://localhost:3000/auth/check', {
        credentials: 'include',
      });
      const data = await response.json();
      // setUser(data.user);
      setAuthenticated(data.authenticated);
      setAuthChecked(true); // Mark authentication check as complete
    } catch (error) {
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
      {/* <UserContext.Provider value={user}> */}
      <Routes>
        <Route path="/" element={<RootPage />} />
        {/* Protected route: If authenticated, render the Home component. Otherwise, navigate to the Auth page */}
        <Route path="/home" element={authenticated ? <Home /> : <Navigate to="/auth" replace />} />
        <Route path="/auth" element={<AuthPage setAuthenticated={setAuthenticated} />} />
      </Routes>
      {/* </UserContext.Provider> */}
    </BrowserRouter>
  );
}

export default App;
