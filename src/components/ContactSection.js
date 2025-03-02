"use client";

import React, { useState } from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import pageContent from '../content/pageContent';
import pageContentHe from '../content/pageContentHe';
import { useLanguage } from '../context/LanguageContext';

const ContactSection = () => {
  const { language, dir } = useLanguage();
  const content = language === 'en' ? pageContent : pageContentHe;
  const { title, description, form, contactInfo, submitButton, successMessage } = content.contact;
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
    setFormData({
      name: '',
      email: '',
      phone: '',
      message: ''
    });
    
    // Reset the success message after 5 seconds
    setTimeout(() => {
      setIsSubmitted(false);
    }, 5000);
  };

  return (
    <section id="contact" className="py-16 bg-light">
      <div className="container-custom" dir={dir}>
        <div className="text-center mb-12">
          <h2 className="heading-lg mb-4">{title}</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {description}
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            {isSubmitted ? (
              <div className="text-center py-8">
                <div className="text-primary text-5xl mb-4">✓</div>
                <h3 className="text-2xl font-bold mb-2">{successMessage.title}</h3>
                <p className="text-gray-600">{successMessage.description}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                    {form.name.label}
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder={form.name.placeholder}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  />
                </div>
                
                <div className="mb-6">
                  <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                    {form.email.label}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder={form.email.placeholder}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  />
                </div>
                
                <div className="mb-6">
                  <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">
                    {form.phone.label}
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder={form.phone.placeholder}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  />
                </div>
                
                <div className="mb-6">
                  <label htmlFor="message" className="block text-gray-700 font-medium mb-2">
                    {form.message.label}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="4"
                    placeholder={form.message.placeholder}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3 px-6 rounded-lg transition-colors"
                >
                  {submitButton}
                </button>
              </form>
            )}
          </div>
          
          {/* Contact Information */}
          <div className="bg-dark text-white rounded-xl shadow-lg p-8 flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-bold mb-6">{contactInfo.title}</h3>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-primary rounded-full p-3 mr-4">
                    <FaPhone className="text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold">{contactInfo.phone.title}</h4>
                    <p>{contactInfo.phone.value}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-primary rounded-full p-3 mr-4">
                    <FaEnvelope className="text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold">{contactInfo.email.title}</h4>
                    <p>{contactInfo.email.value}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-primary rounded-full p-3 mr-4">
                    <FaMapMarkerAlt className="text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold">{contactInfo.address.title}</h4>
                    <p>{contactInfo.address.value}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-8">
              <h4 className="font-bold mb-2">{contactInfo.hours.title}</h4>
              <p>{contactInfo.hours.value}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection; 