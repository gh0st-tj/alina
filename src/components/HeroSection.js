"use client";

import React, { useEffect } from 'react';
import pageContent from '../content/pageContent';
import pageContentHe from '../content/pageContentHe';
import { FaHeart } from 'react-icons/fa';
import { useLanguage } from '../context/LanguageContext';
import useScrollAnimation from '../hooks/useScrollAnimation';

const HeroSection = () => {
  const { language, dir } = useLanguage();
  const content = language === 'en' ? pageContent : pageContentHe;
  const { headline, subheadline, cta } = content.hero;
  
  const headlineRef = useScrollAnimation('fade-in-animation', 0.1);
  const subheadlineRef = useScrollAnimation('fade-in-animation', 0.2);
  const buttonRef = useScrollAnimation('fade-in-animation', 0.3);

  const scrollToNextSection = () => {
    const nextSection = document.querySelector('.snap-section:nth-child(2)');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    // Trigger animations on initial load for the hero section
    setTimeout(() => {
      if (headlineRef.current) headlineRef.current.classList.add('fade-in-animation');
      if (subheadlineRef.current) subheadlineRef.current.classList.add('fade-in-animation');
      if (buttonRef.current) buttonRef.current.classList.add('fade-in-animation');
    }, 300);
  }, []);

  return (
    <section className="relative h-screen flex items-center justify-center bg-gradient-to-r from-primary/10 to-secondary/10">
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute inset-0 bg-[url('/images/hero-bg.jpg')] bg-cover bg-center"></div>
        <div className="absolute inset-0 bg-dark/40"></div>
      </div>
      
      <div className="container-custom relative z-10 text-center" dir={dir}>
        <div className="inline-block mb-4">
          <FaHeart className="text-primary text-4xl mx-auto animate-pulse" />
        </div>
        
        <h1 ref={headlineRef} className="heading-xl mb-6 text-dark opacity-0 transition-all duration-1000 ease-out">
          {headline}
        </h1>
        
        <p ref={subheadlineRef} className="text-xl md:text-2xl max-w-2xl mx-auto mb-10 text-dark/80 opacity-0 transition-all duration-1000 ease-out delay-300">
          {subheadline}
        </p>
        
        <button 
          ref={buttonRef} 
          className="btn-primary text-lg opacity-0 transition-all duration-1000 ease-out delay-500" 
          onClick={scrollToNextSection}
        >
          {cta}
        </button>
        
        <div className="mt-6 animate-bounce">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-8 w-8 text-primary cursor-pointer mx-auto" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
            onClick={scrollToNextSection}
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default HeroSection; 