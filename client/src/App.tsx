import React, { useEffect, useState, ComponentType } from 'react';
import { useNavigate, BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthPage from './pages/Auth';
import RootPage from './pages/Root';
import Home from './pages/Home';

const withAuth = <P extends object>(WrappedComponent: ComponentType<P>): React.FC<P> => {
  const WithAuth: React.FC<P> = (props) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
      const checkAuthentication = async () => {
        try {
          const response = await fetch('http://localhost:3000/api/check-auth');
          const data = await response.json();
          console.log(data);

          if (data.isAuthenticated) {
            setIsAuthenticated(true);
          } else {
            navigate('/auth'); // Navigate to login page if not authenticated
          }
        } catch (error) {
          console.log('Error:', error);
        }

        setIsLoading(false);
      };

      checkAuthentication();
    }, [navigate]);

    if (isLoading) {
      return <div>Loading...</div>; // You can show a loading indicator while checking authentication
    }

    if (!isAuthenticated) {
      return null; // Return null to prevent rendering the wrapped component
    }

    return <WrappedComponent {...props} />;
  };

  return WithAuth;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootPage />} />
        <Route path="/home" element={<HomeWithAuth />} />
        <Route path="/auth" element={<AuthPage />} />
      </Routes>
    </BrowserRouter>
  );
}

const HomeWithAuth = withAuth(Home);

export default App;
