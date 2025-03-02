"use client";

import React from 'react';
import pageContent from '../content/pageContent';
import pageContentHe from '../content/pageContentHe';
import { FaHeart } from 'react-icons/fa';
import { useLanguage } from '../context/LanguageContext';
import Image from 'next/image';
import useScrollAnimation from '../hooks/useScrollAnimation';

const PerseveranceSection = () => {
  const { language } = useLanguage();
  const content = language === 'he' ? pageContentHe : pageContent;
  const { title, description } = content.perseverance;
  
  const textRef = useScrollAnimation('fade-in-animation', 0.3);
  const imageRef = useScrollAnimation('scale-in-animation', 0.2);
  const heartsRef = useScrollAnimation('fade-in-animation', 0.4);

  return (
    <section className="min-h-screen flex items-center bg-gradient-to-b from-light to-secondary/10">
      <div className="container-custom py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-block p-3 bg-primary/20 rounded-full mb-4">
              <FaHeart className="text-primary w-8 h-8 pulse-animation" />
            </div>
            
            <div ref={textRef} className="opacity-0 transition-all duration-1000 ease-out transform translate-y-10">
              <h2 className="heading-lg mb-8 max-w-3xl mx-auto">{title}</h2>
            </div>
          </div>
          
          <div ref={imageRef} className="relative mx-auto w-full max-w-3xl h-96 rounded-xl overflow-hidden shadow-2xl opacity-0 transition-all duration-1000 ease-out">
            <Image
              src="/images/image10.jpg"
              alt="Our journey together"
              fill
              className="object-cover hover:scale-105 transition-transform duration-700"
            />
            
            {/* Decorative elements */}
            <div className="absolute top-4 left-4 w-16 h-16 border-l-4 border-t-4 border-white opacity-70"></div>
            <div className="absolute bottom-4 right-4 w-16 h-16 border-r-4 border-b-4 border-white opacity-70"></div>
          </div>
          
          <div ref={heartsRef} className="mt-8 text-center opacity-0 transition-all duration-1000 ease-out delay-700">
            <div className="w-full max-w-sm mx-auto border-t border-primary/30 pt-4">
              <div className="flex justify-center space-x-6">
                <span className="inline-block w-2 h-2 bg-primary rounded-full animate-ping"></span>
                <span className="inline-block w-2 h-2 bg-secondary rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></span>
                <span className="inline-block w-2 h-2 bg-primary rounded-full animate-ping" style={{ animationDelay: '1s' }}></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PerseveranceSection;