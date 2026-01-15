import { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { getOrderById } from "../../../services/admin/oredrService.js";

const formatDate = (date) =>
  new Date(date).toLocaleDateString("en-GB");

const getStatusColor = (status) => {
  switch (status) {
    case "Completed":
      return "bg-green-100 text-green-700";
    case "Pending":
      return "bg-yellow-100 text-yellow-700";
    case "Cancelled":
      return "bg-red-100 text-red-700";
    default:
      return "bg-gray-100 text-gray-600";
  }
};

const OrderViewPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await getOrderById(id);
        setOrder(res?.data);
      } catch (err) {
        console.error("Order fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  const formattedOrder = useMemo(() => {
    if (!order) return null;

    return {
      orderId: order._id?.slice(-6).toUpperCase(),
      customerName: order.customer?.fullName,
      customerEmail: order.customer?.email,
      customerPhone: order.customer?.phoneNo,
      shippingAddress:
        order.shippingDetails?.address || order.customer?.address,
      orderStatus: order.orderStatus,
      paymentMethod: order.paymentMethod,
      paymentStatus: order.paymentStatus,
      createdAt: order.createdAt,
      items: order.products || [],
      totalAmount: order.products?.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      ),
    };
  }, [order]);

  if (loading) {
    return <div className="p-6 text-gray-600">Loading order...</div>;
  }

  if (!formattedOrder) {
    return <div className="p-6 text-red-600">Order not found</div>;
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm text-purple-600 hover:underline"
        >
          <FaArrowLeft /> Back
        </button>

        <h2 className="text-2xl font-bold text-gray-800">
          Order #{formattedOrder.orderId}
        </h2>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Customer */}
        <div className="bg-white rounded-lg shadow p-6 space-y-1">
          <h3 className="font-semibold text-gray-700 mb-3">
            Customer Details
          </h3>
          <p><b>Name:</b> {formattedOrder.customerName}</p>
          <p><b>Email:</b> {formattedOrder.customerEmail}</p>
          <p><b>Phone:</b> {formattedOrder.customerPhone}</p>
          <p><b>Address:</b> {formattedOrder.shippingAddress}</p>
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-lg shadow p-6 space-y-2">
          <h3 className="font-semibold text-gray-700 mb-3">
            Order Summary
          </h3>

          <p><b>Date:</b> {formatDate(formattedOrder.createdAt)}</p>
          <p><b>Payment:</b> {formattedOrder.paymentMethod}</p>
          <p>
            <b>Payment Status:</b>{" "}
            <span className="text-sm font-medium text-gray-700">
              {formattedOrder.paymentStatus}
            </span>
          </p>

          <div className="flex items-center gap-2 mt-2">
            <b>Status:</b>
            <span
              className={`px-2 py-1 rounded text-xs font-semibold ${getStatusColor(
                formattedOrder.orderStatus
              )}`}
            >
              {formattedOrder.orderStatus}
            </span>
          </div>

          <p className="text-xl font-bold mt-4 text-gray-800">
            Total: ₹{formattedOrder.totalAmount}
          </p>
        </div>
      </div>

      {/* Items Table */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="font-semibold text-gray-700 mb-4">
          Order Items
        </h3>

        <table className="w-full text-sm border">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="py-2 px-3 text-left">Product</th>
              <th className="py-2 px-3 text-center">Price</th>
              <th className="py-2 px-3 text-center">Qty</th>
              <th className="py-2 px-3 text-center">Subtotal</th>
            </tr>
          </thead>

          <tbody>
            {formattedOrder.items.map((item) => (
              <tr key={item._id} className="border-t">
                <td className="py-2 px-3">
                  {item.product?.name || "Product deleted"}
                </td>
                <td className="py-2 px-3 text-center">
                  ₹{item.price}
                </td>
                <td className="py-2 px-3 text-center">
                  {item.quantity}
                </td>
                <td className="py-2 px-3 text-center font-semibold">
                  ₹{item.price * item.quantity}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderViewPage;
