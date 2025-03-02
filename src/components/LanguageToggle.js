"use client";

import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const LanguageToggle = () => {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button 
      onClick={toggleLanguage}
      className="fixed top-4 right-4 z-50 bg-white/80 backdrop-blur-sm text-primary px-3 py-2 rounded-full shadow-md hover:bg-white transition-all duration-300 font-medium"
      aria-label={language === 'en' ? 'Switch to Hebrew' : 'Switch to English'}
    >
      {language === 'en' ? 'עברית' : 'English'}
    </button>
  );
};

export default LanguageToggle; 