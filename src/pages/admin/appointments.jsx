
import Appointmnets from '../../components/admin/appointments.jsx'
import Sidebar from '../../components/admin/sidebar.jsx'

function AppointmnetsPage() {
    return (
        <>
        
            <div className="mt-20 flex min-h-screen bg-gray-50">
                <Sidebar/>
                <div className="lg:ml-64 flex-1 p-6">
                <Appointmnets />
                </div>
            </div>
        </>
        
        

    
    )
}

export default AppointmnetsPage
