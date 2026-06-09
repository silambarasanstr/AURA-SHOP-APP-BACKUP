import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: {
    items: [],
    totalPrice: 0,
    discount: 0,
  },
};

const calculateTotalPrice = (items) => {
  return items.reduce(
    (total, item) =>
      total + (item.product?.price || 0) * (item.quantity || 0),
    0
  );
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;

      const existingItem = state.cart.items.find(
        (item) => item.product._id === product._id
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cart.items.push({
          product,
          quantity: 1,
        });
      }

      state.cart.totalPrice = calculateTotalPrice(state.cart.items);
    },

    removeFromCart: (state, action) => {
      state.cart.items = state.cart.items.filter(
        (item) => item.product._id !== action.payload
      );

      state.cart.totalPrice = calculateTotalPrice(state.cart.items);
    },

    clearCart: (state) => {
      state.cart.items = [];
      state.cart.totalPrice = 0;
      state.cart.discount = 0;
    },

    updateQuantity: (state, action) => {
      const { productId, quantity } = action.payload;

      const item = state.cart.items.find(
        (item) => item.product._id === productId
      );

      if (item) {
        item.quantity = quantity > 0 ? quantity : 1;
      }

      state.cart.totalPrice = calculateTotalPrice(state.cart.items);
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  clearCart,
  updateQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;