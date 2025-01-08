import React from 'react';
import { WordMode, WordLength } from '../types';
import { Type, Code } from 'lucide-react';
import { Dropdown } from './Dropdown';

interface TextOptionsProps {
  wordMode: WordMode;
  wordLength: WordLength;
  onWordModeChange: (mode: WordMode) => void;
  onWordLengthChange: (length: WordLength) => void;
  isTyping?: boolean;
}

export const TextOptions: React.FC<TextOptionsProps> = ({
  wordMode,
  wordLength,
  onWordModeChange,
  onWordLengthChange,
  isTyping = false
}) => {
  const modes = ['normal', 'code-python', 'code-javascript', 'code-java'] as WordMode[];
  const lengths = ['short', 'medium', 'long', 'mixed'] as WordLength[];

  return (
    <div className="flex items-center space-x-8">
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2 text-sm text-[#646669]">
          <Type className="w-4 h-4" />
        </div>
        <Dropdown
          label="Type"
          options={modes.map(m => m === 'normal' ? 'Text' : m.split('-')[1])}
          value={wordMode === 'normal' ? 'Text' : wordMode.split('-')[1]}
          onChange={(value) => onWordModeChange(value === 'Text' ? 'normal' : `code-${value.toLowerCase()}` as WordMode)}
          disabled={isTyping}
        />
      </div>

      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2 text-sm text-[#646669]">
          <Code className="w-4 h-4" />
        </div>
        <Dropdown
          label="Length"
          options={lengths}
          value={wordLength}
          onChange={(value) => onWordLengthChange(value as WordLength)}
          disabled={isTyping}
        />
      </div>
    </div>
  );
};