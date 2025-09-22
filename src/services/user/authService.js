import API from "../../utils/axiosInstance";    
import conf from "../../conf/conf";
import axios from "axios";

const API_URL = conf.API_URL;

// ✅ Register user
const registerUser = async (formData) => {
    try {
        const res = await axios.post(`${API_URL}/users/register`, formData, {
            withCredentials: true
        });

        if (res.data?.success) {
            window.alert("Registration successful! Logging in...");
            return loginUser({ email: formData.email, password: formData.password });
        }

        return res.data;
    } catch (error) {
        window.alert(error.response?.data?.message || "Registration failed!");
        return error.response?.data || { success: false };
    }
};

// ✅ Login user
const loginUser = async (formData) => {
    try {
        const res = await axios.post(`${API_URL}/users/login`, formData, {
            withCredentials: true
        });
        window.alert("Login successful!");
        return res.data;
    } catch (error) {
        const msg = error.response?.data?.message || "Login failed!";
        window.alert(msg);
        return { success: false, message: msg };
    }
};

// ✅ Logout user
const logoutUser = async () => {
    try {
        const res = await axios.post(`${API_URL}/users/logout`, {}, {
            withCredentials: true
        });
        window.alert("User has been logged out.");
        return res.data;
    } catch (error) {
        window.alert("User Logout failed! Try again.");
        return error.response?.data || { success: false };
    }
};

// ✅ Get current user
const getCurrentUser = async () => {
    try {
        const res = await API.get("users/current-User", { withCredentials: true });
        return res.data;
    } catch (error) {
        return error.response?.data || { success: false };
    }
};

// ✅ Update account details
const updateAccountDetails = async (userData) => {
    try {
        const res = await API.patch("users/update-Account", userData, {
            withCredentials: true
        });
        window.alert("Account details updated successfully!");
        return res.data;
    } catch (error) {
        window.alert(error.response?.data?.message || "Update failed!");
        return error.response?.data || { success: false };
    }
};

// ✅ Update password
const updatePassword = async (formData) => {
    try {
        const res = await API.patch("users/change-Password", formData, {
            withCredentials: true
        });
        window.alert("Password changed successfully!");
        return res.data;
    } catch (error) {
        window.alert(error.response?.data?.message || "Password update failed!");
        return error.response?.data || { success: false };
    }
};

// ✅ Update profile image
const updateProfileImage = async (imageFile) => {
    try {
        const formData = new FormData();
        formData.append("image", imageFile);

        const res = await API.patch("users/update-Image", formData, {
            withCredentials: true,
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
        window.alert("Profile image updated successfully!");
        return res.data;
    } catch (error) {
        window.alert(error.response?.data?.message || "Image update failed!");
        return error.response?.data || { success: false };
    }
};

export {
    registerUser,
    loginUser,
    logoutUser,
    getCurrentUser,
    updateAccountDetails,
    updatePassword,
    updateProfileImage
};
