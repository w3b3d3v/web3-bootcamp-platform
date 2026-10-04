import React from 'react';
import '../styles/global.css';

const BrandCard = ({ title, description, children, ...props }) => {
  return (
    <div className="card" {...props}>
      {title && <h3>{title}</h3>}
      {description && <p>{description}</p>}
      {children}
    </div>
  );
};

export default BrandCard;
