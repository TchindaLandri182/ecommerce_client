import React from "react";
import { FaTimes } from "react-icons/fa";

const ShowImage = ({show, setShow, File}) => {
    if(show){
        return (
            <div className="fixed backdrop-blur-md top-0 left-0 w-screen h-screen bg-black bg-opacity-50 flex justify-center items-center z-[75] p-5 ">
                <div 
                    onClick={() => setShow(false)}
                    className="absolute top-10 right-10 p-1 cursor-pointer rounded-full hover:bg-red-500 hover:text-white"
                    >
                    <FaTimes />
                </div>
                <div className="md:w-[500px] w-full flex justify-center items-center">
                    <img
                        src={URL.createObjectURL(File)}
                        alt='zoom'
                    />
                </div>
            </div>
        )
    }
}

export default ShowImage