import { createSlice } from "@reduxjs/toolkit";

// Local Storage se auth status fetch karo
const getAuthFromLocalStorage = () => {
    const storedAuth = localStorage.getItem("auth");
    return storedAuth ? JSON.parse(storedAuth) : { status: false, user: null, loading: false, error: null };
};

const initialState = getAuthFromLocalStorage();

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
            localStorage.setItem("auth", JSON.stringify({ status: true, user: action.payload })); // ✅ LocalStorage me sirf required data save karo
        },
        loginFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        userLogout: (state) => {
            state.status = false;
            state.user = null;
            localStorage.removeItem("auth"); // ✅ Local Storage se clear karo
        },
        signupStart: (state) => {
            state.loading = true;
        },
        signupSuccess: (state, action) => {
            state.loading = false;
            state.user = action.payload;
            localStorage.setItem("auth", JSON.stringify({ status: true, user: action.payload })); // ✅ Signup hone par bhi save karo
        },
        signupFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    }
});

export const {
    loginStart,
    loginSuccess,
    loginFailure,
    userLogout,
    signupStart,
    signupSuccess,
    signupFailure,
} = authSlice.actions;
export default authSlice.reducer;
