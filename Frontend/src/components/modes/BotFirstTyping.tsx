import React, { useState, useEffect } from 'react';
import { Bot, User } from 'lucide-react';
import { BotConfig, TypingStats } from '../../types';
import { WordDisplay } from '../WordDisplay';
import { calculateBotProgress } from '../../utils/botTyping';

interface BotFirstTypingProps {
  words: string[];
  onInput: (value: string) => void;
  stats: TypingStats;
  timeLeft: number;
  onRestart: () => void;
}

export const BotFirstTyping: React.FC<BotFirstTypingProps> = ({
  words,
  onInput,
  stats,
  timeLeft,
  onRestart,
}) => {
  const [phase, setPhase] = useState<'bot' | 'user'>('bot');
  const [botProgress, setBotProgress] = useState(0);
  const [startTime] = useState(Date.now());

  const botConfig: BotConfig = {
    speed: 60,
    accuracy: 95,
    consistency: 90
  };

  useEffect(() => {
    if (phase === 'bot') {
      const interval = setInterval(() => {
        const elapsedTime = (Date.now() - startTime) / 1000;
        const totalLength = words.join(' ').length;
        const progress = calculateBotProgress(botConfig, elapsedTime, totalLength);
        setBotProgress(progress);

        if (elapsedTime >= 30) {
          setPhase('user');
        }
      }, 50);

      return () => clearInterval(interval);
    }
  }, [phase, words, startTime]);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          {phase === 'bot' ? (
            <Bot className="w-5 h-5 text-[#e2b714]" />
          ) : (
            <User className="w-5 h-5 text-[#e2b714]" />
          )}
          <div className="text-lg font-medium">
            {phase === 'bot' ? 'Bot is typing...' : 'Your turn!'}
          </div>
        </div>
        <div className="text-sm text-gray-400">
          {phase === 'bot' ? '30s bot phase' : '30s your phase'}
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-400">Progress</span>
          <span className="text-sm">
            {Math.round(phase === 'bot' ? botProgress : (stats.correctChars / words.join(' ').length) * 100)}%
          </span>
        </div>
        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
          <div 
            className={`h-full transition-all duration-300 ${
              phase === 'bot' ? 'bg-white/30' : 'bg-[#e2b714]'
            }`}
            style={{ 
              width: `${phase === 'bot' 
                ? botProgress 
                : (stats.correctChars / words.join(' ').length) * 100}%` 
            }}
          />
        </div>
      </div>

      <WordDisplay
        words={words}
        currentIndex={stats.wordHistory.length}
        userInput={phase === 'user' ? '' : ''}
        isFinished={timeLeft === 0}
        wordHistory={stats.wordHistory}
      />

      {phase === 'user' && (
        <input
          type="text"
          value={''}
          onChange={(e) => onInput(e.target.value)}
          className="w-24 bg-transparent border-none outline-none caret-[#e2b714] text-transparent absolute"
          autoFocus
        />
      )}
    </div>
  );
};