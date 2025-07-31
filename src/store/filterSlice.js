import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchQuery: "",
  filteredProducts: [],
  allProducts: [],
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setAllProducts: (state, action) => {
      state.allProducts = action.payload;
    },
    filterProducts: (state, action) => {
      const query = action.payload.toLowerCase();
      state.filteredProducts = state.allProducts.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query) ||
          product.brand.toLowerCase().includes(query)
      );
    },
  },
});

export const { setSearchQuery, filterProducts,setAllProducts } = filterSlice.actions;
export default filterSlice.reducer;
