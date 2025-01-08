import React, { useState } from 'react';
import { Search, ChevronDown, MoreVertical } from 'lucide-react';
import { User } from '../../types';

interface UsersListProps {
  users: User[];
  onSearch: (term: string) => void;
}

export const UsersList: React.FC<UsersListProps> = ({ users, onSearch }) => {
  const [sortBy, setSortBy] = useState<'username' | 'wpm' | 'games'>('username');
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <div className="bg-white/5 rounded-lg overflow-hidden">
      <div className="p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
          <h2 className="text-lg font-semibold text-text">Users</h2>
          
          <div className="w-full sm:w-auto flex items-center space-x-4">
            <div className="relative flex-1 sm:flex-initial">
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={handleSearch}
                className="w-full sm:w-64 px-4 py-2 pl-10 bg-white/5 rounded-md text-text placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-text-muted" />
            </div>
            
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="appearance-none px-4 py-2 pr-10 bg-white/5 rounded-md text-text focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                <option value="username">Name</option>
                <option value="wpm">WPM</option>
                <option value="games">Games</option>
              </select>
              <ChevronDown className="absolute right-3 top-2.5 h-5 w-5 text-text-muted pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-white/5">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">User</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">Best WPM</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">Games</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">Joined</th>
              <th className="relative px-6 py-3">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-white/5">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                      <span className="text-sm font-medium text-primary">
                        {user.username[0].toUpperCase()}
                      </span>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-text">{user.username}</div>
                      <div className="text-sm text-text-muted">{user.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-text">{user.bestWpm} WPM</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-text">{user.gamesPlayed}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-text-muted">
                  {new Date().toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button className="text-text-muted hover:text-text">
                    <MoreVertical className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};