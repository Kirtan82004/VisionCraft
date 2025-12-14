import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [],   // current page products
  total: 0,       // total products count
  page: 1,        // current page
  pages: 1,       // total pages
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    fetchProductsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchProductsSuccess: (state, action) => {
      state.loading = false;
      // backend से आता है: { total, page, pages, data }
      state.products = action.payload.data;
      state.total = action.payload.total;
      state.page = action.payload.page;
      state.pages = action.payload.pages;
      console.log('Products updated in state:', state.products);
    },
    fetchProductsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // ✅ Socket reducers
    productAddedRealtime: (state, action) => {
      state.products.push(action.payload);
      state.total += 1;
    },
    productUpdatedRealtime: (state, action) => {
      const index = state.products.findIndex(p => p._id === action.payload._id);
      if (index !== -1) {
        state.products[index] = action.payload;
      }
    },
    productDeletedRealtime: (state, action) => {
      state.products = state.products.filter(p => p._id !== action.payload.productId);
      state.total -= 1;
    },
  },
});

export const {
  fetchProductsStart,
  fetchProductsSuccess,
  fetchProductsFailure,
  productAddedRealtime,
  productUpdatedRealtime,
  productDeletedRealtime,
} = productSlice.actions;

export default productSlice.reducer;
