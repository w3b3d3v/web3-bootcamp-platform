import React from 'react';
import '../styles/global.css';

const BrandButton = ({ 
  variant = 'primary', 
  size = 'medium', 
  children, 
  ...props 
}) => {
  const sizeClasses = {
    small: 'px-3 py-1 text-sm',
    medium: 'px-4 py-2 text-base',
    large: 'px-6 py-3 text-lg'
  };

  const variantClasses = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    accent: 'btn-accent'
  };

  return (
    <button 
      className={`btn ${variantClasses[variant]} ${sizeClasses[size]}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default BrandButton;
