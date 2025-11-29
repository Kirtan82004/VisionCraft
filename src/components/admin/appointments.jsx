import { FaSearch, FaCalendarAlt, FaClock, FaCheck, FaTimes } from "react-icons/fa";

const Appointments = () => {
  const appointments = [
    {
      id: "APT-001",
      name: "Rahul Sharma",
      date: "2025-02-14",
      time: "11:00 AM",
      doctor: "Dr. Mehta",
      status: "Upcoming",
    },
    {
      id: "APT-002",
      name: "Priya Singh",
      date: "2025-02-14",
      time: "02:30 PM",
      doctor: "Dr. Khanna",
      status: "Completed",
    },
    {
      id: "APT-003",
      name: "Amit Verma",
      date: "2025-02-15",
      time: "10:00 AM",
      doctor: "Dr. Mehta",
      status: "Cancelled",
    },
  ];

  const statusColor = {
    Upcoming: "text-blue-700 bg-blue-100",
    Completed: "text-green-700 bg-green-100",
    Cancelled: "text-red-700 bg-red-100",
  };

  return (
    <div className="p-6">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Appointments</h1>
      </div>

      {/* Search + Filter */}
      <div className="bg-white p-4 rounded-lg shadow mb-6 flex flex-col sm:flex-row gap-4 justify-between">

        {/* Search */}
        <div className="flex items-center bg-gray-100 px-3 py-2 rounded-md w-full sm:w-1/2">
          <FaSearch className="text-gray-500" />
          <input
            type="text"
            placeholder="Search appointments..."
            className="bg-transparent outline-none px-2 w-full"
          />
        </div>

        {/* Status Filter */}
        <select className="px-3 py-2 border rounded-md text-gray-700 w-full sm:w-1/4">
          <option value="">All Status</option>
          <option value="Upcoming">Upcoming</option>
          <option value="Completed">Completed</option>
          <option value="Cancelled">Cancelled</option>
        </select>

      </div>

      {/* Appointments Table */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-purple-600 text-white">
            <tr>
              <th className="py-3 px-4">ID</th>
              <th className="py-3 px-4">Customer</th>
              <th className="py-3 px-4">Date</th>
              <th className="py-3 px-4">Time</th>
              <th className="py-3 px-4">Doctor</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {appointments.map((apt) => (
              <tr key={apt.id} className="border-b hover:bg-gray-100">
                <td className="py-3 px-4">{apt.id}</td>
                <td className="py-3 px-4">{apt.name}</td>
                <td className="py-3 px-4">{apt.date}</td>
                <td className="py-3 px-4">{apt.time}</td>
                <td className="py-3 px-4">{apt.doctor}</td>

                <td className="py-3 px-4">
                  <span className={`px-3 py-1 rounded-full text-sm ${statusColor[apt.status]}`}>
                    {apt.status}
                  </span>
                </td>

                <td className="py-3 px-4 flex justify-center gap-3 text-lg">

                  {/* Mark Completed */}
                  <button className="text-green-600 hover:text-green-800">
                    <FaCheck />
                  </button>

                  {/* Cancel Appointment */}
                  <button className="text-red-600 hover:text-red-800">
                    <FaTimes />
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

export default Appointments;
