"use client";

import React from 'react';
import Image from 'next/image';
import pageContent from '../content/pageContent';
import pageContentHe from '../content/pageContentHe';
import { FaCalendarAlt, FaMapMarkerAlt, FaHome } from 'react-icons/fa';
import { useLanguage } from '../context/LanguageContext';
import useScrollAnimation from '../hooks/useScrollAnimation';

const MemoriesSection = () => {
  const { language, dir } = useLanguage();
  const content = language === 'en' ? pageContent : pageContentHe;
  const { title, description, items } = content.memories;
  
  const titleRef = useScrollAnimation('fade-in-animation');
  const descriptionRef = useScrollAnimation('fade-in-animation', 0.3);
  
  const icons = [
    <FaCalendarAlt key="calendar" className="text-primary text-3xl mb-4" />,
    <FaMapMarkerAlt key="map" className="text-primary text-3xl mb-4" />,
    <FaHome key="home" className="text-primary text-3xl mb-4" />
  ];

  return (
    <section className="h-full flex items-center bg-white">
      <div className="container-custom py-4 md:py-8" dir={dir}>
        <div className="text-center mb-4 md:mb-10">
          <h2 
            ref={titleRef}
            className="heading-lg mb-2 md:mb-4 opacity-0 transition-all duration-1000 ease-out"
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
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 max-w-5xl mx-auto">
          {items.map((item, index) => {
            // Using a different animation threshold for each card to create a staggered effect
            const cardRef = useScrollAnimation('fade-in-animation', 0.2 + (index * 0.1));
            
            return (
              <div 
                key={index}
                ref={cardRef}
                className="bg-light p-4 md:p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-500 transform hover:-translate-y-1 opacity-0"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-full h-32 md:h-48 relative mb-4 md:mb-6 rounded-lg overflow-hidden">
                    <Image 
                      src={item.image} 
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  {icons[index]}
                  <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-3">{item.title}</h3>
                  <p className="text-sm md:text-base text-gray-600">{item.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default MemoriesSection; 