import { useState } from "react";
import { FaEnvelope, FaPaperPlane, FaUsers } from "react-icons/fa";

const SendMail = () => {
  const [mode, setMode] = useState("single"); // single | bulk
  const [formData, setFormData] = useState({
    email: "",
    bulkEmails: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSend = () => {
    if (mode === "single") {
      alert(`Mail Sent to: ${formData.email}`);
      // axios.post("/admin/send-mail", {...})
    } else {
      alert("Bulk Mail Sent!");
      // axios.post("/admin/send-bulk-mail", {...})
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">

      {/* Header */}
      <div className="flex items-center space-x-3 mb-6">
        <FaEnvelope className="text-purple-600 text-3xl" />
        <h2 className="text-2xl font-bold text-gray-800">Send Mail</h2>
      </div>

      <div className="bg-white shadow-md rounded-xl p-6 max-w-3xl">

        {/* Toggle Buttons */}
        <div className="flex space-x-3 mb-6">
          <button
            onClick={() => setMode("single")}
            className={`px-5 py-2 rounded-lg font-medium ${
              mode === "single"
                ? "bg-purple-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Single Mail
          </button>

          <button
            onClick={() => setMode("bulk")}
            className={`px-5 py-2 rounded-lg font-medium ${
              mode === "bulk"
                ? "bg-purple-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Bulk Mail
          </button>
        </div>

        {/* Single Email Field */}
        {mode === "single" && (
          <label className="block mb-3">
            <span className="text-gray-700 font-medium">Recipient Email</span>
            <input
              type="email"
              name="email"
              placeholder="customer@example.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full mt-1 p-3 border rounded-lg focus:ring-purple-400 focus:outline-none"
            />
          </label>
        )}

        {/* Bulk Email Field */}
        {mode === "bulk" && (
          <label className="block mb-3">
            <span className="text-gray-700 font-medium flex items-center gap-2">
              Bulk Emails
              <FaUsers className="text-purple-500" />
            </span>
            <textarea
              name="bulkEmails"
              rows="4"
              placeholder="Enter emails separated by commas...
Example: user1@gmail.com, user2@gmail.com, user3@gmail.com"
              value={formData.bulkEmails}
              onChange={handleChange}
              className="w-full mt-1 p-3 border rounded-lg focus:ring-purple-400 focus:outline-none"
            ></textarea>
          </label>
        )}

        {/* Subject */}
        <label className="block mb-3">
          <span className="text-gray-700 font-medium">Subject</span>
          <input
            type="text"
            name="subject"
            placeholder="Enter subject..."
            value={formData.subject}
            onChange={handleChange}
            className="w-full mt-1 p-3 border rounded-lg focus:ring-purple-400 focus:outline-none"
          />
        </label>

        {/* Message */}
        <label className="block mb-4">
          <span className="text-gray-700 font-medium">Message</span>
          <textarea
            name="message"
            rows="6"
            placeholder="Type your message..."
            value={formData.message}
            onChange={handleChange}
            className="w-full mt-1 p-3 border rounded-lg focus:ring-purple-400 focus:outline-none"
          ></textarea>
        </label>

        {/* Send Button */}
        <button
          onClick={handleSend}
          className="flex items-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium transition"
        >
          <FaPaperPlane />
          <span>{mode === "single" ? "Send Mail" : "Send Bulk Mail"}</span>
        </button>

      </div>
    </div>
  );
};

export default SendMail;
