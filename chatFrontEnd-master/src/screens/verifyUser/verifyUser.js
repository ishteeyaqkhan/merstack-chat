import axios from 'axios';
import React, { useState } from 'react'
import { Spinner } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import './verifyuser.css'

const VerifyUser = () => {
    const [otp, setOtp] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    let user = localStorage.getItem("user")
    user = JSON.parse(user);
    const VerifyOtp = async () => {
        try {
            setLoading(true)
            let res = await axios.post("http://localhost:4000/api/verify-otp", { otp, id: user?.data?._id })
            
            toast.success(res.data.message)
            localStorage.setItem("user", JSON.stringify(res.data))
            navigate("/")
            setLoading(false)
        } catch (error) {
            toast.error(error?.response?.data?.message)
            setLoading(false)
            console.log(error)
        }
    }
    return (

        <div className='main-form'>

        <div className="d-flex justify-content-center inner-form">
            <label>Enter otp to verify</label>
            <input type="text" value={otp} onChange={(e) => setOtp(e.target.value)} />
            <button onClick={VerifyOtp} disabled={loading}>{loading ? <Spinner /> : "Verify"}</button>
        </div>
        </div>
    )
}

export default VerifyUser