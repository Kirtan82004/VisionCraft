
import Orders from '../../components/admin/orders.jsx'
import Sidebar from '../../components/admin/sidebar.jsx'

function OrdersPage() {
    return (
        <>
        
            <div className="mt-20 flex min-h-screen bg-gray-50">
                <Sidebar/>
                <div className="lg:ml-64 flex-1 p-6">
                <Orders />
                </div>
            </div>
        </>
        
        

    
    )
}

export default OrdersPage
