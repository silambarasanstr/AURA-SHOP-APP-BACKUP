// wishlistSlice.js
import { createSlice } from "@reduxjs/toolkit";

// Load wishlist from localStorage on app start
const loadWishlist = () => {
  const data = localStorage.getItem("wishlist");
  return data ? JSON.parse(data) : [];
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: loadWishlist(),

  reducers: {
    addToWishlist: (state, action) => {
      const exists = state.find(
        (item) => item._id === action.payload._id
      );

      if (!exists) {
        state.push(action.payload);

        localStorage.setItem(
          "wishlist",
          JSON.stringify(state)
        );
      }
    },

    removeFromWishlist: (state, action) => {
      const updatedWishlist = state.filter(
        (item) => item._id !== action.payload
      );

      localStorage.setItem(
        "wishlist",
        JSON.stringify(updatedWishlist)
      );

      return updatedWishlist;
    },

    clearWishlist: () => {
      localStorage.removeItem("wishlist");
      return [];
    },
  },
});

export const {
  addToWishlist,
  removeFromWishlist,
  clearWishlist,
} = wishlistSlice.actions;

export default wishlistSlice.reducer;