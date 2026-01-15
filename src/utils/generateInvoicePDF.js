import jsPDF from "jspdf";
import "jspdf-autotable";

const formatDate = (date) =>
  new Date(date).toLocaleDateString("en-GB");

const generateInvoicePDF = (order) => {
  if (!order) return;

  const doc = new jsPDF("p", "mm", "a4");

  const invoiceId = `INV-${order._id.slice(-6).toUpperCase()}`;
  const date = formatDate(order.createdAt);

  const total = order.products.reduce(
    (sum, p) => sum + p.price * p.quantity,
    0
  );

  // ===== Title =====
  doc.setFontSize(20);
  doc.text("INVOICE", 14, 20);

  // ===== Invoice Info =====
  doc.setFontSize(11);
  doc.text(`Invoice ID: ${invoiceId}`, 14, 30);
  doc.text(`Date: ${date}`, 14, 36);
  doc.text(`Payment: ${order.paymentMethod}`, 14, 42);
  doc.text(`Status: ${order.paymentStatus}`, 14, 48);

  // ===== Customer =====
  doc.text("Bill To:", 120, 30);
  doc.text(order.customer?.fullName || "-", 120, 36);
  doc.text(order.customer?.email || "-", 120, 42);
  doc.text(order.customer?.phoneNo || "-", 120, 48);

  // ===== Shipping =====
  doc.text("Shipping Address:", 120, 55);
  doc.text(order.shippingDetails?.address || "-", 120, 61, {
    maxWidth: 70,
  });

  // ===== Table =====
  doc.autoTable({
    startY: 75,
    head: [["Product", "Price", "Qty", "Total"]],
    body: order.products.map((item) => [
      item.product?.name || "Product deleted",
      `Rs ${item.price}`,
      item.quantity,
      `Rs ${item.price * item.quantity}`,
    ]),
    styles: { fontSize: 10 },
    headStyles: { fillColor: [124, 58, 237], textColor: 255 },
    columnStyles: {
      1: { halign: "right" },
      2: { halign: "center" },
      3: { halign: "right" },
    },
  });

  // ===== Grand Total =====
  const finalY = doc.lastAutoTable.finalY + 10;
  doc.setFontSize(13);
  doc.text(`Grand Total: Rs ${total}`, 150, finalY);

  doc.save(`${invoiceId}.pdf`);
};

export default generateInvoicePDF;
