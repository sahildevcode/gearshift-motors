import React, { useState, useEffect } from 'react';
import { Wrench, Phone, Shield, Sparkles, Menu, X, Globe, AlertTriangle, Car, Clock } from 'lucide-react';

export default function Navbar({ currentLanguage, onToggleLanguage, onOpenSOS }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#hero', label: 'Home', labelHi: 'होम' },
    { href: '#brand-estimator', label: 'Brand & Price', labelHi: 'ब्रांड रेट कैलकुलेटर' },
    { href: '#services', label: 'Services', labelHi: 'हमारी सेवाएं' },
    { href: '#diagnostic-bay', label: '3D Diagnostics', labelHi: '3D डायग्नोस्टिक' },
    { href: '#reviews', label: 'Reviews', labelHi: 'समीक्षाएं' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* 1. Animated Top Announcement Ticker (User requested: "कुछ चलता रहे एनीमेशन टाइप का") */}
      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border-b border-orange-500/20 text-[11px] py-1.5 overflow-hidden select-none">
        <div className="animate-marquee whitespace-nowrap flex items-center gap-8 text-slate-300 font-mono">
          <span className="flex items-center gap-1.5 text-orange-400 font-bold">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
            LIVE 24/7 EMERGENCY ROADSIDE RESCUE ACTIVE
          </span>
          <span>&bull;</span>
          <span className="text-emerald-400 font-semibold">
            🚗 FREE DOORSTEP PICK-UP & DROP ALL ACROSS CITY
          </span>
          <span>&bull;</span>
          <span className="text-cyan-400">
            ⏱️ 90-MIN EXPRESS PERIODIC SERVICE GUARANTEE
          </span>
          <span>&bull;</span>
          <span className="text-amber-400">
            🛡️ 100% GENUINE OEM SPARE PARTS WITH 6 MONTH WARRANTY
          </span>
          <span>&bull;</span>
          <span className="text-white">
            📞 HELPLINE: <strong>+91 98765 43210</strong>
          </span>
          <span>&bull;</span>
          <span className="text-orange-400 font-bold">
            🏆 4.9★ RATED BY 3,400+ VERIFIED CAR OWNERS
          </span>
        </div>
      </div>

      {/* 2. Main Glassmorphic Navbar */}
      <nav
        className={`px-4 md:px-8 transition-all duration-300 ${
          isScrolled
            ? 'py-3 bg-slate-950/90 backdrop-blur-xl border-b border-slate-800 shadow-2xl shadow-orange-950/10'
            : 'py-4 bg-slate-950/60 backdrop-blur-md'
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Logo with Animated Gear / Emblem */}
          <a href="#hero" className="flex items-center gap-2.5 group">
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-tr from-orange-600 via-amber-500 to-yellow-400 flex items-center justify-center shadow-lg shadow-orange-600/30 group-hover:scale-105 transition-transform">
              <Wrench className="w-5 h-5 text-slate-950 group-hover:rotate-45 transition-transform duration-500" />
              {/* Glowing Ping Radar inside logo */}
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
              </span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-lg font-black tracking-tight text-white group-hover:text-orange-400 transition-colors">
                  APEX
                </span>
                <span className="text-lg font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300">
                  AUTOCRAFT
                </span>
              </div>
              <span className="text-[10px] font-mono tracking-widest text-slate-400 block -mt-1 uppercase">
                Precision Workshop & 3D Lab
              </span>
            </div>
          </a>

          {/* Animated Blinking Workshop Status (User requested: "उसमें थोड़ा कुछ ना कुछ ब्लिंक होता रहे") */}
          <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-600/40 text-[11px] font-mono text-emerald-300">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-80"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="font-semibold">
              {currentLanguage === 'hi' ? 'वर्कशॉप खुली है • 2 बे खाली हैं' : 'WORKSHOP OPEN • 2 SERVICE BAYS READY'}
            </span>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-xs font-semibold text-slate-300 hover:text-orange-400 transition-colors relative py-1 group"
              >
                {currentLanguage === 'hi' ? link.labelHi : link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-500 to-amber-400 group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </div>

          {/* Right Action Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {/* Language Switcher */}
            <button
              onClick={onToggleLanguage}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700/80 text-xs font-semibold text-slate-300 hover:text-white hover:border-slate-500 transition-all cursor-pointer"
              title="Change Language"
            >
              <Globe className="w-3.5 h-3.5 text-orange-400" />
              <span>{currentLanguage === 'hi' ? 'English' : 'हिन्दी'}</span>
            </button>

            {/* Pulsing Emergency SOS Button */}
            <button
              onClick={onOpenSOS}
              className="relative flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 text-white text-xs font-black shadow-lg shadow-red-600/30 hover:scale-105 transition-all cursor-pointer animate-pulse-glow"
            >
              <AlertTriangle className="w-3.5 h-3.5 animate-bounce" />
              <span>{currentLanguage === 'hi' ? '24/7 SOS' : '24/7 SOS'}</span>
            </button>

            {/* Book Appointment CTA */}
            <a
              href="#booking-section"
              className="py-2 px-4 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-md shadow-orange-500/20 hover:scale-105 transition-all"
            >
              {currentLanguage === 'hi' ? 'स्लॉट बुक करें' : 'Book Appointment'}
            </a>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={onToggleLanguage}
              className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-700 text-xs text-orange-400 font-bold"
            >
              {currentLanguage === 'hi' ? 'EN' : 'हिं'}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 pt-3 border-t border-slate-800/80 space-y-3 pb-3 bg-slate-950/95 rounded-2xl p-4">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-950/60 border border-emerald-600/40 text-xs font-mono text-emerald-300 mb-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-80"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>{currentLanguage === 'hi' ? 'वर्कशॉप खुली है' : 'WORKSHOP OPEN'}</span>
            </div>

            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-xl text-sm font-semibold text-slate-300 hover:bg-slate-900 hover:text-orange-400"
              >
                {currentLanguage === 'hi' ? link.labelHi : link.label}
              </a>
            ))}

            <div className="pt-2 grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onOpenSOS) onOpenSOS();
                }}
                className="py-2.5 px-3 rounded-xl bg-red-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-red-600/30"
              >
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>24/7 SOS Rescue</span>
              </button>

              <a
                href="#booking-section"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2.5 px-3 rounded-xl bg-orange-500 text-slate-950 font-bold text-xs flex items-center justify-center uppercase"
              >
                Book Slot
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
