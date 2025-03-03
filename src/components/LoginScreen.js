"use client";

import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { FaLock } from 'react-icons/fa';

const LoginScreen = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = login(password);
    if (!success) {
      setError('Incorrect password');
      setPassword('');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-primary/10 to-secondary/10">
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute inset-0 bg-[url('/images/hero-bg.jpg')] bg-cover bg-center"></div>
        <div className="absolute inset-0 bg-dark/40"></div>
      </div>
      
      <div className="max-w-md w-full mx-4 bg-white rounded-lg shadow-lg p-8 relative z-10">
        <div className="text-center mb-8">
          <div className="inline-block p-3 bg-primary/20 rounded-full mb-4">
            <FaLock className="text-primary text-3xl" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome</h2>
          <p className="text-gray-600">Please enter the password to continue</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              autoFocus
            />
            {error && (
              <p className="mt-2 text-sm text-red-600">{error}</p>
            )}
          </div>
          
          <button
            type="submit"
            className="w-full bg-primary text-white py-3 px-4 rounded-lg hover:bg-primary/90 transition-colors duration-200"
          >
            Enter
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginScreen; 