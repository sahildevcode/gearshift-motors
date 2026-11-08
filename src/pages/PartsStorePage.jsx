import React, { useState, useMemo } from 'react';
import { CAR_PARTS_DATA, PART_CATEGORIES } from '../data/partsData';
import { useCart } from '../context/CartContext';
import { 
  Search, SlidersHorizontal, ArrowLeft, Star, ShoppingBag, 
  ShieldCheck, Check, Sparkles, Filter, ChevronRight 
} from 'lucide-react';

export default function PartsStorePage({ onBackToHome, onSelectProduct }) {
  const { addToCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('popular'); // 'popular' | 'price-asc' | 'price-desc' | 'rating'

  const filteredParts = useMemo(() => {
    return CAR_PARTS_DATA.filter((part) => {
      const matchesCategory =
        selectedCategory === 'all' || part.category === selectedCategory;
      const matchesSearch =
        part.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        part.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        part.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase()) ||
        part.fitment.some((f) => f.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesCategory && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return b.reviewCount - a.reviewCount; // popular
    });
  }, [selectedCategory, searchQuery, sortBy]);

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
    <div className="min-h-screen bg-[#000000] text-white pt-24 pb-20 px-4 sm:px-8 lg:px-12 selection:bg-orange-500 selection:text-black">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Top Breadcrumb & Back Navigation */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-white/10">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <button
              onClick={onBackToHome}
              className="hover:text-orange-400 flex items-center gap-1 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Home</span>
            </button>
            <span>/</span>
            <span className="text-orange-400 font-bold">Parts & Spares Store</span>
          </div>

          <div className="flex items-center gap-3 text-xs text-emerald-400 font-mono">
            <ShieldCheck className="w-4 h-4" />
            <span>100% Genuine OEM &bull; Free In-Store Fitting Option</span>
          </div>
        </div>

        {/* Page Banner Header */}
        <div className="p-6 sm:p-10 rounded-3xl bg-gradient-to-r from-[#0d1017] via-[#121622] to-[#0d1017] border border-white/10 shadow-2xl relative overflow-hidden">
          <div className="max-w-2xl space-y-3 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Certified Auto Parts Catalog</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              Genuine Car Spares & <span className="text-orange-500">Performance Upgrades</span>
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              Explore our full inventory of brake pads, synthetic engine lubricants, high-output LED headlights, air filters, and suspension systems with official manufacturer warranties and transparent pricing.
            </p>
          </div>

          <div className="absolute right-0 bottom-0 top-0 w-1/3 bg-gradient-to-l from-orange-600/10 to-transparent pointer-events-none" />
        </div>

        {/* Search & Filter Toolbar */}
        <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between p-4 rounded-2xl bg-[#090b10] border border-white/10">
          {/* Search bar */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by part name, brand (Brembo, Castrol, Philips) or car model (Swift, Creta, Thar)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-black border border-white/10 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-orange-500"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white text-xs cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>

          {/* Sort selector */}
          <div className="flex items-center gap-2 flex-shrink-0 text-xs">
            <SlidersHorizontal className="w-4 h-4 text-slate-400" />
            <span className="text-slate-400 uppercase text-[11px] font-bold">Sort By:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="py-2.5 px-3 rounded-xl bg-black border border-white/10 text-white text-xs focus:outline-none focus:border-orange-500 cursor-pointer"
            >
              <option value="popular">Most Popular & Best Selling</option>
              <option value="rating">Highest Customer Rating</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {PART_CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`py-2 px-4 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer border ${
                  isSelected
                    ? 'bg-orange-500 text-black border-orange-500 shadow-md shadow-orange-500/20'
                    : 'bg-black/60 text-slate-300 border-white/10 hover:border-white/20 hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Product Count Header */}
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span>
            Showing <strong className="text-white">{filteredParts.length}</strong> genuine spare parts
          </span>
          {selectedCategory !== 'all' && (
            <button
              onClick={() => setSelectedCategory('all')}
              className="text-orange-400 hover:underline cursor-pointer"
            >
              Reset Category Filter
            </button>
          )}
        </div>

        {/* Empty State */}
        {filteredParts.length === 0 ? (
          <div className="py-20 text-center rounded-3xl bg-[#090b10] border border-white/10 space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto text-slate-500">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">No matching spare parts found</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              We couldn't find any parts matching "{searchQuery}". Try searching for another brand (e.g. Brembo, Castrol) or reset filters.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="py-2.5 px-6 rounded-xl bg-orange-500 text-black font-bold text-xs uppercase cursor-pointer"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          /* Products Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredParts.map((part) => (
              <div
                key={part.id}
                onClick={() => onSelectProduct(part.id)}
                className="group rounded-2xl bg-[#090b10] border border-white/10 hover:border-orange-500/50 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-xl hover:-translate-y-1 cursor-pointer"
              >
                {/* Image & Tags */}
                <div className="relative aspect-square overflow-hidden bg-black/60">
                  <img
                    src={part.images[0]}
                    alt={part.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  {/* Discount Tag */}
                  <div className="absolute top-3 left-3 px-2 py-0.5 rounded bg-orange-500 text-black font-extrabold text-[10px] uppercase tracking-wider">
                    {part.discountPercent}% OFF
                  </div>

                  {/* Brand Tag */}
                  <div className="absolute top-3 right-3 px-2.5 py-0.5 rounded bg-black/80 backdrop-blur-md border border-white/15 text-white font-mono text-[10px] font-bold">
                    {part.brand}
                  </div>

                  {/* Stock count badge */}
                  <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1 px-2 py-0.5 rounded bg-black/80 backdrop-blur-sm text-emerald-400 text-[10px] font-medium border border-emerald-500/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span>In Stock ({part.stockCount} units)</span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    {/* Rating & Category */}
                    <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1.5">
                      <div className="flex items-center gap-1 text-amber-400 font-bold">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        <span>{part.rating}</span>
                        <span className="text-slate-500 font-normal">({part.reviewCount})</span>
                      </div>
                      <span className="text-[10px] text-slate-400 font-mono">
                        {part.categoryLabel}
                      </span>
                    </div>

                    <h3 className="text-xs font-bold text-white group-hover:text-orange-400 transition-colors line-clamp-2 leading-snug">
                      {part.name}
                    </h3>

                    {/* Warranty pill */}
                    <div className="mt-2 flex items-center gap-1 text-[10px] text-slate-300">
                      <ShieldCheck className="w-3 h-3 text-emerald-400 flex-shrink-0" />
                      <span className="line-clamp-1">{part.warranty}</span>
                    </div>

                    <p className="text-[11px] text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                      {part.shortDesc}
                    </p>
                  </div>

                  {/* Pricing and Action Buttons */}
                  <div className="pt-3 border-t border-white/5 space-y-2">
                    <div className="flex items-baseline justify-between">
                      <div className="flex items-baseline gap-2">
                        <span className="text-lg font-black text-white font-mono">
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
                        className="py-2.5 px-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-black font-extrabold text-[11px] uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-md shadow-orange-500/20"
                        title="Add to Cart"
                      >
                        <ShoppingBag className="w-3.5 h-3.5 fill-black" />
                        <span>Add</span>
                      </button>

                      <button
                        onClick={() => onSelectProduct(part.id)}
                        className="py-2.5 px-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold text-[11px] uppercase tracking-wider flex items-center justify-center gap-1 transition-all cursor-pointer"
                      >
                        <span>Details</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
