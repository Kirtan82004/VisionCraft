import React, { useState } from 'react';
import { HeartIcon as OutlineHeart } from '@heroicons/react/outline';
import { HeartIcon as SolidHeart, StarIcon } from '@heroicons/react/solid';
import AddToCart from './user/AddToCart';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addToSavedItems } from '../store/wishlistSlice';
import { addToWishlist } from '../services/user/wishlistService';
import toast from 'react-hot-toast';

const ProductCard = ({ product }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const userStatus = useSelector((state) => state.auth.status);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log('Product in Card:', product);

  const handleWishlist = async () => {
  if (!userStatus) {
    toast.error("Please log in to use the wishlist feature.");
    return;
  }

  try {
    if (!isWishlisted) {
      console.log("Adding product to wishlist:", product);
      const response = await addToWishlist(product._id);
      console.log("Add to Wishlist Response:", response);

      if (!response || !response.data) throw new Error("Invalid response");
      toast("💖 Added to your wishlist!", { icon: "✨" });
    } else {
      // TODO: call removeFromWishlist here
      toast("❌ Removed from wishlist", { icon: "💔" });
    }
    setIsWishlisted(!isWishlisted);
  } catch (err) {
    toast.error("Failed to update wishlist");
    console.error("Wishlist Error:", err.message);
  }
};


  const handleProductDetail = () => {
    navigate(`/product/${product._id}`);
  };

  return (
    <div className="rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl bg-white/70 backdrop-blur-lg transition-transform transform hover:-translate-y-2 duration-300 border border-gray-100">
      {/* Image Section */}
      <div className="relative group">
        <img
          onClick={handleProductDetail}
          src={Array.isArray(product.images) ? product.images[0] : product.images}
          alt={product.name}
          className="w-full h-60 sm:h-72 object-cover cursor-pointer transition-transform duration-500 group-hover:scale-110"
        />

        {/* Badge */}
        <span className="absolute top-3 right-3 bg-linear-to-r from-purple-500 to-blue-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-lg animate-pulse">
          {product.isNew ? '🌟 New Arrival' : '🔥 Special Offer'}
        </span>

        {/* Wishlist Icon */}
        {userStatus && (
          <button
            onClick={handleWishlist}
            className="absolute top-3 left-3 p-2 rounded-full bg-white/80 hover:bg-white shadow-md transition-all"
          >
            {isWishlisted ? (
              <SolidHeart className="w-6 h-6 text-red-500" />
            ) : (
              <OutlineHeart className="w-6 h-6 text-gray-700" />
            )}
          </button>
        )}
      </div>

      {/* Product Info */}
      <div className="p-5 flex flex-col gap-3">
        <h3 className="text-lg font-bold text-gray-800 line-clamp-1">{product.name}</h3>
        <p className="text-sm text-gray-500 line-clamp-2">{product.description}</p>

        {/* Ratings */}
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }, (_, index) => (
            <StarIcon
              key={index}
              className={`w-5 h-5 transition-colors duration-300 ${
                index < product.ratings ? 'text-yellow-400' : 'text-gray-300'
              }`}
            />
          ))}
        </div>

        {/* Price + Cart */}
        <div className="flex justify-between items-center mt-3">
          <span className="text-xl font-semibold text-green-600">₹{product.price}</span>
          <AddToCart product={product} />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
