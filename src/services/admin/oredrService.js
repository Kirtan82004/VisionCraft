import API from "../../utils/axiosInstance";

const getOrders = async (status,customerId) => {
    try {
        const res = await API.get('admin/get-orders',{params:{status,customerId}});
        return res.data;
    } catch (error) {
        console.error(error);
        return error.response.data;
    }
}
const getOrderById = async (orderId) => {
    try {
        const res = await API.get(`admin/get-orders-ById/${orderId}`);
        return res.data;
    } catch (error) {
        console.error(error);
        return error.response.data;
    }
}
const updateOrderStatus = async (orderId, status) => {
    try {
        const res = await API.put(`admin/update-Order-Status/${orderId}`,{status});
        return res.data;
    } catch (error) {
        console.error(error);
        return error.response.data;
    }
}

const deleteOrder = async (orderId) => {
    try {
        const res = await API.delete(`admin/delete-order/${orderId}`);
        return res.data;
    } catch (error) {
        console.error(error);
        return error.response.data;
    }
}

export {
    getOrders,
    getOrderById,
    updateOrderStatus,
    deleteOrder
};