import { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createProduct } from "../../../services/admin/productService";

const inputStyle =
  "w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-purple-500 focus:outline-none";

const AddProduct = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    brand: "",
    price: "",
    stock: "",
    description: "",
    category: "",
    images: [],
  });

  const [imagePreview, setImagePreview] = useState([]);

  /* -------------------- Handlers -------------------- */

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleImageUpload = useCallback((e) => {
    const files = Array.from(e.target.files);
    setForm((prev) => ({ ...prev, images: files }));

    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreview(previews);
  }, []);

  useEffect(() => {
    return () => {
      imagePreview.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [imagePreview]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const fd = new FormData();

      Object.entries(form).forEach(([key, value]) => {
        if (key === "images") {
          value.forEach((img) => fd.append("images", img));
        } else {
          fd.append(key, value);
        }
      });

      await createProduct(fd);
      navigate("/admin/inventory");
    } catch (error) {
      console.error("Add Product Error:", error);
      alert("Failed to add product");
    } finally {
      setIsLoading(false);
    }
  };

  /* -------------------- UI -------------------- */

  return (
    <div className="lg:ml-64 p-6 bg-gray-100 min-h-screen relative">

      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-white/70 flex items-center justify-center z-50">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-600 border-t-transparent"></div>
        </div>
      )}

      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          ➕ Add New Product
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Product Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              placeholder="Product Name"
              value={form.name}
              onChange={handleChange}
              className={inputStyle}
              required
            />

            <input
              type="text"
              name="brand"
              placeholder="Brand"
              value={form.brand}
              onChange={handleChange}
              className={inputStyle}
              required
            />
          </div>

          {/* Price & Stock */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="number"
              name="price"
              placeholder="Price"
              value={form.price}
              onChange={handleChange}
              className={inputStyle}
              required
            />

            <input
              type="number"
              name="stock"
              placeholder="Stock Quantity"
              value={form.stock}
              onChange={handleChange}
              className={inputStyle}
              required
            />
          </div>

          {/* Category */}
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className={inputStyle}
            required
          >
            <option value="">Select Category</option>
            <option value="Eyeglasses">Eyeglasses</option>
            <option value="Sunglasses">Sunglasses</option>
            <option value="Frames">Frames</option>
            <option value="Lens">Lens</option>
            <option value="Accessories">Accessories</option>
          </select>

          {/* Description */}
          <textarea
            name="description"
            placeholder="Product Description"
            value={form.description}
            onChange={handleChange}
            className={`${inputStyle} h-32`}
            required
          />

          {/* Image Upload */}
          <div>
            <label className="block font-medium text-gray-700 mb-2">
              Product Images
            </label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageUpload}
              className={inputStyle}
            />

            {imagePreview.length > 0 && (
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3 mt-4">
                {imagePreview.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt="preview"
                    className="w-full h-24 object-cover rounded-lg border"
                  />
                ))}
              </div>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-lg transition disabled:opacity-50"
          >
            {isLoading ? "Adding Product..." : "Add Product"}
          </button>

        </form>
      </div>
    </div>
  );
};

export default AddProduct;
