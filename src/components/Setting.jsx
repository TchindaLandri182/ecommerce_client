import React, { useEffect, useState } from "react";
import { FaMoon, FaSun, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Setting = ({show, setShow}) => {
    const [theme, setTheme] = useState(localStorage.theme ? localStorage.theme : "dark")
    const [fontSize, setFontSize] = useState(localStorage.fontSize)
    const [color, setColor] = useState(localStorage.color)
    const navigate = useNavigate()
    const listColors = [
        'rgb(217, 57, 57)',
        '#7fec7f',
        'rgb(84, 215, 221)',
        'rgb(255, 0, 143)',
        'rgb(221, 212, 77)'
    ]

    useEffect(() => {
        if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }
    }, [theme])

    const applyChanges = () => {
        localStorage.color = color
        localStorage.fontSize = fontSize
        navigate(0)
    }

    const handleChangeTheme = () => {
        var newTheme = theme === "dark" ? "light" : "dark"
         localStorage.setItem("theme", newTheme)
        setTheme(newTheme)
    }

    if(show) {
        return (
            <div  className="fixed backdrop-blur-md top-0 left-0 w-screen h-screen bg-black bg-opacity-50 flex justify-center items-center z-50 p-5">
                <div className="absolute w-full max-w-[600px] p-5 dark:bg-gray-900 bg-gray-100 m-5 rounded-lg">
                    <div 
                        onClick={() => setShow(false)}
                        className="absolute top-4 right-4 p-1 cursor-pointer rounded-full hover:bg-red-500 hover:text-white"
                        >
                        <FaTimes />
                    </div>
                    <h2 className="text-2xl my-4" style={{color:localStorage.color}}>Theme</h2>
                    <div className="flex flex-col items-start gap-3">
                        <button 
                            style={{background: localStorage.color}}
                            className="rounded-full bg-gray-800 py-1 px-2 text-white"
                            onClick={() => handleChangeTheme()}
                        >
                        {theme === "dark" ? <span className="flex gap-2 items-center"><FaSun />  Light</span>: <span className="flex gap-2 items-center"><FaMoon /> Dark</span>}
                        </button>
                        <div className="flex items-center gap-4 min-h-[30px] flex-wrap">
                            <label htmlFor="fontsize">Font size:</label>
                            <input
                                type="range"
                                min={12}
                                max={25}
                                value={fontSize}
                                onChange={(event) => setFontSize(event.target.value)}
                                className="flex-1"
                            />
                            <span style={{fontSize: `${fontSize}px`}}>New font size</span>
                        </div>

                        <div className="flex items-center gap-4">
                            <label htmlFor="fontsize">color</label>
                            <div className="w-[150px] flex justify-between flex-wrap">
                                {listColors.map((color, ind) => (
                                    <div
                                        key={ind} 
                                        style={{background: color}} 
                                        className='p-2 rounded-full'
                                        onClick={() => setColor(color)}
                                    ></div>
                                ))} 
                            </div>
                            <div style={{background: color}} className="ml-6 w-[100px] h-[25px]"></div>
                        </div>
                        <button
                            style={{background: localStorage.color}}
                            className="h-[50px] w-[200px] rounded-lg overflow-hidden text-white"
                            onClick={() => applyChanges()}
                        >
                            Apply Changes
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}
//rgb(217, 57, 57)

export default Setting 