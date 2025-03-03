"use client";

import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import LoginScreen from '../components/LoginScreen';
import HeroSection from '../components/HeroSection';
import PhotoSlider from '../components/PhotoSlider';
import MemoriesSection from '../components/MemoriesSection';
import ReflectionSection from '../components/ReflectionSection';
import ReasonsSection from '../components/ReasonsSection';
import ChangesSection from '../components/ChangesSection';
import PerseveranceSection from '../components/PerseveranceSection';
import FutureSection from '../components/FutureSection';
import CallToActionSection from '../components/CallToActionSection';

export default function Home() {
  const { isAuthenticated, content } = useAuth();
  const { language } = useLanguage();

  if (!isAuthenticated) {
    return <LoginScreen />;
  }

  // Show loading state while content is being fetched
  if (!content) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="snap-container">
      <section className="snap-section">
        <HeroSection content={content[language]} />
      </section>
      
      <section className="snap-section">
        <PhotoSlider content={content[language]} />
      </section>
      
      <section className="snap-section">
        <MemoriesSection content={content[language]} />
      </section>
      
      <section className="snap-section">
        <ReflectionSection content={content[language]} />
      </section>
      
      <section className="snap-section">
        <ReasonsSection content={content[language]} />
      </section>
      
      <section className="snap-section">
        <ChangesSection content={content[language]} />
      </section>
      
      <section className="snap-section">
        <PerseveranceSection content={content[language]} />
      </section>
      
      <section className="snap-section">
        <FutureSection content={content[language]} />
      </section>
      
      <section className="snap-section">
        <CallToActionSection content={content[language]} />
      </section>
    </main>
  );
} 