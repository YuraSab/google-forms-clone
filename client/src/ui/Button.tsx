import React from 'react';
import styles from './Button.module.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary';
    children: React.ReactNode;
    isFullWidth?: boolean;
}

export const Button = ({ variant = 'primary', children, isFullWidth, className, ...props }: ButtonProps) => {
    return (
        <button 
            className={`${styles.button} ${styles[variant]} ${className} ${isFullWidth ? styles.fullWidth : ''}`} 
            {...props}
        >
            {children}
        </button>
    );
};