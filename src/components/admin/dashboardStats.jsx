import { 
  FaMoneyBillWave, 
  FaShoppingCart, 
  FaUserPlus, 
  FaCalendarCheck, 
  FaClock, 
  FaExclamationTriangle 
} from "react-icons/fa";

import StatCard from "../ui/statCard.jsx";
import { getDashboardStats } from "../../services/admin/dashboardService.js";
import { useEffect, useState } from "react";

const DashboardStats = () => {
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    totalUsers: 0,
    totalProducts: 0,
    lowStockItems: 0,
    pendingOrders: 0
  });
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getDashboardStats();
        setStats(data || {});
        console.log("StatsData", data);
      } catch (error) {
        console.error("Dashboard Stats Error:", error);
      }
    };
    fetchStats();
  }, []);

  console.log("stats.totalRevenue", stats.totalRevenue);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

      <StatCard
        title="Total Revenue"
        value={`₹${stats.totalRevenue}`}
        icon={<FaMoneyBillWave />}
        change="↑ 12% this week"
        changeType="up"
      />

      <StatCard
        title="Orders"
        value={stats.totalOrders}
        icon={<FaShoppingCart />}
        change="↓ 5% from yesterday"
        changeType="down"
      />

      <StatCard
        title="Customers"
        value={stats.totalUsers}
        icon={<FaUserPlus />}
        change="↑ 8% growth"
        changeType="up"
      />

      <StatCard
        title="Total Products"
        value={stats.totalProducts}
        icon={<FaCalendarCheck />}
        change="↑ 15% increase"
        changeType="up"
      />


    </div>
  );
};

export default DashboardStats;
