import React, { useState, useEffect } from 'react';
import { Users, Trophy, Activity, Search } from 'lucide-react';
import axios from 'axios';

export const Heart: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [stats, setStats] = useState({
    totalUsers: 0,
    averageWpm: 0,
    totalGamesPlayed: 0
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get('http://localhost:5000/api/admin/users');
        
        if (response.data.users) {
          setUsers(response.data.users);
          setStats(response.data.stats);
        }
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredUsers = users.filter(user => 
    user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-[#323437] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-[#e2b714]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#323437] p-8">
        <div className="max-w-6xl mx-auto">
          <div className="bg-red-500/10 text-red-500 p-4 rounded-lg">
            {error}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#323437] p-4 sm:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#e2b714]">Admin Dashboard</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <div className="bg-white/5 p-6 rounded-lg">
            <div className="flex items-center space-x-3 mb-4">
              <Users className="w-6 h-6 text-[#e2b714]" />
              <h2 className="text-xl font-semibold">Total Users</h2>
            </div>
            <p className="text-3xl font-bold">{stats.totalUsers}</p>
          </div>

          <div className="bg-white/5 p-6 rounded-lg">
            <div className="flex items-center space-x-3 mb-4">
              <Trophy className="w-6 h-6 text-[#e2b714]" />
              <h2 className="text-xl font-semibold">Average WPM</h2>
            </div>
            <p className="text-3xl font-bold">{stats.averageWpm.toFixed(1)}</p>
          </div>

          <div className="bg-white/5 p-6 rounded-lg">
            <div className="flex items-center space-x-3 mb-4">
              <Activity className="w-6 h-6 text-[#e2b714]" />
              <h2 className="text-xl font-semibold">Total Games</h2>
            </div>
            <p className="text-3xl font-bold">{stats.totalGamesPlayed}</p>
          </div>
        </div>

        <div className="bg-white/5 p-6 rounded-lg">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <h2 className="text-xl font-semibold">User List</h2>
            <div className="relative w-full sm:w-64">
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 bg-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#e2b714]"
              />
              <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>

          <div className="overflow-x-auto">
            <div className="inline-block min-w-full align-middle">
              <table className="min-w-full">
                <thead className="bg-white/5">
                  <tr>
                    <th scope="col" className="px-4 py-3 text-left text-sm font-semibold">Username</th>
                    <th scope="col" className="px-4 py-3 text-left text-sm font-semibold hidden sm:table-cell">Email</th>
                    <th scope="col" className="px-4 py-3 text-left text-sm font-semibold">Best WPM</th>
                    <th scope="col" className="px-4 py-3 text-left text-sm font-semibold hidden sm:table-cell">Games</th>
                    <th scope="col" className="px-4 py-3 text-left text-sm font-semibold hidden lg:table-cell">Joined</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {filteredUsers.map(user => (
                    <tr key={user._id} className="hover:bg-white/5">
                      <td className="px-4 py-4 text-sm">{user.username}</td>
                      <td className="px-4 py-4 text-sm hidden sm:table-cell">{user.email}</td>
                      <td className="px-4 py-4 text-sm">{user.bestWpm}</td>
                      <td className="px-4 py-4 text-sm hidden sm:table-cell">{user.gamesPlayed}</td>
                      <td className="px-4 py-4 text-sm hidden lg:table-cell">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {filteredUsers.length === 0 && (
            <div className="text-center py-8 text-gray-400">
              No users found matching your search.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default Heart;