import { useEffect, useState } from "react";
import {getOrderHistory} from '../../services/user/orderService.js'
                                 
const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await getOrderHistory()
        if (!response.ok) throw new Error(data.message || "Failed to fetch orders");

        setOrders(data.orders);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6">Order History</h2>

      {loading && <p className="text-gray-700">Loading orders...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && orders.length === 0 && <p className="text-gray-700">No orders found.</p>}

      {!loading && !error && orders.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {orders.map((order) => (
            <div key={order._id} className="bg-white p-6 rounded shadow">
              <h3 className="text-xl font-bold mb-2">Order ID: {order._id}</h3>
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

              <h4 className="text-lg font-bold mb-2">Items:</h4>
              {order.products.map((item) => (
                <div key={item.product._id} className="flex justify-between mb-2">
                  <span>{item.product.name} (x{item.quantity})</span>
                  <span>${item.price * item.quantity}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
