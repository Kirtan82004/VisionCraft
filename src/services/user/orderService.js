import API from "../../utils/axiosInstance";

// Step 1: Create Razorpay Order from Backend
const createRazorpayOrder = async (paymentData) => {
    try {
        const res = await API.post('users/create-razorpay-order', paymentData); 
        return res.data;
    } catch (error) {
        return error.response?.data || { success: false, message: "Failed to create Razorpay order" };
    }
};

// Step 2: Save Final Order in DB After Payment is Done
const placeOrder = async (orderData) => {
    try {
        const res = await API.post('users/placeOrder', orderData);
        return res.data;
    } catch (error) {
        return error.response?.data || { success: false, message: "Failed to place order" };
    }
};

// Step 3: For History and Order Management
const getOrderHistory = async () => {
    try {
        const res = await API.get('users/getOrderHistory');
        return res.data;
    } catch (error) {
        return error.response?.data || { success: false };
    }
};

const getOrderDetails = async (orderId) => {
    try {
        const res = await API.get(`users/getOrderDetails/${orderId}`);
        return res.data;
    } catch (error) {
        return error.response?.data || { success: false };
    }
};

const cancelOrder = async (orderId) => {
    try {
        const res = await API.delete(`users/cancelOrder/${orderId}`);
        return res.data;
    } catch (error) {
        return error.response?.data || { success: false };
    }
};

export {
    createRazorpayOrder,
    placeOrder,
    getOrderHistory,
    getOrderDetails,
    cancelOrder
};
