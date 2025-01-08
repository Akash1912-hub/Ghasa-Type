import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Background } from './Background';
import { Timer } from './Timer';
import { WordDisplay } from './WordDisplay';
import { Results } from './Results';
import { BotMode } from './modes/BotMode';
import { MultiplayerGame } from './modes/MultiplayerGame';
import { TypingStats, TestMode, User } from '../types';

interface TypingTestProps {
  mode: TestMode;
  timeLeft: number;
  words: string[];
  currentIndex: number;
  userInput: string;
  isRunning: boolean;
  stats: TypingStats;
  onInput: (value: string) => void;
  onRestart: () => void;
  opponent?: User;
}

export const TypingTest: React.FC<TypingTestProps> = ({
  mode,
  timeLeft,
  words,
  currentIndex,
  userInput,
  isRunning,
  stats,
  onInput,
  onRestart,
  opponent
}) => {
  const renderContent = () => {
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

    if (mode === 'multiplier' && opponent) {
      return (
        <MultiplayerGame
          currentUser={{ id: '1', email: '', username: 'You', highScore: 0, bestWpm: 0, gamesPlayed: 0 }}
          opponent={opponent}
          words={words}
          onInput={onInput}
        />
      );
    }

    return (
      <div className="w-full animate-fadeIn">
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
          className="w-24 bg-transparent border-none outline-none caret-primary text-transparent absolute"
          autoFocus
        />
      </div>
    );
  };

  return (
    <div className="fixed inset-0 flex">
      <Canvas className="fixed inset-0 -z-10">
        <Background />
      </Canvas>
      <main className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-4xl backdrop-blur-sm bg-background/80 rounded-lg p-8">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};