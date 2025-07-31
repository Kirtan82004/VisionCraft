import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { AddProductReview } from "./ProductReview.jsx";
import AddToCart from "./AddToCart.jsx";
import { getProductDetails } from "../../services/productService.js";

const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchProductDetails = async () => {
    setLoading(true);
    try {
      const { data } = await getProductDetails(productId);
      setProduct(data);
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch product");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductDetails();
  }, [productId]);

  if (loading) return <p className="text-center text-lg py-10">Loading...</p>;
  if (error) return <p className="text-red-500 text-center py-10">{error}</p>;

  return (
    <main className="container mx-auto px-4 py-8">
      {/* Product Overview */}
      <section className="flex flex-col md:flex-row gap-8 mb-12">
        {/* Image */}
        <div className="md:w-1/2">
          <div className="rounded-xl overflow-hidden shadow-sm border">
            <img
              alt={product.name}
              src={product.images?.[0] || "https://placehold.co/600x400"}
              className="w-full object-cover aspect-[4/3]"
            />
          </div>
        </div>

        {/* Info */}
        <div className="md:w-1/2 space-y-4">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">{product.name}</h1>
          <p className="text-gray-600">{product.description}</p>

          <div className="text-xl text-green-600 font-bold">${product.price}</div>

          <AddToCart product={product} />
        </div>
      </section>

      {/* Product Specifications */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Product Specifications</h2>
        <div className="bg-white shadow rounded-xl p-6 space-y-4">
          <ul className="list-disc list-inside text-gray-700 grid grid-cols-1 sm:grid-cols-2 gap-y-2">
            <li>Frame Material: {product.frameMaterial || "Acetate"}</li>
            <li>Lens Material: {product.lensMaterial || "Polycarbonate"}</li>
            <li>Frame Shape: {product.frameShape || "Rectangular"}</li>
            <li>Frame Color: {product.frameColor || "Black"}</li>
            <li>Lens Width: {product.lensWidth || "52mm"}</li>
            <li>Bridge Width: {product.bridgeWidth || "18mm"}</li>
            <li>Temple Length: {product.templeLength || "140mm"}</li>
          </ul>
        </div>
      </section>

      {/* Long Description */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Detailed Description</h2>
        <p className="bg-gray-50 text-gray-700 p-5 rounded-lg shadow-sm leading-relaxed">
          {product.longDescription || "No additional description available."}
        </p>
      </section>

      {/* Reviews */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Customer Reviews</h2>

        {product.reviews && product.reviews.length > 0 ? (
          <div className="space-y-4">
            {product.reviews.map((review) => (
              <div key={review._id} className="bg-white p-4 rounded-xl shadow-sm border">
                <p className="font-semibold text-gray-800">{review.user.name} <span className="text-yellow-500">({review.rating}⭐)</span></p>
                <p className="text-gray-600">{review.comment}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 mb-4">No reviews yet.</p>
        )}

        <AddProductReview onReviewAdded={fetchProductDetails} />
      </section>
    </main>
  );
};

export default ProductDetail;
