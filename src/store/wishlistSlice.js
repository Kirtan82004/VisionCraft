import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const savedItemsSlice = createSlice({
  name: "savedItems",
  initialState,
  reducers: {
    addToSavedItems: (state, action) => {
      state.items.push(action.payload);
    },
    removeFromSavedItems: (state, action) => {
      state.items = state.items.filter((item) => item._id !== action.payload);
    },
    clearSavedItems: (state) => {
      state.items = [];
    },

    // ✅ Socket reducers
    wishlistUpdatedRealtime: (state, action) => {
      state.items = action.payload.wishlist;
    },
    wishlistClearedRealtime: (state) => {
      state.items = [];
    },
  },
});

export const {
  addToSavedItems,
  removeFromSavedItems,
  clearSavedItems,
  wishlistUpdatedRealtime,
  wishlistClearedRealtime,
} = savedItemsSlice.actions;

export default savedItemsSlice.reducer;