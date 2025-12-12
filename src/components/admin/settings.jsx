import { useState } from "react";
import { FaCog, FaUser, FaLock, FaStore } from "react-icons/fa";

const Settings = () => {
  const [store, setStore] = useState({
    shopName: "Optical Vision Care",
    phone: "9876543210",
    email: "support@optical.com",
    address: "Main Market, Near Bus Stand",
  });

  const [profile, setProfile] = useState({
    adminName: "Admin User",
    username: "admin123",
  });

  const [password, setPassword] = useState({
    oldPwd: "",
    newPwd: "",
    confirmPwd: "",
  });

  const handleStoreChange = (e) =>
    setStore({ ...store, [e.target.name]: e.target.value });

  const handleProfileChange = (e) =>
    setProfile({ ...profile, [e.target.name]: e.target.value });

  const handlePasswordChange = (e) =>
    setPassword({ ...password, [e.target.name]: e.target.value });

  return (
    <div className="p-6 bg-gray-50 min-h-screen">

      {/* Header */}
      <div className="flex items-center space-x-3 mb-6">
        <FaCog className="text-purple-600 text-3xl" />
        <h2 className="text-2xl font-bold text-gray-800">Settings</h2>
      </div>

      {/* Settings Sections */}
      <div className="space-y-10 max-w-4xl">

        {/* Store Settings */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-lg font-bold text-gray-700 flex items-center gap-2 mb-4">
            <FaStore className="text-purple-600" />
            Store Settings
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            <input
              type="text"
              name="shopName"
              value={store.shopName}
              onChange={handleStoreChange}
              className="p-3 border rounded-lg focus:ring-purple-400"
              placeholder="Shop Name"
            />

            <input
              type="text"
              name="phone"
              value={store.phone}
              onChange={handleStoreChange}
              className="p-3 border rounded-lg focus:ring-purple-400"
              placeholder="Phone Number"
            />

            <input
              type="email"
              name="email"
              value={store.email}
              onChange={handleStoreChange}
              className="p-3 border rounded-lg focus:ring-purple-400"
              placeholder="Email"
            />

            <input
              type="text"
              name="address"
              value={store.address}
              onChange={handleStoreChange}
              className="p-3 border rounded-lg focus:ring-purple-400 md:col-span-2"
              placeholder="Shop Address"
            />
          </div>

          <button className="mt-4 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg">
            Save Store Settings
          </button>
        </div>

        {/* Profile Settings */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-lg font-bold text-gray-700 flex items-center gap-2 mb-4">
            <FaUser className="text-purple-600" />
            Admin Profile
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <input
              type="text"
              name="adminName"
              value={profile.adminName}
              onChange={handleProfileChange}
              className="p-3 border rounded-lg focus:ring-purple-400"
              placeholder="Admin Name"
            />

            <input
              type="text"
              name="username"
              value={profile.username}
              onChange={handleProfileChange}
              className="p-3 border rounded-lg focus:ring-purple-400"
              placeholder="Username"
            />
          </div>

          <button className="mt-4 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg">
            Save Profile Settings
          </button>
        </div>

        {/* Password Settings */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-lg font-bold text-gray-700 flex items-center gap-2 mb-4">
            <FaLock className="text-purple-600" />
            Change Password
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            <input
              type="password"
              name="oldPwd"
              value={password.oldPwd}
              onChange={handlePasswordChange}
              className="p-3 border rounded-lg focus:ring-purple-400"
              placeholder="Old Password"
            />

            <input
              type="password"
              name="newPwd"
              value={password.newPwd}
              onChange={handlePasswordChange}
              className="p-3 border rounded-lg focus:ring-purple-400"
              placeholder="New Password"
            />

            <input
              type="password"
              name="confirmPwd"
              value={password.confirmPwd}
              onChange={handlePasswordChange}
              className="p-3 border rounded-lg focus:ring-purple-400 md:col-span-2"
              placeholder="Confirm New Password"
            />
          </div>

          <button className="mt-4 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg">
            Update Password
          </button>
        </div>

      </div>

    </div>
  );
};

export default Settings;
