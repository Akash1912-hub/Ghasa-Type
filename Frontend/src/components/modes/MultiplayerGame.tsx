import React, { useState } from 'react';
import { User } from '../../types';
import { Users, Zap } from 'lucide-react';
import { WordDisplay } from '../WordDisplay';

interface MultiplayerGameProps {
  currentUser: User;
  opponent: User;
  words: string[];
  onInput: (value: string) => void;
}

export const MultiplayerGame: React.FC<MultiplayerGameProps> = ({
  currentUser,
  opponent,
  words,
  onInput,
}) => {
  const [userProgress, setUserProgress] = useState(0);
  const [opponentProgress, setOpponentProgress] = useState(0);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Users className="w-5 h-5 text-[#e2b714]" />
          <div className="text-lg font-medium">You vs {opponent.username}</div>
        </div>
        <div className="flex items-center space-x-2">
          <Zap className="w-4 h-4 text-[#e2b714]" />
          <span className="text-sm">Multiplier: x{Math.floor((userProgress / 10) + 1)}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-400">You</span>
            <span className="text-sm">{Math.round(userProgress)}%</span>
          </div>
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <div 
              className="h-full bg-[#e2b714] transition-all duration-300"
              style={{ width: `${userProgress}%` }}
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-400">{opponent.username}</span>
            <span className="text-sm">{Math.round(opponentProgress)}%</span>
          </div>
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <div 
              className="h-full bg-white/30 transition-all duration-300"
              style={{ width: `${opponentProgress}%` }}
            />
          </div>
        </div>
      </div>

      <WordDisplay
        words={words}
        currentIndex={0}
        userInput=""
        isFinished={false}
        wordHistory={[]}
      />
    </div>
  );
};