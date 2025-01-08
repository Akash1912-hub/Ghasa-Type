import React, { useState } from 'react';
import { BotConfig, TypingStats } from '../../types';
import { BotSetup } from './BotSetup';
import { BotRace } from './BotRace';

interface BotModeProps {
  words: string[];
  onInput: (value: string) => void;
  stats: TypingStats;
  timeLeft: number;
  onRestart: () => void;
}

export const BotMode: React.FC<BotModeProps> = ({
  words,
  onInput,
  stats,
  timeLeft,
  onRestart,
}) => {
  const [isSetup, setIsSetup] = useState(true);
  const [botConfig, setBotConfig] = useState<BotConfig>({
    speed: 60,
    accuracy: 95,
    consistency: 90
  });

  const handleStart = (config: BotConfig) => {
    setBotConfig(config);
    setIsSetup(false);
    onRestart(); // Reset the test state before starting
  };

  const handleRaceRestart = () => {
    setIsSetup(true);
  };

  if (isSetup) {
    return <BotSetup onStart={handleStart} />;
  }

  return (
    <BotRace
      words={words}
      botConfig={botConfig}
      onInput={onInput}
      stats={stats}
      timeLeft={timeLeft}
      onRestart={handleRaceRestart}
    />
  );
};