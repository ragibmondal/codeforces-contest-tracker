import React from 'react';
import { Calendar, Clock, Trophy } from 'lucide-react';
import { Contest } from '../types/codeforces';

interface ContestCardProps {
  contest: Contest;
  onClick: () => void;
}

export function ContestCard({ contest, onClick }: ContestCardProps) {
  const startDate = new Date(contest.startTimeSeconds * 1000);
  const duration = Math.floor(contest.durationSeconds / 3600);
  
  const getStatusColor = (phase: string) => {
    switch (phase) {
      case 'BEFORE':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'CODING':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'FINISHED':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
      default:
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
    }
  };

  return (
    <div 
      onClick={onClick}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white flex-1">{contest.name}</h3>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(contest.phase)}`}>
          {contest.phase.toLowerCase()}
        </span>
      </div>
      
      <div className="space-y-3">
        <div className="flex items-center text-gray-600 dark:text-gray-300">
          <Calendar className="w-5 h-5 mr-2" />
          <span>{startDate.toLocaleDateString()}</span>
        </div>
        
        <div className="flex items-center text-gray-600 dark:text-gray-300">
          <Clock className="w-5 h-5 mr-2" />
          <span>{startDate.toLocaleTimeString()}</span>
        </div>
        
        <div className="flex items-center text-gray-600 dark:text-gray-300">
          <Trophy className="w-5 h-5 mr-2" />
          <span>{duration} hours</span>
        </div>
      </div>
    </div>
  );
}