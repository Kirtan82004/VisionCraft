import { FaSearch, FaEye, FaTrash } from "react-icons/fa";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCustomers,
  deleteCustomerById,
} from "../../../store/admin/customerSlice";
import { useNavigate } from "react-router-dom";

const Customers = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { customers, loading, error } = useSelector(
    (state) => state.customers
  );

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const customersPerPage = 5;

  useEffect(() => {
    if (!customers || customers.length === 0) {
      dispatch(fetchCustomers());
    }
  }, [dispatch, customers]);

  const filteredCustomers = useMemo(() => {
    let data = (customers || []).map((c) => ({
      id: c._id,
      name: c.fullName ?? "N/A",
      phone: c.phoneNo ?? "-",
      email: c.email ?? "-",
      lastVisit: c.updatedAt ? new Date(c.updatedAt) : null,
      orders: c.totalOrders ?? 0,
    }));

    if (search.trim()) {
      const q = search.toLowerCase();
      data = data.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.email.toLowerCase().includes(q) ||
          c.phone.toLowerCase().includes(q)
      );
    }

    switch (sort) {
      case "recent":
        data.sort((a, b) => (b.lastVisit || 0) - (a.lastVisit || 0));
        break;
      case "orders":
        data.sort((a, b) => b.orders - a.orders);
        break;
      case "name":
        data.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }

    return data;
  }, [customers, search, sort]);

  const totalPages = Math.ceil(filteredCustomers.length / customersPerPage);
  const indexOfLastCustomer = currentPage * customersPerPage;
  const indexOfFirstCustomer = indexOfLastCustomer - customersPerPage;
  const currentCustomers = filteredCustomers.slice(
    indexOfFirstCustomer,
    indexOfLastCustomer
  );

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this customer?"))
      return;
    dispatch(deleteCustomerById(id));
  };

  return (
    <div className="p-4 sm:p-6">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Customers</h1>

      {/* Search + Sort */}
      <div className="bg-white p-4 rounded-lg shadow mb-6 flex flex-col sm:flex-row gap-4">
        <div className="flex items-center bg-gray-100 px-3 py-2 rounded-md w-full sm:w-1/2">
          <FaSearch className="text-gray-500" />
          <input
            type="text"
            placeholder="Search customers..."
            className="bg-transparent outline-none px-2 w-full"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>

        <select
          className="px-3 py-2 border rounded-md text-gray-700 w-full sm:w-1/4"
          value={sort}
          onChange={(e) => {
            setSort(e.target.value);
            setCurrentPage(1);
          }}
        >
          <option value="">Sort by</option>
          <option value="recent">Most Recent</option>
          <option value="orders">Highest Orders</option>
          <option value="name">Name A–Z</option>
        </select>
      </div>

      {/* Loading / Error */}
      {loading && <p className="text-center text-gray-600">Loading customers...</p>}
      {error && <p className="text-center text-red-600">{error}</p>}

      {/* ================= MOBILE CARDS ================= */}
      <div className="block sm:hidden space-y-4">
        {currentCustomers.length === 0 && !loading && (
          <p className="text-center text-gray-500">No customers found</p>
        )}
        {currentCustomers.map((c) => (
          <div key={c.id} className="bg-white shadow rounded-lg p-4 space-y-2">
            <div className="flex justify-between items-center">
              <h2 className="font-semibold text-gray-800">{c.name}</h2>
              <span className="text-sm font-medium">Orders: {c.orders}</span>
            </div>
            <p className="text-sm text-gray-600">
              <span className="font-medium">Phone:</span> {c.phone}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-medium">Email:</span> {c.email}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-medium">Last Visit:</span>{" "}
              {c.lastVisit ? c.lastVisit.toLocaleDateString("en-GB") : "N/A"}
            </p>
            <div className="flex gap-4 pt-2">
              <button
                onClick={() => navigate(`/admin/customers/${c.id}`)}
                className="flex-1 py-2 bg-blue-600 text-white rounded-md text-sm flex justify-center items-center gap-1"
              >
                <FaEye /> View
              </button>
              <button
                onClick={() => handleDelete(c.id)}
                className="flex-1 py-2 bg-red-600 text-white rounded-md text-sm flex justify-center items-center gap-1"
              >
                <FaTrash /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ================= DESKTOP TABLE ================= */}
      {!loading && !error && (
        <div className="hidden sm:block bg-white shadow-md rounded-lg overflow-x-auto">
          <table className="w-full text-left min-w-[700px]">
            <thead className="bg-purple-600 text-white">
              <tr>
                <th className="py-3 px-4">ID</th>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Phone</th>
                <th className="py-3 px-4">Email</th>
                <th className="py-3 px-4">Last Visit</th>
                <th className="py-3 px-4">Orders</th>
                <th className="py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentCustomers.map((c) => (
                <tr key={c.id} className="border-b hover:bg-gray-100">
                  <td className="py-3 px-4">UID-{c.id.slice(-6)}</td>
                  <td className="py-3 px-4">{c.name}</td>
                  <td className="py-3 px-4">{c.phone}</td>
                  <td className="py-3 px-4">{c.email}</td>
                  <td className="py-3 px-4">
                    {c.lastVisit ? c.lastVisit.toLocaleDateString("en-GB") : "N/A"}
                  </td>
                  <td className="py-3 px-4 font-semibold">{c.orders}</td>
                  <td className="py-3 px-4 flex justify-center gap-4">
                    <button
                      onClick={() => navigate(`/admin/customers/${c.id}`)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <FaEye />
                    </button>
                    <button
                      onClick={() => handleDelete(c.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ================= PAGINATION CONTROLS ================= */}
      {totalPages > 1 && (
        <div className="flex flex-wrap justify-center items-center gap-2 mt-4">
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
              className={`px-3 py-1 border rounded ${
                currentPage === i + 1 ? "bg-purple-600 text-white" : ""
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
      )}
    </div>
  );
};

export default Customers;
