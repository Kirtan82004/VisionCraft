import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCart } from "../../store/cartSlice";
import { addToCart as addToCartService } from "../../services/user/cartService";
import { ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AddToCart = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userStatus = useSelector((state) => state.auth.status);
  const [loading, setLoading] = useState(false);

  const handleOnClick = async () => {
    if (!userStatus) return navigate("/login");

    try {
      setLoading(true);

      const res = await addToCartService({
        productId: product._id,
        quantity: 1,
      });
      const normalizedItems = res.data.products.map((item) => ({
      _id: item.product,
      price: item.price,
      quantity: item.quantity,
    }));

    dispatch(setCart(normalizedItems));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleOnClick}
      disabled={loading}
      className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-600 transition"
    >
      {loading ? (
        <span className="animate-spin border-t-2 border-white rounded-full w-4 h-4 mr-2" />
      ) : (
        <ShoppingCart size={20} className="mr-2" />
      )}
      {loading ? "Adding..." : "Add to Cart"}
    </button>
  );
};

export default AddToCart;
