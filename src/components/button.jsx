import React from 'react';

const Button = ({ className, children, ...props }) => {
    return (
        <button className={`px-4 py-2 rounded-md ${className}`} {...props}>
            {children}
        </button>
    );
};

export { Button };