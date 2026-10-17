import React from 'react';
import { Star, ShieldCheck, CheckCircle2, Clock, MapPin, User, ThumbsUp, Activity } from 'lucide-react';
import { WORKSHOP_STATS } from '../data/servicesData';

export default function ReviewsAndStatus({ currentLanguage = 'en' }) {
  const REVIEWS = [
    {
      name: 'Vikramaditya Rathore',
      car: 'Tata Harrier XZA+ (Diesel)',
      rating: 5,
      date: '3 days ago',
      text: 'Showroom quoted me ₹28,000 for suspension overhaul and clutch judder. Apex AutoCraft fixed it in ₹14,500 using genuine parts in just 5 hours. My car drives like butter now. 100% recommended!',
      service: 'Major Suspension & Clutch Overhaul'
    },
    {
      name: 'Pooja Iyer',
      car: 'Hyundai Creta SX (Petrol)',
      rating: 5,
      date: '1 week ago',
      text: 'My AC was blowing warm air in 42°C heat. Their technician diagnosed a micro-leak in condenser in 15 mins, replaced the O-rings and refilled pure gas. Ice cold cooling within 90 minutes!',
      service: 'Super Chill AC Service'
    },
    {
      name: 'Sunil Deshmukh',
      car: 'Mahindra Thar Roxx 4x4',
      rating: 5,
      date: '2 weeks ago',
      text: 'Got deep scratch and dent on my left fender after an off-road trip. Their German paint booth matched the exact Everest White shade. Impossible to tell there was ever a scratch!',
      service: 'Denting & Spray Booth Painting'
    },
    {
      name: 'Arjun Mehta',
      car: 'BMW 3-Series 320d',
      rating: 5,
      date: '3 weeks ago',
      text: 'First time visited an independent workshop for my BMW. Outstanding computerized scanning diagnostic. They gave video updates on WhatsApp for every step. Far superior to dealer experience!',
      service: 'German Diagnostic & Brake Service'
    }
  ];

  const LIVE_BAYS = [
    { bay: 'Bay 01 (Hydraulic Lift)', car: 'Tata Safari', work: 'Periodic 20K Service', progress: '85%', status: 'Finishing Wash', color: 'bg-emerald-500' },
    { bay: 'Bay 02 (Spray Booth)', car: 'Kia Seltos', work: 'Fender Scratch Painting', progress: '90%', status: 'Baking Clear Coat', color: 'bg-cyan-500' },
    { bay: 'Bay 03 (Engine Lab)', car: 'Mahindra XUV700', work: 'ECU Sensor Scanning', progress: '50%', status: 'Live Telemetry', color: 'bg-amber-500' },
    { bay: 'Bay 04 (Express Ramp)', car: 'Maruti Brezza', work: 'Synthetic Oil & Filters', progress: '100%', status: 'Ready for Delivery', color: 'bg-emerald-400' },
  ];

  return (
    <section id="reviews" className="relative py-20 px-4 md:px-8 max-w-7xl mx-auto">
      {/* Workshop Telemetry / Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-20">
        {WORKSHOP_STATS.map((stat, i) => (
          <div
            key={i}
            className="p-6 rounded-3xl border border-slate-800 bg-gradient-to-b from-slate-900/80 to-slate-950/80 backdrop-blur-xl text-center shadow-lg hover:border-orange-500/30 transition-all"
          >
            <div className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300 mb-1">
              {stat.value}
            </div>
            <div className="text-xs text-slate-400 font-medium">
              {currentLanguage === 'hi' ? stat.labelHi : stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* Live Workshop Floor Status Tracker */}
      <div className="rounded-3xl border border-slate-800 bg-gradient-to-b from-slate-900 to-slate-950 p-6 md:p-8 mb-20 shadow-2xl relative overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-orange-500/20 border border-orange-500/30 flex items-center justify-center">
              <Activity className="w-5 h-5 text-orange-400 animate-pulse" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                {currentLanguage === 'hi' ? 'लाइव वर्कशॉप बे स्टेटस' : 'Live Workshop Service Bay Status'}
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                {currentLanguage === 'hi' ? 'वास्तविक समय में हमारे रैंप और बे पर चल रहे काम की स्थिति' : 'Real-time telemetry of active vehicles currently being serviced in workshop bays'}
              </p>
            </div>
          </div>
          <div className="text-right">
            <span className="text-[10px] font-mono text-slate-500 block uppercase">Average Wait Time</span>
            <span className="text-sm font-bold text-emerald-400">0 Mins (Instant Check-in)</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {LIVE_BAYS.map((b, i) => (
            <div key={i} className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800/80 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-1">
                  <span>{b.bay}</span>
                  <span className="text-orange-400 font-bold">{b.progress}</span>
                </div>
                <h4 className="text-sm font-bold text-white mb-0.5">{b.car}</h4>
                <p className="text-xs text-slate-400 mb-3">{b.work}</p>
              </div>

              <div>
                {/* Progress bar */}
                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden mb-2">
                  <div className={`h-full ${b.color} transition-all duration-500`} style={{ width: b.progress }} />
                </div>
                <span className="text-[10px] font-semibold text-slate-300 block">
                  Status: <span className="text-emerald-400">{b.status}</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Customer Reviews Section */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-mono uppercase tracking-widest mb-3">
          <Star className="w-3.5 h-3.5 fill-amber-400" />
          {currentLanguage === 'hi' ? 'ग्राहकों की सच्ची समीक्षाएं' : 'Verified Owner Testimonials'}
        </div>
        <h2 className="text-3xl md:text-4xl font-black text-white mb-3">
          {currentLanguage === 'hi' ? '3,400+ कार मालिकों का भरोसा' : 'Trusted by 3,400+ Car Enthusiasts & Families'}
        </h2>
        <p className="text-slate-400 text-xs md:text-sm">
          {currentLanguage === 'hi'
            ? 'हमारे ग्राहकों द्वारा दिए गए गूगल और फेसबुक रेटिंग और वास्तविक अनुभव।'
            : 'Read unvarnished feedback from everyday drivers, fleet managers, and luxury car owners.'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {REVIEWS.map((rev, i) => (
          <div
            key={i}
            className="p-6 rounded-3xl border border-slate-800 bg-gradient-to-b from-slate-900/70 to-slate-950/70 backdrop-blur-xl shadow-xl flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-1">
                  {[...Array(rev.rating)].map((_, idx) => (
                    <Star key={idx} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-[11px] font-mono text-slate-500">{rev.date}</span>
              </div>

              <p className="text-xs md:text-sm text-slate-300 leading-relaxed mb-4 italic">
                "{rev.text}"
              </p>
            </div>

            <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-white">{rev.name}</h4>
                <span className="text-[11px] text-orange-400 font-mono">{rev.car}</span>
              </div>
              <span className="text-[10px] px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 font-mono">
                {rev.service}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
