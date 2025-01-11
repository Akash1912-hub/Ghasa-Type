// User and Authentication
export interface User {
  id: string;
  email: string;
  username: string;
  role?: 'user' | 'admin';
  highScore: number;
  bestWpm: number;
  gamesPlayed: number;
  createdAt?: string;
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
}

// Test Modes and Content Types
export type TestMode = '15' | '30' | '60' | 'bot' | 'multiplier';
export type ContentType = 'text' | 'code';
export type ContentDifficulty = 'low' | 'medium' | 'high';
export type WordMode = 'normal' | 'code-python' | 'code-javascript' | 'code-java';
export type WordLength = 'short' | 'medium' | 'long' | 'mixed';
export type Language = 
  | 'english' 
  | 'tamil' 
  | 'hindi' 
  | 'spanish' 
  | 'french' 
  | 'german' 
  | 'python' 
  | 'javascript' 
  | 'java';

// Test Content Structure
export interface TestContent {
  content: string[];
  type: ContentType;
  difficulty: ContentDifficulty;
  language: Language;
}

// Performance Tracking
export interface WordHistory {
  word: string;
  correct: boolean;
  time: number;
  wpm: number;
  typed: string; // Add this field to match WordDisplay requirements
}

export interface PerformanceData {
  timestamp: number;
  wpm: number;
  accuracy: number;
}

export interface TypingStats {
  wpm: number;          // Words per minute
  raw: number;          // Raw WPM (including errors)
  accuracy: number;     // Percentage of correct words
  correctChars: number; // Number of correctly typed characters
  incorrectChars: number; // Number of incorrectly typed characters
  time: number;         // Time elapsed in seconds
  consistency: number;  // Typing consistency percentage
  wordHistory: WordHistory[];
  performanceData: PerformanceData[];
}

// Bot and Multiplayer
export interface BotConfig {
  speed: number;       // Target WPM
  accuracy: number;    // Percentage of correct characters
  consistency: number; // How consistent the bot's typing speed is
}

export interface MultiplayerGame {
  id: string;
  mode: TestMode;
  wordMode: WordMode;
  wordLength: WordLength;
  language: Language;
  players: User[];
  status?: 'waiting' | 'in-progress' | 'completed';
  createdAt?: string;
}

// Theme Configuration
export interface ThemeConfig {
  background: string;
  text: string;
  primary: string;
  error: string;
  success: string;
  muted: string;
}
