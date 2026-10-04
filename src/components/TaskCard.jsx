import React from 'react';
import '../styles/global.css';
import BrandCard from './BrandCard';
import BrandButton from './BrandButton';

const TaskCard = ({ task, onAccept }) => {
  return (
    <BrandCard 
      title={task.title}
      description={task.description}
      className="h-full flex flex-col"
    >
      <div className="mt-auto">
        <div className="flex justify-between items-center mb-4">
          <span className="text-primary font-semibold">
            {task.reward} USDC
          </span>
          <span className="text-sm text-gray-400">
            {task.deadline}
          </span>
        </div>
        
        <div className="flex space-x-2">
          <BrandButton 
            variant="primary" 
            size="small"
            onClick={onAccept}
            className="flex-1"
          >
            Accept Task
          </BrandButton>
          <BrandButton 
            variant="secondary" 
            size="small"
            className="flex-1"
          >
            View Details
          </BrandButton>
        </div>
      </div>
    </BrandCard>
  );
};

export default TaskCard;
