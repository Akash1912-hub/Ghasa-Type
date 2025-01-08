import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Trophy, Timer, Activity, User as UserIcon } from 'lucide-react';

export const Profile: React.FC = () => {
  const { user, logout } = useAuth();

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#323437] py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Profile Header */}
        <div className="flex items-center space-x-6">
          <div className="w-24 h-24 bg-[#e2b714] rounded-full flex items-center justify-center">
            <UserIcon className="w-12 h-12 text-black" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">{user.username}</h1>
            <p className="text-gray-400">{user.email}</p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-6">
          <div className="bg-white/5 p-6 rounded-lg space-y-4">
            <div className="flex items-center space-x-3">
              <Trophy className="w-6 h-6 text-[#e2b714]" />
              <h3 className="text-lg font-medium text-white">Best WPM</h3>
            </div>
            <p className="text-3xl font-bold text-white">{user.bestWpm}</p>
          </div>

          <div className="bg-white/5 p-6 rounded-lg space-y-4">
            <div className="flex items-center space-x-3">
              <Activity className="w-6 h-6 text-[#e2b714]" />
              <h3 className="text-lg font-medium text-white">Games Played</h3>
            </div>
            <p className="text-3xl font-bold text-white">{user.gamesPlayed}</p>
          </div>
        </div>

        {/* Logout Link */}
        <div className="flex justify-center mt-6">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              logout(); // This will trigger the logout action
            }}
            className="text-red-500 text-lg font-semibold hover:text-red-400"
          >
            Logout
          </a>
        </div>
      </div>
    </div>
  );
};
