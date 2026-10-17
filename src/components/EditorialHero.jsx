import React, { useState } from 'react';
import { Search, ChevronDown, ArrowUpRight, Wrench, Shield, Compass, Sparkles, Eye, RotateCw } from 'lucide-react';
import { FEATURED_CARS } from '../data/featuredCarsData';
import Hero3DCar from './Hero3DCar';

export default function EditorialHero({ currentLanguage = 'en', onBookCar, onSelectBrand }) {
  const [selectedCarIndex, setSelectedCarIndex] = useState(0);
  const [activeMediaView, setActiveMediaView] = useState('hero'); // 'hero', 'interior', 'track', 'profile'
  const [is3DMode, setIs3DMode] = useState(false);
  const [modelsDropdownOpen, setModelsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const currentCar = FEATURED_CARS[selectedCarIndex];

  // Pick main display image
  let displayImage = currentCar.heroImage;
  if (activeMediaView === 'interior') displayImage = currentCar.gallery[0].image;
  if (activeMediaView === 'track') displayImage = currentCar.gallery[1].image;
  if (activeMediaView === 'profile') displayImage = currentCar.gallery[2].image;

  return (
    <section className="relative w-full pt-24 md:pt-28 pb-16 px-3 sm:px-6 lg:px-8 max-w-[1440px] mx-auto select-none">
      
      {/* Background Architectural Grid Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-20 z-0">
        <div className="w-full h-full grid grid-cols-6 md:grid-cols-12 divide-x divide-slate-800 border-x border-slate-800" />
      </div>

      {/* Main Luxury Frame (Matching reference screenshot exactly) */}
      <div className="relative z-10 w-full rounded-2xl md:rounded-3xl border border-slate-800/90 bg-[#0d1017] shadow-2xl overflow-hidden backdrop-blur-2xl">
        
        {/* Top Navbar Inside Hero Canvas (Exactly like reference: AutoDealer | All Models ▾ | Search | ENG ▾ | USD ▾) */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-5 md:px-8 py-4 border-b border-white/5 bg-slate-950/60 backdrop-blur-md text-xs">
          
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-400 via-orange-500 to-red-500 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-orange-500/20">
              <Compass className="w-4 h-4 stroke-[2.5]" />
            </div>
            <div className="flex items-center gap-1 text-white font-bold tracking-tight text-sm md:text-base">
              <span>AutoDealer</span>
              <span className="text-[10px] text-orange-400 font-mono tracking-widest uppercase ml-1 border border-orange-500/30 px-1.5 py-0.2 rounded-md bg-orange-500/10 hidden sm:inline-block">
                Precision Workshop
              </span>
            </div>
          </div>

          {/* Center & Right Controls */}
          <div className="flex items-center gap-2 sm:gap-3 ml-auto">
            
            {/* All Models Dropdown */}
            <div className="relative">
              <button
                onClick={() => setModelsDropdownOpen(!modelsDropdownOpen)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 text-xs transition-all cursor-pointer font-medium"
              >
                <span>{currentCar.title}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {modelsDropdownOpen && (
                <div className="absolute top-full mt-2 right-0 w-60 rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl py-2 z-50">
                  <span className="block px-3 py-1 text-[10px] font-mono uppercase text-slate-500">
                    Featured Master Vehicles
                  </span>
                  {FEATURED_CARS.map((car, idx) => (
                    <button
                      key={car.id}
                      onClick={() => {
                        setSelectedCarIndex(idx);
                        setActiveMediaView('hero');
                        setModelsDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-slate-800 transition-colors ${
                        selectedCarIndex === idx ? 'text-orange-400 font-bold bg-slate-800/60' : 'text-slate-300'
                      }`}
                    >
                      <span>{car.title}</span>
                      <span className="text-[10px] font-mono text-slate-500">{car.category}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Search Pill */}
            <div className="hidden sm:flex items-center bg-white/5 border border-white/10 rounded-full px-3 py-1.5 text-xs text-slate-300 w-36 lg:w-48">
              <input
                type="text"
                placeholder="Search models..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent focus:outline-none text-white text-xs placeholder-slate-500"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 ml-1.5 flex-shrink-0" />
            </div>

            {/* 3D Turntable VS Studio Photo Toggle */}
            <button
              onClick={() => setIs3DMode(!is3DMode)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
                is3DMode
                  ? 'bg-orange-500 text-slate-950 border-orange-400 shadow-md shadow-orange-500/25'
                  : 'bg-white/5 hover:bg-white/10 border-white/10 text-slate-200'
              }`}
            >
              {is3DMode ? (
                <>
                  <Eye className="w-3.5 h-3.5" />
                  <span>3D Turntable: ON</span>
                </>
              ) : (
                <>
                  <RotateCw className="w-3.5 h-3.5 text-orange-400" />
                  <span>Interactive 3D</span>
                </>
              )}
            </button>

            {/* Currency Pill */}
            <div className="hidden lg:flex items-center px-2.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-[11px] font-mono text-slate-300">
              <span>INR ₹ / AED</span>
            </div>

          </div>

        </div>

        {/* Main Stage Grid: Left Big Car Showcase + Right 3-Card Vertical Stack */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 p-4 sm:p-6 lg:p-8">
          
          {/* LEFT SECTION (~68% width on desktop) */}
          <div className="lg:col-span-8 flex flex-col justify-between relative rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-b from-[#121620] to-[#0a0d13] min-h-[520px] lg:min-h-[640px]">
            
            {/* Top Overlay: Title & Badges */}
            <div className="relative z-20 p-6 md:p-8">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-light tracking-tight text-white mb-3">
                {currentCar.title}
              </h1>

              <div className="flex flex-wrap items-center gap-2.5">
                {/* Price Pill */}
                <span className="px-3 py-1 rounded-full text-xs font-medium text-slate-300 bg-black/40 border border-white/15 backdrop-blur-md">
                  {currentCar.priceStarting}
                </span>

                {/* Category Pill */}
                <span className="px-3 py-1 rounded-full text-xs font-mono tracking-wider uppercase text-slate-400 bg-black/40 border border-white/15 backdrop-blur-md">
                  {currentCar.category}
                </span>

                {/* Reset to main hero view button if gallery card was clicked */}
                {activeMediaView !== 'hero' && !is3DMode && (
                  <button
                    onClick={() => setActiveMediaView('hero')}
                    className="px-2.5 py-1 rounded-full text-xs text-orange-400 bg-orange-950/40 border border-orange-500/40 hover:bg-orange-900/50 transition-colors"
                  >
                    &larr; Back to Exterior Showcase
                  </button>
                )}
              </div>
            </div>

            {/* Central Media Canvas (Studio Photograph or 3D Turntable) */}
            <div className="absolute inset-0 z-0">
              {is3DMode ? (
                <div className="w-full h-full pt-16">
                  <Hero3DCar currentLanguage={currentLanguage} />
                </div>
              ) : (
                <div className="relative w-full h-full overflow-hidden">
                  <img
                    src={displayImage}
                    alt={currentCar.title}
                    className="w-full h-full object-cover object-center filter brightness-95 contrast-105 transition-all duration-700"
                  />
                  {/* Subtle dark gradient overlay to ensure text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/50 pointer-events-none" />
                </div>
              )}
            </div>

            {/* Bottom-Left Overlaid Glass Description Card (Dual-Column Layout from Reference Screenshot) */}
            <div className="relative z-20 m-4 sm:m-6 md:m-8 p-5 md:p-6 rounded-2xl bg-black/50 backdrop-blur-xl border border-white/10 text-white shadow-2xl">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                
                {/* Left sub-column: Bold Teaser Quote */}
                <div className="md:col-span-5">
                  <p className="text-sm md:text-base font-semibold leading-snug tracking-tight text-slate-100">
                    {currentLanguage === 'hi' ? currentCar.headlineHi : currentCar.headline}
                  </p>
                </div>

                {/* Right sub-column: Detailed Editorial Context */}
                <div className="md:col-span-7 md:border-l md:border-white/10 md:pl-4">
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {currentLanguage === 'hi' ? currentCar.descriptionHi : currentCar.description}
                  </p>

                  <div className="mt-3 flex flex-wrap items-center gap-3 text-[11px] font-mono text-orange-400">
                    <span>Power: <strong>{currentCar.specs.power}</strong></span>
                    <span>&bull;</span>
                    <span>Turnaround: <strong>{currentCar.specs.serviceTurnaround}</strong></span>
                  </div>
                </div>

              </div>
            </div>

          </div>

          {/* RIGHT SECTION: 3 Stacked Vertical Cards with "Book a Car ↗" (Matching reference screenshot) */}
          <div className="lg:col-span-4 flex flex-col gap-4 justify-between">
            
            {/* Card 1 (Top): Interior Cockpit */}
            <div
              onClick={() => {
                setIs3DMode(false);
                setActiveMediaView('interior');
              }}
              className={`group relative h-48 sm:h-52 rounded-2xl overflow-hidden border transition-all duration-300 cursor-pointer shadow-lg ${
                activeMediaView === 'interior' && !is3DMode
                  ? 'border-orange-500 ring-2 ring-orange-500/30 scale-[1.02]'
                  : 'border-white/10 hover:border-white/30'
              }`}
            >
              <img
                src={currentCar.gallery[0].image}
                alt={currentCar.gallery[0].title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
              
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-orange-400 block">
                    {currentCar.gallery[0].badge}
                  </span>
                  <span className="text-xs font-semibold line-clamp-1">{currentCar.gallery[0].title}</span>
                </div>
                <div className="w-6 h-6 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>

            {/* Card 2 (Middle): Action Track Shot */}
            <div
              onClick={() => {
                setIs3DMode(false);
                setActiveMediaView('track');
              }}
              className={`group relative h-48 sm:h-52 rounded-2xl overflow-hidden border transition-all duration-300 cursor-pointer shadow-lg ${
                activeMediaView === 'track' && !is3DMode
                  ? 'border-orange-500 ring-2 ring-orange-500/30 scale-[1.02]'
                  : 'border-white/10 hover:border-white/30'
              }`}
            >
              <img
                src={currentCar.gallery[1].image}
                alt={currentCar.gallery[1].title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
              
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 block">
                    {currentCar.gallery[1].badge}
                  </span>
                  <span className="text-xs font-semibold line-clamp-1">{currentCar.gallery[1].title}</span>
                </div>
                <div className="w-6 h-6 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>

            {/* Card 3 (Bottom): Side Silhouette with "Book a Car ↗" Button */}
            <div
              className={`group relative h-48 sm:h-52 rounded-2xl overflow-hidden border transition-all duration-300 shadow-lg ${
                activeMediaView === 'profile' && !is3DMode
                  ? 'border-orange-500 ring-2 ring-orange-500/30'
                  : 'border-white/10 hover:border-white/30'
              }`}
            >
              <img
                src={currentCar.gallery[2].image}
                alt={currentCar.gallery[2].title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent pointer-events-none" />

              {/* The "Book a Car ↗" Bottom Overlay Bar from Reference Screenshot */}
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                <button
                  onClick={() => {
                    const el = document.getElementById('brand-estimator') || document.getElementById('booking-section');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                    if (onBookCar) onBookCar(currentCar);
                  }}
                  className="w-full py-2.5 px-4 rounded-xl bg-white/90 hover:bg-white text-slate-950 font-bold text-xs flex items-center justify-between shadow-2xl backdrop-blur-md transition-all cursor-pointer group-hover:scale-[1.02]"
                >
                  <span className="tracking-tight">
                    {currentLanguage === 'hi' ? 'सर्विस स्लॉट बुक करें' : 'Book a Car / Service'}
                  </span>
                  <div className="w-6 h-6 rounded-full bg-slate-950 text-white flex items-center justify-center">
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </button>
              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}
