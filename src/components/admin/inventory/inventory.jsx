import { FaSearch, FaPlus, FaEdit, FaTrash, FaEye } from "react-icons/fa";
import { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  fetchAdminProducts,
  deleteAdminProduct,
} from "../../../store/admin/adminProductSlice";

const Inventory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { products, loading } = useSelector(
    (state) => state.adminProduct
  );

  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  /* ================= FETCH ================= */
  useEffect(() => {
    if (products.length === 0) {
      dispatch(fetchAdminProducts({}));
    }
  }, [dispatch]);

  /* ================= FILTER ================= */
  const filtered = useMemo(() => {
    let data = [...products];

    if (search) {
      data = data.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (categoryFilter !== "all") {
      data = data.filter(
        (p) => p.category?.name === categoryFilter
      );
    }

    return data;
  }, [products, search, categoryFilter]);

  /* ================= CATEGORIES ================= */
  const categories = useMemo(
    () =>
      [...new Set(products.map((p) => p.category?.name))].filter(Boolean),
    [products]
  );

  /* ================= DELETE ================= */
  const handleDelete = (id) => {
    if (!window.confirm("Delete this product?")) return;
    dispatch(deleteAdminProduct(id));
  };

  return (
    <div className="p-4 sm:p-6 space-y-6">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <h1 className="text-2xl font-semibold text-gray-800">
          Inventory
        </h1>

        <button
          onClick={() => navigate("/admin/product/add")}
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 w-fit"
        >
          <FaPlus /> Add Product
        </button>
      </div>

      {/* SEARCH + FILTER */}
      <div className="bg-white p-4 rounded-lg shadow flex flex-col sm:flex-row gap-4">
        <div className="flex items-center bg-gray-100 px-3 py-2 rounded-md w-full sm:w-1/2">
          <FaSearch className="text-gray-500" />
          <input
            className="bg-transparent outline-none px-2 w-full"
            placeholder="Search product..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <select
          className="border px-3 py-2 rounded-md w-full sm:w-1/4"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="all">All Categories</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {/* LOADING */}
      {loading && (
        <div className="text-center text-gray-500">
          Loading products...
        </div>
      )}

      {/* EMPTY */}
      {!loading && filtered.length === 0 && (
        <div className="bg-white p-6 rounded-lg shadow text-center text-gray-500">
          No products found
        </div>
      )}

      {/* DESKTOP TABLE */}
      {filtered.length > 0 && (
        <div className="hidden sm:block bg-white shadow rounded-lg overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-purple-600 text-white">
              <tr>
                <th className="py-3 px-4 text-left">Product</th>
                <th className="py-3 px-4 text-center">Stock</th>
                <th className="py-3 px-4 text-right">Price</th>
                <th className="py-3 px-4 text-center w-32">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <tr key={p._id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium">
                    {p.name}
                  </td>

                  <td
                    className={`py-3 px-4 text-center font-semibold ${p.stock < 10
                        ? "text-red-500"
                        : "text-gray-700"
                      }`}
                  >
                    {p.stock}
                  </td>

                  <td className="py-3 px-4 text-right font-semibold">
                    ₹{p.price}
                  </td>

                  <td className="py-3 px-4">
                    <Actions
                      p={p}
                      navigate={navigate}
                      handleDelete={handleDelete}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* MOBILE CARDS */}
      <div className="sm:hidden space-y-4">
        {filtered.map((p) => (
          <div
            key={p._id}
            className="bg-white rounded-lg shadow p-4 space-y-3"
          >
            <div>
              <h3 className="font-semibold">{p.name}</h3>
              <p className="text-xs text-gray-500">
                {p.category?.name}
              </p>
            </div>

            <div className="flex justify-between text-sm">
              <span>Stock</span>
              <span
                className={`font-semibold ${p.stock < 10 ? "text-red-500" : ""
                  }`}
              >
                {p.stock}
              </span>
            </div>

            <div className="flex justify-between text-sm">
              <span>Price</span>
              <span className="font-semibold">
                ₹{p.price}
              </span>
            </div>

            <div className="flex justify-end gap-6 pt-3 border-t">
              <Actions
                p={p}
                navigate={navigate}
                handleDelete={handleDelete}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Inventory;

/* ================= ACTIONS ================= */
const Actions = ({ p, navigate, handleDelete }) => (
  <div className="flex items-center justify-center gap-4">
    <button
      onClick={() => navigate(`/admin/product/${p._id}`)}
      className="text-blue-600 hover:scale-110 transition"
    >
      <FaEye />
    </button>
    <button
      onClick={() => navigate(`/admin/product/edit/${p._id}`)}
      className="text-green-600 hover:scale-110 transition"
    >
      <FaEdit />
    </button>
    <button
      onClick={() => handleDelete(p._id)}
      className="text-red-600 hover:scale-110 transition"
    >
      <FaTrash />
    </button>
  </div>
);
