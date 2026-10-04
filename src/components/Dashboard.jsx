import React from 'react';
import '../styles/global.css';
import Navigation from './Navigation';
import TaskCard from './TaskCard';

const Dashboard = () => {
  const sampleTasks = [
    {
      id: 1,
      title: 'Smart Contract Audit',
      description: 'Audit the new DeFi protocol smart contracts for security vulnerabilities.',
      reward: '2500',
      deadline: '2 days left'
    },
    {
      id: 2,
      title: 'Frontend Integration',
      description: 'Integrate the new wallet connection feature using Web3.js.',
      reward: '1800',
      deadline: '5 days left'
    },
    {
      id: 3,
      title: 'API Documentation',
      description: 'Create comprehensive API documentation for the platform endpoints.',
      reward: '1200',
      deadline: '1 week left'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">
            Welcome to <span className="text-primary">WEB3DEV</span> Platform
          </h1>
          <p className="text-xl text-gray-400">
            Discover and complete Web3 development tasks to earn rewards.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="card">
            <h3 className="text-lg font-semibold mb-2">Total Tasks</h3>
            <p className="text-3xl font-bold text-primary">127</p>
          </div>
          <div className="card">
            <h3 className="text-lg font-semibold mb-2">Your Earnings</h3>
            <p className="text-3xl font-bold text-secondary">4,250 USDC</p>
          </div>
          <div className="card">
            <h3 className="text-lg font-semibold mb-2">Active Tasks</h3>
            <p className="text-3xl font-bold text-accent">3</p>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-4">Available Tasks</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {sampleTasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
