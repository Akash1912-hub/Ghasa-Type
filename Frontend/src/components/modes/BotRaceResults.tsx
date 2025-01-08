import React from 'react';
import { Trophy, Bot, Target, Zap } from 'lucide-react';
import { TypingStats } from '../../types';

interface BotRaceResultsProps {
  userStats: TypingStats;
  botStats: TypingStats;
  onRestart: () => void;
}

export const BotRaceResults: React.FC<BotRaceResultsProps> = ({
  userStats,
  botStats,
  onRestart,
}) => {
  const userWpm = Math.round(userStats.wpm);
  const botWpm = Math.round(botStats.wpm);
  const userWon = userWpm > botWpm;

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8 animate-fadeIn">
      <div className="text-center space-y-4">
        <Trophy className={`w-12 h-12 mx-auto ${userWon ? 'text-[#e2b714]' : 'text-gray-400'}`} />
        <h2 className="text-2xl font-bold">
          {userWon ? 'You Won!' : 'Bot Wins!'}
        </h2>
        <p className="text-lg text-gray-400">
          {userWon 
            ? `Congratulations! You beat the bot by ${userWpm - botWpm} WPM`
            : `The bot won by ${botWpm - userWpm} WPM. Try again!`}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-8">
        <div className="space-y-6 p-6 bg-white/5 rounded-lg">
          <div className="flex items-center space-x-3">
            <Target className="w-5 h-5 text-[#e2b714]" />
            <h3 className="text-lg font-medium">Your Results</h3>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-400">WPM</span>
              <span className="text-xl font-bold">{userWpm}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Accuracy</span>
              <span>{Math.round(userStats.accuracy)}%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Consistency</span>
              <span>{Math.round(userStats.consistency)}%</span>
            </div>
          </div>
        </div>

        <div className="space-y-6 p-6 bg-white/5 rounded-lg">
          <div className="flex items-center space-x-3">
            <Bot className="w-5 h-5 text-gray-400" />
            <h3 className="text-lg font-medium">Bot Results</h3>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-400">WPM</span>
              <span className="text-xl font-bold">{botWpm}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Accuracy</span>
              <span>{Math.round(botStats.accuracy)}%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Consistency</span>
              <span>{Math.round(botStats.consistency)}%</span>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={onRestart}
        className="mx-auto flex items-center space-x-2 px-6 py-3 bg-[#e2b714] text-black rounded-md hover:bg-[#e2b714]/90 transition-colors"
      >
        <Zap className="w-4 h-4" />
        <span>Race Again</span>
      </button>
    </div>
  );
};