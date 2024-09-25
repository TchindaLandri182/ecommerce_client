import React from "react";
import Image from '../images/login.jpg'

const AuthLayout = ({children}) => {
    return (
        <section style={{minHeight: 500, maxHeight: 750}} className="md:h-[calc(100vh-6rem)] flex items-center justify-center">
            <div style={{maxWidth: 1300, maxHeight: 620}} className="flex flex-col md:flex-row w-full h-full m-5 rounded-3xl overflow-hidden">
                <div className="w-full md:w-1/2 md:h-full dark:bg-gray-800 bg-gray-100 flex items-center justify-center py-16">
                    {children}
                </div>
                <div className="w-full md:w-1/2 md:h-full">
                    <img src={Image} alt='login' className="w-full h-full object-cover" />
                </div>
            </div>
        </section>
    )
}

export default AuthLayout