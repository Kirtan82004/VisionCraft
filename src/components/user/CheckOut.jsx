import React, { useState } from "react";
import { useSelector,useDispatch} from "react-redux";
import { createRazorpayOrder, placeOrder } from "../../services/user/orderService";
import { removeFromCart } from "../../store/cartSlice";
import {fetchOrdersSuccess} from "../../store/orderSlice"
import { useAlert } from "../../hooks/AlertProvider";



const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY_ID;

const Checkout = () => {
  const {showAlert} = useAlert();
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch()

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zip: "",
  });

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (document.querySelector("script[src='https://checkout.razorpay.com/v1/checkout.js']")) {
        resolve(true);
        return;
      }

      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    const isScriptLoaded = await loadRazorpayScript();
    if (!isScriptLoaded) {
      showAlert("error", "Razorpay SDK failed to load. Are you online?");
      return;
    }

    // 1. Send request to backend to create Razorpay order
    const razorpayOrder = await createRazorpayOrder({
      amount: total * 100, // in paise
    });
    console.log("razorpayOrder",razorpayOrder)

    if (!razorpayOrder || !razorpayOrder.data) {
      showAlert("error", "Server error. Are you online?");
      return;
    }
    

    const options = {
      key: razorpayKey,
      amount: total * 100,
      currency: "INR",
      name: "Optical Shop",
      description: "Order Payment",
      order_id: razorpayOrder.data.id,
      handler: async function (response) {
        // 2. Send final order placement request to backend
        console.log("response",response)
        const orderPayload = {
          shippingDetails: {
            fullName: formData.name,
            email: formData.email,
            address: `${formData.address}, ${formData.city}, ${formData.state}, ${formData.zip}`,
          },
          paymentMethod: "Razorpay",
          razorpayPayment: {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          },
        };

        const orderResponse = await placeOrder(orderPayload);
        console.log("orderResponse",orderResponse)
        if (orderResponse && orderResponse.order) {
          console.log("orderResponse",orderResponse)
          cartItems.map((item)=>{
            dispatch(removeFromCart(item._id))
          })
          dispatch(fetchOrdersSuccess({order :orderResponse.order}))
          showAlert("success", "Order placed successfully!");

          // Optionally: navigate to success page
        } else {
          showAlert("error", "Order placement failed. Please try again.");
        }
      },
      prefill: {
        name: formData.name,
        email: formData.email,
      },
      theme: {
        color: "#4f46e5",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-indigo-700">Checkout</h2>

      <div className="flex flex-col gap-6 md:flex-row">
        {/* Billing Details */}
        <div className="flex-1 bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-lg font-semibold mb-4 text-indigo-600">Billing Information</h3>
          <form className="space-y-4">
            {["name", "email", "address", "city", "state", "zip"].map((field) => (
              <div key={field}>
                <label htmlFor={field} className="block text-sm font-medium text-gray-700 mb-1">
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </label>
                <input
                  type={field === "email" ? "email" : "text"}
                  id={field}
                  name={field}
                  required
                  value={formData[field]}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
              </div>
            ))}
          </form>
        </div>

        {/* Order Summary */}
        <div className="flex-1 bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-lg font-semibold mb-4 text-indigo-600">Order Summary</h3>
          <div className="space-y-3">
            {cartItems.map((item) => (
              <div key={item._id} className="flex justify-between text-sm">
                <span>{item.name} x {item.quantity}</span>
                <span>₹{(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <div className="border-t pt-3 text-sm">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax (10%)</span>
                <span>₹{tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-base border-t pt-3">
                <span>Total</span>
                <span>₹{total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <button
            onClick={handlePayment}
            className="mt-6 w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-medium shadow-md transition duration-200"
          >
            Pay with Razorpay
          </button>
        </div>
      </div>
    </main>
  );
};

export default Checkout;
