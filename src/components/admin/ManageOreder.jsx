import React from "react";

const orders = [
  { id: "#001", name: "John Doe", product: "Stylish Eyeglasses", quantity: 2, price: "$200", status: "Completed" },
  { id: "#002", name: "Jane Smith", product: "Sunglasses", quantity: 1, price: "$100", status: "Pending" },
  { id: "#003", name: "Bob Johnson", product: "Contact Lenses", quantity: 3, price: "$150", status: "Cancelled" },
];

const getStatusClass = (status) => {
  switch (status) {
    case "Completed":
      return "bg-green-200 text-green-800";
    case "Pending":
      return "bg-yellow-200 text-yellow-800";
    case "Cancelled":
      return "bg-red-200 text-red-800";
    default:
      return "bg-gray-200 text-gray-800";
  }
};

const ManageOrders = () => {
  return (
    <main className="container mx-auto p-4">
      <section className="mb-8">
        <h2 className="text-xl font-bold mb-4">Manage Orders</h2>
        <div className="bg-white p-4 rounded shadow">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                {[
                  "Order ID",
                  "Customer Name",
                  "Product",
                  "Quantity",
                  "Total Price",
                  "Status",
                  "Actions",
                ].map((heading) => (
                  <th
                    key={heading}
                    className="py-2 px-4 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider"
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td className="py-2 px-4 border-b border-gray-200">{order.id}</td>
                  <td className="py-2 px-4 border-b border-gray-200">{order.name}</td>
                  <td className="py-2 px-4 border-b border-gray-200">{order.product}</td>
                  <td className="py-2 px-4 border-b border-gray-200">{order.quantity}</td>
                  <td className="py-2 px-4 border-b border-gray-200">{order.price}</td>
                  <td className="py-2 px-4 border-b border-gray-200">
                    <span className={`text-xs font-semibold mr-2 px-2.5 py-0.5 rounded ${getStatusClass(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200">
                    <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline mr-2">
                      Edit
                    </button>
                    <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
};

export default ManageOrders;