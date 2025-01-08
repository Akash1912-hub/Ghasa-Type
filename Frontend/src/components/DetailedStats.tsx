import React from 'react';
import { TypingStats } from '../types';
import { LineChart, Target, Gauge } from 'lucide-react';

interface DetailedStatsProps {
  stats: TypingStats;
}

export const DetailedStats: React.FC<DetailedStatsProps> = ({ stats }) => (
  <div className="grid grid-cols-3 gap-8 border border-white p-4 mt-4">
    <div className="flex items-center space-x-3">
      <LineChart className="w-5 h-5" />
      <div>
        <div className="text-2xl font-bold">{Math.round(stats.raw)}</div>
        <div className="text-xs">raw wpm</div>
      </div>
    </div>
    
    <div className="flex items-center space-x-3">
      <Target className="w-5 h-5" />
      <div>
        <div className="text-2xl font-bold">{Math.round(stats.accuracy)}%</div>
        <div className="text-xs">accuracy</div>
      </div>
    </div>
    
    <div className="flex items-center space-x-3">
      <Gauge className="w-5 h-5" />
      <div>
        <div className="text-2xl font-bold">{Math.round(stats.consistency)}%</div>
        <div className="text-xs">consistency</div>
      </div>
    </div>
  </div>
);