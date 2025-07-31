import { useSelector } from "react-redux";
import ShoppingCartIcon from "./ShoppingCartIcon";  // Import your shopping cart icon component
import {  useNavigate } from "react-router-dom";
//import { Link } from "react-router-dom";  // For navigating to cart page

const ShoppingCartButton = () => {
  const { cartItems } = useSelector(state => state.cart);  // Get cart items from Redux state
const navigate =useNavigate();
  return (
    <div className="relative">
      
        {/* Shopping Cart Button */}
        <button onClick={()=>navigate("/cart")} className="p-2 hover:bg-gray-100 rounded-full">
          <ShoppingCartIcon className="h-6 w-6 text-gray-700" />
        </button>
      

      {/* Cart Item Count */}
      {cartItems.length > 0 && (
        <span className="absolute top-0 right-0 bg-red-600 text-white text-xs rounded-full px-2 py-1">
          {cartItems.length}
        </span>
      )}
    </div>
  );
};

export default ShoppingCartButton;
