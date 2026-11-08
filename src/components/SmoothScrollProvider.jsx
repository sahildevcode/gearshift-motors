import React, { useEffect, useState, createContext, useContext } from 'react';
import Lenis from 'lenis';

const LenisContext = createContext(null);

export const useLenis = () => useContext(LenisContext);

export default function SmoothScrollProvider({ children, activePage = 'home' }) {
  const [lenisInstance, setLenisInstance] = useState(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    // 1. Initialize Lenis for smooth momentum scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
      infinite: false,
    });

    window.lenis = lenis;
    setLenisInstance(lenis);

    // RAF Loop
    let animId;
    function raf(time) {
      lenis.raf(time);
      animId = requestAnimationFrame(raf);
    }
    animId = requestAnimationFrame(raf);

    // Track Scroll Progress
    const handleScroll = (e) => {
      const scrollY = window.scrollY || e.scroll || 0;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? (scrollY / maxScroll) * 100 : 0;
      setScrollProgress(Math.min(100, Math.max(0, progress)));
    };

    lenis.on('scroll', handleScroll);

    // Intercept native anchor clicks to use Lenis smooth scrollTo
    const handleAnchorClick = (e) => {
      const target = e.target.closest('a');
      if (!target) return;
      const href = target.getAttribute('href');
      if (href && href.startsWith('#') && href.length > 1) {
        const el = document.querySelector(href);
        if (el) {
          e.preventDefault();
          lenis.scrollTo(el, { offset: -60, duration: 1.2 });
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);

    return () => {
      cancelAnimationFrame(animId);
      lenis.destroy();
      document.removeEventListener('click', handleAnchorClick);
      window.lenis = null;
    };
  }, [activePage]);

  return (
    <LenisContext.Provider value={lenisInstance}>
      {/* Top Subtle Scroll Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-[70] h-[3px] bg-black/60 pointer-events-none">
        <div
          className="h-full bg-gradient-to-r from-orange-600 via-amber-400 to-orange-500 transition-all duration-75 relative shadow-[0_0_12px_rgba(249,115,22,0.9)]"
          style={{ width: `${scrollProgress}%` }}
        >
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white shadow-[0_0_8px_#ffffff,0_0_15px_#f97316]" />
        </div>
      </div>

      {children}
    </LenisContext.Provider>
  );
}
