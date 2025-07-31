import { useState } from "react";
import { User, Mail, Phone, MapPin, Save } from "lucide-react";
import { updateAccountDetails } from "../../services/user/authService";

const UpdateAccount = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
  });

  const [error, setError] = useState("");

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // Handle Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.fullName || !formData.email || !formData.phone || !formData.address) {
      setError("All fields are required!");
      return;
    }

    setError(""); // Clear Errors
    try {
        await updateAccountDetails(formData)
        alert("Account details updated successfully!");
    } catch (error) {
        console.log(error.message)
    }
    
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4 flex items-center">
        <User size={24} className="mr-2" /> Update Account Details
      </h2>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form onSubmit={handleSubmit}>
        {/* Full Name */}
        <div className="mb-4 relative">
          <label className="block text-gray-700 mb-2" htmlFor="fullName">
            Full Name
          </label>
          <input
            type="text"
            id="fullName"
            className="border border-gray-300 rounded px-4 py-2 w-full"
            value={formData.fullName}
            onChange={handleChange}
          />
          <User size={20} className="absolute right-3 top-9 text-gray-500" />
        </div>

        {/* Email */}
        <div className="mb-4 relative">
          <label className="block text-gray-700 mb-2" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="border border-gray-300 rounded px-4 py-2 w-full"
            value={formData.email}
            onChange={handleChange}
          />
          <Mail size={20} className="absolute right-3 top-9 text-gray-500" />
        </div>

        {/* Phone Number */}
        <div className="mb-4 relative">
          <label className="block text-gray-700 mb-2" htmlFor="phone">
            Phone Number
          </label>
          <input
            type="text"
            id="phone"
            className="border border-gray-300 rounded px-4 py-2 w-full"
            value={formData.phone}
            onChange={handleChange}
          />
          <Phone size={20} className="absolute right-3 top-9 text-gray-500" />
        </div>

        {/* Address */}
        <div className="mb-4 relative">
          <label className="block text-gray-700 mb-2" htmlFor="address">
            Address
          </label>
          <input
            type="text"
            id="address"
            className="border border-gray-300 rounded px-4 py-2 w-full"
            value={formData.address}
            onChange={handleChange}
          />
          <MapPin size={20} className="absolute right-3 top-9 text-gray-500" />
        </div>

        <button className="bg-blue-500 text-white px-4 py-2 rounded w-full flex items-center justify-center hover:bg-blue-600">
          <Save size={20} className="mr-2" /> Save Changes
        </button>
      </form>
    </div>
  );
};

export default UpdateAccount;
