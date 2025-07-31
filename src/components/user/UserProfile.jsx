import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "../../services/user/authService";
import { removeFromSavedItems } from "../../store/wishlistSlice";
import { removeFromWishlist, getUserWishlist } from "../../services/user/wishlistService";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [savedItems, setSavedItems] = useState([]);
  const dispatch = useDispatch();

  const authUser = useSelector((state) => state.auth.user);
  const userOrders = useSelector((state) => state.orders.orders);
  const userSavedItems = useSelector((state) => state.savedItems.items);
  const navigate = useNavigate();

  useEffect(() => {
    if (authUser) {
      setUser(authUser);
    } else {
      getCurrentUser()
        .then((data) => setUser(data.data.user))
        .catch((err) => console.error(err));
    }
  }, [authUser]);

  useEffect(() => {
    if (userOrders.length > 0) setOrders(userOrders);
  }, [userOrders]);

  useEffect(() => {
    const fetchWishlist = async () => {
      const res = await getUserWishlist();
      setSavedItems(res.wishlist);
    };
    fetchWishlist();
  }, [userSavedItems]);

  const handleRemoveSavedItem = async (item) => {
    await removeFromWishlist(item);
    dispatch(removeFromSavedItems(item));
  };

  if (!user) {
    return <p className="text-center text-gray-500 mt-20">Loading profile...</p>;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 mt-20">
      {/* Profile Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-xl shadow-lg p-6 flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center space-x-4">
          <img
            alt={`Profile of ${user.fullName}`}
            className="w-24 h-24 rounded-full border-4 border-white shadow-md"
            src={user.image || "https://placehold.co/100x100"}
          />
          <div>
            <h2 className="text-2xl font-semibold">{user.fullName}</h2>
            <p className="text-blue-100">{user.email}</p>
          </div>
        </div>
        <button
          className="mt-4 md:mt-0 bg-white text-blue-600 font-semibold px-4 py-2 rounded-lg shadow hover:bg-gray-100 transition"
          onClick={() => navigate("/edit-profile")}
        >
          Edit Profile
        </button>
      </div>

      {/* Personal Info */}
      <div className="bg-white rounded-xl shadow-md p-6 mt-6">
        <h3 className="text-xl font-semibold mb-4">Personal Information</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-gray-600 text-sm">Full Name</label>
            <p className="bg-gray-100 p-2 rounded">{user.fullName}</p>
          </div>
          <div>
            <label className="text-gray-600 text-sm">Email</label>
            <p className="bg-gray-100 p-2 rounded">{user.email}</p>
          </div>
          <div>
            <label className="text-gray-600 text-sm">Phone</label>
            <p className="bg-gray-100 p-2 rounded">{user.phoneNo || "N/A"}</p>
          </div>
          <div>
            <label className="text-gray-600 text-sm">Address</label>
            <p className="bg-gray-100 p-2 rounded">{user.address || "N/A"}</p>
          </div>
        </div>
      </div>

      {/* Order History */}
      <div className="bg-white rounded-xl shadow-md p-6 mt-6 overflow-x-auto">
        <h3 className="text-xl font-semibold mb-4">Order History</h3>
        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-left text-gray-600 border-b">
              <th className="py-2 px-4">Order ID</th>
              <th className="py-2 px-4">Date</th>
              <th className="py-2 px-4">Status</th>
              <th className="py-2 px-4">Total</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr key={order._id} className="border-b hover:bg-gray-50 transition">
                  <td className="py-2 px-4">{order._id}</td>
                  <td className="py-2 px-4">{order.date}</td>
                  <td className="py-2 px-4">{order.status}</td>
                  <td className="py-2 px-4">${order.total}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center text-gray-500 py-4">
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Saved Items */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-4">Saved Items</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {savedItems.length > 0 ? (
            savedItems.map((item) => (
              <div key={item._id} className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col">
                <img
                  alt={item.name}
                  className="w-full h-48 object-cover"
                  src={item.image || "https://placehold.co/600x400"}
                />
                <div className="p-4 flex flex-col flex-grow justify-between">
                  <div>
                    <h4 className="text-lg font-semibold">{item.name}</h4>
                    <p className="text-gray-600 mt-1">${item.price}</p>
                  </div>
                  <button
                    className="bg-red-500 text-white mt-4 px-4 py-2 rounded hover:bg-red-600 transition"
                    onClick={() => handleRemoveSavedItem(item)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No saved items found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
