import API from "../../utils/axiosInstance";

const getDashboardStats = async () => {
    try {
        const res = await API.get('admin/dashboard/stats');
        return res.data;
    } catch (error) {
        return error.response.data;
    }
}
const getSalesReport = async () =>{
    try {
        const res = await API.get('admin/dashboard/sales-report',{data:{startDate,endDate}});
        return res.data;
    } catch (error) {
        return error.response.data;
    }

}
const OrderSummary = async () =>{
    try {
        const res = await API.get('admin/dashboard/order-summary');
        return res.data;
    } catch (error) {
        return error.response.data;
    }

}

export {
    getDashboardStats,
    getSalesReport,
    OrderSummary
};