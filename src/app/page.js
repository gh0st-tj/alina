"use client";

import { useAuth } from '../context/AuthContext';
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
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <LoginScreen />;
  }

  return (
    <main className="snap-container">
      <section className="snap-section">
        <HeroSection />
      </section>
      
      <section className="snap-section">
        <PhotoSlider />
      </section>
      
      <section className="snap-section">
        <MemoriesSection />
      </section>
      
      <section className="snap-section">
        <ReflectionSection />
      </section>
      
      <section className="snap-section">
        <ReasonsSection />
      </section>
      
      <section className="snap-section">
        <ChangesSection />
      </section>
      
      <section className="snap-section">
        <PerseveranceSection />
      </section>
      
      <section className="snap-section">
        <FutureSection />
      </section>
      
      <section className="snap-section">
        <CallToActionSection />
      </section>
    </main>
  );
} 