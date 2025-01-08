import React from 'react';
import { TestMode } from '../types';
import { Timer, Bot, Users } from 'lucide-react';

interface TestOptionsProps {
  mode: TestMode;
  onModeChange: (mode: TestMode) => void;
  isTyping?: boolean;
}

export const TestOptions: React.FC<TestOptionsProps> = ({ 
  mode, 
  onModeChange,
  isTyping = false
}) => {
  const modes: { value: TestMode; label: string; icon?: React.ReactNode }[] = [
    { value: '15', label: '15' },
    { value: '30', label: '30' },
    { value: '60', label: '60' },
    { value: 'bot', label: 'Bot Race', icon: <Bot className="w-4 h-4" /> },
    { 
      value: 'multiplier', 
      label: 'Multiplayer', 
      icon: <Users className="w-4 h-4" />,
      comingSoon: true 
    }
  ];

  return (
    <div className="flex items-center space-x-2">
      {modes.map(({ value, label, icon, comingSoon }) => (
        <button
          key={value}
          onClick={() => !isTyping && !comingSoon && onModeChange(value)}
          disabled={isTyping || comingSoon}
          className={`
            px-4 py-2 text-sm transition-colors flex items-center space-x-2 rounded-md
            ${isTyping || comingSoon ? 'opacity-50 cursor-not-allowed' : 'hover:bg-white/10'}
            ${mode === value ? 'bg-white/10 text-[#e2b714]' : 'text-[#646669]'}
            ${comingSoon ? 'relative' : ''}
          `}
        >
          {icon && <span>{icon}</span>}
          <span>{label}</span>
          {comingSoon && (
            <span className="absolute -top-2 -right-2 text-xs bg-[#e2b714] text-black px-2 py-0.5 rounded-full">
              Soon
            </span>
          )}
        </button>
      ))}
    </div>
  );
};