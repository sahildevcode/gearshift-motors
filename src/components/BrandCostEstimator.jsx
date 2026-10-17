import React, { useState } from 'react';
import { CAR_BRANDS, SERVICE_PACKAGES } from '../data/brandsData';
import { CheckCircle2, Clock, ShieldCheck, Sparkles, ArrowRight, DollarSign, Award, ChevronRight, Car, Wrench } from 'lucide-react';

export default function BrandCostEstimator({ onBookService, currentLanguage = 'en' }) {
  const [selectedBrand, setSelectedBrand] = useState(CAR_BRANDS[0]);
  const [selectedModel, setSelectedModel] = useState(CAR_BRANDS[0].models[0]);
  const [selectedPackageKey, setSelectedPackageKey] = useState('standard');

  // When brand changes, set default model
  const handleSelectBrand = (brand) => {
    setSelectedBrand(brand);
    setSelectedModel(brand.models[0]);
  };

  const currentPackage = SERVICE_PACKAGES.find((p) => p.key === selectedPackageKey) || SERVICE_PACKAGES[0];
  const pricingData = selectedBrand.pricing[selectedPackageKey] || selectedBrand.pricing.standard;

  // Calculate scaled price based on car model segment multiplier
  const calculatedPrice = Math.round((pricingData.price * selectedModel.baseMultiplier) / 10) * 10;
  const calculatedDealerPrice = Math.round((pricingData.dealerPrice * selectedModel.baseMultiplier) / 10) * 10;
  const savings = calculatedDealerPrice - calculatedPrice;

  return (
    <section id="brands-pricing" className="relative py-20 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto border-t border-white/5 bg-black">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-orange-600/10 blur-[140px] pointer-events-none rounded-full" />

      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-orange-500/10 border border-orange-500/20 text-orange-400 font-mono-tech text-[10px] uppercase tracking-widest mb-3">
          <Car className="w-3.5 h-3.5" />
          <span>BRAND SERVICE & PRICE ESTIMATOR</span>
        </div>
        <h2 className="font-syncopate text-2xl sm:text-4xl font-bold uppercase tracking-tight text-white mb-3">
          SELECT YOUR <span className="text-orange-500">CAR BRAND</span> & INSTANT ESTIMATE
        </h2>
        <p className="font-space text-slate-400 text-xs sm:text-sm leading-relaxed">
          Click on any car brand below. Transparent fixed pricing, certified master technicians, 100% genuine OEM parts, and express delivery guarantee.
        </p>
      </div>

      {/* Brand Selection Logo Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 md:gap-4 mb-12">
        {CAR_BRANDS.map((brand) => {
          const isSelected = selectedBrand.id === brand.id;
          return (
            <button
              key={brand.id}
              onClick={() => handleSelectBrand(brand)}
              className={`group relative flex flex-col items-center justify-center p-4 rounded-2xl border transition-all duration-300 text-left ${
                isSelected
                  ? 'bg-gradient-to-b from-slate-900 to-orange-950/40 border-orange-500 shadow-xl shadow-orange-500/15 scale-[1.03]'
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-800/40'
              }`}
            >
              {/* Brand Logo SVG */}
              <div
                className={`w-12 h-12 mb-3 transition-transform group-hover:scale-110 ${
                  isSelected ? 'scale-110 drop-shadow-[0_0_12px_rgba(249,115,22,0.4)]' : 'opacity-80 group-hover:opacity-100'
                }`}
                dangerouslySetInnerHTML={{ __html: brand.logoSvg }}
              />

              <span className={`text-sm font-bold text-center ${isSelected ? 'text-white' : 'text-slate-300'}`}>
                {brand.name}
              </span>

              <span className="text-[11px] text-slate-500 text-center mt-0.5 line-clamp-1">
                {brand.country}
              </span>

              {/* Active Selection Indicator */}
              {isSelected && (
                <div className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-orange-500 text-slate-950 flex items-center justify-center shadow-md">
                  <CheckCircle2 className="w-3.5 h-3.5 stroke-[3]" />
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Interactive Calculation Bay */}
      <div className="rounded-3xl border border-slate-800 bg-gradient-to-b from-slate-900/90 to-slate-950/90 backdrop-blur-xl p-6 md:p-10 shadow-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Model & Service Package Selection */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Selected Brand Banner */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 flex-shrink-0"
                  dangerouslySetInnerHTML={{ __html: selectedBrand.logoSvg }}
                />
                <div>
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    {selectedBrand.name}
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-orange-500/20 text-orange-400 border border-orange-500/30 font-normal">
                      {selectedBrand.badge}
                    </span>
                  </h3>
                  <p className="text-xs text-slate-400">
                    {currentLanguage === 'hi' ? 'विशेषज्ञ मैकेनिक & 100% जेनुइन पार्ट्स' : 'Certified Specialist Workshop & Genuine Spares'}
                  </p>
                </div>
              </div>
            </div>

            {/* Step 1: Model Selection Chips */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-3">
                {currentLanguage === 'hi' ? '1. कार मॉडल चुनें:' : '1. Select Car Model:'}
              </label>
              <div className="flex flex-wrap gap-2">
                {selectedBrand.models.map((model) => {
                  const isModelActive = selectedModel.name === model.name;
                  return (
                    <button
                      key={model.name}
                      onClick={() => setSelectedModel(model)}
                      className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-all ${
                        isModelActive
                          ? 'bg-orange-500 border-orange-400 text-slate-950 font-bold shadow-md shadow-orange-500/20'
                          : 'bg-slate-800/80 border-slate-700/70 text-slate-300 hover:border-slate-500 hover:text-white'
                      }`}
                    >
                      {model.name}
                      <span className={`ml-1.5 text-[10px] ${isModelActive ? 'text-slate-900 font-normal' : 'text-slate-500'}`}>
                        ({model.segment})
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Service Package Selection Cards */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-3">
                {currentLanguage === 'hi' ? '2. सर्विस पैकेज चुनें:' : '2. Select Service Package:'}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {SERVICE_PACKAGES.map((pkg) => {
                  const isPkgActive = selectedPackageKey === pkg.key;
                  return (
                    <div
                      key={pkg.key}
                      onClick={() => setSelectedPackageKey(pkg.key)}
                      className={`cursor-pointer p-3.5 rounded-2xl border transition-all text-left flex flex-col justify-between ${
                        isPkgActive
                          ? 'bg-slate-800/90 border-orange-500 shadow-md shadow-orange-500/10'
                          : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <h4 className={`text-sm font-bold ${isPkgActive ? 'text-orange-400' : 'text-slate-200'}`}>
                            {currentLanguage === 'hi' ? pkg.nameHi : pkg.name}
                          </h4>
                          {isPkgActive && <CheckCircle2 className="w-4 h-4 text-orange-400 flex-shrink-0" />}
                        </div>
                        <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                          {pkg.desc}
                        </p>
                      </div>
                      <div className="mt-2.5 pt-2 border-t border-slate-800/60 flex items-center justify-between text-[11px]">
                        <span className="text-slate-500">{pkg.badge}</span>
                        <span className="font-mono text-cyan-400 font-semibold">{pkg.warranty}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Right Column: Instant Live Price & Time Card */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl border border-orange-500/30 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 p-6 shadow-2xl relative overflow-hidden">
              
              {/* Subtle top neon glow */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 via-amber-400 to-cyan-500" />

              {/* Title & Selected Vehicle */}
              <div className="mb-4">
                <span className="text-[11px] font-mono text-orange-400 uppercase tracking-widest">
                  {currentLanguage === 'hi' ? 'लाइव एस्टीमेट & डिलीवरी टाइम' : 'Live Estimate & Turnaround'}
                </span>
                <h3 className="text-xl font-bold text-white mt-1">
                  {selectedBrand.name} {selectedModel.name}
                </h3>
                <p className="text-xs text-slate-400">
                  {currentLanguage === 'hi' ? currentPackage.nameHi : currentPackage.name}
                </p>
              </div>

              {/* Price & Turnaround Time Display */}
              <div className="grid grid-cols-2 gap-3 p-4 rounded-xl bg-slate-950/80 border border-slate-800 mb-5">
                <div>
                  <span className="text-[11px] text-slate-400 block mb-0.5">
                    {currentLanguage === 'hi' ? 'अनुमानित कुल खर्च' : 'Estimated Cost'}
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300">
                      ₹{calculatedPrice.toLocaleString()}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500 line-through mt-0.5">
                    Dealer: ₹{calculatedDealerPrice.toLocaleString()}
                  </div>
                  <span className="inline-block text-[10px] font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-800/80 px-2 py-0.5 rounded-full mt-1.5">
                    Save ₹{savings.toLocaleString()} (40% OFF)
                  </span>
                </div>

                <div className="border-l border-slate-800 pl-3">
                  <span className="text-[11px] text-slate-400 block mb-0.5">
                    {currentLanguage === 'hi' ? 'डिलीवरी टाइम' : 'Turnaround Time'}
                  </span>
                  <div className="flex items-center gap-1.5 text-xl md:text-2xl font-black text-cyan-400">
                    <Clock className="w-5 h-5 text-cyan-400" />
                    <span>{pricingData.time}</span>
                  </div>
                  <span className="text-[10px] text-slate-400 block mt-1">
                    {currentLanguage === 'hi' ? '⚡ एक्सप्रेस बे गारंटी' : '⚡ Express Bay Guarantee'}
                  </span>
                  <div className="mt-1.5 flex items-center gap-1 text-[10px] text-amber-400">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>{currentPackage.warranty}</span>
                  </div>
                </div>
              </div>

              {/* What is Included Checklist */}
              <div className="space-y-2 mb-6">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block">
                  {currentLanguage === 'hi' ? 'इस पैकेज में क्या-क्या शामिल है:' : "What's Included in this package:"}
                </span>
                <div className="space-y-2 max-h-52 overflow-y-auto pr-1">
                  {currentPackage.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                  <div className="flex items-start gap-2 text-xs text-amber-300 font-medium">
                    <Sparkles className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                    <span>
                      {currentLanguage === 'hi'
                        ? 'मुफ्त: 40-पॉइंट इलेक्ट्रॉनिक स्कैनर डायग्नोस्टिक्स + कार वॉश'
                        : 'FREE: 40-Point Electronic Scanner Diagnostics + Spa Wash'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Direct Booking CTA */}
              <button
                onClick={() =>
                  onBookService &&
                  onBookService({
                    brand: selectedBrand.name,
                    model: selectedModel.name,
                    packageKey: selectedPackageKey,
                    packageName: currentLanguage === 'hi' ? currentPackage.nameHi : currentPackage.name,
                    estimatedPrice: calculatedPrice,
                    estimatedTime: pricingData.time
                  })
                }
                className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 text-slate-950 font-bold text-sm tracking-wide shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 hover:scale-[1.01] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>
                  {currentLanguage === 'hi' ? 'यह स्लॉट अभी बुक करें' : 'Book This Service Slot Now'}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <p className="text-[11px] text-center text-slate-500 mt-3">
                {currentLanguage === 'hi'
                  ? '✓ कोई अग्रिम भुगतान नहीं • काम पूरा होने और टेस्ट ड्राइव के बाद ही भुगतान करें'
                  : '✓ Zero Advance Required • Pay Only After Service & Test Drive'}
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
