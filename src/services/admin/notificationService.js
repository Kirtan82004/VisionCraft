import API from "../../utils/axiosInstance";

const sendEmailNotification = async (userId,subject,message) => {
    try {
        const res = await API.post('admin/notifications/email', { userId,subject,message });
        return res.data;
    } catch (error) {
        return error.response.data;
    }
}
const sendBulkNotifications = async (userIds,subject,message) => {
    try {
        const res = await API.post('admin/notifications/bulk', { userIds,subject,message });
        return res.data;
    } catch (error) {
        return error.response.data;
    }
}

export {
    sendEmailNotification,
    sendBulkNotifications
}