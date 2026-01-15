import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  status: false,
  admin: null,
  loading: false,
  error: null
};

const adminAuthSlice = createSlice({
  name: 'adminAuth',
  initialState,
  reducers: {
    adminLoginStart: (state) => { state.loading = true; },

    adminLoginSuccess: (state, action) => {
      state.loading = false;
      state.status = true;
      state.admin = action.payload;
      state.error = null;
    },

    adminLoginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // SIGNUP
    adminSignupStart: (state) => {
      state.loading = true;
    },
    adminSignupSuccess: (state, action) => {
      state.loading = false;
      state.status = true;
      state.admin = action.payload;
      state.error = null;
    },
    adminSignupFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    adminLogout: (state) => {
      state.status = false;
      state.admin = null;
    }
  }
});

export const {
  adminLoginStart, adminLoginSuccess, adminLoginFailure,
  adminSignupStart, adminSignupSuccess, adminSignupFailure,
  adminLogout
} = adminAuthSlice.actions;

export default adminAuthSlice.reducer;
