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

    // ✅ Socket reducers
    orderPlacedRealtime: (state, action) => {
      state.orders.push(action.payload);
    },
    orderCancelledRealtime: (state, action) => {
      const order = state.orders.find(o => o._id === action.payload.orderId);
      if (order) {
        order.status = action.payload.status;
      }
    },
  },
});

export const {
  fetchOrdersStart,
  fetchOrdersSuccess,
  fetchOrdersFailure,
  placeOrder,
  orderPlacedRealtime,
  orderCancelledRealtime,
} = orderSlice.actions;

export default orderSlice.reducer;