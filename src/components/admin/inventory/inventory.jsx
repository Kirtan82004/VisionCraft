import { FaSearch, FaPlus, FaEdit, FaTrash, FaEye } from "react-icons/fa";
import { useState, useEffect } from "react";
import { getProducts, deleteProduct } from "../../../services/admin/productService.js";
import { useNavigate } from "react-router-dom";

const Inventory = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState('all');
  const navigate = useNavigate();
  const categorys = [...new Set(products.map(p => p.category.name))];
  console.log("categorys",categorys)
  const fetchProducts = async () => {
    try {
      const data = await getProducts();
      console.log("products in inventory",data)
      setProducts(data || []);
      console.log("InventoryProductsData", data);
    } catch (error) {
      console.error("Inventory Products Error:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (productId) => {
    // Implement delete functionality here
    console.log("Delete product with ID:", productId);
    await deleteProduct(productId);
    fetchProducts();
    // Refresh product list after deletion
  }
  const filterProducts = () => {
    let filtered = [...products];
    console.log("filtered",filtered.map(p => p.category))

    if (search) {
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (categoryFilter !== 'all') {
      filtered = filtered.filter(p => p.category?.name === categoryFilter);
    }
    return filtered;
  };

  const filtered = filterProducts();


  return (
    <div className="p-4 sm:p-6">

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Inventory</h1>

        <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 w-full sm:w-auto justify-center"
          onClick={() => navigate("/admin/product/add")}
        >
          <FaPlus /> Add Product
        </button>
      </div>

      {/* Search + Filter */}
      <div className="bg-white shadow-sm rounded-lg p-4 mb-6 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">

        {/* Search Bar */}
        <div className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-md w-full sm:w-1/2">
          <FaSearch className="text-gray-500" />
          <input
            type="text"
            placeholder="Search product..."
            className="bg-transparent outline-none w-full"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Filter */}
        <select
          className="px-3 py-2 border rounded-md text-gray-700 w-full sm:w-1/4"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="all">All Categories</option>
          {categorys.map(b => (
                  <option key={b} value={b}>{b}</option>
                ))}
        </select>
      </div>

      {/* Product Table – RESPONSIVE */}
      <div className="bg-white shadow-md rounded-lg overflow-x-auto">
        <table className="w-full min-w-[600px] text-left border-collapse">
          <thead className="bg-purple-600 text-white">
            <tr>
              <th className="py-3 px-4 whitespace-nowrap">Product</th>
              <th className="py-3 px-4 whitespace-nowrap">Stock</th>
              <th className="py-3 px-4 whitespace-nowrap">Price</th>
              <th className="py-3 px-4 text-center whitespace-nowrap">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((p) => (
              <tr
                key={p._id}
                className="border-b hover:bg-gray-100 transition"
              >
                <td className="py-3 px-4 wrap-break-word max-w-[200px]">{p.name}</td>

                <td
                  className={`py-3 px-4 font-semibold ${p.stock < 10 ? "text-red-500" : "text-gray-800"
                    }`}
                >
                  {p.stock}
                </td>

                <td className="py-3 px-4">₹{p.price}</td>

                <td className="py-3 px-4">
                  <div className="flex justify-center gap-4 sm:gap-6 text-lg">

                    <button
                      className="text-blue-600 hover:text-blue-800"
                      onClick={() => navigate(`/admin/product/${p._id}`)}
                    >
                      <FaEye size={18} />
                    </button>

                    <button className="text-green-600 hover:text-green-800"
                      onClick={() => navigate(`/admin/product/edit/${p._id}`)}
                    >
                      <FaEdit size={18} />
                    </button>

                    <button className="text-red-600 hover:text-red-800"
                      onClick={() => { handleDelete(p._id) }}
                    >
                      <FaTrash size={18} />
                    </button>

                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default Inventory;
