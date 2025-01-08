import React, { useState } from 'react';
import { BotConfig } from '../../types';
import { Bot, Settings } from 'lucide-react';

interface BotPlayerProps {
  onConfigChange: (config: BotConfig) => void;
}

export const BotPlayer: React.FC<BotPlayerProps> = ({ onConfigChange }) => {
  const [config, setConfig] = useState<BotConfig>({
    speed: 60,
    accuracy: 95,
    consistency: 90
  });

  const handleChange = (key: keyof BotConfig, value: number) => {
    const newConfig = { ...config, [key]: value };
    setConfig(newConfig);
    onConfigChange(newConfig);
  };

  return (
    <div className="p-4 bg-white/5 rounded-lg">
      <div className="flex items-center space-x-2 mb-4">
        <Bot className="w-5 h-5 text-[#e2b714]" />
        <h3 className="text-lg font-medium text-white">Bot Configuration</h3>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm text-gray-400 mb-1">Speed (WPM)</label>
          <input
            type="range"
            min="20"
            max="200"
            value={config.speed}
            onChange={(e) => handleChange('speed', parseInt(e.target.value))}
            className="w-full"
          />
          <div className="text-sm text-white">{config.speed} WPM</div>
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-1">Accuracy (%)</label>
          <input
            type="range"
            min="50"
            max="100"
            value={config.accuracy}
            onChange={(e) => handleChange('accuracy', parseInt(e.target.value))}
            className="w-full"
          />
          <div className="text-sm text-white">{config.accuracy}%</div>
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-1">Consistency (%)</label>
          <input
            type="range"
            min="50"
            max="100"
            value={config.consistency}
            onChange={(e) => handleChange('consistency', parseInt(e.target.value))}
            className="w-full"
          />
          <div className="text-sm text-white">{config.consistency}%</div>
        </div>
      </div>
    </div>
  );
};