
import API from "../../utils/axiosInstance";

const getDashboardStats = async () => {
    try {
        const res = await API.get('admin/dashboard');
        return res.data.data;
    } catch (error) {
        return error.response.data;
    }
}
const getSalesReport = async (startDate,endDate) =>{
    try {
        console.log("running salerport in service")
        console.log(startDate,endDate)
        const res = await API.get('admin/dashboard/sales-report',{
        params: { startDate, endDate }, // ✅ correct
      });

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
}