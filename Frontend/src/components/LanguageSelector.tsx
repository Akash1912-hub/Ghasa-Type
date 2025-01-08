import React from 'react';
import { Language } from '../types';
import { Globe } from 'lucide-react';
import { Dropdown } from './Dropdown';

interface LanguageSelectorProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  isTyping?: boolean;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({ 
  language, 
  onLanguageChange,
  isTyping = false
}) => (
  <div className="flex items-center space-x-4">
    <div className="flex items-center space-x-2 text-sm text-gray-400">
      <Globe className="w-4 h-4" />
    </div>
    <Dropdown
      label="Language"
      options={['english', 'spanish', 'french', 'german', 'tamil', 'hindi']}
      value={language}
      onChange={(value) => onLanguageChange(value as Language)}
      disabled={isTyping}
    />
  </div>
);