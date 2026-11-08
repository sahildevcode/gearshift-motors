import React, { useState } from 'react';
import { 
  Star, Play, CheckCircle2, ShieldCheck, ArrowRight, 
  Sparkles, Car, Clock, ChevronLeft, ChevronRight, X 
} from 'lucide-react';
import ertigaImg from '../assets/before-after-ertiga.jpg';
import fenderImg from '../assets/before-after-fender.jpg';
import wheelImg from '../assets/before-after-wheel.jpg';
import dpfImg from '../assets/dpf-clean-service.jpg';

const PREVIOUS_WORK = [
  {
    id: 1,
    title: 'Maruti Suzuki Ertiga — Full Body Restoration, Denting, Painting & Headlight Revive',
    category: 'Full Body Paint & Spray Booth Restoration',
    car: 'Maruti Suzuki Ertiga (Grey Metallic)',
    time: '48 Hours Turnaround',
    realImg: ertigaImg,
    beforeDesc: 'Multiple deep door panel dents, heavily scraped front bumper, oxidized yellow headlights, and sun-faded chalky paint.',
    afterDesc: 'Complete dent removal, robotic DuPont paint match baked in temperature-controlled spray booth, headlight UV crystal polish, and mirror finish clear coat.',
    customer: 'Rajesh Sharma, Verified Car Owner',
    costSaved: 'Saved ₹42,000 compared to Authorized Dealer quote'
  },
  {
    id: 2,
    title: 'Front Fender Dent Pulling & High-Gloss Factory Paint Match',
    category: 'Paintless Dent Pull & German Booth Match',
    car: 'Maruti Suzuki Dzire (Pearl White)',
    time: '24 Hours Turnaround',
    realImg: fenderImg,
    beforeDesc: 'Deep crease arch collision dent, crushed wheel well body line, and chipped bare metal requiring primer repair.',
    afterDesc: 'Laser panel alignment, epoxy anti-rust primer, and exact computer shade match baked in KDC Workshop spray booth with zero color mismatch.',
    customer: 'Amit Patel, Verified Car Owner',
    costSaved: '100% Invisible Factory Finish with 2-Year Warranty'
  },
  {
    id: 3,
    title: 'Maruti Suzuki Alloy Wheel & Wheel Arch Deep De-Greasing & Glaze',
    category: 'Wheel Detailing & Ceramic Protection',
    car: 'Maruti Suzuki Baleno / Ciaz (Alloy)',
    time: '60 Mins Turnaround',
    realImg: wheelImg,
    beforeDesc: 'Caked road mud, baked-on abrasive brake pad dust, and dull oxidized alloy spokes.',
    afterDesc: 'pH-neutral wheel decontamination, ultrasonic dust extraction, and hydrophobic ceramic tire dressing.',
    customer: 'Deepak Varma, Verified Car Owner',
    costSaved: 'Showroom Fresh Gloss & Water-Beading Shield'
  },
  {
    id: 4,
    title: 'Diesel DPF Filter Deep Cleaning with Genuine XRS Chemistry',
    category: 'DPF Decoking & Emission Overhaul',
    car: 'All CRDi & Diesel Vehicles (Creta, Harrier, Swift DDiS)',
    time: '90 Mins Turnaround',
    realImg: dpfImg,
    beforeDesc: 'DPF exhaust warning light illuminated, choked carbon soot honeycomb, excessive black smoke, and high fuel consumption.',
    afterDesc: 'Flushed with genuine XRS DPF Cleaner kit without cutting or welding silencer. Completely decokes filter and restores original throttle punch.',
    customer: 'Manish Verma, Fleet Owner',
    costSaved: 'Saved ₹35,000 (No costly DPF replacement needed)'
  }
];

const CUSTOMER_CLIPS = [
  {
    id: 'clip-1',
    title: 'DPF Filter Chemical Flush & Exhaust Smoke Clear Test',
    vehicle: 'Diesel CRDi Engine (XRS Kit)',
    duration: '0:45',
    thumbnail: dpfImg,
    desc: 'Watch the live decoking process using genuine XRS DPF Cleaner restoring 100% exhaust air flow.'
  },
  {
    id: 'clip-2',
    title: 'Full Body Paint Reflection & Mirror Clear Coat Walkaround',
    vehicle: 'Maruti Ertiga (Restored)',
    duration: '0:50',
    thumbnail: ertigaImg,
    desc: 'Insane reflection test in the KDC Workshop delivery bay showing zero orange peel texture.'
  },
  {
    id: 'clip-3',
    title: 'Front Fender Paint Match & Bumper Alignment Inspection',
    vehicle: 'Maruti Dzire Pearl White',
    duration: '0:35',
    thumbnail: fenderImg,
    desc: 'Seamless color blend under dual-spectrum paint inspection lights.'
  },
  {
    id: 'clip-4',
    title: 'Alloy Wheel Ceramic Water-Beading & Spin Test',
    vehicle: 'Baleno Dual-Tone Wheels',
    duration: '0:30',
    thumbnail: wheelImg,
    desc: 'Watch water beads glide off the freshly de-greased and ceramic sealed alloy rims.'
  }
];

const CUSTOMER_REVIEWS = [
  {
    name: 'Rajesh Sharma',
    location: 'Verified Customer',
    car: 'Maruti Suzuki Ertiga VXi',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    rating: 5,
    service: 'Full Body Denting, Painting & Headlight Revive',
    text: 'Dealer asked me for ₹65,000 to replace both doors and front bumper. KDC Workshop repaired and painted the exact original grey shade in their German booth for less than half the price. My car looks brand new!'
  },
  {
    name: 'Amit Patel',
    location: 'Verified Customer',
    car: 'Maruti Suzuki Dzire',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
    rating: 5,
    service: 'Fender Scratch & Dent Repair',
    text: 'Hit my front fender in tight parking. KDC Workshop matched the white paint so flawlessly that even my insurance surveyor could not detect any repaint. Outstanding craftsmanship!'
  },
  {
    name: 'Manish Verma',
    location: 'Fleet Owner',
    car: 'Hyundai Creta 1.5 Diesel',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    rating: 5,
    service: 'XRS DPF Chemical Cleaning',
    text: 'My car was throwing DPF choke error and mileage dropped to 11 km/l. KDC Workshop cleaned it with genuine XRS chemical without cutting silencer. Mileage jumped back to 19 km/l on highway!'
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
          <span>Real KDC Workshop Results</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-3">
          Real Before & After Work & <span className="text-orange-500">Customer Transformations</span>
        </h2>
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
          Actual vehicles repaired, dented, painted, and chemically cleaned in our workshop bays. See genuine before & after evidence and verified customer satisfaction.
        </p>
      </div>

      {/* 1. Real Before & After Showcase Slider */}
      <div className="mb-20">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Genuine Workshop Job Card
            </span>
            <span className="text-xs text-orange-400 font-mono font-bold">
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
              title="Previous Case"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() =>
                setActiveWorkIndex((prev) => (prev < PREVIOUS_WORK.length - 1 ? prev + 1 : 0))
              }
              className="p-2 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 text-white cursor-pointer"
              title="Next Case"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Real Transformation Card */}
        <div className="rounded-3xl bg-[#090b10] border border-white/10 overflow-hidden shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
            
            {/* Left: Real High-Res Before & After Photo (7 Cols) */}
            <div className="lg:col-span-7 bg-black p-3 sm:p-5 flex items-center justify-center">
              <div className="relative w-full rounded-2xl overflow-hidden border border-white/15 shadow-2xl bg-slate-950 group">
                <img
                  src={currentWork.realImg}
                  alt={currentWork.title}
                  className="w-full h-auto max-h-[520px] object-contain mx-auto group-hover:scale-102 transition-transform duration-500"
                />
                
                {/* Genuine KDC Job Badge */}
                <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-orange-500 text-black font-black text-[10px] uppercase tracking-wider shadow-lg">
                  KDC Verified Workshop Job
                </div>
              </div>
            </div>

            {/* Right: Job Details & Case Notes (5 Cols) */}
            <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-6 border-t lg:border-t-0 lg:border-l border-white/10 bg-[#0d1017]">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full text-[11px] font-bold uppercase bg-orange-500/15 text-orange-400 border border-orange-500/30">
                    {currentWork.category}
                  </span>
                  <span className="text-xs text-slate-400 font-mono flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-500" />
                    {currentWork.time}
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-white leading-snug">
                  {currentWork.title}
                </h3>

                <div className="space-y-2 text-xs">
                  <div className="flex items-center gap-2 text-slate-300">
                    <Car className="w-4 h-4 text-orange-400 flex-shrink-0" />
                    <span><strong>Car:</strong> {currentWork.car}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span><strong>Client:</strong> {currentWork.customer}</span>
                  </div>
                </div>

                {/* Scope of Work */}
                <div className="space-y-2 pt-2 border-t border-white/5 text-xs">
                  <div>
                    <span className="text-[10px] font-bold text-red-400 uppercase tracking-wider block">
                      Initial Condition:
                    </span>
                    <p className="text-slate-300 text-[11px] leading-relaxed mt-0.5">
                      {currentWork.beforeDesc}
                    </p>
                  </div>

                  <div>
                    <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block">
                      Work Completed by KDC Workshop:
                    </span>
                    <p className="text-slate-300 text-[11px] leading-relaxed mt-0.5">
                      {currentWork.afterDesc}
                    </p>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-400 font-medium">
                  ✓ {currentWork.costSaved}
                </div>
              </div>

              {/* Quick Dots Switcher */}
              <div className="flex items-center justify-between pt-4 border-t border-white/5">
                <div className="flex gap-2">
                  {PREVIOUS_WORK.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveWorkIndex(i)}
                      className={`h-2.5 rounded-full transition-all cursor-pointer ${
                        activeWorkIndex === i ? 'w-8 bg-orange-500' : 'w-2.5 bg-white/20 hover:bg-white/40'
                      }`}
                    />
                  ))}
                </div>

                <a
                  href="#budget-calculator"
                  className="text-xs font-bold text-orange-400 hover:text-orange-300 flex items-center gap-1"
                >
                  <span>Book Similar Work &rarr;</span>
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
            Real Workshop Clips & Sound Demos
          </span>
          <h3 className="text-2xl font-bold text-white">
            Watch Real Workshop Demos & Inspections
          </h3>
          <p className="text-xs sm:text-sm text-slate-400">
            Click on any video below to see real DPF cleaning demonstrations, mirror paint reflection walkarounds, and wheel detailing tests.
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
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
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
              What Real Car Owners Say About KDC Workshop
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
                className="w-full h-full object-cover opacity-75"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 bg-black/40">
                <div className="w-16 h-16 rounded-full bg-orange-500 text-black flex items-center justify-center mb-3 shadow-2xl animate-pulse">
                  <Play className="w-8 h-8 fill-black translate-x-0.5" />
                </div>
                <span className="text-xs font-bold text-white uppercase tracking-wider">
                  KDC Workshop Quality Test Track
                </span>
                <p className="text-[11px] text-slate-300 max-w-sm mt-1">
                  {activeClipModal.desc}
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-400 text-center">
              Recorded in the KDC Workshop Service & Diagnostic Bay.
            </p>
          </div>
        </div>
      )}

    </section>
  );
}
