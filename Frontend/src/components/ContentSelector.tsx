import React from 'react';
import { ContentType, ContentDifficulty, Language } from '../types';

interface ContentSelectorProps {
  contentType: ContentType;
  difficulty: ContentDifficulty;
  language: Language;
  onContentTypeChange: (type: ContentType) => void;
  onDifficultyChange: (difficulty: ContentDifficulty) => void;
  onLanguageChange: (language: Language) => void;
}

export const ContentSelector: React.FC<ContentSelectorProps> = ({
  contentType,
  difficulty,
  language,
  onContentTypeChange,
  onDifficultyChange,
  onLanguageChange
}) => (
  <div className="flex space-x-8 mb-8">
    <div className="space-x-2">
      {(['text', 'code'] as ContentType[]).map((type) => (
        <button
          key={type}
          onClick={() => onContentTypeChange(type)}
          className={`px-4 py-2 border ${
            contentType === type
              ? 'bg-white text-black'
              : 'border-white text-white hover:bg-white hover:text-black'
          }`}
        >
          {type}
        </button>
      ))}
    </div>

    <div className="space-x-2">
      {(['low', 'medium', 'high'] as ContentDifficulty[]).map((diff) => (
        <button
          key={diff}
          onClick={() => onDifficultyChange(diff)}
          className={`px-4 py-2 border ${
            difficulty === diff
              ? 'bg-white text-black'
              : 'border-white text-white hover:bg-white hover:text-black'
          }`}
        >
          {diff}
        </button>
      ))}
    </div>

    <div className="space-x-2">
      {(['english', 'python', 'javascript', 'java'] as Language[]).map((lang) => (
        <button
          key={lang}
          onClick={() => onLanguageChange(lang)}
          className={`px-4 py-2 border ${
            language === lang
              ? 'bg-white text-black'
              : 'border-white text-white hover:bg-white hover:text-black'
          }`}
        >
          {lang}
        </button>
      ))}
    </div>
  </div>
);