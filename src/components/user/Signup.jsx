import React, { useState } from 'react';
import { Input } from '../index.js';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signupStart, signupSuccess, signupFailure } from '../../store/authSlice';
import { registerUser } from '../../services/user/authService';

const UserSignup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNo: '',
    address: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      return alert("Passwords don't match");
    }
    dispatch(signupStart());
    try {
      const response = await registerUser(formData);
      dispatch(signupSuccess(response.data.user));
      navigate('/');
    } catch (err) {
      dispatch(signupFailure(err.message));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br  px-4">
      <div className="w-full max-w-md bg-white p-6 md:p-8 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">User Signup</h2>

        {error && (
          <div className="text-sm text-red-600 mb-4 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSignup} className="space-y-4">
          <Input
            label="Full Name"
            type="text"
            name="fullName"
            placeholder="John Doe"
            value={formData.fullName}
            onChange={handleChange}
          />
          <Input
            label="Email"
            type="email"
            name="email"
            placeholder="john@example.com"
            value={formData.email}
            onChange={handleChange}
          />
          <Input
            label="Phone Number"
            type="tel"
            name="phoneNo"
            placeholder="1234567890"
            value={formData.phoneNo}
            onChange={handleChange}
          />
          <Input
            label="Address"
            type="text"
            name="address"
            placeholder="123 Main Street"
            value={formData.address}
            onChange={handleChange}
          />
          <Input
            label="Password"
            type="password"
            name="password"
            placeholder="********"
            value={formData.password}
            onChange={handleChange}
          />
          <Input
            label="Confirm Password"
            type="password"
            name="confirmPassword"
            placeholder="********"
            value={formData.confirmPassword}
            onChange={handleChange}
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-60"
          >
            {loading ? 'Signing up...' : 'Sign Up'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">Want to sign up as Admin?</p>
          <button
            onClick={() => navigate('/admin/signup')}
            className="text-blue-500 font-semibold hover:underline mt-2"
          >
            Sign up as Admin
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserSignup;
