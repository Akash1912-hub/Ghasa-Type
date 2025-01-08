import React, { useState } from 'react';
import { TestHeader } from '../components/TestHeader';
import { TestContent } from '../components/TestContent';
import { TestMode, WordMode, WordLength, Language } from '../types';
import { useTypingTest } from '../hooks/useTypingTest';

export const TypingTest: React.FC = () => {
  const [mode, setMode] = useState<TestMode>('30');
  const [wordMode, setWordMode] = useState<WordMode>('normal');
  const [wordLength, setWordLength] = useState<WordLength>('mixed');
  const [language, setLanguage] = useState<Language>('english');

  const {
    words,
    currentIndex,
    userInput,
    isRunning,
    timeLeft,
    stats,
    handleInput,
    initTest
  } = useTypingTest(mode, wordMode, wordLength, language);

  return (
    <div className="min-h-screen bg-[#323437]">
      <TestHeader
        mode={mode}
        wordMode={wordMode}
        wordLength={wordLength}
        language={language}
        onModeChange={setMode}
        onWordModeChange={setWordMode}
        onWordLengthChange={setWordLength}
        onLanguageChange={setLanguage}
        isTyping={isRunning}
      />
      <div className="max-w-[1200px] mx-auto px-6 py-8">
        <TestContent
          mode={mode}
          timeLeft={timeLeft}
          words={words}
          currentIndex={currentIndex}
          userInput={userInput}
          isRunning={isRunning}
          stats={stats}
          onInput={handleInput}
          onRestart={initTest}
        />
      </div>
    </div>
  );
};