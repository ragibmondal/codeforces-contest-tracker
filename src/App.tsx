import React, { useEffect, useState } from 'react';
import { Code2 } from 'lucide-react';
import { Contest, ContestStandings } from './types/codeforces';
import { fetchContests, fetchContestStandings } from './utils/api';
import { ContestList } from './components/ContestList';
import { StandingsTable } from './components/StandingsTable';
import { SearchBar } from './components/SearchBar';
import { ThemeToggle } from './components/ThemeToggle';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ErrorMessage } from './components/ErrorMessage';
import { useTheme } from './hooks/useTheme';
import { ApiError } from './utils/errors';

function App() {
  const [contests, setContests] = useState<Contest[]>([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedContest, setSelectedContest] = useState<Contest | null>(null);
  const [standings, setStandings] = useState<ContestStandings | null>(null);
  const [standingsLoading, setStandingsLoading] = useState(false);
  const [standingsError, setStandingsError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const { isDark, toggleTheme } = useTheme();

  useEffect(() => {
    const loadContests = async () => {
      try {
        const response = await fetchContests();
        setContests(response.result);
      } catch (err) {
        const message = err instanceof ApiError 
          ? `Failed to fetch contests: ${err.message}`
          : 'An unexpected error occurred while fetching contests';
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    loadContests();
  }, []);

  useEffect(() => {
    const loadStandings = async () => {
      if (selectedContest) {
        setStandingsLoading(true);
        setStandingsError(null);
        try {
          const response = await fetchContestStandings(selectedContest.id);
          setStandings(response.result);
        } catch (err) {
          const message = err instanceof ApiError 
            ? `Failed to fetch standings: ${err.message}`
            : 'An unexpected error occurred while fetching standings';
          setStandingsError(message);
        } finally {
          setStandingsLoading(false);
        }
      }
    };

    if (selectedContest) {
      loadStandings();
    }
  }, [selectedContest]);

  const filters = [
    { id: 'all', label: 'All Contests' },
    { id: 'upcoming', label: 'Upcoming' },
    { id: 'ongoing', label: 'Ongoing' },
    { id: 'past', label: 'Past' },
  ];

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={() => window.location.reload()} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Code2 className="h-8 w-8 text-blue-500" />
              <h1 className="ml-3 text-2xl font-bold text-gray-900 dark:text-white">
                Codeforces Contest Tracker
              </h1>
            </div>
            <ThemeToggle isDark={isDark} onToggle={toggleTheme} />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 space-y-4">
          <div className="flex flex-wrap gap-4">
            {filters.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => setFilter(id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
                  ${filter === id 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
              >
                {label}
              </button>
            ))}
          </div>
          <SearchBar value={searchTerm} onChange={setSearchTerm} />
        </div>

        {selectedContest ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                {selectedContest.name} - Standings
              </h2>
              <button
                onClick={() => {
                  setSelectedContest(null);
                  setStandings(null);
                  setStandingsError(null);
                }}
                className="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              >
                Back to Contests
              </button>
            </div>
            {standingsLoading ? (
              <LoadingSpinner />
            ) : standingsError ? (
              <ErrorMessage 
                message={standingsError} 
                onRetry={() => setSelectedContest(selectedContest)} 
              />
            ) : standings ? (
              <StandingsTable standings={standings} searchTerm={searchTerm} />
            ) : null}
          </div>
        ) : (
          <ContestList 
            contests={contests} 
            filter={filter}
            searchTerm={searchTerm}
            onContestClick={setSelectedContest}
          />
        )}
      </main>
    </div>
  );
}

export default App;