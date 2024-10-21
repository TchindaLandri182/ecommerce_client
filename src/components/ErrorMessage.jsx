import React from "react";

const ErrorMessage = ({message}) => {
    return (
        <div className="h-[calc(100vh-6rem)] flex justify-center items-center">
            <h2 className="text-3xl text-center text-red-500">{message}</h2>
        </div>
    )
}

export default ErrorMessage