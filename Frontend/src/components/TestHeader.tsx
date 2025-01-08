import React from 'react';
import { TestMode, WordMode, WordLength, Language } from '../types';
import { TestOptions } from './TestOptions';
import { LanguageSelector } from './LanguageSelector';
import { TextOptions } from './TextOptions';

interface TestHeaderProps {
  mode: TestMode;
  wordMode: WordMode;
  wordLength: WordLength;
  language: Language;
  onModeChange: (mode: TestMode) => void;
  onWordModeChange: (mode: WordMode) => void;
  onWordLengthChange: (length: WordLength) => void;
  onLanguageChange: (lang: Language) => void;
  isTyping?: boolean;
}

export const TestHeader: React.FC<TestHeaderProps> = (props) => {
  return (
    <header className="bg-[#323437]">
      <div className="max-w-6xl mx-auto">
        <div className="p-4 flex items-center justify-between">
          <TestOptions {...props} />
          <div className="flex items-center space-x-4">
            <TextOptions {...props} />
            <LanguageSelector {...props} />
          </div>
        </div>
      </div>
    </header>
  );
};
