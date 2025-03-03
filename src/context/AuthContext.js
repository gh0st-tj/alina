"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [content, setContent] = useState(null);
  const [token, setToken] = useState(null);
  
  // Check if user was previously authenticated
  useEffect(() => {
    const savedToken = localStorage.getItem('authToken');
    if (savedToken) {
      setToken(savedToken);
      setIsAuthenticated(true);
      fetchContent(savedToken);
    }
  }, []);

  const fetchContent = async (authToken) => {
    try {
      const response = await fetch('/api/content', {
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      });
      
      const data = await response.json();
      if (data.success) {
        setContent(data.content);
      } else {
        // If token is invalid, log out
        logout();
      }
    } catch (error) {
      console.error('Error fetching content:', error);
      logout();
    }
  };

  const login = async (password) => {
    try {
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();
      
      if (data.success) {
        setToken(data.token);
        localStorage.setItem('authToken', data.token);
        setIsAuthenticated(true);
        await fetchContent(data.token);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setContent(null);
    setToken(null);
    localStorage.removeItem('authToken');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, content }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
} 