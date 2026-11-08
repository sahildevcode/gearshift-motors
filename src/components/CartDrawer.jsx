import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck, CheckCircle2, Phone, Calendar, MessageSquare } from 'lucide-react';

export default function CartDrawer({ onProceedToBooking }) {
  const {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    subtotal,
    totalSavings,
    clearCart
  } = useCart();

  const [checkoutStep, setCheckoutStep] = useState('cart'); // 'cart' | 'checkout' | 'success'
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    address: '',
    carModel: '',
    orderType: 'workshop_visit' // 'workshop_visit' | 'doorstep_delivery'
  });
  const [confirmedOrderId, setConfirmedOrderId] = useState('');

  if (!isCartOpen) return null;

  const handleCheckoutSubmit = (e) => {
    e.preventDefault();
    const orderId = 'VX-' + Math.floor(100000 + Math.random() * 900000);
    setConfirmedOrderId(orderId);
    setCheckoutStep('success');
  };

  const handleSendToWhatsApp = () => {
    const itemsList = cartItems
      .map(
        (i, idx) =>
          `${idx + 1}. *${i.title}* (${i.type === 'service' ? 'Service Package' : 'Car Part'}) x${i.quantity} = ₹${(i.price * i.quantity).toLocaleString('en-IN')}`
      )
      .join('\n');

    const msg = `*NEW VORTEX ORDER & BOOKING*\nOrder ID: ${confirmedOrderId || 'NEW'}\n\n*Customer:* ${customerInfo.name || 'Customer'}\n*Phone:* ${customerInfo.phone}\n*Vehicle:* ${customerInfo.carModel || 'Not Specified'}\n*Order Type:* ${customerInfo.orderType === 'workshop_visit' ? 'Workshop Installation / Visit' : 'Courier Delivery'}\n\n*Items Ordered:*\n${itemsList}\n\n*Total Amount:* ₹${subtotal.toLocaleString('en-IN')}\n*Total Savings:* ₹${totalSavings.toLocaleString('en-IN')}`;

    window.open(`https://wa.me/919876543210?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#090b10] border-l border-white/10 text-white shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-5 border-b border-white/10 flex items-center justify-between bg-black/60">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-orange-500/20 border border-orange-500/30 flex items-center justify-center text-orange-400">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-base text-white tracking-wide">
                  Your Cart & Services
                </h3>
                <span className="text-xs text-slate-400">
                  {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in order
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            
            {/* Empty State */}
            {cartItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12 px-4 space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-500">
                  <ShoppingBag className="w-8 h-8 stroke-[1.5]" />
                </div>
                <h4 className="text-lg font-bold text-slate-200">Your cart is empty</h4>
                <p className="text-xs text-slate-400 max-w-xs leading-relaxed">
                  Choose required services in our Budget Calculator or add genuine spare parts from our store to get started.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="mt-2 py-2.5 px-6 rounded-lg bg-orange-500 hover:bg-orange-600 text-black font-bold text-xs uppercase tracking-wider transition-all cursor-pointer"
                >
                  Explore Services & Parts
                </button>
              </div>
            ) : checkoutStep === 'cart' ? (
              /* Items List */
              <div className="space-y-3">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="p-3.5 rounded-xl bg-black/60 border border-white/10 hover:border-white/20 transition-all flex gap-3.5"
                  >
                    {/* Item Image */}
                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-16 h-16 rounded-lg object-cover bg-slate-900 border border-white/10 flex-shrink-0"
                      />
                    )}

                    {/* Details */}
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="text-xs font-bold text-white line-clamp-2 leading-snug">
                            {item.title}
                          </h4>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-slate-500 hover:text-red-400 p-1 -mt-1 transition-colors cursor-pointer"
                            title="Remove"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {item.type === 'service' ? (
                          <span className="inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-medium bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                            Workshop Service Combo
                          </span>
                        ) : (
                          <span className="inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-medium bg-orange-500/20 text-orange-400 border border-orange-500/30">
                            {item.brand || 'Genuine Part'}
                          </span>
                        )}

                        {item.details && (
                          <p className="text-[11px] text-slate-400 mt-1 line-clamp-1">
                            {item.details}
                          </p>
                        )}
                      </div>

                      {/* Quantity & Price */}
                      <div className="flex items-center justify-between pt-2 mt-2 border-t border-white/5">
                        <div className="flex items-center gap-2 bg-white/5 rounded-md px-1.5 py-0.5 border border-white/10">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 hover:text-orange-400 text-slate-400 cursor-pointer"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-mono font-bold text-white px-1">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 hover:text-orange-400 text-slate-400 cursor-pointer"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <div className="text-right">
                          <span className="text-xs font-bold text-white block">
                            ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                          </span>
                          {item.mrp && item.mrp > item.price && (
                            <span className="text-[10px] text-slate-500 line-through">
                              ₹{(item.mrp * item.quantity).toLocaleString('en-IN')}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                <button
                  onClick={clearCart}
                  className="text-[11px] text-slate-500 hover:text-red-400 underline pt-1 block ml-auto cursor-pointer"
                >
                  Clear all items
                </button>
              </div>
            ) : checkoutStep === 'checkout' ? (
              /* Quick Checkout Form */
              <form onSubmit={handleCheckoutSubmit} className="space-y-4">
                <div className="p-3 rounded-lg bg-orange-500/10 border border-orange-500/20 text-xs text-orange-300">
                  Enter your details below to confirm your workshop slot or parts delivery.
                </div>

                <div>
                  <label className="block text-[11px] uppercase font-bold text-slate-400 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sahil Verma"
                    value={customerInfo.name}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                    className="w-full py-2.5 px-3 rounded-lg bg-black border border-white/10 text-white text-xs focus:outline-none focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase font-bold text-slate-400 mb-1">
                    Mobile Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={customerInfo.phone}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                    className="w-full py-2.5 px-3 rounded-lg bg-black border border-white/10 text-white text-xs focus:outline-none focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase font-bold text-slate-400 mb-1">
                    Car Model & Year
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Maruti Swift 2021 / Creta Diesel"
                    value={customerInfo.carModel}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, carModel: e.target.value })}
                    className="w-full py-2.5 px-3 rounded-lg bg-black border border-white/10 text-white text-xs focus:outline-none focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase font-bold text-slate-400 mb-1">
                    Service / Delivery Preference
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setCustomerInfo({ ...customerInfo, orderType: 'workshop_visit' })}
                      className={`p-2.5 rounded-lg border text-left text-xs transition-all cursor-pointer ${
                        customerInfo.orderType === 'workshop_visit'
                          ? 'border-orange-500 bg-orange-500/10 text-orange-400 font-bold'
                          : 'border-white/10 bg-black/40 text-slate-400'
                      }`}
                    >
                      🚗 Workshop Visit & Fitting
                    </button>
                    <button
                      type="button"
                      onClick={() => setCustomerInfo({ ...customerInfo, orderType: 'doorstep_delivery' })}
                      className={`p-2.5 rounded-lg border text-left text-xs transition-all cursor-pointer ${
                        customerInfo.orderType === 'doorstep_delivery'
                          ? 'border-orange-500 bg-orange-500/10 text-orange-400 font-bold'
                          : 'border-white/10 bg-black/40 text-slate-400'
                      }`}
                    >
                      📦 Doorstep Delivery
                    </button>
                  </div>
                </div>

                {customerInfo.orderType === 'doorstep_delivery' && (
                  <div>
                    <label className="block text-[11px] uppercase font-bold text-slate-400 mb-1">
                      Delivery Address
                    </label>
                    <textarea
                      rows="2"
                      placeholder="Street, City, Pincode"
                      value={customerInfo.address}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, address: e.target.value })}
                      className="w-full py-2 px-3 rounded-lg bg-black border border-white/10 text-white text-xs focus:outline-none focus:border-orange-500"
                    />
                  </div>
                )}

                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setCheckoutStep('cart')}
                    className="w-1/3 py-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-bold cursor-pointer"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="w-2/3 py-2.5 rounded-lg bg-orange-500 hover:bg-orange-600 text-black font-bold text-xs uppercase tracking-wider cursor-pointer"
                  >
                    Confirm Order
                  </button>
                </div>
              </form>
            ) : (
              /* Success Screen */
              <div className="py-8 px-4 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center mx-auto text-emerald-400">
                  <CheckCircle2 className="w-9 h-9" />
                </div>
                <h4 className="text-xl font-bold text-white">Order Confirmed!</h4>
                <div className="p-3 rounded-lg bg-white/5 border border-white/10 text-xs">
                  <span className="text-slate-400 block text-[11px]">Booking Reference</span>
                  <span className="font-mono text-base font-bold text-orange-400">
                    {confirmedOrderId}
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Thank you, {customerInfo.name || 'Valued Customer'}! Your service slot / parts dispatch has been reserved. Our workshop team will reach out within 10 minutes.
                </p>
                <div className="space-y-2 pt-2">
                  <button
                    onClick={handleSendToWhatsApp}
                    className="w-full py-3 px-4 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-black font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-emerald-500/20"
                  >
                    <MessageSquare className="w-4 h-4 fill-black" />
                    <span>Send Order Details to WhatsApp</span>
                  </button>
                  <button
                    onClick={() => {
                      clearCart();
                      setCheckoutStep('cart');
                      setIsCartOpen(false);
                    }}
                    className="w-full py-2.5 px-4 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-medium cursor-pointer"
                  >
                    Close & Continue Browsing
                  </button>
                </div>
              </div>
            )}

          </div>

          {/* Footer Pricing Summary */}
          {cartItems.length > 0 && checkoutStep === 'cart' && (
            <div className="p-5 border-t border-white/10 bg-black/80 space-y-3">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-400">
                  <span>Subtotal</span>
                  <span className="text-white font-mono font-medium">
                    ₹{subtotal.toLocaleString('en-IN')}
                  </span>
                </div>
                {totalSavings > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Instant Discount / Savings</span>
                    <span className="font-mono font-bold">
                      -₹{totalSavings.toLocaleString('en-IN')}
                    </span>
                  </div>
                )}
                <div className="flex justify-between text-slate-400">
                  <span>Installation / Pickup</span>
                  <span className="text-emerald-400 font-bold uppercase text-[11px]">
                    FREE Included
                  </span>
                </div>
                <div className="flex justify-between text-base font-bold text-white pt-2 border-t border-white/10">
                  <span>Total Amount</span>
                  <span className="text-orange-400 font-mono text-lg">
                    ₹{subtotal.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              <button
                onClick={() => setCheckoutStep('checkout')}
                className="w-full py-3.5 px-4 rounded-xl bg-orange-500 hover:bg-orange-600 text-black font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl shadow-orange-500/25 transition-all cursor-pointer hover:scale-[1.02]"
              >
                <span>Proceed to Checkout / Book Slot</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] text-slate-500 text-center">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>100% Genuine OEM Spares &bull; Pay After Service Satisfaction</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
