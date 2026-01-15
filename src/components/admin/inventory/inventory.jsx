import { FaSearch, FaPlus, FaEdit, FaTrash, FaEye } from "react-icons/fa";
import { useState, useEffect, useMemo } from "react";
import { getProducts, deleteProduct } from "../../../services/admin/productService";
import { useNavigate } from "react-router-dom";

const Inventory = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const navigate = useNavigate();

  /* ================= FETCH ================= */
  useEffect(() => {
    (async () => {
      const data = await getProducts();
      setProducts(data || []);
    })();
  }, []);

  /* ================= FILTER ================= */
  const filtered = useMemo(() => {
    let data = [...products];

    if (search) {
      data = data.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (categoryFilter !== "all") {
      data = data.filter(p => p.category?.name === categoryFilter);
    }

    return data;
  }, [products, search, categoryFilter]);

  const categories = [...new Set(products.map(p => p.category?.name).filter(Boolean))];

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    await deleteProduct(id);
    setProducts(prev => prev.filter(p => p._id !== id));
  };

  return (
    <div className="p-4 sm:p-6">

      {/* ================= HEADER ================= */}
      <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
        <h1 className="text-2xl font-semibold">Inventory</h1>

        <button
          onClick={() => navigate("/admin/product/add")}
          className="bg-purple-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <FaPlus /> Add Product
        </button>
      </div>

      {/* ================= SEARCH + FILTER ================= */}
      <div className="bg-white p-4 rounded-lg shadow mb-6 flex flex-col sm:flex-row gap-4">
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
          {categories.map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      {/* ================= DESKTOP TABLE ================= */}
      <div className="hidden sm:block bg-white shadow rounded-lg overflow-x-auto">
        <table className="w-full">
          <thead className="bg-purple-600 text-white">
            <tr>
              <th className="py-3 px-4">Product</th>
              <th className="py-3 px-4">Stock</th>
              <th className="py-3 px-4">Price</th>
              <th className="py-3 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(p => (
              <tr key={p._id} className="border-b hover:bg-gray-100">
                <td className="py-3 px-4">{p.name}</td>
                <td className={`py-3 px-4 font-semibold ${p.stock < 10 ? "text-red-500" : ""}`}>
                  {p.stock}
                </td>
                <td className="py-3 px-4">₹{p.price}</td>
                <td className="py-3 px-4 text-center">
                  <Actions p={p} navigate={navigate} handleDelete={handleDelete} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ================= MOBILE CARDS ================= */}
      <div className="sm:hidden space-y-4">
        {filtered.map(p => (
          <div key={p._id} className="bg-white rounded-lg shadow p-4 space-y-2">
            <h3 className="font-semibold text-gray-800">{p.name}</h3>
            <p className="text-sm text-gray-500">{p.category?.name}</p>

            <div className="flex justify-between text-sm">
              <span>Stock</span>
              <span className={`font-semibold ${p.stock < 10 ? "text-red-500" : ""}`}>
                {p.stock}
              </span>
            </div>

            <div className="flex justify-between text-sm">
              <span>Price</span>
              <span className="font-semibold">₹{p.price}</span>
            </div>

            <div className="flex justify-end gap-6 pt-3 border-t">
              <Actions p={p} navigate={navigate} handleDelete={handleDelete} />
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
  <>
    <button onClick={() => navigate(`/admin/product/${p._id}`)} className="text-blue-600">
      <FaEye />
    </button>
    <button onClick={() => navigate(`/admin/product/edit/${p._id}`)} className="text-green-600">
      <FaEdit />
    </button>
    <button onClick={() => handleDelete(p._id)} className="text-red-600">
      <FaTrash />
    </button>
  </>
);
