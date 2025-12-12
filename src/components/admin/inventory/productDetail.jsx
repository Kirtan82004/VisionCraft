import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import { getProductById,deleteProduct } from "../../../services/admin/productService.js";
import { useNavigate } from "react-router-dom";

const ProductDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState(null);

    const fetchProduct = async () => {
      try {
        const data = await getProductById(id);
        console.log("ProductDetailData", data);
        setProduct(data);
      } catch (error) {
        console.error("Product Fetch Error:", error);
      }
    };
  useEffect(() => {
    fetchProduct();
  }, [id]);


  const handleDelete = async (id) => {
    // Implement delete functionality here
    console.log("Delete product with ID:", id);
    await deleteProduct(id);
    navigate('/admin/inventory');
    fetchProduct();
    // Refresh product list after deletion
  }

  if (!product) {
    return <div className="p-6 text-center text-gray-600">Loading product...</div>;
  }

  return (
    <div className="lg:ml-64 p-6 bg-gray-50 min-h-screen">
      <div className="bg-white shadow rounded-lg p-6">

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">{product.name}</h2>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
            onClick={() => navigate(`/admin/product/edit/${id}`)}
            >
              <FaEdit /> Edit
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            onClick={()=>{handleDelete(id)}}
            >
              <FaTrash /> Delete
            </button>
          </div>
        </div>

        {/* Product Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* Images */}
          <div>
            <img
              src={product.images?.[0]}
              alt={product.name}
              className="w-full h-80 object-cover rounded-lg shadow"
            />

            <div className="flex gap-3 mt-4">
              {product.images?.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt="thumb"
                  className="w-20 h-20 object-cover rounded-md border"
                />
              ))}
            </div>
          </div>

          {/* Details */}
          <div className="space-y-4">
            <p className="text-gray-700">
              <span className="font-semibold">Category:</span> {product.category? product.category?.name: "N/A"}
            </p>

            <p className="text-gray-700">
              <span className="font-semibold">Brand:</span> {product.brand?product.brand: "N/A"}
            </p>

            <p className="text-gray-700">
              <span className="font-semibold">Price:</span> ₹{product.price}
            </p>

            <p className="text-gray-700">
              <span className="font-semibold">Ratings:</span> ⭐ {product.ratings}
            </p>

            <p className="text-gray-700">
              <span className="font-semibold">Stock:</span>{" "}
              {product.stock > 0 ? (
                <span className="text-green-600">In Stock ({product.stock})</span>
              ) : (
                <span className="text-red-600">Out of Stock</span>
              )}
            </p>

            <p className="text-gray-700 leading-relaxed">
              <span className="font-semibold">Description:</span> <br />
              {product.description}
            </p>

            {/* Reviews */}
            {product.reviews?.length > 0 && (
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Reviews</h3>
                <ul className="list-disc ml-6 text-gray-700">
                  {product.reviews.map((rev) => (
                    <li key={rev._id}>
                      <span className="font-semibold">{rev.user?.fullName || "User"}:</span>{" "}
                      {rev.comment} (⭐ {rev.rating})
                    </li>
                  ))}
                </ul>
              </div>
            )}

          </div>
        </div>

      </div>
    </div>
  );
};

export default ProductDetail;