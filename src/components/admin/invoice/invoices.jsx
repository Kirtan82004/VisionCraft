import { useEffect, useState } from "react";
import { FaSearch, FaEye, FaDownload } from "react-icons/fa";
import { getOrders } from "../../../services/admin/oredrService.js";
import { useNavigate, useNavigation } from "react-router-dom";
import generateInvoicePDF from "../../../utils/generateInvoicePDF.js";
import { getOrderById } from "../../../services/admin/oredrService.js";


const Invoices = () => {
  const [invoices, setInvoices] = useState([]);
  const [filteredInvoices, setFilteredInvoices] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate()

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // 👈 change this to control rows per page

  const statusColor = {
    Paid: "text-green-600 bg-green-100",
    Pending: "text-yellow-700 bg-yellow-100",
    Cancelled: "text-red-600 bg-red-100",
  };

  // ✅ Fetch Orders from Backend
  const fetchInvoices = async () => {
    try {
      const data = await getOrders();
      const orders = data.orders;

      // ✅ Convert orders → invoices
      const formatted = orders.map((order) => ({
        id: `INV-${order._id.slice(-6).toUpperCase()}`,
        orderId: order._id,
        customer: order.customerName || "Unknown",
        date: order.createdAt ? order.createdAt.split("T")[0] : "N/A",
        amount: `₹${order.totalAmount}`,
        status:
          order.paymentStatus === "Success"
            ? "Paid"
            : order.paymentStatus === "pending"
              ? "Pending"
              : "Cancelled",
      }));

      setInvoices(formatted);
      console.log("InvoicesData", formatted);
    } catch (err) {
      setError("Failed to load invoices");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

  useEffect(() => {
    const query = search.toLowerCase();

    const results = invoices.filter(
      (inv) =>
        inv.id.toLowerCase().includes(query) ||
        inv.customer.toLowerCase().includes(query) ||
        inv.date.toLowerCase().includes(query) ||
        inv.amount.toLowerCase().includes(query) ||
        inv.status.toLowerCase().includes(query)
    );

    setFilteredInvoices(results);
    setCurrentPage(1); // reset to first page when search changes
  }, [search, invoices]);


  const handleDownloadInvoice = async (orderId) => {
    try {
      const res = await getOrderById(orderId);
      generateInvoicePDF(res.data);
    } catch (error) {
      console.error("PDF download failed", error);
    }
  };


  // ✅ Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentInvoices = filteredInvoices.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredInvoices.length / itemsPerPage);

  return (
    <div className="p-4 sm:p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl sm:text-2xl font-semibold text-gray-800">
          Invoices
        </h1>
      </div>

      {/* Search */}
      <div className="bg-white p-3 rounded-lg shadow mb-4">
        <div className="flex items-center bg-gray-100 px-3 py-2 rounded-md">
          <FaSearch className="text-gray-500" />
          <input
            type="text"
            placeholder="Search invoices..."
            className="bg-transparent outline-none px-2 w-full text-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Loading */}
      {loading && <p className="text-center text-gray-600">Loading invoices...</p>}

      {/* Error */}
      {error && <p className="text-center text-red-600">{error}</p>}

      {/* ================= MOBILE VIEW ================= */}
      <div className="block md:hidden space-y-4">
        {currentInvoices.map((inv) => (
          <div
            key={inv.id}
            className="bg-white shadow rounded-lg p-4 space-y-2"
          >
            <div className="flex justify-between items-center">
              <h2 className="font-semibold text-gray-800">{inv.id}</h2>
              <span
                className={`px-3 py-1 text-xs rounded-full ${statusColor[inv.status]}`}
              >
                {inv.status}
              </span>
            </div>

            <p className="text-sm text-gray-600">
              <span className="font-medium">Customer:</span> {inv.customer}
            </p>

            <p className="text-sm text-gray-600">
              <span className="font-medium">Date:</span> {inv.date}
            </p>

            <p className="text-sm font-semibold text-gray-800">
              Amount: {inv.amount}
            </p>

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => navigate(`/admin/invoices/${inv.orderId}`)}
                className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white py-2 rounded-md text-sm"
              >
                <FaEye /> View
              </button>

              <button
                onClick={() => handleDownloadInvoice(inv.orderId)}
                className="flex-1 flex items-center justify-center gap-2 bg-green-600 text-white py-2 rounded-md text-sm"
              >
                <FaDownload /> PDF
              </button>
            </div>
          </div>
        ))}

        {currentInvoices.length === 0 && (
          <p className="text-center text-gray-500">No invoices found</p>
        )}
      </div>

      {/* ================= DESKTOP TABLE ================= */}
      {!loading && !error && (
        <div className="hidden md:block bg-white shadow-md rounded-lg overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-purple-600 text-white">
              <tr>
                <th className="py-3 px-4">Invoice ID</th>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Amount</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {currentInvoices.map((inv) => (
                <tr key={inv.id} className="border-b hover:bg-gray-100">
                  <td className="py-3 px-4">{inv.id}</td>
                  <td className="py-3 px-4">{inv.customer}</td>
                  <td className="py-3 px-4">{inv.date}</td>
                  <td className="py-3 px-4 font-semibold">{inv.amount}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-3 py-1 text-sm rounded-full ${statusColor[inv.status]}`}
                    >
                      {inv.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 flex justify-center gap-3">
                    <button
                      onClick={() =>
                        navigate(`/admin/invoices/${inv.orderId}`)
                      }
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <FaEye />
                    </button>
                    <button
                      onClick={() => handleDownloadInvoice(inv.orderId)}
                      className="text-green-600 hover:text-green-800"
                    >
                      <FaDownload />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      <div className="flex flex-wrap justify-center gap-2 mt-4">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => p - 1)}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Prev
        </button>

        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 border rounded ${currentPage === i + 1 ? "bg-purple-600 text-white" : ""
              }`}
          >
            {i + 1}
          </button>
        ))}

        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((p) => p + 1)}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );

};

export default Invoices;