import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { userLogout, loginSuccess } from './store/authSlice.js'
import './App.css'
import { useNavigate, Outlet } from 'react-router-dom'
import { Header, Footer } from './components/index.js'
import { getCurrentUser } from "./services/user/authService.js"
import { adminLoginSuccess } from "./store/adminAuthSlice.js"

function App() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

 const fetchUserData = async () => {
    try {
      const response = await getCurrentUser();
      console.log("response",response)
      const user = response?.data;
      const success = response?.success;

       if(response?.message === "jwt expired") {
        // Try to refresh the access token
         console.log("REFRESHING ACCESS TOKEN")
        const refreshResponse = await refreshAccessToken();
         console.log("refreshResponse",refreshResponse)
        if(refreshResponse?.success) {
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
    return <div className='text-center text-4xl'>Loading...</div>;
  }

  return (
    <div className="min-h-screen min-width-screen flex flex-wrap content-between bg-blue-100 ">
      <div className='w-full block'>
        <Header />
        <main className='mx-10'>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;
