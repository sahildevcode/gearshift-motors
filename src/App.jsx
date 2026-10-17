import React, { useState } from 'react';
import VortexNavbar from './components/VortexNavbar';
import VortexPerformanceShowcase from './components/VortexPerformanceShowcase';
import BrandsEstimatorPage from './pages/BrandsEstimatorPage';
import VortexFooter from './components/VortexFooter';
import { MessageSquare, Phone } from 'lucide-react';

export default function App() {
  const [activePage, setActivePage] = useState('home'); // 'home' or 'brands'
  const [prefilledBooking, setPrefilledBooking] = useState(null);

  const navigateTo = (page) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBookService = (data) => {
    setPrefilledBooking(data);
    // If on brands page, return to home and scroll to inquiry form
    if (activePage !== 'home') {
      setActivePage('home');
    }
    setTimeout(() => {
      const element = document.getElementById('inquiry') || document.getElementById('booking-inquiry');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 150);
  };

  return (
    <div className="min-h-screen bg-[#000000] text-slate-100 selection:bg-orange-500 selection:text-black font-space">
      
      {/* 
        1. Transparent VORTEX Navbar with low default opacity on links:
        User requested: "नेविगेशन बार को ट्रांसपेरेंट रखो। जब माउस जाएगा उस पर तभी वो जो नेविगेशन बार की चीजें हैं वो हल्की सी ब्लिंक होगी। सिर्फ उनका मतलब ओपेसिटी कम रखना है।"
      */}
      <VortexNavbar
        activePage={activePage}
        onNavigate={navigateTo}
        onInquireClick={() => {
          if (activePage !== 'home') {
            setActivePage('home');
          }
          setTimeout(() => {
            const el = document.getElementById('inquiry');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }, 150);
        }}
      />

      {/* 2. Main Page Views Switcher */}
      {activePage === 'home' ? (
        /* HOME PAGE VIEW: Exact sequence matching the Navbar:
           1. HOME (Hero with massive car image & HUD telemetry)
           2. BUILDS (Motorsport weapons)
           3. PERFORMANCE (Real data telemetry waveform graph)
           4. ENGINEERING (V8 dyno specs & advantage)
           5. AERODYNAMICS (Downforce wind tunnel with clean studio car & CFD streamlines)
           6. CAR BRANDS (CTA banner to dedicated brands calculator)
           7. CONTACT (Inquiry form & hotline)
        */
        <VortexPerformanceShowcase
          onOpenBooking={handleBookService}
          onOpenBrandsPage={() => navigateTo('brands')}
        />
      ) : (
        /* DEDICATED CAR BRANDS PAGE:
           User requested: "इसके लिए एक अलग ही पेज बना दो। मैं इस बार क्लिक करके दूसरे पेज पे रीडायरेक्ट हो जाए। अभी स्क्रीन में ये दिख रहा है तो पढ़ने में और कस्टमर को भी देखने में आसानी होगी।"
        */
        <BrandsEstimatorPage
          onBackToHome={() => navigateTo('home')}
          onBookSlot={handleBookService}
        />
      )}

      {/* 3. VORTEX Footer with 'Join The Pit List' (Matching Screenshot) */}
      <VortexFooter />

      {/* Floating Bottom Action Buttons (Quick WhatsApp & Direct Call) */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
        <a
          href="https://wa.me/919876543210?text=Hello%20Vortex%20Performance%2C%20I%20want%20to%20inquire%20about%20a%20car%20build%20and%20service"
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black flex items-center justify-center shadow-2xl shadow-emerald-500/40 hover:scale-110 transition-all cursor-pointer group"
          title="Chat on WhatsApp"
        >
          <MessageSquare className="w-5 h-5 text-black group-hover:scale-110 transition-transform" />
        </a>

        <a
          href="tel:+919876543210"
          className="w-12 h-12 rounded-full bg-orange-600 hover:bg-orange-500 text-black flex items-center justify-center shadow-2xl shadow-orange-600/40 hover:scale-110 transition-all cursor-pointer"
          title="Direct Workshop Hotline"
        >
          <Phone className="w-5 h-5 text-black" />
        </a>
      </div>

    </div>
  );
}
