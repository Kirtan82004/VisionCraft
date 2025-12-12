import { useState,useEffect } from "react";
import { FaSearch, FaEye } from "react-icons/fa";
import {getOrders} from "../../services/admin/oredrService.js"

const Orders = () => {
  const [search, setSearch] = useState("");
  const [allOrders, setallOrders] = useState([]);

   useEffect(() => {
  const fetchOrders = async () => {
    try {
      const data = await getOrders();
      console.log("OrdersData", data);

      setallOrders(data.orders || []);
      
    } catch (error) {
      console.error("Dashboard Stats Error:", error);
    }
  };

  fetchOrders();
}, []);
    useEffect(() => {
  console.log("orders updated:", allOrders);
}, [allOrders]);


  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-700";
      case "Pending":
        return "bg-yellow-100 text-yellow-700";
      case "Cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className="p-6 lg:left-50">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Orders</h2>

        {/* Search Bar */}
        <div className="flex items-center bg-white px-3 py-2 shadow rounded-md w-64">
          <FaSearch className="text-gray-500" />
          <input
            type="text"
            placeholder="Search orders..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="ml-2 outline-none w-full text-sm"
          />
        </div>
      </div>

      {/* Filter */}
      <div className="flex gap-4 mb-4">
        <button className="px-4 py-1 text-sm rounded-md bg-purple-600 text-white">
          All
        </button>
        <button className="px-4 py-1 text-sm rounded-md bg-yellow-100 text-yellow-700">
          Pending
        </button>
        <button className="px-4 py-1 text-sm rounded-md bg-green-100 text-green-700">
          Completed
        </button>
        <button className="px-4 py-1 text-sm rounded-md bg-red-100 text-red-700">
          Cancelled
        </button>
      </div>

      {/* Orders Table */}
      <div className="bg-white shadow rounded-md overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-100 text-gray-600 uppercase text-sm">
            <tr>
              <th className="py-3 px-4">Order ID</th>
              <th className="py-3 px-4">Customer</th>
              <th className="py-3 px-4">Amount</th>
              <th className="py-3 px-4">Date</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Action</th>
            </tr>
          </thead>

          <tbody className="text-gray-700 text-sm">
            {allOrders.map((order) => (
              <tr key={order._id} className="border-b hover:bg-gray-50">
                <td className="py-3 px-4 font-semibold">{order._id}</td>
                <td className="py-3 px-4">{order.customerName}</td>
                <td className="py-3 px-4">{order.totalAmount}</td>
                <td className="py-3 px-4">{order.date}</td>
                <td className="py-3 px-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                      order.orderStatus
                    )}`}
                  >
                    {order.orderStatus}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <button className="flex items-center gap-2 px-3 py-1 bg-purple-600 text-white rounded-md text-xs hover:bg-purple-700 transition">
                    <FaEye /> View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <p className="text-sm text-gray-600">Showing 1 to 3 of 3 results</p>

        <div className="flex gap-2">
          <button className="px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300">
            Prev
          </button>
          <button className="px-3 py-1 bg-purple-600 text-white rounded-md">
            1
          </button>
          <button className="px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Orders;
