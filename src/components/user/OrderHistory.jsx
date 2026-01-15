"use client"

import { useEffect, useState } from "react"
import { Package, Calendar, CreditCard, Truck, Eye } from "lucide-react"
import { getOrderHistory } from "../../services/user/orderService.js"
import { useNavigate } from "react-router-dom"

const OrderHistory = () => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await getOrderHistory()
        setOrders(res?.orders || [])
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchOrders()
  }, [])

  /* ---------------- LOADING ---------------- */
  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="h-10 w-48 bg-gray-200 rounded mb-8 animate-pulse" />
        <div className="grid md:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="bg-white p-6 rounded-2xl shadow animate-pulse space-y-4">
              <div className="h-5 bg-gray-200 w-1/2 rounded" />
              <div className="h-4 bg-gray-200 w-1/3 rounded" />
              <div className="h-20 bg-gray-100 rounded" />
            </div>
          ))}
        </div>
      </div>
    )
  }

  /* ---------------- ERROR ---------------- */
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <Package size={70} className="text-gray-300 mb-4" />
        <h2 className="text-2xl font-bold mb-2">Something went wrong</h2>
        <p className="text-red-500 mb-6">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700"
        >
          Retry
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* ---------- HEADER ---------- */}
      <div className="flex items-center gap-4 mb-10">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow">
          <Package className="text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>
          <p className="text-sm text-gray-500">
            {orders.length} {orders.length === 1 ? "order" : "orders"} placed
          </p>
        </div>
      </div>

      {/* ---------- EMPTY ---------- */}
      {orders.length === 0 ? (
        <div className="bg-gray-50 rounded-3xl p-16 text-center">
          <Package size={70} className="text-gray-300 mx-auto mb-6" />
          <h3 className="text-xl font-bold mb-2">No orders yet</h3>
          <p className="text-gray-500 mb-8">
            Once you place an order, it will appear here.
          </p>
          <button className="px-8 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold hover:opacity-90">
            Start Shopping
          </button>
        </div>
      ) : (
        /* ---------- ORDER LIST ---------- */
        <div className="grid md:grid-cols-2 gap-6">
          {orders.map(order => (
            <div
              key={order._id}
              className="relative bg-white rounded-2xl p-6 shadow hover:shadow-lg transition"
            >
              {/* Status Strip */}
              <span
                className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold
                  ${order.orderStatus === "delivered"
                    ? "bg-green-100 text-green-700"
                    : order.orderStatus === "shipped"
                      ? "bg-purple-100 text-purple-700"
                      : "bg-blue-100 text-blue-700"}
                `}
              >
                {order.orderStatus}
              </span>

              <h3 className="text-lg font-bold mb-1">
                Order #{order._id.slice(-8)}
              </h3>

              <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                <Calendar size={14} />
                {new Date(order.createdAt).toLocaleDateString()}
              </div>

              <div className="space-y-3 text-sm mb-4">
                <div className="flex justify-between">
                  <span className="flex items-center gap-2 text-gray-600">
                    <CreditCard size={14} /> Payment
                  </span>
                  <span className={`font-semibold ${
                    order.paymentStatus === "paid" || order.paymentStatus === "Success"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}>
                    {order.paymentStatus}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="flex items-center gap-2 text-gray-600">
                    <Truck size={14} /> Method
                  </span>
                  <span className="text-gray-900">{order.paymentMethod}</span>
                </div>

                <div className="flex justify-between text-base font-bold">
                  <span>Total</span>
                  <span>₹{order.orderTotal}</span>
                </div>
              </div>

              {/* Items preview */}
              <div className="border-t pt-4 mb-4">
                {order.products?.slice(0, 2).map((item, i) => (
                  <div key={i} className="flex justify-between text-sm mb-1">
                    <span className="truncate">
                      {item.product?.name} × {item.quantity}
                    </span>
                    <span className="font-medium">
                      ₹{(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
                {order.products?.length > 2 && (
                  <p className="text-xs text-gray-400">
                    +{order.products.length - 2} more items
                  </p>
                )}
              </div>

              <button
                onClick={() => navigate(`/orderDetails/${order._id}`)}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 font-medium"
              >
                <Eye size={16} /> View Order Details
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default OrderHistory
