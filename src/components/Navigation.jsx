import React from 'react';
import '../styles/global.css';
import BrandButton from './BrandButton';

const Navigation = () => {
  return (
    <nav className="bg-surface border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-background font-bold">W3</span>
            </div>
            <span className="text-xl font-bold">WEB3DEV</span>
          </div>
          
          <div className="hidden md:flex space-x-8">
            <a href="#" className="text-gray-300 hover:text-primary transition-colors">
              Tasks
            </a>
            <a href="#" className="text-gray-300 hover:text-primary transition-colors">
              Roadmap
            </a>
            <a href="#" className="text-gray-300 hover:text-primary transition-colors">
              Profile
            </a>
          </div>
          
          <div className="flex space-x-4">
            <BrandButton variant="secondary" size="small">
              Connect Wallet
            </BrandButton>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
