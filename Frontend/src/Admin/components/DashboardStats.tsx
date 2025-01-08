import React from 'react';
import { Users, Trophy, Activity, Clock } from 'lucide-react';

interface StatsCardProps {
  icon: React.FC<{ className?: string }>;
  title: string;
  value: string | number;
  trend?: number;
}

const StatsCard: React.FC<StatsCardProps> = ({ icon: Icon, title, value, trend }) => (
  <div className="bg-white/5 rounded-lg p-6">
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <Icon className="h-6 w-6 text-primary" />
        <h3 className="text-sm font-medium text-text-muted">{title}</h3>
      </div>
      {trend && (
        <span className={`text-sm ${trend > 0 ? 'text-green-500' : 'text-red-500'}`}>
          {trend > 0 ? '+' : ''}{trend}%
        </span>
      )}
    </div>
    <p className="mt-4 text-2xl font-semibold text-text">{value}</p>
  </div>
);

interface DashboardStatsProps {
  totalUsers: number;
  averageWpm: number;
  totalGames: number;
  activeUsers: number;
}

export const DashboardStats: React.FC<DashboardStatsProps> = ({
  totalUsers,
  averageWpm,
  totalGames,
  activeUsers
}) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    <StatsCard
      icon={Users}
      title="Total Users"
      value={totalUsers}
      trend={5.27}
    />
    <StatsCard
      icon={Trophy}
      title="Average WPM"
      value={averageWpm.toFixed(1)}
      trend={2.5}
    />
    <StatsCard
      icon={Activity}
      title="Total Games"
      value={totalGames}
      trend={12.5}
    />
    <StatsCard
      icon={Clock}
      title="Active Users"
      value={activeUsers}
      trend={-2.4}
    />
  </div>
);