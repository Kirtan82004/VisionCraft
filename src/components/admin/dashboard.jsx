import React from 'react'
import Sidebar from '../../components/admin/sidebar.jsx'
import DashboardStats from './dashboardStats.jsx'
import RecentOrders from '../../components/admin/recentOrders.jsx'
import InventoryOverview from './inventory/inventoryOverview.jsx'

const Dashboard = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <div className="lg:ml-64 lg:mt-20 flex-1 p-6">
        <DashboardStats />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <RecentOrders />
          <InventoryOverview />
        </div>
      </div>
    </div>
  )
}
export default Dashboard