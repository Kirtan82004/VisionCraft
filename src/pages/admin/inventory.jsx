
import Inventory from '../../components/admin/inventory/inventory.jsx'
import Sidebar from '../../components/admin/sidebar.jsx'

function InventoryPage() {
    return (
        <>
        
            <div className="mt-20 flex min-h-screen bg-gray-50">
                <Sidebar/>
                <div className="lg:ml-64 flex-1 p-6">
                <Inventory />
                </div>
            </div>
        </>
        
        


    )
}

export default InventoryPage
