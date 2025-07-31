// src/slices/notificationSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  notifications: [],
  loading: false,
  error: null,
};

const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    fetchNotificationsStart: (state) => {
      state.loading = true;
    },
    fetchNotificationsSuccess: (state, action) => {
      state.loading = false;
      state.notifications = action.payload;
    },
    fetchNotificationsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    addNotification: (state, action) => {
      state.notifications.push(action.payload);
    },
  },
});

export const { fetchNotificationsStart, fetchNotificationsSuccess, fetchNotificationsFailure, addNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
