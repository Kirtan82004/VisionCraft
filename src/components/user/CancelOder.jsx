import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {cancelOrder} from '../../services/user/orderService'

const CancelOrder = () => {
  const { orderId } = useParams(); // URL se orderId le raha hai
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCancelOrder = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await cancelOrder();
      alert(response.data.message);
      navigate("/orders"); // Order list page pe wapas bhejna
    } catch (err) {
      setError(err.response?.data?.message || "Failed to cancel order");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Cancel Order</h2>
      <p>Are you sure you want to cancel this order?</p>

      {error && <p className="text-red-500 mt-2">{error}</p>}

      <div className="mt-4 flex gap-4">
        <button
          onClick={handleCancelOrder}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Cancelling..." : "Yes, Cancel Order"}
        </button>
        <button
          onClick={() => navigate("/orders")}
          className="border border-gray-500 px-4 py-2 rounded hover:bg-gray-100"
        >
          No, Go Back
        </button>
      </div>
    </div>
  );
};

export default CancelOrder;
