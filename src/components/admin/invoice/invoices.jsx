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
        orderId:order._id,
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
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Invoices</h1>
      </div>

      {/* Search + Filter Section */}
      <div className="bg-white p-4 rounded-lg shadow mb-6 flex flex-col sm:flex-row gap-4 justify-between">
        {/* Search */}
        <div className="flex items-center bg-gray-100 px-3 py-2 rounded-md w-full sm:w-1/2">
          <FaSearch className="text-gray-500" />
          <input
            type="text"
            placeholder="Search invoices..."
            className="bg-transparent outline-none px-2 w-full"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Status Filter */}
        <select className="px-3 py-2 border rounded-md text-gray-700 w-full sm:w-1/4">
          <option value="">All Status</option>
          <option value="Paid">Paid</option>
          <option value="Pending">Pending</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>

      {/* Loading */}
      {loading && <p className="text-center text-gray-600">Loading invoices...</p>}

      {/* Error */}
      {error && <p className="text-center text-red-600">{error}</p>}

      {/* Invoices Table */}
      {!loading && !error && (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
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
                    <button onClick={()=>navigate(`/admin/invoices/${inv.orderId}`)} className="text-blue-600 hover:text-blue-800">
                      <FaEye />
                    </button>
                    <button onClick={() => handleDownloadInvoice(inv.orderId)} className="text-green-600 hover:text-green-800">
                      <FaDownload />
                    </button>
                  </td>
                </tr>
              ))}
              {currentInvoices.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center py-4 text-gray-500">
                    No invoices found
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* ✅ Pagination Controls */}
          <div className="flex justify-center items-center gap-2 p-4">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Prev
            </button>

            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1 border rounded ${
                  currentPage === i + 1 ? "bg-purple-600 text-white" : ""
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => prev + 1)}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Invoices;