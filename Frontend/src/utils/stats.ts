import { TypingStats, WordHistory, PerformanceData } from '../types';

export function calculateStats(
  prevStats: TypingStats,
  text: string,
  userInput: string,
  now: number,
  startTime: number,
  wordHistory: WordHistory[],
  performanceData: PerformanceData[]
): TypingStats {
  const totalTime = (now - startTime) / 1000;
  const words = wordHistory.length;
  const correctWords = wordHistory.filter(w => w.correct).length;
  
  // Calculate correct and incorrect characters
  let correctChars = 0;
  let incorrectChars = 0;
  
  wordHistory.forEach(entry => {
    if (entry.correct) {
      correctChars += entry.word.length;
    } else {
      incorrectChars += entry.word.length;
    }
  });

  const wpm = (correctChars / 5) / (totalTime / 60);
  const raw = ((correctChars + incorrectChars) / 5) / (totalTime / 60);
  const accuracy = words > 0 ? (correctWords / words) * 100 : 100;

  // Calculate consistency based on WPM variance
  const wpms = wordHistory.map(w => w.wpm).filter(wpm => !isNaN(wpm) && isFinite(wpm));
  const avgWpm = wpms.length > 0 
    ? wpms.reduce((a, b) => a + b, 0) / wpms.length 
    : 0;
  const variance = wpms.length > 0
    ? wpms.reduce((a, b) => a + Math.pow(b - avgWpm, 2), 0) / wpms.length
    : 0;
  const consistency = Math.max(0, 100 - (variance / (avgWpm || 1) * 10));

  return {
    wpm,
    raw,
    accuracy,
    correctChars,
    incorrectChars,
    time: Math.round(totalTime),
    consistency: Number.isFinite(consistency) ? Math.round(consistency) : 100,
    wordHistory,
    performanceData
  };
}