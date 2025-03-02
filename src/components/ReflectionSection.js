"use client";

import React from 'react';
import pageContent from '../content/pageContent';
import pageContentHe from '../content/pageContentHe';
import { FaComments, FaListUl, FaHeart } from 'react-icons/fa';
import { useLanguage } from '../context/LanguageContext';
import useScrollAnimation from '../hooks/useScrollAnimation';

const ReflectionSection = () => {
  const { language, dir } = useLanguage();
  const content = language === 'en' ? pageContent : pageContentHe;
  const { title, description, points } = content.reflection;
  
  const titleRef = useScrollAnimation('fade-in-animation', 0.2);
  const descriptionRef = useScrollAnimation('fade-in-animation', 0.3);
  
  const icons = [
    <FaComments key="comments" className="text-secondary text-4xl mb-4" />,
    <FaListUl key="list" className="text-secondary text-4xl mb-4" />,
    <FaHeart key="heart" className="text-secondary text-4xl mb-4" />
  ];

  return (
    <section className="h-full flex items-center bg-gradient-to-b from-light to-white">
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
        
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {points.map((point, index) => {
              // Create a staggered animation effect with increasing delay
              const cardRef = useScrollAnimation('fade-in-animation', 0.2 + (index * 0.1));
              
              return (
                <div 
                  key={index} 
                  ref={cardRef}
                  className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-500 opacity-0 transform hover:-translate-y-1"
                >
                  <div className="flex flex-col items-center text-center">
                    {icons[index]}
                    <h3 className="text-xl font-semibold mb-3">{point.title}</h3>
                    <p className="text-gray-600">{point.description}</p>
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

export default ReflectionSection; 