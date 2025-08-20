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
        const response = await getOrderHistory()
        if (!response || !response.orders) {
          throw new Error("Failed to fetch orders")
        }
        setOrders(response.orders)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchOrders()
  }, [])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <Package size={20} className="text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Order History</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white border border-gray-200 rounded-2xl p-6 animate-pulse">
              <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="space-y-3">
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                <div className="h-4 bg-gray-200 rounded w-1/3"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-16">
          <Package size={64} className="text-gray-300 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Error Loading Orders</h2>
          <p className="text-red-500 mb-8">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors duration-200"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
          <Package size={20} className="text-white" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900">Order History</h2>
        <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
          {orders.length} {orders.length === 1 ? "order" : "orders"}
        </span>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-16 bg-gray-50 rounded-2xl">
          <Package size={64} className="text-gray-300 mx-auto mb-6" />
          <h3 className="text-xl font-bold text-gray-900 mb-4">No Orders Yet</h3>
          <p className="text-gray-500 mb-8">
            You haven't placed any orders yet. Start shopping to see your order history here.
          </p>
          <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200">
            Start Shopping
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Order #{order._id.slice(-8)}</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                    <Calendar size={14} />
                    <span>{new Date(order.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    order.orderStatus === "delivered"
                      ? "bg-green-100 text-green-700"
                      : order.orderStatus === "processing"
                        ? "bg-blue-100 text-blue-700"
                        : order.orderStatus === "shipped"
                          ? "bg-purple-100 text-purple-700"
                          : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {order.orderStatus}
                </span>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <CreditCard size={14} />
                    <span>Payment:</span>
                  </div>
                  <span
                    className={`text-sm font-medium ${
                      order.paymentStatus === "paid" || order.paymentStatus === "Success"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {order.paymentStatus}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Truck size={14} />
                    <span>Method:</span>
                  </div>
                  <span className="text-sm text-gray-900">{order.paymentMethod}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Total Amount:</span>
                  <span className="text-lg font-bold text-gray-900">${order.orderTotal}</span>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-4">
                <h4 className="text-sm font-semibold text-gray-900 mb-3">Items ({order.products?.length || 0}):</h4>
                <div className="space-y-2 mb-4">
                  {order.products?.slice(0, 2).map((item, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span className="text-gray-600 truncate">
                        {item.product?.name} (x{item.quantity})
                      </span>
                      <span className="text-gray-900 font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                  {order.products?.length > 2 && (
                    <p className="text-xs text-gray-500">+{order.products.length - 2} more items</p>
                  )}
                </div>

                <button
                  onClick={() => navigate(`/orderDetails/${order._id}`)}
                  className="w-full bg-gray-50 hover:bg-gray-100 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  <Eye size={16} />
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default OrderHistory
