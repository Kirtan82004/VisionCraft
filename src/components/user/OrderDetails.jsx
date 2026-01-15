"use client"

import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { getOrderDetails } from "../../services/user/orderService.js"

const OrderDetail = () => {
  const { orderId } = useParams()
  const navigate = useNavigate()
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await getOrderDetails(orderId)
        if (!response?.data?.length) throw new Error("Order not found")
        setOrder(response.data[0])
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchOrderDetails()
  }, [orderId])

  if (loading) {
    return <p className="text-center mt-20 text-gray-500 animate-pulse">Loading order details...</p>
  }

  if (error) {
    return <p className="text-center mt-20 text-red-500">{error}</p>
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 mt-16">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold">Order Details</h2>
        <button
          onClick={() => navigate(-1)}
          className="text-sm text-blue-600 hover:underline"
        >
          ← Back
        </button>
      </div>

      {/* Order Summary */}
      <div className="bg-white rounded-lg shadow p-6 mb-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Info label="Order ID" value={order._id} />
        <Info
          label="Order Status"
          value={
            <StatusBadge
              text={order.orderStatus}
              color="blue"
            />
          }
        />
        <Info
          label="Payment Status"
          value={
            <StatusBadge
              text={order.paymentStatus}
              color={order.paymentStatus === "Success" ? "green" : "red"}
            />
          }
        />
        <Info label="Payment Method" value={order.paymentMethod} />
        <Info label="Total Amount" value={`₹${order.orderTotal}`} />
        <Info label="Order Date" value={new Date(order.createdAt).toLocaleDateString()} />
      </div>

      {/* Shipping Info */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h3 className="text-lg font-semibold mb-3">Shipping Details</h3>
        <p className="text-sm text-gray-700 leading-relaxed">
          <span className="font-semibold">{order.shippingDetails?.fullName}</span><br />
          {order.shippingDetails?.email}<br />
          {order.shippingDetails?.address}
        </p>
      </div>

      {/* Products */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Ordered Items</h3>

        <div className="space-y-4">
          {order.products?.map((item, index) => (
            <div
              key={index}
              className="flex gap-4 border rounded-lg p-4 hover:shadow transition"
            >
              <img
                src={item.product?.images?.[0] || "https://placehold.co/100"}
                alt={item.product?.name}
                className="w-20 h-20 object-cover rounded"
              />

              <div className="flex-1">
                <h4 className="font-semibold">{item.product?.name}</h4>
                <p className="text-sm text-gray-600 line-clamp-2">
                  {item.product?.description}
                </p>

                <div className="flex justify-between mt-2 text-sm">
                  <span>
                    Qty: {item.quantity} × ₹{item.price}
                  </span>
                  <span className="font-semibold">
                    ₹{item.quantity * item.price}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* Reusable Components */

const Info = ({ label, value }) => (
  <div>
    <p className="text-xs text-gray-500">{label}</p>
    <p className="text-sm font-medium">{value}</p>
  </div>
)

const StatusBadge = ({ text, color }) => {
  const colors = {
    green: "bg-green-100 text-green-700",
    red: "bg-red-100 text-red-700",
    blue: "bg-blue-100 text-blue-700",
  }

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${colors[color]}`}>
      {text}
    </span>
  )
}

export default OrderDetail
