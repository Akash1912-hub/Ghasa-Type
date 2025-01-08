export type TestMode = '15' | '30' | '60' | '100' | 'multiplier' | 'bot';
export type WordMode = 'normal' | 'code-python' | 'code-javascript' | 'code-java' | 'code-rust' | 'code-cpp';
export type WordLength = 'short' | 'medium' | 'long' | 'mixed';
export type Language = 'english' | 'spanish' | 'french' | 'german' | 'tamil' | 'hindi';

export interface User {
  id: string;
  email: string;
  username: string;
  highScore: number;
  bestWpm: number;
  gamesPlayed: number;
  friends?: string[];
}

export interface BotConfig {
  speed: number; // WPM
  accuracy: number; // 0-100
  consistency: number; // 0-100
}

export interface MultiplayerGame {
  id: string;
  players: Player[];
  status: 'waiting' | 'starting' | 'active' | 'finished';
  mode: TestMode;
  wordMode: WordMode;
  wordLength: WordLength;
  language: Language;
}

export interface Player {
  id: string;
  username: string;
  progress: number;
  wpm: number;
  accuracy: number;
  isBot?: boolean;
  botConfig?: BotConfig;
}

export interface TypingStats {
  wpm: number;
  raw: number;
  accuracy: number;
  correctChars: number;
  incorrectChars: number;
  time: number;
  consistency: number;
  wordHistory: WordHistory[];
  performanceData: PerformanceData[];
  multiplier?: number; // Added for multiplier mode
}

export interface WordHistory {
  word: string;
  correct: boolean;
  wpm: number;
  time: number;
}

export interface PerformanceData {
  timestamp: number;
  wpm: number;
  accuracy: number;
}
export interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
}

// Update your existing User interface if needed
export interface User {
  id: string;
  email: string;
  username: string;
  role?: 'user' | 'admin';
  highScore: number;
  bestWpm: number;
  gamesPlayed: number;
}