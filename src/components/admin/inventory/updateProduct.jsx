import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById, updateProduct } from "../../../services/admin/productService";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      const data = await getProductById(id);
      setProduct(data);
      setLoading(false);
    };
    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await updateProduct(id, product);
    console.log("UpdatedProductData", data);
    setProduct(data);
    navigate(`/admin/product/${id}`);
  };

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="lg:ml-64 p-6">
      <div className="bg-white p-6 rounded shadow max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Edit Product</h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            placeholder="Product Name"
          />

          <input
            type="text"
            name="brand"
            value={product.brand}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            placeholder="Brand"
          />

          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            placeholder="Price"
          />

          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            placeholder="Description"
          />

          <button className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">
            Update Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;