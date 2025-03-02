"use client";

import React from 'react';
import pageContent from '../content/pageContent';
import pageContentHe from '../content/pageContentHe';
import { FaCheck } from 'react-icons/fa';
import { useLanguage } from '../context/LanguageContext';
import useScrollAnimation from '../hooks/useScrollAnimation';

const ReasonsSection = () => {
  const { language, dir } = useLanguage();
  const content = language === 'en' ? pageContent : pageContentHe;
  const { title, description, points } = content.reasons;

  const titleRef = useScrollAnimation('fade-in-animation', 0.2);
  const descriptionRef = useScrollAnimation('fade-in-animation', 0.3);
  const cardRef = useScrollAnimation('scale-in-animation', 0.1);
  const heartIconRef = useScrollAnimation('fade-in-animation', 0.4);

  return (
    <section className="h-full flex items-center bg-gradient-to-b from-primary/5 to-secondary/5">
      <div className="container-custom py-8" dir={dir}>
        <div className="text-center mb-10">
          <h2 
            ref={titleRef}
            className="heading-lg mb-4 opacity-0 transition-all duration-1000 ease-out"
          >
            {title}
          </h2>
          <p 
            ref={descriptionRef}
            className="text-lg text-gray-600 max-w-2xl mx-auto opacity-0 transition-all duration-1000 ease-out delay-300"
          >
            {description}
          </p>
        </div>
        
        <div 
          ref={cardRef}
          className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8 opacity-0 transform scale-95 transition-all duration-1000 ease-out"
        >
          <ul className="space-y-4">
            {points.map((point, index) => {
              // Create a staggered animation effect for each list item
              const itemRef = useScrollAnimation('fade-in-animation', 0.15 + (index * 0.05));
              
              return (
                <li 
                  key={index} 
                  ref={itemRef}
                  className="flex items-start opacity-0 transition-all duration-500 ease-out"
                  style={{ transitionDelay: `${300 + (index * 150)}ms` }}
                >
                  <div className={`bg-primary rounded-full p-1 ${language === 'he' ? 'ml-4' : 'mr-4'} mt-1 flex-shrink-0`}>
                    <FaCheck className="text-white text-sm" />
                  </div>
                  <p className="text-lg">{point}</p>
                </li>
              );
            })}
          </ul>
          
          <div className="mt-8 text-center">
            <div 
              ref={heartIconRef}
              className="inline-block p-4 bg-primary/10 rounded-full opacity-0 transition-all duration-1000 ease-out delay-700"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-primary pulse-animation" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReasonsSection; 