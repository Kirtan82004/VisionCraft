import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "../../services/user/authService";
import { removeFromSavedItems } from "../../store/wishlistSlice";
import {
  removeFromWishlist,
  getUserWishlist,
} from "../../services/user/wishlistService";
import { getOrderHistory } from "../../services/user/orderService";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [savedItems, setSavedItems] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const authUser = useSelector((state) => state.auth.user);
  const userSavedItems = useSelector((state) => state.savedItems.items);

  // Get user data
  useEffect(() => {
    if (authUser) {
      setUser(authUser);
    } else {
      getCurrentUser()
        .then((data) => setUser(data.data.user))
        .catch((err) => console.error(err));
    }
  }, [authUser]);

  // Get wishlist
  useEffect(() => {
    const fetchWishlist = async () => {
      const res = await getUserWishlist();
      setSavedItems(res.wishlist);
    };
    fetchWishlist();
  }, [userSavedItems]);

  // Get order history
  useEffect(() => {
    const fetchOrderHistory = async () => {
      const res = await getOrderHistory();
      setOrders(res.orders);
    };
    fetchOrderHistory();
  }, []);

  const handleRemoveSavedItem = async (item) => {
    await removeFromWishlist(item);
    dispatch(removeFromSavedItems(item));
  };

  if (!user) {
    return (
      <p className="text-center text-gray-500 mt-20 text-lg animate-pulse">
        Loading profile...
      </p>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 mt-16 sm:mt-20">
      {/* Profile Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg shadow-lg p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        {/* User Info */}
        <div className="flex items-center gap-4">
          <img
            alt={`Profile of ${user.fullName}`}
            className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-4 border-white shadow-md object-cover"
            src={user.image || "https://placehold.co/100x100"}
          />
          <div>
            <h2 className="text-xl sm:text-2xl font-semibold">
              {user.fullName}
            </h2>
            <p className="text-blue-100 text-sm">{user.email}</p>
          </div>
        </div>

        {/* Edit Button */}
        <button
          className="bg-white text-blue-600 font-semibold px-4 py-2 rounded-lg shadow hover:bg-gray-100 transition text-sm sm:text-base"
          onClick={() => navigate("/edit-profile")}
        >
          Edit Profile
        </button>
      </div>

      {/* Personal Info */}
      <section className="bg-white rounded-lg shadow-md p-4 sm:p-6 mt-6">
        <h3 className="text-lg sm:text-xl font-semibold mb-4">
          Personal Information
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <InfoField label="Full Name" value={user.fullName} />
          <InfoField label="Email" value={user.email} />
          <InfoField label="Phone" value={user.phoneNo || "N/A"} />
          <InfoField label="Address" value={user.address || "N/A"} />
        </div>
      </section>

      {/* Order History */}
      <section className="bg-white rounded-lg shadow-md p-4 sm:p-6 mt-6">
        <h3 className="text-lg sm:text-xl font-semibold mb-4">
          Order History
        </h3>
        <div className="overflow-x-auto">
          <table className="min-w-full text-xs sm:text-sm border-collapse">
            <thead>
              <tr className="text-left text-gray-600 border-b">
                <th className="py-2 px-2 sm:px-4">Order ID</th>
                <th className="py-2 px-2 sm:px-4">Date</th>
                <th className="py-2 px-2 sm:px-4">Status</th>
                <th className="py-2 px-2 sm:px-4">Total</th>
                <th className="py-2 px-2 sm:px-4"></th>
              </tr>
            </thead>
            <tbody>
              {orders.length > 0 ? (
                orders.map((order) => (
                  <tr
                    key={order._id}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="py-2 px-2 sm:px-4">{order._id}</td>
                    <td className="py-2 px-2 sm:px-4">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-2 px-2 sm:px-4">{order.orderStatus}</td>
                    <td className="py-2 px-2 sm:px-4">
                      ${order.orderTotal}
                    </td>
                    <td
                      onClick={() => navigate(`/orderDetails/${order._id}`)}
                      className="py-2 px-2 sm:px-4 text-blue-600 cursor-pointer hover:underline"
                    >
                      Details
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="text-center text-gray-500 py-4"
                  >
                    No orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* Saved Items */}
      <section className="mt-6">
        <h3 className="text-lg sm:text-xl font-semibold mb-4">Saved Items</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {savedItems.length > 0 ? (
            savedItems.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col hover:shadow-lg transition"
              >
                <img
                  alt={item.name}
                  className="w-full h-40 sm:h-48 object-cover"
                  src={item.image || "https://placehold.co/600x400"}
                />
                <div className="p-4 flex flex-col flex-grow justify-between">
                  <div>
                    <h4 className="text-base sm:text-lg font-semibold">
                      {item.name}
                    </h4>
                    <p className="text-gray-600 mt-1">${item.price}</p>
                  </div>
                  <button
                    className="bg-red-500 text-white mt-4 px-3 py-2 rounded hover:bg-red-600 transition text-sm"
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
      </section>
    </div>
  );
};

// Reusable info field
const InfoField = ({ label, value }) => (
  <div>
    <label className="text-gray-600 text-xs sm:text-sm">{label}</label>
    <p className="bg-gray-100 p-2 rounded text-sm">{value}</p>
  </div>
);

export default Profile;
