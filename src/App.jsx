import React, { useState } from 'react';
import SmoothScrollProvider from './components/SmoothScrollProvider';
import { CartProvider, useCart } from './context/CartContext';
import VortexNavbar from './components/VortexNavbar';
import VortexPerformanceShowcase from './components/VortexPerformanceShowcase';
import PartsStorePage from './pages/PartsStorePage';
import ProductDetailPage from './pages/ProductDetailPage';
import BrandsEstimatorPage from './pages/BrandsEstimatorPage';
import CartDrawer from './components/CartDrawer';
import VortexFooter from './components/VortexFooter';
import { MessageSquare, Phone, CheckCircle2 } from 'lucide-react';

function AppContent() {
  // Navigation states: 'home' | 'parts' | 'product' | 'brands'
  const [activePage, setActivePage] = useState('home');
  const [selectedProductId, setSelectedProductId] = useState('brembo-ceramic-brake-pads');
  const [prefilledBooking, setPrefilledBooking] = useState(null);

  const { toastMessage, setIsCartOpen } = useCart();

  const navigateTo = (page, productId = null) => {
    setActivePage(page);
    if (productId) {
      setSelectedProductId(productId);
    }
    if (window.lenis) {
      window.lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSelectProduct = (id) => {
    navigateTo('product', id);
  };

  const handleBookService = (data) => {
    setPrefilledBooking(data);
    if (activePage !== 'home') {
      setActivePage('home');
    }
    setTimeout(() => {
      const element = document.getElementById('booking-section');
      if (element) {
        if (window.lenis) {
          window.lenis.scrollTo(element, { offset: -60, duration: 1.0 });
        } else {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }, 150);
  };

  return (
    <SmoothScrollProvider activePage={activePage}>
      <div className="min-h-screen bg-[#000000] text-slate-100 selection:bg-orange-500 selection:text-black font-space">
        
        {/* Navigation Bar */}
        <VortexNavbar
          activePage={activePage}
          onNavigate={(page) => navigateTo(page)}
          onBookAppointmentClick={() => {
            if (activePage !== 'home') {
              navigateTo('home');
            }
            setTimeout(() => {
              const el = document.getElementById('booking-section');
              if (el) {
                if (window.lenis) {
                  window.lenis.scrollTo(el, { offset: -60, duration: 1.0 });
                } else {
                  el.scrollIntoView({ behavior: 'smooth' });
                }
              }
            }, 150);
          }}
        />

        {/* Global Cart Slide-Out Drawer */}
        <CartDrawer
          onProceedToBooking={() => {
            setIsCartOpen(false);
            if (activePage !== 'home') navigateTo('home');
            setTimeout(() => {
              const el = document.getElementById('booking-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }, 150);
          }}
        />

        {/* Floating Toast Notification */}
        {toastMessage && (
          <div className="fixed top-20 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-xl bg-orange-500 text-black font-bold text-xs shadow-2xl shadow-orange-500/40 animate-slide-in">
            <CheckCircle2 className="w-4 h-4 fill-black text-orange-500" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Page Switcher */}
        {activePage === 'home' && (
          /* HOME PAGE: Clean Hero, Budget Calculator (Add To Cart), Appointment Booking, Featured Parts (4-5), Previous Work & Clips, Multi-brand Banner, Contact */
          <VortexPerformanceShowcase
            onOpenBooking={handleBookService}
            onOpenBrandsPage={() => navigateTo('brands')}
            onNavigateToParts={() => navigateTo('parts')}
            onSelectProduct={handleSelectProduct}
            prefilledBookingData={prefilledBooking}
          />
        )}

        {activePage === 'parts' && (
          /* DEDICATED PARTS STORE PAGE: Full catalog of spare parts with search & categories */
          <PartsStorePage
            onBackToHome={() => navigateTo('home')}
            onSelectProduct={handleSelectProduct}
          />
        )}

        {activePage === 'product' && (
          /* DEDICATED SINGLE PRODUCT PAGE: High-res images, warranty, fitment, video clip, specs, Add To Cart */
          <ProductDetailPage
            productId={selectedProductId}
            onBackToStore={() => navigateTo('parts')}
            onBackToHome={() => navigateTo('home')}
            onSelectProduct={handleSelectProduct}
          />
        )}

        {activePage === 'brands' && (
          /* DEDICATED CAR BRANDS & PRICING PAGE */
          <BrandsEstimatorPage
            onBackToHome={() => navigateTo('home')}
            onBookSlot={handleBookService}
          />
        )}

        {/* Footer */}
        <VortexFooter />

        {/* Floating Quick Action Buttons (WhatsApp & Direct Phone) */}
        <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
          <a
            href="https://wa.me/919876543210?text=Hello%20KD%20Workshop%2C%20I%20want%20to%20inquire%20about%20a%20car%20service%2C%20budget%20estimate%20or%20spare%20parts"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black flex items-center justify-center shadow-2xl shadow-emerald-500/40 hover:scale-110 transition-all cursor-pointer group"
            title="Chat on WhatsApp"
          >
            <MessageSquare className="w-5 h-5 text-black group-hover:scale-110 transition-transform" />
          </a>

          <a
            href="tel:+919876543210"
            className="w-12 h-12 rounded-full bg-orange-500 hover:bg-orange-400 text-black flex items-center justify-center shadow-2xl shadow-orange-500/40 hover:scale-110 transition-all cursor-pointer"
            title="Direct Workshop Hotline"
          >
            <Phone className="w-5 h-5 text-black" />
          </a>
        </div>

      </div>
    </SmoothScrollProvider>
  );
}

export default function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}
