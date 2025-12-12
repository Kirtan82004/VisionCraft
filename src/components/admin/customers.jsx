import { FaSearch, FaEye, FaUserEdit, FaTrash } from "react-icons/fa";

const Customers = () => {
  const customers = [
    {
      id: "CUST-001",
      name: "Rahul Sharma",
      phone: "9876543210",
      email: "rahul@example.com",
      lastVisit: "2025-02-10",
      orders: 5,
    },
    {
      id: "CUST-002",
      name: "Priya Singh",
      phone: "9871203244",
      email: "priya@example.com",
      lastVisit: "2025-02-08",
      orders: 2,
    },
    {
      id: "CUST-003",
      name: "Amit Verma",
      phone: "7012348765",
      email: "amit@example.com",
      lastVisit: "2025-02-12",
      orders: 7,
    },
  ];

  return (
    <div className="p-6">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Customers</h1>
      </div>

      {/* Search + Filter */}
      <div className="bg-white p-4 rounded-lg shadow mb-6 flex flex-col sm:flex-row gap-4 justify-between">

        {/* Search */}
        <div className="flex items-center bg-gray-100 px-3 py-2 rounded-md w-full sm:w-1/2">
          <FaSearch className="text-gray-500" />
          <input
            type="text"
            placeholder="Search customers..."
            className="bg-transparent outline-none px-2 w-full"
          />
        </div>

        {/* Filter */}
        <select className="px-3 py-2 border rounded-md text-gray-700 w-full sm:w-1/4">
          <option value="">Sort by</option>
          <option value="recent">Most Recent</option>
          <option value="orders">Highest Orders</option>
          <option value="name">Name A-Z</option>
        </select>

      </div>

      {/* Customers Table */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-purple-600 text-white">
            <tr>
              <th className="py-3 px-4">ID</th>
              <th className="py-3 px-4">Customer</th>
              <th className="py-3 px-4">Phone</th>
              <th className="py-3 px-4">Email</th>
              <th className="py-3 px-4">Last Visit</th>
              <th className="py-3 px-4">Orders</th>
              <th className="py-3 px-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {customers.map((c) => (
              <tr key={c.id} className="border-b hover:bg-gray-100">
                <td className="py-3 px-4">{c.id}</td>
                <td className="py-3 px-4">{c.name}</td>
                <td className="py-3 px-4">{c.phone}</td>
                <td className="py-3 px-4">{c.email}</td>
                <td className="py-3 px-4">{c.lastVisit}</td>
                <td className="py-3 px-4 font-semibold">{c.orders}</td>

                <td className="py-3 px-4 flex justify-center gap-3 text-lg">

                  {/* View Profile */}
                  <button className="text-blue-600 hover:text-blue-800">
                    <FaEye />
                  </button>

                  {/* Edit Customer */}
                  <button className="text-green-600 hover:text-green-800">
                    <FaUserEdit />
                  </button>

                  {/* Delete */}
                  <button className="text-red-600 hover:text-red-800">
                    <FaTrash />
                  </button>

                </td>

              </tr>
            ))}
          </tbody>

        </table>
      </div>

    </div>
  );
};

export default Customers;
