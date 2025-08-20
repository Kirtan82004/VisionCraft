"use client"

import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getOrderDetails } from "../../services/user/orderService.js"

const OrderDetail = () => {
  const { orderId } = useParams()
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await getOrderDetails(orderId)
        if (!response || !response.data || response.data.length === 0) {
          throw new Error("Order not found")
        }
        setOrder(response.data[0])
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchOrderDetails()
  }, [orderId])

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6">Order Details</h2>

      {loading && <p className="text-gray-700">Loading order details...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && !order && <p className="text-gray-700">Order not found.</p>}

      {!loading && !error && order && (
        <div className="bg-white p-6 rounded shadow">
          <h3 className="text-xl font-bold mb-4">Order ID: {order._id}</h3>

          <p className="text-gray-700 mb-2">
            <strong>Status:</strong> <span className="text-blue-500">{order.orderStatus}</span>
          </p>
          <p className="text-gray-700 mb-2">
            <strong>Payment:</strong>{" "}
            <span className={order.paymentStatus === "Success" ? "text-green-500" : "text-red-500"}>
              {order.paymentStatus}
            </span>
          </p>
          <p className="text-gray-700 mb-2">
            <strong>Payment Method:</strong> {order.paymentMethod}
          </p>
          <p className="text-gray-700 mb-4">
            <strong>Total Amount:</strong> ₹{order.orderTotal}
          </p>

          <h4 className="text-lg font-bold mb-2">Shipping Details:</h4>
          <p className="text-gray-700 mb-4">
            <span className="font-bold">FullName:</span>
            {order.shippingDetails?.fullName},<br />
            <span className="font-bold">Email:</span>
            {order.shippingDetails?.email},<br />
            <span className="font-bold">Address:</span>
            {order.shippingDetails?.address}
          </p>

          <h4 className="text-lg font-bold mb-2">Ordered Items:</h4>
          <ul className="space-y-4">
            {order.products?.map((item, index) => (
              <li key={index} className="border p-4 rounded">
                <div className="flex items-center">
                  <img
                    src={item.product?.images?.[0]}
                    alt={item.product?.name}
                    className="w-20 h-20 object-cover rounded mr-4"
                  />
                  <div>
                    <h5 className="text-md font-bold">{item.product?.name}</h5>
                    <p className="text-gray-600">{item.product?.description}</p>
                    <p className="text-sm text-gray-700">Category: {item.product?.category}</p>
                    <p className="text-sm">
                      Quantity: {item.quantity} × ₹{item.price}
                    </p>
                    <p className="text-sm font-semibold">Total: ₹{item.quantity * item.price}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default OrderDetail
