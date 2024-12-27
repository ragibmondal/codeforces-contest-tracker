import React, { useState, useMemo } from 'react';
import { ContestStandings } from '../types/codeforces';
import { Pagination } from './Pagination';

interface StandingsTableProps {
  standings: ContestStandings;
  searchTerm: string;
}

const ITEMS_PER_PAGE = 50;

export function StandingsTable({ standings, searchTerm }: StandingsTableProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const filteredRows = useMemo(() => {
    return standings.rows.filter(row => {
      if (!searchTerm) return true;
      
      const searchLower = searchTerm.toLowerCase();
      return row.party.members.some(member => 
        (member.organization?.toLowerCase().includes(searchLower) ?? false) ||
        (member.country?.toLowerCase().includes(searchLower) ?? false) ||
        member.handle.toLowerCase().includes(searchLower)
      );
    });
  }, [standings.rows, searchTerm]);

  const totalPages = Math.ceil(filteredRows.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedRows = filteredRows.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // Reset to first page when search changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  if (filteredRows.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 dark:text-gray-400">
          No participants found matching your search
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Rank
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Participant
              </th>
              {standings.problems.map(problem => (
                <th key={problem.index} className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  {problem.index}
                </th>
              ))}
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Total
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
            {paginatedRows.map((row, idx) => (
              <tr key={row.party.members[0].handle} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                  {row.rank}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex flex-col">
                    <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      {row.party.members[0].handle}
                    </div>
                    {row.party.members[0].organization && (
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {row.party.members[0].organization}
                      </div>
                    )}
                  </div>
                </td>
                {row.problemResults.map((result, idx) => (
                  <td key={idx} className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`${
                      result.points > 0 
                        ? 'text-green-600 dark:text-green-400' 
                        : result.rejectedAttemptCount > 0 
                          ? 'text-red-600 dark:text-red-400'
                          : 'text-gray-500 dark:text-gray-400'
                    }`}>
                      {result.points > 0 
                        ? `+${result.rejectedAttemptCount}`
                        : result.rejectedAttemptCount > 0 
                          ? `-${result.rejectedAttemptCount}`
                          : ''}
                    </span>
                  </td>
                ))}
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                  {row.points}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination 
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}