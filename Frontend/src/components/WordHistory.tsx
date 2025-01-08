import React from 'react';
import { WordHistory as WordHistoryType } from '../types';

interface WordHistoryProps {
  history: WordHistoryType[];
}

export const WordHistory: React.FC<WordHistoryProps> = ({ history }) => (
  <div className="mt-4 bg-white/5 rounded-lg p-4">
    <div className="grid grid-cols-4 gap-4">
      {history.map((entry, idx) => (
        <div 
          key={idx} 
          className={`p-2 rounded-md ${
            entry.correct ? 'bg-white/10' : 'bg-red-500/10'
          }`}
        >
          <div className="font-mono text-sm">
            {entry.word}
          </div>
          <div className="text-xs mt-1 text-gray-400">
            {Math.round(entry.wpm)} wpm
          </div>
        </div>
      ))}
    </div>
  </div>
);