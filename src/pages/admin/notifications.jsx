
import Notifications from '../../components/admin/notifications.jsx'
import Sidebar from '../../components/admin/sidebar.jsx'

function NotificationsPage() {
    return (
        <>
        
            <div className="mt-20 flex min-h-screen bg-gray-50">
                <Sidebar/>
                <div className="lg:ml-64 flex-1 p-6">
                <Notifications />
                </div>
            </div>
        </>
        
        

    
    )
}

export default NotificationsPage
