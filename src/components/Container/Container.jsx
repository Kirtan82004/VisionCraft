import React from 'react';

const Container = ({ children }) => {
    return (
        <>
            <div className="container w-full max-w-7xl mx-auto px-4 my-20">
                {children}
            </div>
        </>
    )
}

export default Container;