import React from 'react';
import { CAR_PARTS_DATA } from '../data/partsData';
import { useCart } from '../context/CartContext';
import { ShoppingBag, ArrowRight, ShieldCheck, Star, Sparkles, CheckCircle2 } from 'lucide-react';

export default function FeaturedPartsSection({ onNavigateToStore, onSelectProduct }) {
  const { addToCart } = useCart();
  const featuredParts = CAR_PARTS_DATA.slice(0, 5);

  const handleQuickAdd = (part, e) => {
    e.stopPropagation();
    addToCart({
      id: part.id,
      type: 'part',
      title: part.name,
      brand: part.brand,
      price: part.price,
      mrp: part.mrp,
      quantity: 1,
      image: part.images[0],
      details: part.warranty
    });
  };

  return (
    <section id="featured-parts" className="relative py-20 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto border-t border-white/10">
      
      {/* Top Header with Store Link Button */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Genuine Workshop Spare Parts</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-2">
            Featured Genuine Spares & <span className="text-orange-500">Upgrades</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            100% authentic manufacturer-sealed components. Every part comes with official warranty and optional free fitting at our workshop.
          </p>
        </div>

        <button
          onClick={onNavigateToStore}
          className="flex-shrink-0 inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-black font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-orange-500/20 hover:scale-105 transition-all cursor-pointer"
        >
          <span>Open Full Parts Store</span>
          <ArrowRight className="w-4 h-4 stroke-[3]" />
        </button>
      </div>

      {/* 4 to 5 Featured Products Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
        {featuredParts.map((part) => (
          <div
            key={part.id}
            onClick={() => onSelectProduct(part.id)}
            className="group rounded-2xl bg-[#131d31] border border-white/10 hover:border-orange-500/50 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-xl hover:-translate-y-1 cursor-pointer"
          >
            {/* Card Top: Image + Badges */}
            <div className="relative aspect-square overflow-hidden bg-black/60">
              <img
                src={part.images[0]}
                alt={part.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              
              {/* Discount Tag */}
              <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded bg-orange-500 text-black font-extrabold text-[10px] uppercase tracking-wider">
                {part.discountPercent}% OFF
              </div>

              {/* Brand Tag */}
              <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded bg-black/75 backdrop-blur-md border border-white/15 text-white font-mono text-[10px] font-bold">
                {part.brand}
              </div>

              {/* In-Stock Indicator */}
              <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1 px-2 py-0.5 rounded bg-black/80 backdrop-blur-sm text-emerald-400 text-[10px] font-medium border border-emerald-500/30">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>In Stock ({part.stockCount} units)</span>
              </div>
            </div>

            {/* Card Body */}
            <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
              <div>
                {/* Rating & Warranty */}
                <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1.5">
                  <div className="flex items-center gap-1 text-amber-400 font-bold">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <span>{part.rating}</span>
                    <span className="text-slate-500 font-normal">({part.reviewCount})</span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono">
                    {part.categoryLabel.split(' ')[0]}
                  </span>
                </div>

                <h3 className="text-xs font-bold text-white group-hover:text-orange-400 transition-colors line-clamp-2 leading-snug">
                  {part.name}
                </h3>

                <p className="text-[11px] text-slate-400 mt-1.5 line-clamp-2 leading-relaxed">
                  {part.shortDesc}
                </p>
              </div>

              {/* Price & Action Buttons */}
              <div className="pt-3 border-t border-white/5 space-y-2">
                <div className="flex items-baseline justify-between">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-base font-extrabold text-white font-mono">
                      ₹{part.price.toLocaleString('en-IN')}
                    </span>
                    <span className="text-xs text-slate-500 line-through font-mono">
                      ₹{part.mrp.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <span className="text-[10px] text-emerald-400 font-semibold">
                    Save ₹{(part.mrp - part.price).toLocaleString('en-IN')}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-1">
                  <button
                    onClick={(e) => handleQuickAdd(part, e)}
                    className="py-2 px-2 rounded-lg bg-orange-500 hover:bg-orange-600 text-black font-extrabold text-[11px] uppercase tracking-wider flex items-center justify-center gap-1 transition-all cursor-pointer shadow-md shadow-orange-500/20"
                    title="Add to Cart"
                  >
                    <ShoppingBag className="w-3 h-3 fill-black" />
                    <span>Add</span>
                  </button>

                  <button
                    onClick={() => onSelectProduct(part.id)}
                    className="py-2 px-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold text-[11px] uppercase tracking-wider flex items-center justify-center transition-all cursor-pointer"
                  >
                    Details &rarr;
                  </button>
                </div>
              </div>

            </div>

          </div>
        ))}
      </div>

      {/* Trust Badges Bar */}
      <div className="mt-10 p-4 rounded-xl bg-black/40 border border-white/5 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
        <div className="flex items-center justify-center gap-2 text-xs text-slate-300">
          <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          <span>100% Manufacturer Genuine</span>
        </div>
        <div className="flex items-center justify-center gap-2 text-xs text-slate-300">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          <span>Official Replacement Warranty</span>
        </div>
        <div className="flex items-center justify-center gap-2 text-xs text-slate-300">
          <span className="text-orange-400 text-base">🛠️</span>
          <span>Free In-Store Fitting Option</span>
        </div>
        <div className="flex items-center justify-center gap-2 text-xs text-slate-300">
          <span className="text-orange-400 text-base">🚚</span>
          <span>Express 24H Courier Shipping</span>
        </div>
      </div>

    </section>
  );
}
