import React, { useEffect, useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import { userLogout, loginSuccess } from "./store/authSlice.js";
import { adminLoginSuccess } from "./store/admin/adminAuthSlice.js";
import { useNavigate, Outlet } from "react-router-dom";
import { Header, Footer } from "./components";
import {
  getCurrentUser,
  refreshAccessToken
} from "./services/user/authService.js";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const user = useSelector(state => state.auth.user);// 👤 normal user
  const admin = useSelector(state =>state.adminAuth.admin)
  const role = admin?.role || user?.role || "guest";

  const fetchUserData = async () => {
    try {
      let response = await getCurrentUser();
      
      // 🔁 token expired → refresh once
      if (response?.message === "jwt expired") {
        const refresh = await refreshAccessToken();
        if (!refresh?.success) throw new Error("Session expired");
        response = await getCurrentUser();
      }

      const user = response?.data;
      if (!user) throw new Error("Unauthorized");

      if (user.role === "admin") {
        dispatch(adminLoginSuccess(user));
        navigate("/admin/dashboard")
      } else {
        dispatch(loginSuccess(user));
        navigate("/")
      }
    } catch (err) {
      dispatch(userLogout());
      navigate("/");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  /* ================= LOADING UI ================= */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-blue-100">
        <div className="animate-spin h-10 w-10 border-4 border-purple-600 border-t-transparent rounded-full"></div>
      </div>
    );
  }
  const showFooter = role !== "admin";

  return (
    <div className="min-h-screen flex flex-col bg-blue-100">
      <Header />
      <main className="flex-1 container mx-auto">
        <Outlet />
      </main>
      { showFooter && <Footer />}
    </div>
  );
}

export default App;
