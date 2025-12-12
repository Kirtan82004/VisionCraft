
import Customers from '../../components/admin/customers.jsx'
import Sidebar from '../../components/admin/sidebar.jsx'

function CustomersPage() {
    return (
        <>
        
            <div className="mt-20 flex min-h-screen bg-gray-50">
                <Sidebar/>
                <div className="lg:ml-64 flex-1 p-6">
                <Customers />
                </div>
            </div>
        </>
        
        

    
    )
}

export default CustomersPage
