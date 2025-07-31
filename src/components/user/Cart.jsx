import { useSelector, useDispatch } from "react-redux";
import { increaseQuantity, decreaseQuantity, removeFromCart } from "../../store/cartSlice";
import { Plus, Minus, Trash2, ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  console.log("cartItems", cartItems)



  // Calculate total price
  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="max-w-2xl mx-auto mt-50 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">🛒 Your Cart</h2>

      {cartItems.length === 0 ? (
        <div className="flex flex-col items-center text-gray-500">
          <ShoppingCart size={60} className="mb-4 opacity-50" />
          <p className="text-lg">Your cart is empty.</p>
        </div>
      ) : (
        <>
          <ul className="space-y-4">
            {cartItems.map((item) => (
              <li key={item._id} className="flex justify-between items-center bg-gray-100 p-4 rounded-lg shadow">
                <div className="flex items-center">
                  <img src={item.images} alt={item.name} className="w-16 h-16 rounded-lg object-cover mr-4" />
                  <div>
                    <p className="text-lg font-semibold text-gray-800">{item.name}</p>
                    <p className="text-sm text-gray-600">${item.price} x {item.quantity}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <button
                    onClick={()=>dispatch(decreaseQuantity(item._id))}
                    className="p-2 bg-gray-300 rounded-full hover:bg-gray-400 transition"
                  >
                    <Minus size={18} />
                  </button>

                  <span className="text-lg font-bold">{item.quantity}</span>

                  <button
                    onClick={()=>dispatch(increaseQuantity(item._id))}
                    className="p-2 bg-gray-300 rounded-full hover:bg-gray-400 transition"
                  >
                    <Plus size={18} />
                  </button>

                  <button
                    onClick={() => dispatch(removeFromCart(item._id))}
                    className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </li>
            ))}
          </ul>

          {/* Total Price Section */}
          <div className="mt-6 flex justify-between items-center border-t pt-4">
            <span className="text-xl font-semibold text-gray-800">Total:</span>
            <span className="text-2xl font-bold text-green-600">${totalPrice.toFixed(2)}</span>
          </div>

          {/* Checkout Button */}
          <button onClick={()=>navigate('/checkout')} className="w-full mt-4 bg-blue-500 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-600 transition">
            Proceed to Checkout
          </button>
        </>
      )}
    </div>
  );
};

export default Cart;
