import React, {userId} from "react";

const Select = React.forwardRef(function Select({
    options,
    label,
    className = '',
    ...props
},ref){
    const id=userId();
    return (
        <div className="w-full">
            {label && <label htmlFor={id} className="block text-sm font-medium text-gray-700">{label}</label>}
            <select
            {...props}
            id={id}
            ref={ref}
            className={`${className} `}
            >
                {
                    options?.map((option)=>(
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))
                }
            </select>

        </div>
    )
})

export default Select