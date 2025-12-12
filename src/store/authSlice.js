import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: false,
  user: null,
  loading: false,
  error: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.status = true;
      state.user = action.payload; 
      state.error = null;
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // SIGNUP HANDLERS
    signupStart: (state) => {
      state.loading = true;
    },
    signupSuccess: (state, action) => {
      state.loading = false;
      state.status = true;
      state.user = action.payload;
      state.error = null;
    },
    signupFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    userLogout: (state) => {
      state.status = false;
      state.user = null;
    }
  }
});

export const {
  loginStart, loginSuccess, loginFailure,
  signupStart, signupSuccess, signupFailure,
  userLogout
} = authSlice.actions;

export default authSlice.reducer;
