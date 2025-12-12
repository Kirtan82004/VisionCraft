import { getRecentOrders } from "../../services/admin/oredrService";
import { useEffect, useState } from "react";

const RecentOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchRecentOrders = async () => {
      try {
        const data = await getRecentOrders();
        console.log("Fetched Recent Orders:", data);
        setOrders(data || []);
        console.log("RecentOrdersData", data);
      } catch (error) {
        console.error("Recent Orders Error:", error);
      }
    };
    fetchRecentOrders();
  }, []);

  return (
    <div className="bg-white p-4 rounded-lg shadow w-full">
      <h3 className="text-lg font-semibold mb-4">Recent Orders</h3>

      {/* 🔥 Mobile Scroll Wrapper */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm min-w-[600px]">
          <thead>
            <tr className="text-left text-gray-500 border-b">
              <th className="py-2">Order ID</th>
              <th className="py-2">Customer</th>
              <th className="py-2">Total</th>
              <th className="py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id} className="border-b">
                <td className="py-2 wrap-break-word">{order._id}</td>
                <td className="py-2">{order.customer.fullName}</td>
                <td className="py-2">₹{order.totalPrice}</td>
                <td className="py-2">
                  <span
                    className={`px-2 py-1 rounded-full text-xs whitespace-nowrap
                      ${
                        order.orderStatus === "Pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-green-100 text-green-700"
                      }
                    `}
                  >
                    {order.orderStatus}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentOrders;
