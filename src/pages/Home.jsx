import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useSelector, useDispatch } from 'react-redux';

import { getAllProducts } from "../services/productService.js";
import { ProductCard, LandingPage } from "../components/index.js";
import {
  fetchProductsStart,
  fetchProductsSuccess,
  fetchProductsFailure
} from "../store/productSlice.js";


const Home = () => {
    const dispatch = useDispatch();
    const { products, error, loading } = useSelector((state) => state.products);
  
 useEffect(() => {
    const fetchProducts = async () => {
      try {
        if (products.length === 0) {
          dispatch(fetchProductsStart());
        const response = await getAllProducts();
        dispatch(fetchProductsSuccess(response.data));
        }
      } catch (err) {
        dispatch(fetchProductsFailure(err.message));
      }
    };

    fetchProducts();
  }, [dispatch,products]);

  return (
    <div className="bg-linear-to-b from-white via-blue-50 to-blue-100 min-h-screen">
      {/* Hero Section */}
      <LandingPage />

      {/* Key Features */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto grid gap-6 sm:grid-cols-3 px-4">
          {[
            { icon: "🚚", title: "Free Delivery", desc: "On all orders above $50" },
            { icon: "🛡️", title: "Secure Payment", desc: "100% safe & encrypted" },
            { icon: "📞", title: "24/7 Support", desc: "We are here for you anytime" },
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="bg-blue-50 p-6 rounded-xl text-center shadow-md hover:shadow-lg transition"
            >
              <div className="text-4xl">{feature.icon}</div>
              <h3 className="font-bold text-lg mt-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="px-4 py-12 max-w-7xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl sm:text-4xl font-extrabold mb-8 text-center bg-linear-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent"
        >
          Our Products
        </motion.h1>

        {loading ? (
          <p className="text-center text-gray-500">Loading products...</p>
        ) : products.length > 0 ? (
          <motion.div
            initial="hidden"
            animate="show"
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: { staggerChildren: 0.15 },
              },
            }}
            className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
          >
            {products.map((product) => (
              <motion.div
                key={product._id}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  show: { opacity: 1, y: 0 },
                }}
                whileHover={{ scale: 1.05 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <p className="text-center text-gray-600">No products available.</p>
        )}
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">What Our Customers Say</h2>
          <div className="grid gap-6 sm:grid-cols-3">
            {[
              { name: "Rahul Sharma", text: "Amazing quality products! Highly recommend." },
              { name: "Priya Mehta", text: "Super fast delivery and friendly service." },
              { name: "Amit Verma", text: "I love their fresh and organic range." },
            ].map((review, i) => (
              <div
                key={i}
                className="bg-blue-50 p-6 rounded-lg shadow hover:shadow-md transition"
              >
                <p className="text-gray-600 italic">"{review.text}"</p>
                <h4 className="mt-4 font-semibold">{review.name}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 bg-linear-to-r from-blue-600 to-indigo-600 text-white">
        <div className="max-w-3xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="mb-6 text-lg">Subscribe to get special offers, free giveaways, and updates.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-3 rounded-lg w-full sm:w-2/3 text-gray-800"
            />
            <button className="bg-yellow-400 px-6 py-3 rounded-lg font-semibold hover:bg-yellow-500 transition">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;











