import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [],
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    fetchProductsStart: (state) => {
      state.loading = true;
    },
    fetchProductsSuccess: (state, action) => {
      state.loading = false;
      state.products = action.payload;
    },
    fetchProductsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // ✅ Socket reducers
    productAddedRealtime: (state, action) => {
      state.products.push(action.payload);
    },
    productUpdatedRealtime: (state, action) => {
      const index = state.products.findIndex(p => p._id === action.payload._id);
      if (index !== -1) {
        state.products[index] = action.payload;
      }
    },
    productDeletedRealtime: (state, action) => {
      state.products = state.products.filter(p => p._id !== action.payload.productId);
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