"use client";

import React from 'react';
import Link from 'next/link';
import { FaFacebook, FaInstagram, FaLinkedin, FaWhatsapp } from 'react-icons/fa';
import pageContent from '../content/pageContent';
import pageContentHe from '../content/pageContentHe';
import { useLanguage } from '../context/LanguageContext';

const Footer = () => {
  const { language, dir } = useLanguage();
  const content = language === 'en' ? pageContent : pageContentHe;
  const { links, copyright, socialMedia } = content.footer;

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark text-white pt-12 pb-6" dir={dir}>
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="text-2xl font-bold text-white mb-4 block">
              Alina Therapy
            </Link>
            <p className="text-white/70 mb-6 max-w-md">
              {content.footer.description}
            </p>
            <div className="flex space-x-4">
              {socialMedia.facebook && (
                <a 
                  href={socialMedia.facebook} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-white/10 hover:bg-primary p-3 rounded-full transition-colors"
                  aria-label="Facebook"
                >
                  <FaFacebook />
                </a>
              )}
              {socialMedia.instagram && (
                <a 
                  href={socialMedia.instagram} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-white/10 hover:bg-primary p-3 rounded-full transition-colors"
                  aria-label="Instagram"
                >
                  <FaInstagram />
                </a>
              )}
              {socialMedia.linkedin && (
                <a 
                  href={socialMedia.linkedin} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-white/10 hover:bg-primary p-3 rounded-full transition-colors"
                  aria-label="LinkedIn"
                >
                  <FaLinkedin />
                </a>
              )}
              {socialMedia.whatsapp && (
                <a 
                  href={`https://wa.me/${socialMedia.whatsapp}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-white/10 hover:bg-primary p-3 rounded-full transition-colors"
                  aria-label="WhatsApp"
                >
                  <FaWhatsapp />
                </a>
              )}
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">{links.quickLinks.title}</h3>
            <ul className="space-y-2">
              {links.quickLinks.items.map((link, index) => (
                <li key={index}>
                  <Link 
                    href={link.url} 
                    className="text-white/70 hover:text-primary transition-colors"
                  >
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">{links.contactLinks.title}</h3>
            <ul className="space-y-2">
              {links.contactLinks.items.map((link, index) => (
                <li key={index}>
                  <Link 
                    href={link.url} 
                    className="text-white/70 hover:text-primary transition-colors"
                  >
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-6 mt-6 text-center text-white/50">
          <p>
            {copyright.replace('{year}', currentYear)}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 