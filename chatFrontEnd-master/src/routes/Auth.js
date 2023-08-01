import React, { useEffect } from 'react'
import { useNavigate, Outlet } from "react-router-dom";
const Auth = () => {
    const user = JSON.parse(localStorage.getItem("user"))
    const navigate = useNavigate()

    useEffect(() => {
        if (!user || !user?.data?.isVerifed) {
            navigate("/login")
        }
    }, [])
    return (
        <Outlet />
    )
}

export default Auth