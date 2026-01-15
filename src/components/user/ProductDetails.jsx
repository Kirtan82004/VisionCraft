import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AddToCart from "./AddToCart";
import { AddProductReview } from "./ProductReview";
import { getProductDetails } from "../../services/productService";

const ProductDetail = () => {
  const { productId } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const { data } = await getProductDetails(productId);
        setProduct(data);
        setError("");
      } catch (err) {
        setError(err?.response?.data?.message || "Failed to load product");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 animate-pulse">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="h-80 bg-gray-200 rounded-xl" />
          <div className="space-y-4">
            <div className="h-6 w-2/3 bg-gray-200 rounded" />
            <div className="h-4 w-full bg-gray-200 rounded" />
            <div className="h-4 w-1/2 bg-gray-200 rounded" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <p className="text-center text-red-500 py-10 text-lg">{error}</p>
    );
  }

  const {
    name,
    description,
    price,
    stock,
    category,
    images = [],
    averageRating,
    totalReviews,
    reviews = [],
  } = product || {};

  return (
    <main className="container mx-auto px-4 py-10">
      {/* PRODUCT TOP */}
      <section className="grid md:grid-cols-2 gap-10 mb-16">
        {/* IMAGE */}
        <div className="rounded-2xl overflow-hidden border shadow-sm">
          <img
            src={images[0] || "https://placehold.co/600x400"}
            alt={name}
            className="w-full h-[380px] object-cover"
          />
        </div>

        {/* INFO */}
        <div className="space-y-5">
          <h1 className="text-3xl font-bold text-gray-800">{name}</h1>

          <p className="text-gray-600 leading-relaxed">{description}</p>

          <div className="flex items-center gap-4">
            <span className="text-2xl font-bold text-green-600">
              ₹{price}
            </span>

            {stock > 0 ? (
              <span className="text-sm text-green-700 bg-green-100 px-3 py-1 rounded-full">
                In Stock ({stock})
              </span>
            ) : (
              <span className="text-sm text-red-700 bg-red-100 px-3 py-1 rounded-full">
                Out of Stock
              </span>
            )}
          </div>

          {category && (
            <span className="inline-block text-sm bg-gray-100 px-3 py-1 rounded-full">
              {category.name}
            </span>
          )}

          <div className="text-sm text-yellow-600">
            {averageRating
              ? `${averageRating} ⭐ (${totalReviews} reviews)`
              : "No ratings yet"}
          </div>

          <div className="pt-4">
            <AddToCart product={product} />
          </div>
        </div>
      </section>

      {/* SPECIFICATIONS */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-6">
          Product Specifications
        </h2>

        <div className="grid sm:grid-cols-2 gap-4 bg-white p-6 rounded-2xl shadow-sm border">
          <Spec label="Frame Material" value={product.frameMaterial || "Acetate"} />
          <Spec label="Lens Material" value={product.lensMaterial || "Polycarbonate"} />
          <Spec label="Frame Shape" value={product.frameShape || "Rectangular"} />
          <Spec label="Frame Color" value={product.frameColor || "Black"} />
          <Spec label="Lens Width" value={product.lensWidth || "52mm"} />
          <Spec label="Bridge Width" value={product.bridgeWidth || "18mm"} />
          <Spec label="Temple Length" value={product.templeLength || "140mm"} />
        </div>
      </section>

      {/* DESCRIPTION */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-4">
          Detailed Description
        </h2>

        <div className="bg-gray-50 p-6 rounded-xl leading-relaxed text-gray-700">
          {description || "No additional description available."}
        </div>
      </section>

      {/* REVIEWS */}
      <section>
        <h2 className="text-2xl font-semibold mb-6">
          Customer Reviews
        </h2>

        {reviews.length > 0 ? (
          <div className="space-y-4 mb-8">
            {reviews.map((review) => (
              <div
                key={review._id}
                className="border p-4 rounded-xl shadow-sm bg-white"
              >
                <p className="font-semibold">
                  {review.user?.fullName || "Anonymous"}{" "}
                  <span className="text-yellow-500">
                    ({review.rating}⭐)
                  </span>
                </p>
                <p className="text-gray-600">{review.comment}</p>
                <p className="text-xs text-gray-400 mt-1">
                  {new Date(review.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 mb-6">No reviews yet.</p>
        )}

        <AddProductReview />
      </section>
    </main>
  );
};

const Spec = ({ label, value }) => (
  <div className="flex justify-between border-b pb-2 text-sm">
    <span className="text-gray-500">{label}</span>
    <span className="font-medium text-gray-800">{value}</span>
  </div>
);

export default ProductDetail;
