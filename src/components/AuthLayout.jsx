import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


const Protected = ({ children, authentication = true }) => {
    const navigate = useNavigate();
    const [loader, setLoader] = useState(true)
    const { status: userStatus } = useSelector((state) => state.auth);
    const { status: adminStatus } = useSelector((state) => state.auth);

    useEffect(() => {
        if (!userStatus && !adminStatus && authentication) {
            navigate('/login')
        } else if (!authentication && userStatus) {
            navigate('/')
        } else if (!authentication && adminStatus) {
            navigate('/dashboard')
        }
        setLoader(false)
    }, [userStatus, adminStatus, navigate, authentication]);

    if (loader) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
            </div>
        );
    }
    return <>{children}</>

}

export default Protected