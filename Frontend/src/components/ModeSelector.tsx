import React from 'react';
import { TestMode, WordMode, WordLength } from '../types';

interface ModeSelectorProps {
  mode: TestMode;
  wordMode: WordMode;
  wordLength: WordLength;
  onModeChange: (mode: TestMode) => void;
  onWordModeChange: (mode: WordMode) => void;
  onWordLengthChange: (length: WordLength) => void;
}

export const ModeSelector: React.FC<ModeSelectorProps> = ({
  mode,
  wordMode,
  wordLength,
  onModeChange,
  onWordModeChange,
  onWordLengthChange
}) => (
  <div className="flex space-x-8">
    <div className="space-x-2">
      {(['15', '30', '60'] as TestMode[]).map((t) => (
        <button
          key={t}
          onClick={() => onModeChange(t)}
          className={`px-4 py-2 border ${
            mode === t 
              ? 'bg-white text-black' 
              : 'border-white text-white hover:bg-white hover:text-black'
          }`}
        >
          {t}s
        </button>
      ))}
    </div>

    <div className="space-x-2">
      {(['normal', 'code-python', 'code-java'] as WordMode[]).map((w) => (
        <button
          key={w}
          onClick={() => onWordModeChange(w)}
          className={`px-4 py-2 border ${
            wordMode === w
              ? 'bg-white text-black'
              : 'border-white text-white hover:bg-white hover:text-black'
          }`}
        >
          {w}
        </button>
      ))}
    </div>

    <div className="space-x-2">
      {(['short', 'medium', 'long', 'mixed'] as WordLength[]).map((l) => (
        <button
          key={l}
          onClick={() => onWordLengthChange(l)}
          className={`px-4 py-2 border ${
            wordLength === l
              ? 'bg-white text-black'
              : 'border-white text-white hover:bg-white hover:text-black'
          }`}
        >
          {l}
        </button>
      ))}
    </div>
  </div>
);