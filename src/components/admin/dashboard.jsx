import AdminLayout from './adminLayout'
import DashboardStats from './dashboardStats'
import RecentOrders from './recentOrders'
import InventoryOverview from './inventory/inventoryOverview'

const Dashboard = () => {
  return (
    <>
     <DashboardStats />

      <div className="grid grid-cols-1 mb-5 xl:grid-cols-2 gap-6 mt-6">
        <RecentOrders />
        <InventoryOverview />
      </div>
    </>
     
  )
}

export default Dashboard
