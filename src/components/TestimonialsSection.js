"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import pageContent from '../content/pageContent';
import pageContentHe from '../content/pageContentHe';
import { FaQuoteLeft, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useLanguage } from '../context/LanguageContext';

const TestimonialsSection = () => {
  const { language, dir } = useLanguage();
  const content = language === 'en' ? pageContent : pageContentHe;
  const { title, testimonials } = content.testimonials;
  
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrev = () => {
    setActiveIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setActiveIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <section className="bg-light py-16">
      <div className="container-custom" dir={dir}>
        <h2 className="heading-lg text-center mb-12">{title}</h2>
        
        <div className="relative max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8 md:p-12">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="w-32 h-32 relative rounded-full overflow-hidden border-4 border-primary flex-shrink-0">
                <Image 
                  src={testimonials[activeIndex].image || "/images/photo1.jpg"} 
                  alt={testimonials[activeIndex].name}
                  fill
                  className="object-cover"
                />
              </div>
              
              <div className="flex-1">
                <FaQuoteLeft className="text-primary text-3xl mb-4" />
                <p className="text-lg mb-6 italic text-gray-700">
                  {testimonials[activeIndex].quote}
                </p>
                <div>
                  <h4 className="font-bold text-xl">{testimonials[activeIndex].name}</h4>
                  <p className="text-gray-600">{testimonials[activeIndex].title}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center mt-8 gap-4">
            <button 
              onClick={handlePrev}
              className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center hover:bg-primary-dark transition-colors"
              aria-label={language === 'en' ? "Previous testimonial" : "עדות קודמת"}
            >
              <FaChevronLeft />
            </button>
            <button 
              onClick={handleNext}
              className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center hover:bg-primary-dark transition-colors"
              aria-label={language === 'en' ? "Next testimonial" : "עדות הבאה"}
            >
              <FaChevronRight />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection; 