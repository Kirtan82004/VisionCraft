import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {getOrderDetails} from '../../services/user/orderService.js'

const OrderDetail = () => {
  const { orderId } = useParams(); // URL se orderId extract karna
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await getOrderDetails(orderId);
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "Failed to fetch order details");

        setOrder(data.order);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

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
            <span className={order.paymentStatus === "paid" ? "text-green-500" : "text-red-500"}>
              {order.paymentStatus}
            </span>
          </p>
          <p className="text-gray-700 mb-4">
            <strong>Total Amount:</strong> ${order.orderTotal}
          </p>

          <h4 className="text-lg font-bold mb-2">Shipping Address:</h4>
          <p className="text-gray-700 mb-4">{order.shippingAddress}</p>

          <h4 className="text-lg font-bold mb-2">Ordered Items:</h4>
          {order.products.map((item) => (
            <div key={item.product._id} className="flex justify-between mb-2">
              <span>{item.product.name} (x{item.quantity})</span>
              <span>${item.price * item.quantity}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderDetail;
