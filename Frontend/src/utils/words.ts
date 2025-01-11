import { TestMode, WordMode, WordLength, Language } from '../types';

// Define a type for text-only languages (exclude programming languages)
type TextLanguage = Exclude<Language, 'python' | 'javascript' | 'java'>;

// Words data categorized by language and word length (short, medium, long)
const normalWords: Record<TextLanguage, {
  short: string[];
  medium: string[];
  long: string[];
}> = {
  english: {
    short: ["the", "be", "to", "of", "and", "a", "in", "that", "have", "it"],
    medium: ["about", "there", "right", "think", "would", "first", "after", "work"],
    long: ["different", "important", "something", "education", "following", "computer"]
  },
  tamil: {
    short: ["நான்", "நீ", "அவன்", "அவள்", "அது", "இது", "என்ன", "எப்படி"],
    medium: ["வணக்கம்", "நன்றி", "மன்னிக்கவும்", "சாப்பிடு", "படிக்க"],
    long: ["கணினி", "தமிழ்நாடு", "பல்கலைக்கழகம்", "தொழில்நுட்பம்"]
  },
  hindi: {
    short: ["मैं", "तुम", "वह", "यह", "क्या", "कौन", "कहाँ", "कब"],
    medium: ["नमस्ते", "धन्यवाद", "माफ़ करें", "खाना", "पढ़ना"],
    long: ["कंप्यूटर", "विश्वविद्यालय", "प्रौद्योगिकी", "अभियांत्रिकी"]
  },
  spanish: {
    short: ["el", "la", "de", "que", "y", "en", "un", "ser", "se", "no"],
    medium: ["tiempo", "ahora", "cuando", "hacer", "como", "estar", "tener"],
    long: ["diferente", "importante", "desarrollo", "educación", "siguiente"]
  },
  french: {
    short: ["le", "la", "de", "et", "un", "en", "que", "il", "est", "je"],
    medium: ["temps", "faire", "comme", "être", "avoir", "plus", "voir"],
    long: ["différent", "important", "développement", "éducation", "suivant"]
  },
  german: {
    short: ["der", "die", "das", "und", "in", "zu", "den", "mit", "von"],
    medium: ["machen", "können", "sehen", "gehen", "wissen", "sagen"],
    long: ["unterschied", "wichtig", "entwicklung", "bildung", "folgenden"]
  }
};

// Code examples categorized by programming language
const codeExamples: Record<Exclude<Language, TextLanguage>, string[]> = {
  python: [
    "def sum(a, b):",
    "return a + b",
    "for i in range(5):",
    "print(i)",
    "class Car:",
    "def __init__(self):",
    "self.speed = 0"
  ],
  javascript: [
    "function sum(a, b) {",
    "return a + b;",
    "}",
    "for (let i = 0; i < 5; i++) {",
    "console.log(i);",
    "class Car {",
    "constructor() {"
  ],
  java: [
    "public class Main {",
    "public static void main() {",
    "System.out.println();",
    "for (int i = 0; i < 5; i++) {",
    "private String name;",
    "return value;",
    "class Car extends Vehicle {"
  ]
};

// Main function to get test content based on mode, word length, and language
export function getTestContent(mode: WordMode, wordLength: WordLength, language: Language): string[] {
  // Check if the mode is for coding exercises
  if (mode.startsWith('code-')) {
    const lang = mode.split('-')[1] as keyof typeof codeExamples;
    const codeWords = codeExamples[lang] || [];
    return shuffleArray(codeWords).slice(0, 50);
  }

  // For text-based languages
  const words = normalWords[language as TextLanguage] || normalWords.english;
  let wordPool: string[] = [];

  // Select word pool based on word length
  switch (wordLength) {
    case 'short':
      wordPool = [...words.short];
      break;
    case 'medium':
      wordPool = [...words.medium];
      break;
    case 'long':
      wordPool = [...words.long];
      break;
    default:
      wordPool = [...words.short, ...words.medium, ...words.long];
  }

  // Return shuffled word pool with a limit of 50 words
  return shuffleArray(wordPool).slice(0, 50);
}

// Helper function to shuffle an array
function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];  // Swap elements
  }
  return newArray;
}
