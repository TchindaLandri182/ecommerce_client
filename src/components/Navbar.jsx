import React, { useEffect, useState } from "react";
import { FaEnvelope, FaMoon, FaShoppingBag, FaShoppingCart, FaSun, FaTag } from "react-icons/fa";
import { MdSettings } from 'react-icons/md';
import { Link } from "react-router-dom";

const Navbar = () => {

    const [theme, setTheme] = useState(localStorage.theme ? localStorage.theme : "dark")

    useEffect(() => {
        if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }
    }, [theme])

    const handleChangeTheme = () => {
        var newTheme = theme === "dark" ? "light" : "dark"
         localStorage.setItem("theme", newTheme)
        setTheme(newTheme)
    }

    return (
        <nav className="flex h-[6rem] px-6 justify-between items-center ">
            <Link to='/'>
                <span className="text-2xl flex gap-3">
                    <FaShoppingBag color={localStorage.color} /> Ecommerce
                </span>
            </Link>
            <div className="flex gap-4">
                <a href="#about" className="hover:text-gray-400 flex gap-3 items-center">
                    <FaTag color={localStorage.color} /> Products
                </a>
                {/*<a href="#projects" className="hover:text-gray-400">My Projects</a>*/}
                <a href="#contact" className="hover:text-gray-400 flex gap-3 items-center">
                    <FaEnvelope color={localStorage.color} /> Contact Me
                </a>
            </div>
            <div className="flex items-center gap-5">
                <div>
                    <MdSettings color={localStorage.color} />
                </div>
                <div className="relative">
                    <FaShoppingCart color={localStorage.color} />
                    <div className="text-sm absolute -top-4 -right-4 h-[20px] w-[20px] bg-red-500 p-2 rounded-full flex items-center justify-center text-white">10</div>
                </div>
                <Link to='/auth/signin'>
                    <div 
                        style={{background: localStorage.color}}
                        className="rounded-full bg-gray-800 py-2 px-3 text-white"
                    >
                        Sign In
                    </div>
                </Link>
                <div 
                    
                    style={{background: localStorage.color}}
                    className="rounded-full bg-gray-800 py-2 px-3 text-white"
                    onClick={() => handleChangeTheme()}
                >
                {theme === "dark" ? <span className="flex gap-2 items-center"><FaSun />  Light</span>: <span className="flex gap-2 items-center"><FaMoon /> Dark</span>}
                </div>
                
            </div>
        </nav>
    )
}

export default Navbar