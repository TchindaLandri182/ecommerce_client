import React, { useState } from "react";
import { FaEnvelope, FaEye, FaEyeSlash, FaFacebookF, FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { auth, facebookProvider, googleProvider } from "../firebase";
import * as Yup from 'yup';
import { toast } from "react-toastify";
import axios from "axios";
import { signInWithPopup } from "firebase/auth";

const validationSchema = Yup.object().shape({
    email: Yup.string()
        .email('Invalid email format')
        .required('Email is required'),
    password: Yup.string()
        .min(8, 'Password must be at least 8 characters long')
        .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
        .matches(/[0-9]/, 'Password must contain at least one number')
        .matches(/[\W_]/, 'Password must contain at least one special character')
        .required('Password is required'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Confirm Password is required'),
});

const SignUp = () => {

    const apiUrl = 'https://ecommerce-server-ht4t.onrender.com/api/auth';
    const navigate = useNavigate()
    const [viewPassword, setViewPassword] = useState(false)

    const signUpWithGoogle = async () => {
        toast.dismiss()
        toast.loading("signing up with google")
        try {
            
            const result = await signInWithPopup(auth, googleProvider)
            const token = await result.user.getIdToken(); 
            
            
            const response = await axios.post(apiUrl+'/googlesignup', {}, {
                headers: {
                    "authorization": `Bearer ${token}`
                }
            });
            
            sessionStorage.createdAt = response.data.createdAt
            sessionStorage.email = response.data.email
            sessionStorage.profileImage = response.data.profileImage
            sessionStorage.role = response.data.role
            sessionStorage.token = response.data.token
            sessionStorage.userName = response.data.userName
            sessionStorage.signupstep = response.data.signupstep
            
            toast.dismiss()
            toast.success(response.data.message)
            navigate(`/auth/${response.data.signupstep}`)
        } catch (error) {
            toast.dismiss()
            if(error.response.data.message) toast.error(error.response.data.message)
            else toast.error(error.message)
        }
    };

    const signUpWithFacebook = async () => {
        toast.dismiss()
        toast.loading("signing up with facebook")
        try {
            
            const result = await signInWithPopup(auth, facebookProvider)
            const token = await result.user.getIdToken(); 

            const response = await axios.post(apiUrl+'/facebooksignup', {}, {
                headers: {
                    "authorization": `Bearer ${token}`
                }
            });
            
            sessionStorage.createdAt = response.data.createdAt
            sessionStorage.email = response.data.email
            sessionStorage.profileImage = response.data.profileImage
            sessionStorage.role = response.data.role
            sessionStorage.token = response.data.token
            sessionStorage.userName = response.data.userName
            sessionStorage.signupstep = response.data.signupstep
            
            toast.dismiss()
            toast.success(response.data.message)
            navigate(`/auth/${response.data.signupstep}`)
        } catch (error) {
            toast.dismiss()
            if(error.response.data.message) toast.error(error.response.data.message)
            else toast.error(error.message)
        }
    };

    const handleSubmit = async (values, {setSubmitting}) => {
        toast.dismiss()
        toast.loading("submitting form")
        try{
            const response = await axios.post(apiUrl+'/signup', values);
            
            sessionStorage.createdAt = response.data.createdAt
            sessionStorage.email = response.data.email
            sessionStorage.profileImage = response.data.profileImage
            sessionStorage.role = response.data.role
            sessionStorage.token = response.data.token
            sessionStorage.userName = response.data.userName
            sessionStorage.signupstep = response.data.signupstep
            console.log(response.data.signupstep)
            
            toast.dismiss()
            toast.success(response.data.message)
            navigate(`/auth/${response.data.signupstep}`)
        }catch(error){
            toast.dismiss()
            if(error.response.data.message) toast.error(error.response.data.message)
            else toast.error(error.message)
        }
        setSubmitting(false)
    }


    return (
        <div className="flex flex-col items-center gap-5">
            <div>
                <h2 className="text-3xl font-bold text-center">Welcome</h2>
                <p className="text-[12px] text-center text-gray-500">Welcome to Ecommerce, please enter your details</p>
            </div>
            <div className="dark:bg-gray-700 bg-gray-300 w-[250px] p-1 rounded-full flex items-center">
                <Link to="/auth/signin"  className="w-1/2 flex items-center justify-center rounded-full  py-2 px-4">
                    Sign In
                </Link>
                <Link to="/auth/signup" style={{background: localStorage.color}} className="w-1/2 flex items-center justify-center rounded-full py-2 px-4 text-white">
                    Sign Up
                </Link>
            </div>
             <Formik
                initialValues={{ email: '', password: '', confirmPassword: '' }}
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

                        <div>
                            <ErrorMessage name="confirmPassword" component="div" style={{ color: 'red', fontSize: 12 }} />
                            <div className="mt-1 h-[50px] relative rounded-lg overflow-hidden">
                                <div 
                                    style={{color: localStorage.color}} 
                                    className="absolute top-1/2 -translate-y-1/2 px-3 border-r-2 border-gray-400 py-2">
                                    <FaEyeSlash />
                                </div>
                                <Field 
                                    type="password" 
                                    name="confirmPassword" 
                                    placeholder="Confirm Password"
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
                <div className="border-2 border-gray-500 h-[50px] w-[50px] rounded-full flex items-center justify-center" onClick={() => signUpWithGoogle()}>
                    <FaGoogle className="text-center" />
                </div>
                <div className=" bg-blue-600 h-[50px] w-[50px] rounded-full flex items-center justify-center" onClick={() => signUpWithFacebook()}>
                    <FaFacebookF className="text-center text-white" />
                </div>
            </div>
        </div>
    )
}

export default SignUp