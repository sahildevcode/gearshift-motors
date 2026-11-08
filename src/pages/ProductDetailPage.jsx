import React, { useState } from 'react';
import { CAR_PARTS_DATA } from '../data/partsData';
import { useCart } from '../context/CartContext';
import { 
  ArrowLeft, Star, ShoppingBag, ShieldCheck, CheckCircle2, 
  Play, Plus, Minus, Wrench, Truck, Check, Share2, 
  ChevronRight, Car, AlertCircle, Info, Sparkles 
} from 'lucide-react';

export default function ProductDetailPage({ productId, onBackToStore, onBackToHome, onSelectProduct }) {
  const { addToCart, setIsCartOpen } = useCart();

  const product = CAR_PARTS_DATA.find((p) => p.id === productId) || CAR_PARTS_DATA[0];

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [includeInstallation, setIncludeInstallation] = useState(true);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [compatibilityCar, setCompatibilityCar] = useState('');
  const [compatibilityResult, setCompatibilityResult] = useState(null);
  const [copiedLink, setCopiedLink] = useState(false);

  const installationPrice = includeInstallation ? 0 : 0; // Free promotion
  const totalPrice = product.price * quantity + installationPrice;

  const handleAddToCart = () => {
    addToCart(
      {
        id: product.id,
        type: 'part',
        title: product.name,
        brand: product.brand,
        price: product.price,
        mrp: product.mrp,
        quantity: quantity,
        image: product.images[0],
        details: `${product.warranty} • ${includeInstallation ? 'Free Workshop Fitting Included' : 'Courier Delivery'}`
      },
      quantity
    );
  };

  const handleBuyNow = () => {
    handleAddToCart();
    setIsCartOpen(true);
  };

  const handleCheckCompatibility = (e) => {
    e.preventDefault();
    if (!compatibilityCar.trim()) return;

    const matched = product.fitment.some((f) =>
      f.toLowerCase().includes(compatibilityCar.toLowerCase())
    );

    setCompatibilityResult({
      checked: true,
      car: compatibilityCar,
      isCompatible: matched || compatibilityCar.toLowerCase().includes('swift') || compatibilityCar.toLowerCase().includes('creta') || compatibilityCar.toLowerCase().includes('thar')
    });
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const relatedProducts = CAR_PARTS_DATA.filter((p) => p.id !== product.id).slice(0, 3);

  return (
    <div className="min-h-screen bg-[#000000] text-white pt-24 pb-20 px-4 sm:px-8 lg:px-12 selection:bg-orange-500 selection:text-black">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Breadcrumb Navigation */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-white/10 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <button
              onClick={onBackToHome}
              className="hover:text-orange-400 transition-colors cursor-pointer"
            >
              Home
            </button>
            <span>/</span>
            <button
              onClick={onBackToStore}
              className="hover:text-orange-400 transition-colors cursor-pointer"
            >
              Parts Store
            </button>
            <span>/</span>
            <span className="text-orange-400 font-bold truncate max-w-xs">
              {product.name}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onBackToStore}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white font-medium transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Store</span>
            </button>
            <button
              onClick={handleShare}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>{copiedLink ? 'Link Copied!' : 'Share Part'}</span>
            </button>
          </div>
        </div>

        {/* Main Product Showcase (Left Gallery + Right Purchase Info) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Image Gallery & Video Clip Button (6 Cols) */}
          <div className="lg:col-span-6 space-y-4">
            
            {/* Main Featured Photo */}
            <div className="relative aspect-4/3 rounded-3xl overflow-hidden bg-[#090b10] border border-white/10 shadow-2xl group">
              <img
                src={product.images[activeImageIndex] || product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />

              {/* Discount Badge */}
              <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-orange-500 text-black font-extrabold text-xs uppercase tracking-wider shadow-lg">
                {product.discountPercent}% OFF
              </div>

              {/* Brand Tag */}
              <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/15 text-white font-mono text-xs font-bold">
                {product.brand}
              </div>

              {/* In-stock pill */}
              <div className="absolute bottom-4 left-4 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-emerald-500/40 text-emerald-400 text-xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>In Stock & Ready for Dispatch ({product.stockCount} units)</span>
              </div>
            </div>

            {/* Thumbnail Switcher & Demo Video Card */}
            <div className="grid grid-cols-4 gap-3">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`aspect-square rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                    activeImageIndex === idx
                      ? 'border-orange-500 scale-102 shadow-lg shadow-orange-500/20'
                      : 'border-white/10 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="thumb" className="w-full h-full object-cover" />
                </button>
              ))}

              {/* Play Video Clip Button Thumbnail */}
              {product.videoClip && (
                <button
                  onClick={() => setIsVideoModalOpen(true)}
                  className="aspect-square rounded-xl overflow-hidden border-2 border-orange-500/50 bg-orange-500/10 hover:bg-orange-500/20 flex flex-col items-center justify-center text-center p-2 group transition-all cursor-pointer"
                  title="Watch Demo Video Clip"
                >
                  <div className="w-8 h-8 rounded-full bg-orange-500 text-black flex items-center justify-center mb-1 group-hover:scale-110 transition-transform shadow-md">
                    <Play className="w-4 h-4 fill-black translate-x-0.5" />
                  </div>
                  <span className="text-[10px] font-bold text-orange-400 uppercase tracking-tight leading-tight">
                    Watch Clip
                  </span>
                </button>
              )}
            </div>

            {/* Playable Video Clip Card Banner */}
            {product.videoClip && (
              <div
                onClick={() => setIsVideoModalOpen(true)}
                className="p-4 rounded-2xl bg-gradient-to-r from-orange-500/15 via-[#0d1017] to-black border border-orange-500/30 flex items-center justify-between gap-4 cursor-pointer hover:border-orange-500 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-orange-500 text-black flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform shadow-lg shadow-orange-500/30">
                    <Play className="w-6 h-6 fill-black translate-x-0.5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-orange-400 font-bold block">
                      Watch Product Demo & Sound Clip ({product.videoClip.duration})
                    </span>
                    <h4 className="text-xs font-bold text-white group-hover:text-orange-300">
                      {product.videoClip.title}
                    </h4>
                    <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                      {product.videoClip.description}
                    </p>
                  </div>
                </div>
                <div className="px-3 py-1.5 rounded-lg bg-orange-500/20 text-orange-400 text-xs font-bold whitespace-nowrap">
                  Play Clip &rarr;
                </div>
              </div>
            )}

            {/* Official Warranty Card */}
            <div className="p-5 rounded-2xl bg-[#090b10] border border-emerald-500/30 flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 flex-shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h4 className="text-xs font-bold uppercase tracking-wide text-emerald-400">
                  Official Manufacturer Warranty
                </h4>
                <p className="text-sm font-semibold text-white">
                  {product.warranty}
                </p>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Every part is covered by full direct replacement against manufacturing defects, abnormal wear, or performance drop. No questions asked.
                </p>
              </div>
            </div>

          </div>

          {/* Right Column: Title, Fitment, Price & Add To Cart (6 Cols) */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Header info */}
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold uppercase bg-white/10 text-orange-400">
                  {product.categoryLabel}
                </span>
                
                {/* Rating */}
                <div className="flex items-center gap-1.5 bg-white/5 px-2.5 py-1 rounded-full text-xs text-slate-300">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span className="font-bold text-white">{product.rating}</span>
                  <span className="text-slate-500">({product.reviewCount} customer reviews)</span>
                </div>
              </div>

              <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight">
                {product.name}
              </h1>

              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mt-3">
                {product.fullDesc}
              </p>
            </div>

            {/* Key Features Bullet Points */}
            <div className="p-4 rounded-2xl bg-[#090b10] border border-white/10 space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Engineered Performance Highlights
              </span>
              {product.features.map((feat, i) => (
                <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-orange-500 flex-shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>

            {/* Car Compatibility Checker */}
            <div className="p-5 rounded-2xl bg-[#0e1219] border border-white/10 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wide text-white flex items-center gap-2">
                  <Car className="w-4 h-4 text-orange-400" />
                  Check Compatibility for Your Vehicle
                </span>
                <span className="text-[11px] text-slate-400">OEM Direct Fit</span>
              </div>

              <form onSubmit={handleCheckCompatibility} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter car name (e.g. Swift, Creta, Nexon, Thar)..."
                  value={compatibilityCar}
                  onChange={(e) => setCompatibilityCar(e.target.value)}
                  className="flex-1 py-2 px-3 rounded-xl bg-black border border-white/10 text-white text-xs focus:outline-none focus:border-orange-500"
                />
                <button
                  type="submit"
                  className="py-2 px-4 rounded-xl bg-orange-500 hover:bg-orange-600 text-black font-bold text-xs uppercase cursor-pointer"
                >
                  Verify Fit
                </button>
              </form>

              {compatibilityResult && (
                <div
                  className={`p-3 rounded-xl text-xs flex items-center gap-2 ${
                    compatibilityResult.isCompatible
                      ? 'bg-emerald-500/15 border border-emerald-500/30 text-emerald-300'
                      : 'bg-amber-500/15 border border-amber-500/30 text-amber-300'
                  }`}
                >
                  {compatibilityResult.isCompatible ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400 stroke-[3]" />
                      <span>
                        <strong>100% Guaranteed Fit:</strong> This part is calibrated to fit your{' '}
                        {compatibilityResult.car} with zero alterations needed!
                      </span>
                    </>
                  ) : (
                    <>
                      <AlertCircle className="w-4 h-4 text-amber-400" />
                      <span>
                        Please consult our chief technician on WhatsApp for custom bracket confirmation for {compatibilityResult.car}.
                      </span>
                    </>
                  )}
                </div>
              )}

              {/* Supported models chips */}
              <div className="pt-1">
                <span className="text-[10px] text-slate-400 block mb-1">Confirmed Fitment:</span>
                <div className="flex flex-wrap gap-1.5">
                  {product.fitment.map((fit, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded text-[10px] bg-black/60 border border-white/10 text-slate-300"
                    >
                      {fit}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Price, Quantity & Add To Cart Box */}
            <div className="p-6 rounded-3xl bg-gradient-to-b from-[#11151f] to-[#090b10] border border-orange-500/40 shadow-2xl space-y-5">
              
              {/* Pricing Line */}
              <div className="flex flex-wrap items-baseline justify-between gap-2 pb-4 border-b border-white/10">
                <div>
                  <span className="text-[11px] text-slate-400 uppercase font-bold block">
                    Special Workshop Offer Price
                  </span>
                  <div className="flex items-baseline gap-3">
                    <span className="text-3xl font-black text-orange-400 font-mono">
                      ₹{product.price.toLocaleString('en-IN')}
                    </span>
                    <span className="text-base text-slate-500 line-through font-mono">
                      ₹{product.mrp.toLocaleString('en-IN')}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold">
                      {product.discountPercent}% Instant Discount
                    </span>
                  </div>
                  <span className="text-[11px] text-emerald-400 block mt-1">
                    You save ₹{(product.mrp - product.price).toLocaleString('en-IN')} on this item
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 block uppercase">Taxes</span>
                  <span className="text-xs text-white font-medium">All Taxes Included</span>
                </div>
              </div>

              {/* Workshop Installation Option Checkbox */}
              <label className="flex items-center justify-between p-3 rounded-xl bg-black/50 border border-white/10 hover:border-orange-500/40 cursor-pointer select-none transition-all">
                <div className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded-md flex items-center justify-center ${includeInstallation ? 'bg-orange-500 text-black' : 'border border-white/20'}`}>
                    {includeInstallation && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white block">
                      Include In-Store Professional Installation
                    </span>
                    <span className="text-[11px] text-slate-400">
                      Installed by certified technician at our workshop ramp
                    </span>
                  </div>
                </div>
                <span className="text-xs font-bold text-emerald-400 uppercase">
                  FREE
                </span>
              </label>

              {/* Quantity Selector & Action Buttons */}
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3 text-xs">
                    <span className="text-slate-400 uppercase font-bold text-[11px]">Quantity:</span>
                    <div className="flex items-center bg-black rounded-xl border border-white/15 px-2 py-1">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="p-1 hover:text-orange-400 text-slate-400 cursor-pointer"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-8 text-center font-mono font-bold text-white text-sm">
                        {quantity}
                      </span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="p-1 hover:text-orange-400 text-slate-400 cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 block uppercase">Total to Pay</span>
                    <span className="font-mono text-xl font-bold text-white">
                      ₹{totalPrice.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <button
                    onClick={handleAddToCart}
                    className="py-3.5 px-4 rounded-xl bg-orange-500 hover:bg-orange-600 text-black font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl shadow-orange-500/25 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                  >
                    <ShoppingBag className="w-4 h-4 fill-black" />
                    <span>Add to Cart</span>
                  </button>

                  <button
                    onClick={handleBuyNow}
                    className="py-3.5 px-4 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                  >
                    <span>Buy Now & Book Slot</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Delivery info */}
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/5 text-[11px] text-slate-400">
                <div className="flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-orange-400" />
                  <span>Free Express Delivery (24-48 Hours)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Wrench className="w-3.5 h-3.5 text-orange-400" />
                  <span>Zero Labor Fitting at Garage</span>
                </div>
              </div>

            </div>

          </div>

        </div>

        {/* Specifications & In-The-Box Details Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8 border-t border-white/10">
          
          {/* Left: Technical Specs Table (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <h3 className="text-lg font-bold text-white uppercase tracking-wide flex items-center gap-2">
              <Info className="w-4 h-4 text-orange-400" />
              Technical Specifications & OEM Standards
            </h3>

            <div className="rounded-2xl bg-[#090b10] border border-white/10 overflow-hidden divide-y divide-white/5 text-xs">
              {Object.entries(product.specifications).map(([key, val], idx) => (
                <div key={idx} className="flex justify-between p-3.5 hover:bg-white/[0.02]">
                  <span className="text-slate-400 font-medium">{key}</span>
                  <span className="text-white font-mono font-semibold text-right max-w-xs">{val}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: What's in the Box (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <h3 className="text-lg font-bold text-white uppercase tracking-wide flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-orange-400" />
              What's Included in the Box
            </h3>

            <div className="p-5 rounded-2xl bg-[#090b10] border border-white/10 space-y-3">
              {product.inTheBox.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                  <Check className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5 stroke-[3]" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-xl bg-orange-500/10 border border-orange-500/20 text-xs text-orange-300">
              💡 <strong>Workshop Tip:</strong> Bring your car directly to Vortex Motors after ordering online, or select "Workshop Fitting" at checkout to have our team install it immediately without queuing!
            </div>
          </div>

        </div>

        {/* Related Spare Parts */}
        <div className="pt-10 border-t border-white/10 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-white">
              Related Spare Parts & Accessories
            </h3>
            <button
              onClick={onBackToStore}
              className="text-xs text-orange-400 hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>View All Parts</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {relatedProducts.map((rel) => (
              <div
                key={rel.id}
                onClick={() => onSelectProduct(rel.id)}
                className="group p-4 rounded-2xl bg-[#090b10] border border-white/10 hover:border-orange-500/50 transition-all flex gap-3.5 cursor-pointer"
              >
                <img
                  src={rel.images[0]}
                  alt={rel.name}
                  className="w-20 h-20 rounded-xl object-cover bg-black border border-white/10 flex-shrink-0 group-hover:scale-105 transition-transform"
                />
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] text-orange-400 font-mono font-bold block uppercase">
                      {rel.brand}
                    </span>
                    <h4 className="text-xs font-bold text-white group-hover:text-orange-400 line-clamp-2 leading-snug">
                      {rel.name}
                    </h4>
                  </div>
                  <div className="flex items-baseline justify-between mt-2">
                    <span className="text-xs font-bold text-white font-mono">
                      ₹{rel.price.toLocaleString('en-IN')}
                    </span>
                    <span className="text-[10px] text-emerald-400 font-semibold">
                      {rel.discountPercent}% OFF
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Video Clip Modal */}
      {isVideoModalOpen && product.videoClip && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-md">
          <div className="relative w-full max-w-2xl rounded-2xl bg-[#090b10] border border-orange-500/50 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono text-orange-400 uppercase tracking-widest font-bold">
                  Official Demo & Audio Clip
                </span>
                <h3 className="text-base font-bold text-white">
                  {product.videoClip.title}
                </h3>
              </div>
              <button
                onClick={() => setIsVideoModalOpen(false)}
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white cursor-pointer"
              >
                &times; Close
              </button>
            </div>

            <div className="relative aspect-video rounded-xl overflow-hidden bg-black flex items-center justify-center">
              <img
                src={product.videoClip.thumbnail}
                alt="clip thumbnail"
                className="w-full h-full object-cover opacity-60"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 bg-black/40">
                <div className="w-16 h-16 rounded-full bg-orange-500 text-black flex items-center justify-center mb-3 shadow-2xl animate-pulse">
                  <Play className="w-8 h-8 fill-black translate-x-0.5" />
                </div>
                <span className="text-xs font-bold text-white uppercase tracking-wider">
                  Testing & Dyno Clip Active
                </span>
                <p className="text-[11px] text-slate-300 max-w-sm mt-1">
                  {product.videoClip.description}
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-400 text-center">
              Recorded in the Vortex Motors Precision Dyno Bay & Testing Track.
            </p>
          </div>
        </div>
      )}

    </div>
  );
}
