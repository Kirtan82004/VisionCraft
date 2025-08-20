
import React from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaInfoCircle, FaGlasses, FaStar, FaUserCheck } from "react-icons/fa";
import HeroImage from "../assets/hero.jpg";

const LandingPage = () => {
  return (
    <main className="bg-gradient-to-b from-blue-50 via-white to-white min-h-screen px-4 py-12 max-w-screen-xl mx-auto">
      {/* Hero Section */}
      <section className="text-center pt-10">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">
          Welcome to Our Optical Shop
        </h2>
        <p className="text-gray-600 text-base sm:text-lg mb-6 max-w-xl mx-auto">
          Discover a wide range of premium eyeglasses and lenses tailored just for you.
        </p>
        <img
          alt="Eyeglasses display in modern optical shop"
          className="w-full max-w-md mx-auto mb-8 rounded-xl shadow-2xl transition duration-500 hover:scale-105"
          src={HeroImage}
        />
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition"
          >
            <FaShoppingCart /> Shop Now
          </Link>
          <Link
            to="/about"
            className="inline-flex items-center gap-2 bg-gray-600 text-white px-6 py-3 rounded-full hover:bg-gray-700 transition"
          >
            <FaInfoCircle /> Learn More
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="mt-16 grid gap-6 sm:grid-cols-2 md:grid-cols-3 text-center">
        <div className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition duration-300">
          <div className="text-blue-600 text-3xl mb-3 mx-auto">
            <FaStar />
          </div>
          <h3 className="text-lg font-bold mb-2">High-Quality Lenses</h3>
          <p className="text-gray-600 text-sm">
            Experience exceptional clarity and durability with our premium lenses.
          </p>
        </div>

        <div className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition duration-300">
          <div className="text-blue-600 text-3xl mb-3 mx-auto">
            <FaGlasses />
          </div>
          <h3 className="text-lg font-bold mb-2">Trendy Eyewear</h3>
          <p className="text-gray-600 text-sm">
            Stay in style with our latest eyewear collections updated every season.
          </p>
        </div>

        <div className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition duration-300">
          <div className="text-blue-600 text-3xl mb-3 mx-auto">
            <FaUserCheck />
          </div>
          <h3 className="text-lg font-bold mb-2">Personalized Service</h3>
          <p className="text-gray-600 text-sm">
            Our experts help you choose the best fit based on your preferences and needs.
          </p>
        </div>
      </section>
    </main>
  );
};

export default LandingPage;
