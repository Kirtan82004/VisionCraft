import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { userLogout, loginSuccess } from './store/authSlice.js'
import './App.css'
import { useNavigate, Outlet } from 'react-router-dom'
import { Header, Footer } from './components/index.js'
import { getCurrentUser, refreshAccessToken } from "./services/user/authService.js"
import { adminLoginSuccess } from "./store/admin/adminAuthSlice.js"


function App() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [role,setRole] = useState('')
  const dispatch = useDispatch();

  const fetchUserData = async () => {
    try {
      const response = await getCurrentUser();
      console.log("response", response)
      const user = response?.data;
      const success = response?.success;
      setRole(user.role)

      if (response?.message === "jwt expired") {
        // Try to refresh the access token
        const refreshResponse = await refreshAccessToken();
        if (refreshResponse?.success) {
          // Retry fetching user data
          return fetchUserData();
        } else {
          // Refresh token failed, log out the user
          dispatch(userLogout());
          navigate("/login");
          return;
        }
      }
      // If API explicitly says "not logged in"
      if (success === false || !user) {
        dispatch(userLogout());
        navigate("/login");
        return;
      }

      // Role-based login
      if (user.role === "admin") {
        dispatch(adminLoginSuccess(user));
        navigate("/admin/dashboard");
      } else {
        dispatch(loginSuccess(user));
      }
    } catch (error) {
      // API failed → treat as logged out
      dispatch(userLogout());
      navigate("/login");
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchUserData();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">
      <span className="loader"></span>
    </div>;
  }

  return (
    <div className="min-h-screen min-width-screen flex flex-wrap content-between bg-blue-100 ">
    <div className='w-full  block'>
      <Header />
      <main className=''>
        <Outlet />
      </main>
      {role === "user" && <Footer />}
    </div>
    </div>
  );
}

export default App;

