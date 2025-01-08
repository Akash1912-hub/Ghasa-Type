import React from 'react';
import { Users, Settings, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const AdminHeader: React.FC = () => {
  const { logout } = useAuth();

  return (
    <header className="bg-background-light border-b border-primary/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Users className="h-8 w-8 text-primary" />
            <span className="ml-2 text-xl font-semibold text-text">Admin Dashboard</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <button
              className="p-2 text-text-muted hover:text-text transition-colors"
              title="Settings"
            >
              <Settings className="h-5 w-5" />
            </button>
            
            <button
              onClick={logout}
              className="flex items-center space-x-2 px-4 py-2 rounded-md bg-primary/10 hover:bg-primary/20 text-primary transition-colors"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};