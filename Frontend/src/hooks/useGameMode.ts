import { useState, useEffect } from 'react';
import { TestMode, BotConfig, User } from '../types';

interface GameModeState {
  opponent?: User;
  botConfig?: BotConfig;
}

export function useGameMode(mode: TestMode) {
  const [state, setState] = useState<GameModeState>({});

  useEffect(() => {
    if (mode === 'bot') {
      setState({
        botConfig: {
          speed: 60,
          accuracy: 95,
          consistency: 90
        }
      });
    } else if (mode === 'multiplier') {
      // In a real app, this would fetch the opponent from your friends list
      setState({
        opponent: {
          id: '2',
          username: 'Friend',
          email: 'friend@example.com',
          highScore: 0,
          bestWpm: 0,
          gamesPlayed: 0
        }
      });
    }
  }, [mode]);

  return state;
}