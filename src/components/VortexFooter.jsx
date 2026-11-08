import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, Wrench, ShieldCheck, Phone, MapPin, Mail } from 'lucide-react';

export default function VortexFooter() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) setSubscribed(true);
  };

  return (
    <footer className="relative bg-[#050608] text-slate-400 border-t border-white/10 pt-16 pb-12 px-4 sm:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
        
        {/* Brand Col */}
        <div className="lg:col-span-4 space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center text-black">
              <Wrench className="w-4 h-4 stroke-[2.5]" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center text-xl font-extrabold tracking-wider text-white leading-none">
                <span>VORTEX</span>
                <span className="text-orange-500 ml-1">MOTORS</span>
              </div>
              <span className="text-[9px] tracking-widest text-slate-500 uppercase font-semibold mt-0.5">
                WORKSHOP & GENUINE SPARES
              </span>
            </div>
          </div>

          <p className="text-xs text-slate-400 leading-relaxed max-w-xs">
            Precision multi-brand automotive workshop & genuine spare parts store. Computerized diagnostics, 100% synthetic lubricants, and certified OEM warranties.
          </p>

          <div className="flex items-center gap-4 text-xs font-semibold text-slate-400 pt-1">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-orange-400 transition-colors">INSTAGRAM</a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-orange-400 transition-colors">YOUTUBE</a>
            <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors">WHATSAPP</a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="lg:col-span-2 text-xs space-y-2.5">
          <h4 className="text-white uppercase font-bold tracking-wider mb-3">WORKSHOP</h4>
          <div><a href="#budget-calculator" className="hover:text-orange-400 transition-colors">Budget Calculator</a></div>
          <div><a href="#booking-section" className="hover:text-orange-400 transition-colors">Book Appointment</a></div>
          <div><a href="#featured-parts" className="hover:text-orange-400 transition-colors">Featured Spares</a></div>
          <div><a href="#previous-work" className="hover:text-orange-400 transition-colors">Before & After Work</a></div>
        </div>

        {/* Services & Support */}
        <div className="lg:col-span-2 text-xs space-y-2.5">
          <h4 className="text-white uppercase font-bold tracking-wider mb-3">SERVICES</h4>
          <div><a href="#budget-calculator" className="hover:text-orange-400 transition-colors">Wheel Alignment</a></div>
          <div><a href="#budget-calculator" className="hover:text-orange-400 transition-colors">Synthetic Oil Flush</a></div>
          <div><a href="#budget-calculator" className="hover:text-orange-400 transition-colors">Ceramic Glazing</a></div>
          <div><a href="#budget-calculator" className="hover:text-orange-400 transition-colors">Brembo Brake Service</a></div>
          <div><a href="#contact" className="hover:text-orange-400 transition-colors">Contact & Support</a></div>
        </div>

        {/* Newsletter / Service Reminders */}
        <div className="lg:col-span-4 space-y-3 text-xs">
          <h4 className="text-white uppercase font-bold tracking-wider mb-1">SERVICE REMINDERS & DEALS</h4>
          <p className="text-xs text-slate-400">
            Subscribe to get periodic oil change reminders, monsoon safety checks, and special discounts on genuine spare parts.
          </p>

          {subscribed ? (
            <div className="p-3 rounded-xl bg-[#090b10] border border-emerald-500 text-emerald-400 flex items-center gap-2 text-xs">
              <CheckCircle2 className="w-4 h-4" />
              <span>Subscribed! Check your inbox for workshop discounts.</span>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex items-center gap-0 mt-3">
              <input
                type="email"
                required
                placeholder="ENTER EMAIL ADDRESS"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full py-3 px-3.5 bg-black border border-white/15 text-white text-xs focus:outline-none focus:border-orange-500 rounded-l-xl"
              />
              <button
                type="submit"
                className="py-3 px-5 bg-orange-500 hover:bg-orange-600 text-black font-extrabold text-xs transition-colors rounded-r-xl cursor-pointer"
              >
                <ArrowRight className="w-4 h-4 stroke-[3]" />
              </button>
            </form>
          )}
        </div>

      </div>

      {/* Legal Bar */}
      <div className="max-w-7xl mx-auto pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
        <div>&copy; {new Date().getFullYear()} Vortex Motors. Precision Automotive Care & Genuine Spares.</div>
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-1.5 text-slate-400">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>100% Verified Spares Guarantee</span>
          </span>
        </div>
      </div>
    </footer>
  );
}
