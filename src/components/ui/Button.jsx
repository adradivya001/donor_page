import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const Button = ({ 
    children, 
    className, 
    variant = 'primary', 
    size = 'md', 
    ...props 
}) => {
    const variants = {
        primary: 'bg-brand-purple text-white hover:bg-brand-purple-hover shadow-lg hover:shadow-xl',
        secondary: 'bg-brand-pink text-white hover:bg-brand-pink/90',
        outline: 'bg-transparent border-2 border-brand-pink text-brand-pink hover:bg-brand-pink-soft',
        ghost: 'bg-transparent text-brand-text/70 hover:text-brand-pink'
    };

    const sizes = {
        sm: 'px-4 py-2 text-sm',
        md: 'px-6 py-3 text-base',
        lg: 'px-8 py-4 text-lg font-bold'
    };

    return (
        <button 
            className={twMerge(
                'rounded-xl transition-all duration-300 transform active:scale-95 disabled:opacity-50 disabled:pointer-events-none',
                variants[variant],
                sizes[size],
                className
            )}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
