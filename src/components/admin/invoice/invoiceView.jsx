import { useEffect, useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaDownload } from "react-icons/fa";
import { getOrderById } from "../../../services/admin/oredrService.js";
import generateInvoicePDF from "../../../utils/generateInvoicePDF.js";

const formatDate = (date) =>
  new Date(date).toLocaleDateString("en-GB");

const statusColor = {
  Paid: "text-green-600",
  Pending: "text-yellow-600",
  Cancelled: "text-red-600",
};

const InvoiceView = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        const res = await getOrderById(id);
        setOrder(res?.data);
      } catch (err) {
        console.error("Invoice fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchInvoice();
  }, [id]);

  const invoice = useMemo(() => {
    if (!order) return null;

    const total = order.products.reduce(
      (sum, p) => sum + p.price * p.quantity,
      0
    );

    return {
      invoiceId: `INV-${order._id.slice(-6).toUpperCase()}`,
      date: formatDate(order.createdAt),
      customer: order.customer,
      shipping: order.shippingDetails,
      paymentMethod: order.paymentMethod,
      paymentStatus:
        order.paymentStatus === "Success" ? "Paid" : order.paymentStatus,
      items: order.products,
      total,
    };
  }, [order]);

  // ✅ Download PDF (REUSABLE)
  const handleDownloadPDF = () => {
    generateInvoicePDF(order);
  };

  if (loading) return <div className="p-6">Loading invoice...</div>;
  if (!invoice) return <div className="p-6 text-red-600">Invoice not found</div>;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-purple-600 text-sm"
        >
          <FaArrowLeft /> Back
        </button>

        <button
          onClick={handleDownloadPDF}
          className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded"
        >
          <FaDownload /> Download PDF
        </button>
      </div>

      {/* Invoice Card */}
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold">Invoice</h2>
            <p className="text-gray-500">{invoice.invoiceId}</p>
            <p className="text-sm">Date: {invoice.date}</p>
          </div>
          <div className="text-right">
            <p className="font-semibold">
              Status:{" "}
              <span className={statusColor[invoice.paymentStatus]}>
                {invoice.paymentStatus}
              </span>
            </p>
            <p className="text-sm">Method: {invoice.paymentMethod}</p>
          </div>
        </div>

        {/* Customer & Shipping */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <h4 className="font-semibold mb-1">Bill To</h4>
            <p>{invoice.customer?.fullName}</p>
            <p>{invoice.customer?.email}</p>
            <p>{invoice.customer?.phoneNo}</p>
          </div>
          <div>
            <h4 className="font-semibold mb-1">Shipping Address</h4>
            <p>{invoice.shipping?.address}</p>
          </div>
        </div>

        {/* Items */}
        <table className="w-full text-sm border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 text-left">Product</th>
              <th className="p-2 text-right">Price</th>
              <th className="p-2 text-center">Qty</th>
              <th className="p-2 text-right">Total</th>
            </tr>
          </thead>
          <tbody>
            {invoice.items.map((item) => (
              <tr key={item._id} className="border-t">
                <td className="p-2">
                  {item.product?.name || "Product deleted"}
                </td>
                <td className="p-2 text-right">Rs {item.price}</td>
                <td className="p-2 text-center">{item.quantity}</td>
                <td className="p-2 text-right font-semibold">
                  Rs {item.price * item.quantity}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Total */}
        <div className="flex justify-end mt-6">
          <div className="w-64 text-right">
            <div className="flex justify-between text-lg font-bold">
              <span>Total</span>
              <span>Rs {invoice.total}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceView;
