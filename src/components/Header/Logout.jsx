
import React ,{useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {logoutUser} from "../../services/user/authService.js"
//import {logoutAdmin} from "../../services/admin/authService.js"
import {userLogout} from "../../store/authSlice.js"
import {adminLogout} from "../../store/admin/adminAuthSlice.js"
import {getCurrentUser} from "../../services/user/authService.js"
import { useNavigate } from 'react-router-dom';
import { useAlert } from '../../hooks/AlertProvider.jsx';


const LogoutBtn = () => { 
    const { showAlert } = useAlert();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const admin = useSelector((state)=>state.adminAuth.status);
    const user = useSelector((state)=>state.auth.status);

    //console.log(admin,user)

    
    const handleLogout = async() => {
        console.log(user)

        if(user){
            await logoutUser()
            localStorage.removeItem("auth")
            dispatch(userLogout())
            navigate('/')
            showAlert("success", "Logout successful!");
            
        }
        if(admin){
            //await logoutAdmin()
            dispatch(adminLogout())
            navigate('/')
            showAlert("success", "Admin logout successful!");
        }
    }
    return (
        <>
        <button 
        onClick={handleLogout}
        className='bg-purple-900 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition'>
            Logout
            </button>
        </>
    )
}

export default LogoutBtn;
