import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../services/user/authService';
import { adminLoginSuccess, adminLoginFailure, adminLoginStart } from '../../store/admin/adminAuthSlice.js';
import { loginStart, loginSuccess, loginFailure } from '../../store/authSlice';
import Input from '../Input';
import { useNavigate } from 'react-router-dom';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { useAlert } from '../../hooks/AlertProvider.jsx';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);
  const { showAlert } = useAlert();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      dispatch(loginStart());
      dispatch(adminLoginStart());

      const response = await loginUser(formData);
      const user = response?.user;
      if (!user) throw new Error('Invalid credentials');

      if (user.role === 'admin') {
        dispatch(adminLoginSuccess(user));
        showAlert('success', 'Admin login successful!');
        navigate('/admin/dashboard');
      } else {
        dispatch(loginSuccess(user));
        showAlert('success', 'Login successful!');
        navigate('/');
      }
    } catch (err) {
      const message = err?.message || 'Login failed';
      dispatch(loginFailure(message));
      dispatch(adminLoginFailure(message));
      showAlert('error', message);
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-emerald-50">
      
      {/* LEFT BRAND SECTION */}
      <div className="hidden lg:flex flex-col justify-center px-16 bg-linear-to-br from-emerald-600 to-emerald-500 text-white">
        <h1 className="text-4xl font-bold mb-4">Welcome Back 👋</h1>
        <p className="text-lg text-emerald-100 leading-relaxed">
          Login to manage your dashboard, track activities, and control everything from one place.
        </p>
        <div className="mt-10 text-sm opacity-80">
          © 2026 Your Company. All rights reserved.
        </div>
      </div>

      {/* RIGHT FORM SECTION */}
      <div className="flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 md:p-10">
          
          <div className="text-center mb-8">
            <div className="w-14 h-14 mx-auto rounded-xl bg-emerald-100 flex items-center justify-center mb-4">
              <span className="text-2xl">🔐</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Sign In</h2>
            <p className="text-gray-500 text-sm mt-1">
              Enter your credentials to continue
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">

            <Input
              label="Email Address"
              type="email"
              name="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
            />

            <div className="relative">
              <Input
                label="Password"
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-[42px] text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg px-4 py-2">
                ⚠️ {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl font-semibold transition disabled:opacity-50"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-500">
            Don’t have an account?{' '}
            <span onClick={() => navigate("/signup")} className="text-emerald-600 font-medium cursor-pointer hover:underline">
              Sign up
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
