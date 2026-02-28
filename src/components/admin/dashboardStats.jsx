import {
  FaMoneyBillWave,
  FaShoppingCart,
  FaUserPlus,
  FaCalendarCheck,
} from "react-icons/fa";
import { useEffect, useState } from "react";

import StatCard from "../ui/statCard.jsx";
import { getDashboardStats } from "../../services/admin/dashboardService.js";

/* ================= HELPERS ================= */

const formatGrowth = (value = 0, period = "") => {
  if (value === 0) {
    return {
      text: `0% ${period}`,
      type: "neutral",
    };
  }

  const isUp = value > 0;
  return {
    text: `${isUp ? "↑" : "↓"} ${Math.abs(value)}% ${period}`,
    type: isUp ? "up" : "down",
  };
};

const formatCurrency = (value = 0) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);

/* ================= COMPONENT ================= */

const DashboardStats = () => {
  const [stats, setStats] = useState({
    totals: {
      totalRevenue: 0,
      totalOrders: 0,
      totalUsers: 0,
      totalProducts: 0,
    },
    growth: {
      revenueGrowthPercent: 0,
      ordersGrowthPercent: 0,
      usersGrowthPercent: 0,
      productsGrowthPercent: 0,
    },
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await getDashboardStats();
        console.log("res in stats",res)
        setStats(res);
      } catch (error) {
        console.error("Dashboard Stats Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  /* ================= LOADING STATE ================= */

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="h-28 bg-gray-100 rounded-xl animate-pulse"
          />
        ))}
      </div>
    );
  }

  /* ================= GROWTH FORMAT ================= */

  const revenueGrowth = formatGrowth(
    stats.growth.revenueGrowthPercent,
    "this week"
  );

  const ordersGrowth = formatGrowth(
    stats.growth.ordersGrowthPercent,
    "from yesterday"
  );

  const usersGrowth = formatGrowth(
    stats.growth.usersGrowthPercent,
    "growth"
  );

  const productsGrowth = formatGrowth(
    stats.growth.productsGrowthPercent,
    "change"
  );

  const formatNumber = (value = 0) =>
  new Intl.NumberFormat("en-IN").format(value);


  /* ================= UI ================= */

  return (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

    {/* ================= TOTAL VALUE CARDS ================= */}

    <StatCard
      title="Total Revenue"
      value={formatCurrency(stats.totals.totalRevenue)}
      icon={<FaMoneyBillWave />}
    />

    <StatCard
      title="Total Orders"
      value={formatNumber(stats.totals.totalOrders)}
      icon={<FaShoppingCart />}
    />

    <StatCard
      title="Total Customers"
      value={formatNumber(stats.totals.totalUsers)}
      icon={<FaUserPlus />}
    />

    <StatCard
      title="Total Products"
      value={formatNumber(stats.totals.totalProducts)}
      icon={<FaCalendarCheck />}
    />

    {/* ================= GROWTH CARDS ================= */}

    <StatCard
      title="Revenue Growth"
      value={`${stats.growth.revenueGrowthPercent}%`}
      icon={<FaMoneyBillWave />}
      change={revenueGrowth.text}
      changeType={revenueGrowth.type}
    />

    <StatCard
      title="Orders Growth"
      value={`${stats.growth.ordersGrowthPercent}%`}
      icon={<FaShoppingCart />}
      change={ordersGrowth.text}
      changeType={ordersGrowth.type}
    />

    <StatCard
      title="Customer Growth"
      value={`${stats.growth.usersGrowthPercent}%`}
      icon={<FaUserPlus />}
      change={usersGrowth.text}
      changeType={usersGrowth.type}
    />

    <StatCard
      title="Products Growth"
      value={`${stats.growth.productsGrowthPercent}%`}
      icon={<FaCalendarCheck />}
      change={productsGrowth.text}
      changeType={productsGrowth.type}
    />

  </div>
);


};

export default DashboardStats;
