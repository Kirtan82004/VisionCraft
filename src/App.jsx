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
      const userdata = await getCurrentUser();
      console.log("userdata", userdata);

      if (userdata?.data?.role === "admin") {
        dispatch(adminLoginSuccess(userdata.data));
      } else {
        dispatch(loginSuccess(userdata.data));
      }

      if (userdata.success === false) {
        console.log("No user logged in");
        dispatch(userLogout());
        navigate('/login');
      }


    } catch (error) {
      console.log("User not logged in");

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
