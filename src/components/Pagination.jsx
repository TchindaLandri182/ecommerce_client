import React from 'react'

const Pagination = ({totalPages, actualPage, setPage, setDisplay}) => {
    return (
        <div className='mx-auto flex gap-3 justify-center'>
            {Array(totalPages).fill('').map((_ , ind) => (
                <div 
                    onClick={() => {
                        setDisplay(false)
                        setPage(ind+1)
                    }}
                    style={{background: actualPage === ind+1 ? localStorage.color : 'black'  }}
                    className={`cursor-pointer flex justify-center items-center h-10 w-10 rounded-full border-2 dark:border-white text-white`}
                >{ind+1}</div>
            ))}
        </div>
    )
}

export default Pagination