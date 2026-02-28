import React from 'react'

function Container({children}) {
    return (
        <div className="max-w-7xl bg-amber-800 mx-auto mt-20 px-4 sm:px-6 lg:px-8">
            {children}
        </div>
    )   
}

export default Container
