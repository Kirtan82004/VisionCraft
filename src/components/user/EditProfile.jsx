import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateAccountDetails, updateProfileImage } from "../../services/user/authService"; // ✅ New API function
import { loginSuccess } from "../../store/authSlice"; // ✅ Redux state update

const EditProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authUser = useSelector((state) => state.auth.user);
  console.log("edit",authUser)
  
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNo: "",
    address: "",
    profilePic: "",
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");

  useEffect(() => {
    if (authUser) {
      setFormData({
        fullName: authUser.fullName || "",
        email: authUser.email || "",
        phoneNo: authUser.phoneNo || "",
        address: authUser.address || "",
        profilePic: authUser.image|| "",
      });
      setPreviewUrl(authUser.image || "https://placehold.co/100x100");
    }
  }, [authUser]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file)); // Show image preview
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    let uploadedImageUrl = formData.profilePic;

    if (selectedFile) {
      try {
        uploadedImageUrl = await updateProfileImage(selectedFile); // ✅ Upload image API
      } catch (error) {
        console.error("Error uploading image:", error);
        alert("Image upload failed.");
        return;
      }
    }

    try {
      const updatedUser = await updateAccountDetails({ ...formData, profilePic: uploadedImageUrl });
      console.log(updatedUser)
      dispatch(loginSuccess(updatedUser.data));
      alert("Profile updated successfully!");
      navigate("/profile");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile.");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">Edit Profile</h2>
        
        {/* Profile Picture Upload */}
        <div className="flex flex-col items-center mb-4">
          <img
            src={previewUrl}
            alt="Profile"
            className="w-24 h-24 rounded-full border-4 border-gray-300"
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="mt-2 p-2 border rounded w-full"
          />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
              disabled
            />
          </div>

          <div>
            <label className="block text-gray-700">Phone Number</label>
            <input
              type="text"
              name="phoneNo"
              value={formData.phoneNo}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block text-gray-700">Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600"
          >
            Save Changes
          </button>

          {/* Cancel Button */}
          <button
            type="button"
            onClick={() => navigate("/profile")}
            className="ml-4 bg-gray-500 text-white px-4 py-2 rounded shadow hover:bg-gray-600"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
