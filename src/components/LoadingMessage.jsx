import React from "react";

const LoadingMessage = ({message}) => {
    return (
        <div className="h-[calc(100vh-6rem)] flex justify-center items-center">
            <h2 className="text-3xl text-center">{message}</h2>
        </div>
    )
}

export default LoadingMessage