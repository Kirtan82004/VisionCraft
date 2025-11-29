
import AddProduct from '../../components/admin/inventory/addProduct.jsx'
import Sidebar from '../../components/admin/sidebar.jsx'

function AddProductPage() {
    return (
        <>
        
            <div className="mt-20 flex min-h-screen bg-gray-50">
                <Sidebar/>
                <div className="lg:ml-64 flex-1 p-6">
                <AddProduct />
                </div>
            </div>
        </>
        
        


    )
}

export default AddProductPage
