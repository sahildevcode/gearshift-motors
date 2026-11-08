import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { ShoppingBag, ArrowRight, Menu, X, Wrench, ShieldCheck, Phone } from 'lucide-react';

export default function VortexNavbar({ activePage = 'home', onNavigate, onBookAppointmentClick }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { totalItemsCount, setIsCartOpen } = useCart();

  const navLinks = [
    { id: 'home', label: 'HOME', href: '#hero', type: 'home_anchor' },
    { id: 'budget', label: 'BUDGET CALCULATOR', href: '#budget-calculator', type: 'home_anchor' },
    { id: 'booking', label: 'BOOK APPOINTMENT', href: '#booking-section', type: 'home_anchor' },
    { id: 'parts', label: 'PARTS STORE', href: '#parts-store', type: 'page', page: 'parts' },
    { id: 'work', label: 'PREVIOUS WORK', href: '#previous-work', type: 'home_anchor' },
    { id: 'brands', label: 'CAR BRANDS', href: '#brands-pricing', type: 'page', page: 'brands' }
  ];

  const handleLinkClick = (e, link) => {
    if (link.type === 'page') {
      e.preventDefault();
      if (onNavigate) onNavigate(link.page);
    } else {
      if (activePage !== 'home') {
        e.preventDefault();
        if (onNavigate) onNavigate('home');
        setTimeout(() => {
          const el = document.querySelector(link.href);
          if (el) {
            if (window.lenis) {
              window.lenis.scrollTo(el, { offset: -70, duration: 1.0 });
            } else {
              el.scrollIntoView({ behavior: 'smooth' });
            }
          }
        }, 150);
      }
    }
    setMobileOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      <nav className="px-4 sm:px-8 lg:px-12 py-4 bg-black/85 backdrop-blur-md border-b border-white/10 transition-all">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Logo on Left */}
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2.5 text-left group cursor-pointer"
          >
            <div className="w-9 h-9 rounded-xl bg-orange-500 flex items-center justify-center text-black font-black text-lg shadow-lg shadow-orange-500/30 group-hover:scale-105 transition-transform">
              <Wrench className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center text-lg sm:text-xl font-extrabold tracking-wider text-white leading-none">
                <span>VORTEX</span>
                <span className="text-orange-500 ml-1">MOTORS</span>
              </div>
              <span className="text-[9px] tracking-widest text-slate-400 uppercase font-semibold mt-0.5">
                WORKSHOP & GENUINE SPARES
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-7 text-xs font-semibold tracking-wider">
            {navLinks.map((link) => {
              const isCurrent =
                (link.id === 'parts' && activePage === 'parts') ||
                (link.id === 'brands' && activePage === 'brands') ||
                (link.id === 'home' && activePage === 'home');

              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link)}
                  className={`py-1 cursor-pointer transition-colors uppercase ${
                    isCurrent
                      ? 'text-orange-400 font-bold'
                      : 'text-slate-300 hover:text-orange-400'
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </div>

          {/* Right Action Icons & Buttons */}
          <div className="flex items-center gap-3">
            
            {/* Parts Store Shortcut Pill (Desktop) */}
            <button
              onClick={() => onNavigate('parts')}
              className={`hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activePage === 'parts'
                  ? 'bg-orange-500 text-black shadow-md shadow-orange-500/20'
                  : 'bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10'
              }`}
            >
              <span>Parts Store</span>
              <span className="px-1.5 py-0.2 rounded text-[10px] bg-orange-500/20 text-orange-400 font-mono">
                35+
              </span>
            </button>

            {/* Cart Icon with Live Badge Counter */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-all cursor-pointer group"
              title="View Cart & Services"
            >
              <ShoppingBag className="w-5 h-5 group-hover:text-orange-400 transition-colors" />
              {totalItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-orange-500 text-black text-[11px] font-black flex items-center justify-center animate-bounce shadow-lg shadow-orange-500/50">
                  {totalItemsCount}
                </span>
              )}
            </button>

            {/* Direct Book Appointment CTA */}
            <button
              onClick={() => {
                if (onBookAppointmentClick) {
                  onBookAppointmentClick();
                } else {
                  if (activePage !== 'home') onNavigate('home');
                  setTimeout(() => {
                    const el = document.getElementById('booking-section');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }, 150);
                }
              }}
              className="hidden md:inline-flex items-center gap-2 py-2 px-4 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-black font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-orange-500/20 hover:scale-105 transition-all cursor-pointer"
            >
              <span>Book Appointment</span>
              <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white cursor-pointer"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

          </div>

        </div>

        {/* Mobile Dropdown Menu */}
        {mobileOpen && (
          <div className="lg:hidden pt-4 pb-3 border-t border-white/10 mt-3 space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link)}
                className="block py-2 px-3 rounded-lg text-sm font-semibold text-slate-200 hover:bg-white/5 hover:text-orange-400"
              >
                {link.label}
              </a>
            ))}

            <div className="pt-2 border-t border-white/5 flex gap-2">
              <button
                onClick={() => {
                  onNavigate('parts');
                  setMobileOpen(false);
                }}
                className="w-1/2 py-2.5 rounded-lg bg-white/10 text-white font-bold text-xs uppercase text-center"
              >
                Parts Store
              </button>
              <button
                onClick={() => {
                  if (activePage !== 'home') onNavigate('home');
                  setMobileOpen(false);
                  setTimeout(() => {
                    const el = document.getElementById('booking-section');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }, 150);
                }}
                className="w-1/2 py-2.5 rounded-lg bg-orange-500 text-black font-bold text-xs uppercase text-center"
              >
                Book Slot
              </button>
            </div>
          </div>
        )}

      </nav>
    </header>
  );
}
