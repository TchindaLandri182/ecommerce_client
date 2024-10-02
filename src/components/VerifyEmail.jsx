import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { FaLock } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from 'yup';
import signupstep from "../constant/signupstep";

const validationSchema = Yup.object().shape({
  verificationCode: Yup.string()
    .matches(/^[0-9]{4}$/, 'Must be exactly 4 digits')
    .required('Verification code is required'),
});

const VerifyEmail = () => {

    // const apiUrl = 'http://localhost:4000/api/auth';
    const apiUrl = 'https://ecommerce-server-ht4t.onrender.com/api/auth';
    const navigate = useNavigate()
    const {id:token} = useParams()
    const [send, setSend] = useState(false)
    // const token2 = sessionStorage.token
    // const authstep = sessionStorage.signupstep

    useEffect(() => {
        const verifyEmailToken = async () => {
            if(token && !send) {
                setSend(true)
                try{
                    toast.loading("Verifying Email")
                    const response = await axios.post(apiUrl+'/verifyemailtoken', {token})

                    sessionStorage.createdAt = response.data.createdAt
                    sessionStorage.email = response.data.email
                    sessionStorage.profileImage = response.data.profileImage
                    sessionStorage.role = response.data.role
                    sessionStorage.token = response.data.token
                    sessionStorage.userName = response.data.userName
                    sessionStorage.signupstep = response.data.signupstep
                    sessionStorage.updatedAt = response.data.updatedAt
                    sessionStorage.description = response.data.description


                    toast.dismiss()
                    toast.success(response.data.message)

                    if(response.data.signupstep === signupstep.idle) navigate('/')
                    else navigate(`/auth/${response.data.signupstep}`)
                }catch(error){
                    toast.dismiss()
                    if(error?.response?.data?.message) toast.error(error.response.data.message)
                    else toast.error(error?.message)
                }
            } 
        }
        verifyEmailToken()
        
    }, [token, navigate, send])

    const handleSubmit = async (values, {setSubmitting}) => {
        toast.dismiss()
        toast.loading("verifying email")
        try{
            const response = await axios.post(apiUrl+'/verifyemailcode', values, {
                headers: {
                    "authorization": `Bearer ${sessionStorage.token}`
                }
            }); 
            
            sessionStorage.signupstep = response.data.signupstep
            
            toast.dismiss()
            toast.success(response.data.message)
            
            if(response.data.signupstep === signupstep.idle) navigate('/')
            else navigate(`/auth/${response.data.signupstep}`)
        }catch(error){
            toast.dismiss()
            if(error?.response?.data?.message) toast.error(error.response.data.message)
            else toast.error(error?.message)
        }
        setSubmitting(false)
    }

    return (
        <div className="flex flex-col items-center gap-5">
            <div>
                <h2 className="text-3xl font-bold text-center">Verify Email</h2>
                <p className="text-[12px] text-center text-gray-500">Enter the code received by Email <Link className="text-blue-600" to="">email@gmail.com</Link></p>
            </div>
            <Formik
                initialValues={{ verificationCode: '' }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
                >
                {({ isSubmitting }) => (
                    <Form className="w-[250px] flex flex-col gap-5">
                        <div>
                            <ErrorMessage name="verificationCode" component="div" style={{ color: 'red', fontSize: 12 }} />
                            <div className="mt-1 h-[50px] relative rounded-lg overflow-hidden">
                                <div 
                                    style={{color: localStorage.color}} 
                                    className="absolute top-1/2 -translate-y-1/2 px-3 border-r-2 border-gray-400 py-2">
                                    <FaLock />
                                </div>
                                <Field 
                                    type="text" 
                                    name="verificationCode"
                                    maxLength="4" 
                                    placeholder="1234"
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
                            Verify
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default VerifyEmail