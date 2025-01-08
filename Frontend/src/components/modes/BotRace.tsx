import React, { useState, useEffect } from 'react';
import { Bot, User, Timer } from 'lucide-react';
import { BotConfig, TypingStats } from '../../types';
import { WordDisplay } from '../WordDisplay';
import { BotRaceResults } from './BotRaceResults';
import { calculateBotProgress } from '../../utils/botTyping';

interface BotRaceProps {
  words: string[];
  botConfig: BotConfig;
  onInput: (value: string) => void;
  stats: TypingStats;
  timeLeft: number;
  onRestart: () => void;
}

export const BotRace: React.FC<BotRaceProps> = ({
  words,
  botConfig,
  onInput,
  stats,
  timeLeft,
  onRestart,
}) => {
  const [phase, setPhase] = useState<'countdown' | 'bot' | 'user' | 'results'>('countdown');
  const [botProgress, setBotProgress] = useState(0);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [phaseTime, setPhaseTime] = useState(30);
  const [botTypedText, setBotTypedText] = useState('');
  const [userInput, setUserInput] = useState('');
  const [countdown, setCountdown] = useState(3);
  const [botStats, setBotStats] = useState<TypingStats>({
    wpm: 0,
    accuracy: 0,
    correctChars: 0,
    incorrectChars: 0,
    time: 30,
    raw: 0,
    consistency: 100,
    wordHistory: [],
    performanceData: []
  });

  const fullText = words.join(' ');

  useEffect(() => {
    if (phase === 'countdown') {
      const timer = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            setPhase('bot');
            setStartTime(Date.now());
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }

    if (phase === 'bot' && startTime) {
      const interval = setInterval(() => {
        const elapsedTime = (Date.now() - startTime) / 1000;
        const { progress, typedText, errors } = calculateBotProgress(
          botConfig,
          elapsedTime,
          fullText.length,
          fullText
        );
        
        setBotProgress(progress);
        setBotTypedText(typedText);

        // Update bot's stats
        const wpm = (botConfig.speed * progress) / 100;
        const accuracy = ((typedText.length - errors) / (typedText.length || 1)) * 100;

        setBotStats(prev => ({
          ...prev,
          wpm,
          accuracy,
          correctChars: typedText.length - errors,
          incorrectChars: errors,
          performanceData: [
            ...prev.performanceData,
            {
              timestamp: elapsedTime,
              wpm,
              accuracy
            }
          ]
        }));

        const remainingTime = 30 - Math.floor(elapsedTime);
        setPhaseTime(Math.max(0, remainingTime));

        if (elapsedTime >= 30) {
          setPhase('user');
          setStartTime(Date.now());
          setPhaseTime(30);
          setUserInput('');
        }
      }, 50);

      return () => clearInterval(interval);
    }

    if (phase === 'user' && startTime) {
      const interval = setInterval(() => {
        const elapsedTime = (Date.now() - startTime) / 1000;
        const remainingTime = 30 - Math.floor(elapsedTime);
        setPhaseTime(Math.max(0, remainingTime));

        if (elapsedTime >= 30) {
          setPhase('results');
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [phase, startTime, botConfig, words, fullText]);

  if (phase === 'countdown') {
    return (
      <div className="text-center space-y-8">
        <div className="text-6xl font-bold text-[#e2b714] animate-pulse">
          {countdown}
        </div>
        <div className="bg-white/5 p-6 rounded-lg">
          <WordDisplay
            words={words}
            currentIndex={0}
            userInput=""
            isFinished={false}
            wordHistory={[]}
            highlightMode="user"
          />
        </div>
      </div>
    );
  }

  if (phase === 'results') {
    return (
      <BotRaceResults
        userStats={stats}
        botStats={botStats}
        onRestart={onRestart}
      />
    );
  }

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
        <div className="flex items-center space-x-2">
          <Timer className="w-4 h-4" />
          <span className="text-xl font-mono">{phaseTime}s</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-8">
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-sm text-gray-400">Bot</span>
            <span className="text-sm">{Math.round(botStats.wpm)} WPM</span>
          </div>
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-white/30 transition-all duration-300"
              style={{ width: `${botProgress}%` }}
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-sm text-gray-400">You</span>
            <span className="text-sm">{Math.round(stats.wpm)} WPM</span>
          </div>
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#e2b714] transition-all duration-300"
              style={{ 
                width: `${(stats.correctChars / fullText.length) * 100}%` 
              }}
            />
          </div>
        </div>
      </div>

      <div className="bg-white/5 p-6 rounded-lg">
        <WordDisplay
          words={words}
          currentIndex={phase === 'bot' ? Math.floor(botTypedText.length / 5) : stats.wordHistory.length}
          userInput={phase === 'bot' ? botTypedText : userInput}
          isFinished={false}
          wordHistory={phase === 'bot' ? [] : stats.wordHistory}
          highlightMode={phase === 'bot' ? 'bot' : 'user'}
        />
      </div>

      {phase === 'user' && (
        <input
          type="text"
          value={userInput}
          onChange={(e) => {
            setUserInput(e.target.value);
            onInput(e.target.value);
          }}
          className="w-24 bg-transparent border-none outline-none caret-[#e2b714] text-transparent absolute"
          autoFocus
        />
      )}
    </div>
  );
};