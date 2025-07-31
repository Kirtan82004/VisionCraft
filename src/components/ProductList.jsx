import React, { useEffect, useState } from 'react';
import { getAllProducts } from "../services/productService.js";
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchProductsStart,
  fetchProductsSuccess,
  fetchProductsFailure
} from "../store/productSlice.js";
import { setAllProducts } from "../store/filterSlice.js";
import { ProductCard } from './index.js';

const categoryMap = {
  "67921375d52eb54338824d55": "Eyeglasses",
  "67921375d52eb54338824d5e": "Sunglasses"
};

const ProductList = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);

  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [brandFilter, setBrandFilter] = useState('all');
  const [priceFilter, setPriceFilter] = useState('all');
  const [filterOpen, setFilterOpen] = useState(false); // Mobile accordion toggle

  useEffect(() => {
    const fetchProducts = async () => {
      dispatch(fetchProductsStart());
      try {
        const response = await getAllProducts();
        dispatch(fetchProductsSuccess(response.data));
        dispatch(setAllProducts(response.data));
      } catch (err) {
        dispatch(fetchProductsFailure(err.message));
      }
    };

    fetchProducts();
  }, [dispatch]);

  const filterProducts = () => {
    let filtered = [...products];

    if (search) {
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (categoryFilter !== 'all') {
      filtered = filtered.filter(p => p.category === categoryFilter);
    }

    if (brandFilter !== 'all') {
      filtered = filtered.filter(p => p.brand === brandFilter);
    }

    if (priceFilter !== 'all' && !['low-high', 'high-low'].includes(priceFilter)) {
      if (priceFilter === 'under-2000') {
        filtered = filtered.filter(p => p.price < 2000);
      } else if (priceFilter === '2000-5000') {
        filtered = filtered.filter(p => p.price >= 2000 && p.price <= 5000);
      } else if (priceFilter === '5000-10000') {
        filtered = filtered.filter(p => p.price > 5000 && p.price <= 10000);
      } else if (priceFilter === 'above-10000') {
        filtered = filtered.filter(p => p.price > 10000);
      }
    }

    if (priceFilter === 'low-high') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (priceFilter === 'high-low') {
      filtered.sort((a, b) => b.price - a.price);
    }

    return filtered;
  };

  const filtered = filterProducts();

  return (
    <div className="container mx-auto px-4 py-8">
      {loading && <p className="text-center text-lg font-medium">Loading products...</p>}
      {error && <p className="text-center text-red-600 font-semibold">{error}</p>}

      {/* Mobile Filter Toggle Button */}
      <button
        className="lg:hidden mb-4 w-full bg-blue-600 text-white py-2 px-4 rounded-md"
        onClick={() => setFilterOpen(!filterOpen)}
      >
        {filterOpen ? 'Hide Filters' : 'Show Filters'}
      </button>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filter Panel */}
        <aside
          className={`w-full lg:w-1/4 transition-all duration-300 ease-in-out ${
            filterOpen ? 'block' : 'hidden lg:block'
          }`}
        >
          <div className="bg-white rounded-xl shadow p-5 sticky top-20">
            <h2 className="text-xl font-semibold mb-4">Filters</h2>

            <div className="mb-4">
              <input
                type="text"
                placeholder="Search product..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="block mb-1 font-medium text-gray-700">Category</label>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="all">All</option>
                {Object.entries(categoryMap).map(([id, name]) => (
                  <option key={id} value={id}>{name}</option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label className="block mb-1 font-medium text-gray-700">Brand</label>
              <select
                value={brandFilter}
                onChange={(e) => setBrandFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="all">All</option>
                <option value="kirtan211">Kirtan211</option>
                <option value="oakley">Oakley</option>
                <option value="gucci">Gucci</option>
              </select>
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-700">Price</label>
              <select
                value={priceFilter}
                onChange={(e) => setPriceFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="all">All</option>
                <option value="under-2000">Under $2000</option>
                <option value="2000-5000">$2000 - $5000</option>
                <option value="5000-10000">$5000 - $10000</option>
                <option value="above-10000">Above $10,000</option>
                <option value="low-high">Sort: Low to High</option>
                <option value="high-low">Sort: High to Low</option>
              </select>
            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <section className="w-full lg:w-3/4">
          {filtered.length === 0 ? (
            <p className="text-center text-gray-600 font-medium">No products match your filters.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {filtered.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default ProductList;
