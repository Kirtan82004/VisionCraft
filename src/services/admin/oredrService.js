import API from "../../utils/axiosInstance";

const getOrders = async (status,customerId) => {
    try {
        const res = await API.get('admin/order/get-orders',{params:{status,customerId}});
        console.log("OrderServiceRes", res);
        return res.data.data;
    } catch (error) {
        console.error(error);
        return error.response.data;
    }
}
const getRecentOrders = async () => {
    try {
        const res = await API.get('admin/order/get-recent-orders');
        console.log("recent orders in service",res)
        return res.data.data;
    } catch (error) {
        console.error(error);
        return error.response.data;
    }
}
const getOrderById = async (orderId) => {
    try {
        const res = await API.get(`admin/order/get-order-ById/${orderId}`);
        console.log("orderbyis res",res.data)
        return res.data;
    } catch (error) {
        console.error(error);
        return error.response.data;
    }
}
const updateOrderStatus = async (orderId, status) => {
    try {
        const res = await API.put(`admin/order/update-Order-Status/${orderId}`,{status});
        return res.data;
    } catch (error) {
        console.error(error);
        return error.response.data;
    }
}

const deleteOrder = async (orderId) => {
    try {
        console.log("orderId in service",orderId)
        const res = await API.delete(`admin/order/delete-order/${orderId}`);
        return res.data;
    } catch (error) {
        console.error(error);
        return error.response.data;
    }
}

export {
    getOrders,
    getRecentOrders,
    getOrderById,
    updateOrderStatus,
    deleteOrder
}
