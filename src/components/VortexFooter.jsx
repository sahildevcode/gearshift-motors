import React, { useState } from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export default function VortexFooter() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) setSubscribed(true);
  };

  return (
    <footer className="relative bg-black text-slate-400 border-t border-white/10 pt-16 pb-12 px-4 sm:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
        
        {/* Brand Col */}
        <div className="lg:col-span-4 space-y-4">
          <div className="flex flex-col">
            <div className="flex items-center font-syncopate text-2xl font-bold tracking-widest text-white leading-none">
              <span>VORTE</span>
              <span className="text-orange-500 font-black">X</span>
            </div>
            <span className="font-mono-tech text-[9px] tracking-[0.3em] text-slate-500 uppercase mt-0.5">
              PERFORMANCE
            </span>
          </div>
          <p className="font-space text-xs text-slate-400 leading-relaxed max-w-xs">
            Track-focused machines. Engineered without compromise. Built to win. Master garage and dyno facility.
          </p>
          <div className="flex items-center gap-4 text-xs font-mono-tech text-slate-500 pt-2">
            <a href="#" className="hover:text-orange-400 transition-colors">INSTAGRAM</a>
            <a href="#" className="hover:text-orange-400 transition-colors">YOUTUBE</a>
            <a href="#" className="hover:text-orange-400 transition-colors">TWITTER</a>
          </div>
        </div>

        {/* Explore Links */}
        <div className="lg:col-span-2 font-mono-tech text-xs space-y-2.5">
          <h4 className="text-white uppercase font-bold tracking-wider mb-3">EXPLORE</h4>
          <div><a href="#builds" className="hover:text-orange-400 transition-colors">Builds</a></div>
          <div><a href="#telemetry" className="hover:text-orange-400 transition-colors">Performance</a></div>
          <div><a href="#engineering" className="hover:text-orange-400 transition-colors">Engineering</a></div>
          <div><a href="#aerodynamics" className="hover:text-orange-400 transition-colors">Aerodynamics</a></div>
          <div><a href="#brands-pricing" className="hover:text-orange-400 transition-colors">Car Brands</a></div>
        </div>

        {/* Support Links */}
        <div className="lg:col-span-2 font-mono-tech text-xs space-y-2.5">
          <h4 className="text-white uppercase font-bold tracking-wider mb-3">SUPPORT</h4>
          <div><a href="#inquiry" className="hover:text-orange-400 transition-colors">FAQ</a></div>
          <div><a href="#inquiry" className="hover:text-orange-400 transition-colors">Warranty</a></div>
          <div><a href="#inquiry" className="hover:text-orange-400 transition-colors">Track Support</a></div>
          <div><a href="#engineering" className="hover:text-orange-400 transition-colors">Downloads</a></div>
          <div><a href="#inquiry" className="hover:text-orange-400 transition-colors">Contact</a></div>
        </div>

        {/* Join the Pit List (Exact from screenshot) */}
        <div className="lg:col-span-4 space-y-3 font-mono-tech text-xs">
          <h4 className="text-white uppercase font-bold tracking-wider mb-1">JOIN THE PIT LIST</h4>
          <p className="font-space text-xs text-slate-400">
            Get exclusive updates on builds, events, dyno days, and performance insights.
          </p>

          {subscribed ? (
            <div className="p-3 rounded bg-[#090b0e] border border-orange-500 text-orange-400 flex items-center gap-2 text-xs">
              <CheckCircle2 className="w-4 h-4" />
              <span>Welcome to the Vortex Pit Crew!</span>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex items-center gap-0 mt-3">
              <input
                type="email"
                required
                placeholder="EMAIL ADDRESS"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full py-3 px-3.5 bg-[#090b0e] border border-white/15 text-white text-xs font-mono-tech focus:outline-none focus:border-orange-500 rounded-l-sm"
              />
              <button
                type="submit"
                className="py-3 px-4 bg-orange-600 hover:bg-orange-500 text-black font-black text-xs transition-colors rounded-r-sm cursor-pointer"
              >
                <ArrowRight className="w-4 h-4 stroke-[3]" />
              </button>
            </form>
          )}
        </div>

      </div>

      {/* Legal Bar */}
      <div className="max-w-7xl mx-auto pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono-tech text-[10px] text-slate-600">
        <div>&copy; {new Date().getFullYear()} Vortex Performance. All rights reserved.</div>
        <div className="flex items-center gap-6">
          <a href="#" className="hover:text-slate-400">Privacy Policy</a>
          <a href="#" className="hover:text-slate-400">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}
