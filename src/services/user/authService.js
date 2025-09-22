import API from "../../utils/axiosInstance";    
import conf from "../../conf/conf";
import axios from "axios";

const API_URL = conf.API_URL;

const registerUser = async (formData) => {
    try {
        console.log(formData);
        const res = await axios.post(`${API_URL}/users/register`, formData);
        console.log("API Response:", res);

        if (res) {
            window.alert("Registration successful! Logging in...");
            return loginUser({ email: formData.email, password: formData.password });
        }

        return res.data;
    } catch (error) {
        window.alert(error.response?.data?.message || "Registration failed!");
        return error.response.data;
    }
};

const loginUser = async (formData) => {
    try {
        const res = await axios.post(`${API_URL}/users/login`, formData, { withCredentials: true });
        window.alert("Login successful!");
        return res.data; // return login response data
    } catch (error) {
        const msg = error.response?.data?.message || "Login failed!";
        window.alert(msg);
        return { success: false, message: msg };
    }
};

const logoutUser = async () => {
    try {
        const res = await axios.post(`${API_URL}/users/logout`, { withCredentials: true });
        console.log(res)
        window.alert("User have been logged out.");
    } catch (error) {
        window.alert("User Logout failed! Try again.");
        console.log(error.message)
        console.log(error)
        return error.message;
    }
};

const getCurrentUser = async () => {
    try {
        const res = await API.get('users/current-User');
        return res.data;
    } catch (error) {
        return error.message;
    }
};

const updateAccountDetails = async (userData) => {
    try {
        const res = await API.patch('users/update-Account', userData);
        window.alert("Account details updated successfully!");
        console.log("updateuser",res.data)
        return res.data;
    } catch (error) {
        window.alert(error.response?.data?.message || "Update failed!");
        return error.response.data;
    }
};

const updatePassword = async (formData) => {
    try {
        const res = await API.patch('users/change-Password', formData);
        window.alert("Password changed successfully!");
        return res;
    } catch (error) {
        window.alert(error.response?.data?.message || "Password update failed!");
        return error.response.data;
    }
};

const updateProfileImage = async (imageFile) => {
    try {
        const formData = new FormData();
        formData.append('image', imageFile);

        const res = await API.patch('users/update-Image', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        window.alert("Profile image updated successfully!");
        console.log("updateimage",res.data)
        return res.data;
    } catch (error) {
        window.alert(error.response?.data?.message || "Image update failed!");
        return error.response.data;
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
}
