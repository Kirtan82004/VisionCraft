import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  allOrders: [],
  totalOrders: 0, // total number of orders
  loading: false,
  error: null,
};

const adminOrderSlice = createSlice({
  name: 'adminOrders',
  initialState,
  reducers: {
    // ------------------ API Fetch ------------------
    fetchAllOrdersStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchAllOrdersSuccess: (state, action) => {
      state.loading = false;
      state.allOrders = action.payload.orders || [];
      state.totalOrders = action.payload.totalOrders || state.allOrders.length;
    },
    fetchAllOrdersFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // ------------------ Update order manually ------------------
    updateOrderStatus: (state, action) => {
      const order = state.allOrders.find(o => o._id === action.payload.id);
      if (order) {
        order.orderStatus = action.payload.status;
      }
    },

    // ------------------ SOCKET REALTIME ------------------
    addOrderRealtime: (state, action) => {
      const exists = state.allOrders.find(o => o._id === action.payload._id);
      if (!exists) {
        state.allOrders.unshift(action.payload);
        state.totalOrders += 1;
      }
    },
    cancelOrderRealtime: (state, action) => {
      const order = state.allOrders.find(o => o._id === action.payload.orderId);
      if (order) {
        order.orderStatus = action.payload.status;
      }
    },

    // Optional: clear orders on logout or admin switch
    clearAdminOrders: (state) => {
      state.allOrders = [];
      state.totalOrders = 0;
      state.loading = false;
      state.error = null;
    },
  },
});

export const {
  fetchAllOrdersStart,
  fetchAllOrdersSuccess,
  fetchAllOrdersFailure,
  updateOrderStatus,
  addOrderRealtime,
  cancelOrderRealtime,
  clearAdminOrders,
} = adminOrderSlice.actions;

export default adminOrderSlice.reducer;
