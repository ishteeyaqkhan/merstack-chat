import axios from 'axios';
import { useFormik } from 'formik';
import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { object, string } from 'yup';
import "./login.css";
import { Link, useNavigate } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import { toast } from 'react-toastify';

let userSchema = object({

    email: string().required(),
    password: string()
        .required('No password provided.')
});
const Login = () => {
    const Navigate = useNavigate()
    const ivalue = {
        email: "",
        password: ""
    }
    const { errors, handleChange, handleSubmit, isSubmitting } = useFormik({
        onSubmit: async (value, action) => {
            try {
                action.setSubmitting(true)
                let res = await axios.post("http://localhost:4000/api/login", value)
                localStorage.setItem("user", JSON.stringify(res?.data))
                Navigate("/")
                action.setSubmitting(false)
            } catch (error) {
                action.setSubmitting(false)
                toast.error(error?.response?.data?.message)
                console.log(error)
            }
        },
        validationSchema: userSchema,
        validateOnChange: false,
        initialValues: ivalue
    })
    return (
        <div className='main-form'>
            <div className="d-flex justify-content-center mt-5 form-main">
                <Form onSubmit={handleSubmit} className='inner-form'>
                    <h2>Login</h2>
                    <Form.Group className="mb-3 " controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control onChange={handleChange} name="email" type="email" placeholder="Enter email" />
                        <p className='text-danger'>{errors?.email}</p>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" onChange={handleChange} name="password" placeholder="Password" />
                        <p className='text-danger'>{errors?.password}</p>
                    </Form.Group>
                    <Button variant="primary" disabled={isSubmitting} type="submit">
                        {isSubmitting ? <Spinner /> : "Submit"}
                    </Button>
                    <Link to="/signup">Don't have an accout</Link>
                </Form>
            </div>
        </div>
    )
}

export default Login