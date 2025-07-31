import React from "react";

const Button = ({ 
    children, 
    onClick,
    type='button',
    textColour='text-white',
    bgColour='bg-blue-500', 
    className,
    ...props
}) => {
    return (
        <button
        onClick={onClick}
        className={`inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full ${bgColour} ${textColour} ${className}`}{...props}
        >
        {children}
        </button>
    );
}

export default Button;  