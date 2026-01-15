"use client"

import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { updateAccountDetails, updateProfileImage } from "../../services/user/authService"
import { loginSuccess } from "../../store/authSlice"

const EditProfile = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const authUser = useSelector((state) => state.auth.user)

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNo: "",
    address: "",
    profilePic: "",
  })

  const [selectedFile, setSelectedFile] = useState(null)
  const [previewUrl, setPreviewUrl] = useState("")

  useEffect(() => {
    if (authUser) {
      setFormData({
        fullName: authUser.fullName || "",
        email: authUser.email || "",
        phoneNo: authUser.phoneNo || "",
        address: authUser.address || "",
        profilePic: authUser.image || "",
      })
      setPreviewUrl(authUser.image || "https://placehold.co/150x150")
    }
  }, [authUser])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setSelectedFile(file)
      setPreviewUrl(URL.createObjectURL(file))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    let uploadedImageUrl = formData.profilePic

    if (selectedFile) {
      uploadedImageUrl = await updateProfileImage(selectedFile)
    }

    const updatedUser = await updateAccountDetails({
      ...formData,
      profilePic: uploadedImageUrl,
    })

    dispatch(loginSuccess(updatedUser.data))
    navigate("/profile")
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-3xl p-6 sm:p-8">
        <h2 className="text-2xl font-bold mb-6 text-center">Edit Profile</h2>

        {/* Avatar Section */}
        <div className="flex flex-col items-center mb-8">
          <div className="relative">
            <img
              src={previewUrl}
              alt="Profile"
              className="w-28 h-28 rounded-full object-cover border-4 border-blue-500 shadow"
            />
            <label className="absolute bottom-1 right-1 bg-blue-600 text-white text-xs px-2 py-1 rounded-full cursor-pointer hover:bg-blue-700">
              Edit
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
          </div>
          <p className="text-xs text-gray-500 mt-2">Click to change profile photo</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <InputField
            label="Full Name"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
          />

          <InputField
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            disabled
          />

          <InputField
            label="Phone Number"
            name="phoneNo"
            value={formData.phoneNo}
            onChange={handleChange}
          />

          <InputField
            label="Address"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />

          {/* Actions */}
          <div className="sm:col-span-2 flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={() => navigate("/profile")}
              className="px-5 py-2 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition shadow"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

/* Reusable Input */
const InputField = ({ label, name, value, onChange, disabled = false }) => (
  <div>
    <label className="text-sm text-gray-600">{label}</label>
    <input
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      disabled={disabled}
      className={`w-full mt-1 px-3 py-2 border rounded-md text-sm focus:ring-2 focus:ring-blue-400 focus:outline-none ${
        disabled ? "bg-gray-100 cursor-not-allowed" : ""
      }`}
    />
  </div>
)

export default EditProfile
