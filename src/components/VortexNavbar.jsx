import React, { useState, useEffect } from 'react';
import { ArrowRight, Menu, X } from 'lucide-react';

export default function VortexNavbar({ activePage = 'home', onNavigate, onInquireClick }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  // Exact navigation sequence requested by the user
  const navLinks = [
    { id: 'home', label: 'HOME', href: '#hero' },
    { id: 'builds', label: 'BUILDS', href: '#builds' },
    { id: 'telemetry', label: 'PERFORMANCE', href: '#telemetry' },
    { id: 'engineering', label: 'ENGINEERING', href: '#engineering' },
    { id: 'aerodynamics', label: 'AERODYNAMICS', href: '#aerodynamics' },
    { id: 'brands', label: 'CAR BRANDS', href: '#brands-pricing', isPageRedirect: true },
    { id: 'inquiry', label: 'CONTACT', href: '#inquiry' },
  ];

  const handleLinkClick = (e, link) => {
    if (link.isPageRedirect) {
      e.preventDefault();
      if (onNavigate) onNavigate('brands');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      if (activePage !== 'home') {
        if (onNavigate) onNavigate('home');
      }
    }
    setMobileOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-500">
      {/* 
        Transparent Navbar with low default opacity on links:
        User requested: "नेविगेशन बार को ट्रांसपेरेंट रखो। जब माउस जाएगा उस पर तभी वो जो नेविगेशन बार की चीजें हैं वो हल्की सी ब्लिंक होगी। सिर्फ उनका मतलब ओपेसिटी कम रखना है। दिखेंगी पर हल्की दिखेंगी, क्लियर डार्क नहीं दिखेंगी।"
      */}
      <nav className="px-4 sm:px-8 lg:px-12 py-5 bg-transparent backdrop-blur-[3px] border-b border-white/[0.04] transition-all duration-500 hover:bg-black/40 hover:backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Logo with subdued default opacity that brightens on hover */}
          <a
            href="#hero"
            onClick={(e) => {
              if (activePage !== 'home') {
                e.preventDefault();
                if (onNavigate) onNavigate('home');
              }
            }}
            className="flex items-center gap-2 group opacity-75 hover:opacity-100 transition-opacity duration-300"
          >
            <div className="flex flex-col">
              <div className="flex items-center font-syncopate text-xl sm:text-2xl font-bold tracking-widest text-white leading-none">
                <span>VORTE</span>
                <span className="text-orange-500 font-black">X</span>
              </div>
              <span className="font-mono-tech text-[8px] sm:text-[9px] tracking-[0.28em] text-slate-400 uppercase -mt-0.5 opacity-60 group-hover:opacity-100 transition-opacity">
                PERFORMANCE
              </span>
            </div>
          </a>

          {/* 
            Desktop Navigation Links:
            Base opacity is kept LOW (opacity-40) - "दिखेंगी पर हल्की दिखेंगी, क्लियर डार्क नहीं दिखेंगी"
            On hover: opacity jumps to 100% with soft glow/blink transition!
          */}
          <div className="hidden lg:flex items-center gap-8 font-mono-tech text-xs tracking-widest">
            {navLinks.map((link) => {
              const isActive = (link.id === 'brands' && activePage === 'brands') || (link.id === 'home' && activePage === 'home');
              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link)}
                  className={`relative py-1 cursor-pointer transition-all duration-300 uppercase ${
                    isActive
                      ? 'text-orange-400 opacity-90 font-bold'
                      : 'text-slate-200 opacity-40 hover:opacity-100 hover:text-orange-400 hover:drop-shadow-[0_0_8px_rgba(249,115,22,0.6)]'
                  }`}
                >
                  <span>{link.label}</span>
                  {/* Subtle animated indicator on hover */}
                  <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-orange-500 hover:w-full transition-all duration-300" />
                </a>
              );
            })}
          </div>

          {/* Right Action: Subdued opacity Inquire button that brightens on hover */}
          <div className="hidden sm:flex items-center gap-4">
            <button
              onClick={() => {
                if (activePage !== 'home') {
                  if (onNavigate) onNavigate('home');
                  setTimeout(() => {
                    const el = document.getElementById('inquiry');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                } else {
                  const el = document.getElementById('inquiry');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }
                if (onInquireClick) onInquireClick();
              }}
              className="py-2 px-5 rounded-sm bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-400 text-black font-rajdhani font-black text-xs uppercase tracking-widest shadow-lg shadow-orange-600/20 opacity-75 hover:opacity-100 hover:scale-105 transition-all duration-300 cursor-pointer flex items-center gap-1.5"
            >
              <span>INQUIRE NOW</span>
              <ArrowRight className="w-3.5 h-3.5 stroke-[3]" />
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex lg:hidden items-center gap-3">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 rounded bg-white/5 border border-white/10 text-white opacity-70 hover:opacity-100"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Mobile Dropdown */}
        {mobileOpen && (
          <div className="lg:hidden mt-4 pt-4 border-t border-white/10 bg-black/95 rounded-xl p-4 space-y-3 font-mono-tech text-xs tracking-wider">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link)}
                className="block py-2 text-slate-300 opacity-60 hover:opacity-100 hover:text-orange-400"
              >
                {link.label}
              </a>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
}
