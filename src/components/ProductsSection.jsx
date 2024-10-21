import React from "react";

// import ProfileImage from '../images/personImage.png'
import ProductCard from "./ProductCard";
// import ProductImage from '../images/login.jpg'

const ProductsSection = ({products}) => {
    
    return (
        <div className="p-5">
            {products.length === 0 ? (
                <div className="h-[250px] flex justify-center items-center">
                    <h2 className="text-2xl text-red-500">No Product Found</h2>
                </div>
            ) : (
                <div className="grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6 md:gap-16 w-full max-w-[1600px] mx-auto">
                    {products.map((product, ind) => <ProductCard product={product} key={ind} />)}
                </div>
            )}
            
        </div>
    )
}

export default ProductsSection