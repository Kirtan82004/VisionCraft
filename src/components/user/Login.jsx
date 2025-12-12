import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../services/user/authService';
import { adminLoginSuccess, adminLoginFailure, adminLoginStart } from '../../store/adminAuthSlice.js';
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
      console.log("response", response);
      const user = response?.user;


      if (!user) throw new Error("Invalid user response");

      if (user.role === "admin") {
        dispatch(adminLoginSuccess(user));
        showAlert("success", "Admin login successful!");
        navigate("/admin/dashboard");
      } else {
        dispatch(loginSuccess(user));
        showAlert("success", "Login successful!");
        navigate("/");
      }

    } catch (err) {
      const message = err?.message || "Login failed";

      dispatch(loginFailure(message));
      dispatch(adminLoginFailure(message));

      // ✅ Show error alert
      showAlert("error", message);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-emerald-50 via-white to-emerald-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-emerald-100 p-8 md:p-10">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-linear-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <span className="text-2xl text-white">🔐</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h2>
          <p className="text-gray-500">Sign in to your account to continue</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <Input
              label="Email Address"
              type="email"
              name="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
            />
          </div>

          <div className="relative">
            <Input
              label="Password"
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-9 text-gray-400 hover:text-gray-600 transition-colors duration-200"
            >
              {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
            </button>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4">
              <p className="text-sm text-red-600 flex items-center gap-2">
                <span className="text-red-500">⚠️</span>
                {error}
              </p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-linear-to-br from-emerald-500 to-emerald-600 text-white font-semibold py-3 px-6 rounded-xl hover:from-emerald-600 hover:to-emerald-700 focus:ring-2 focus:ring-emerald-500 disabled:opacity-50 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg"
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Signing in...
              </div>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-gray-500 text-sm">
            Don't have an account?{' '}
            <button className="text-emerald-600 hover:text-emerald-700 font-medium hover:underline">
              Sign up here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;