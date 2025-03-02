"use client";

import React from 'react';
import pageContent from '../content/pageContent';
import pageContentHe from '../content/pageContentHe';
import { FaRegLightbulb } from 'react-icons/fa';
import { useLanguage } from '../context/LanguageContext';
import useScrollAnimation from '../hooks/useScrollAnimation';

const FutureSection = () => {
  const { language } = useLanguage();
  const content = language === 'he' ? pageContentHe : pageContent;
  const { title, description, vision } = content.future;

  const iconRef = useScrollAnimation('fade-in-animation', 0.1);
  const titleRef = useScrollAnimation('fade-in-animation', 0.2);
  const descriptionRef = useScrollAnimation('fade-in-animation', 0.3);
  const cardRef = useScrollAnimation('scale-in-animation', 0.1);
  const dotsRef = useScrollAnimation('fade-in-animation', 0.4);

  return (
    <section className="h-full flex items-center bg-gradient-to-b from-secondary/10 to-light relative">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[url('/images/hero-bg.jpg')] bg-cover bg-center opacity-20"></div>
        <div className="absolute inset-0 bg-white/70"></div>
      </div>
      <div className="container-custom py-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <div 
              ref={iconRef}
              className="inline-block p-3 bg-secondary/20 rounded-full mb-4 opacity-0 transition-all duration-1000 ease-out"
            >
              <FaRegLightbulb className="text-secondary text-3xl pulse-animation" />
            </div>
            <h2 
              ref={titleRef}
              className="heading-lg mb-4 opacity-0 transition-all duration-1000 ease-out delay-200"
            >
              {title}
            </h2>
            <p 
              ref={descriptionRef}
              className="text-lg text-gray-600 max-w-2xl mx-auto mb-8 opacity-0 transition-all duration-1000 ease-out delay-400"
            >
              {description}
            </p>
          </div>
          
          <div 
            ref={cardRef}
            className="bg-white p-8 rounded-xl shadow-lg border-t-4 border-secondary relative opacity-0 transform scale-95 transition-all duration-1000 ease-out"
          >
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-secondary text-white rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            
            <p className="text-xl text-center italic text-gray-700 mt-4 transform transition-all duration-700 hover:scale-105">
              "{vision}"
            </p>
            
            <div 
              ref={dotsRef}
              className="mt-8 flex justify-center space-x-4 opacity-0 transition-all duration-1000 ease-out delay-700"
            >
              <div className="w-3 h-3 rounded-full bg-primary"></div>
              <div className="w-3 h-3 rounded-full bg-primary"></div>
              <div className="w-3 h-3 rounded-full bg-primary"></div>
              <div className="w-3 h-3 rounded-full bg-secondary"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FutureSection; 