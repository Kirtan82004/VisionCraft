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
    // ------------------ API fetch ------------------
    fetchProductsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchProductsSuccess: (state, action) => {
      state.loading = false;
      state.products = action.payload.data;
      state.total = action.payload.total;
      state.page = action.payload.page;
      state.pages = action.payload.pages;
    },
    fetchProductsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // ------------------ SOCKET REALTIME ------------------
    productAddedRealtime: (state, action) => {
      const exists = state.products.find(p => p._id === action.payload._id);
      if (!exists) {
        // latest product top of the list
        state.products.unshift(action.payload);
        state.total += 1;
      }
    },
    productUpdatedRealtime: (state, action) => {
      const index = state.products.findIndex(p => p._id === action.payload._id);
      if (index !== -1) {
        state.products[index] = action.payload;
      }
    },
    productDeletedRealtime: (state, action) => {
      const initialLength = state.products.length;
      state.products = state.products.filter(p => p._id !== action.payload.productId);
      if (state.products.length < initialLength) {
        state.total -= 1;
      }
    },

    // Optional: clear products on logout/navigation
    clearProductsState: (state) => {
      state.products = [];
      state.total = 0;
      state.page = 1;
      state.pages = 1;
      state.loading = false;
      state.error = null;
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
  clearProductsState,
} = productSlice.actions;

export default productSlice.reducer;
