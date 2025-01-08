import React, { useState } from 'react';
import { TypingStats } from '../types';
import { BarChart3, Target, Clock, RefreshCw, Zap, History } from 'lucide-react';
import { PerformanceGraph } from './PerformanceGraph';
import { WordHistory } from './WordHistory';

interface ResultsProps {
  stats: TypingStats;
  onRestart: () => void;
}

export const Results: React.FC<ResultsProps> = ({ stats, onRestart }) => {
  const [showHistory, setShowHistory] = useState(false);

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8 animate-fadeIn p-8">
      <div className="grid grid-cols-5 gap-4">
        <StatCard
          icon={BarChart3}
          value={Math.round(stats.wpm)}
          label="WPM"
          primary
        />
        <StatCard
          icon={Target}
          value={Math.round(stats.accuracy)}
          label="Accuracy"
          unit="%"
        />
        <StatCard
          icon={Zap}
          value={Math.round(stats.raw)}
          label="Raw"
          unit="wpm"
        />
        <StatCard
          icon={Target}
          value={Math.round(stats.consistency)}
          label="Consistency"
          unit="%"
        />
        <StatCard
          icon={Clock}
          value={stats.time}
          label="Time"
          unit="s"
        />
      </div>

      <PerformanceGraph data={stats.performanceData} />
      
      <div className="flex justify-between items-center">
        <button
          onClick={() => setShowHistory(!showHistory)}
          className="px-4 py-2 text-sm flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
        >
          <History className="w-4 h-4" />
          <span>{showHistory ? 'Hide' : 'Show'} Word History</span>
        </button>
        
        <button
          onClick={onRestart}
          className="px-6 py-2.5 bg-white text-black rounded-md
                   hover:bg-white/90 transition-colors duration-200
                   flex items-center space-x-2 text-sm font-medium"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Restart Test</span>
        </button>
      </div>

      {showHistory && <WordHistory history={stats.wordHistory} />}
    </div>
  );
};

interface StatCardProps {
  icon: React.FC<{ className?: string }>;
  value: number;
  label: string;
  unit?: string;
  primary?: boolean;
}

const StatCard: React.FC<StatCardProps> = ({ icon: Icon, value, label, unit, primary }) => (
  <div className={`flex flex-col items-center justify-center p-4 rounded-lg ${
    primary ? 'bg-[#e2b714] text-black' : 'bg-white/5'
  }`}>
    <Icon className={`w-5 h-5 mb-2 ${primary ? 'text-black' : 'text-white/60'}`} />
    <div className="text-2xl font-bold">
      {value}{unit}
    </div>
    <div className="text-xs mt-1 opacity-60 uppercase tracking-wider">{label}</div>
  </div>
);