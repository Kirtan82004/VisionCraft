import React from "react";
import '@fortawesome/fontawesome-free/css/all.min.css';

const stats = [
  { title: "Products", count: 120, icon:"fas fa-box", color: "bg-blue-500" },
  { title: "Orders", count: 75, icon: "fas fa-shopping-cart", color: "bg-green-500" },
  { title: "Users", count: 50, icon: "fas fa-users", color: "bg-yellow-500" },
  { title: "Revenue", count: "$10,000", icon: "fas fa-dollar-sign", color: "bg-red-500" },
];

const recentOrders = [
  { id: "#12345", customer: "John Doe", total: "$150.00", status: "Completed", statusColor: "bg-green-500" },
  { id: "#12346", customer: "Jane Smith", total: "$200.00", status: "Pending", statusColor: "bg-yellow-500" },
  { id: "#12347", customer: "Bob Johnson", total: "$300.00", status: "Cancelled", statusColor: "bg-red-500" },
];

const recentUsers = [
  { id: "#001", name: "John Doe", email: "john@example.com", status: "Active", statusColor: "bg-green-500" },
  { id: "#002", name: "Jane Smith", email: "jane@example.com", status: "Pending", statusColor: "bg-yellow-500" },
  { id: "#003", name: "Bob Johnson", email: "bob@example.com", status: "Inactive", statusColor: "bg-red-500" },
];

const AdminDashboard = () => {
  return (
    <main className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6">Admin Dashboard</h2>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded shadow flex items-center">
            <div className={`${stat.color} text-white p-4 rounded-full`}>
              <i className={stat.icon}></i>
            </div>
            <div className="ml-4">
              <h3 className="text-xl font-bold">{stat.count}</h3>
              <p className="text-gray-700">{stat.title}</p>
            </div>
          </div>
        ))}
      </div>
      
      {/* Recent Orders & Users */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="bg-white p-6 rounded shadow">
          <h3 className="text-xl font-bold mb-4">Recent Orders</h3>
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Order ID</th>
                <th className="py-2 px-4 border-b">Customer</th>
                <th className="py-2 px-4 border-b">Total</th>
                <th className="py-2 px-4 border-b">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order, index) => (
                <tr key={index}>
                  <td className="py-2 px-4 border-b">{order.id}</td>
                  <td className="py-2 px-4 border-b">{order.customer}</td>
                  <td className="py-2 px-4 border-b">{order.total}</td>
                  <td className="py-2 px-4 border-b">
                    <span className={`${order.statusColor} text-white px-2 py-1 rounded`}>{order.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Recent Users */}
        <div className="bg-white p-6 rounded shadow">
          <h3 className="text-xl font-bold mb-4">Recent Users</h3>
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">User ID</th>
                <th className="py-2 px-4 border-b">Name</th>
                <th className="py-2 px-4 border-b">Email</th>
                <th className="py-2 px-4 border-b">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentUsers.map((user, index) => (
                <tr key={index}>
                  <td className="py-2 px-4 border-b">{user.id}</td>
                  <td className="py-2 px-4 border-b">{user.name}</td>
                  <td className="py-2 px-4 border-b">{user.email}</td>
                  <td className="py-2 px-4 border-b">
                    <span className={`${user.statusColor} text-white px-2 py-1 rounded`}>{user.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
};

export default AdminDashboard;
