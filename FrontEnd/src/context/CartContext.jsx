import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

const initialCart = {
  items: [],
  totalPrice: 0,
  discount: 0,
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const stored = localStorage.getItem("cart");
      const parsed = stored ? JSON.parse(stored) : null;

      if (parsed && Array.isArray(parsed.items)) {
        return parsed;
      }

      return initialCart;
    } catch {
      return initialCart;
    }
  });

  // SAVE
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // 🔥 CENTRAL CART UPDATE
  const updateCart = (items) => {
    const safeItems = Array.isArray(items) ? items : [];

    let subtotal = 0;
    let discountTotal = 0;

    safeItems.forEach((item) => {
      const price = item?.product?.price || 0;
      const qty = item?.quantity || 0;
      const discountPercent = item?.product?.discount || 0;

      const itemTotal = price * qty;

      const itemDiscount = (itemTotal * discountPercent) / 100;

      subtotal += itemTotal;
      discountTotal += itemDiscount;
    });

    setCartItems(() => ({
      items: safeItems,
      totalPrice: Number(subtotal.toFixed(2)),
      discount: Number(discountTotal.toFixed(2)),
    }));
  };

  // ADD
  const addToCart = (product, quantity = 1) => {
    const items = cartItems?.items || [];

    const exists = items.find((i) => i?.product?._id === product?._id);

    let updated;

    if (exists) {
      updated = items.map((i) =>
        i.product._id === product._id ? { ...i, quantity: quantity } : i
      );
    } else {
      updated = [...items, { product, quantity }];
    }

    updateCart(updated);
  };

  // REMOVE
  const removeFromCart = (id) => {
    const items = cartItems?.items || [];
    const updated = items.filter((i) => i?.product?._id !== id);

    updateCart(updated);
  };

  // UPDATE QTY
  const updateQuantity = (id, type) => {
    const items = cartItems?.items || [];

    const updated = items
      .map((i) => {
        if (i.product._id !== id) return i;

        const qty = type === "inc" ? i.quantity + 1 : i.quantity - 1;

        return qty <= 0 ? null : { ...i, quantity: qty };
      })
      .filter(Boolean);

    updateCart(updated);
  };

  // CLEAR
  const clearCart = () => setCartItems(initialCart);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        updateQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
