import React, { useState } from 'react';
import { HeartIcon as OutlineHeart } from '@heroicons/react/outline';
import { HeartIcon as SolidHeart, StarIcon } from '@heroicons/react/solid';
import AddToCart from './user/AddToCart';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addToSavedItems } from '../store/wishlistSlice';
import { addToWishlist } from '../services/user/wishlistService';

const ProductCard = ({ product }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const userStatus = useSelector((state) => state.auth.status);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log("product",product)

  const handleWishlist = async () => {
    if (!userStatus) {
      alert('Please log in to use the wishlist feature.');
      return;
    }

    try {
      if (!isWishlisted) {
        const response = await addToWishlist(product._id);
        if (!response || !response.data) throw new Error('Invalid response');
        dispatch(addToSavedItems(product._id));
        alert('Added to wishlist');
      }
      setIsWishlisted(!isWishlisted);
    } catch (err) {
      alert('Failed to update wishlist');
      console.error('Wishlist Error:', err.message);
    }
  };

  const handleProductDetail = () => {
    navigate(`/product/${product._id}`);
  };

  return (
    <div className="rounded-2xl overflow-hidden shadow-md hover:shadow-xl bg-white transition-transform transform hover:-translate-y-1 duration-300">
      {/* Image Section */}
      <div className="relative group">
        <img
          onClick={handleProductDetail}
          src={Array.isArray(product.images) ? product.images[0] : product.images}
          alt={product.name}
          className="w-full h-60 sm:h-72 object-cover cursor-pointer transition duration-300 group-hover:scale-105"
        />

        {/* Badge */}
        <span className="absolute top-2 right-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white text-xs font-semibold px-2 py-1 rounded-lg shadow">
          {product.isNew ? 'New Arrival' : 'Special Offer'}
        </span>

        {/* Wishlist Icon */}
        {userStatus && (
          <button
            onClick={handleWishlist}
            className="absolute top-2 left-2 p-2 rounded-full bg-white bg-opacity-80 hover:bg-opacity-100 transition-colors shadow"
          >
            {isWishlisted ? (
              <SolidHeart className="w-5 h-5 text-red-500" />
            ) : (
              <OutlineHeart className="w-5 h-5 text-gray-700" />
            )}
          </button>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4 flex flex-col gap-2">
        <h3 className="text-lg font-bold text-gray-800 line-clamp-1">{product.name}</h3>
        <p className="text-sm text-gray-500 line-clamp-2">{product.description}</p>

        {/* Ratings */}
        <div className="flex items-center gap-1 mt-1">
          {Array.from({ length: 5 }, (_, index) => (
            <StarIcon
              key={index}
              className={`w-4 h-4 ${index < product.ratings ? 'text-yellow-400' : 'text-gray-300'}`}
            />
          ))}
        </div>

        {/* Price + Cart */}
        <div className="flex justify-between items-center mt-3">
          <span className="text-xl font-semibold text-green-600">${product.price}</span>
          <AddToCart product={product} />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
