import React, { useState, useEffect } from "react";
import { getAllProducts } from "../services/productService.js";
import { ProductCard, LandingPage } from "../components/index.js";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await getAllProducts();
        setPosts(res.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="bg-gradient-to-b from-white to-blue-50">
      {/* Hero Section */}
      <LandingPage />

      {/* Products Section */}
      <section className="px-4 py-12 max-w-screen-xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-8 text-center">
          Our Products
        </h1>

        {loading ? (
          <p className="text-center text-gray-500">Loading products...</p>
        ) : posts.length > 0 ? (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            {posts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600">No products available.</p>
        )}
      </section>
    </div>
  );
};

export default Home;
