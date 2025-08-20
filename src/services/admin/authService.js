import axios from "axios";
import conf from "../../conf/conf";
import API from "../../utils/axiosInstance";
//import { loginAdmin as loginUser } from "./adminService"; // If loginUser is meant to be loginAdmin, we alias it

const API_URL = conf.API_URL;

const registerAdmin = async (formData) => {
    try {
        const res = await API.post('admin/register', formData);

        if (res) {
            window.alert("Registration successful! Logging in...");
            return loginAdmin({ email: formData.email, password: formData.password });
        }

        return res.data;
    } catch (error) {
        return error.response?.data;
    }
};

const loginAdmin = async (formData) => {
    try {
        const res = await API.post('admin/login', formData, { withCredentials: true });
        window.alert("Admin login successful!");
        return res.data;
    } catch (error) {
        window.alert(error.response?.data?.message || "Admin login failed!");
        return error.response?.data;
    }
};

const logoutAdmin = async () => {
    try {
        const res = await axios.post(`${API_URL}/admin/logout`, {}, { withCredentials: true });
        console.log(res);
        window.alert("Admin has been logged out.");
    } catch (error) {
        window.alert("Admin logout failed! Try again.");
        console.log(error.message);
        return error.message;
    }
};

const getCurrentAdmin = async () => {
    try {
        const res = await API.get('admin/current-Admin');
        return res.data;
    } catch (error) {
        return error.response?.data;
    }
};

const updateAccountDetails = async (formData) => {
    try {
        const res = await API.put('admin/update-Account', formData);
        window.alert("Admin account updated successfully!");
        return res.data;
    } catch (error) {
        window.alert(error.response?.data?.message || "Update failed!");
        return error.response?.data;
    }
};

const changeCurrentPassword = async (formData) => {
    try {
        const res = await API.put('admin/change-Password', formData);
        window.alert("Password changed successfully!");
        return res.data;
    } catch (error) {
        window.alert(error.response?.data?.message || "Password change failed!");
        return error.response?.data;
    }
};

export {
    registerAdmin,
    loginAdmin,
    logoutAdmin,
    getCurrentAdmin,
    updateAccountDetails,
    changeCurrentPassword,
};
