import { FaBell, FaCheckCircle, FaTimes } from "react-icons/fa";

const Notifications = () => {
  const notifications = [
    {
      id: 1,
      title: "New Order Received",
      message: "Order #ORD-1023 has been placed.",
      time: "10 mins ago",
      type: "order",
      read: false,
    },
    {
      id: 2,
      title: "Appointment Reminder",
      message: "Priya Singh has an appointment at 3:00 PM.",
      time: "1 hour ago",
      type: "appointment",
      read: true,
    },
    {
      id: 3,
      title: "Low Inventory Alert",
      message: "Frame Model 245 is running low.",
      time: "Yesterday",
      type: "inventory",
      read: false,
    },
  ];

  const typeColor = {
    order: "bg-blue-100 text-blue-700",
    appointment: "bg-green-100 text-green-700",
    inventory: "bg-yellow-100 text-yellow-700",
  };

  return (
    <div className="p-6">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Notifications</h1>
        <button className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700">
          Mark all as read
        </button>
      </div>

      {/* Notification List */}
      <div className="space-y-4">

        {notifications.map((noti) => (
          <div
            key={noti.id}
            className={`p-4 rounded-lg shadow bg-white border-l-4 
              ${noti.read ? "border-gray-300" : "border-purple-600"}
              flex justify-between items-start`}
          >

            {/* Left Section (Icon + Content) */}
            <div className="flex items-start gap-3">

              {/* Icon */}
              <div className={`p-2 rounded-full ${typeColor[noti.type]}`}>
                <FaBell />
              </div>

              {/* Content */}
              <div>
                <h3 className="font-semibold text-gray-800">{noti.title}</h3>
                <p className="text-gray-600 text-sm">{noti.message}</p>
                <span className="text-xs text-gray-500">{noti.time}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">

              {/* Mark Read */}
              {!noti.read && (
                <button
                  className="text-green-600 hover:text-green-800"
                  title="Mark as Read"
                >
                  <FaCheckCircle size={18} />
                </button>
              )}

              {/* Delete */}
              <button
                className="text-red-600 hover:text-red-800"
                title="Delete"
              >
                <FaTimes size={18} />
              </button>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
};

export default Notifications;
