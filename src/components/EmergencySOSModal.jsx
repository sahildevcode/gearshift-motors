import React, { useState } from 'react';
import { AlertTriangle, Phone, MapPin, X, Navigation, Radio, CheckCircle2 } from 'lucide-react';

export default function EmergencySOSModal({ isOpen, onClose, currentLanguage = 'en' }) {
  const [sosSent, setSosSent] = useState(false);
  const [locating, setLocating] = useState(false);
  const [gpsLocation, setGpsLocation] = useState(null);

  if (!isOpen) return null;

  const handleFetchLocation = () => {
    setLocating(true);
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setGpsLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
          setLocating(false);
        },
        () => {
          setGpsLocation({ lat: 28.6139, lng: 77.2090, mock: true });
          setLocating(false);
        }
      );
    } else {
      setGpsLocation({ lat: 28.6139, lng: 77.2090, mock: true });
      setLocating(false);
    }
  };

  const handleConfirmSOS = () => {
    setSosSent(true);
  };

  const handleCallRescue = () => {
    window.location.href = 'tel:+919876543210';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-lg rounded-3xl border border-red-500/50 bg-gradient-to-b from-slate-900 to-slate-950 p-6 md:p-8 shadow-2xl shadow-red-950/50 overflow-hidden">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {sosSent ? (
          <div className="text-center py-6">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8 text-emerald-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">
              {currentLanguage === 'hi' ? 'इमरजेंसी रेस्क्यू वैन रवाना!' : 'RESCUE VAN DISPATCHED!'}
            </h3>
            <p className="text-xs text-slate-300 max-w-sm mx-auto mb-6">
              {currentLanguage === 'hi'
                ? 'हमारी नजदीकी मोबाइल सर्विस वैन अगले 20-30 मिनट में आपकी लोकेशन पर पहुंच रही है। हमारे ड्राइवर आपसे सीधे संपर्क कर रहे हैं।'
                : 'Our nearest rapid mobile assistance unit is en route to your coordinates. Estimated arrival: 20-25 mins.'}
            </p>
            <button
              onClick={handleCallRescue}
              className="py-3 px-6 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 mx-auto shadow-lg shadow-red-600/30"
            >
              <Phone className="w-4 h-4" />
              <span>Call Dispatch Driver Directly</span>
            </button>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-red-500/20 border border-red-500/40 flex items-center justify-center animate-pulse-glow">
                <AlertTriangle className="w-6 h-6 text-red-500" />
              </div>
              <div>
                <h3 className="text-lg md:text-xl font-black text-white">
                  {currentLanguage === 'hi' ? '24/7 इमरजेंसी रोडसाइड ब्रेकडाउन' : '24/7 Emergency Breakdown SOS'}
                </h3>
                <span className="text-xs text-red-400 font-mono">
                  {currentLanguage === 'hi' ? '● रिस्पॉन्स टाइम: 30 मिनट के अंदर' : '● Rapid Response Time: Under 30 Mins'}
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-300 mb-6 leading-relaxed">
              {currentLanguage === 'hi'
                ? 'कार बंद हो गई, पंक्चर, बैटरी डिस्चार्ज या हाईवे पर रुक गई? हमारी इमरजेंसी मोबाइल वैन टूल्स और टोइंग क्रेन के साथ तुरंत पहुंचेगी।'
                : 'Vehicle stalled, flat tyre with no spare, dead battery, or stranded on the highway? We dispatch an on-site mechanic with mobile power and tools immediately.'}
            </p>

            {/* GPS Location Hook */}
            <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 mb-6 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Navigation className="w-5 h-5 text-cyan-400" />
                <div>
                  <span className="text-[11px] text-slate-400 block">
                    {currentLanguage === 'hi' ? 'आपकी लाइव लोकेशन' : 'Current GPS Coordinates'}
                  </span>
                  <span className="text-xs font-mono font-bold text-white">
                    {gpsLocation
                      ? `Lat: ${gpsLocation.lat.toFixed(4)}, Lng: ${gpsLocation.lng.toFixed(4)}`
                      : 'Not shared yet'}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleFetchLocation}
                disabled={locating}
                className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 text-xs font-semibold"
              >
                {locating ? 'Locating...' : 'Auto Detect GPS'}
              </button>
            </div>

            {/* Direct Call & SOS Dispatch */}
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={handleCallRescue}
                className="py-3 px-4 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-red-600/30"
              >
                <Phone className="w-4 h-4" />
                <span>Call Hotline Now</span>
              </button>

              <button
                onClick={handleConfirmSOS}
                className="py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2"
              >
                <Radio className="w-4 h-4 text-orange-400" />
                <span>Dispatch Van</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
