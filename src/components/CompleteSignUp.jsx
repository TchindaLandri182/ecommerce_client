import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import personImage from "../images/personImage.png"
import React, { useEffect } from "react";
import { FaImage, FaPen, FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import signupstep from '../constant/signupstep'
import { toast } from "react-toastify";
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
    userName : Yup.string()
        .matches(/[A-Za-z]/, 'Invalid username')
        .required('User name is required'),
    description : Yup.string()
        .required('Description code is required'),
    profileImage : Yup.mixed()
});


const CompleteSignUp = () => {

    const navigate = useNavigate()
    const apiUrl = 'https://ecommerce-server-ht4t.onrender.com/api/auth';

    useEffect(() => {
        if(!sessionStorage?.signupstep || sessionStorage?.signupstep !== signupstep.complete) navigate('/')
    }, [navigate])

    const handleSubmit = async (values, {setSubmitting}) => {
        toast.dismiss()
        toast.loading("submitting form")
        
        const formData = new FormData()
        formData.append("description", values.description)
        formData.append("userName", values.userName)
        formData.append("profileImage", values.profileImage ? values.profileImage : sessionStorage.profileImage ? sessionStorage.profileImage : null)
        
        try{
            const response = await axios.post(apiUrl+'/complete', formData, {
                headers: {
                    'authorization' : `Bearer ${sessionStorage.token}`
                }
            });
            
            sessionStorage.description = response.data.description
            sessionStorage.profileImage = response.data.profileImage
            sessionStorage.userName = response.data.userName
            sessionStorage.signupstep = response.data.signupstep
            sessionStorage.updatedAt = response.data.updatedAt
            
            toast.dismiss()
            toast.success(response.data.message)
            navigate(`/`)
        }catch(error){
            toast.dismiss()
            if(error?.response?.data?.message) toast.error(error.response.data.message)
            else toast.error(error?.message)
        }
        setSubmitting(false)
    }

    const initialValues = {
        userName : sessionStorage.userName,
        description: "",
        profileImage: "",
    } 

    return (
        <div className="flex flex-col items-center gap-5">
            <div>
                <h2 className="text-3xl font-bold text-center">Complete Signup</h2>
                
            </div>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
                >
                {({ isSubmitting, values, setFieldValue }) => (
                    
                    <Form className="w-[250px] flex flex-col gap-5">
    
                        <div className="w-24 h-24 overflow-hidden rounded-full border-2 border-white self-center" >
                            <img 
                                src={values.profileImage ?
                                    URL.createObjectURL(values.profileImage) :
                                    sessionStorage.profileImage ?
                                    sessionStorage.profileImage :
                                    personImage
                                } 
                                alt="profile"
                                className="w-100 h-100"
                                style={{objectFit: 'cover'}}
                            />
                        </div>
                        <div>
                            <ErrorMessage name="userName" component="div" style={{ color: 'red', fontSize: 12 }} />
                            <div className="mt-1 h-[50px] relative rounded-lg overflow-hidden">
                                <div 
                                    style={{color: localStorage.color}} 
                                    className="absolute top-1/2 -translate-y-1/2 px-3 border-r-2 border-gray-400 py-2">
                                    <FaUser />
                                </div>
                                <Field 
                                    
                                    type="text" 
                                    name="userName" 
                                    placeholder="Brayan"
                                    className="h-full w-full pl-[55px] pr-[10px] text-black" 
                                />
                            </div>
                        </div>

                        <div>
                            <ErrorMessage name="profileImage" component="div" style={{ color: 'red', fontSize: 12 }} />
                            <label>Profile Image</label>
                            <div className="mt-1  relative rounded-lg overflow-hidden">
                                <div 
                                    style={{color: localStorage.color}} 
                                    className="absolute top-1/2 -translate-y-1/2 px-3 border-r-2 border-gray-400 py-2 h-[90%] flex items-center justify-center ">
                                    <FaImage />
                                </div>
                                <input 
                                    type="file"
                                    id="profileImage"
                                    name="profileImage"
                                    label="profile Image"
                                    onChange={(e) => 
                                        setFieldValue('profileImage', e.currentTarget.files[0])
                                    }
                                    className="h-full text-white w-full pl-[55px] pr-[10px]" 
                                />
                            </div>

                        </div>

                        <div>
                            <ErrorMessage name="description" component="div" style={{ color: 'red', fontSize: 12 }} />
                            <div className="mt-1  relative rounded-lg overflow-hidden ">
                                <div 
                                    style={{color: localStorage.color}} 
                                    className="absolute top-1/2 -translate-y-1/2 px-3 border-r-2 border-gray-400 py-2 h-[90%] flex items-center justify-center ">
                                    <FaPen />
                                </div>
                                <Field 
                                    as="textarea"
                                    rows={4}
                                    type="text"
                                    name="description" 
                                    placeholder="Enter some information about you"
                                    className=" w-full pl-[55px] pr-[10px] text-black rounded-lg" 
                                />
                            </div>
                            
                        </div>

                        <button
                            style={{background: localStorage.color}}
                            className="h-[50px] rounded-lg overflow-hidden text-white"
                            type="submit" 
                            disabled={isSubmitting}
                        >
                            Complete
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default CompleteSignUp