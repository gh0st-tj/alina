"use client";

import React from 'react';
import pageContent from '../content/pageContent';
import pageContentHe from '../content/pageContentHe';
import { FaRing, FaMapMarkedAlt, FaBalanceScale } from 'react-icons/fa';
import { useLanguage } from '../context/LanguageContext';
import useScrollAnimation from '../hooks/useScrollAnimation';

const ChangesSection = () => {
  const { language, dir } = useLanguage();
  const content = language === 'en' ? pageContent : pageContentHe;
  const { title, description, items } = content.changes;
  
  const titleRef = useScrollAnimation('fade-in-animation', 0.2);
  const descriptionRef = useScrollAnimation('fade-in-animation', 0.3);
  
  const icons = [
    <FaRing key="ring" className="text-white text-2xl" />,
    <FaMapMarkedAlt key="map" className="text-white text-2xl" />,
    <FaBalanceScale key="balance" className="text-white text-2xl" />
  ];

  return (
    <section className="h-full flex items-center bg-gradient-to-b from-dark to-dark/90 text-white">
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
            className="text-lg text-white/80 max-w-2xl mx-auto opacity-0 transition-all duration-1000 ease-out delay-300"
          >
            {description}
          </p>
        </div>
        
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {items.map((item, index) => {
              // Use different animation types for variety
              const animationType = index % 2 === 0 ? 'fade-in-animation' : 'scale-in-animation';
              // Staggered effect with varying thresholds
              const cardRef = useScrollAnimation(animationType, 0.2 + (index * 0.05));
              
              return (
                <div 
                  key={index} 
                  ref={cardRef}
                  className="relative overflow-hidden rounded-xl bg-white/10 backdrop-blur-sm p-6 border border-white/20 hover:bg-white/20 transition-all duration-500 opacity-0 transform translate-y-4"
                >
                  <div className={`absolute top-4 ${language === 'he' ? 'left-4' : 'right-4'} w-10 h-10 rounded-full bg-primary flex items-center justify-center`}>
                    {icons[index]}
                  </div>
                  
                  <div className="pt-6">
                    <h3 className="text-xl font-semibold mb-3 whitespace-pre-line">
                      {item.title}
                    </h3>
                    <p className="text-white/80">{item.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChangesSection; 