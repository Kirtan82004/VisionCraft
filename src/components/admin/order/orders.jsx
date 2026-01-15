import { useState, useEffect, useMemo } from "react";
import { FaSearch, FaEye, FaTrash } from "react-icons/fa";
import {
  getOrders,
  updateOrderStatus,
  deleteOrder,
} from "../../../services/admin/oredrService";
import {
  fetchOrdersStart,
  fetchOrdersFailure,
  fetchOrdersSuccess,
} from "../../../store/orderSlice";
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

  /* ================= FETCH ================= */
  useEffect(() => {
    const fetchOrdersData = async () => {
      dispatch(fetchOrdersStart());
      try {
        const data = await getOrders();
        setAllOrders(data.orders || []);
        dispatch(fetchOrdersSuccess(data.orders || []));
      } catch (error) {
        dispatch(fetchOrdersFailure(error.message));
      }
    };
    fetchOrdersData();
  }, [dispatch]);

  /* ================= HELPERS ================= */
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

  /* ================= FILTER ================= */
  const filteredOrders = useMemo(() => {
    return allOrders.filter((order) => {
      const q = search.toLowerCase();
      const matchesSearch =
        order.orderId?.toLowerCase().includes(q) ||
        order.customerName?.toLowerCase().includes(q);

      const matchesStatus =
        statusFilter === "all" || order.orderStatus === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [allOrders, search, statusFilter]);

  /* ================= PAGINATION ================= */
  const indexOfLast = currentPage * ordersPerPage;
  const indexOfFirst = indexOfLast - ordersPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

  /* ================= ACTIONS ================= */
  const handleStatusChange = async (id, newStatus) => {
    await updateOrderStatus(id, { status: newStatus });
    setAllOrders((prev) =>
      prev.map((o) =>
        o._id === id ? { ...o, orderStatus: newStatus } : o
      )
    );
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this order?")) return;
    await deleteOrder(id);
    setAllOrders((prev) => prev.filter((o) => o._id !== id));
  };

  return (
    <div className="p-4 sm:p-6">

      {/* ================= HEADER ================= */}
      <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
        <h2 className="text-2xl font-bold">Orders</h2>

        <div className="flex items-center bg-white px-3 py-2 shadow rounded-md w-full sm:w-64">
          <FaSearch className="text-gray-500" />
          <input
            placeholder="Search orders..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="ml-2 outline-none w-full text-sm"
          />
        </div>
      </div>

      {/* ================= STATUS FILTER ================= */}
      <div className="flex flex-wrap gap-3 mb-4">
        {["all", "Pending", "Completed", "Cancelled"].map((status) => (
          <button
            key={status}
            onClick={() => {
              setStatusFilter(status);
              setCurrentPage(1);
            }}
            className={`px-4 py-1 rounded-md text-sm ${
              statusFilter === status
                ? "bg-purple-600 text-white"
                : "bg-gray-200"
            }`}
          >
            {status === "all" ? "All" : status}
          </button>
        ))}
      </div>

      {/* ================= DESKTOP TABLE ================= */}
      <div className="hidden sm:block bg-white shadow rounded-lg overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-100 text-sm">
            <tr>
              <th className="py-3 px-4">Order ID</th>
              <th className="py-3 px-4">Customer</th>
              <th className="py-3 px-4">Amount</th>
              <th className="py-3 px-4">Date</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentOrders.map((o) => (
              <tr key={o._id} className="border-b hover:bg-gray-50">
                <td className="py-3 px-4 font-semibold">{o.orderId}</td>
                <td className="py-3 px-4">{o.customerName}</td>
                <td className="py-3 px-4">₹{o.totalAmount}</td>
                <td className="py-3 px-4">
                  {new Date(o.createdAt).toLocaleDateString()}
                </td>
                <td className="py-3 px-4">
                  <select
                    value={o.orderStatus}
                    onChange={(e) =>
                      handleStatusChange(o._id, e.target.value)
                    }
                    className={`px-2 py-1 rounded-md text-xs ${getStatusColor(
                      o.orderStatus
                    )}`}
                  >
                    <option>Pending</option>
                    <option>Completed</option>
                    <option>Cancelled</option>
                  </select>
                </td>
                <td className="py-3 px-4 flex gap-2">
                  <ActionButtons
                    order={o}
                    navigate={navigate}
                    handleDelete={handleDelete}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ================= MOBILE CARDS ================= */}
      <div className="sm:hidden space-y-4">
        {currentOrders.map((o) => (
          <div
            key={o._id}
            className="bg-white shadow rounded-lg p-4 space-y-2"
          >
            <div className="flex justify-between">
              <p className="font-semibold">{o.orderId}</p>
              <select
                value={o.orderStatus}
                onChange={(e) =>
                  handleStatusChange(o._id, e.target.value)
                }
                className={`px-2 py-1 text-xs rounded-md ${getStatusColor(
                  o.orderStatus
                )}`}
              >
                <option>Pending</option>
                <option>Completed</option>
                <option>Cancelled</option>
              </select>
            </div>

            <p className="text-sm text-gray-600">
              Customer: {o.customerName}
            </p>

            <div className="flex justify-between text-sm">
              <span>Amount</span>
              <span className="font-semibold">₹{o.totalAmount}</span>
            </div>

            <div className="flex justify-between text-sm">
              <span>Date</span>
              <span>
                {new Date(o.createdAt).toLocaleDateString()}
              </span>
            </div>

            <div className="flex justify-end gap-4 pt-2 border-t">
              <ActionButtons
                order={o}
                navigate={navigate}
                handleDelete={handleDelete}
              />
            </div>
          </div>
        ))}
      </div>

      {/* ================= PAGINATION ================= */}
      <div className="flex justify-between items-center mt-6">
        <p className="text-sm text-gray-600">
          {indexOfFirst + 1} –{" "}
          {Math.min(indexOfLast, filteredOrders.length)} of{" "}
          {filteredOrders.length}
        </p>

        <div className="flex gap-2">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            Prev
          </button>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Orders;

/* ================= ACTION BUTTONS ================= */
const ActionButtons = ({ order, navigate, handleDelete }) => (
  <>
    <button
      onClick={() => navigate(`/admin/orders/${order._id}`)}
      className="text-blue-600 flex items-center gap-1 text-sm"
    >
      <FaEye /> View
    </button>
    <button
      onClick={() => handleDelete(order._id)}
      className="text-red-600 flex items-center gap-1 text-sm"
    >
      <FaTrash /> Delete
    </button>
  </>
);
