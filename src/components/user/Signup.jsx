"use client"

import { useState } from "react"
import { Input } from "../index.js"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { signupStart, signupSuccess, signupFailure, loginSuccess } from "../../store/authSlice"
import { registerUser } from "../../services/user/authService"
import { FiEye, FiEyeOff, FiUser, FiMail, FiPhone, FiMapPin } from "react-icons/fi"

const UserSignup = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { loading, error } = useSelector((state) => state.auth)

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNo: "",
    address: "",
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSignup = async (e) => {
    e.preventDefault()

    if (formData.password !== formData.confirmPassword) {
      dispatch(signupFailure("Passwords do not match"))
      return
    }

    dispatch(signupStart())

    try {
      const res = await registerUser(formData)
      dispatch(signupSuccess(res.data.user))
      dispatch(loginSuccess(res.data.user))
      navigate("/")
    } catch (err) {
      dispatch(signupFailure(err.message || "Signup failed"))
    }
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-emerald-50 via-white to-teal-50 flex items-center justify-center mt-20">
      <div className="w-full max-w-lg">

        {/* HEADER */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-linear-to-br from-emerald-600 to-teal-600 flex items-center justify-center shadow-lg mb-4">
            <FiUser className="text-white text-2xl" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Create Account</h2>
          <p className="text-gray-600 mt-1">Start your journey with us</p>
        </div>

        {/* CARD */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">

          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-lg">
              ⚠️ {error}
            </div>
          )}

          <form onSubmit={handleSignup} className="space-y-5">

            {/* FULL NAME */}
            <Field icon={<FiUser />} label="Full Name">
              <Input name="fullName" value={formData.fullName} onChange={handleChange} placeholder="John Doe" />
            </Field>

            {/* EMAIL */}
            <Field icon={<FiMail />} label="Email Address">
              <Input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="john@example.com" />
            </Field>

            {/* PHONE */}
            <Field icon={<FiPhone />} label="Phone Number">
              <Input name="phoneNo" value={formData.phoneNo} onChange={handleChange} placeholder="987654xxxx" />
            </Field>

            {/* ADDRESS */}
            <Field icon={<FiMapPin />} label="Address">
              <Input name="address" value={formData.address} onChange={handleChange} placeholder="123 Main Street" />
            </Field>

            {/* PASSWORD */}
            <PasswordField
              label="Password"
              value={formData.password}
              onChange={handleChange}
              name="password"
              show={showPassword}
              toggle={() => setShowPassword(!showPassword)}
            />

            {/* CONFIRM PASSWORD */}
            <PasswordField
              label="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              name="confirmPassword"
              show={showConfirmPassword}
              toggle={() => setShowConfirmPassword(!showConfirmPassword)}
            />

            {/* SUBMIT */}
            <button
              disabled={loading}
              className="w-full bg-linear-to-r from-emerald-600 to-teal-600 text-white py-3 rounded-xl font-semibold hover:from-emerald-700 hover:to-teal-700 transition disabled:opacity-50"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          {/* FOOTER */}
          <p className="text-center text-sm text-gray-600 mt-6">
            Already have an account?{" "}
            <span onClick={()=>navigate("/login")} className="text-emerald-600 hover:underline cursor-pointer">
              Sign in
            </span>
          </p>
        </div>
      </div>
    </div>
  )
}

/* Reusable Components */
const Field = ({ label, icon, children }) => (
  <div>
    <label className="block text-gray-700 font-medium mb-2">{label}</label>
    <div className="relative">
      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
        {icon}
      </span>
      {children}
    </div>
  </div>
)

const PasswordField = ({ label, show, toggle, ...props }) => (
  <div>
    <label className="block text-gray-700 font-medium mb-2">{label}</label>
    <div className="relative">
      <Input
        {...props}
        type={show ? "text" : "password"}
        className="pl-4 pr-12"
      />
      <button type="button" onClick={toggle} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
        {show ? <FiEyeOff /> : <FiEye />}
      </button>
    </div>
  </div>
)

export default UserSignup
