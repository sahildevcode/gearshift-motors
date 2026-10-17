import React, { useState, useRef } from 'react';
import { CAR_BRANDS, SERVICE_PACKAGES } from '../data/brandsData';
import { ArrowLeft, CheckCircle2, Clock, ShieldCheck, Sparkles, ArrowRight, Car, Wrench, X } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';

export default function BrandsEstimatorPage({ onBackToHome, onBookSlot }) {
  const [selectedBrand, setSelectedBrand] = useState(CAR_BRANDS[0]);
  const [selectedModel, setSelectedModel] = useState(CAR_BRANDS[0].models[0]);
  // By default, NO package is selected so the estimate card stays completely HIDDEN
  // User requested: "जब हम बॉक्स पर क्लिक करेंगे तो फिर उसके बाद राइट वाला बॉक्स ओपन हो वरना ये हाइड ही ओके।"
  const [selectedPackageKey, setSelectedPackageKey] = useState(null);
  const estimateCardRef = useRef(null);

  const handleSelectBrand = (brand) => {
    setSelectedBrand(brand);
    setSelectedModel(brand.models[0]);
  };

  const handleSelectPackage = (key) => {
    setSelectedPackageKey(key);
    // Smooth scroll down to the estimate card once opened
    setTimeout(() => {
      if (estimateCardRef.current) {
        if (window.lenis) {
          window.lenis.scrollTo(estimateCardRef.current, { offset: -60, duration: 1.0 });
        } else {
          estimateCardRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      }
    }, 100);
  };

  const currentPackage = SERVICE_PACKAGES.find((p) => p.key === selectedPackageKey);
  const pricingData = selectedPackageKey ? (selectedBrand.pricing[selectedPackageKey] || selectedBrand.pricing.standard) : null;

  const calculatedPrice = (pricingData && selectedModel)
    ? Math.round((pricingData.price * selectedModel.baseMultiplier) / 10) * 10
    : 0;

  const calculatedDealerPrice = (pricingData && selectedModel)
    ? Math.round((pricingData.dealerPrice * selectedModel.baseMultiplier) / 10) * 10
    : 0;

  const savings = calculatedDealerPrice - calculatedPrice;

  return (
    <div className="min-h-screen bg-[#000000] text-white pt-24 pb-20 px-4 sm:px-8 lg:px-12 selection:bg-orange-500 selection:text-black">
      <div className="max-w-7xl mx-auto">
        
        {/* Top Back Button & Trust Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-8 border-b border-white/10">
          <button
            onClick={onBackToHome}
            className="flex items-center gap-2 px-4 py-2 rounded-sm bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white font-mono-tech text-xs tracking-wider transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-orange-500" />
            <span>&larr; BACK TO HOME PAGE</span>
          </button>

          <div className="flex items-center gap-2 font-mono-tech text-xs text-orange-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>TRANSPARENT FIXED PRICING &bull; ZERO ADVANCE REQUIRED</span>
          </div>
        </div>

        {/* Page Title & Context */}
        <ScrollReveal animation="fade-up" duration={700} className="text-center max-w-3xl mx-auto mb-10">
          <span className="font-mono-tech text-[10px] uppercase text-orange-500 tracking-widest block mb-2 font-bold">
            DEDICATED MULTI-BRAND SERVICE CALCULATOR
          </span>
          <h1 className="font-syncopate text-3xl sm:text-5xl font-bold uppercase tracking-tight text-white mb-3">
            SELECT YOUR <span className="text-orange-500">CAR BRAND</span>
          </h1>
          <p className="font-space text-slate-400 text-xs sm:text-sm leading-relaxed">
            Choose your car brand and model below. Then select any service package to reveal your guaranteed price, turnaround time, and parts checklist.
          </p>
        </ScrollReveal>

        {/* 1. Car Brand Logos Grid */}
        <ScrollReveal animation="fade-up" delay={100} duration={800} className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3.5 mb-12">
          {CAR_BRANDS.map((brand) => {
            const isSelected = selectedBrand.id === brand.id;
            return (
              <button
                key={brand.id}
                onClick={() => handleSelectBrand(brand)}
                className={`group relative flex flex-col items-center justify-center p-4 sm:p-5 rounded-xl border transition-all duration-300 text-left cursor-pointer ${
                  isSelected
                    ? 'bg-[#0e1118] border-orange-500 shadow-2xl shadow-orange-950/40 scale-[1.03]'
                    : 'bg-[#07080b] border-white/10 hover:border-white/25 hover:bg-[#0c0e14]'
                }`}
              >
                <div
                  className={`w-12 sm:w-14 h-12 sm:h-14 mb-3 transition-transform group-hover:scale-110 ${
                    isSelected ? 'scale-110 drop-shadow-[0_0_15px_rgba(249,115,22,0.5)]' : 'opacity-70 group-hover:opacity-100'
                  }`}
                  dangerouslySetInnerHTML={{ __html: brand.logoSvg }}
                />

                <span className={`font-syncopate text-xs font-bold text-center tracking-wider ${isSelected ? 'text-white' : 'text-slate-300'}`}>
                  {brand.name}
                </span>

                <span className="font-mono-tech text-[10px] text-slate-500 text-center mt-1">
                  {brand.country}
                </span>

                {isSelected && (
                  <div className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-orange-500 text-black flex items-center justify-center shadow-md">
                    <CheckCircle2 className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                )}
              </button>
            );
          })}
        </ScrollReveal>

        {/* 
          2. SELECTION BAY (All arranged on top across full width as requested):
          User requested: "ये जो पार्ट ये जो कॉलम बने हैं लेफ्ट साइड में ये सब पहले ऊपर रहेंगे। जब हम बॉक्स पर क्लिक करेंगे तो फिर उसके बाद राइट वाला बॉक्स ओपन हो वरना ये हाइड ही ओके।"
        */}
        <ScrollReveal animation="fade-up" delay={150} duration={850}>
        <div className="rounded-2xl border border-white/10 bg-[#090b0e] p-6 sm:p-10 shadow-2xl space-y-8 mb-10">
          
          {/* Active Brand Header */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/10">
            <div className="flex items-center gap-4">
              <div
                className="w-12 h-12 flex-shrink-0"
                dangerouslySetInnerHTML={{ __html: selectedBrand.logoSvg }}
              />
              <div>
                <h3 className="font-syncopate text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
                  {selectedBrand.name}
                  <span className="font-mono-tech text-[10px] px-2.5 py-0.5 rounded-full bg-orange-500/20 text-orange-400 border border-orange-500/30">
                    {selectedBrand.badge}
                  </span>
                </h3>
                <span className="font-space text-xs text-slate-400">
                  Certified Master Technicians & 100% Genuine OEM Spares
                </span>
              </div>
            </div>

            <div className="font-mono-tech text-xs text-slate-500">
              MODELS AVAILABLE: <strong className="text-white">{selectedBrand.models.length}</strong>
            </div>
          </div>

          {/* STEP 1: SELECT CAR MODEL (Full width horizontal chips) */}
          <div>
            <label className="block font-mono-tech text-xs uppercase tracking-wider text-slate-400 mb-3 font-bold">
              1. SELECT CAR MODEL:
            </label>
            <div className="flex flex-wrap gap-2.5">
              {selectedBrand.models.map((model) => {
                const isModelActive = selectedModel.name === model.name;
                return (
                  <button
                    key={model.name}
                    onClick={() => setSelectedModel(model)}
                    className={`px-4 py-2.5 rounded-lg text-xs font-mono-tech font-bold border transition-all cursor-pointer ${
                      isModelActive
                        ? 'bg-orange-500 border-orange-400 text-black shadow-lg shadow-orange-500/20 scale-105'
                        : 'bg-black/60 border-white/10 text-slate-300 hover:border-white/30 hover:text-white'
                    }`}
                  >
                    {model.name}
                    <span className={`ml-2 text-[10px] ${isModelActive ? 'text-black/80' : 'text-slate-500'}`}>
                      ({model.segment})
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* STEP 2: SELECT SERVICE PACKAGE (Full width prominent grid of 6 boxes) */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <label className="font-mono-tech text-xs uppercase tracking-wider text-slate-400 font-bold">
                2. SELECT SERVICE PACKAGE (CLICK TO UNLOCK PRICE & TIME ESTIMATE):
              </label>
              {!selectedPackageKey && (
                <span className="font-mono-tech text-[11px] text-orange-400 animate-pulse">
                  👉 Click any package below to open estimate
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {SERVICE_PACKAGES.map((pkg) => {
                const isPkgActive = selectedPackageKey === pkg.key;
                return (
                  <div
                    key={pkg.key}
                    onClick={() => handleSelectPackage(pkg.key)}
                    className={`group cursor-pointer p-5 rounded-xl border transition-all duration-300 flex flex-col justify-between select-none ${
                      isPkgActive
                        ? 'bg-[#121620] border-orange-500 ring-2 ring-orange-500/50 shadow-2xl shadow-orange-950/50 scale-[1.02]'
                        : 'bg-black/60 border-white/10 hover:border-orange-500/40 hover:bg-[#0c0e14]'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <h4 className={`font-mono-tech text-sm font-bold transition-colors ${isPkgActive ? 'text-orange-400' : 'text-slate-200 group-hover:text-white'}`}>
                          {pkg.name}
                        </h4>
                        {isPkgActive ? (
                          <div className="w-5 h-5 rounded-full bg-orange-500 text-black flex items-center justify-center flex-shrink-0">
                            <CheckCircle2 className="w-3.5 h-3.5 stroke-[3]" />
                          </div>
                        ) : (
                          <span className="text-[10px] font-mono-tech px-2 py-0.5 rounded bg-white/5 border border-white/10 text-slate-400 group-hover:text-orange-400 group-hover:border-orange-500/30 transition-colors">
                            Click to View
                          </span>
                        )}
                      </div>
                      <p className="font-space text-xs text-slate-400 leading-relaxed mb-4">
                        {pkg.desc}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-white/5 flex items-center justify-between font-mono-tech text-[10px]">
                      <span className="text-slate-500">{pkg.badge}</span>
                      <span className="text-orange-400 font-bold">{pkg.warranty}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
        </ScrollReveal>

        {/* 
          3. THE ESTIMATE & TURNAROUND DRAWER / BOX:
          User requested: "जब हम बॉक्स पर क्लिक करेंगे तो फिर उसके बाद राइट वाला बॉक्स ओपन हो वरना ये हाइड ही ओके।"
          Hidden by default until selectedPackageKey is set!
        */}
        {selectedPackageKey && currentPackage && (
          <div
            ref={estimateCardRef}
            className="animate-in fade-in slide-in-from-bottom-6 duration-500 rounded-2xl border border-orange-500/50 bg-gradient-to-b from-[#111520] via-[#090b0e] to-[#07080a] p-6 sm:p-10 shadow-2xl relative overflow-hidden mb-12"
          >
            {/* Top Glowing Neon Line */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-orange-500 via-amber-400 to-orange-600" />

            {/* Header with Close Button */}
            <div className="flex flex-wrap items-start justify-between gap-4 pb-6 border-b border-white/10 mb-6">
              <div>
                <span className="font-mono-tech text-[10px] text-orange-500 uppercase tracking-widest block font-bold">
                  ● LIVE ESTIMATE & TURNAROUND UNLOCKED
                </span>
                <h3 className="font-syncopate text-2xl sm:text-3xl font-bold text-white mt-1">
                  {selectedBrand.name} {selectedModel.name}
                </h3>
                <span className="font-mono-tech text-xs sm:text-sm text-slate-300">
                  {currentPackage.name} &bull; <span className="text-orange-400">{currentPackage.badge}</span>
                </span>
              </div>

              {/* Close Button to hide if customer wants */}
              <button
                onClick={() => setSelectedPackageKey(null)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-white/5 hover:bg-white/10 border border-white/10 text-slate-400 hover:text-white font-mono-tech text-xs transition-colors cursor-pointer"
                title="Hide Estimate Box"
              >
                <X className="w-4 h-4" />
                <span>Close Box</span>
              </button>
            </div>

            {/* Price & Turnaround Metric Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 rounded-xl bg-black/80 border border-white/10 mb-8 font-mono-tech">
              
              {/* Estimated Price Block */}
              <div>
                <span className="text-xs text-slate-500 block uppercase font-bold tracking-wider">
                  TOTAL ESTIMATED SERVICE COST
                </span>
                <div className="text-3xl sm:text-4xl font-black text-orange-400 mt-1">
                  ₹{calculatedPrice.toLocaleString()}
                </div>
                <div className="text-xs text-slate-500 line-through mt-1">
                  Dealer Center Estimate: ₹{calculatedDealerPrice.toLocaleString()}
                </div>
                <div className="mt-2 inline-flex items-center gap-1 text-[11px] font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-800/80 px-2.5 py-1 rounded-sm">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>YOU SAVE ₹{savings.toLocaleString()} (40% OFF DEALER COST)</span>
                </div>
              </div>

              {/* Turnaround Time Block */}
              <div className="md:border-l md:border-white/10 md:pl-6">
                <span className="text-xs text-slate-500 block uppercase font-bold tracking-wider">
                  GUARANTEED TURNAROUND TIME
                </span>
                <div className="flex items-center gap-2 text-2xl sm:text-3xl font-black text-white mt-1">
                  <Clock className="w-6 h-6 text-orange-500" />
                  <span>{pricingData.time}</span>
                </div>
                <span className="text-xs text-slate-400 block mt-1">
                  ⚡ Express Dedicated Bay Priority
                </span>
                <div className="mt-2 inline-flex items-center gap-1 text-[11px] font-bold text-amber-400 bg-amber-950/60 border border-amber-800/80 px-2.5 py-1 rounded-sm">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>{currentPackage.warranty}</span>
                </div>
              </div>

            </div>

            {/* Inclusions Checklist */}
            <div className="space-y-3 mb-8">
              <span className="font-mono-tech text-xs uppercase tracking-wider text-slate-300 block font-bold">
                WHAT'S INCLUDED IN THIS PACKAGE (GENUINE OEM PARTS & LABOR):
              </span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {currentPackage.features.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs font-space text-slate-300 p-2.5 rounded bg-black/40 border border-white/5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
                <div className="flex items-start gap-2.5 text-xs font-space text-amber-300 font-semibold p-2.5 rounded bg-amber-950/30 border border-amber-500/30 md:col-span-2">
                  <Sparkles className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                  <span>
                    COMPLIMENTARY BONUS: 40-Point Electronic Scanner Diagnostics + Foam Spa Wash & Vacuum
                  </span>
                </div>
              </div>
            </div>

            {/* Action CTA: Direct 1-Click Slot Reservation */}
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <button
                onClick={() => {
                  if (onBookSlot) {
                    onBookSlot({
                      brand: selectedBrand.name,
                      model: selectedModel.name,
                      packageKey: selectedPackageKey,
                      packageName: currentPackage.name,
                      estimatedPrice: calculatedPrice,
                      estimatedTime: pricingData.time
                    });
                  }
                }}
                className="w-full sm:w-auto flex-1 py-4 px-8 rounded-sm bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 hover:from-orange-500 hover:to-amber-400 text-black font-rajdhani font-black text-sm uppercase tracking-widest shadow-2xl shadow-orange-600/40 hover:scale-[1.01] transition-all flex items-center justify-center gap-2.5 cursor-pointer"
              >
                <span>BOOK THIS SERVICE SLOT NOW</span>
                <ArrowRight className="w-4 h-4 stroke-[3]" />
              </button>

              <button
                onClick={() => setSelectedPackageKey(null)}
                className="w-full sm:w-auto py-4 px-6 rounded-sm bg-white/5 hover:bg-white/10 border border-white/15 text-slate-300 font-mono-tech text-xs uppercase tracking-wider transition-colors cursor-pointer"
              >
                Choose Another Package
              </button>
            </div>

            <p className="font-space text-xs text-center text-slate-500 mt-4">
              ✓ Zero Advance Required &bull; Free Pick-up & Drop Available &bull; Pay Only After Service & Test Drive
            </p>
          </div>
        )}

      </div>
    </div>
  );
}
