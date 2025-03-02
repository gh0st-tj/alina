"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useLanguage } from '../context/LanguageContext';
import pageContent from '../content/pageContent';
import pageContentHe from '../content/pageContentHe';
import useScrollAnimation from '../hooks/useScrollAnimation';

const PhotoSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { language, dir } = useLanguage();
  
  const titleRef = useScrollAnimation('fade-in-animation');
  const sliderRef = useScrollAnimation('scale-in-animation');
  const dotsRef = useScrollAnimation('fade-in-animation', 0.3);
  
  const images = [
    '/images/image6.jpg',
    '/images/photo1.jpg',
    '/images/photo2.jpg',
    '/images/photo3.jpg',
    '/images/photo4.jpg',
    '/images/photo5.jpg',
  ];

  // Auto-rotate images every 8 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const isLastSlide = currentIndex === images.length - 1;
      const newIndex = isLastSlide ? 0 : currentIndex + 1;
      setCurrentIndex(newIndex);
    }, 8000);
    
    // Clear the interval when component unmounts or when currentIndex changes
    return () => clearInterval(interval);
  }, [currentIndex, images.length]);

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === images.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  // Get the title based on language
  const title = language === 'en' 
    ? "Small Moments from a Big Story" 
    : "רגעים קטנים מסיפור גדול";

  return (
    <section className="h-full flex flex-col justify-center bg-light">
      <div className="container-custom py-8">
        <h2 
          ref={titleRef} 
          className="text-3xl md:text-4xl font-bold text-center mb-8 opacity-0 transition-all duration-1000 ease-out" 
          dir={dir}
        >
          {title}
        </h2>
        
        <div className="max-w-4xl mx-auto relative">
          {/* Main Slider */}
          <div 
            ref={sliderRef} 
            className="h-[50vh] md:h-[60vh] w-full relative rounded-lg overflow-hidden shadow-lg opacity-0 transform scale-95 transition-all duration-1000 ease-out"
          >
            <img 
              src={images[currentIndex]} 
              alt={`Photo ${currentIndex + 1}`}
              className="w-full h-full object-cover transform transition-transform duration-700 ease-out"
            />
            
            {/* Left Arrow */}
            <div 
              className={`absolute top-1/2 ${language === 'he' ? 'right-4' : 'left-4'} -translate-y-1/2 bg-white/70 p-2 rounded-full cursor-pointer hover:bg-white/90 transition-all`}
              onClick={language === 'he' ? goToNext : goToPrevious}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </div>
            
            {/* Right Arrow */}
            <div 
              className={`absolute top-1/2 ${language === 'he' ? 'left-4' : 'right-4'} -translate-y-1/2 bg-white/70 p-2 rounded-full cursor-pointer hover:bg-white/90 transition-all`}
              onClick={language === 'he' ? goToPrevious : goToNext}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
          
          {/* Dots */}
          <div 
            ref={dotsRef} 
            className="flex justify-center mt-4 opacity-0 transition-all duration-1000 ease-out delay-300"
          >
            {images.map((_, slideIndex) => (
              <div
                key={slideIndex}
                onClick={() => goToSlide(slideIndex)}
                className={`w-3 h-3 rounded-full mx-1 cursor-pointer transition-all ${
                  currentIndex === slideIndex ? 'bg-primary' : 'bg-gray-300'
                }`}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PhotoSlider; 