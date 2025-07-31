import React, { useId } from "react";

const Input = React.forwardRef(function Input(
    {
        label,
        type = 'text',
        placeholder,
        className = '',
        ...props
    }, ref
) {
    const id = useId();
    return (
        <div className='w-full'>
            {
                label &&
                <label
                    htmlFor={id}
                    className='block text-sm font-medium text-gray-700'>
                    {label}
                </label>

            }
            <input
            id={id}
            type ={type}
            className={`${className} w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
            ref={ref}
            {...props}
            />
        </div>
    )
})

export default Input;