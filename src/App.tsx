import React, { useState } from 'react';
import { Dashboard } from './components/Dashboard';
import { LoginPage } from './components/auth/LoginPage';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = (emailOrUsername: string, password: string) => {
    // Check for either email or username with the same password
    if ((emailOrUsername === 'simeon.matheka@creosolutions.tech' || emailOrUsername === 'projectpulse') 
        && password === 'Projectpulse2025!') {
      setIsAuthenticated(true);
    }
  };

  const handleSignOut = () => {
    setIsAuthenticated(false);
  };

  return isAuthenticated ? (
    <Dashboard onSignOut={handleSignOut} />
  ) : (
    <LoginPage onLogin={handleLogin} />
  );
}

export default App;