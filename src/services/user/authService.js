
import conf from "../../conf/conf";
import axios from "axios";

const API_URL = conf.API_URL;

// ✅ Register user
const registerUser = async (formData) => {
    console.log("formData in authService", formData)
    try {
        const res = await axios.post(`${API_URL}/users/register`, formData});

        if (res.data?.success) {
            window.alert("Registration successful! Logging in...");
            return loginUser({ email: formData.email, password: formData.password });
        }

        return res.data;
    } catch (error) {
        console.error("Register Error:", error);
        window.alert(error.response?.data?.message || "Registration failed!");
        return error.response?.data || { success: false };
    }
};

// ✅ Login user
const loginUser = async (formData) => {
    try {
        const res = await axios.post(`${API_URL}/users/login`, formData);
        window.alert("Login successful!");
        console.log("Login Response:", res.data.data);
        const accessToken = res.data.data.accessToken;
        const refreshToken = res.data.data.refreshToken;
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);


        //localStorage.setItem("user", JSON.stringify({refreshToken:res.data.data.refreshToken})) // ✅ Login hone par localStorage me save karo
        return res.data.data;
    } catch (error) {
        console.error("Login Error:", error);
        const msg = error.response?.data?.message || "Login failed!";
        window.alert(msg);
        return { success: false, message: msg };
    }
};

// ✅ Logout user
const logoutUser = async () => {
    console.log("Logging out user...");
    try {
        const token = localStorage.getItem("accessToken");

        const res = await axios.post(`${API_URL}/users/logout`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
        window.alert("User has been logged out.");
        return res.data;
    } catch (error) {
        console.error("Logout Error:", error);
        window.alert("User logout failed! Try again.");
        return error.response?.data || { success: false };
    }
};

// ✅ Get current user
const getCurrentUser = async () => {
  try {
    const token = localStorage.getItem("accessToken");

    const res = await axios.get(`${API_URL}/users/current-User`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    console.log("GetCurrentUser Response:", res.data);
    return res.data;

  } catch (error) {
    console.error("GetCurrentUser Error:", error);
    return error.response?.data || { success: false };
  }
};


// ✅ Update account details
const updateAccountDetails = async (userData) => {
    try {
        const token = localStorage.getItem("accessToken");

        const res = axios.patch(`${API_URL}/users/update-Account`, userData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
        window.alert("Account details updated successfully!");
        return res.data;
    } catch (error) {
        console.error("UpdateAccount Error:", error);
        window.alert(error.response?.data?.message || "Update failed!");
        return error.response?.data || { success: false };
    }
};

// ✅ Update password
const updatePassword = async (formData) => {
    try {
        const token = localStorage.getItem("accessToken");

        const res = await axios.patch(`${API_URL}/users/change-Password`, formData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
        window.alert("Password changed successfully!");
        return res.data;
    } catch (error) {
        console.error("UpdatePassword Error:", error);
        window.alert(error.response?.data?.message || "Password update failed!");
        return error.response?.data || { success: false };
    }
};

// ✅ Update profile image
const updateProfileImage = async (imageFile) => {
    try {
        const token = localStorage.getItem("accessToken");
        const formData = new FormData();
        formData.append("image", imageFile);

        const res = await axios.patch(`${API_URL}/users/update-Image`, formData,  {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
        }
      }
);
        window.alert("Profile image updated successfully!");
        return res.data;
    } catch (error) {
        console.error("UpdateProfileImage Error:", error);
        window.alert(error.response?.data?.message || "Image update failed!");
        return error.response?.data || { success: false };
    }
};

const refreshAccessToken = async () => {
    try {
        const token = localStorage.getItem("accessToken");
        const res = await axios.patch(`${API_URL}/users/refresh-Token`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
        return res.data.data.accessToken;

    } catch (error) {
        console.error("RefreshToken Error:", error);
        return null;
    }
}

export {
    registerUser,
    loginUser,
    logoutUser,
    getCurrentUser,
    updateAccountDetails,
    updatePassword,
    updateProfileImage,
    refreshAccessToken
};




