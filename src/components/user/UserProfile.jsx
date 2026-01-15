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
  const [orders, setOrders] = useState([{
    _id: "",
    createdAt: "",
    orderStatus: "",
    orderTotal: ""

  }]);
  const [savedItems, setSavedItems] = useState([
    {
      _id: "",
      name: "",
      image: "",
      price: ""
    }
  ]);
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
      console.log("Wishlist Response:", res);
      setSavedItems(res.data);
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
  };

  if (!user) {
    return (
      <p className="text-center text-gray-500 mt-20 text-lg animate-pulse">
        Loading profile...
      </p>
    );
  }
  console.log(typeof orders)
  console.log("orders", orders)

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 mt-16 sm:mt-20 space-y-8">

      {/* PROFILE HEADER */}
      <div className="relative bg-linear-to-r from-blue-600 to-indigo-600 rounded-3xl shadow-xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-white">

        <div className="flex items-center gap-5">
          <img
            src={user.image || "https://placehold.co/120x120"}
            alt={user.fullName}
            className="w-24 h-24 rounded-full border-4 border-white shadow-lg object-cover"
          />

          <div>
            <h2 className="text-2xl sm:text-3xl font-bold">
              {user.fullName}
            </h2>
            <p className="text-blue-100 text-sm">{user.email}</p>
          </div>
        </div>

        <button
          onClick={() => navigate("/edit-profile")}
          className="bg-white text-blue-600 font-semibold px-6 py-2 rounded-xl shadow hover:bg-blue-50 transition"
        >
          Edit Profile
        </button>
      </div>

      {/* PERSONAL INFO */}
      <section className="bg-white rounded-3xl shadow-md p-6 sm:p-8">
        <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
          👤 Personal Information
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <InfoField label="Full Name" value={user.fullName} />
          <InfoField label="Email" value={user.email} />
          <InfoField label="Phone" value={user.phoneNo || "N/A"} />
          <InfoField label="Address" value={user.address || "N/A"} />
        </div>
      </section>

      {/* ORDER HISTORY */}
      <section className="bg-white rounded-3xl shadow-md p-6 sm:p-8">
        <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
          📦 Order History
        </h3>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-gray-500 border-b">
                <th className="py-3 px-4 text-left">Order ID</th>
                <th className="py-3 px-4 text-left">Date</th>
                <th className="py-3 px-4 text-left">Status</th>
                <th className="py-3 px-4 text-left">Total</th>
                <th className="py-3 px-4"></th>
              </tr>
            </thead>

            <tbody>
              {orders.length > 0 ? (
                orders.map((order) => (
                  <tr
                    key={order._id}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="py-3 px-4 font-medium">
                      #{order._id.slice(-6)}
                    </td>
                    <td className="py-3 px-4">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold
                      ${order.orderStatus === "Delivered"
                          ? "bg-green-100 text-green-600"
                          : "bg-yellow-100 text-yellow-600"
                        }`}
                      >
                        {order.orderStatus}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-semibold">
                      ₹{order.orderTotal}
                    </td>
                    <td
                      onClick={() => navigate(`/orderDetails/${order._id}`)}
                      className="py-3 px-4 text-blue-600 cursor-pointer hover:underline"
                    >
                      View
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center text-gray-500 py-6">
                    No orders found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* SAVED ITEMS */}
      <section>
        <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
          ❤️ Saved Items
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {savedItems.length > 0 ? (
            savedItems.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-3xl shadow-md overflow-hidden hover:shadow-xl transition group"
              >
                <img
                  src={item.image || "https://placehold.co/600x400"}
                  alt={item.name}
                  className="h-48 w-full object-cover group-hover:scale-105 transition duration-300"
                />

                <div className="p-5 flex flex-col gap-3">
                  <h4 className="font-semibold text-lg">{item.name}</h4>
                  <p className="text-gray-600 font-medium">₹{item.price}</p>

                  <button
                    onClick={() => handleRemoveSavedItem(item)}
                    className="mt-2 bg-red-500 text-white py-2 rounded-xl hover:bg-red-600 transition text-sm"
                  >
                    Remove from Wishlist
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No saved items yet.</p>
          )}
        </div>
      </section>
    </div>
  );
}
  const InfoField = ({ label, value }) => (
    <div className="flex flex-col gap-1">
      <label className="text-gray-500 text-xs uppercase tracking-wide">
        {label}
      </label>
      <p className="bg-gray-100 rounded-xl px-4 py-2 text-gray-800">
        {value}
      </p>
    </div>
  )
  export default Profile
