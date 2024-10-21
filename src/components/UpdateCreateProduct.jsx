import React, { useState, useEffect } from 'react';
import { FaImage, FaPen, FaPercentage, FaProductHunt, FaSortNumericUpAlt, FaStore, FaTimes } from 'react-icons/fa'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Select from 'react-select';
// import axios from 'axios';
import { toast } from 'react-toastify';
import ShowImage from './ShowImage';
import { useCreateProductMutation } from '../store/Product/Product';
import { useFetchCategoryQuery } from '../store/Category/Category';

// Validation schema for Formik using Yup
const validationSchema = Yup.object().shape({
  productName: Yup.string().required('Product name is required'),
  productImage: Yup.mixed().required('Product image is required'),
  description: Yup.string().required('Description is required'),
  productPrice: Yup.number('Product price is a number').required('Product price is required'),
  percentageDiscount: Yup.number()
    .min(0, 'Percentage discount must not be less than 0')
    .max(100, 'Percentage discount must not be greater than 100'),
  productQuantity: Yup.number()
    .min(0, 'The product quantity must be at least zero')
    .required('Product quantity is required'),
  category: Yup.string().required('Category is required'),
  otherImages: Yup.array().max(4, 'Maximum 4 images must be uploaded')
});


const UpdateCreateProduct = ( {show, setShow, option='update'} ) => {
    // const apiUrl = 'http://localhost:4000'
    const [createProduct] = useCreateProductMutation()
    const [categories, setCategories] = useState([]);
    const [display, setDisplay] = useState(false)
    const [showImage, setShowImage] = useState(false)
    const [file , setFile] = useState(null)
    const {data, error, isError, isLoading, isSuccess} = useFetchCategoryQuery()

    useEffect(() => {

        if(!display){
            if(isLoading){
                toast.dismiss()
                toast.loading('loading categories')
            }
            else{

                if(isError){
                    toast.dismiss()
                    if(error?.message) toast.error(error.message)
                    else if(error?.error) toast.error(error.error)
                    else if(error?.data?.message) toast.error(error.data.message)
                    console.log(error)
                }

                if(isSuccess){
                    toast.dismiss()
                    toast.success(data?.message)
                    setCategories(data?.categories)
                    console.log(data)
                    setDisplay(true)
                }
            }
            
        }

        // const fetchCategory = async () => {
        //     try{
        //         const response = await axios.get(apiUrl+'/api/category')
        //         setCategories(response?.data?.categories)
        //     }catch(error){
        //         console.error('Error fetching categories', error);
        //         toast.dismiss()
        //         if(error?.response?.data?.message) toast.error(error.data.message)
        //         else toast.error(error?.message)
        //     };
        // }

        // if(show) fetchCategory()
        
    }, [data, error, isError, isLoading, isSuccess, display]);

    const handleSubmit = async (values, {setSubmitting}) => {
        toast.dismiss()
        toast.loading('creating product')
        
        try{

            const formData = new FormData()
            formData.append('productName', values.productName)
            formData.append('productImage', values.productImage)
            formData.append('description', values.description)
            formData.append('productPrice', values.productPrice)
            formData.append('percentageDiscount', values.percentageDiscount)
            formData.append('productQuantity', values.productQuantity)
            formData.append('category', values.category)
            //formData.append('otherImages', values.otherImages)
            values.otherImages.forEach((image) => formData.append('otherImages', image))
            
            
            const response = await createProduct(formData).unwrap()

            // const response = await axios.post(apiUrl+'/api/product', formData, 
            //     {
            //         headers: {
            //             'Authorization' : `Bearer ${sessionStorage.token}`
            //         }
            //     }
            // )
            console.log(response)
            toast.dismiss()
            toast.success(response.message)

        }catch(error){
            console.log(error)
            toast.dismiss()
            if(error?.data?.message) toast.error(error.data.message)
            else toast.error(error?.error)                  
        }
    }


    

    const initialValues = {
        productName: '',
        productImage: '',
        description: '',
        productPrice: '',
        percentageDiscount: 0,
        productQuantity: '',
        category: '',
        otherImages: [],
    };

    if(show){
        return (
            <div className="fixed backdrop-blur-md top-0 left-0 w-screen h-screen bg-black bg-opacity-50 flex justify-center items-center z-50 p-5 ">
                    <div className="absolute w-full max-w-[600px] p-5 dark:bg-gray-900 bg-gray-100 m-5 rounded-lg overflow-x-scroll">
                        <div 
                            onClick={() => setShow(false)}
                            className="absolute top-4 right-4 p-1 cursor-pointer rounded-full hover:bg-red-500 hover:text-white"
                            >
                            <FaTimes />
                        </div>
                        <h2 className="text-2xl my-4 text-center" style={{color:localStorage.color}}>{option === 'create' ? 'Create' : 'Update'} Product</h2>
                        <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={handleSubmit}
                            >
                            {({ values, setFieldValue, isSubmitting }) => (
                                <Form className="max-w-[350px] w-full mx-auto flex flex-col gap-5">
                                    <div>
                                        <ErrorMessage name="productName" component="div" style={{ color: 'red', fontSize: 12 }} />
                                        <div className="mt-1 h-[50px] relative rounded-lg overflow-hidden">
                                            <div 
                                                style={{color: localStorage.color}} 
                                                className="absolute top-1/2 -translate-y-1/2 px-3 border-r-2 border-gray-400 py-2">
                                                <FaProductHunt />
                                            </div>
                                            <Field 
                                                type="text" 
                                                name="productName" 
                                                placeholder="Product Name"
                                                className="h-full w-full pl-[55px] pr-[10px] text-black" 
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <ErrorMessage name="productimage" component="div" style={{ color: 'red', fontSize: 12 }} />
                                        <label>Product Image</label>
                                        <div className="mt-1  relative rounded-lg overflow-hidden">
                                            <div 
                                                style={{color: localStorage.color}} 
                                                className="absolute top-1/2 -translate-y-1/2 px-3 border-r-2 border-gray-400 py-2 h-[90%] flex items-center justify-center ">
                                                <FaImage />
                                            </div>
                                            <div className='flex'>
                                                <input 
                                                    type="file"
                                                    id="productImage"
                                                    name="productImage"
                                                    accept='image/*'
                                                    onChange={(e) => {
                                                        setFieldValue('productImage', e.target.files[0])
                                                    }}
                                                    className="h-full text-white w-full pl-[55px] pr-[10px]" 
                                                />
                                                <div className='w-7 h-7 rounded-full overflow-hidden'>
                                                    {values.productImage &&
                                                        <img 
                                                            src={URL.createObjectURL(values.productImage)}
                                                            alt='product'
                                                            className='object-cover w-full h-full'
                                                            onClick={() => {
                                                                setFile(values.productImage)
                                                                setShowImage(true)
                                                            }}
                                                        />
                                                    }
                                                    
                                                </div>
                                            </div>
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
                                                rows={5}
                                                type="text"
                                                name="description" 
                                                placeholder="Enter some information about the product"
                                                className=" w-full pl-[55px] pr-[10px] text-black rounded-lg" 
                                            />
                                        </div>
                                        
                                    </div>
                                

                                    <div>
                                        <ErrorMessage name="productPrice" component="div" style={{ color: 'red', fontSize: 12 }} />
                                        <div className="mt-1 h-[50px] relative rounded-lg overflow-hidden">
                                            <div 
                                                style={{color: localStorage.color}} 
                                                className="absolute top-1/2 -translate-y-1/2 px-3 border-r-2 border-gray-400 py-2">
                                                <FaSortNumericUpAlt />
                                            </div>
                                            <Field 
                                                type="number" 
                                                name="productPrice" 
                                                placeholder="Product Price"
                                                className="h-full w-full pl-[55px] pr-[10px] text-black" 
                                            />
                                        </div>
                                    </div>


                               <div>
                                        <ErrorMessage name="percentageDiscount" component="div" style={{ color: 'red', fontSize: 12 }} />
                                        <label>Percentage Discount({`${values.percentageDiscount}%`})</label>
                                        <div className="mt-1 h-[50px] relative rounded-lg overflow-hidden">
                                            <div 
                                                style={{color: localStorage.color}} 
                                                className="absolute top-1/2 -translate-y-1/2 px-3 border-r-2 border-gray-400 py-2">
                                                <FaPercentage />
                                            </div>
                                            <Field 
                                                type="range" 
                                                min={0}
                                                max={100}
                                                name="percentageDiscount" 
                                                placeholder="Product Discount"
                                                className="h-full w-full ms-[50px] pl-[55px] pr-[10px] text-black" 
                                            />
                                        </div>
                                    </div>


                                    <div>
                                        <ErrorMessage name="productQuantity" component="div" style={{ color: 'red', fontSize: 12 }} />
                                        <div className="mt-1 h-[50px] relative rounded-lg overflow-hidden">
                                            <div 
                                                style={{color: localStorage.color}} 
                                                className="absolute top-1/2 -translate-y-1/2 px-3 border-r-2 border-gray-400 py-2">
                                                <FaStore />
                                            </div>
                                            <Field 
                                                type="number" 
                                                name="productQuantity" 
                                                placeholder="Product Quantity"
                                                className="h-full w-full pl-[55px] pr-[10px] text-black" 
                                            />
                                        </div>
                                    </div>

                                <div>
                                    <label>Category</label>    
                                        <Select
                                        name="category"
                                        options={categories.map((cat) => ({
                                            value: cat._id,
                                            label: cat.categoryName,
                                        }))}
                                        /*value={values.category}*/
                                        onChange={(option) => setFieldValue('category', option.value)}
                                        />
                                        
                                    
                                    
                                    <ErrorMessage name="category" component="div" />
                                </div>

                                <div>
                                        <ErrorMessage name="otherImages" component="div" style={{ color: 'red', fontSize: 12 }} />
                                        <label>Other Product Image</label>
                                        <div className="mt-1  relative rounded-lg overflow-hidden">
                                            <div 
                                                style={{color: localStorage.color}} 
                                                className="absolute top-1/2 -translate-y-1/2 px-3 border-r-2 border-gray-400 py-2 h-[90%] flex items-center justify-center ">
                                                <FaImage />
                                            </div>
                                            {/*<div className='flex'>*/}
                                                <input 
                                                    type="file"
                                                    id="otherImages"
                                                    name="otherImages"
                                                    accept='image/*'
                                                    multiple
                                                    onChange={(e) => 
                                                        setFieldValue('otherImages', Array.from(e.currentTarget.files))
                                                    }
                                                    className="h-full text-white w-full pl-[55px] pr-[10px]" 
                                                />
                                                
                                            {/*</div>*/}
                                        </div>
                                        <div className='flex mt-3 ms-4'>
                                                    {values.otherImages.map((image, ind) => (
                                                        <div className='w-7 h-7 rounded-full overflow-hidden -me-2 bg-white' key={ind}>
                                                            <img 
                                                                src={URL.createObjectURL(image)}
                                                                alt='product'
                                                                className='object-cover w-full h-full'
                                                                onClick={() => {
                                                                    setFile(image)
                                                                    setShowImage(true)
                                                                }}
                                                            />   
                                                        </div>
                                                    ))}
                                                </div>
                                    </div>

                                <button
                                    style={{background: localStorage.color}}
                                    className="h-[50px] rounded-lg overflow-hidden text-white"
                                    type="submit" 
                                    disabled={isSubmitting}
                                >
                                    {option.toUpperCase()}
                                </button>
                                </Form>
                            )}
                            </Formik>
                    </div>
                    <ShowImage show={showImage} setShow={setShowImage} File={file} />
                </div>
        )
    }
}

export default UpdateCreateProduct