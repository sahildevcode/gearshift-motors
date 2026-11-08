import React, { useState } from 'react';
import { 
  ArrowRight, ShieldCheck, Clock, Wrench, CheckCircle2, 
  Phone, Mail, MapPin, Calendar, ShoppingBag, Sparkles, Car 
} from 'lucide-react';
import BudgetCalculator from './BudgetCalculator';
import FeaturedPartsSection from './FeaturedPartsSection';
import BookingSection from './BookingSection';
import WorkAndReviewsSection from './WorkAndReviewsSection';

export default function VortexPerformanceShowcase({ 
  onOpenBooking, 
  onOpenBrandsPage, 
  onNavigateToParts, 
  onSelectProduct,
  prefilledBookingData 
}) {
  const [activeBookingPrefill, setActiveBookingPrefill] = useState(prefilledBookingData || null);

  const handleCalculatorBooking = (data) => {
    setActiveBookingPrefill(data);
    setTimeout(() => {
      const el = document.getElementById('booking-section');
      if (el) {
        if (window.lenis) {
          window.lenis.scrollTo(el, { offset: -60, duration: 1.0 });
        } else {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }, 100);
  };

  return (
    <div className="relative bg-[#000000] text-white selection:bg-orange-500 selection:text-black">
      
      {/* ============================================================== */}
      {/* 1. HERO SECTION: PRACTICAL AUTOMOTIVE WORKSHOP & SPARES        */}
      {/* ============================================================== */}
      <section id="hero" className="relative min-h-[90vh] flex flex-col justify-between pt-28 sm:pt-36 pb-12 overflow-hidden w-full border-b border-white/10">
        
        {/* Workshop / Car Background with Dark Vignette */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1486006920555-c77dce18193b?w=2200&auto=format&fit=crop&q=85"
            alt="Vortex Car Workshop"
            className="w-full h-full object-cover object-center brightness-[0.45] contrast-[1.1]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-black/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/80" />
          <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-orange-600/10 blur-[150px] rounded-full" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-8 lg:px-12 flex-1 flex flex-col justify-center">
          
          <div className="max-w-2xl space-y-6 text-left py-4">
            
            {/* Top Tagline Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/15 border border-orange-500/30 text-orange-400 text-xs font-semibold uppercase tracking-wider">
              <Wrench className="w-3.5 h-3.5" />
              <span>Certified Multi-Brand Automotive Workshop & Spares</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight leading-[1.05] text-white">
              PRECISION SERVICE. <br />
              HONEST PRICING. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-amber-400 to-yellow-400">
                GENUINE SPARES.
              </span>
            </h1>

            {/* Description */}
            <p className="text-slate-300 text-sm sm:text-base tracking-wide leading-relaxed max-w-xl">
              From 100% synthetic engine oiling and 3D wheel alignment to 3-layer ceramic glazing and genuine OEM spare parts. Free doorstep pick & drop, live WhatsApp video updates, and zero advance payment.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#booking-section"
                className="py-3.5 px-7 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-black font-extrabold text-xs uppercase tracking-wider shadow-xl shadow-orange-500/25 hover:scale-105 transition-all flex items-center gap-2"
              >
                <Calendar className="w-4 h-4 fill-black" />
                <span>Book Service Appointment</span>
                <ArrowRight className="w-3.5 h-3.5 stroke-[3]" />
              </a>

              <a
                href="#budget-calculator"
                className="py-3.5 px-6 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-white font-bold text-xs uppercase tracking-wider hover:border-orange-500/50 transition-all flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-orange-400" />
                <span>Calculate Service Budget</span>
              </a>

              <button
                onClick={onNavigateToParts}
                className="py-3.5 px-6 rounded-xl bg-black/60 hover:bg-black/90 border border-white/20 text-slate-200 hover:text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4 text-orange-400" />
                <span>Browse Spare Parts (35+)</span>
              </button>
            </div>

            {/* Direct Car Brands Selector Link */}
            <div className="pt-2 max-w-lg">
              <button
                onClick={onOpenBrandsPage}
                className="w-full p-3.5 rounded-xl bg-black/70 hover:bg-black/90 backdrop-blur-md border border-white/15 hover:border-orange-500/60 flex items-center justify-between text-left transition-all cursor-pointer group/btn"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">🚗</span>
                  <div>
                    <span className="text-xs font-bold text-white group-hover/btn:text-orange-400 block">
                      CHECK SPECIFIC RATES FOR YOUR CAR BRAND
                    </span>
                    <span className="text-[11px] text-slate-400">
                      Maruti, Hyundai, Tata, Mahindra, Toyota, BMW, Mercedes rates &rarr;
                    </span>
                  </div>
                </div>
                <div className="w-7 h-7 rounded-full bg-orange-500 text-black flex items-center justify-center font-bold flex-shrink-0 group-hover/btn:scale-110 transition-transform">
                  <ArrowRight className="w-3.5 h-3.5 stroke-[3]" />
                </div>
              </button>
            </div>

          </div>

        </div>

        {/* 4 Practical Trust Pillars Bar on Hero Footer */}
        <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-8 lg:px-12 pt-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 border-t border-white/10 pt-6">
            
            <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/5">
              <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-400 flex-shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-bold text-white block">90-Min Service</span>
                <span className="text-[10px] text-slate-400">Express Turnaround</span>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/5">
              <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-400 flex-shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-bold text-white block">100% Genuine OEM</span>
                <span className="text-[10px] text-slate-400">Official Parts Warranty</span>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/5">
              <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-400 flex-shrink-0">
                <Car className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-bold text-white block">Free Pick & Drop</span>
                <span className="text-[10px] text-slate-400">Doorstep Convenience</span>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/5">
              <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-400 flex-shrink-0">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-bold text-white block">Zero Advance Pay</span>
                <span className="text-[10px] text-slate-400">Pay After Satisfaction</span>
              </div>
            </div>

          </div>
        </div>

      </section>

      {/* ============================================================== */}
      {/* 2. CORE FEATURE: DYNAMIC BUDGET CALCULATOR WITH ADD TO CART    */}
      {/* ============================================================== */}
      <BudgetCalculator onSelectBookingSlot={handleCalculatorBooking} />

      {/* ============================================================== */}
      {/* 3. CORE FEATURE: APPOINTMENT BOOKING OPTION                    */}
      {/* ============================================================== */}
      <BookingSection prefilledData={activeBookingPrefill} />

      {/* ============================================================== */}
      {/* 4. CORE FEATURE: 4-5 FEATURED SPARE PARTS (STORE TEASER)       */}
      {/* ============================================================== */}
      <FeaturedPartsSection
        onNavigateToStore={onNavigateToParts}
        onSelectProduct={onSelectProduct}
      />

      {/* ============================================================== */}
      {/* 5. CORE FEATURE: PREVIOUS WORK, REVIEWS & SHORT CLIPS          */}
      {/* ============================================================== */}
      <WorkAndReviewsSection />

      {/* ============================================================== */}
      {/* 6. MULTI-BRAND PRICING ESTIMATOR CALLOUT BANNER               */}
      {/* ============================================================== */}
      <section className="py-16 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto border-t border-white/10">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#0c0f17] via-[#121622] to-[#0c0f17] border border-orange-500/30 shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8 space-y-3">
              <span className="text-xs uppercase font-bold text-orange-400 tracking-wider block">
                Multi-Brand Car Rate Matrix
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                Want Transparent Rates For Your Specific Car Brand?
              </h2>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-xl">
                Maruti Suzuki, Hyundai, Tata, Mahindra 4x4, Toyota, Honda, BMW or Mercedes? Click below to explore standard vs showroom dealer rates, guaranteed turnaround times, and genuine part warranties on our brand estimator page.
              </p>
              <div className="flex flex-wrap gap-2 pt-2 text-xs text-slate-400">
                <span className="px-2.5 py-1 rounded bg-black/60 border border-white/10">Maruti Suzuki</span>
                <span className="px-2.5 py-1 rounded bg-black/60 border border-white/10">Hyundai</span>
                <span className="px-2.5 py-1 rounded bg-black/60 border border-white/10">Tata Motors</span>
                <span className="px-2.5 py-1 rounded bg-black/60 border border-white/10">Mahindra 4x4</span>
                <span className="px-2.5 py-1 rounded bg-black/60 border border-white/10">Toyota</span>
                <span className="px-2.5 py-1 rounded bg-black/60 border border-white/10">BMW / Mercedes</span>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col gap-3">
              <button
                onClick={onOpenBrandsPage}
                className="w-full py-4 px-6 rounded-xl bg-orange-500 hover:bg-orange-600 text-black font-extrabold text-xs uppercase tracking-wider shadow-xl shadow-orange-500/25 hover:scale-105 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Open Brand Pricing Page</span>
                <ArrowRight className="w-4 h-4 stroke-[3]" />
              </button>
              <span className="text-[11px] text-center text-slate-400">
                Zero Hidden Charges &bull; Genuine OEM Warranty
              </span>
            </div>

          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 7. WORKSHOP CONTACT, HOTLINE & LOCATION                        */}
      {/* ============================================================== */}
      <section id="contact" className="py-20 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto border-t border-white/10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          <div className="lg:col-span-5 space-y-4">
            <span className="text-xs font-bold uppercase text-orange-400 tracking-wider block">
              Workshop Location & Assistance
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Visit Our Garage or <span className="text-orange-500">Call Us Anytime</span>
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              Have an urgent breakdown, brake noise, or scheduled service query? Our master service advisors are available 7 days a week to inspect your car and answer your questions.
            </p>

            <div className="space-y-3 pt-4 text-xs font-medium">
              <div className="flex items-center gap-3 text-slate-200">
                <div className="w-8 h-8 rounded-lg bg-orange-500/20 text-orange-400 flex items-center justify-center">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase">Direct Hotline</span>
                  <strong>+91 98765 43210 / 011-4567-8900</strong>
                </div>
              </div>

              <div className="flex items-center gap-3 text-slate-200">
                <div className="w-8 h-8 rounded-lg bg-orange-500/20 text-orange-400 flex items-center justify-center">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase">Email Support</span>
                  <strong>service@vortexperformance.com</strong>
                </div>
              </div>

              <div className="flex items-center gap-3 text-slate-200">
                <div className="w-8 h-8 rounded-lg bg-orange-500/20 text-orange-400 flex items-center justify-center">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase">Central Workshop</span>
                  <strong>Plot 42, Auto Hub Avenue, Industrial Area Phase II</strong>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-[#090b10] border border-white/10 space-y-4 shadow-xl">
            <h3 className="text-lg font-bold text-white">Workshop Operating Hours</h3>
            
            <div className="divide-y divide-white/5 text-xs">
              <div className="flex justify-between py-2.5">
                <span className="text-slate-400">Monday - Friday</span>
                <span className="text-white font-mono font-bold">8:30 AM - 8:00 PM</span>
              </div>
              <div className="flex justify-between py-2.5">
                <span className="text-slate-400">Saturday</span>
                <span className="text-white font-mono font-bold">8:30 AM - 7:30 PM</span>
              </div>
              <div className="flex justify-between py-2.5">
                <span className="text-slate-400">Sunday</span>
                <span className="text-orange-400 font-mono font-bold">9:00 AM - 4:00 PM (Emergency & Express)</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-black/60 border border-white/10 text-xs text-slate-300 space-y-2">
              <span className="text-orange-400 font-bold block">🚗 Free Doorstep Pick & Drop Service</span>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Live within a 15 KM radius? Book a morning slot and our insured driver will pick up your car from your residence or office, complete the service, and return it washed and sanitized before 6 PM.
              </p>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
