import React, { useState } from 'react';
import { DIAGNOSTIC_SYMPTOMS } from '../data/servicesData';
import { AlertTriangle, Cpu, CheckCircle2, Clock, Wrench, ShieldAlert, ArrowRight, Zap, Info } from 'lucide-react';

export default function Interactive3DDiagnostics({ onSelectSymptom, currentLanguage = 'en' }) {
  const [selectedSymptom, setSelectedSymptom] = useState(DIAGNOSTIC_SYMPTOMS[0]);

  const handlePickSymptom = (symptom) => {
    setSelectedSymptom(symptom);
    if (onSelectSymptom) {
      onSelectSymptom(symptom);
    }
  };

  return (
    <section id="diagnostic-bay" className="relative py-20 px-4 md:px-8 max-w-7xl mx-auto">
      {/* Glow accent */}
      <div className="absolute top-1/2 right-1/4 w-[500px] h-[300px] bg-red-600/10 blur-[140px] pointer-events-none rounded-full" />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-mono uppercase tracking-widest mb-4">
          <Cpu className="w-4 h-4" />
          {currentLanguage === 'hi' ? '3D कार लक्षण & डायग्नोस्टिक लैब' : 'Smart Car Symptom Diagnostic Lab'}
        </div>
        <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-4">
          {currentLanguage === 'hi' ? (
            <>
              कार में कोई <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-orange-400 to-amber-300">आवाज या परेशानी</span> है? तुरंत जांचें
            </>
          ) : (
            <>
              Hear a Weird Sound? <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-orange-400 to-amber-300">Instant AI Diagnosis</span>
            </>
          )}
        </h2>
        <p className="text-slate-400 text-sm md:text-base leading-relaxed">
          {currentLanguage === 'hi'
            ? 'नीचे दिए गए लक्षणों में से अपनी कार की समस्या चुनें। हमारी लैब आपको सही कारण, रिपेयरिंग और खर्च का सटीक अंदाजा बताएगी।'
            : 'Select what your car is experiencing below to see the root cause, risk severity, exact repair protocol, and transparent pricing.'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Symptom Pickers (Left Column) */}
        <div className="lg:col-span-5 space-y-3">
          <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
            {currentLanguage === 'hi' ? 'कार की समस्या / लक्षण चुनें:' : 'Select Common Symptoms:'}
          </label>

          {DIAGNOSTIC_SYMPTOMS.map((sym) => {
            const isPicked = selectedSymptom.id === sym.id;
            return (
              <div
                key={sym.id}
                onClick={() => handlePickSymptom(sym)}
                className={`cursor-pointer p-4 rounded-2xl border transition-all flex items-start gap-3 ${
                  isPicked
                    ? 'bg-slate-900 border-red-500 shadow-xl shadow-red-500/10 scale-[1.02]'
                    : 'bg-slate-900/50 border-slate-800 hover:border-slate-700 hover:bg-slate-850'
                }`}
              >
                <div className="p-2 rounded-xl bg-slate-800/80 border border-slate-700 mt-0.5 flex-shrink-0">
                  <AlertTriangle className={`w-4 h-4 ${isPicked ? 'text-red-400' : 'text-slate-400'}`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-xs font-mono text-slate-500">{sym.part}</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full border font-mono ${sym.urgencyColor}`}>
                      {sym.urgency} Urgency
                    </span>
                  </div>
                  <h4 className={`text-sm font-bold ${isPicked ? 'text-white' : 'text-slate-300'}`}>
                    {currentLanguage === 'hi' ? sym.titleHi : sym.title}
                  </h4>
                </div>
              </div>
            );
          })}
        </div>

        {/* Diagnosis & Prescription Card (Right Column) */}
        <div className="lg:col-span-7">
          <div className="rounded-3xl border border-slate-800 bg-gradient-to-b from-slate-900/95 via-slate-950/95 to-slate-950/95 backdrop-blur-xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
            
            {/* Top scanning HUD line */}
            <div className="scanner-line opacity-30" />

            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
              <div>
                <span className="text-[11px] font-mono text-red-400 uppercase tracking-widest flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5" />
                  {currentLanguage === 'hi' ? 'डायग्नोस्टिक लैब परिणाम' : 'Diagnostic Telemetry Scan'}
                </span>
                <h3 className="text-xl md:text-2xl font-bold text-white mt-1">
                  {currentLanguage === 'hi' ? selectedSymptom.titleHi : selectedSymptom.title}
                </h3>
              </div>
              <div className="text-right">
                <span className="text-[10px] uppercase font-mono text-slate-500 block">Affected Part</span>
                <span className="text-sm font-bold text-amber-400">{selectedSymptom.part}</span>
              </div>
            </div>

            {/* Root Cause & Recommended Action */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800">
                <span className="text-xs font-mono text-red-400 uppercase tracking-wider flex items-center gap-1 mb-2">
                  <Info className="w-3.5 h-3.5" />
                  {currentLanguage === 'hi' ? 'संभावित कारण (Root Cause):' : 'Probable Root Cause:'}
                </span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {selectedSymptom.cause}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800">
                <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider flex items-center gap-1 mb-2">
                  <Wrench className="w-3.5 h-3.5" />
                  {currentLanguage === 'hi' ? 'सलाह व समाधान (Fix):' : 'Certified Repair Action:'}
                </span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {selectedSymptom.solution}
                </p>
              </div>
            </div>

            {/* Price & Turnaround Summary */}
            <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-950 border border-slate-800 mb-6">
              <div>
                <span className="text-[11px] text-slate-400 block mb-0.5">
                  {currentLanguage === 'hi' ? 'अनुमानित रिपेयर खर्च' : 'Estimated Repair Cost'}
                </span>
                <span className="text-2xl font-black text-amber-400">
                  {selectedSymptom.estimatedCost}
                </span>
              </div>

              <div>
                <span className="text-[11px] text-slate-400 block mb-0.5">
                  {currentLanguage === 'hi' ? 'सर्विस समय' : 'Estimated Time'}
                </span>
                <div className="flex items-center gap-1 text-lg font-bold text-cyan-400">
                  <Clock className="w-4 h-4" />
                  <span>{selectedSymptom.timeRequired}</span>
                </div>
              </div>

              <div className="text-right">
                <span className="text-[11px] text-slate-400 block mb-0.5">
                  {currentLanguage === 'hi' ? 'वारंटी' : 'Parts Warranty'}
                </span>
                <span className="text-xs font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-800 px-2.5 py-1 rounded-lg inline-block">
                  6 Months Guarantee
                </span>
              </div>
            </div>

            {/* Action CTA */}
            <button
              onClick={() => {
                const el = document.getElementById('booking-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-red-600 via-orange-600 to-amber-600 text-white font-bold text-sm tracking-wide shadow-lg shadow-red-600/25 hover:shadow-red-600/40 hover:scale-[1.01] transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>
                {currentLanguage === 'hi'
                  ? 'इस समस्या के लिए मैकेनिक स्लॉट बुक करें'
                  : 'Book Diagnostic Checkup for This Issue'}
              </span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
