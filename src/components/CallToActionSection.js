"use client";

import React, { useState } from 'react';
import pageContent from '../content/pageContent';
import pageContentHe from '../content/pageContentHe';
import { FaEnvelope, FaWhatsapp } from 'react-icons/fa';
import { useLanguage } from '../context/LanguageContext';
import useScrollAnimation from '../hooks/useScrollAnimation';

const CallToActionSection = () => {
  const { language } = useLanguage();
  const content = language === 'he' ? pageContentHe : pageContent;
  const { title, description, buttonText, contactInfo, footer, popupMessage } = content.callToAction;
  
  const [showPopup, setShowPopup] = useState(false);

  const cardRef = useScrollAnimation('scale-in-animation', 0.2);
  const titleRef = useScrollAnimation('fade-in-animation', 0.3);
  const descriptionRef = useScrollAnimation('fade-in-animation', 0.35);
  const buttonRef = useScrollAnimation('fade-in-animation', 0.4);
  const contactTitleRef = useScrollAnimation('fade-in-animation', 0.3);
  const contactItemRef = useScrollAnimation('fade-in-animation', 0.4);
  const whatsappRef = useScrollAnimation('fade-in-animation', 0.5);
  const footerRef = useScrollAnimation('fade-in-animation', 0.6);

  const handleButtonClick = () => {
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
    }, 5000);
  };

  return (
    <section className="h-full flex items-center bg-gradient-to-b from-primary/10 to-primary/5">
      <div className="container-custom py-8">
        <div 
          ref={cardRef}
          className="max-w-4xl mx-auto bg-white rounded-xl shadow-xl overflow-hidden opacity-0 transform scale-95 transition-all duration-1000 ease-out relative"
        >
          {showPopup && (
            <div className="absolute inset-0 flex items-center justify-center z-10 bg-black/70">
              <div className="bg-white p-8 rounded-xl max-w-md m-4 transform transition-all duration-500 animate-fade-in-up">
                <h3 className="text-xl font-bold text-primary mb-3">{language === 'he' ? 'תודה' : 'Thank You'}</h3>
                <p className="text-gray-700">{popupMessage}</p>
                <button 
                  onClick={() => setShowPopup(false)}
                  className="mt-4 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
                >
                  {language === 'he' ? 'סגור' : 'Close'}
                </button>
              </div>
            </div>
          )}
          
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-1/2 bg-primary p-8 md:p-12 text-white flex flex-col justify-center">
              <h2 
                ref={titleRef}
                className="text-3xl font-bold mb-4 opacity-0 transition-all duration-1000 ease-out"
              >
                {title}
              </h2>
              <p 
                ref={descriptionRef}
                className="text-white/90 mb-6 opacity-0 transition-all duration-1000 ease-out delay-200"
              >
                {description}
              </p>
              <button 
                ref={buttonRef}
                onClick={handleButtonClick}
                className="bg-white text-primary font-medium py-3 px-6 rounded-lg hover:bg-white/90 transition-all inline-block w-full md:w-auto text-center opacity-0 transform translate-y-4 transition-all duration-1000 ease-out delay-400"
              >
                {buttonText}
              </button>
            </div>
            
            <div className="w-full md:w-1/2 p-8 md:p-12 bg-white flex flex-col justify-center">
              <h3 
                ref={contactTitleRef}
                className="text-2xl font-semibold mb-6 text-gray-800 opacity-0 transition-all duration-1000 ease-out"
              >
                {language === 'he' ? 'את יודעת איך למצוא אותי' : 'You know how to find me'}
              </h3>
              
              <div className="space-y-4">                
                <div 
                  ref={contactItemRef}
                  className="flex items-center opacity-0 transform translate-x-4 transition-all duration-1000 ease-out"
                >
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                    <FaEnvelope className="text-primary" />
                  </div>
                  <p className="text-gray-700">Email: tomsomech1@gmail.com</p>
                </div>
                
                <div 
                  ref={whatsappRef}
                  className="flex items-center opacity-0 transform translate-x-4 transition-all duration-1000 ease-out"
                >
                  <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center mr-4">
                    <FaWhatsapp className="text-green-500" />
                  </div>
                  <p className="text-gray-700">WhatsApp: +972 50-978-1166</p>
                </div>
              </div>
              
              <div 
                ref={footerRef}
                className="mt-8 text-center text-gray-500 text-sm opacity-0 transition-all duration-1000 ease-out delay-700"
              >
                <p>{language === 'he' ? (footer || 'באיזה אופן שתרצי לתקשר. ממש מחכה לשמוע ממך') : (footer || 'In whatever way you prefer to communicate. Really looking forward to hearing from you')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToActionSection; 