import React from 'react';
import '../styles/global.css';

const BrandInput = ({ label, error, ...props }) => {
  return (
    <div className="w-full mb-4">
      {label && (
        <label className="block text-sm font-medium mb-2 text-gray-300">
          {label}
        </label>
      )}
      <input 
        className={`input ${error ? 'border-red-500' : ''}`}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-400">{error}</p>
      )}
    </div>
  );
};

export default BrandInput;
