import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('vortex_cart');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem('vortex_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [cartItems]);

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  const addToCart = (item, quantity = 1) => {
    setCartItems((prev) => {
      // Check if item already exists (by ID)
      const existingIndex = prev.findIndex((i) => i.id === item.id);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity
        };
        return updated;
      } else {
        return [...prev, { ...item, quantity }];
      }
    });

    showToast(`✓ Added "${item.title || item.name}" to Cart!`);
  };

  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((i) => i.id !== id));
    showToast('Item removed from cart');
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCartItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, quantity: newQuantity } : i))
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  // Computations
  const totalItemsCount = cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + (item.price || 0) * (item.quantity || 1),
    0
  );

  const rawMrpTotal = cartItems.reduce(
    (sum, item) => sum + (item.mrp || item.price || 0) * (item.quantity || 1),
    0
  );

  const totalSavings = Math.max(0, rawMrpTotal - subtotal);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        totalItemsCount,
        subtotal,
        rawMrpTotal,
        totalSavings,
        toastMessage,
        showToast
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
