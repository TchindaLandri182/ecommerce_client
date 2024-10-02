import React, { useState } from "react";
import { FaBars,
        FaEnvelope, 
        FaShoppingBag, 
        FaShoppingCart, 
        FaTag, 
        FaTimes 
    } from "react-icons/fa";
import personImage from '../images/personImage.png'
import { MdSettings } from 'react-icons/md';
import { Link, useNavigate } from "react-router-dom";
import Setting from "./Setting";

const Navbar = () => {
    
    const navigate = useNavigate()
    const [showNav, setShowNav] = useState(false)
    const [showSetting, setShowSetting] = useState(false)
    const isAuth = !!sessionStorage.token
    const [profileImage, setProfileImage] = useState(sessionStorage.profileImage)
    const handleSignout = () => {
        sessionStorage.clear()
        navigate('/')
    }

    return (
        <nav className="flex h-[6rem] px-6 justify-between items-center dark:bg-gray-900 bg-gray-100 mb-10 flex-wrap">
            <Link className="hidden md:flex" to='/'>
                <span className="text-lg md:text-2xl flex gap-3 items-center">
                    <FaShoppingBag color={localStorage.color} /> Ecommerce
                </span>
            </Link>
            <div className="md:flex md:gap-4 hidden">
                <a href="/product" className="hover:text-gray-400 flex gap-3 items-center">
                    <FaTag color={localStorage.color} /> Products
                </a>
                <a href="#contact" className="hover:text-gray-400 flex gap-3 items-center">
                    <FaEnvelope color={localStorage.color} /> Contact Me
                </a>
            </div>
            <div
                className="cursor-pointer md:hidden"
                onClick={() => setShowNav(true)}
            >
                <FaBars color={localStorage.color} />
            </div>
            <div className="flex items-center gap-5">
                <div onClick={() => setShowSetting(true)}>
                    <MdSettings color={localStorage.color} />
                </div>
                <div className="relative">
                    <FaShoppingCart color={localStorage.color} />
                    <div className="text-sm absolute -top-4 -right-4 h-[20px] w-[20px] bg-red-500 p-2 rounded-full flex items-center justify-center text-white">10</div>
                </div>
                {isAuth ? (
                    <div className="flex items-center gap-3 ">
                        <span>{sessionStorage.userName}</span>
                        <img 
                            src={sessionStorage.profileImage ? profileImage : personImage}
                            onError={() => setProfileImage(personImage)}
                            alt="profile"
                            className="w-[2rem] h-[2rem] rounded-full overflow-hidden    border-2 border-white"
                        />
                        <button 
                            style={{background: localStorage.color}}
                            className="rounded-full bg-gray-800 py-1 px-2 text-white min-w-[80px]"
                            onClick={() => handleSignout()}
                        >
                            Sign Out
                        </button>
                    </div>
                ):(
                    <Link to='/auth/signin'>
                        <button 
                            style={{background: localStorage.color}}
                            className="rounded-full bg-gray-800 py-1 px-2 text-white"
                        >
                            Sign In
                        </button>
                    </Link>
                )}
                
                
                
                {showNav && (
                    <div className="md:hidden fixed top-0 left-0 w-screen h-screen backdrop-blur-sm bg-black bg-opacity-50 flex justify-center items-center text-white z-50">
                        <Link className="absolute top-6 left-6" to='/'>
                            <span className="text-lg md:text-2xl flex gap-3 items-center">
                                <FaShoppingBag color={localStorage.color} /> Ecommerce
                            </span>
                        </Link>
                        <div 
                            onClick={() => setShowNav(false)}
                            className="absolute top-6 right-6 p-1 rounded-full cursor-pointer hover:bg-red-500"
                            >
                            <FaTimes />
                        </div>
                        <div className=" flex flex-col gap-5">
                            <a href="/product" className="hover:text-gray-400 flex gap-3 items-center">
                                <FaTag color={localStorage.color} /> Products
                            </a>
                            <a href="#contact" className="hover:text-gray-400 flex gap-3 items-center">
                                <FaEnvelope color={localStorage.color} /> Contact Me
                            </a>
                        </div>
                    </div>
                )}
                
                <Setting show={showSetting} setShow={setShowSetting} />
            </div>
        </nav>
    )
}

export default Navbar