"use client";

import { useEffect, useRef } from 'react';

const useScrollAnimation = (animationClass = 'fade-in-animation', threshold = 0.2) => {
  const ref = useRef(null);
  
  useEffect(() => {
    const element = ref.current;
    
    if (!element) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add(animationClass);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold }
    );
    
    observer.observe(element);
    
    return () => {
      if (element) observer.unobserve(element);
    };
  }, [animationClass, threshold]);
  
  return ref;
};

export default useScrollAnimation;