import React from "react";
import { FaShoppingBag } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="px-20 py-5 mt-10 bg-black dark:bg-gray-900 border-t-2 border-t-white" data-aos="fade-down">
            <div className="flex flex-col md:flex-row justify-between items-center md:items-start">
                <Link to='/'>
                    <span className="text-4xl flex gap-3 text-white my-4">
                        <FaShoppingBag color={localStorage.color} /> Ecommerce
                    </span>
                </Link>
                <div className="">
                    <h2 className="text-2xl my-4" style={{color:localStorage.color}}>Menu</h2>
                    <ul className="ml-4">
                        <li><NavLink className='text-white' to='/'>Home</NavLink></li>
                        <li><NavLink className='text-white' to='/product'>Products</NavLink></li>
                        <li><NavLink className='text-white' to='/cart'>Cart</NavLink></li>
                        <li><NavLink className='text-white' to='/auth/signin'>Sign In</NavLink></li>
                        <li><NavLink className='text-white' to='/auth/signup'>Sign Up</NavLink></li>
                    </ul>
                </div>
                <div className="item">
                    <h2 className="text-2xl my-4" style={{color:localStorage.color}}>Know More</h2>
                    <ul className="ml-4">
                        <li><NavLink className='text-white text-decoration-none' to='/about'>About</NavLink></li>
                        <li><NavLink className='text-white text-decoration-none' to='/about/#contact'>Contact</NavLink></li>
                    </ul>
                </div>
                <div className="item">
                    <h2 className="text-2xl my-4" style={{color:localStorage.color}}>Social Media</h2>
                    <ul className="ml-4">
                        <li><Link className='text-white text-decoration-none' to='#'>Instagram</Link></li>
                        <li><Link className='text-white text-decoration-none' to='#'>Twitter</Link></li>
                        <li><Link className='text-white text-decoration-none' to='#'>Linked in</Link></li>
                        <li><Link className='text-white text-decoration-none' to='#'>WhatSapp</Link></li>
                        <li><Link className='text-white text-decoration-none' to='#'>Facebook</Link></li>
                    </ul>
                </div>
            </div>
            <div className="text-white flex flex-col items-center mt-4">
                <span>@2025Ecommerce.Allrightsreserved</span>
                {/*
                <div>
                    <span>Terms & Condition</span>
                    <span>Privacy Policy</span>
                </div>
                */}
            </div>
        </footer>
    )
}

export default Footer