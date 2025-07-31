import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../../store/cartSlice"; // Redux action
import { useState } from "react";
import {placeOrder} from '../../services/user/orderService.js'
import {Input} from '../index.js'

const PlaceOrder = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.items);
  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  // State for user input (Shipping Address & Payment)
  const [shippingDetails, setShippingDetails] = useState({
  fullName:'',
  email:'',
  address:''

  });
  const [paymentMethod, setPaymentMethod] = useState("COD");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e) => {
    setShippingDetails({ ...shippingDetails, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async () => {
    if (cart.length === 0) {
      setError("Your cart is empty!");
      return;
    }
    if (!shippingDetails.fullName || !shippingDetails.email || !shippingDetails.address ) {
      setError("Please fill all shipping details!");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const orderData = {
        shippingDetails,
        paymentMethod,
      };

     try {
        const res = await placeOrder(orderData)
        if (!res.ok) throw new Error(data.message || "Failed to place order");
     } catch (error) {
        console.log(error.message)
     }
      

      setSuccess(true);
      dispatch(clearCart()); // Clear cart from Redux
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow">
      <h3 className="text-xl font-bold mb-4">Shipping Details</h3>
      <input
        type="text"
        name="fullName"
        placeholder="Enter fullName"
        value={shippingDetails.fullName}
        onChange={handleInputChange}
        className="border p-2 w-full mb-2"
      />
      <input
        type="text"
        name="email"
        placeholder="enter email"
        value={shippingDetails.email}
        onChange={handleInputChange}
        className="border p-2 w-full mb-2"
      />
      <input
        type="text"
        name="address"
        placeholder="enter complete address"
        value={shippingDetails.address}
        onChange={handleInputChange}
        className="border p-2 w-full mb-2"
      />

      <h3 className="text-xl font-bold mb-4">Payment Method</h3>
      <select
        value={paymentMethod}
        onChange={(e) => setPaymentMethod(e.target.value)}
        className="border p-2 w-full mb-4"
      >
        <option value="COD">Cash on Delivery (COD)</option>
        <option value="Credit Card">Credit Card</option>
        <option value="UPI">UPI</option>
      </select>

      <h3 className="text-xl font-bold mb-4">Order Summary</h3>
      {cart.map((item) => (
        <div key={item.id} className="flex justify-between mb-2">
          <span>{item.name} (x{item.quantity})</span>
          <span>${item.price * item.quantity}</span>
        </div>
      ))}

      <div className="flex justify-between font-bold text-lg mt-4">
        <span>Total:</span>
        <span>${totalPrice}</span>
      </div>

      {error && <p className="text-red-500 mt-2">{error}</p>}
      {success && <p className="text-green-500 mt-2">Order placed successfully!</p>}

      <button
        onClick={handlePlaceOrder}
        disabled={loading}
        className={`mt-4 px-4 py-2 w-full rounded ${
          loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
        } text-white`}
      >
        {loading ? "Placing Order..." : "Place Order"}
      </button>
    </div>
  );
};

export default PlaceOrder;
