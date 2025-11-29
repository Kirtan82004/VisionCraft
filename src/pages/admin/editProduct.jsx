
import EditProduct from '../../components/admin/inventory/updateProduct.jsx'
import Sidebar from '../../components/admin/sidebar.jsx'

function EditProductPage() {
    return (
        <>
        
            <div className="mt-20 flex min-h-screen bg-gray-50">
                <Sidebar/>
                <div className="lg:ml-64 flex-1 p-6">
                <EditProduct />
                </div>
            </div>
        </>
        
        

    
    )
}

export default EditProductPage
