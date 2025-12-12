import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { AddProductReview } from "./ProductReview.jsx";
import AddToCart from "./AddToCart.jsx";
import { getProductDetails } from "../../services/productService.js";
import { getCurrentUser } from "../../services/user/authService.js";

const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchProductDetails = async () => {
    setLoading(true);
    try {
      const { data } = await getProductDetails(productId);
      console.log("productId",productId)
      setProduct(data);
      setError("");
     
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch product");
    } finally {
      setLoading(false);
    }
  };
  const fetchUser = async ()=>{
    const user = await getCurrentUser();
  }

  useEffect(() => {
    fetchProductDetails();
    fetchUser();
  }, [productId]);
  

  if (loading) return <p className="text-center text-lg py-10">Loading...</p>;
  if (error) return <p className="text-red-500 text-center py-10">{error}</p>;
console.log("product",product)
  const {
    name,
    description,
    price,
    stock,
    category,
    images,
    averageRating,
    totalReviews,
    reviews = []
  } = product;

  return (
    <main className="container mx-auto px-4 py-8">
      {/* Product Overview */}
      <section className="flex flex-col md:flex-row gap-8 mb-12">
        {/* Image */}
        <div className="md:w-1/2">
          <div className="rounded-xl overflow-hidden shadow-sm border">
            <img
              alt={name}
              src={images?.[0] || "https://placehold.co/600x400"}
              className="w-full object-cover aspect-[4/3]"
            />
          </div>
        </div>

        {/* Info */}
        <div className="md:w-1/2 space-y-4">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">{name}</h1>
          <p className="text-gray-600">{description}</p>

          {/* Price */}
          <div className="text-xl text-green-600 font-bold">${price}</div>

          {/* Stock Info */}
          <div>
            {stock > 0 ? (
              <span className="text-sm font-medium text-green-600">In Stock ({stock})</span>
            ) : (
              <span className="text-sm font-medium text-red-600">Out of Stock</span>
            )}
          </div>

          {/* Category Tag */}
          {category && (
            <span className="inline-block px-3 py-1 text-sm bg-gray-200 rounded-full text-gray-700">
              {category.name}
            </span>
          )}

          {/* Ratings */}
          <div className="text-yellow-500 text-sm">
            {averageRating ? `${averageRating} ⭐ (${totalReviews} reviews)` : "No ratings yet"}
          </div>

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
          {description || "No additional description available."}
        </p>
      </section>

      {/* Reviews */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Customer Reviews</h2>

        {reviews.length > 0 ? (
          <div className="space-y-4">
            {reviews.map((review) => (
              <div key={review._id} className="bg-white p-4 rounded-xl shadow-sm border">
                <p className="font-semibold text-gray-800">
                  {review.user?.fullName ||"Anonymous"}{" "}
                  <span className="text-yellow-500">({review.rating}⭐)</span>
                </p>
                <p className="text-gray-600">{review.comment}</p>
                <p className="text-xs text-gray-400">{new Date(review.createdAt).toLocaleDateString()}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 mb-4">No reviews yet.</p>
        )}

        <AddProductReview  />
      </section>
    </main>
  );
};

export default ProductDetail;
