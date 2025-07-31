import React ,{useEffect,useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { userLogout } from './store/authSlice.js'
import './App.css'
import { Outlet } from 'react-router-dom'
import { Header,Footer } from './components/index.js'


function App() {
const [loading, setLoading] = useState(true);
const auth = useSelector((state)=>state.auth)
const dispatch = useDispatch();

useEffect(() => {
  const storedAuth = localStorage.getItem("auth");
  if (!storedAuth && auth.status) {
    dispatch(userLogout());
  } 
  setLoading(false)
}, [auth,dispatch]);

if(loading){
  return <div className='text-center text-4xl'>Loading...</div>
}
return !loading ? (
  <div className="min-h-screen min-width-screen flex flex-wrap content-between bg-blue-100 ">
    <div className='w-full block'>
      <Header />
      <main className='mx-10'>
         <Outlet/> 
      </main>
      <Footer />
    </div>
  </div>
) : null;
}

export default App
