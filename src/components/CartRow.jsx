import React from 'react'
import { useDispatch } from 'react-redux'
import { addItem, removeItem } from '../store/SelectedItem/SelectedItem'

const CardRow = ({product}) => {

    const dispatch = useDispatch()

    const handleAddItems = () => {

        dispatch(addItem({...product, _id: product.id}))
    }

    const handleRemoveItems = () => {
        dispatch(removeItem(product.id))
    }

    return (
        <tr className='border-y-2'>
            <td className='py-3 flex justify-center'>
                <img
                    src={product?.image}
                    alt='product'
                    className='md:w-[7rem] md:h-[7rem] w-[4rem] h-[4rem] rounded-full object-cover'
                    />
            </td>
            <td>
                <span>{product?.name}</span>
            </td>
            <td className=''>
                <div style={{background: localStorage.color}} className="flex h-[40px] w-[80px] rounded-full justify-around items-center text-white px-2 mx-auto">
                    <button onClick={() => handleRemoveItems()}>-</button>
                    <span>{product?.quantity}</span>
                    <button onClick={() => handleAddItems()}>+</button>
                </div>
            </td>
            <td>
                <span>{(product?.price - product?.discount*product?.price/100)*product?.quantity}FCFA</span>
            </td>
        </tr>
    )
}

export default CardRow