import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Keyboard, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const Navigation: React.FC = () => {
  const location = useLocation();
  const { user, logout } = useAuth();
  
  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/test', label: 'Type Test' },
    { path: '/developers', label: 'Developers' },
    // Show Admin link only for specific users
    ...(user && (user.email === 'asivasabariganesan@gmail.com' || user.email === '231401004@rajalakshmi.edu.in')
      ? [{ path: '/admin', label: 'Admin' }]
      : []),
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <Keyboard className="w-6 h-6 text-[#e2b714]" />
        <span className="text-xl font-bold text-[#d1d0c5]">ghasatype</span>
      </div>
      <div className="flex items-center space-x-6">
        <nav className="flex space-x-4">
          {navItems.map(item => (
            <Link
              key={item.path}
              to={item.path}
              className={`px-4 py-2 rounded-md transition-all duration-200 ${
                location.pathname === item.path
                  ? 'bg-[#e2b714] text-black'
                  : 'text-[#d1d0c5] hover:bg-white/10'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        {!user && (
          <Link
            to="/login"
            className="px-4 py-2 bg-[#2c2e31] text-[#d1d0c5] rounded-md hover:bg-[#2c2e31]/80 transition-colors text-sm"
          >
            Login
          </Link>
        )}
        {user && (
          <div className="flex items-center space-x-4">
            <Link
              to="/profile"
              className="flex items-center space-x-2 px-4 py-2 bg-[#2c2e31] text-[#d1d0c5] rounded-md hover:bg-[#2c2e31]/80 transition-colors"
            >
              <User className="w-4 h-4" />
              <span>{user.username}</span>
            </Link>
            <button
              onClick={logout}
              className="px-4 py-2 text-[#d1d0c5] hover:text-white transition-colors text-sm"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
