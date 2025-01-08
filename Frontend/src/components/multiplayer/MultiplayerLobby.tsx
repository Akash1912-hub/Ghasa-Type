import React, { useState } from 'react';
import { MultiplayerGame, TestMode, WordMode, WordLength, Language } from '../../types';
import { Users, Bot, Plus } from 'lucide-react';

interface MultiplayerLobbyProps {
  onJoinGame: (gameId: string) => void;
  onCreateGame: (config: Partial<MultiplayerGame>) => void;
  availableGames: MultiplayerGame[];
}

export const MultiplayerLobby: React.FC<MultiplayerLobbyProps> = ({
  onJoinGame,
  onCreateGame,
  availableGames
}) => {
  const [showCreateGame, setShowCreateGame] = useState(false);
  const [gameConfig, setGameConfig] = useState({
    mode: '60' as TestMode,
    wordMode: 'normal' as WordMode,
    wordLength: 'mixed' as WordLength,
    language: 'english' as Language
  });

  return (
    <div className="p-6 bg-[#2c2e31] rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Multiplayer Lobby</h2>
        <button
          onClick={() => setShowCreateGame(!showCreateGame)}
          className="flex items-center space-x-2 px-4 py-2 bg-[#e2b714] text-black rounded-md"
        >
          <Plus className="w-4 h-4" />
          <span>Create Game</span>
        </button>
      </div>

      {showCreateGame && (
        <div className="mb-6 p-4 border border-white/10 rounded-lg">
          {/* Game creation form */}
        </div>
      )}

      <div className="space-y-4">
        {availableGames.map(game => (
          <div
            key={game.id}
            className="flex items-center justify-between p-4 bg-white/5 rounded-lg"
          >
            <div>
              <div className="text-lg font-medium text-white">
                {game.mode}s {game.wordMode} - {game.language}
              </div>
              <div className="text-sm text-gray-400">
                {game.players.length} players waiting
              </div>
            </div>
            <button
              onClick={() => onJoinGame(game.id)}
              className="px-4 py-2 bg-white/10 text-white rounded-md hover:bg-white/20"
            >
              Join Game
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};