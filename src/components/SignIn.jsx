import React, { useState } from "react";
import { FaEnvelope, FaEye, FaEyeSlash, FaFacebookF, FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast } from "react-toastify";
import axios from "axios";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters long')
    .required('Password is required'),
});

const SignIn = () => {

    const apiUrl = 'http://localhost:4000/api/auth';
    const navigate = useNavigate()
    const [viewPassword, setViewPassword] = useState(false)

    const handleSubmit = async (values, {setSubmitting}) => {
        toast.dismiss()
        toast.loading("submitting form")
        try{
            const response = await axios.post(apiUrl+'/signin', values);
            
            sessionStorage.createdAt = response.data.createdAt
            sessionStorage.email = response.data.email
            sessionStorage.profileImage = response.data.profileImage
            sessionStorage.role = response.data.role
            sessionStorage.token = response.data.token
            sessionStorage.userName = response.data.userName
            sessionStorage.isEmailVerified = false
            
            toast.dismiss()
            toast.success(response.data.message)
            navigate('/auth/verify')
        }catch(error){
            toast.dismiss()
            toast.error(error.response.data.message)
        }
        setSubmitting(false)
    }


    return (
        <div className="flex flex-col items-center gap-5">
            <div>
                <h2 className="text-3xl font-bold text-center">Welcome Back</h2>
                <p className="text-[12px] text-center text-gray-500">Welcome back, please enter your details</p>
            </div>
            <div className="dark:bg-gray-700 bg-gray-300 w-[250px] p-1 rounded-full flex items-center">
                <Link to="/auth/signin" style={{background: localStorage.color}} className="w-1/2 flex items-center justify-center rounded-full text-white py-2 px-4">
                    Sign In
                </Link>
                <Link to="/auth/signup" className="w-1/2 flex items-center justify-center rounded-full py-2 px-4">
                    Sign Up
                </Link>
            </div>
             <Formik
                initialValues={{ email: '', password: '' }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
                >
                {({ isSubmitting }) => (
                    <Form className="w-[250px] flex flex-col gap-5">
                        <div>
                            <ErrorMessage name="email" component="div" style={{ color: 'red', fontSize: 12 }} />
                            <div className="mt-1 h-[50px] relative rounded-lg overflow-hidden">
                                <div 
                                    style={{color: localStorage.color}} 
                                    className="absolute top-1/2 -translate-y-1/2 px-3 border-r-2 border-gray-400 py-2">
                                    <FaEnvelope />
                                </div>
                                <Field 
                                    type="email" 
                                    name="email" 
                                    placeholder="Email"
                                    className="h-full w-full pl-[55px] pr-[10px] text-black" 
                                />
                            </div>
                        </div>
                        
                        <div>
                            <ErrorMessage name="password" component="div" style={{ color: 'red', fontSize: 12 }} />
                            <div className="mt-1 h-[50px] relative rounded-lg overflow-hidden">
                                <div 
                                    onClick={() => setViewPassword(!viewPassword)}
                                    style={{color: localStorage.color}} 
                                    className="absolute top-1/2 -translate-y-1/2 px-3 border-r-2 border-gray-400 py-2">
                                    {viewPassword ? <FaEyeSlash /> : <FaEye />}
                                </div>
                                <Field 
                                    type={viewPassword ? "text" : "password"} 
                                    name="password" 
                                    placeholder="Password"
                                    className="h-full w-full pl-[55px] pr-[10px] text-black" 
                                />
                            </div>
                        </div>
                        
                        <button
                            style={{background: localStorage.color}}
                            className="h-[50px] rounded-lg overflow-hidden"
                            type="submit" 
                            disabled={isSubmitting}
                        >
                            Submit
                        </button>
                    </Form>
                )}
            </Formik>
            <div className="flex">
                <hr className="flex-1" />
                <p className=" text-center text-gray-500 text-xl">Or Continue With</p>
                <hr className="flex-1" />
            </div>
            <div className="flex gap-7 items-center justify-center">
                <div className="border-2 border-gray-500 h-[50px] w-[50px] rounded-full flex items-center justify-center">
                    <FaGoogle className="text-center" />
                </div>
                <div className=" bg-blue-600 h-[50px] w-[50px] rounded-full flex items-center justify-center">
                    <FaFacebookF className="text-center text-white" />
                </div>
            </div>
        </div>
    )
}

export default SignIn