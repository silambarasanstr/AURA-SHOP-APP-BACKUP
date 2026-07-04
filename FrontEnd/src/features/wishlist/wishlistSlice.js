import { createSlice } from "@reduxjs/toolkit";

const loadWishlist = () => {
  const data = localStorage.getItem("wishlist");
  return data ? JSON.parse(data) : [];
};

const save = (state) => {
  localStorage.setItem("wishlist", JSON.stringify(state));
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: loadWishlist(),

  reducers: {
    addToWishlist: (state, action) => {
      const exists = state.find((item) => item._id === action.payload._id);
      if (!exists) {
        state.push({ ...action.payload, addedAt: Date.now() });
        save(state);
      }
    },

    removeFromWishlist: (state, action) => {
      const updated = state.filter((item) => item._id !== action.payload);
      save(updated);
      return updated;
    },

    clearWishlist: () => {
      localStorage.removeItem("wishlist");
      return [];
    },
  },
});

export const { addToWishlist, removeFromWishlist, clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
