import React from 'react';
import { Contest } from '../types/codeforces';
import { ContestCard } from './ContestCard';

interface ContestListProps {
  contests: Contest[];
  filter: string;
  searchTerm: string;
  onContestClick: (contest: Contest) => void;
}

export function ContestList({ contests, filter, searchTerm, onContestClick }: ContestListProps) {
  const filteredContests = contests.filter(contest => {
    const matchesFilter = filter === 'all' || 
      (filter === 'upcoming' && contest.phase === 'BEFORE') ||
      (filter === 'ongoing' && contest.phase === 'CODING') ||
      (filter === 'past' && contest.phase === 'FINISHED');

    const matchesSearch = searchTerm === '' ||
      contest.name.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  if (filteredContests.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 dark:text-gray-400">
          No contests found {searchTerm && 'matching your search'}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredContests.map(contest => (
        <ContestCard 
          key={contest.id} 
          contest={contest} 
          onClick={() => onContestClick(contest)}
        />
      ))}
    </div>
  );
}