
import { configureStore } from "@reduxjs/toolkit";
import authReducer from './authSlice.js';
import adminAuthReducer from './admin/adminAuthSlice.js';
import productReducer from './productSlice.js';
import cartReducer from './cartSlice.js';
import orderReducer from './orderSlice.js';
import appointmentReducer from './appointmentSlice.js';
import notificationReducer from './notificationSlice.js';
import reviewReducer from './reviewSlice.js';
import filterReducer from './filterSlice.js';
import wishlistReducer from "./wishlistSlice.js"


import adminOrderReducer from './admin/adminOrederManagmentSlice.js';
import customerReducer from "./admin/customerSlice.js"


const store = configureStore({
    reducer: {
        auth: authReducer,
        products: productReducer,
        cart: cartReducer,
        orders: orderReducer,
        appointments: appointmentReducer,
        notifications: notificationReducer,
        reviews: reviewReducer,
        filter: filterReducer,
        savedItems: wishlistReducer,
        adminAuth: adminAuthReducer,
        adminOrder:adminOrderReducer,
        customers:customerReducer
    }
});

export default store;