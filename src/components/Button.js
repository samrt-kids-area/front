// src/components/Button.js
import React from 'react';
import { cn } from '../utils/cn';

/**
 * A simple button component with default styling and support for additional classes and props.
 * @param {object} props - Component props.
 * @param {string} [props.className] - Additional class names for styling.
 * @param {React.ReactNode} props.children - Content to be displayed inside the button.
 * @param {Function} [props.onClick] - Click handler.
 * @param {object} otherProps - Other native button attributes.
 * @returns {JSX.Element} The button element.
 */
const Button = ({ className, children, onClick, ...otherProps }) => {
    return (
        <button
            onClick={onClick}
            className={cn(
                "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background",
                "px-4 py-2",
                className
            )}
            {...otherProps}
        >
            {children}
        </button>
    );
};

export default Button;