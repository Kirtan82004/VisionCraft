import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { userLogout, loginSuccess } from './store/authSlice.js'
import './App.css'
import { Navigate, Outlet } from 'react-router-dom'
import { Header, Footer } from './components/index.js'
import { getCurrentUser, refreshAccessToken } from "./services/user/authService.js"
import { adminLoginSuccess } from "./store/adminAuthSlice.js"


function App() {
  const [loading, setLoading] = useState(true);
  const auth = useSelector((state) => state.auth)
  const dispatch = useDispatch();
  //console.log("auth",auth)

  useEffect(() => {
    const fetchUserData = async () => {
      const userdata = await getCurrentUser();
      console.log("userdata", userdata)
      if (userdata?.data.role === "admin") {
        dispatch(adminLoginSuccess(userdata))
      } else {
        dispatch(loginSuccess(userdata))
      }
      // if (!userdata.success) {
      //   const refreshData = await refreshAccessToken();
      //   console.log("refreshData", refreshData)
      //   if (refreshData.success) {
      //     const newUserData = await getCurrentUser();
      //     console.log("newUserData after refresh", newUserData)
      //     if (newUserData.role === "admin") {
      //       dispatch(adminLoginSuccess(newUserData))
      //     } else {
      //       dispatch(loginSuccess(newUserData))
      //     }
      //   } else {
      //     dispatch(userLogout())
      //   }
      // }
      setLoading(false);
    }
    fetchUserData();

  }, [])



  if (loading) {
    return <div className='text-center text-4xl'>Loading...</div>
  }
  return !loading ? (
    <div className="min-h-screen min-width-screen flex flex-wrap content-between bg-blue-100 ">
      <div className='w-full block'>
        <Header />
        <main className='mx-10'>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : null;
}

export default App
