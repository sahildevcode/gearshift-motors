import React, { useState } from 'react';
import { Wrench, Shield, CheckCircle2, Clock, ArrowRight, Disc, Cpu, Zap, Settings, Award } from 'lucide-react';

export default function PromotorsShowcase({ currentLanguage = 'en', onGetStarted }) {
  const [activeEngineHotspot, setActiveEngineHotspot] = useState(null);
  const [activePart, setActivePart] = useState(null);

  const STATS = [
    { value: '8K+', label: 'VEHICLES REPAIRED', labelHi: 'सफल कार रिपेयरिंग', sub: 'Across 15+ years of master garage operations' },
    { value: '22+', label: 'CERTIFIED MASTER MECHANICS', labelHi: 'प्रमाणित मास्टर मैकेनिक', sub: 'Bosch & ASE certified precision technicians' },
    { value: '500+', label: 'OEM SPARE PARTS IN STOCK', labelHi: 'असली ओरिजिनल पार्ट्स', sub: 'Ready-to-fit spares with 6-month warranty' },
    { value: '99%', label: 'CUSTOMER SATISFACTION', labelHi: 'संतुष्ट कार मालिक', sub: 'Based on 3,400+ verified Google ratings' },
  ];

  const ENGINE_HOTSPOTS = [
    { id: 'engine-block', name: 'V8 Engine Block', nameHi: 'वी8 इंजन ब्लॉक', x: '50%', y: '56%', info: 'Ultrasonic clean, compression testing, and timing calibration' },
    { id: 'pulley', name: 'Serpentine Belt & Alternator', nameHi: 'बेल्ट & अल्टरनेटर', x: '42%', y: '48%', info: 'Tensioner inspection, zero squeal guarantee' },
    { id: 'suspension-l', name: 'Coil-over Strut (Left)', nameHi: 'लेफ्ट सस्पेंशन स्ट्रट', x: '25%', y: '52%', info: 'Gas-charged shock absorption & bush replacement' },
    { id: 'suspension-r', name: 'Coil-over Strut (Right)', nameHi: 'राइट सस्पेंशन स्ट्रट', x: '75%', y: '52%', info: 'Rigidity testing & anti-roll bar linkage' },
    { id: 'brakes', name: 'Ceramic Calipers', nameHi: 'सिरेमिक ब्रेक डिस्क', x: '18%', y: '68%', info: 'Zero brake judder, precision rotor skimming' },
  ];

  const RADIAL_PARTS = [
    { id: 'rotor', name: 'Ventilated Drilled Disc Rotor', nameHi: 'ड्रिल्ड ब्रेक रोटर', icon: Disc, angle: 0, tag: 'High-Temp Cast Iron' },
    { id: 'turbo', name: 'Twin-Scroll Turbocharger', nameHi: 'टर्बोचार्जर', icon: Zap, angle: 45, tag: 'Boost 1.8 Bar' },
    { id: 'piston', name: 'Forged Alloy Piston', nameHi: 'फोर्ज्ड पिस्टन', icon: Cpu, angle: 90, tag: 'Lightweight Alloy' },
    { id: 'suspension', name: 'Coilover Shock Strut', nameHi: 'शॉक एब्जॉर्बर', icon: Wrench, angle: 135, tag: 'Active Damping' },
    { id: 'filter', name: 'High-Flow Synthetic Filter', nameHi: 'ऑयल फिल्टर', icon: Shield, angle: 180, tag: '99.8% Filtration' },
    { id: 'spark', name: 'Iridium Spark Plug', nameHi: 'इरिडियम स्पार्क प्लग', icon: Zap, angle: 225, tag: 'Triple Ground' },
    { id: 'tools', name: 'Chrome Vanadium Tools', nameHi: 'मास्टर टूल्स', icon: Wrench, angle: 270, tag: 'Precision Torque' },
    { id: 'radiator', name: 'Cooling Radiator Assembly', nameHi: 'कूलिंग रेडिएटर', icon: Award, angle: 315, tag: 'Twin Core' },
  ];

  return (
    <div className="relative bg-[#090b0e] text-white overflow-hidden py-16 border-t border-b border-slate-900">
      
      {/* Background Tire Track Overlay Texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none carbon-pattern" />

      {/* ============================================================== */}
      {/* SECTION 1: AUTO MAINTENANCE & REPAIR SERVICE (Exposed Engine Car) */}
      {/* ============================================================== */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column (Text, CTA, Feature Checklist) */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-mono uppercase tracking-widest">
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-ping" />
              <span>{currentLanguage === 'hi' ? 'मास्टर वर्कशॉप & गैराज' : 'PROMOTORS WORKSHOP'}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white leading-[1.1]">
              {currentLanguage === 'hi' ? (
                <>
                  ऑटो मेंटेनेंस & <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-yellow-500">
                    रिपेयर सर्विस
                  </span>
                </>
              ) : (
                <>
                  AUTO MAINTENANCE <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-yellow-500">
                    & REPAIR SERVICE
                  </span>
                </>
              )}
            </h2>

            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-lg">
              {currentLanguage === 'hi'
                ? 'हम वाहन मालिकों को सभी प्रकार की गैराज और रिपेयरिंग सेवाएं प्रदान करते हैं। हमारे प्रमाणित तकनीशियन किसी भी कार समस्या का तुरंत समाधान करने में माहिर हैं।'
                : 'We offer a full range of precision garage services to vehicle owners. Our certified professionals know how to handle a wide range of car services. We guarantee that your vehicle will be performing at its peak.'}
            </p>

            {/* Orange CTA Button (Matching Reference Screenshot) */}
            <div className="pt-2">
              <button
                onClick={() => {
                  const el = document.getElementById('brand-estimator') || document.getElementById('booking-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                  if (onGetStarted) onGetStarted();
                }}
                className="py-3.5 px-8 rounded-xl bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 hover:from-orange-500 hover:to-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider shadow-xl shadow-orange-600/30 hover:scale-105 transition-all cursor-pointer flex items-center gap-2.5"
              >
                <span>{currentLanguage === 'hi' ? 'सर्विस बुक करें' : 'GET SERVICE'}</span>
                <ArrowRight className="w-4 h-4 stroke-[3]" />
              </button>
            </div>

            {/* 3 Value Pillars (from reference screenshot) */}
            <div className="grid grid-cols-3 gap-3 pt-6 border-t border-slate-800/80 text-[11px] font-mono text-slate-400">
              <div className="border-l-2 border-orange-500 pl-2">
                <span className="text-white font-bold block">{currentLanguage === 'hi' ? 'सुविधाजनक' : 'Convenient'}</span>
                <span>{currentLanguage === 'hi' ? 'पिक & ड्रॉप' : 'Doorstep Pick'}</span>
              </div>
              <div className="border-l-2 border-orange-500 pl-2">
                <span className="text-white font-bold block">{currentLanguage === 'hi' ? 'प्रमाणित' : 'Friendly &'}</span>
                <span>{currentLanguage === 'hi' ? 'मास्टर मैकेनिक' : 'Professional'}</span>
              </div>
              <div className="border-l-2 border-orange-500 pl-2">
                <span className="text-white font-bold block">{currentLanguage === 'hi' ? 'हर ब्रांड' : 'Foreign &'}</span>
                <span>{currentLanguage === 'hi' ? 'की विशेषज्ञता' : 'Domestic Spec'}</span>
              </div>
            </div>

          </div>

          {/* Right Column: Exposed Front Cutaway Car Visual */}
          <div className="lg:col-span-7 relative">
            <div className="relative w-full rounded-3xl bg-gradient-to-b from-slate-900/60 to-black/80 border border-slate-800/80 p-6 shadow-2xl overflow-hidden group">
              
              {/* Radial Glow underneath engine bay */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[300px] bg-orange-600/15 blur-[120px] pointer-events-none rounded-full" />

              {/* The Cutaway Car Visual */}
              <div className="relative w-full max-w-xl mx-auto flex items-center justify-center py-6 select-none">
                
                {/* SVG/Vector Detailed Cutaway Car Chassis */}
                <svg viewBox="0 0 800 520" className="w-full h-auto drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)]" fill="none">
                  <defs>
                    <linearGradient id="bodyDark" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#27272a" />
                      <stop offset="50%" stopColor="#18181b" />
                      <stop offset="100%" stopColor="#09090b" />
                    </linearGradient>
                    <linearGradient id="chromeMet" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#e4e4e7" />
                      <stop offset="50%" stopColor="#71717a" />
                      <stop offset="100%" stopColor="#3f3f46" />
                    </linearGradient>
                    <linearGradient id="orangeGlow" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#ea580c" />
                      <stop offset="100%" stopColor="#f97316" />
                    </linearGradient>
                    <filter id="glow">
                      <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                      <feMerge>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                      </feMerge>
                    </filter>
                  </defs>

                  {/* Car Outer Upper Silhouette & Windshield */}
                  <path d="M140 180 Q400 90 660 180 L720 280 Q760 300 780 340 L760 440 L690 450 L680 380 L650 380 L650 450 L150 450 L150 380 L120 380 L110 450 L40 440 L20 340 Q40 300 80 280 Z" fill="url(#bodyDark)" stroke="#3f3f46" strokeWidth="3" />
                  
                  {/* Roof & Windshield Glass */}
                  <path d="M220 170 Q400 110 580 170 L630 230 Q400 210 170 230 Z" fill="#0f172a" stroke="#52525b" strokeWidth="2" opacity="0.85" />
                  
                  {/* Headlights (Aggressive Dual Projector LEDs) */}
                  <polygon points="100,270 220,285 200,320 80,300" fill="#0284c7" filter="url(#glow)" opacity="0.9" />
                  <polygon points="700,270 580,285 600,320 720,300" fill="#0284c7" filter="url(#glow)" opacity="0.9" />
                  <ellipse cx="150" cy="295" rx="14" ry="10" fill="#e0f2fe" filter="url(#glow)" />
                  <ellipse cx="650" cy="295" rx="14" ry="10" fill="#e0f2fe" filter="url(#glow)" />

                  {/* Cutaway Engine Bay Compartment Frame */}
                  <rect x="220" y="240" width="360" height="200" rx="14" fill="#0c0e14" stroke="#f97316" strokeWidth="2" strokeDasharray="6 4" opacity="0.8" />

                  {/* Left Suspension Strut & Coil Spring */}
                  <g transform="translate(170, 260)">
                    <rect x="0" y="0" width="22" height="150" rx="4" fill="url(#chromeMet)" />
                    {/* Orange Coil Spring rings */}
                    <path d="M-6 30 Q11 20 28 30 M-6 55 Q11 45 28 55 M-6 80 Q11 70 28 80 M-6 105 Q11 95 28 105 M-6 130 Q11 120 28 130" stroke="#f97316" strokeWidth="7" strokeLinecap="round" fill="none" />
                    {/* Lower Arm & Brake Caliper */}
                    <rect x="-30" y="140" width="50" height="24" rx="4" fill="#ef4444" />
                    <circle cx="-15" cy="152" r="6" fill="#fff" />
                  </g>

                  {/* Right Suspension Strut & Coil Spring */}
                  <g transform="translate(608, 260)">
                    <rect x="0" y="0" width="22" height="150" rx="4" fill="url(#chromeMet)" />
                    {/* Orange Coil Spring rings */}
                    <path d="M-6 30 Q11 20 28 30 M-6 55 Q11 45 28 55 M-6 80 Q11 70 28 80 M-6 105 Q11 95 28 105 M-6 130 Q11 120 28 130" stroke="#f97316" strokeWidth="7" strokeLinecap="round" fill="none" />
                    {/* Lower Arm & Brake Caliper */}
                    <rect x="0" y="140" width="50" height="24" rx="4" fill="#ef4444" />
                    <circle cx="25" cy="152" r="6" fill="#fff" />
                  </g>

                  {/* Central V8 Mechanical Engine Assembly */}
                  <g transform="translate(260, 250)">
                    {/* Engine Block Main Casting */}
                    <rect x="25" y="20" width="230" height="150" rx="12" fill="#27272a" stroke="#71717a" strokeWidth="3" />
                    
                    {/* Dual Valve Covers / Cylinder Heads */}
                    <rect x="35" y="10" width="90" height="30" rx="6" fill="#ea580c" stroke="#fed7aa" strokeWidth="1.5" />
                    <rect x="155" y="10" width="90" height="30" rx="6" fill="#ea580c" stroke="#fed7aa" strokeWidth="1.5" />
                    <text x="50" y="28" fill="#fff" fontSize="11" fontWeight="bold" fontFamily="monospace">TWIN</text>
                    <text x="170" y="28" fill="#fff" fontSize="11" fontWeight="bold" fontFamily="monospace">TURBO</text>

                    {/* Central Intake Manifold & Fuel Rails */}
                    <path d="M60 45 Q140 30 220 45 L200 80 L80 80 Z" fill="#3f3f46" stroke="#94a3b8" strokeWidth="2" />
                    
                    {/* Alternator & Pulleys with Serpentine Belt */}
                    {/* Main Crank Pulley */}
                    <circle cx="140" cy="140" r="28" fill="#18181b" stroke="url(#chromeMet)" strokeWidth="6" />
                    <circle cx="140" cy="140" r="10" fill="#71717a" />

                    {/* Water Pump Pulley */}
                    <circle cx="140" cy="75" r="20" fill="#18181b" stroke="url(#chromeMet)" strokeWidth="4" />

                    {/* Alternator Pulley (Left) */}
                    <circle cx="75" cy="100" r="22" fill="#18181b" stroke="url(#chromeMet)" strokeWidth="5" />
                    <circle cx="75" cy="100" r="8" fill="#94a3b8" />

                    {/* AC Compressor Pulley (Right) */}
                    <circle cx="205" cy="100" r="22" fill="#18181b" stroke="url(#chromeMet)" strokeWidth="5" />
                    <circle cx="205" cy="100" r="8" fill="#94a3b8" />

                    {/* Tensioner Pulleys */}
                    <circle cx="105" cy="145" r="12" fill="#52525b" />
                    <circle cx="175" cy="145" r="12" fill="#52525b" />

                    {/* High-Tension Ribbed Serpentine Belt */}
                    <path d="M75 78 L140 55 L205 78 L227 100 L187 145 L140 168 L93 145 L53 100 Z" stroke="#f97316" strokeWidth="5" fill="none" strokeDasharray="3 2" />
                    
                    {/* Oil Sump / Pan Base */}
                    <path d="M50 170 L230 170 L210 195 L70 195 Z" fill="#18181b" stroke="#52525b" strokeWidth="2" />
                  </g>

                  {/* Wide Performance Wheels / Tyres */}
                  {/* Left Wheel */}
                  <g transform="translate(60, 320)">
                    <rect x="0" y="0" width="55" height="130" rx="8" fill="#18181b" stroke="#3f3f46" strokeWidth="3" />
                    {/* Tread grooves */}
                    <line x1="5" y1="20" x2="50" y2="20" stroke="#09090b" strokeWidth="4" />
                    <line x1="5" y1="50" x2="50" y2="50" stroke="#09090b" strokeWidth="4" />
                    <line x1="5" y1="80" x2="50" y2="80" stroke="#09090b" strokeWidth="4" />
                    <line x1="5" y1="110" x2="50" y2="110" stroke="#09090b" strokeWidth="4" />
                  </g>

                  {/* Right Wheel */}
                  <g transform="translate(685, 320)">
                    <rect x="0" y="0" width="55" height="130" rx="8" fill="#18181b" stroke="#3f3f46" strokeWidth="3" />
                    {/* Tread grooves */}
                    <line x1="5" y1="20" x2="50" y2="20" stroke="#09090b" strokeWidth="4" />
                    <line x1="5" y1="50" x2="50" y2="50" stroke="#09090b" strokeWidth="4" />
                    <line x1="5" y1="80" x2="50" y2="80" stroke="#09090b" strokeWidth="4" />
                    <line x1="5" y1="110" x2="50" y2="110" stroke="#09090b" strokeWidth="4" />
                  </g>
                </svg>

                {/* Interactive Hotspot Beacon Pins on Engine Bay */}
                {ENGINE_HOTSPOTS.map((spot) => (
                  <button
                    key={spot.id}
                    onClick={() => setActiveEngineHotspot(spot)}
                    className="absolute z-20 group transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                    style={{ left: spot.x, top: spot.y }}
                    title={spot.name}
                  >
                    <span className="relative flex h-5 w-5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-5 w-5 bg-gradient-to-r from-orange-500 to-amber-400 text-slate-950 font-black text-[10px] items-center justify-center shadow-lg border border-white/60">
                        +
                      </span>
                    </span>
                  </button>
                ))}

              </div>

              {/* Active Hotspot Telemetry Card Overlay */}
              {activeEngineHotspot && (
                <div className="absolute bottom-4 left-4 right-4 z-30 p-3.5 rounded-2xl bg-slate-950/90 border border-orange-500/50 backdrop-blur-xl flex items-center justify-between text-xs shadow-2xl">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-orange-400 block font-bold">
                      Diagnostic Check &bull; {currentLanguage === 'hi' ? activeEngineHotspot.nameHi : activeEngineHotspot.name}
                    </span>
                    <p className="text-slate-300 text-xs mt-0.5">{activeEngineHotspot.info}</p>
                  </div>
                  <button
                    onClick={() => setActiveEngineHotspot(null)}
                    className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
                  >
                    Close
                  </button>
                </div>
              )}

            </div>
          </div>

        </div>

        {/* Bottom Key Metric Counters (from reference: 12+, 22K+, 500K+, 99%) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-12 pt-8 border-t border-slate-800/80">
          {STATS.map((stat, idx) => (
            <div key={idx} className="p-4 sm:p-6 rounded-2xl bg-slate-900/40 border border-slate-800 text-left">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-orange-400 mb-1">
                {stat.value}
              </div>
              <div className="text-xs font-mono font-bold uppercase tracking-wider text-orange-400 mb-1">
                {currentLanguage === 'hi' ? stat.labelHi : stat.label}
              </div>
              <p className="text-[11px] text-slate-500 leading-snug">
                {stat.sub}
              </p>
            </div>
          ))}
        </div>

      </section>

      {/* ============================================================== */}
      {/* SECTION 2: AUTO DETAIL SUPPLIES AND CAR CARE (Radial Disc Wreath) */}
      {/* ============================================================== */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column (Heading, Body, Orange Button, Quick Anchor Links) */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono uppercase tracking-widest">
              <Disc className="w-3.5 h-3.5" />
              <span>{currentLanguage === 'hi' ? '100% ओरिजिनल पार्ट्स' : 'GENUINE SPARES & SUPPLIES'}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white leading-[1.1]">
              {currentLanguage === 'hi' ? (
                <>
                  ऑटो डिटेल सप्लाइज <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-yellow-500">
                    & कम्प्लीट कार केयर
                  </span>
                </>
              ) : (
                <>
                  AUTO DETAIL SUPPLIES <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-yellow-500">
                    AND CAR CARE
                  </span>
                </>
              )}
            </h2>

            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-lg">
              {currentLanguage === 'hi'
                ? 'ड्रिल्ड वेंटिलेटेड ब्रेक रोटर्स, इरिडियम स्पार्क प्लग्स, टर्बोचार्जर और सिंथेटिक फ्लूइड्स — हम केवल 6 महीने की वारंटी वाले 100% ओरिजिनल OEM / OES पार्ट्स इस्तेमाल करते हैं।'
                : 'From drilled ventilated performance brake rotors and platinum spark plugs to synthetic lubricant flushes and laser-balanced suspension struts — we stock only factory-certified genuine parts with warranty.'}
            </p>

            {/* Orange CTA Button (Matching Reference Screenshot: SHOP NOW / EXPLORE) */}
            <div className="pt-2">
              <button
                onClick={() => {
                  const el = document.getElementById('brand-estimator');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="py-3.5 px-8 rounded-xl bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 hover:from-orange-500 hover:to-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider shadow-xl shadow-orange-600/30 hover:scale-105 transition-all cursor-pointer flex items-center gap-2.5"
              >
                <span>{currentLanguage === 'hi' ? 'पार्ट्स & रेट्स देखें' : 'CHECK SPARES & PACKAGES'}</span>
                <ArrowRight className="w-4 h-4 stroke-[3]" />
              </button>
            </div>

            {/* 3 Bottom Quick Links (Exactly from reference screenshot: Schedule Appointment | Money Saving | Customers Reviews) */}
            <div className="grid grid-cols-3 gap-3 pt-6 border-t border-slate-800/80 text-[11px] font-mono text-slate-400">
              <a href="#booking-section" className="hover:text-orange-400 transition-colors">
                <span className="text-white font-bold block">{currentLanguage === 'hi' ? 'स्लॉट बुक करें' : 'Schedule'}</span>
                <span>Appointment &rarr;</span>
              </a>
              <a href="#brand-estimator" className="hover:text-orange-400 transition-colors">
                <span className="text-white font-bold block">{currentLanguage === 'hi' ? 'बचत पैकेज' : 'Money Saving'}</span>
                <span>Promotions &rarr;</span>
              </a>
              <a href="#reviews" className="hover:text-orange-400 transition-colors">
                <span className="text-white font-bold block">{currentLanguage === 'hi' ? 'समीक्षाएं' : 'Customers'}</span>
                <span>Reviews &rarr;</span>
              </a>
            </div>

          </div>

          {/* Right Column: Radial Disc Rotor Wreath Montage (from reference screenshot) */}
          <div className="lg:col-span-7 flex items-center justify-center relative">
            <div className="relative w-[340px] sm:w-[460px] h-[340px] sm:h-[460px] flex items-center justify-center select-none">
              
              {/* Outer Tire Tread Orbit Ring */}
              <div className="absolute inset-0 rounded-full border-2 border-dashed border-slate-700/60 animate-spin" style={{ animationDuration: '40s' }} />
              
              {/* Secondary Glowing Ring */}
              <div className="absolute inset-8 rounded-full border border-orange-500/20 shadow-[0_0_50px_rgba(249,115,22,0.15)]" />

              {/* Central Ventilated Drilled Brake Disc Rotor */}
              <div className="relative z-10 w-44 sm:w-56 h-44 sm:h-56 rounded-full bg-gradient-to-tr from-slate-400 via-zinc-200 to-slate-400 border-4 border-slate-600 shadow-2xl flex items-center justify-center">
                
                {/* Rotor Drilled Holes pattern */}
                <div className="absolute inset-4 rounded-full border border-slate-400/60 flex items-center justify-center">
                  <div className="w-24 h-24 rounded-full bg-zinc-800 border-4 border-zinc-950 flex items-center justify-center shadow-inner">
                    {/* Center Hub & 5 Lug Nuts */}
                    <div className="relative w-12 h-12 rounded-full bg-zinc-950 flex items-center justify-center">
                      <div className="w-5 h-5 rounded-full bg-orange-500 shadow-md shadow-orange-500/50" />
                      {/* 5 Wheel Studs */}
                      <span className="absolute top-0 w-2 h-2 rounded-full bg-zinc-300" />
                      <span className="absolute bottom-0 w-2 h-2 rounded-full bg-zinc-300" />
                      <span className="absolute left-0 w-2 h-2 rounded-full bg-zinc-300" />
                      <span className="absolute right-0 w-2 h-2 rounded-full bg-zinc-300" />
                    </div>
                  </div>
                </div>

                {/* Red Sport Brake Caliper clamping the disc (from reference) */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-12 rounded-2xl bg-gradient-to-r from-red-600 via-rose-600 to-red-700 border-2 border-red-400 shadow-xl flex items-center justify-center text-[10px] font-black tracking-widest text-white uppercase">
                  BREMBO OEM
                </div>
              </div>

              {/* Radial Orbiting Mechanical Components */}
              {RADIAL_PARTS.map((p, i) => {
                const angleRad = (p.angle * Math.PI) / 180;
                // radius in px (scaled for mobile/desktop)
                const radius = 175;
                const x = Math.cos(angleRad) * radius;
                const y = Math.sin(angleRad) * radius;
                const isHovered = activePart?.id === p.id;
                const IconComponent = p.icon;

                return (
                  <div
                    key={p.id}
                    onMouseEnter={() => setActivePart(p)}
                    onMouseLeave={() => setActivePart(null)}
                    className="absolute z-20 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                    style={{
                      left: `calc(50% + ${x}px)`,
                      top: `calc(50% + ${y}px)`
                    }}
                  >
                    <div
                      className={`w-11 sm:w-13 h-11 sm:h-13 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-xl ${
                        isHovered
                          ? 'bg-orange-500 text-slate-950 scale-125 shadow-orange-500/50 border-2 border-white'
                          : 'bg-slate-900/90 text-slate-300 border border-slate-700 hover:border-orange-500 hover:text-white'
                      }`}
                    >
                      <IconComponent className="w-5 h-5" />
                    </div>

                    {/* Tooltip Tag */}
                    <div className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-30">
                      <div className="px-2 py-1 rounded-md bg-slate-950 border border-orange-500 text-[10px] font-mono text-orange-400 shadow-lg">
                        {currentLanguage === 'hi' ? p.nameHi : p.name}
                      </div>
                    </div>
                  </div>
                );
              })}

            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
