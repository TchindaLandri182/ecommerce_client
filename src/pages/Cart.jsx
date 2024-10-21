import React from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { CardRow } from '../components'
import { Link } from 'react-router-dom'
import { clearItems } from '../store/SelectedItem/SelectedItem'

const Card = () => {

    const dispatch = useDispatch()

    const handleClearItems = () => {
        dispatch(clearItems())
    }

    const items = useSelector((state) => state.items)
    const totalPrice = useSelector((state) => {
        let sum = 0
        state.items.forEach((item) => sum += (item?.price - item?.discount*item?.price/100)*item?.quantity)
        return sum
    })
    console.log(items)

    return (
        <div className='min-h-[15rem] w-full max-w-[1600px] mx-auto'>
            <h2 className='font-bold text-4xl'>Card Summary</h2>
            <div className='m-5'>
                {items.length > 0 ? (
                    <table className='w-full border-2 text-center text-sm' >
                    <tr className='font-bold md:text-2xl '>
                        <td className='py-5'>Product Image</td>
                        <td>Product Name</td>
                        <td>quantity</td>
                        <td>Price</td>
                    </tr>
                    {items.map((item) => (
                        <CardRow product={item} key={item.id}/>
                    ))}
                    <tr>
                        <td className='py-5'>
                            <button 
                                onClick={() => handleClearItems()}
                                style={{background: localStorage.color}}
                                className="rounded-full py-1 px-2 text-white min-w-[75px]"
                            >
                                Clear Cart
                            </button>
                        </td>
                        <td></td>
                        <td></td>
                        <td>
                            <span className='font-bold'>{totalPrice}FCFA</span>
                        </td>
                    </tr>
                </table>
                ) : (
                    <>
                        <h2 className='text-2xl text-red-400 mb-4'>No items selected yet!</h2>
                        <Link to='/product' className='text-lg text-blue-500'>Go to Products Page</Link><br />
                        <Link to='/' className='text-lg text-blue-500'>Go to home page</Link>
                    </>
                )}
            </div>
        </div>
    )
}

export default Card