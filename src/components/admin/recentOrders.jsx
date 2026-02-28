import { getOrders } from "../../services/admin/oredrService";
import { useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchAllOrdersStart,
  fetchAllOrdersSuccess,
  fetchAllOrdersFailure,
} from "../../store/admin/adminOrederSlice";

const RecentOrders = () => {
  const dispatch = useDispatch();

  const { allOrders } = useSelector((state) => state.adminOrder);

  // ✅ Only recent 10 orders from redux state
  const recentOrders = useMemo(() => {
    if (!allOrders || allOrders.length === 0) return [];
    return [...allOrders]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 10);
  }, [allOrders]);

  useEffect(() => {
    // ✅ API call ONLY when redux state is empty
    if (allOrders.length === 0) {
      const fetchOrders = async () => {
        try {
          dispatch(fetchAllOrdersStart());
          const data = await getOrders();
          dispatch(
          fetchAllOrdersSuccess({
            orders: res.orders || [],
            totalOrders: res.totalOrder || 0,
          })
        );
        } catch (error) {
          dispatch(fetchAllOrdersFailure(error.message));
        }
      };

      fetchOrders();
    }
  }, [dispatch]);

  return (
    <div className="bg-white p-4 rounded-lg shadow w-full">
      <h3 className="text-lg font-semibold mb-4">Recent Orders</h3>

      {/* 🔥 Mobile friendly scroll */}
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
            {recentOrders.map((order) => (
              <tr key={order._id} className="border-b">
                <td className="py-2 wrap-break-words">{order.orderId}</td>
                <td className="py-2">{order.customer?.fullName}</td>
                <td className="py-2">₹{order.totalPrice}</td>
                <td className="py-2">
                  <span
                    className={`px-2 py-1 rounded-full text-xs whitespace-nowrap ${
                      order.orderStatus === "Pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {order.orderStatus}
                  </span>
                </td>
              </tr>
            ))}

            {recentOrders.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center py-4 text-gray-400">
                  No recent orders
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentOrders;
