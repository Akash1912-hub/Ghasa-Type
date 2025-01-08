import React, { useRef, useEffect } from 'react';
import { WordHistory } from '../types';

interface WordDisplayProps {
  words: string[];
  currentIndex: number;
  userInput: string;
  isFinished: boolean;
  wordHistory: WordHistory[];
  highlightMode?: 'bot' | 'user';
}

export const WordDisplay: React.FC<WordDisplayProps> = ({
  words,
  currentIndex,
  userInput,
  isFinished,
  wordHistory,
  highlightMode = 'user'
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const currentWordRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (currentWordRef.current && containerRef.current) {
      const container = containerRef.current;
      const element = currentWordRef.current;
      const elementRect = element.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();

      if (elementRect.bottom > containerRect.bottom || elementRect.top < containerRect.top) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [currentIndex, userInput]);

  const renderWord = (word: string, index: number) => {
    if (index < currentIndex) {
      const historyEntry = wordHistory[index];
      const isCorrect = historyEntry?.correct ?? false;
      return (
        <span 
          key={index}
          className={`mr-4 text-3xl transition-colors duration-200
            ${isCorrect ? 'text-[#d1d0c5]' : 'text-[#ca4754]'}`}
        >
          {word}
        </span>
      );
    }
    
    if (index === currentIndex) {
      return (
        <span 
          key={index} 
          ref={currentWordRef}
          className="relative mr-4"
        >
          {word.split('').map((char, charIndex) => {
            const isTyped = charIndex < userInput.length;
            const isCorrect = isTyped && char === userInput[charIndex];
            const isCurrentChar = charIndex === userInput.length;
            const isExtra = charIndex >= word.length;
            
            return (
              <span
                key={charIndex}
                className={`text-3xl transition-all duration-150 inline-block
                  ${isExtra ? 'text-[#ca4754]' :
                    isTyped
                      ? isCorrect
                        ? highlightMode === 'bot' ? 'text-white' : 'text-[#d1d0c5]'
                        : highlightMode === 'bot' ? 'text-red-500' : 'text-[#ca4754]'
                      : 'text-[#646669]'
                  } ${isCurrentChar && !isFinished ? 'border-l-2 border-[#d1d0c5] animate-cursor' : ''}`}
              >
                {isExtra ? userInput[charIndex] : char}
              </span>
            );
          })}
          {userInput.length > word.length && (
            <span className="text-[#ca4754] text-3xl">
              {userInput.slice(word.length)}
            </span>
          )}
        </span>
      );
    }
    
    return (
      <span key={index} className="text-[#646669] mr-4 text-3xl">
        {word}
      </span>
    );
  };

  return (
    <div 
      ref={containerRef}
      className="max-w-[950px] mx-auto p-8 font-mono leading-relaxed max-h-[300px] overflow-y-auto scroll-smooth"
    >
      <div className="flex flex-wrap gap-y-6">
        {words.map((word, index) => renderWord(word, index))}
      </div>
    </div>
  );
};