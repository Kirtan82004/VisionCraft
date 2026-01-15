import { useState } from "react";
import { getSalesReport } from "../../services/admin/dashboardService.js";

const SalesReport = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchSalesReport = async () => {
    if (!startDate || !endDate) {
      setError("Please select start and end date");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const data = await getSalesReport(startDate,endDate)
      console.log("data salesrepot",data)
      setReport(data.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch sales report");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Sales Report</h1>

      {/* Date Filters */}
      <div className="flex flex-wrap gap-4 items-end mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">Start Date</label>
          <input
            type="date"
            className="border rounded px-3 py-2"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">End Date</label>
          <input
            type="date"
            className="border rounded px-3 py-2"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>

        <button
          onClick={fetchSalesReport}
          className="bg-black text-white px-6 py-2 rounded hover:opacity-90"
        >
          Generate Report
        </button>
      </div>

      {/* Error */}
      {error && (
        <p className="text-red-500 mb-4">{error}</p>
      )}

      {/* Loading */}
      {loading && (
        <p className="text-gray-500">Loading report...</p>
      )}

      {/* Report Cards */}
      {report && !loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="bg-white shadow rounded p-6">
            <h3 className="text-sm text-gray-500">Total Sales</h3>
            <p className="text-3xl font-bold mt-2">
              ₹{report.totalSales?.toLocaleString()}
            </p>
          </div>

          <div className="bg-white shadow rounded p-6">
            <h3 className="text-sm text-gray-500">Total Orders</h3>
            <p className="text-3xl font-bold mt-2">
              {report.totalOrders || 0}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SalesReport;
