import React from 'react';

interface TimerProps {
  time: number;
  isRunning: boolean;
  onTimeUp: () => void;
}

export const Timer: React.FC<TimerProps> = ({ time, isRunning }) => {
  const formattedTime = Number.isFinite(time) ? time.toString() : '0';
  
  return (
    <div className={`text-4xl font-mono text-[#e2b714] mb-8 text-center transition-opacity duration-300 
      ${isRunning ? 'opacity-100' : 'opacity-75 hover:opacity-100'}`}
    >
      <span className="inline-block animate-[scale_500ms_ease-in-out] transition-transform" key={formattedTime}>
        {formattedTime}
      </span>
    </div>
  );
};