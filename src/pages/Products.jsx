import React, { useEffect, useState } from 'react'
import { ErrorMessage, LoadingMessage, Pagination, ProductsSection } from '../components'
import { Link, useLocation } from 'react-router-dom'
import { useFetchProductsQuery } from '../store/Product/Product'
import { toast } from 'react-toastify'
import { FaSearch } from 'react-icons/fa'
import { useFetchCategoryQuery } from '../store/Category/Category'


const Products = () => {
    const limit = 10
    // const 
    // const navigate = useNavigate()
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const [page, setPage] = useState(1)
    const [search, setSearch] = useState('')
    const [display, setDisplay] = useState(false)
    const [categories, setCategories] = useState([])
    const [category, setCategory] = useState( params.get('category') || '')

    const {
        data, 
        error, 
        isError, 
        isLoading, 
        isSuccess
    } = useFetchProductsQuery({limit, search, category, page})
    const {
        data:cateData, 
        error:cateError, 
        isLoading: cateIsLoading,
        isSuccess:cateIsSuccess
    } = useFetchCategoryQuery()

    useEffect(() => {
        if(cateError){
            toast.dismiss()
            if(cateError?.message) toast.error(cateError.message)
            else if(cateError?.error) toast.error(cateError.error)
            else if(cateError?.data?.message) toast.error(cateError.data.message)
        }

        if(cateIsSuccess){
            toast.dismiss()
            toast.success(cateData?.message)
            setCategories(cateData.categories)
        }

    }, [cateData, cateError, cateIsSuccess])

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

    if(cateIsLoading || isLoading) return <LoadingMessage message={'Fetching Data...'} />

    if(error || cateError) return <ErrorMessage message={'An Error Occured when fetching data'} />
    


    return (
        <div>
            <h1 className='md:text-4xl md:font-bold text-2xl font-bold mx-5 my-10'>These are Products for you!</h1>
            <form className='flex w-full justify-center px-5'>
                <div className='relative w-full max-w-[600px]'>
                    <input 
                        type='search'
                        className='border-2 dark:border-0 border-black px-5 py-2 rounded-md w-full text-black'
                        placeholder='Search...'
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <FaSearch color={localStorage.color} className='absolute top-1/2 right-2 -translate-y-1/2' />
                </div>
            </form>
            <div className='overflow-y-scroll m-5 mb-10  w-full h-[150px]'>
                <h2 className='m-5 ms-0 md:text-2xl text-xl font-semibold'>Select a category</h2>
                <Link to=''>
                    <button
                        onClick={() => {
                            setDisplay(false)
                            setCategory('')
                        }}
                        style={{background: localStorage.color}} 
                        className='text-white m-2 py-1 px-2 rounded-full'
                    >
                        All
                    </button>
                </Link>
                {categories.map((category, ind) => (
                    <Link to={`/product?category=${category._id}`}>
                        <button 
                            key={ind} 
                            onClick={() => {
                                setDisplay(false)
                                setCategory(category._id)
                            }}
                            style={{background: localStorage.color}} 
                            className='text-white m-2 py-1 px-2 rounded-full'
                        >
                            {category.categoryName}
                        </button>   
                    </Link>
                ))}
            </div>
            <ProductsSection 
                products={data?.products ? data.products : []} 
            />
            <Pagination 
                totalPages={Math.ceil((data?.totalProducts ? data.totalProducts : 1)/limit)} 
                actualPage={page} 
                setPage={setPage} 
                setDisplay={setDisplay}
            />

        </div>
    )
}

export default Products