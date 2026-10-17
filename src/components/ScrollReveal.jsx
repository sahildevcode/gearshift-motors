import React, { useEffect, useRef, useState } from 'react';

/**
 * High-performance ScrollReveal component using IntersectionObserver
 * Adds smooth cinematic entrance animations when sections/elements scroll into viewport
 */
export default function ScrollReveal({
  children,
  animation = 'fade-up', // 'fade-up', 'fade-in', 'slide-left', 'slide-right', 'scale-up', 'stagger'
  delay = 0,
  duration = 800,
  threshold = 0.12,
  className = '',
  once = true
}) {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once && domRef.current) {
            observer.unobserve(domRef.current);
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin: '0px 0px -50px 0px' // Triggers slightly before element enters
      }
    );

    const currentEl = domRef.current;
    if (currentEl) {
      observer.observe(currentEl);
    }

    return () => {
      if (currentEl) observer.unobserve(currentEl);
    };
  }, [threshold, once]);

  // CSS classes mapped based on animation state
  const getAnimationStyles = () => {
    const baseTransition = `transition-all duration-[${duration}ms] ease-[cubic-bezier(0.16,1,0.3,1)]`;
    
    if (!isVisible) {
      switch (animation) {
        case 'fade-up':
          return 'opacity-0 translate-y-12';
        case 'slide-left':
          return 'opacity-0 -translate-x-12';
        case 'slide-right':
          return 'opacity-0 translate-x-12';
        case 'scale-up':
          return 'opacity-0 scale-95 translate-y-6';
        case 'fade-in':
          return 'opacity-0';
        default:
          return 'opacity-0 translate-y-10';
      }
    }

    // Visible state
    return 'opacity-100 translate-y-0 translate-x-0 scale-100';
  };

  return (
    <div
      ref={domRef}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
        transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)'
      }}
      className={`transition-all ${getAnimationStyles()} ${className}`}
    >
      {children}
    </div>
  );
}
