
import Settings from '../../components/admin/settings.jsx'
import Sidebar from '../../components/admin/sidebar.jsx'

function SettingsPage() {
    return (
        <>
        
            <div className="mt-20 flex min-h-screen bg-gray-50">
                <Sidebar/>
                <div className="lg:ml-64 flex-1 p-6">
                <Settings />
                </div>
            </div>
        </>
        
        

    
    )
}

export default SettingsPage
