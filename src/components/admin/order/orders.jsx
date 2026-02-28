import { useState, useEffect, useMemo } from "react";
import { FaSearch, FaEye, FaTrash } from "react-icons/fa";
import {
  getOrders,
  updateOrderStatus as updateOrderStatusAPI,
  deleteOrder,
} from "../../../services/admin/oredrService";

import {
  fetchAllOrdersStart,
  fetchAllOrdersSuccess,
  fetchAllOrdersFailure,
  updateOrderStatus,
  clearAdminOrders,
} from "../../../store/admin/adminOrederSlice";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ORDERS_PER_PAGE = 5;

const Orders = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { allOrders } = useSelector((state) => state.adminOrder);
  console.log("allOrders", allOrders)
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  /* ================= FETCH ORDERS ================= */
  useEffect(() => {

    if (allOrders.length > 0) return;

    const fetchOrders = async () => {
      dispatch(fetchAllOrdersStart());
      try {
        const res = await getOrders();
        dispatch(
          fetchAllOrdersSuccess({
            orders: res.orders || [],
            totalOrders: res.totalOrder || 0,
          })
        );
      } catch (err) {
        dispatch(fetchAllOrdersFailure(err.message));
      }
    };

    fetchOrders();
  }, [dispatch]);

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
  const totalPages = Math.ceil(filteredOrders.length / ORDERS_PER_PAGE);
  const start = (currentPage - 1) * ORDERS_PER_PAGE;
  const currentOrders = filteredOrders.slice(
    start,
    start + ORDERS_PER_PAGE
  );

  /* ================= ACTIONS ================= */
  const handleStatusChange = async (id, status) => {
    await updateOrderStatusAPI(id, { status });
    dispatch(updateOrderStatus({ id, status }));
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this order?")) return;
    await deleteOrder(id);
    dispatch(
      fetchAllOrdersSuccess({
        orders: allOrders.filter((o) => o._id !== id),
        totalOrders: allOrders.length - 1,
      })
    );
  };

  /* ================= STATUS COLOR ================= */
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
    <div className="p-4 sm:p-6">
      {/* HEADER */}
      <div className="flex justify-between mb-6">
        <h2 className="text-2xl font-bold">Orders</h2>

        <div className="flex items-center bg-white px-3 py-2 shadow rounded-md">
          <FaSearch className="text-gray-500" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search orders..."
            className="ml-2 outline-none text-sm"
          />
        </div>
      </div>

      {/* FILTER */}
      <div className="flex gap-3 mb-4">
        {["all", "Pending", "Completed", "Cancelled"].map((status) => (
          <button
            key={status}
            onClick={() => {
              setStatusFilter(status);
              setCurrentPage(1);
            }}
            className={`px-4 py-1 rounded-md text-sm ${statusFilter === status
                ? "bg-purple-600 text-white"
                : "bg-gray-200"
              }`}
          >
            {status === "all" ? "All" : status}
          </button>
        ))}
      </div>

      {/* TABLE */}
      {/* ================= MOBILE VIEW ================= */}
      <div className="block md:hidden space-y-4">
        {currentOrders.map((o) => (
          <div
            key={o._id}
            className="bg-white rounded-xl shadow p-4 space-y-3"
          >
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-gray-800">
                {o.orderId}
              </h3>
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                  o.orderStatus
                )}`}
              >
                {o.orderStatus}
              </span>
            </div>

            <div className="text-sm text-gray-600 space-y-1">
              <p>
                <span className="font-medium">Customer:</span>{" "}
                {o.customerName}
              </p>
              <p>
                <span className="font-medium">Date:</span>{" "}
                {new Date(o.createdAt).toLocaleDateString()}
              </p>
              <p className="font-semibold text-gray-800">
                Amount: ₹{o.totalAmount}
              </p>
            </div>

            {/* STATUS CHANGE */}
            <select
              value={o.orderStatus}
              onChange={(e) =>
                handleStatusChange(o._id, e.target.value)
              }
              className={`w-full px-3 py-2 rounded-md text-sm ${getStatusColor(
                o.orderStatus
              )}`}
            >
              <option>Pending</option>
              <option>Completed</option>
              <option>Cancelled</option>
            </select>

            {/* ACTIONS */}
            <div className="flex gap-3 pt-2">
              <button
                onClick={() => navigate(`/admin/orders/${o._id}`)}
                className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white py-2 rounded-lg"
              >
                <FaEye /> View
              </button>

              <button
                onClick={() => handleDelete(o._id)}
                className="flex-1 flex items-center justify-center gap-2 bg-red-600 text-white py-2 rounded-lg"
              >
                <FaTrash /> Delete
              </button>
            </div>
          </div>
        ))}

        {currentOrders.length === 0 && (
          <p className="text-center text-gray-500 py-10">
            No orders found
          </p>
        )}
      </div>

      {/* ================= DESKTOP TABLE ================= */}
      <div className="hidden md:block bg-white shadow rounded-lg overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {currentOrders.map((o) => (
              <tr key={o._id} className="border-b hover:bg-gray-50">
                <td>{o.orderId}</td>
                <td>{o.customerName}</td>
                <td>₹{o.totalAmount}</td>
                <td>
                  {new Date(o.createdAt).toLocaleDateString()}
                </td>

                <td>
                  <select
                    value={o.orderStatus}
                    onChange={(e) =>
                      handleStatusChange(o._id, e.target.value)
                    }
                    className={`px-2 py-1 rounded ${getStatusColor(
                      o.orderStatus
                    )}`}
                  >
                    <option>Pending</option>
                    <option>Completed</option>
                    <option>Cancelled</option>
                  </select>
                </td>

                <td className="flex gap-3">
                  <button
                    onClick={() =>
                      navigate(`/admin/orders/${o._id}`)
                    }
                    className="text-blue-600 flex gap-1"
                  >
                    <FaEye /> View
                  </button>

                  <button
                    onClick={() => handleDelete(o._id)}
                    className="text-red-600 flex gap-1"
                  >
                    <FaTrash /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>


      {/* PAGINATION */}
      <div className="flex justify-end gap-2 mt-6">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => p - 1)}
          className="px-3 py-1 bg-gray-200 rounded"
        >
          Prev
        </button>

        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((p) => p + 1)}
          className="px-3 py-1 bg-gray-200 rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Orders;
