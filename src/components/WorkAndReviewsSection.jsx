import React, { useState } from 'react';
import { 
  Star, Play, CheckCircle2, ShieldCheck, ArrowRight, 
  Sparkles, Car, Clock, ThumbsUp, ChevronLeft, ChevronRight, X 
} from 'lucide-react';

const PREVIOUS_WORK = [
  {
    id: 1,
    title: 'BMW 330i M-Sport — Deep Fender Dent & Scratch Restoration',
    category: 'German Booth Paint & Denting',
    car: 'BMW 3-Series 330i',
    time: '24 Hours Turnaround',
    beforeImg: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=800&auto=format&fit=crop&q=80',
    afterImg: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&auto=format&fit=crop&q=80',
    beforeDesc: 'Deep crease dent and scraped metal paint from parking collision.',
    afterDesc: 'Laser paintless dent pulled and PPG German waterborne color matched to 100% factory spec.',
    customer: 'Dr. Sameer Kapoor, Mumbai',
    costSaved: 'Saved ₹32,000 vs Dealer Estimate'
  },
  {
    id: 2,
    title: 'Hyundai Creta SX — 3-Stage Paint Correction & 9H Ceramic Glaze',
    category: 'Ceramic Coating & Detailing',
    car: 'Hyundai Creta 1.5 Diesel',
    time: '6 Hours Turnaround',
    beforeImg: 'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?w=800&auto=format&fit=crop&q=80',
    afterImg: 'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?w=800&auto=format&fit=crop&q=80',
    beforeDesc: 'Heavy swirl marks, water etching, and dull oxidized clear coat.',
    afterDesc: 'Rotary jewelling polish topped with 3 layers of hydrophobic SiO2 ceramic mirror coat.',
    customer: 'Ankit Bansal, Pune',
    costSaved: '3 Years Gloss Warranty Included'
  },
  {
    id: 3,
    title: 'Mahindra Thar 4x4 — Bilstein B6 Suspension & Brembo Brake Upgrade',
    category: 'Suspension & Braking',
    car: 'Mahindra Thar Roxx 4x4',
    time: '4 Hours Turnaround',
    beforeImg: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?w=800&auto=format&fit=crop&q=80',
    afterImg: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&auto=format&fit=crop&q=80',
    beforeDesc: 'Extreme body roll in highway curves and loud brake judder.',
    afterDesc: 'Bilstein B6 gas monotube dampers + Brembo ceramic low-dust pads installed.',
    customer: 'Col. Rajesh Randhawa, Delhi NCR',
    costSaved: 'Transformed Highway Stability'
  },
  {
    id: 4,
    title: 'Maruti Suzuki Swift — Sluggish Throttle to Razor-Sharp Tune',
    category: 'Engine & Synthetic Oiling',
    car: 'Maruti Swift 1.2 DualJet',
    time: '90 Mins Turnaround',
    beforeImg: 'https://images.unsplash.com/photo-1615906655593-ad0386982a0f?w=800&auto=format&fit=crop&q=80',
    afterImg: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=800&auto=format&fit=crop&q=80',
    beforeDesc: '18,000 KM dark sludge oil, choked air filter, and sluggish pick-up.',
    afterDesc: 'Castrol EDGE 5W-40 full synthetic flush, Bosch Laser Iridium plugs & K&N filter.',
    customer: 'Vikram Joshi, Bengaluru',
    costSaved: '+18% Fuel Mileage Boost'
  }
];

const CUSTOMER_CLIPS = [
  {
    id: 'clip-1',
    title: 'Cold Start & Deep Exhaust Note after Synthetic Service & Plugs',
    vehicle: 'Skoda Octavia vRS 245',
    duration: '0:35',
    thumbnail: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&auto=format&fit=crop&q=80',
    desc: 'Listen to the buttery smooth cold start idle after full Castrol EDGE 5W-40 oil flush and Bosch Iridium plugs.'
  },
  {
    id: 'clip-2',
    title: 'Hydrophobic Water Beading Angle Test after 9H Ceramic Glaze',
    vehicle: 'Tata Safari Dark Edition',
    duration: '0:42',
    thumbnail: 'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?w=600&auto=format&fit=crop&q=80',
    desc: 'Watch high-pressure water roll off like liquid glass with zero standing droplets.'
  },
  {
    id: 'clip-3',
    title: 'Engine Bay Steam Detailing & Computerized Sensor Check',
    vehicle: 'Honda City 1.5 i-VTEC',
    duration: '0:28',
    thumbnail: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?w=600&auto=format&fit=crop&q=80',
    desc: 'Deep de-greasing of engine block, alternator shielding, and live OBD-II diagnostic readout.'
  },
  {
    id: 'clip-4',
    title: 'Happy Customer Key Handover & Workshop Review',
    vehicle: 'Hyundai Creta SX Petrol',
    duration: '0:50',
    thumbnail: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80',
    desc: 'Customer sharing their experience on saving 50% vs authorized dealer service charges.'
  }
];

const CUSTOMER_REVIEWS = [
  {
    name: 'Vikramaditya Rathore',
    location: 'Jaipur',
    car: 'Tata Harrier XZA+ (Diesel)',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    rating: 5,
    service: 'Major Suspension & Brake Overhaul',
    text: 'Showroom quoted me ₹28,000 for suspension overhaul and clutch judder. Vortex Motors solved it for ₹14,200 with genuine parts in just 5 hours. My car drives like butter now with zero squeaks!'
  },
  {
    name: 'Pooja Iyer',
    location: 'Bengaluru',
    car: 'Hyundai Creta SX (Petrol)',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    rating: 5,
    service: 'Super Chill AC Service & Gas Top-Up',
    text: 'My AC was blowing warm air in 42°C heat. Their technician diagnosed a micro-leak in condenser in 15 mins, replaced the O-rings and refilled pure R134a. Ice cold sub-6°C cooling within 90 minutes!'
  },
  {
    name: 'Sunil Deshmukh',
    location: 'Mumbai',
    car: 'Mahindra Thar Roxx 4x4',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
    rating: 5,
    service: 'Denting & Spray Booth Painting',
    text: 'Got deep scratch and dent on my left fender after an off-road trip. Their German paint booth matched the exact Everest White shade. Impossible to tell there was ever a scratch!'
  }
];

export default function WorkAndReviewsSection() {
  const [activeWorkIndex, setActiveWorkIndex] = useState(0);
  const [activeClipModal, setActiveClipModal] = useState(null);

  const currentWork = PREVIOUS_WORK[activeWorkIndex];

  return (
    <section id="previous-work" className="relative py-20 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto border-t border-white/10">
      
      {/* Section Header */}
      <div className="max-w-3xl mb-14">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-semibold uppercase tracking-wider mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Real Workshop Results</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-3">
          Previous Work, Before/After & <span className="text-orange-500">Customer Reviews</span>
        </h2>
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
          See the tangible transformations carried out on customer vehicles in our garage: from precision paint matching to engine overhauls and ceramic glaze water-beading clips.
        </p>
      </div>

      {/* 1. Before & After Showcase Slider */}
      <div className="mb-20">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Work Transformation Showcase
            </span>
            <span className="text-xs text-orange-400 font-mono">
              ({activeWorkIndex + 1} of {PREVIOUS_WORK.length})
            </span>
          </div>

          {/* Navigation Arrows */}
          <div className="flex items-center gap-2">
            <button
              onClick={() =>
                setActiveWorkIndex((prev) => (prev > 0 ? prev - 1 : PREVIOUS_WORK.length - 1))
              }
              className="p-2 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 text-white cursor-pointer"
              title="Previous Transformation"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() =>
                setActiveWorkIndex((prev) => (prev < PREVIOUS_WORK.length - 1 ? prev + 1 : 0))
              }
              className="p-2 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 text-white cursor-pointer"
              title="Next Transformation"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Transformation Card */}
        <div className="rounded-3xl bg-[#090b10] border border-white/10 overflow-hidden shadow-2xl">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
            {/* Left: Before & After Split Photos (7 Cols) */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-1 bg-black p-2">
              
              {/* Before Photo */}
              <div className="relative aspect-4/3 rounded-xl overflow-hidden group">
                <img
                  src={currentWork.beforeImg}
                  alt="Before repair"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded bg-red-600/90 text-white text-[11px] font-bold uppercase tracking-wider">
                  BEFORE SERVICE
                </div>
                <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black via-black/80 to-transparent">
                  <p className="text-[11px] text-slate-300">
                    {currentWork.beforeDesc}
                  </p>
                </div>
              </div>

              {/* After Photo */}
              <div className="relative aspect-4/3 rounded-xl overflow-hidden group">
                <img
                  src={currentWork.afterImg}
                  alt="After repair"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded bg-emerald-600/90 text-white text-[11px] font-bold uppercase tracking-wider">
                  AFTER VORTEX REPAIR
                </div>
                <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black via-black/80 to-transparent">
                  <p className="text-[11px] text-emerald-300 font-medium">
                    {currentWork.afterDesc}
                  </p>
                </div>
              </div>

            </div>

            {/* Right: Details & Customer Case Notes (5 Cols) */}
            <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full text-[11px] font-bold uppercase bg-orange-500/15 text-orange-400 border border-orange-500/30">
                    {currentWork.category}
                  </span>
                  <span className="text-xs text-slate-400 font-mono flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-500" />
                    {currentWork.time}
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-white leading-snug">
                  {currentWork.title}
                </h3>

                <div className="space-y-2 text-xs">
                  <div className="flex items-center gap-2 text-slate-300">
                    <Car className="w-4 h-4 text-orange-400 flex-shrink-0" />
                    <span><strong>Vehicle:</strong> {currentWork.car}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span><strong>Owner:</strong> {currentWork.customer}</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-400 font-medium">
                  ✓ {currentWork.costSaved}
                </div>
              </div>

              {/* Quick Dots Switcher */}
              <div className="flex items-center justify-between pt-4 border-t border-white/5">
                <div className="flex gap-1.5">
                  {PREVIOUS_WORK.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveWorkIndex(i)}
                      className={`h-2 rounded-full transition-all cursor-pointer ${
                        activeWorkIndex === i ? 'w-8 bg-orange-500' : 'w-2 bg-white/20'
                      }`}
                    />
                  ))}
                </div>

                <a
                  href="#budget-calculator"
                  className="text-xs font-bold text-orange-400 hover:text-orange-300 flex items-center gap-1"
                >
                  <span>Calculate Similar Service &rarr;</span>
                </a>
              </div>

            </div>

          </div>

        </div>
      </div>

      {/* 2. Customer Video & Audio Clips Section */}
      <div className="mb-20 space-y-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-orange-400 block mb-1">
            Playable Garage Clips & Dyno Runs
          </span>
          <h3 className="text-2xl font-bold text-white">
            Listen to the Power & Watch the Glaze
          </h3>
          <p className="text-xs sm:text-sm text-slate-400">
            Click on any video below to hear exhaust note comparisons, ceramic water-beading tests, and customer interviews.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {CUSTOMER_CLIPS.map((clip) => (
            <div
              key={clip.id}
              onClick={() => setActiveClipModal(clip)}
              className="group rounded-2xl bg-[#090b10] border border-white/10 hover:border-orange-500/50 overflow-hidden shadow-xl transition-all hover:-translate-y-1 cursor-pointer flex flex-col justify-between"
            >
              {/* Thumbnail with Play Icon */}
              <div className="relative aspect-video overflow-hidden bg-black">
                <img
                  src={clip.thumbnail}
                  alt={clip.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-75"
                />

                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-orange-500 text-black flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                    <Play className="w-5 h-5 fill-black translate-x-0.5" />
                  </div>
                </div>

                <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/80 font-mono text-[10px] text-white">
                  {clip.duration}
                </div>
              </div>

              {/* Text info */}
              <div className="p-4 space-y-2">
                <span className="text-[10px] font-mono uppercase text-orange-400 font-bold block">
                  {clip.vehicle}
                </span>
                <h4 className="text-xs font-bold text-white group-hover:text-orange-300 line-clamp-2 leading-snug">
                  {clip.title}
                </h4>
                <p className="text-[11px] text-slate-400 line-clamp-2">
                  {clip.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Verified Customer Reviews Grid */}
      <div className="space-y-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-orange-400 block mb-1">
              Verified Feedback
            </span>
            <h3 className="text-2xl font-bold text-white">
              What Real Car Owners Say About Us
            </h3>
          </div>
          <div className="flex items-center gap-2 text-xs text-amber-400 font-bold">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="text-white font-mono">4.9 / 5.0</span>
            <span className="text-slate-400 font-normal">(420+ Google & Workshop Reviews)</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CUSTOMER_REVIEWS.map((rev, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-[#090b10] border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                {/* Rating & Service tag */}
                <div className="flex items-center justify-between">
                  <div className="flex">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                    Verified Job
                  </span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed italic">
                  "{rev.text}"
                </p>
              </div>

              {/* Author */}
              <div className="pt-4 border-t border-white/5 flex items-center gap-3">
                <img
                  src={rev.avatar}
                  alt={rev.name}
                  className="w-10 h-10 rounded-full object-cover border border-orange-500/40"
                />
                <div>
                  <h4 className="text-xs font-bold text-white leading-tight">
                    {rev.name}
                  </h4>
                  <span className="text-[10px] text-slate-400 block">
                    {rev.car} &bull; {rev.location}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Video Modal */}
      {activeClipModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-md">
          <div className="relative w-full max-w-2xl rounded-2xl bg-[#090b10] border border-orange-500/50 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono text-orange-400 uppercase tracking-widest font-bold">
                  {activeClipModal.vehicle}
                </span>
                <h3 className="text-base font-bold text-white">
                  {activeClipModal.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveClipModal(null)}
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="relative aspect-video rounded-xl overflow-hidden bg-black flex items-center justify-center">
              <img
                src={activeClipModal.thumbnail}
                alt="clip thumbnail"
                className="w-full h-full object-cover opacity-65"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 bg-black/40">
                <div className="w-16 h-16 rounded-full bg-orange-500 text-black flex items-center justify-center mb-3 shadow-2xl animate-pulse">
                  <Play className="w-8 h-8 fill-black translate-x-0.5" />
                </div>
                <span className="text-xs font-bold text-white uppercase tracking-wider">
                  Live Dyno & Workshop Audio Track Playing
                </span>
                <p className="text-[11px] text-slate-300 max-w-sm mt-1">
                  {activeClipModal.desc}
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-400 text-center">
              Recorded at Vortex Performance Workshop Pit Lane.
            </p>
          </div>
        </div>
      )}

    </section>
  );
}
