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

  /* ================= FETCH ================= */
  useEffect(() => {
    if(customers.length === 0){
      dispatch(fetchCustomers());
    }
  }, [dispatch]);

  console.log("customers")
  /* ================= FORMAT + FILTER ================= */
  const filteredCustomers = useMemo(() => {
    let data = customers.map((c) => ({
      id: c._id,
      name: c.fullName ?? "N/A",
      phone: c.phoneNo ?? "-",
      email: c.email ?? "-",
      lastVisit: c.updatedAt ? new Date(c.updatedAt) : null,
      orders: c.totalOrders ?? 0,
    }));

    // 🔍 Search
    if (search.trim()) {
      const q = search.toLowerCase();
      data = data.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.email.toLowerCase().includes(q) ||
          c.phone.toLowerCase().includes(q)
      );
    }

    // 🔃 Sort
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

  /* ================= DELETE ================= */
  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this customer?"))
      return;

    dispatch(deleteCustomerById(id));
  };

  /* ================= UI ================= */
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">
        Customers
      </h1>

      {/* Search + Sort */}
      <div className="bg-white p-4 rounded-lg shadow mb-6 flex flex-col sm:flex-row gap-4">
        <div className="flex items-center bg-gray-100 px-3 py-2 rounded-md w-full sm:w-1/2">
          <FaSearch className="text-gray-500" />
          <input
            type="text"
            placeholder="Search customers..."
            className="bg-transparent outline-none px-2 w-full"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <select
          className="px-3 py-2 border rounded-md text-gray-700 w-full sm:w-1/4"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="">Sort by</option>
          <option value="recent">Most Recent</option>
          <option value="orders">Highest Orders</option>
          <option value="name">Name A–Z</option>
        </select>
      </div>

      {/* States */}
      {loading && (
        <p className="text-center text-gray-600">Loading customers...</p>
      )}
      {error && (
        <p className="text-center text-red-600">{error}</p>
      )}

      {/* Table */}
      {!loading && !error && (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="w-full">
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
              {filteredCustomers.map((c) => (
                <tr
                  key={c.id}
                  className="border-b hover:bg-gray-100"
                >
                  <td className="py-3 px-4">
                    UID-{c.id.slice(-6)}
                  </td>
                  <td className="py-3 px-4">{c.name}</td>
                  <td className="py-3 px-4">{c.phone}</td>
                  <td className="py-3 px-4">{c.email}</td>
                  <td className="py-3 px-4">
                    {c.lastVisit
                      ? c.lastVisit.toLocaleDateString("en-GB")
                      : "N/A"}
                  </td>
                  <td className="py-3 px-4 font-semibold">
                    {c.orders}
                  </td>

                  <td className="py-3 px-4 flex justify-center gap-4">
                    <button
                      onClick={() =>
                        navigate(`/admin/customers/${c.id}`)
                      }
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

              {filteredCustomers.length === 0 && (
                <tr>
                  <td
                    colSpan="7"
                    className="text-center py-4 text-gray-500"
                  >
                    No customers found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Customers;
