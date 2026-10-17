import React, { useState } from 'react';
import { WORKSHOP_SERVICES } from '../data/servicesData';
import { Wrench, Flame, Snowflake, Cpu, ShieldAlert, Disc, Sparkles, Radio, Check, Clock, ArrowRight, ShieldCheck, HelpCircle } from 'lucide-react';

const ICON_MAP = {
  Wrench,
  Flame,
  Snowflake,
  Cpu,
  ShieldAlert,
  Disc,
  Sparkles,
  Radio
};

export default function ServicesSection({ onBookService, currentLanguage = 'en' }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [beforeAfterPos, setBeforeAfterPos] = useState(50); // percentage

  const CATEGORIES = [
    { id: 'all', label: 'All Services', labelHi: 'सभी सेवाएं' },
    { id: 'periodic', label: 'Periodic Maintenance', labelHi: 'नियमित सर्विस' },
    { id: 'engine-transmission', label: 'Engine & Gearbox', labelHi: 'इंजन & गियर' },
    { id: 'denting-painting', label: 'Denting & Painting', labelHi: 'डेंटिंग & पेंटिंग' },
    { id: 'ac-electrical', label: 'AC & Cooling', labelHi: 'एसी रिपेयर' },
    { id: 'brakes-suspension', label: 'Brakes & Suspension', labelHi: 'ब्रेक & सस्पेंशन' },
    { id: 'roadside-sos', label: '24/7 Breakdown SOS', labelHi: '24/7 इमरजेंसी' },
  ];

  const filteredServices = activeCategory === 'all'
    ? WORKSHOP_SERVICES
    : WORKSHOP_SERVICES.filter((s) => s.id === activeCategory);

  return (
    <section id="services" className="relative py-20 px-4 md:px-8 max-w-7xl mx-auto">
      {/* Background radial accent */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-cyan-600/10 blur-[130px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-orange-600/10 blur-[130px] pointer-events-none rounded-full" />

      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono uppercase tracking-widest mb-4">
          <Wrench className="w-4 h-4" />
          {currentLanguage === 'hi' ? 'हमारी प्रमुख वर्कशॉप सेवाएं' : 'Precision Engineering & Services'}
        </div>
        <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-4">
          {currentLanguage === 'hi' ? (
            <>
              हर समस्या का <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500">विश्वसनीय समाधान</span>
            </>
          ) : (
            <>
              Mastercraft Services for <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500">Every Vehicle Need</span>
            </>
          )}
        </h2>
        <p className="text-slate-400 text-sm md:text-base leading-relaxed">
          {currentLanguage === 'hi'
            ? 'ऑटोमैटिक डायग्नोस्टिक स्कैनर्स, जर्मन पेंट बूथ, ओरिजिनल स्पेयर पार्ट्स और 15+ वर्षों के अनुभवी मास्टर मैकेनिक।'
            : 'From computerized OBD-II scans to dust-free paint booth finishing, we treat every car with surgical precision.'}
        </p>

        {/* Filter Pills */}
        <div className="flex flex-wrap justify-center gap-2 mt-8">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeCategory === cat.id
                  ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/25 font-bold scale-105'
                  : 'bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
              }`}
            >
              {currentLanguage === 'hi' ? cat.labelHi : cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Services Grid (Scroll-fed cards) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {filteredServices.map((service) => {
          const IconComp = ICON_MAP[service.icon] || Wrench;
          return (
            <div
              key={service.id}
              className={`group relative rounded-3xl border ${service.borderColor} bg-gradient-to-b from-slate-900/90 to-slate-950/90 p-6 backdrop-blur-xl shadow-xl hover:shadow-2xl hover:scale-[1.01] transition-all duration-300 flex flex-col justify-between overflow-hidden`}
            >
              {/* Subtle Ambient Hover Glow */}
              <div
                className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-0 group-hover:opacity-40 transition-opacity pointer-events-none"
                style={{ backgroundColor: service.accentColor }}
              />

              <div>
                {/* Header: Icon + Pricing + Time Badge */}
                <div className="flex items-center justify-between mb-4">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg"
                    style={{ backgroundColor: `${service.accentColor}20`, border: `1px solid ${service.accentColor}40` }}
                  >
                    <IconComp className="w-6 h-6" style={{ color: service.accentColor }} />
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] uppercase font-mono text-slate-500 block">
                      {currentLanguage === 'hi' ? 'प्रारंभिक मूल्य' : 'Starting From'}
                    </span>
                    <span className="text-lg font-black text-white">{service.priceStarting}</span>
                  </div>
                </div>

                {/* Title & Tagline */}
                <h3 className="text-lg font-bold text-white mb-1 group-hover:text-cyan-400 transition-colors">
                  {currentLanguage === 'hi' ? service.titleHi : service.title}
                </h3>
                <p className="text-xs text-slate-400 mb-4 line-clamp-2 leading-relaxed">
                  {service.tagline}
                </p>

                {/* Turnaround Time Pill */}
                <div className="flex items-center gap-1.5 text-xs text-slate-300 font-mono bg-slate-950/60 border border-slate-800/80 px-3 py-1.5 rounded-xl w-fit mb-5">
                  <Clock className="w-3.5 h-3.5 text-cyan-400" />
                  <span>
                    {currentLanguage === 'hi' ? 'समय:' : 'Turnaround:'} <strong>{service.avgTime}</strong>
                  </span>
                </div>

                {/* What's Included */}
                <div className="space-y-2 mb-6">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block">
                    {currentLanguage === 'hi' ? 'शामिल मुख्य कार्य:' : 'Key Inclusions:'}
                  </span>
                  {service.includes.slice(0, 4).map((inc, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                      <Check className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span className="line-clamp-1">{inc}</span>
                    </div>
                  ))}
                </div>

                {/* When You Need This (Symptoms pill) */}
                <div className="p-3 rounded-xl bg-slate-950/50 border border-slate-800/60 mb-6">
                  <span className="text-[10px] font-mono text-amber-400 uppercase tracking-wider flex items-center gap-1 mb-1">
                    <HelpCircle className="w-3 h-3" />
                    {currentLanguage === 'hi' ? 'यह सर्विस कब करवाएं?' : 'Common Symptoms:'}
                  </span>
                  <p className="text-[11px] text-slate-400 italic">
                    "{service.symptomsAddressed[0]}"
                  </p>
                </div>
              </div>

              {/* Booking CTA Button */}
              <button
                onClick={() =>
                  onBookService &&
                  onBookService({
                    packageName: currentLanguage === 'hi' ? service.titleHi : service.title,
                    estimatedPrice: service.priceStarting,
                    estimatedTime: service.avgTime
                  })
                }
                className="w-full py-2.5 px-4 rounded-xl bg-slate-800/80 hover:bg-gradient-to-r hover:from-cyan-500 hover:to-blue-600 hover:text-slate-950 border border-slate-700/80 hover:border-transparent text-slate-200 text-xs font-bold transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer group-hover:shadow-lg"
              >
                <span>{currentLanguage === 'hi' ? 'यह सर्विस चुनें' : 'Book This Service'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          );
        })}
      </div>

      {/* Interactive Before & After Slider (Denting & Painting Proof) */}
      <div className="rounded-3xl border border-slate-800 bg-gradient-to-b from-slate-900 to-slate-950 p-6 md:p-10 shadow-2xl relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-5 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-mono uppercase tracking-wider">
              <Flame className="w-3.5 h-3.5" />
              {currentLanguage === 'hi' ? 'लाइव बिफोर & आफ्टर डेमो' : 'German Spray Booth Results'}
            </div>
            <h3 className="text-2xl md:text-3xl font-black text-white">
              {currentLanguage === 'hi' ? (
                <>
                  डेंटिंग और पेंटिंग का <span className="text-rose-400">जादुई बदलाव</span>
                </>
              ) : (
                <>
                  Denting & Paint <span className="text-rose-400">Showroom Transformation</span>
                </>
              )}
            </h3>
            <p className="text-slate-400 text-xs md:text-sm leading-relaxed">
              {currentLanguage === 'hi'
                ? 'स्लाइडर को आगे-पीछे करके देखें कि कैसे हम गंभीर रूप से स्क्रैच और डेंट वाली कार को 100% शोरूम जैसी नई चमक में बदल देते हैं।'
                : 'Drag the slider to witness how our computerized shade matching & dust-free booth restores damaged car panels to mirror-finish perfection.'}
            </p>
            <div className="space-y-2 pt-2">
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>100% Computerized Shade Matching Guarantee</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>2-Year Paint Peel-Off & Gloss Warranty</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Cashless Claims Tie-up with all Major Insurers</span>
              </div>
            </div>
          </div>

          {/* Interactive Interactive Comparison Canvas */}
          <div className="lg:col-span-7">
            <div className="relative w-full h-64 md:h-80 rounded-2xl overflow-hidden border border-slate-700 select-none shadow-2xl">
              
              {/* After: Showroom Gloss Side */}
              <div className="absolute inset-0 bg-gradient-to-tr from-slate-900 via-rose-950 to-slate-900 flex items-center justify-center p-6">
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto mb-3 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                    <Sparkles className="w-10 h-10 text-emerald-400" />
                  </div>
                  <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold block mb-1">
                    AFTER &bull; पूर्ण रिस्टोर्ड
                  </span>
                  <h4 className="text-lg md:text-xl font-bold text-white">
                    Showroom Mirror Finish (100% Fixed)
                  </h4>
                  <p className="text-xs text-slate-300 mt-1">
                    Zero scratches &bull; 9H Ceramic Seal &bull; Factory Gloss
                  </p>
                </div>
              </div>

              {/* Before: Scratched / Dented Side (clipped by slider) */}
              <div
                className="absolute inset-0 bg-gradient-to-tr from-slate-950 via-red-950/60 to-slate-900 flex items-center justify-center p-6 overflow-hidden border-r-2 border-white shadow-2xl"
                style={{ width: `${beforeAfterPos}%` }}
              >
                <div className="text-center min-w-[280px]">
                  <div className="w-20 h-20 mx-auto mb-3 rounded-full bg-red-500/20 border border-red-500/40 flex items-center justify-center">
                    <ShieldAlert className="w-10 h-10 text-red-400" />
                  </div>
                  <span className="text-xs font-mono uppercase tracking-widest text-red-400 font-bold block mb-1">
                    BEFORE &bull; डेंट & स्क्रैच
                  </span>
                  <h4 className="text-lg md:text-xl font-bold text-white">
                    Deep Scratches & Dents
                  </h4>
                  <p className="text-xs text-slate-400 mt-1">
                    Panel impact &bull; Paint peeled &bull; Rust hazard
                  </p>
                </div>
              </div>

              {/* Slider Thumb Handle */}
              <div
                className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize flex items-center justify-center"
                style={{ left: `${beforeAfterPos}%` }}
              >
                <div className="w-8 h-8 rounded-full bg-white text-slate-950 font-bold flex items-center justify-center shadow-xl text-xs -translate-x-1/2">
                  ⇄
                </div>
              </div>

              {/* Drag controller overlay */}
              <input
                type="range"
                min="0"
                max="100"
                value={beforeAfterPos}
                onChange={(e) => setBeforeAfterPos(Number(e.target.value))}
                className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize"
              />
            </div>
            
            <div className="flex justify-between items-center text-[11px] font-mono text-slate-400 mt-2 px-1">
              <span>◀ Before (Dented & Scratched)</span>
              <span className="text-orange-400">Slide left or right</span>
              <span>After (Mirror Finish) ▶</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
