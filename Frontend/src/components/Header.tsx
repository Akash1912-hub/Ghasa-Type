import React from 'react';
import { KeyboardIcon } from 'lucide-react';
import { TestMode } from '../types';

interface HeaderProps {
  mode: TestMode;
  onModeChange: (mode: TestMode) => void;
}

export const Header: React.FC<HeaderProps> = ({ mode, onModeChange }) => (
  <header className="p-4">
    <div className="max-w-6xl mx-auto flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <KeyboardIcon className="w-6 h-6 text-[#e2b714]" />
        <span className="text-xl font-bold text-[#d1d0c5]">monkeytype</span>
      </div>
      <div className="space-x-2">
        {(['15', '30', '60'] as TestMode[]).map((t) => (
          <button
            key={t}
            onClick={() => onModeChange(t)}
            className={`px-3 py-1 rounded font-medium ${
              mode === t 
                ? 'text-[#323437] bg-[#e2b714]' 
                : 'text-[#646669] hover:text-[#d1d0c5]'
            }`}
          >
            {t}s
          </button>
        ))}
      </div>
    </div>
  </header>
);