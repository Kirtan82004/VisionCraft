import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";

import { getAllProducts } from "../services/productService.js";
import { ProductCard, LandingPage } from "../components";
import {
  fetchProductsStart,
  fetchProductsSuccess,
  fetchProductsFailure,
} from "../store/productSlice.js";

const Home = () => {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.products);

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
  }, [dispatch, products]);

  return (
    <div className="bg-gradient-to-b from-white via-blue-50 to-indigo-100 min-h-screen">

      {/* HERO */}
      <LandingPage />

      {/* FEATURES */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 grid gap-8 sm:grid-cols-3">
          {[
            { icon: "🚚", title: "Free Delivery", desc: "On all orders above ₹999" },
            { icon: "🛡️", title: "Secure Payment", desc: "100% safe & encrypted" },
            { icon: "📞", title: "24/7 Support", desc: "We’re always here" },
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="bg-white/80 backdrop-blur-xl p-8 rounded-3xl shadow-md hover:shadow-xl transition text-center"
            >
              <div className="text-5xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="px-4 py-24 max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl sm:text-5xl font-extrabold text-center mb-14 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"
        >
          Featured Products
        </motion.h2>

        {loading ? (
          <p className="text-center text-gray-500 text-lg">
            Loading products...
          </p>
        ) : products.length > 0 ? (
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: { staggerChildren: 0.1 },
              },
            }}
            className="grid gap-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
          >
            {products.map((product) => (
              <motion.div
                key={product._id}
                variants={{
                  hidden: { opacity: 0, y: 40 },
                  show: { opacity: 1, y: 0 },
                }}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 260 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <p className="text-center text-gray-600">
            No products available.
          </p>
        )}
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-14">
            What Customers Say
          </h2>

          <div className="grid gap-10 sm:grid-cols-3">
            {[
              { name: "Rahul Sharma", text: "Amazing quality & classy designs!" },
              { name: "Priya Mehta", text: "Super fast delivery and support." },
              { name: "Amit Verma", text: "Best eyewear shopping experience." },
            ].map((review, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -8 }}
                className="bg-blue-50 p-8 rounded-3xl shadow-md hover:shadow-xl transition"
              >
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex items-center justify-center text-lg font-bold">
                  {review.name[0]}
                </div>
                <p className="text-gray-600 italic mb-4">
                  “{review.text}”
                </p>
                <h4 className="font-semibold text-gray-800">
                  {review.name}
                </h4>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="py-24 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="max-w-3xl mx-auto text-center px-4">
          <h2 className="text-4xl font-bold mb-4">
            Stay in the Loop 👓
          </h2>
          <p className="mb-10 text-lg text-blue-100">
            Get exclusive offers & latest launches
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-6 py-4 rounded-2xl w-full sm:w-2/3 text-gray-800 focus:outline-none"
            />
            <button className="bg-yellow-400 px-10 py-4 rounded-2xl font-semibold text-gray-900 hover:bg-yellow-500 transition">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
