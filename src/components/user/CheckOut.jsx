import { useState, useMemo, useCallback } from "react"
import { useSelector, useDispatch } from "react-redux"
import { createRazorpayOrder, placeOrder } from "../../services/user/orderService"
import { removeFromCart } from "../../store/cartSlice"
import { fetchOrdersSuccess } from "../../store/orderSlice"
import { useAlert } from "../../hooks/AlertProvider"

const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY_ID

const Checkout = () => {
  const { showAlert } = useAlert()
  const { cartItems } = useSelector((state) => state.cart)
  const dispatch = useDispatch()

  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zip: "",
  })

  /* -------------------- Price Calculations -------------------- */
  const subtotal = useMemo(
    () => cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0),
    [cartItems]
  )

  const tax = useMemo(() => subtotal * 0.1, [subtotal])
  const total = useMemo(() => subtotal + tax, [subtotal, tax])

  /* -------------------- Helpers -------------------- */
  const loadRazorpayScript = () =>
    new Promise((resolve) => {
      if (window.Razorpay) return resolve(true)

      const script = document.createElement("script")
      script.src = "https://checkout.razorpay.com/v1/checkout.js"
      script.onload = () => resolve(true)
      script.onerror = () => resolve(false)
      document.body.appendChild(script)
    })

  const isFormValid = () =>
    Object.values(formData).every((val) => val.trim() !== "")


  /* -------------------- Handlers -------------------- */
  const handlePayment = useCallback(async () => {
    if (!cartItems.length) {
      showAlert("error", "Your cart is empty")
      return
    }

    if (!isFormValid()) {
      showAlert("error", "Please fill all billing details")
      return
    }

    setLoading(true)

    try {
      const sdkLoaded = await loadRazorpayScript()
      if (!sdkLoaded) throw new Error("Payment SDK failed to load")

      const razorpayOrder = await createRazorpayOrder({
        amount: Math.round(total * 100),
      })

      if (!razorpayOrder?.data?.id)
        throw new Error("Unable to create payment order")

      const options = {
        key: razorpayKey,
        amount: Math.round(total * 100),
        currency: "INR",
        name: "Optical Shop",
        description: "Secure Checkout",
        order_id: razorpayOrder.data.id,

        handler: async (response) => {
          try {
            const payload = {
              shippingDetails: {
                fullName: formData.name,
                email: formData.email,
                address: `${formData.address}, ${formData.city}, ${formData.state}, ${formData.zip}`,
              },
              paymentMethod: "Razorpay",
              razorpayPayment: response,
            }

            const orderResponse = await placeOrder(payload)

            if (!orderResponse?.order)
              throw new Error("Order placement failed")

            cartItems.forEach((item) =>
              dispatch(removeFromCart(item._id))
            )

            dispatch(fetchOrdersSuccess({ order: orderResponse.order }))
            showAlert("success", "Order placed successfully 🎉")
          } catch (err) {
            showAlert("error", err.message || "Order failed")
          }
        },

        prefill: {
          name: formData.name,
          email: formData.email,
        },

        theme: { color: "#4f46e5" },
      }

      new window.Razorpay(options).open()
    } catch (err) {
      showAlert("error", err.message)
    } finally {
      setLoading(false)
    }
  }, [cartItems, total, formData, dispatch, showAlert])

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))

  /* -------------------- UI -------------------- */
  return (
    <div className="min-h-screen bg-gray-100 py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10 text-indigo-600">
          Secure Checkout
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Billing */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow p-6">
            <h3 className="text-xl font-semibold mb-6">Billing Information</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {["name", "email", "city", "state", "zip"].map((field) => (
                <div key={field}>
                  <label className="text-sm text-gray-600 capitalize">
                    {field} <span className="text-red-500">*</span>
                  </label>
                  <input
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400"
                    required
                  />
                </div>
              ))}

              <div className="md:col-span-2">
                <label className="text-sm text-gray-600">Address</label>
                <textarea
                  name="address"
                  rows="3"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400"
                  required
                />
              </div>
            </div>
          </div>

          {/* Summary */}
          <div className="bg-white rounded-2xl shadow p-6 sticky top-28 h-fit">
            <h3 className="text-xl font-semibold mb-4">Order Summary</h3>

            <div className="space-y-3 text-sm">
              {cartItems.map((item) => (
                <div key={item._id} className="flex justify-between">
                  <span>{item.name} × {item.quantity}</span>
                  <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="border-t mt-4 pt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax (10%)</span>
                <span>₹{tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span className="text-green-600">₹{total.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={handlePayment}
              disabled={loading}
              className="mt-6 w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-70 text-white py-3 rounded-lg text-lg font-semibold transition"
            >
              {loading ? "Processing..." : "Pay Securely with Razorpay"}
            </button>

            <p className="text-xs text-center text-gray-500 mt-3">
              🔒 100% Secure Payments
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout
