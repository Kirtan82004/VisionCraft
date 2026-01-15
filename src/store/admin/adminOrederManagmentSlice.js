import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  allOrders: [],
  loading: false,
  error: null,
};

const adminOrderSlice = createSlice({
  name: 'adminOrders',
  initialState,
  reducers: {
    fetchAllOrdersStart: (state) => {
      state.loading = true;
    },
    fetchAllOrdersSuccess: (state, action) => {
      state.loading = false;
      state.allOrders = action.payload;
    },
    fetchAllOrdersFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateOrderStatus: (state, action) => {
      const order = state.allOrders.find(order => order._id === action.payload.id);
      if (order) order.status = action.payload.status;
    },

    // ✅ Socket reducers
    addOrderRealtime: (state, action) => {
      state.allOrders.unshift(action.payload);
    },
    cancelOrderRealtime: (state, action) => {
      const order = state.allOrders.find(o => o._id === action.payload.orderId);
      if (order) {
        order.status = action.payload.status;
      }
    },
  },
});

export const {
  fetchAllOrdersStart,
  fetchAllOrdersSuccess,
  fetchAllOrdersFailure,
  updateOrderStatus,
  addOrderRealtime,
  cancelOrderRealtime
} = adminOrderSlice.actions;

export default adminOrderSlice.reducer;