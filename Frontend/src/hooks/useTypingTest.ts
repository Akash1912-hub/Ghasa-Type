import { useState, useEffect, useCallback } from 'react';
import { TypingStats, TestMode, WordMode, WordLength, Language } from '../types';
import { getTestContent } from '../utils/words';
import { calculateStats } from '../utils/stats';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

export function useTypingTest(
  mode: TestMode, 
  wordMode: WordMode, 
  wordLength: WordLength,
  language: Language
) {
  const { user } = useAuth();
  const [words, setWords] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(parseInt(mode));
  const [startTime, setStartTime] = useState<number | null>(null);
  const [performanceData, setPerformanceData] = useState<Array<{
    timestamp: number;
    wpm: number;
    accuracy: number;
  }>>([]);
  const [wordHistory, setWordHistory] = useState<Array<{
    word: string;
    correct: boolean;
    wpm: number;
    time: number;
  }>>([]);
  const [stats, setStats] = useState<TypingStats>({
    wpm: 0,
    accuracy: 0,
    correctChars: 0,
    incorrectChars: 0,
    time: parseInt(mode),
    raw: 0,
    consistency: 100,
    wordHistory: [],
    performanceData: []
  });

  const initTest = useCallback(() => {
    const newWords = getTestContent(wordMode, wordLength, language);
    setWords(newWords);
    setCurrentIndex(0);
    setUserInput('');
    setIsRunning(false);
    setTimeLeft(parseInt(mode));
    setStartTime(null);
    setWordHistory([]);
    setPerformanceData([]);
    setStats({
      wpm: 0,
      accuracy: 0,
      correctChars: 0,
      incorrectChars: 0,
      time: parseInt(mode),
      raw: 0,
      consistency: 100,
      wordHistory: [],
      performanceData: []
    });
  }, [mode, wordMode, wordLength, language]);

  useEffect(() => {
    initTest();
  }, [mode, wordMode, wordLength, language, initTest]);

  const updateUserStats = useCallback(async (newStats: TypingStats) => {
    if (!user) return;

    try {
      await axios.post('http://localhost:5000/api/auth/user/stats', {
        bestWpm: Math.round(newStats.wpm),
        gamesPlayed: 1,
        accuracy: Math.round(newStats.accuracy),
        totalCharactersTyped: newStats.correctChars + newStats.incorrectChars
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
    } catch (error) {
      console.error('Failed to update user stats:', error);
    }
  }, [user]);

  const handleInput = useCallback(async (value: string) => {
    if (!isRunning && value.length > 0) {
      setIsRunning(true);
      setStartTime(Date.now());
    }

    if (timeLeft === 0) return;

    setUserInput(value);

    if (value.endsWith(' ')) {
      const word = words[currentIndex];
      const typedWord = value.trim();
      
      // Require minimum 3 characters for word completion
      if (typedWord.length < 3) {
        return;
      }

      const isCorrect = typedWord === word;
      const now = Date.now();
      const wordTime = startTime ? (now - startTime) / 1000 : 0;
      const wordWpm = (typedWord.length / 5) / (wordTime / 60);

      const newWordHistory = [...wordHistory, {
        word,
        correct: isCorrect,
        time: wordTime,
        wpm: wordWpm
      }];

      setWordHistory(newWordHistory);
      setCurrentIndex(prev => prev + 1);
      setUserInput('');

      if (startTime) {
        const newStats = calculateStats(
          stats,
          word,
          typedWord,
          now,
          startTime,
          newWordHistory,
          performanceData
        );
        setStats(newStats);

        // Update performance data
        const elapsedTime = (now - startTime) / 1000;
        setPerformanceData(prev => [...prev, {
          timestamp: elapsedTime,
          wpm: newStats.wpm,
          accuracy: newStats.accuracy
        }]);
      }
    }
  }, [currentIndex, isRunning, startTime, stats, timeLeft, wordHistory, words, performanceData]);

  // Timer effect
  useEffect(() => {
    let timer: number;
    if (isRunning && timeLeft > 0) {
      timer = window.setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            setIsRunning(false);
            // Update user stats when test completes
            updateUserStats(stats);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft, stats, updateUserStats]);

  // Performance tracking effect
  useEffect(() => {
    let interval: number;
    if (isRunning && startTime) {
      interval = window.setInterval(() => {
        const now = Date.now();
        const elapsedTime = (now - startTime) / 1000;
        const totalChars = wordHistory.reduce((sum, entry) => 
          sum + (entry.correct ? entry.word.length : 0), 0);
        const currentWpm = (totalChars / 5) / (elapsedTime / 60);
        const currentAccuracy = wordHistory.length > 0
          ? (wordHistory.filter(w => w.correct).length / wordHistory.length) * 100
          : 100;

        setPerformanceData(prev => [...prev, {
          timestamp: elapsedTime,
          wpm: currentWpm,
          accuracy: currentAccuracy
        }]);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, startTime, wordHistory]);

  return {
    words,
    currentIndex,
    userInput,
    isRunning,
    timeLeft,
    stats: { ...stats, performanceData },
    handleInput,
    initTest
  };
}