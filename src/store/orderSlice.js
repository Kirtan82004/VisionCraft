// src/slices/orderSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  orders: [],
  loading: false,
  error: null,
};

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    fetchOrdersStart: (state) => {
      state.loading = true;
    },
    fetchOrdersSuccess: (state, action) => {
      state.loading = false;
      state.orders = action.payload;
    },
    fetchOrdersFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    placeOrder: (state, action) => {
      state.orders.push(action.payload);
    },
  },
});

export const { fetchOrdersStart, fetchOrdersSuccess, fetchOrdersFailure, placeOrder } = orderSlice.actions;
export default orderSlice.reducer;
