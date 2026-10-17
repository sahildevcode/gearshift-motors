import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, Phone, User, Car, CheckCircle2, ShieldCheck, Send, MessageSquare, AlertCircle } from 'lucide-react';
import { CAR_BRANDS, SERVICE_PACKAGES } from '../data/brandsData';

export default function BookingSection({ prefilledData, currentLanguage = 'en' }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    brand: 'Maruti Suzuki',
    model: 'Swift',
    service: 'Standard Comprehensive Service',
    serviceMode: 'pickup', // 'pickup' or 'workshop'
    date: new Date(Date.now() + 86400000).toISOString().split('T')[0], // tomorrow
    timeSlot: '10:00 AM - 12:00 PM',
    address: '',
    notes: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [bookingRef, setBookingRef] = useState('');

  // Update when parent passes prefilled data from brand estimator or services
  useEffect(() => {
    if (prefilledData) {
      setFormData((prev) => ({
        ...prev,
        brand: prefilledData.brand || prev.brand,
        model: prefilledData.model || prev.model,
        service: prefilledData.packageName || prev.service
      }));
    }
  }, [prefilledData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const refNum = 'APX-' + Math.floor(100000 + Math.random() * 900000);
    setBookingRef(refNum);
    setIsSubmitted(true);
  };

  // WhatsApp formatted lead
  const handleWhatsAppDirect = () => {
    const message = `*NEW CAR SERVICE BOOKING*\n-------------------------\n*Customer:* ${formData.name || 'Not provided'}\n*Phone:* ${formData.phone || 'Not provided'}\n*Vehicle:* ${formData.brand} ${formData.model}\n*Service:* ${formData.service}\n*Mode:* ${formData.serviceMode === 'pickup' ? 'Free Doorstep Pick & Drop' : 'Direct Workshop Visit'}\n*Date & Slot:* ${formData.date} (${formData.timeSlot})\n*Address/Area:* ${formData.address || 'Workshop location'}\n*Notes:* ${formData.notes || 'None'}`;
    const url = `https://wa.me/919876543210?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <section id="booking-section" className="relative py-20 px-4 md:px-8 max-w-7xl mx-auto">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-orange-600/10 blur-[150px] pointer-events-none rounded-full" />

      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-mono uppercase tracking-widest mb-4">
          <Calendar className="w-4 h-4" />
          {currentLanguage === 'hi' ? 'ऑनलाइन स्लॉट बुकिंग' : 'Instant Service Appointment'}
        </div>
        <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-4">
          {currentLanguage === 'hi' ? (
            <>
              अपनी कार की सर्विस के लिए <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-yellow-500">स्लॉट रिजर्व करें</span>
            </>
          ) : (
            <>
              Reserve Your Priority <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-yellow-500">Service Slot</span>
            </>
          )}
        </h2>
        <p className="text-slate-400 text-sm md:text-base leading-relaxed">
          {currentLanguage === 'hi'
            ? 'घर बैठे फ्री पिक-अप & ड्रॉप या वर्कशॉप विजिट चुनें। काम पूरा होने और संतुष्ट होने के बाद ही पेमेंट करें।'
            : 'Complimentary doorstep pick-up & drop, real-time live WhatsApp job updates, and zero advance payment required.'}
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        {isSubmitted ? (
          /* Confirmation Screen */
          <div className="rounded-3xl border border-emerald-500/40 bg-gradient-to-b from-slate-900 to-slate-950 p-8 md:p-12 text-center shadow-2xl backdrop-blur-xl">
            <div className="w-20 h-20 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center mx-auto mb-6 shadow-xl shadow-emerald-500/20">
              <CheckCircle2 className="w-10 h-10 text-emerald-400" />
            </div>
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold block mb-2">
              {currentLanguage === 'hi' ? 'स्लॉट सफलतापूर्वक आरक्षित हो गया!' : 'APPOINTMENT CONFIRMED'}
            </span>
            <h3 className="text-2xl md:text-3xl font-black text-white mb-3">
              Booking Ref: <span className="text-orange-400 font-mono">{bookingRef}</span>
            </h3>
            <p className="text-slate-300 text-sm max-w-lg mx-auto mb-6 leading-relaxed">
              {currentLanguage === 'hi'
                ? `धन्यवाद ${formData.name}! आपकी ${formData.brand} ${formData.model} के लिए सर्विस स्लॉट दर्ज कर लिया गया है। हमारे मास्टर सर्विस एडवाइजर 10 मिनट में आपको कन्फर्मेशन कॉल करेंगे।`
                : `Thank you ${formData.name}! Your service booking for ${formData.brand} ${formData.model} has been recorded. Our master service advisor will call you within 10 minutes to coordinate vehicle check-in.`}
            </p>

            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 max-w-md mx-auto text-left text-xs text-slate-300 space-y-2 mb-8">
              <div className="flex justify-between">
                <span className="text-slate-500">Service:</span>
                <span className="font-semibold text-white">{formData.service}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Date & Slot:</span>
                <span className="font-semibold text-white">{formData.date} &bull; {formData.timeSlot}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Mode:</span>
                <span className="font-semibold text-emerald-400">
                  {formData.serviceMode === 'pickup' ? 'Free Doorstep Pick & Drop' : 'Direct Workshop Visit'}
                </span>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={handleWhatsAppDirect}
                className="py-3 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-emerald-600/30 transition-all cursor-pointer"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Open on WhatsApp Chat</span>
              </button>
              <button
                onClick={() => setIsSubmitted(false)}
                className="py-3 px-6 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs uppercase tracking-wider transition-all cursor-pointer"
              >
                Book Another Car
              </button>
            </div>
          </div>
        ) : (
          /* Interactive Booking Form */
          <form
            onSubmit={handleSubmit}
            className="rounded-3xl border border-slate-800 bg-gradient-to-b from-slate-900/90 to-slate-950/90 backdrop-blur-xl p-6 md:p-10 shadow-2xl"
          >
            {/* Mode Toggle: Free Pick & Drop VS Workshop Visit */}
            <div className="grid grid-cols-2 gap-3 p-1.5 rounded-2xl bg-slate-950 border border-slate-800 mb-8">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, serviceMode: 'pickup' })}
                className={`py-3 px-4 rounded-xl text-xs md:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  formData.serviceMode === 'pickup'
                    ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-slate-950 shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <MapPin className="w-4 h-4" />
                <span>{currentLanguage === 'hi' ? 'फ्री डोरस्टेप पिक-अप & ड्रॉप' : 'Free Doorstep Pick-up & Drop'}</span>
              </button>

              <button
                type="button"
                onClick={() => setFormData({ ...formData, serviceMode: 'workshop' })}
                className={`py-3 px-4 rounded-xl text-xs md:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  formData.serviceMode === 'workshop'
                    ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-slate-950 shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Clock className="w-4 h-4" />
                <span>{currentLanguage === 'hi' ? 'खुद वर्कशॉप विजिट करेंगे' : 'Direct Workshop Visit'}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Customer Name */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-orange-400" />
                  {currentLanguage === 'hi' ? 'आपका नाम *' : 'Your Full Name *'}
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="e.g. Rahul Sharma"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full py-3 px-4 rounded-xl bg-slate-950/80 border border-slate-800 text-white placeholder-slate-600 text-sm focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
                />
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-orange-400" />
                  {currentLanguage === 'hi' ? 'मोबाइल नंबर (WhatsApp) *' : 'Phone Number (WhatsApp) *'}
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full py-3 px-4 rounded-xl bg-slate-950/80 border border-slate-800 text-white placeholder-slate-600 text-sm focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
                />
              </div>

              {/* Car Brand */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                  <Car className="w-3.5 h-3.5 text-orange-400" />
                  {currentLanguage === 'hi' ? 'कार ब्रांड *' : 'Car Brand *'}
                </label>
                <select
                  name="brand"
                  value={formData.brand}
                  onChange={handleChange}
                  className="w-full py-3 px-4 rounded-xl bg-slate-950/80 border border-slate-800 text-white text-sm focus:outline-none focus:border-orange-500 transition-all"
                >
                  {CAR_BRANDS.map((b) => (
                    <option key={b.id} value={b.name} className="bg-slate-900">
                      {b.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Car Model */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                  <Car className="w-3.5 h-3.5 text-orange-400" />
                  {currentLanguage === 'hi' ? 'कार का मॉडल / वेरिएंट *' : 'Car Model / Variant *'}
                </label>
                <input
                  type="text"
                  name="model"
                  required
                  placeholder="e.g. Swift, Creta, Nexon, Thar..."
                  value={formData.model}
                  onChange={handleChange}
                  className="w-full py-3 px-4 rounded-xl bg-slate-950/80 border border-slate-800 text-white placeholder-slate-600 text-sm focus:outline-none focus:border-orange-500 transition-all"
                />
              </div>

              {/* Service Required */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-orange-400" />
                  {currentLanguage === 'hi' ? 'सर्विस पैकेज / काम *' : 'Select Required Service *'}
                </label>
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className="w-full py-3 px-4 rounded-xl bg-slate-950/80 border border-slate-800 text-white text-sm focus:outline-none focus:border-orange-500 transition-all"
                >
                  {SERVICE_PACKAGES.map((pkg) => (
                    <option key={pkg.key} value={pkg.name} className="bg-slate-900">
                      {currentLanguage === 'hi' ? pkg.nameHi : pkg.name}
                    </option>
                  ))}
                  <option value="Denting & Painting" className="bg-slate-900">
                    Denting & Painting / Accident Claim
                  </option>
                  <option value="General Checkup & Sound Diagnostic" className="bg-slate-900">
                    General Checkup & Noise Diagnostic
                  </option>
                </select>
              </div>

              {/* Preferred Date */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-orange-400" />
                  {currentLanguage === 'hi' ? 'पसंदीदा तारीख *' : 'Preferred Date *'}
                </label>
                <input
                  type="date"
                  name="date"
                  required
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full py-3 px-4 rounded-xl bg-slate-950/80 border border-slate-800 text-white text-sm focus:outline-none focus:border-orange-500 transition-all"
                />
              </div>

              {/* Time Slot */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
                  {currentLanguage === 'hi' ? 'समय स्लॉट *' : 'Preferred Time Slot *'}
                </label>
                <select
                  name="timeSlot"
                  value={formData.timeSlot}
                  onChange={handleChange}
                  className="w-full py-3 px-4 rounded-xl bg-slate-950/80 border border-slate-800 text-white text-sm focus:outline-none focus:border-orange-500 transition-all"
                >
                  <option value="09:00 AM - 11:00 AM" className="bg-slate-900">09:00 AM - 11:00 AM (Morning Slot)</option>
                  <option value="11:00 AM - 01:00 PM" className="bg-slate-900">11:00 AM - 01:00 PM (Mid-day Slot)</option>
                  <option value="02:00 PM - 04:00 PM" className="bg-slate-900">02:00 PM - 04:00 PM (Afternoon Slot)</option>
                  <option value="04:00 PM - 07:00 PM" className="bg-slate-900">04:00 PM - 07:00 PM (Evening Express)</option>
                </select>
              </div>

              {/* Pickup Address */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-orange-400" />
                  {formData.serviceMode === 'pickup'
                    ? (currentLanguage === 'hi' ? 'पिक-अप का पता / इलाका *' : 'Pick-up Address / Area *')
                    : (currentLanguage === 'hi' ? 'आपका शहर / पिनकोड' : 'Your City / Locality')}
                </label>
                <input
                  type="text"
                  name="address"
                  placeholder="e.g. Sector 18, MG Road or Home address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full py-3 px-4 rounded-xl bg-slate-950/80 border border-slate-800 text-white placeholder-slate-600 text-sm focus:outline-none focus:border-orange-500 transition-all"
                />
              </div>
            </div>

            {/* Any Special Requests / Sounds */}
            <div className="mb-6">
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
                {currentLanguage === 'hi' ? 'कोई विशेष समस्या या निर्देश (Optional)' : 'Special Problem Notes / Sounds Observed (Optional)'}
              </label>
              <textarea
                name="notes"
                rows="2"
                placeholder={currentLanguage === 'hi' ? 'जैसे: ब्रेक से आवाज आ रही है, या एसी कम ठंडा कर रहा है...' : 'e.g. Brake squeaking, AC cooling low, steering vibration at high speed...'}
                value={formData.notes}
                onChange={handleChange}
                className="w-full py-2.5 px-4 rounded-xl bg-slate-950/80 border border-slate-800 text-white placeholder-slate-600 text-sm focus:outline-none focus:border-orange-500 transition-all"
              />
            </div>

            {/* Trust highlights */}
            <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 mb-6 text-xs text-slate-400">
              <span className="flex items-center gap-1.5 text-emerald-400">
                <ShieldCheck className="w-4 h-4" />
                100% Genuine OEM / OES Spares
              </span>
              <span className="flex items-center gap-1.5 text-cyan-400">
                <Clock className="w-4 h-4" />
                Express Turnaround Guarantee
              </span>
              <span className="flex items-center gap-1.5 text-amber-400">
                <CheckCircle2 className="w-4 h-4" />
                Zero Advance &bull; Pay After Test Drive
              </span>
            </div>

            {/* Actions: Direct Submit + Direct WhatsApp */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                type="submit"
                className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 text-slate-950 font-black text-sm tracking-wide shadow-xl shadow-orange-500/25 hover:shadow-orange-500/40 hover:scale-[1.01] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{currentLanguage === 'hi' ? 'सर्विस स्लॉट कन्फर्म करें' : 'Confirm Service Appointment'}</span>
                <Send className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={handleWhatsAppDirect}
                className="w-full py-4 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm tracking-wide shadow-lg shadow-emerald-600/25 hover:scale-[1.01] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageSquare className="w-4 h-4" />
                <span>{currentLanguage === 'hi' ? 'व्हाट्सएप पर डायरेक्ट बुक करें' : 'Book Instantly via WhatsApp'}</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
