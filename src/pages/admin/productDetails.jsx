
import ProductDetail from '../../components/admin/inventory/productDetail.jsx'
import Sidebar from '../../components/admin/sidebar.jsx'

function ProductDetailPage() {
    return (
        <>
        
            <div className="mt-20 flex min-h-screen bg-gray-50">
                <Sidebar/>
                <div className="lg:ml-64 flex-1 p-6">
                <ProductDetail />
                </div>
            </div>
        </>
        
        

    
    )
}

export default ProductDetailPage
