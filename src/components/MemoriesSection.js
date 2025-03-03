"use client";

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import pageContent from '../content/pageContent';
import pageContentHe from '../content/pageContentHe';
import { FaCalendarAlt, FaMapMarkerAlt, FaHome, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useLanguage } from '../context/LanguageContext';
import useScrollAnimation from '../hooks/useScrollAnimation';

const MemoriesSection = () => {
  const { language, dir } = useLanguage();
  const content = language === 'en' ? pageContent : pageContentHe;
  const { title, description, items } = content.memories;
  
  const titleRef = useScrollAnimation('fade-in-animation');
  const descriptionRef = useScrollAnimation('fade-in-animation', 0.3);
  const sliderRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  
  // Check if we're on mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  const icons = [
    <FaCalendarAlt key="calendar" className="text-primary text-3xl mb-4" />,
    <FaMapMarkerAlt key="map" className="text-primary text-3xl mb-4" />,
    <FaHome key="home" className="text-primary text-3xl mb-4" />
  ];
  
  const scrollToSlide = (index) => {
    if (sliderRef.current) {
      const slideWidth = sliderRef.current.offsetWidth;
      // Adjust scroll position based on language direction
      if (language === 'he') {
        const totalWidth = slideWidth * (items.length - 1);
        sliderRef.current.scrollTo({
          left: totalWidth - (index * slideWidth),
          behavior: 'smooth'
        });
      } else {
        sliderRef.current.scrollTo({
          left: index * slideWidth,
          behavior: 'smooth'
        });
      }
      setCurrentSlide(index);
    }
  };
  
  const handleScroll = () => {
    if (sliderRef.current && isMobile) {
      const slideWidth = sliderRef.current.offsetWidth;
      const scrollPosition = sliderRef.current.scrollLeft;
      let newSlide;
      
      if (language === 'he') {
        const totalWidth = slideWidth * (items.length - 1);
        newSlide = Math.round((totalWidth - scrollPosition) / slideWidth);
      } else {
        newSlide = Math.round(scrollPosition / slideWidth);
      }
      
      // Ensure newSlide is within bounds
      newSlide = Math.max(0, Math.min(newSlide, items.length - 1));
      
      if (newSlide !== currentSlide) {
        setCurrentSlide(newSlide);
      }
    }
  };

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
        
        {/* Desktop view - Grid */}
        <div className="hidden md:grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {items.map((item, index) => {
            // Using a different animation threshold for each card to create a staggered effect
            const cardRef = useScrollAnimation('fade-in-animation', 0.2 + (index * 0.1));
            
            return (
              <div 
                key={index}
                ref={cardRef}
                className="bg-light p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-500 transform hover:-translate-y-1 opacity-0"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-full h-48 relative mb-6 rounded-lg overflow-hidden">
                    <Image 
                      src={item.image} 
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  {icons[index]}
                  <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Mobile view - Horizontal Slider */}
        <div className="md:hidden">
          <div 
            ref={sliderRef}
            className={`flex overflow-x-auto snap-x snap-mandatory scrollbar-hide ${language === 'he' ? 'flex-row-reverse' : ''}`}
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            onScroll={handleScroll}
          >
            {items.map((item, index) => (
              <div 
                key={index}
                className="flex-shrink-0 w-full snap-center px-4"
              >
                <div className="bg-light p-4 rounded-xl shadow-md">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-full h-40 relative mb-4 rounded-lg overflow-hidden">
                      <Image 
                        src={item.image} 
                        alt={item.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    {icons[index]}
                    <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                    <p className="text-sm text-gray-600">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Slider controls */}
          <div className="flex justify-center items-center mt-4 space-x-2">
            {items.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollToSlide(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  currentSlide === index ? 'bg-primary w-4' : 'bg-gray-300'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MemoriesSection; 