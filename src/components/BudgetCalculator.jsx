import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { 
  Calculator, Check, Plus, ShoppingBag, Calendar, ShieldCheck, 
  Sparkles, Wrench, Clock, Car, ChevronRight, AlertCircle 
} from 'lucide-react';

const VEHICLE_SEGMENTS = [
  { id: 'hatchback', name: 'Hatchback', example: 'Swift, i20, Baleno, Altroz', multiplier: 1.0 },
  { id: 'sedan', name: 'Sedan', example: 'City, Verna, Dzire, Ciaz', multiplier: 1.1 },
  { id: 'csuv', name: 'Compact SUV', example: 'Brezza, Venue, Nexon, Sonet', multiplier: 1.15 },
  { id: 'suv', name: 'Mid/Full SUV & 4x4', example: 'Creta, Thar, Harrier, Scorpio-N', multiplier: 1.3 },
  { id: 'luxury', name: 'Luxury / German', example: 'BMW, Mercedes, Audi, Skoda TSI', multiplier: 1.6 }
];

const AVAILABLE_SERVICES = [
  {
    id: 'wheel-alignment',
    name: 'Wheel Alignment & Computer 3D Balancing',
    tag: 'Alignment',
    basePrice: 599,
    estTimeMins: 45,
    icon: '🎯',
    desc: 'Precision computerized 3D laser alignment, camber setting & alloy wheel balancing weights. Stops vehicle pulling to one side.'
  },
  {
    id: 'synthetic-oil',
    name: '100% Synthetic Engine Oiling & OEM Filter',
    tag: 'Oiling',
    basePrice: 2499,
    estTimeMins: 60,
    icon: '🛢️',
    desc: 'Fully Synthetic 5W-40 / 0W-20 engine oil (Castrol / Mobil 1) + OEM filter replacement + magnetic drain bolt seal.'
  },
  {
    id: 'ceramic-glazing',
    name: '3-Layer Ceramic Glazing & Mirror Paint Correction',
    tag: 'Glazing',
    basePrice: 4499,
    estTimeMins: 180,
    icon: '✨',
    desc: 'Multi-stage machine buffing, swirl mark removal & 9H hydrophobic nano ceramic glaze seal for a wet-look showroom reflection.'
  },
  {
    id: 'brake-overhaul',
    name: 'Brake Pad Overhaul & Disc Rotor Skimming',
    tag: 'Brakes',
    basePrice: 1299,
    estTimeMins: 90,
    icon: '🛑',
    desc: 'Front and rear brake calipers cleaning, high-temp sliding pin lubrication, rotor surface skimming to stop steering judder.'
  },
  {
    id: 'ac-service',
    name: 'Super Chill AC Gas Top-up & Anti-Bacterial Wash',
    tag: 'AC Service',
    basePrice: 1699,
    estTimeMins: 75,
    icon: '❄️',
    desc: 'R134a refrigerant evacuation and refill, compressor oil top-up, condenser pressure wash & anti-fungal cabin duct treatment.'
  },
  {
    id: 'interior-spa',
    name: 'Deep Interior Dry-Cleaning & Foam Steam Spa',
    tag: 'Interior',
    basePrice: 999,
    estTimeMins: 90,
    icon: '🧽',
    desc: 'Seat upholstery stain extraction, roof fabric cleaning, trunk detailing, floor carpet vacuuming & matte UV dashboard dressing.'
  },
  {
    id: 'suspension-check',
    name: 'Suspension Bushing & Steering Rack Inspection',
    tag: 'Suspension',
    basePrice: 899,
    estTimeMins: 60,
    icon: '🔧',
    desc: 'Comprehensive check of lower control arms, tie-rod ends, stabilizer bar bushes, and hydraulic shock rebound testing.'
  },
  {
    id: 'computer-scan',
    name: 'OBD-II Computerized Engine Scan & 45-Point Check',
    tag: 'Diagnostics',
    basePrice: 499,
    estTimeMins: 30,
    icon: '💻',
    desc: 'Bosch computerized live diagnostic check for hidden ECU DTC error codes, battery health testing, alternator & brake fluid scan.'
  },
  {
    id: 'underbody-coating',
    name: 'Underbody Anti-Rust Bituminous Seal',
    tag: 'Protection',
    basePrice: 1499,
    estTimeMins: 60,
    icon: '🛡️',
    desc: 'Heavy-duty rubberized undercarriage spray that seals metal against rain rust, flying gravel chips, and road salt.'
  }
];

export default function BudgetCalculator({ onSelectBookingSlot }) {
  const { addToCart, setIsCartOpen } = useCart();

  const [selectedSegment, setSelectedSegment] = useState(VEHICLE_SEGMENTS[0]);
  // Default selected: Oiling, Alignment, Glazing (as mentioned in user request)
  const [selectedServiceIds, setSelectedServiceIds] = useState([
    'synthetic-oil',
    'wheel-alignment',
    'ceramic-glazing'
  ]);
  const [isAddedSuccess, setIsAddedSuccess] = useState(false);

  const toggleService = (id) => {
    setSelectedServiceIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const selectAllServices = () => {
    setSelectedServiceIds(AVAILABLE_SERVICES.map((s) => s.id));
  };

  const clearAllServices = () => {
    setSelectedServiceIds([]);
  };

  // Calculations
  const selectedServices = AVAILABLE_SERVICES.filter((s) =>
    selectedServiceIds.includes(s.id)
  );

  const rawSubtotal = selectedServices.reduce((acc, curr) => {
    return acc + Math.round(curr.basePrice * selectedSegment.multiplier);
  }, 0);

  // Combo Discount: 10% off for 3+ services, 15% off for 5+ services
  const discountPercent =
    selectedServices.length >= 5 ? 15 : selectedServices.length >= 3 ? 10 : 0;
  const comboDiscount = Math.round((rawSubtotal * discountPercent) / 100);
  const finalPrice = Math.max(0, rawSubtotal - comboDiscount);

  const totalTimeMins = selectedServices.reduce((acc, curr) => acc + curr.estTimeMins, 0);
  const formattedHours =
    totalTimeMins > 0
      ? `${Math.floor(totalTimeMins / 60)}h ${totalTimeMins % 60 > 0 ? (totalTimeMins % 60) + 'm' : ''}`
      : '0 mins';

  const handleAddToCart = () => {
    if (selectedServices.length === 0) return;

    const packageItem = {
      id: `custom-pkg-${Date.now()}`,
      type: 'service',
      title: `Custom Service Package: ${selectedSegment.name}`,
      price: finalPrice,
      mrp: rawSubtotal,
      quantity: 1,
      image:
        'https://images.unsplash.com/photo-1486006920555-c77dce18193b?w=600&auto=format&fit=crop&q=80',
      details: selectedServices.map((s) => s.tag).join(', '),
      services: selectedServices.map((s) => ({
        name: s.name,
        price: Math.round(s.basePrice * selectedSegment.multiplier)
      })),
      segment: selectedSegment.name
    };

    addToCart(packageItem, 1);
    setIsAddedSuccess(true);
    setTimeout(() => {
      setIsAddedSuccess(false);
      setIsCartOpen(true);
    }, 400);
  };

  const handleDirectBooking = () => {
    if (onSelectBookingSlot) {
      onSelectBookingSlot({
        brand: selectedSegment.name,
        model: selectedSegment.example.split(',')[0],
        packageName: `Custom Package (${selectedServices.map((s) => s.tag).join(', ')}) - ₹${finalPrice.toLocaleString('en-IN')}`,
        customServices: selectedServices
      });
    }
  };

  return (
    <section id="budget-calculator" className="relative py-20 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto border-t border-white/10">
      
      {/* Section Header */}
      <div className="max-w-3xl mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-semibold uppercase tracking-wider mb-3">
          <Calculator className="w-3.5 h-3.5" />
          <span>Interactive Workshop Budget Calculator</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-3">
          Build Your Custom Service & Get <span className="text-orange-500">Live Transparent Pricing</span>
        </h2>
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
          Select your vehicle type, choose exactly what your car needs (like Alignment, Oiling, Ceramic Glazing, Brakes, AC), and add the customized price directly to your cart or book an appointment slot.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Segment Selector + Services Checklist (8 Cols) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Step 1: Car Segment Selection */}
          <div className="p-5 rounded-2xl bg-[#131d31] border border-white/10 shadow-xl">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase text-slate-300 tracking-wider flex items-center gap-2">
                <Car className="w-4 h-4 text-orange-400" />
                Step 1: Choose Vehicle Category
              </span>
              <span className="text-xs text-orange-400 font-medium">
                Current: {selectedSegment.name}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
              {VEHICLE_SEGMENTS.map((seg) => {
                const isSelected = selectedSegment.id === seg.id;
                return (
                  <button
                    key={seg.id}
                    onClick={() => setSelectedSegment(seg)}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'bg-orange-500/15 border-orange-500 text-white shadow-lg shadow-orange-500/10'
                        : 'bg-black/60 border-white/10 text-slate-400 hover:border-white/25 hover:text-slate-200'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className={`text-xs font-bold ${isSelected ? 'text-orange-400' : 'text-white'}`}>
                          {seg.name}
                        </span>
                        {isSelected && <Check className="w-3.5 h-3.5 text-orange-400 stroke-[3]" />}
                      </div>
                      <span className="text-[10px] text-slate-400 block line-clamp-1">
                        {seg.example}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: Choose Services Checklist */}
          <div className="p-5 rounded-2xl bg-[#131d31] border border-white/10 shadow-xl">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-white/10">
              <span className="text-xs font-bold uppercase text-slate-300 tracking-wider flex items-center gap-2">
                <Wrench className="w-4 h-4 text-orange-400" />
                Step 2: Select Services You Want
              </span>
              <div className="flex items-center gap-3 text-xs">
                <button
                  onClick={selectAllServices}
                  className="text-orange-400 hover:text-orange-300 underline font-medium cursor-pointer"
                >
                  Select All
                </button>
                <span className="text-slate-600">&bull;</span>
                <button
                  onClick={clearAllServices}
                  className="text-slate-400 hover:text-slate-300 underline cursor-pointer"
                >
                  Clear All
                </button>
              </div>
            </div>

            {/* Service Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {AVAILABLE_SERVICES.map((srv) => {
                const isChecked = selectedServiceIds.includes(srv.id);
                const adjustedPrice = Math.round(srv.basePrice * selectedSegment.multiplier);

                return (
                  <div
                    key={srv.id}
                    onClick={() => toggleService(srv.id)}
                    className={`p-3.5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between select-none ${
                      isChecked
                        ? 'bg-orange-500/10 border-orange-500/80 shadow-md shadow-orange-500/10'
                        : 'bg-black/50 border-white/10 hover:border-white/20'
                    }`}
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-1.5">
                        <div className="flex items-center gap-2.5">
                          <span className="text-xl flex-shrink-0">{srv.icon}</span>
                          <div>
                            <h4 className="text-xs font-bold text-white leading-tight">
                              {srv.name}
                            </h4>
                            <span className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5">
                              <Clock className="w-3 h-3 text-slate-500" />
                              Approx. {srv.estTimeMins} mins
                            </span>
                          </div>
                        </div>

                        {/* Checkbox indicator */}
                        <div
                          className={`w-5 h-5 rounded-md flex items-center justify-center transition-colors flex-shrink-0 ${
                            isChecked
                              ? 'bg-orange-500 text-black'
                              : 'border border-white/20 bg-white/5'
                          }`}
                        >
                          {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>
                      </div>

                      <p className="text-[11px] text-slate-400 leading-relaxed pl-8 line-clamp-2">
                        {srv.desc}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-2.5 mt-2.5 border-t border-white/5 pl-8">
                      <span className="text-[10px] text-slate-500 uppercase font-medium">
                        Service Cost
                      </span>
                      <span className="text-xs font-bold text-orange-400 font-mono">
                        ₹{adjustedPrice.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Right Side: Live Budget Summary & Add To Cart (4 Cols Sticky) */}
        <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-4">
          
          <div className="p-6 rounded-2xl bg-gradient-to-b from-[#1a263d] to-[#08090d] border border-orange-500/30 shadow-2xl relative overflow-hidden">
            
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <span className="text-xs font-bold uppercase tracking-wider text-orange-400 flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                Live Estimate Summary
              </span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-white/10 text-slate-300 font-mono">
                {selectedServices.length} {selectedServices.length === 1 ? 'service' : 'services'}
              </span>
            </div>

            {/* Vehicle details chip */}
            <div className="py-3 text-xs border-b border-white/5 flex items-center justify-between text-slate-300">
              <span className="text-slate-400">Selected Vehicle:</span>
              <span className="font-bold text-white">{selectedSegment.name}</span>
            </div>

            {/* Turnaround Time */}
            <div className="py-2.5 text-xs border-b border-white/5 flex items-center justify-between text-slate-300">
              <span className="text-slate-400 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                Turnaround Time:
              </span>
              <span className="font-bold text-emerald-400">{formattedHours}</span>
            </div>

            {/* Selected Items Tags */}
            <div className="py-3 border-b border-white/5 space-y-2">
              <span className="text-[11px] text-slate-400 block font-medium">
                Included Work:
              </span>
              {selectedServices.length === 0 ? (
                <span className="text-xs text-amber-400 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" /> Please select at least one service
                </span>
              ) : (
                <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto pr-1">
                  {selectedServices.map((s) => (
                    <span
                      key={s.id}
                      className="px-2 py-0.5 rounded text-[10px] bg-black/60 border border-white/10 text-slate-300 flex items-center gap-1"
                    >
                      <Check className="w-2.5 h-2.5 text-orange-400" />
                      {s.tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Pricing breakdown */}
            <div className="py-4 space-y-2 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Standard Labor & Parts</span>
                <span className="font-mono text-white">
                  ₹{rawSubtotal.toLocaleString('en-IN')}
                </span>
              </div>

              {discountPercent > 0 && (
                <div className="flex justify-between text-emerald-400">
                  <span className="flex items-center gap-1">
                    Multi-Service Combo Discount ({discountPercent}%)
                  </span>
                  <span className="font-mono font-bold">
                    -₹{comboDiscount.toLocaleString('en-IN')}
                  </span>
                </div>
              )}

              <div className="flex justify-between text-slate-400">
                <span>Pickup & Sanitization</span>
                <span className="text-emerald-400 font-bold uppercase text-[11px]">
                  FREE (Zero Cost)
                </span>
              </div>

              {/* Total Row */}
              <div className="pt-3 border-t border-white/10 flex items-baseline justify-between">
                <div>
                  <span className="text-xs text-slate-400 block">Total Estimated Price</span>
                  <span className="text-[10px] text-slate-500">Taxes inclusive &bull; No hidden fees</span>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-black text-orange-400 font-mono block">
                    ₹{finalPrice.toLocaleString('en-IN')}
                  </span>
                  {rawSubtotal > finalPrice && (
                    <span className="text-[11px] text-slate-500 line-through">
                      ₹{rawSubtotal.toLocaleString('en-IN')}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* User Request Crucial Actions: ADD TO CART & BOOK APPOINTMENT */}
            <div className="space-y-2.5 pt-2">
              <button
                onClick={handleAddToCart}
                disabled={selectedServices.length === 0}
                className="w-full py-3.5 px-4 rounded-xl bg-orange-500 hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed text-black font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl shadow-orange-500/25 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4 fill-black" />
                <span>
                  {isAddedSuccess ? '✓ Added to Cart!' : `Add Services to Cart (₹${finalPrice.toLocaleString('en-IN')})`}
                </span>
              </button>

              <button
                onClick={handleDirectBooking}
                disabled={selectedServices.length === 0}
                className="w-full py-2.5 px-4 rounded-xl bg-white/5 hover:bg-white/10 disabled:opacity-50 border border-white/10 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Calendar className="w-3.5 h-3.5 text-orange-400" />
                <span>Book Priority Appointment Slot</span>
              </button>
            </div>

            {/* Workshop Guarantees */}
            <div className="pt-4 mt-4 border-t border-white/5 space-y-1.5 text-[10px] text-slate-400">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                <span>100% Genuine OEM Spares & Lubricants with Warranty</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                <span>Live WhatsApp Photo/Video Updates of Service Progress</span>
              </div>
            </div>

          </div>

        </div>

      </div>

    </section>
  );
}
