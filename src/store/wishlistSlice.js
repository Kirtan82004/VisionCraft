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
  },
});

export const { addToSavedItems, removeFromSavedItems, clearSavedItems } =
  savedItemsSlice.actions;
export default savedItemsSlice.reducer;
