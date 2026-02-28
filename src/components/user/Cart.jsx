import { useSelector, useDispatch } from "react-redux";
import { Plus, Minus, Trash2, ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  getCart,
  addToCart,
  removeFromCart as removeFromCartService,
} from "../../services/user/cartService";
import { setCart } from "../../store/cartSlice";
import { useEffect } from "react";

const Cart = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  /* ---------------- Fetch Cart ---------------- */
  useEffect(() => {
    const fetchCart = async () => {
      const res = await getCart();
      if (!res?.data?.products) return;

      // 🔥 normalize backend cart → frontend cart
      const normalizedItems = res.data.products.map((item) => ({
        _id: item.product._id,
        name: item.product.name,
        price: item.price,
        quantity: item.quantity,
        images: item.product.images?.[0],
      }));

      dispatch(setCart(normalizedItems));
    };

    fetchCart();
  }, [dispatch]);

  /* ---------------- Handlers ---------------- */
  const updateQty = async (productId, qty) => {
    const res = await addToCart({ productId, quantity: qty });

    const normalizedItems = res.data.products.map((item) => ({
      _id: item.product._id,
      name: item.product.name,
      price: item.price,
      quantity: item.quantity,
      images: item.product.images?.[0],
    }));

    dispatch(setCart(normalizedItems));
  };

  const removeItem = async (productId) => {
    const res = await removeFromCartService(productId);

    const normalizedItems = res.data.products.map((item) => ({
      _id: item.product._id,
      name: item.product.name,
      price: item.price,
      quantity: item.quantity,
      images: item.product.images?.[0],
    }));

    dispatch(setCart(normalizedItems));
  };

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  /* ---------------- UI ---------------- */
  return (
    <div className="min-h-screen bg-gray-100 pt-24 px-4">
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Cart Items */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow p-6">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <ShoppingCart /> Shopping Cart
          </h2>

          {cartItems.length === 0 ? (
            <p className="text-center text-gray-500 py-20">
              Your cart is empty
            </p>
          ) : (
            <ul className="space-y-5">
              {cartItems.map((item) => (
                <li key={item._id} className="flex gap-4 p-4 border rounded-lg">
                  <img
                    src={item.images}
                    className="w-20 h-20 object-cover rounded"
                  />

                  <div className="flex-1">
                    <h4 className="font-semibold">{item.name}</h4>
                    <p>₹{item.price} × {item.quantity}</p>
                    <p className="font-bold text-green-600">
                      ₹{(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>

                  <div className="flex flex-col items-end gap-3">
                    <button onClick={() => removeItem(item._id)}>
                      <Trash2 className="text-red-500" />
                    </button>

                    <div className="flex gap-2">
                      <button onClick={() => updateQty(item._id, -1)}>
                        <Minus />
                      </button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQty(item._id, 1)}>
                        <Plus />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Summary */}
        <div className="bg-white rounded-xl shadow p-6 h-fit">
          <h3 className="text-xl font-bold mb-4">Order Summary</h3>
          <p className="font-semibold">Total: ₹{totalPrice.toFixed(2)}</p>

          <button
            onClick={() => navigate("/checkout")}
            disabled={!cartItems.length}
            className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
