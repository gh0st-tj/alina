"use client";

import React, { createContext, useState, useContext, useEffect } from 'react';

// Create the language context
const LanguageContext = createContext();

// Create a provider component
export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('he');
  const [dir, setDir] = useState('ltr');

  // Toggle language function
  const toggleLanguage = () => {
    setLanguage(prevLang => prevLang === 'en' ? 'he' : 'en');
  };

  // Update direction based on language
  useEffect(() => {
    setDir(language === 'he' ? 'rtl' : 'ltr');
    document.documentElement.dir = language === 'he' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, dir }}>
      {children}
    </LanguageContext.Provider>
  );
}

// Custom hook to use the language context
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
} 