import axios from "axios";
import conf from "../../conf/conf";
import API from "../../utils/axiosInstance";

const API_URL = conf.API_URL;

const registerAdmin = async (formData) => {
    try {
        const res = await API.post('admin/register', formData);

        if (res) {
            window.alert("Registration successful! Logging in...");
            return loginUser({ email: formData.email, password: formData.password });
        }

        return res.data;
    } catch (error) {
        return error.response.data;
    }
}
const loginAdmin = async (formData) => {
    try {
        const res = await API.post('admin/login', formData);
        return res.data;
    } catch (error) {
        return error.response.data;
    }
}
const logoutAdmin = async () => {
    try {
        const res = await axios.post(`${API_URL}/admin/logout`, {}, { withCredentials: true });
        console.log(res)
        window.alert("Admin have been logged out.");
    } catch (error) {
        window.alert("Admin Logout failed! Try again.");
        console.log(error.message)
        return error.message;
    }
}
const getCurrentAdmin = async () => {
    try {
        const res = await API.get('admin/current-Admin');
        return res.data;
    } catch (error) {
        return error.response.data;
    }
}
const UpdateAccountDetails = async (formData) => {
    try {
        const res = await API.put('admin/update-Account', formData);
        return res.data;
    } catch (error) {
        return error.response.data;
    }
}
const changeCurrentPassword = async (formData) => {
    try {
        const res = await API.put('admin/change-Password', formData);
        return res.data;
    } catch (error) {
        return error.response.data;
    }
}
export {
    registerAdmin,
    loginAdmin,
    logoutAdmin,
    changeCurrentPassword,
    UpdateAccountDetails,
    getCurrentAdmin
}