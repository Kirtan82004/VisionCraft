import { configureStore } from "@reduxjs/toolkit";
import authReducer from './authSlice.js';
import adminAuthReducer from './adminAuthSlice.js';
import productReducer from './productSlice.js';
import cartReducer from './cartSlice.js';
import orderReducer from './orderSlice.js';
import adminOrderReducer from './adminOrederManagmentSlice.js';
import appointmentReducer from './appointmentSlice.js';
import notificationReducer from './notificationSlice.js';
import reviewReducer from './reviewSlice.js';
import filterReducer from './filterSlice.js';
import wishlistReducer from "./wishlistSlice.js"


const store = configureStore({
    reducer: {
        auth: authReducer,
        adminAuth: adminAuthReducer,
        products: productReducer,
        cart: cartReducer,
        orders: orderReducer,
        adminOrders: adminOrderReducer,
        appointments: appointmentReducer,
        notifications: notificationReducer,
        reviews: reviewReducer,
        filter: filterReducer,
        savedItems: wishlistReducer
    }
});

export default store;