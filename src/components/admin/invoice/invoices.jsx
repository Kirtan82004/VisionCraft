import { useEffect, useMemo, useState } from "react";
import { FaSearch, FaEye, FaDownload } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import {
  fetchAllOrdersStart,
  fetchAllOrdersSuccess,
  fetchAllOrdersFailure,
} from "../../../store/admin/adminOrederSlice";

import { getOrders, getOrderById } from "../../../services/admin/oredrService";
import generateInvoicePDF from "../../../utils/generateInvoicePDF";

const ITEMS_PER_PAGE = 5;

const Invoices = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { allOrders } = useSelector((state) => state.adminOrder);

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /* ================= FETCH ONLY IF REDUX EMPTY ================= */
  useEffect(() => {
    if (allOrders.length > 0) return;

    const fetchOrders = async () => {
      setLoading(true);
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
        setError("Failed to load invoices");
        dispatch(fetchAllOrdersFailure(err.message));
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [dispatch, allOrders.length]);

  /* ================= ORDERS → INVOICES ================= */
  const invoices = useMemo(() => {
    return allOrders.map((order) => ({
      id: `INV-${order._id.slice(-6).toUpperCase()}`,
      orderId: order._id,
      customer: order.customerName || "Unknown",
      date: order.createdAt?.split("T")[0] || "N/A",
      amount: `₹${order.totalAmount}`,
      status:
        order.paymentStatus === "Success"
          ? "Paid"
          : order.paymentStatus === "pending"
            ? "Pending"
            : "Cancelled",
    }));
  }, [allOrders]);

  /* ================= SEARCH ================= */
  const filteredInvoices = useMemo(() => {
    const q = search.toLowerCase();
    return invoices.filter(
      (inv) =>
        inv.id.toLowerCase().includes(q) ||
        inv.customer.toLowerCase().includes(q) ||
        inv.date.toLowerCase().includes(q) ||
        inv.amount.toLowerCase().includes(q) ||
        inv.status.toLowerCase().includes(q)
    );
  }, [search, invoices]);

  /* ================= PAGINATION ================= */
  const totalPages = Math.ceil(filteredInvoices.length / ITEMS_PER_PAGE);
  const start = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentInvoices = filteredInvoices.slice(
    start,
    start + ITEMS_PER_PAGE
  );

  /* ================= DOWNLOAD PDF ================= */
  const handleDownloadInvoice = async (orderId) => {
    try {
      const res = await getOrderById(orderId);
      generateInvoicePDF(res.data);
    } catch (err) {
      console.error("PDF download failed", err);
    }
  };

  const statusColor = {
    Paid: "text-green-600 bg-green-100",
    Pending: "text-yellow-700 bg-yellow-100",
    Cancelled: "text-red-600 bg-red-100",
  };

  return (
    <div className="p-4 sm:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Invoices
          </h1>
          <p className="text-sm text-gray-500">
            Total Invoices: {filteredInvoices.length}
          </p>
        </div>
      </div>


      {/* Search */}
      <div className="bg-white p-4 rounded-xl shadow mb-6">
        <div className="flex items-center gap-3 bg-gray-100 px-4 py-2 rounded-lg">
          <FaSearch className="text-gray-500" />
          <input
            placeholder="Search by invoice, customer, date, amount..."
            className="bg-transparent outline-none w-full text-sm"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
      </div>


      {loading && (
        <p className="text-center text-gray-500 py-10">
          Loading invoices...
        </p>
      )}

      {error && (
        <p className="text-center text-red-600 py-10">
          {error}
        </p>
      )}


      {/* TABLE */}
      {/* ================= MOBILE VIEW ================= */}
      <div className="block md:hidden space-y-4">
        {currentInvoices.map((inv) => (
          <div
            key={inv.id}
            className="bg-white rounded-xl shadow p-4 space-y-3"
          >
            <div className="flex justify-between items-center">
              <h2 className="font-semibold text-gray-800">
                {inv.id}
              </h2>
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${statusColor[inv.status]}`}
              >
                {inv.status}
              </span>
            </div>

            <div className="text-sm text-gray-600 space-y-1">
              <p>
                <span className="font-medium">Customer:</span>{" "}
                {inv.customer}
              </p>
              <p>
                <span className="font-medium">Date:</span> {inv.date}
              </p>
              <p className="font-semibold text-gray-800">
                Amount: {inv.amount}
              </p>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={() =>
                  navigate(`/admin/invoices/${inv.orderId}`)
                }
                className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white py-2 rounded-lg"
              >
                <FaEye /> View
              </button>

              <button
                onClick={() => handleDownloadInvoice(inv.orderId)}
                className="flex-1 flex items-center justify-center gap-2 bg-green-600 text-white py-2 rounded-lg"
              >
                <FaDownload /> PDF
              </button>
            </div>
          </div>
        ))}

        {currentInvoices.length === 0 && (
          <p className="text-center text-gray-500 py-10">
            No invoices found
          </p>
        )}
      </div>

      {/* ================= DESKTOP TABLE ================= */}
      {!loading && currentInvoices.length > 0 && (
        <div className="hidden md:block bg-white shadow-lg rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-purple-600 text-white">
              <tr>
                <th className="py-3 px-4 text-left">Invoice ID</th>
                <th className="py-3 px-4 text-left">Customer</th>
                <th className="py-3 px-4 text-left">Date</th>
                <th className="py-3 px-4 text-left">Amount</th>
                <th className="py-3 px-4 text-left">Status</th>
                <th className="py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {currentInvoices.map((inv) => (
                <tr
                  key={inv.id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="py-3 px-4 font-medium">
                    {inv.id}
                  </td>
                  <td className="py-3 px-4">{inv.customer}</td>
                  <td className="py-3 px-4">{inv.date}</td>
                  <td className="py-3 px-4 font-semibold">
                    {inv.amount}
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${statusColor[inv.status]}`}
                    >
                      {inv.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex justify-center gap-3">
                      <button
                        onClick={() =>
                          navigate(`/admin/invoices/${inv.orderId}`)
                        }
                        className="p-2 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200"
                      >
                        <FaEye />
                      </button>
                      <button
                        onClick={() =>
                          handleDownloadInvoice(inv.orderId)
                        }
                        className="p-2 rounded-full bg-green-100 text-green-600 hover:bg-green-200"
                      >
                        <FaDownload />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {!loading && currentInvoices.length === 0 && (
        <div className="text-center py-16 bg-white rounded-xl shadow">
          <p className="text-gray-500 text-lg">
            No invoices found 📄
          </p>
          <p className="text-sm text-gray-400 mt-1">
            Try changing your search keyword
          </p>
        </div>
      )}


      {/* PAGINATION */}
      <div className="flex justify-center items-center gap-4 mt-6">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => p - 1)}
          className="px-4 py-2 rounded-lg border disabled:opacity-50 hover:bg-gray-100"
        >
          Prev
        </button>

        <span className="text-sm text-gray-600">
          Page {currentPage} of {totalPages || 1}
        </span>

        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((p) => p + 1)}
          className="px-4 py-2 rounded-lg border disabled:opacity-50 hover:bg-gray-100"
        >
          Next
        </button>
      </div>

    </div>
  );
};

export default Invoices;
