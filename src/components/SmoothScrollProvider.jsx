import React, { useEffect, useState, createContext, useContext } from 'react';
import Lenis from 'lenis';

const LenisContext = createContext(null);

export const useLenis = () => useContext(LenisContext);

export default function SmoothScrollProvider({ children, activePage = 'home' }) {
  const [lenisInstance, setLenisInstance] = useState(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSector, setActiveSector] = useState('hero');

  const SECTORS = [
    { id: 'hero', num: '01', label: 'HERO' },
    { id: 'builds', num: '02', label: 'BUILDS' },
    { id: 'telemetry', num: '03', label: 'TELEMETRY' },
    { id: 'engineering', num: '04', label: 'V8 DYNO' },
    { id: 'aerodynamics', num: '05', label: 'AERO CFD' },
    { id: 'workshop', num: '06', label: 'WORKSHOP' },
    { id: 'reviews', num: '07', label: 'REVIEWS' },
    { id: 'brands-pricing', num: '08', label: 'BRANDS' },
    { id: 'inquiry', num: '09', label: 'CONTACT' },
  ];

  useEffect(() => {
    // 1. Initialize Lenis for buttery-smooth momentum scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential deceleration
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

    // 2. Track Scroll Progress & Active Sector
    const handleScroll = (e) => {
      const scrollY = window.scrollY || e.scroll || 0;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? (scrollY / maxScroll) * 100 : 0;
      setScrollProgress(Math.min(100, Math.max(0, progress)));

      // Determine active section on home page
      if (activePage === 'home') {
        const viewportMiddle = scrollY + window.innerHeight * 0.4;
        for (let i = SECTORS.length - 1; i >= 0; i--) {
          const el = document.getElementById(SECTORS[i].id);
          if (el) {
            const top = el.offsetTop;
            if (viewportMiddle >= top) {
              setActiveSector(SECTORS[i].id);
              break;
            }
          }
        }
      }
    };

    lenis.on('scroll', handleScroll);

    // 3. Intercept native anchor clicks to use Lenis smooth scrollTo
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

  const scrollToSector = (id) => {
    if (window.lenis) {
      const el = document.getElementById(id);
      if (el) {
        window.lenis.scrollTo(el, { offset: -60, duration: 1.2 });
      }
    }
  };

  return (
    <LenisContext.Provider value={lenisInstance}>
      {/* 1. Top Telemetry Motorsport Scroll Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-[70] h-[3px] bg-black/60 pointer-events-none">
        <div
          className="h-full bg-gradient-to-r from-orange-600 via-amber-400 to-orange-500 transition-all duration-75 relative shadow-[0_0_12px_rgba(249,115,22,0.9)]"
          style={{ width: `${scrollProgress}%` }}
        >
          {/* Glowing Head Point */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white shadow-[0_0_8px_#ffffff,0_0_15px_#f97316]" />
        </div>
      </div>

      {/* 2. Floating Right-Side HUD Sector Navigation (Visible on Large Screens for Home Page) */}
      {activePage === 'home' && (
        <aside className="fixed right-5 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col items-end gap-2.5 pointer-events-auto">
          {SECTORS.map((sector) => {
            const isActive = activeSector === sector.id;
            return (
              <button
                key={sector.id}
                onClick={() => scrollToSector(sector.id)}
                className="group flex items-center gap-2.5 py-1 px-1.5 rounded text-right transition-all cursor-pointer"
                title={`Jump to ${sector.label}`}
              >
                {/* Sector Name revealed on hover or when active */}
                <span
                  className={`font-mono-tech text-[9px] tracking-widest uppercase transition-all duration-300 ${
                    isActive
                      ? 'text-orange-400 opacity-100 font-bold translate-x-0'
                      : 'text-slate-400 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0'
                  }`}
                >
                  {sector.num} {sector.label}
                </span>

                {/* Tactical Indicator Dot */}
                <div
                  className={`relative flex items-center justify-center transition-all duration-300 ${
                    isActive ? 'w-4 h-4' : 'w-2 h-2 group-hover:w-3 group-hover:h-3'
                  }`}
                >
                  <div
                    className={`rounded-full transition-all duration-300 ${
                      isActive
                        ? 'w-2.5 h-2.5 bg-orange-500 shadow-[0_0_10px_#f97316]'
                        : 'w-1.5 h-1.5 bg-white/30 group-hover:bg-white group-hover:scale-125'
                    }`}
                  />
                  {isActive && (
                    <div className="absolute inset-0 rounded-full border border-orange-500/80 animate-ping pointer-events-none" />
                  )}
                </div>
              </button>
            );
          })}
        </aside>
      )}

      {children}
    </LenisContext.Provider>
  );
}
