import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

const initialCart = {
  items: [],
  totalPrice: 0,
};

export const CartProvider = ({ children }) => {
  // ✅ SAFE LOAD
  const [cartItems, setCartItems] = useState(() => {
    try {
      const storedCart = localStorage.getItem("cart");
      const parsed = storedCart ? JSON.parse(storedCart) : null;

      if (parsed && Array.isArray(parsed.items) && typeof parsed.totalPrice === "number") {
        return parsed;
      }

      return initialCart;
    } catch {
      return initialCart;
    }
  });

  // ✅ SAVE
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // ✅ COMMON updater
  const updateCart = (items) => {
    const safeItems = items || [];

    const totalPrice = safeItems.reduce(
      (acc, item) => acc + (item?.product?.price || 0) * (item?.quantity || 0),
      0
    );

    setCartItems({ items: safeItems, totalPrice });
  };

  // ✅ ADD
  const addToCart = (product) => {
    const items = cartItems?.items || [];

    const existingItem = items.find((item) => item?.product?._id === product?._id);

    let updatedItems;

    if (existingItem) {
      updatedItems = items.map((item) =>
        item?.product?._id === product?._id ? { ...item, quantity: item?.quantity + 1 } : item
      );
    } else {
      updatedItems = [...items, { product, quantity: 1 }];
    }

    updateCart(updatedItems);
  };

  // ✅ REMOVE
  const removeFromCart = (id) => {
    const items = cartItems?.items || [];

    const updatedItems = items.filter((item) => item?.product?._id !== id);

    updateCart(updatedItems);
  };

  // ✅ 🔥 UPDATE QUANTITY (NEW)
  const updateQuantity = (id, type) => {
    const items = cartItems?.items || [];

    const updatedItems = items
      .map((item) => {
        if (item.product._id === id) {
          let newQty = type === "inc" ? item.quantity + 1 : item.quantity - 1;

          // ❌ remove if qty becomes 0
          if (newQty <= 0) return null;

          return { ...item, quantity: newQty };
        }
        return item;
      })
      .filter(Boolean);

    updateCart(updatedItems);
  };

  // ✅ CLEAR
  const clearCart = () => {
    setCartItems(initialCart);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        updateQuantity, // 🔥 exposed
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
