
import SendMail from '../../components/admin/sendMail.jsx'
import Sidebar from '../../components/admin/sidebar.jsx'

function SendMailPage() {
    return (
        <>
        
            <div className="mt-20 flex min-h-screen bg-gray-50">
                <Sidebar/>
                <div className="lg:ml-64 flex-1 p-6">
                <SendMail />
                </div>
            </div>
        </>
        
        

    
    )
}

export default SendMailPage
