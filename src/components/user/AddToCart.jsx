import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../store/cartSlice";
import { ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AddToCart = ({ product }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const userStatus = useSelector((state)=>state.auth.status)
  const navigate=useNavigate()

  const handleOnClick = () => {
    if (userStatus ) {
      setLoading(true);
      dispatch(addToCart(product));
      setTimeout(() => {
        setLoading(false);
      }, 500); // Simulate loading effect
    }else {
      navigate('/login')
    }
  };

  return (
    <button
      onClick={handleOnClick}
      className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-600 transition relative"
      disabled={loading}
    >
      {loading ? (
        <span className="animate-spin border-t-2 border-white border-solid rounded-full w-4 h-4 mr-2"></span>
      ) : (
        <ShoppingCart size={20} className="mr-2" />
      )}
      {loading ? "Adding..." : "Add to Cart"}
    </button>
  );
};

export default AddToCart;
