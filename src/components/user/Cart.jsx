import { useSelector, useDispatch } from "react-redux"
import { increaseQuantity, decreaseQuantity, removeFromCart } from "../../store/cartSlice"
import { Plus, Minus, Trash2, ShoppingCart } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { addToCart } from "../../services/user/cartService"

const Cart = () => {
  const { cartItems } = useSelector((state) => state.cart)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  console.log("cartitems",cartItems)

  const handleCart = async () => {
    try {
      navigate("/checkout")
    } catch (err) {
      console.log(err)
    }
  }

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  )

  return (
    <div className="min-h-screen bg-gray-100 pt-24 px-4">
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Cart Items */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow p-6">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <ShoppingCart /> Shopping Cart
          </h2>

          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center py-20 text-gray-500">
              <ShoppingCart size={64} className="mb-4 opacity-40" />
              <p className="text-lg">Your cart is empty</p>
            </div>
          ) : (
            <ul className="space-y-5">
              {cartItems.map((item) => (
                <li
                  key={item._id}
                  className="flex gap-4 p-4 border rounded-lg hover:shadow transition bg-gray-50"
                >
                  {/* Image */}
                  <img
                    src={item.images}
                    alt={item.name}
                    className="w-20 h-20 rounded-lg object-cover"
                  />

                  {/* Info */}
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800">
                      {item.name}
                    </h4>
                    <p className="text-sm text-gray-500 mt-1">
                      ₹{item.price} × {item.quantity}
                    </p>
                    <p className="text-sm font-semibold mt-1 text-green-600">
                      ₹{(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>

                  {/* Quantity + Remove */}
                  <div className="flex flex-col items-end gap-3">
                    <button
                      onClick={() => dispatch(removeFromCart(item._id))}
                      className="text-red-500 hover:text-red-600"
                    >
                      <Trash2 size={18} />
                    </button>

                    <div className="flex items-center gap-2 bg-white border rounded-full px-2 py-1">
                      <button
                        onClick={() => dispatch(decreaseQuantity(item._id))}
                        className="p-1 hover:bg-gray-200 rounded-full"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="font-semibold text-sm w-6 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => dispatch(increaseQuantity(item._id))}
                        className="p-1 hover:bg-gray-200 rounded-full"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-xl shadow p-6 h-fit sticky top-28">
          <h3 className="text-xl font-bold mb-4">Order Summary</h3>

          <div className="flex justify-between text-gray-600 mb-2">
            <span>Items</span>
            <span>{cartItems.length}</span>
          </div>

          <div className="flex justify-between font-semibold text-lg border-t pt-4 mt-4">
            <span>Total</span>
            <span className="text-green-600">
              ₹{totalPrice.toFixed(2)}
            </span>
          </div>

          <button
            onClick={handleCart}
            disabled={cartItems.length === 0}
            className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  )
}

export default Cart
