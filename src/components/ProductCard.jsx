import React, { useState } from "react";
import ProfileImage from '../images/personImage.png'
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addItem, removeItem } from "../store/SelectedItem/SelectedItem";

const ProductCard = ({product}) => {

    const [img, setImg] = useState(product?.User?.profileImage || ProfileImage)
    const dispatch = useDispatch()

    const handleAddItems = () => {
        dispatch(addItem(product))
    }

    const handleRemoveItems = () => {
        dispatch(removeItem(product?._id))
    }

    const itemNum = useSelector((state) => {
        const item = state.items.find((item) =>  item.id === product?._id)
        return item ? item.quantity : 0
    })

    return (
        <div className="md:h-[500px] h-[400px] flex flex-col bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
            <div className="h-[10%] p-2 flex items-center gap-3">
                <img 
                    src={img}
                    alt='profile' 
                    className="h-6 w-6 rounded-full object-cover"
                    onError={() => setImg(ProfileImage)}
                />
                <span className="text-sm">{product?.User?.userName}</span>
            </div>
            <div className="h-[60%] relative">
                {product.percentageDiscount > 0 && 
                    <span 
                        style={{background: localStorage.color}} 
                        className="absolute text-sm text-red-700 font-bold top-2 right-2 p-1 b rounded-full"
                    >
                        -{product.percentageDiscount}%
                    </span>
                }
                <img src={product.productImage} alt="product" className="w-full h-full object-cover" />
            </div>
            <div className="h-1/5 p-2 flex flex-col items-start gap-1 md:gap-3 relative">
                <h3 className="font-bold w-[70%]">{product.productName}</h3>
                <p className="text-xs w-[70%]">{product.description}</p>
                <div className="flex gap-3">
                    {itemNum > 0 ? (
                        <div style={{background: localStorage.color}} className="flex w-[100px] rounded-full justify-around items-center text-white text-2xl px-2">
                            <button onClick={() => handleRemoveItems()}>-</button>
                            <span>{itemNum}</span>
                            <button onClick={() => handleAddItems()}>+</button>
                        </div>
                    ):(
                        <button 
                            style={{background: localStorage.color}} 
                            className="py-1 px-2 rounded-full text-white text-[1rem]"
                            onClick={() => handleAddItems()}
                        >
                            Add to Card
                        </button>
                    )}
                    <Link to={product._id}>
                        <button 
                            style={{background: localStorage.color}} 
                            className="py-1 px-2 rounded-full text-white text-[1rem]">
                            View Details
                        </button>
                    </Link>
                </div>
                
                <div className="absolute top-2 right-2  max-w-[30%] flex flex-col gap-1 items-end">
                    <span className="font-bold text-lg">{product.productPrice - product.productPrice*product.percentageDiscount/100}FCFA</span>
                    {product.percentageDiscount > 0 && 
                        <span className="line-through text-sm">{product.productPrice}FCFA</span>
                    }
                    
                </div>
            </div>
        </div>
    )
}

export default ProductCard

