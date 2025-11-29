import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createProduct } from "../../../services/admin/productService";

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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setForm({ ...form, images: files });

    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreview(previews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const fd = new FormData();
    Object.keys(form).forEach((key) => {
      if (key === "images") {
        form.images.forEach((img) => fd.append("images", img));
      } else {
        fd.append(key, form[key]);
      }
    });

    const data = await createProduct(fd);

    setIsLoading(false);

    console.log("NewProductData", data);
    navigate("/admin/inventory");
  };

  return (
    <div className="lg:ml-64 p-6 bg-gray-50 min-h-screen">

      {/* ✅ Loading Screen */}
    {isLoading && (
          <div className="absolute inset-0 bg-white bg-opacity-70 flex justify-center items-center rounded">
            <div className="text-gray-600 text-lg font-medium">
              Adding Product...
            </div>
          </div>
        )}

      <div className="bg-white p-6 rounded shadow max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Add New Product</h2>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Name */}
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={form.name}
            onChange={handleChange}
            className="w-full border p-3 rounded"
            required
          />

          {/* Brand */}
          <input
            type="text"
            name="brand"
            placeholder="Brand"
            value={form.brand}
            onChange={handleChange}
            className="w-full border p-3 rounded"
            required
          />

          {/* Price + Stock */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="number"
              name="price"
              placeholder="Price"
              value={form.price}
              onChange={handleChange}
              className="w-full border p-3 rounded"
              required
            />

            <input
              type="number"
              name="stock"
              placeholder="Stock"
              value={form.stock}
              onChange={handleChange}
              className="w-full border p-3 rounded"
              required
            />
          </div>

          {/* Category */}
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full border p-3 rounded"
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
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            className="w-full border p-3 rounded h-28"
            required
          />

          {/* Images */}
          <div>
            <label className="font-semibold">Upload Images</label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full border p-3 rounded mt-2"
            />

            {/* Preview */}
            <div className="flex gap-3 mt-3 flex-wrap">
              {imagePreview.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt="preview"
                  className="w-24 h-24 object-cover rounded border"
                />
              ))}
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg w-full"
          >
            Add Product
          </button>

        </form>
      </div>
    </div>
  );
};

export default AddProduct;