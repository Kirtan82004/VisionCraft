import { useState } from "react";
import { Eye, EyeOff, Lock } from "lucide-react";
import { updatePassword } from "../../services/user/authService";

const ChangePassword = () => {
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState({
    old: false,
    new: false,
    confirm: false,
  });

  const [error, setError] = useState("");

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // Toggle password visibility
  const togglePassword = (field) => {
    setShowPassword({ ...showPassword, [field]: !showPassword[field] });
  };

  // Handle form submit
  const handleSubmit =async (e) => {
    e.preventDefault();
    
    if (!formData.oldPassword || !formData.newPassword) {
      setError("Old and new password are required!");
      return;
    }
    
    if (formData.newPassword !== formData.confirmPassword) {
      setError("New password and confirm password do not match!");
      return;
    }

    setError(""); // Clear errors
    try {
        await updatePassword(formData)
        alert("Password changed successfully!");
    } catch (error) {
        console.log(error.message)
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4 flex items-center">
        <Lock size={24} className="mr-2" /> Change Password
      </h2>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form onSubmit={handleSubmit}>
        {/* Old Password */}
        <div className="mb-4 relative">
          <label className="block text-gray-700 mb-2" htmlFor="oldPassword">
            Old Password
          </label>
          <input
            type={showPassword.old ? "text" : "password"}
            id="oldPassword"
            className="border border-gray-300 rounded px-4 py-2 w-full"
            value={formData.oldPassword}
            onChange={handleChange}
          />
          <button
            type="button"
            className="absolute right-3 top-9 text-gray-500"
            onClick={() => togglePassword("old")}
          >
            {showPassword.old ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        {/* New Password */}
        <div className="mb-4 relative">
          <label className="block text-gray-700 mb-2" htmlFor="newPassword">
            New Password
          </label>
          <input
            type={showPassword.new ? "text" : "password"}
            id="newPassword"
            className="border border-gray-300 rounded px-4 py-2 w-full"
            value={formData.newPassword}
            onChange={handleChange}
          />
          <button
            type="button"
            className="absolute right-3 top-9 text-gray-500"
            onClick={() => togglePassword("new")}
          >
            {showPassword.new ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        {/* Confirm Password */}
        <div className="mb-4 relative">
          <label className="block text-gray-700 mb-2" htmlFor="confirmPassword">
            Confirm New Password
          </label>
          <input
            type={showPassword.confirm ? "text" : "password"}
            id="confirmPassword"
            className="border border-gray-300 rounded px-4 py-2 w-full"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          <button
            type="button"
            className="absolute right-3 top-9 text-gray-500"
            onClick={() => togglePassword("confirm")}
          >
            {showPassword.confirm ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        <button className="bg-blue-500 text-white px-4 py-2 rounded w-full hover:bg-blue-600">
          Change Password
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;
