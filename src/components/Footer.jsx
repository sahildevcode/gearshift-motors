import React from 'react';
import { Wrench, Phone, Mail, MapPin, Clock, ShieldCheck, Heart } from 'lucide-react';
import { CAR_BRANDS } from '../data/brandsData';

export default function Footer({ currentLanguage = 'en' }) {
  const INSURANCE_PARTNERS = [
    'HDFC ERGO',
    'ICICI Lombard',
    'Bajaj Allianz',
    'Tata AIG',
    'New India Assurance',
    'SBI General',
    'Reliance General',
    'Digit Insurance'
  ];

  return (
    <footer className="relative border-t border-slate-800 bg-slate-950 text-slate-400 pt-16 pb-12 px-4 md:px-8">
      {/* Background Accent */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
        
        {/* Brand Col */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-orange-600 to-amber-400 flex items-center justify-center text-slate-950 font-black shadow-lg">
              <Wrench className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xl font-black text-white tracking-tight">APEX AUTOCRAFT</span>
              <span className="text-[10px] font-mono tracking-widest text-slate-500 block uppercase -mt-1">
                Precision Workshop & 3D Lab
              </span>
            </div>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
            {currentLanguage === 'hi'
              ? 'आधुनिक तकनीक, ओरिजिनल स्पेयर पार्ट्स, और जर्मन पेंट बूथ के साथ भारत का सबसे भरोसेमंद मल्टी-ब्रांड कार रिपेयर सेंटर। 100% पारदर्शी दाम और समय पर डिलीवरी।'
              : 'Next-generation automotive workshop equipped with 3D laser wheel alignment, computerized OBD-II scanning, and dust-free German paint booth. 100% transparent pricing and genuine spares.'}
          </p>

          <div className="pt-2">
            <span className="text-[11px] font-mono uppercase text-slate-400 block mb-2">
              {currentLanguage === 'hi' ? 'कैशलेस इंश्योरेंस क्लेम पार्टनर:' : 'Cashless Insurance Claim Tie-ups:'}
            </span>
            <div className="flex flex-wrap gap-1.5">
              {INSURANCE_PARTNERS.map((partner, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-[10px] font-medium text-slate-300"
                >
                  {partner}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-xs font-mono uppercase tracking-wider text-white font-bold mb-4">
            {currentLanguage === 'hi' ? 'नेविगेशन' : 'Quick Links'}
          </h4>
          <ul className="space-y-2 text-xs">
            <li><a href="#hero" className="hover:text-orange-400 transition-colors">Home & 3D Model</a></li>
            <li><a href="#brand-estimator" className="hover:text-orange-400 transition-colors">Brand & Price Estimator</a></li>
            <li><a href="#services" className="hover:text-orange-400 transition-colors">Complete Services Catalog</a></li>
            <li><a href="#diagnostic-bay" className="hover:text-orange-400 transition-colors">3D Diagnostic Lab</a></li>
            <li><a href="#reviews" className="hover:text-orange-400 transition-colors">Customer Reviews & Bay Status</a></li>
            <li><a href="#booking-section" className="hover:text-orange-400 transition-colors">Online Booking & Doorstep Pick-up</a></li>
          </ul>
        </div>

        {/* Brands Supported */}
        <div>
          <h4 className="text-xs font-mono uppercase tracking-wider text-white font-bold mb-4">
            {currentLanguage === 'hi' ? 'सपोर्टेड कार ब्रांड्स' : 'Supported Brands'}
          </h4>
          <ul className="grid grid-cols-2 gap-1 text-xs">
            {CAR_BRANDS.map((b) => (
              <li key={b.id}>
                <a href="#brand-estimator" className="hover:text-orange-400 transition-colors block py-0.5">
                  {b.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Workshop Contact & Hours */}
        <div className="space-y-3">
          <h4 className="text-xs font-mono uppercase tracking-wider text-white font-bold mb-4">
            {currentLanguage === 'hi' ? 'संपर्क & समय' : 'Contact & Timings'}
          </h4>
          <div className="flex items-start gap-2.5 text-xs">
            <MapPin className="w-4 h-4 text-orange-400 flex-shrink-0 mt-0.5" />
            <span>Plot 42, Automotive Hub, Industrial Area Phase II (Near Metro Pillar 88)</span>
          </div>
          <div className="flex items-center gap-2.5 text-xs">
            <Phone className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <a href="tel:+919876543210" className="hover:text-emerald-400 font-mono font-bold text-white">
              +91 98765 43210
            </a>
          </div>
          <div className="flex items-center gap-2.5 text-xs">
            <Mail className="w-4 h-4 text-cyan-400 flex-shrink-0" />
            <span>service@apexautocraft.com</span>
          </div>
          <div className="flex items-start gap-2.5 text-xs pt-1 border-t border-slate-800">
            <Clock className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
            <div>
              <span className="text-white block font-semibold">Mon - Sun: 8:00 AM - 9:00 PM</span>
              <span className="text-[11px] text-red-400 font-mono">24/7 Roadside Rescue Always Active</span>
            </div>
          </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
        <div>
          &copy; {new Date().getFullYear()} Apex AutoCraft Precision Workshop. All rights reserved.
        </div>
        <div className="flex items-center gap-1">
          <span>Engineered with Precision & Passion</span>
        </div>
      </div>
    </footer>
  );
}
