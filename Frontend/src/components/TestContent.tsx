import React from 'react';
import { TestMode, TypingStats } from '../types';
import { BotMode } from './modes/BotMode';
import { Timer } from './Timer';
import { WordDisplay } from './WordDisplay';
import { Results } from './Results';

interface TestContentProps {
  mode: TestMode;
  timeLeft: number;
  words: string[];
  currentIndex: number;
  userInput: string;
  isRunning: boolean;
  stats: TypingStats;
  onInput: (value: string) => void;
  onRestart: () => void;
}

export const TestContent: React.FC<TestContentProps> = ({
  mode,
  timeLeft,
  words,
  currentIndex,
  userInput,
  isRunning,
  stats,
  onInput,
  onRestart,
}) => {
  if (timeLeft === 0) {
    return <Results stats={stats} onRestart={onRestart} />;
  }

  if (mode === 'bot') {
    return (
      <BotMode
        words={words}
        onInput={onInput}
        stats={stats}
        timeLeft={timeLeft}
        onRestart={onRestart}
      />
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] transition-all duration-300">
      <div className="w-full max-w-[950px] relative">
        <Timer time={timeLeft} isRunning={isRunning} onTimeUp={() => null} />
        <WordDisplay
          words={words}
          currentIndex={currentIndex}
          userInput={userInput}
          isFinished={timeLeft === 0}
          wordHistory={stats.wordHistory}
        />
        <input
          type="text"
          value={userInput}
          onChange={(e) => onInput(e.target.value)}
          className="absolute opacity-0 top-0 left-0 h-full w-full cursor-default"
          autoFocus
        />
        <div className="mt-8 text-center text-[#646669] text-sm">
          <kbd className="px-2 py-1 bg-[#2c2e31] rounded">tab</kbd>
          {' + '}
          <kbd className="px-2 py-1 bg-[#2c2e31] rounded">enter</kbd>
          {' - restart test'}
        </div>
      </div>
    </div>
  );
};