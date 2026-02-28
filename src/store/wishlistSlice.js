import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const savedItemsSlice = createSlice({
  name: "savedItems",
  initialState,
  reducers: {
    // ------------------ Local actions ------------------
    addToSavedItems: (state, action) => {
      const exists = state.items.some(
        (item) => item._id === action.payload._id
      );
      if (!exists) {
        state.items.push(action.payload);
      }
    },
    setAllSavedItems: (state, action) => {
      state.items = action.payload;
    },

    removeFromSavedItems: (state, action) => {
      state.items = state.items.filter(
        (item) => item._id !== action.payload
      );
    },

    clearSavedItems: (state) => {
      state.items = [];
    },

    // ------------------ Socket realtime ------------------
    wishlistUpdatedRealtime: (state, action) => {
      /**
       * Backend emit example:
       * io.emit("wishlistUpdated", { userId, wishlist })
       */
      state.items = action.payload.wishlist || [];
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
  setAllSavedItems,
  wishlistUpdatedRealtime,
  wishlistClearedRealtime,
} = savedItemsSlice.actions;

export default savedItemsSlice.reducer;
