import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on mount (admin or regular user)
    const adminToken = localStorage.getItem('adminToken');
    const adminUsername = localStorage.getItem('adminUsername');
    const userToken = localStorage.getItem('userToken');
    const userData = localStorage.getItem('userData');
    
    if (adminToken && adminUsername) {
      setIsAuthenticated(true);
      setUser({ username: adminUsername, role: 'admin' });
    } else if (userToken && userData) {
      setIsAuthenticated(true);
      setUser(JSON.parse(userData));
    }
    setLoading(false);
  }, []);

  const login = (token, userData, isAdmin = false) => {
    if (isAdmin) {
      localStorage.setItem('adminToken', token);
      localStorage.setItem('adminUsername', userData.username);
      setUser({ ...userData, role: 'admin' });
    } else {
      localStorage.setItem('userToken', token);
      localStorage.setItem('userData', JSON.stringify(userData));
      setUser({ ...userData, role: 'user' });
    }
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUsername');
    localStorage.removeItem('userToken');
    localStorage.removeItem('userData');
    setIsAuthenticated(false);
    setUser(null);
  };

  const value = {
    isAuthenticated,
    user,
    login,
    logout,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

