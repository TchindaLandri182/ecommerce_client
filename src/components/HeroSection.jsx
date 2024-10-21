import React from "react";
import { Link } from "react-router-dom";
import Image from '../images/person-removebg-preview.png'

const HeroSection = () => {
    return (
        <section style={{minHeight: 400, maxHeight: 650}} className="flex md:h-[calc(100vh-6rem)] md:flex-row flex-col h-max-[600px] h-min-[400px]">
            <div className="w-full md:w-1/2 md:h-full flex flex-col md:items-start items-center p-10 gap-16 justify-center">
                <div><p className="text-center md:text-start text-4xl lg:text-5xl  xl:text-7xl font-bold ">Grab Upto <span style={{color: localStorage.color}} className="text-10xl">50% Off</span>  On Selected Products</p></div>
                <Link 
                    to={sessionStorage.token ? '/product' : '/auth/signin'} 
                    style={{background: localStorage.color}}
                    className="rounded-full py-2 px-4 text-white"
                >
                    Buy Now
                </Link>
            </div>
            <div className="w-full md:w-1/2 md:h-full flex justify-center  items-center pb-10">
                <div className="w-[23rem] h-[23rem]">
                    <img src={Image} alt="brand" className="object-cover w-full h-full"/>
                </div>
            </div>
        </section>
    )
}

export default HeroSection