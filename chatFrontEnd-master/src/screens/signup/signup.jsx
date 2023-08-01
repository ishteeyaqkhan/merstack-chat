import axios from 'axios';
import { useFormik } from 'formik';
import React from 'react'
import { Button, Form } from 'react-bootstrap';
import { object, string, number, date, InferType } from 'yup';
import Spinner from 'react-bootstrap/Spinner';


import "./signup.css";
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

let userSchema = object({
    first_name: string().min(3).max(20).required(),
    last_name: string().min(3).max(20).required(),
    email: string().email().required(),
    gender: string().required(),
    phone: string().matches(phoneRegExp, 'Phone number is not valid').required(),
    password: string()
        .required('No password provided.')
        .min(6, 'Password is too short - should be 6 chars minimum.')
        .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.')
});
const Signup = () => {

    const iValue = {
        first_name: "",
        last_name: "",
        email: "",
        gender: "",
        phone: "",
        password: ""
    }
    const Navigate = useNavigate()
    const { handleSubmit, errors, touched, setFieldTouched, values, isSubmitting, setValues, setFieldValue } = useFormik({
        onSubmit: async (value, action) => {
            try {
                action.setSubmitting(true)
                let res = await axios.post("http://localhost:4000/api/register", value)
                debugger
                localStorage.setItem("user", JSON.stringify(res?.data))
                Navigate("/email/verify")
                toast.success(res?.data?.message)
                action.setSubmitting(false)
            } catch (error) {
                toast.error(error?.response?.data?.message)
                action.setSubmitting(false)

                console.log(error)
            }
        },
        initialValues: iValue,
        validationSchema: userSchema

    })
    const handleChange = async (e) => {
        let name = e.target.name;
        let value = e.target.value;
        await setFieldValue(name, value)
        setFieldTouched(name, true)
    }
    // console.log("sdf", values)
    // console.log("sdf", errors)
    return (
        
        <div className='main-form'>  
        <div className="d-flex justify-content-center mt-5 form-main">
            <Form onSubmit={handleSubmit} className='inner-form'>
                <h2>Signup</h2> 
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control onChange={handleChange} name="first_name" type="text" placeholder="Enter first name " />
                    <p className='text-danger'>{touched.first_name && errors.first_name}</p>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control type="text" onChange={handleChange} name="last_name" placeholder="Enter last name " />
                    <p className='text-danger'>{touched.last_name && errors.last_name}</p>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" onChange={handleChange} name="email" placeholder="Enter email" />
                    <p className='text-danger'>{touched.email && errors.email}</p>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Phone no.</Form.Label>
                    <Form.Control type="text" onChange={handleChange} name="phone" placeholder="Enter phone no." />
                    <p className='text-danger'>{touched.phone && errors.phone}</p>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Gender</Form.Label>
                    <Form.Select onChange={handleChange} name="gender" aria-label="Default select example">
                        <option>Select gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                        {/* 2nmtdkbsy3nr0UXVfALMXDD_GP-wIlxM1uPZXl-t */}
                    </Form.Select>
                    <p className='text-danger'>{touched.gender && errors.gender}</p>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control onChange={handleChange} type="password" name="password" placeholder="Password" />
                    <p className='text-danger'>{touched.password && errors.password}</p>
                </Form.Group>
                <Button variant="primary" disabled={isSubmitting} type="submit">
                    {isSubmitting ? <Spinner /> : " Submit"}
                </Button>
                <Link to="/login">Login</Link>
            </Form>
        </div >
        </div>
        )
}

export default Signup;