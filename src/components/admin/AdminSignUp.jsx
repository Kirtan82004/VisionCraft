import React, { useState } from 'react';
import {Input} from "../index.js"
import { useDispatch, useSelector } from 'react-redux';
import { signupStart, signupSuccess, signupFailure } from '../../store/adminAuthSlice.js';
import { registerAdmin } from '../../services/admin/authService.js';
import { useNavigate } from 'react-router-dom';
const AdminSignup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    secretKey: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    console.log("final formdata:",formData)
    if (formData.password !== formData.confirmPassword) {
      return alert("Passwords don't match");
    }
    dispatch(signupStart());
    try {
      // Replace with actual signup API reques
      const formdata = {
        "fullName": formData.fullName,
        "email": formData.email,
        "secretKey": formData.secretKey,
        "password": formData.password
      }
      const response = await registerAdmin(formdata);
      console.log(response)
      dispatch(signupSuccess(response)); // Assuming response contains user data
      navigate('/admin/dashboard')
    } catch (err) {
        console.log(err.message)
      dispatch(signupFailure(err.message));
    }
  };
 

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center mb-6">Signup</h2>
        <form onSubmit={handleSignup} className="space-y-4">
          <Input
            label="Full Name"
            type="text"
            name="fullName"
            placeholder="Enter your full name"
            value={formData.fullName}
            onChange={handleChange}
          />
          <Input
            label="Email"
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
          />
      
          <Input
            label="Secrete Key"
            type="password"
            name="secretKey"
            placeholder="Enter your Secrete Key"
            value={formData.secretKey}
            onChange={handleChange}
          />
          <Input
            label="Password"
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
          />
          <Input
            label="Confirm Password"
            type="password"
            name="confirmPassword"
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 transition hover:cursor-pointer"
          >
            Signup
          </button>
          
        </form>
        
      </div>
    </div>
  );
};

export default AdminSignup;
