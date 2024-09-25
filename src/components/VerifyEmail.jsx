import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useEffect } from "react";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  verificationCode: Yup.string()
    .matches(/^[0-9]{4}$/, 'Must be exactly 4 digits')
    .required('Verification code is required'),
});

const VerifyEmail = () => {

    const apiUrl = 'http://localhost:4000/api/auth';
    const navigate = useNavigate()
    const {id} = useParams()

    useEffect(() => {
        console.log(id)
    }, [])

    const handleSubmit = async (values, {setSubmitting}) => {
        toast.dismiss()
        toast.loading("verifying email")
        try{
            const response = await axios.post(apiUrl+'/verifyemailcode', values, {
                headers: {
                    "authorization": `Bearer ${sessionStorage.token}`
                }
            });
            
            sessionStorage.isEmailVerified = true
            
            toast.dismiss()
            toast.success(response.data.message)
            navigate('/')
        }catch(error){
            toast.dismiss()
            toast.error(error.response.data.message)
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