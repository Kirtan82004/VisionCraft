import { useState, useEffect } from "react";
import { FaSearch, FaEye, FaTrash } from "react-icons/fa";
import { getOrders, updateOrderStatus, deleteOrder } from "../../../services/admin/oredrService.js";
import { fetchOrdersStart, fetchOrdersFailure, fetchOrdersSuccess } from "../../../store/orderSlice.js";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Orders = () => {
  const [search, setSearch] = useState("");
  const [allOrders, setAllOrders] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 5;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrdersData = async () => {
      dispatch(fetchOrdersStart());
      try {
        const data = await getOrders();
        console.log("OrdersData", data);
        setAllOrders(data.orders || []);
        dispatch(fetchOrdersSuccess(data.orders || []));
      } catch (error) {
        console.error("Orders Fetch Error:", error);
        dispatch(fetchOrdersFailure(error.message));
      }
    };
    fetchOrdersData();
  }, [dispatch]);

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

  // 🔥 Search + Status filter logic
  const filteredOrders = allOrders.filter((order) => {
    const searchLower = search.toLowerCase();
    const matchesSearch =
      order.orderId?.toLowerCase().includes(searchLower) ||
      order.customerName?.toLowerCase().includes(searchLower) ||
      order.orderStatus?.toLowerCase().includes(searchLower);

    const matchesStatus =
      statusFilter === "all" || order.orderStatus === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // 🔥 Pagination
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

  // 🔥 Update status
  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateOrderStatus(id, { status: newStatus });
      setAllOrders((prev) =>
        prev.map((o) =>
          o._id === id ? { ...o, orderStatus: newStatus } : o
        )
      );
    } catch (error) {
      console.error("Update status error:", error);
    }
  };

  // 🔥 Delete order
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this order?")) return;
    try {
      await deleteOrder(id);
      setAllOrders((prev) => prev.filter((o) => o._id !== id));
    } catch (error) {
      console.error("Delete order error:", error);
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

      {/* Status Filter Buttons */}
      <div className="flex gap-4 mb-4">
        {["all", "Pending", "Completed", "Cancelled"].map((status) => (
          <button
            key={status}
            onClick={() => setStatusFilter(status)}
            className={`px-4 py-1 text-sm rounded-md ${
              statusFilter === status
                ? "bg-purple-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            {status === "all" ? "All" : status}
          </button>
        ))}
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
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>

          <tbody className="text-gray-700 text-sm">
            {currentOrders.map((order) => (
              <tr key={order._id} className="border-b hover:bg-gray-50">
                <td className="py-3 px-4 font-semibold">{order.orderId}</td>
                <td className="py-3 px-4">{order.customerName}</td>
                <td className="py-3 px-4">₹{order.totalAmount}</td>
                <td className="py-3 px-4">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>
                <td className="py-3 px-4">
                  <select
                    value={order.orderStatus}
                    onChange={(e) => handleStatusChange(order._id, e.target.value)}
                    className={`px-2 py-1 rounded-md text-xs font-semibold ${getStatusColor(
                      order.orderStatus
                    )}`}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </td>
                <td className="py-3 px-4 flex gap-2">
                  <button
                    onClick={() => navigate(`/admin/orders/${order._id}`)}
                    className="flex items-center gap-2 px-3 py-1 bg-purple-600 text-white rounded-md text-xs hover:bg-purple-700 transition"
                  >
                    <FaEye /> View
                  </button>
                  <button
                    onClick={() => handleDelete(order._id)}
                    className="flex items-center gap-2 px-3 py-1 bg-red-600 text-white rounded-md text-xs hover:bg-red-700 transition"
                  >
                    <FaTrash /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <p className="text-sm text-gray-600">
          Showing {indexOfFirstOrder + 1} to{" "}
          {Math.min(indexOfLastOrder, filteredOrders.length)} of{" "}
          {filteredOrders.length} results
        </p>

        <div className="flex gap-2">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
            className="px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300 disabled:opacity-50"
          >
            Prev
          </button>
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 rounded-md ${
                currentPage === i + 1
                  ? "bg-purple-600 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
            className="px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Orders;