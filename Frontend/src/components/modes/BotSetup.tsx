import React, { useState } from 'react';
import { Bot, Gauge, Target, Zap } from 'lucide-react';
import { BotConfig } from '../../types';

interface BotSetupProps {
  onStart: (config: BotConfig) => void;
}

export const BotSetup: React.FC<BotSetupProps> = ({ onStart }) => {
  const [config, setConfig] = useState<BotConfig>({
    speed: 60,
    accuracy: 95,
    consistency: 90
  });

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white/5 rounded-lg space-y-8">
      <div className="flex items-center space-x-3 mb-6">
        <Bot className="w-6 h-6 text-[#e2b714]" />
        <h2 className="text-xl font-medium">Configure Your Opponent</h2>
      </div>

      <div className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Zap className="w-4 h-4 text-[#e2b714]" />
              <label className="text-sm">Bot Speed (WPM)</label>
            </div>
            <span className="text-sm font-mono">{config.speed} WPM</span>
          </div>
          <input
            type="range"
            min="20"
            max="200"
            value={config.speed}
            onChange={(e) => setConfig(prev => ({ ...prev, speed: parseInt(e.target.value) }))}
            className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-xs text-gray-400">
            <span>Beginner</span>
            <span>Expert</span>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Target className="w-4 h-4 text-[#e2b714]" />
              <label className="text-sm">Accuracy</label>
            </div>
            <span className="text-sm font-mono">{config.accuracy}%</span>
          </div>
          <input
            type="range"
            min="50"
            max="100"
            value={config.accuracy}
            onChange={(e) => setConfig(prev => ({ ...prev, accuracy: parseInt(e.target.value) }))}
            className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer"
          />
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Gauge className="w-4 h-4 text-[#e2b714]" />
              <label className="text-sm">Consistency</label>
            </div>
            <span className="text-sm font-mono">{config.consistency}%</span>
          </div>
          <input
            type="range"
            min="50"
            max="100"
            value={config.consistency}
            onChange={(e) => setConfig(prev => ({ ...prev, consistency: parseInt(e.target.value) }))}
            className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer"
          />
        </div>
      </div>

      <button
        onClick={() => onStart(config)}
        className="w-full py-3 bg-[#e2b714] text-black rounded-md hover:bg-[#e2b714]/90 
                 transition-colors flex items-center justify-center space-x-2"
      >
        <Bot className="w-4 h-4" />
        <span>Start Race</span>
      </button>
    </div>
  );
};