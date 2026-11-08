import React, { useState } from 'react';
import { ArrowRight, Phone, Mail, MapPin } from 'lucide-react';
import BudgetCalculator from './BudgetCalculator';
import FeaturedPartsSection from './FeaturedPartsSection';
import BookingSection from './BookingSection';
import WorkAndReviewsSection from './WorkAndReviewsSection';
import kdBannerTop from '../assets/kd-banner-top.jpg';

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
      {/* 1. HERO SECTION: OFFICIAL KD WORKSHOP BILLBOARD SHOWCASE      */}
      {/* Responsive aspect-ratio layout: zero cut, zero stretch        */}
      {/* ============================================================== */}
      <section id="hero" className="relative w-full bg-[#030406] border-b border-white/10 pt-24 sm:pt-28 pb-8 sm:pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Master Framed Banner Display - Responsive Aspect-Ratio Layout, Zero Cut, Zero Stretch */}
          <div
            className="relative w-full rounded-2xl sm:rounded-3xl border border-white/15 bg-black shadow-2xl shadow-orange-500/10 flex items-center justify-center transition-all duration-300"
            style={{
              aspectRatio: '1024 / 337'
            }}
          >
            <img
              src={kdBannerTop}
              alt="KD Workshop - Professional DPF Chemical Cleaning with XRS"
              className="w-full h-full object-contain rounded-2xl sm:rounded-3xl block"
            />
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
                  <strong>service@kdworkshop.com</strong>
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
