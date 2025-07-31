// src/slices/appointmentSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  appointments: [],
  loading: false,
  error: null,
};

const appointmentSlice = createSlice({
  name: 'appointments',
  initialState,
  reducers: {
    fetchAppointmentsStart: (state) => {
      state.loading = true;
    },
    fetchAppointmentsSuccess: (state, action) => {
      state.loading = false;
      state.appointments = action.payload;
    },
    fetchAppointmentsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    bookAppointment: (state, action) => {
      state.appointments.push(action.payload);
    },
  },
});

export const { fetchAppointmentsStart, fetchAppointmentsSuccess, fetchAppointmentsFailure, bookAppointment } = appointmentSlice.actions;
export default appointmentSlice.reducer;
