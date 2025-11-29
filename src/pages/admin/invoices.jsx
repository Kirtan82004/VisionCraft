
import Invoices from '../../components/admin/invoices.jsx'
import Sidebar from '../../components/admin/sidebar.jsx'

function InvoicesPage() {
    return (
        <>
        
            <div className="mt-20 flex min-h-screen bg-gray-50">
                <Sidebar/>
                <div className="lg:ml-64 flex-1 p-6">
                <Invoices />
                </div>
            </div>
        </>
        
        

    
    )
}

export default InvoicesPage
