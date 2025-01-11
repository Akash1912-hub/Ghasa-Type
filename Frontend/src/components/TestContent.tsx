import React, { useRef, useEffect } from 'react';
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
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const isCodeMode = words.some(word => word.includes('    ') || word.includes('class') || word.includes('def'));

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [timeLeft]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && e.getModifierState('Tab')) {
        e.preventDefault();
        onRestart();
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onRestart]);

  const handleBlur = () => {
    setTimeout(() => {
      if (inputRef.current && document.activeElement !== inputRef.current) {
        inputRef.current.focus();
      }
    }, 100);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (isCodeMode && e.key === 'Enter') {
      e.preventDefault();
      const currentWord = words[currentIndex];
      const indentation = currentWord.match(/^\s*/)?.[0] || '';
      onInput(userInput + '\n' + indentation);
    }
  };

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
    <div className="flex flex-col items-center justify-center min-h-[60vh] transition-all duration-300 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-[950px] relative">
        <Timer time={timeLeft} isRunning={isRunning} onTimeUp={() => null} />

        <WordDisplay
          words={words}
          currentIndex={currentIndex}
          userInput={userInput}
          isFinished={timeLeft === 0}
          wordHistory={stats.wordHistory}
        />

        <textarea
          ref={inputRef}
          value={userInput}
          onChange={(e) => onInput(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          className="absolute opacity-0 top-0 left-0 h-full w-full cursor-default resize-none"
          autoComplete="off"
          autoCapitalize="off"
          autoCorrect="off"
          spellCheck={false}
          rows={1}
          autoFocus
        />

        <div className="mt-8 text-center text-[#646669] text-xs sm:text-sm">
          <kbd className="px-2 py-1 bg-[#2c2e31] rounded">tab</kbd>
          {' + '}
          <kbd className="px-2 py-1 bg-[#2c2e31] rounded">enter</kbd>
          {' - restart test'}
          {isCodeMode && (
            <>
              <br />
              <span className="mt-2 block">Press Enter to complete a line of code</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
