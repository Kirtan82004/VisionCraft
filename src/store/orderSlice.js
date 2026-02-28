import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  savedOrders: [],
  totalOrders: 0, // total number of orders (for badges/UI)
  loading: false,
  error: null,
};

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    // ------------------ API Fetch ------------------
    fetchOrdersStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchOrdersSuccess: (state, action) => {
      state.loading = false;
      state.savedOrders = action.payload.orders || [];
      state.totalOrders = action.payload.totalOrders || state.orders.length;
    },
    fetchOrdersFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // ------------------ User actions ------------------
    placeOrder: (state, action) => {
      state.savedOrders.push(action.payload);
      state.totalOrders += 1;
    },

    // ------------------ SOCKET REALTIME ------------------
    orderPlacedRealtime: (state, action) => {
      const exists = state.savedOrders.find(o => o._id === action.payload._id);
      if (!exists) {
        state.savedOrders.push(action.payload);
        state.totalOrders += 1;
      }
    },
    orderCancelledRealtime: (state, action) => {
      const order = state.savedOrders.find(o => o._id === action.payload.orderId);
      if (order) {
        order.orderStatus = action.payload.status;
      }
    },

    // Optional: clear orders on logout
    clearOrders: (state) => {
      state.savedOrders = [];
      state.totalOrders = 0;
      state.loading = false;
      state.error = null;
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
  clearOrders,
} = orderSlice.actions;

export default orderSlice.reducer;
