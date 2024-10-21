import React, { useEffect, useState } from "react";
import { useFetchProductQuery } from "../store/Product/Product";
import personImage from '../images/personImage.png'
import { toast } from "react-toastify";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ErrorMessage, LoadingMessage } from "../components";
import { FaLessThan } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { addItem, removeItem } from "../store/SelectedItem/SelectedItem";

const ProductDetails = () => {

    const params = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { id } = params
    const [display, setDisplay] = useState(false)
    const {
        data, 
        error, 
        isError, 
        isLoading, 
        isSuccess
    } = useFetchProductQuery(id)

    const [img, setImg] = useState(data?.product?.User?.profileImage || personImage)
    useEffect(() => {
        if(!display){
            if(isLoading){
                toast.dismiss()
                toast.loading('loading products')
            }
            else{

                if(isError){
                    toast.dismiss()
                    if(error?.message) toast.error(error.message)
                    else if(error?.error) toast.error(error.error)
                    else if(error?.data?.message) toast.error(error.data.message)
                    console.log(error)
                }

                if(isSuccess && !display){
                    toast.dismiss()
                    toast.success(data?.message)
                    console.log(data)
                    setDisplay(true)
                }
            }
        }
    }, [data, error, isSuccess, isError, isLoading, display])

    const handleAddItems = () => {
        dispatch(addItem(data?.product))
    }

    const handleRemoveItems = () => {
        dispatch(removeItem(data?.product?._id))
    }

    const itemNum = useSelector((state) => {
        const item = state.items.find((item) =>  item.id === data?.product?._id)
        return item ? item.quantity : 0
    })

    if( isLoading) return <LoadingMessage message={'Fetching Data...'} />

    if(error) return <ErrorMessage message={'An Error Occured when fetching data'} />

    return (
        <div className="max-w-[1700px] w-full mx-auto ">
            <button 
                style={{background: localStorage.color}}
                className="text-white py-1 px-2 rounded-full flex gap-3 items-center"
                onClick={() => navigate(-1)}
            >
                <FaLessThan />Go back
            </button>
            <div className="p-5 border-b-2 dark:border-white border-black mb-5 mx-5">
                <h2 className="text-2xl font-bold">User Information</h2>
                <div className="p-2 flex items-center gap-3">
                    <img
                        src={img}
                        alt='profile'
                        className="w-20 h-20 object-cover rounded-full border-2 p-1" 
                        onError={() => setImg(personImage)}
                     />
                     <Link to=''>@{data?.product?.User?.userName}</Link>
                </div>
                <p>{data?.product?.User?.description}</p>
            </div>
            <div className="flex gap-10 flex-col-reverse md:flex-row px-5">
                <div className="flex flex-col gap-3 md:w-1/2">
                    <div className="flex-1">
                        <img 
                            src={data?.product?.productImage} 
                            alt="product" 
                            style={{borderColor: localStorage.color}}
                            className="w-full h-full object-cover rounded-xl" 
                        />
                    </div>
                    <div className="flex lg:justify-between flex-wrap justify-center">
                        {data?.product?.otherImages.map((images, ind) => (
                            <img 
                                key={ind}
                                src={images}
                                className="h-[130px] rounded-lg object-cover m-4"
                                alt='product' 
                             />
                        ))}
                    </div>
                </div>
                <div className="flex md:w-1/2 flex-col gap-5">
                    <div className="flex flex-col gap-4 min-h-[120px] border-b-2 dark:border-white border-black">
                        <h3 className="text-2xl font-bold">{data?.product?.productName}</h3>
                        <p className="text-sm">{data?.product?.description}</p>
                    </div>
                    <div className="flex flex-col gap-4 min-h-[120px] border-b-2 dark:border-white p-5 border-black">
                        {!!data?.product?.percentageDiscount && <span className="line-through text-xl">data?.product?.productPrice FCFA</span>}
                        <span className="text-4xl font-bold">{data?.product?.productPrice - data?.product?.percentageDiscount} FCFA</span>
                    </div>
                    <div className="flex flex-col gap-4 min-h-[150px] border-b-2 dark:border-white p-5 border-black">
                        <div className="flex gap-10">
                            <div style={{background: localStorage.color}} className="flex h-[40px] w-[110px] rounded-full justify-around items-center text-white text-2xl px-2">
                                <button onClick={() => handleRemoveItems()}>-</button>
                                <span>{itemNum}</span>
                                <button onClick={() => handleAddItems()}>+</button>
                            </div>
                            <p>Only <span className="text-red-600">{data?.product?.productQuantity} items</span> left!<br /> Don't miss it</p>
                        </div>
                        <div className="flex gap-8">
                            <Link to='/card'>
                                <button style={{background: localStorage.color}} className="py-2 px-4 rounded-full text-white">Buy Now</button>
                            </Link>
                            <button style={{background: localStorage.color}} className="py-2 px-4 rounded-full text-white">Add to Cart</button>
                        </div>
                    </div>
                </div>
                <div>

                </div>
            </div>
        </div>
    )
}

export default ProductDetails