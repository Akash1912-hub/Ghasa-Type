import { TestMode, WordMode, WordLength, Language } from '../types';

const normalWords = {
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

// Fixed type declarations for code examples
type Difficulty = 'basic' | 'intermediate' | 'advanced';
type CodeSet = { [K in Difficulty]?: string[] };

const codeExamples: { [key: string]: CodeSet } = {
  java: {
    basic: [
      "public class Calculator {",
      "    private int result = 0;",
      "",
      "    public void add(int num) {",
      "        this.result += num;",
      "    }",
      "",
      "    public int getResult() {",
      "        return this.result;",
      "    }",
      "}"
    ],
    intermediate: [
      "import java.util.Scanner;",
      "",
      "public class UserInput {",
      "    public static void main(String[] args) {",
      "        Scanner scanner = new Scanner(System.in);",
      "        System.out.println(\"Enter your name:\");",
      "        String name = scanner.nextLine();",
      "        System.out.println(\"Hello, \" + name);",
      "        scanner.close();",
      "    }",
      "}"
    ],
    advanced: [
      "public class UserCounter {",
      "    private static int userCount = 0;",
      "",
      "    public static void main(String[] args) {",
      "        Scanner scanner = new Scanner(System.in);",
      "",
      "        while (true) {",
      "            System.out.println(\"1: Add user, 0: Exit\");",
      "            int choice = scanner.nextInt();",
      "",
      "            if (choice == 1) {",
      "                userCount++;",
      "                System.out.println(\"Users: \" + userCount);",
      "            } else if (choice == 0) {",
      "                break;",
      "            }",
      "        }",
      "",
      "        scanner.close();",
      "    }",
      "}"
    ]
  },
  python: {
    basic: [
      "def calculate_sum(numbers):",
      "    total = 0",
      "    for num in numbers:",
      "        total += num",
      "    return total",
      "",
      "numbers = [1, 2, 3, 4, 5]",
      "result = calculate_sum(numbers)",
      "print(f\"Sum: {result}\")"
    ],
    intermediate: [
      "class UserManager:",
      "    def __init__(self):",
      "        self.users = []",
      "",
      "    def add_user(self, username):",
      "        if username not in self.users:",
      "            self.users.append(username)",
      "            return True",
      "        return False",
      "",
      "    def get_user_count(self):",
      "        return len(self.users)"
    ]
  },
  javascript: {
    basic: [
      "class Calculator {",
      "    constructor() {",
      "        this.result = 0;",
      "    }",
      "",
      "    add(num) {",
      "        this.result += num;",
      "    }",
      "",
      "    getResult() {",
      "        return this.result;",
      "    }",
      "}"
    ],
    intermediate: [
      "function processUsers(users) {",
      "    return users",
      "        .filter(user => user.active)",
      "        .map(user => ({",
      "            ...user,",
      "            lastLogin: new Date()",
      "        }));",
      "}"
    ]
  }
};

export function getTestContent(mode: WordMode, wordLength: WordLength, language: Language): string[] {
  if (mode.startsWith('code-')) {
    const lang = mode.split('-')[1] as keyof typeof codeExamples;
    const difficulty: Difficulty = wordLength === 'short' ? 'basic' : 
                                 wordLength === 'medium' ? 'intermediate' : 'advanced';
    
    if (codeExamples[lang]) {
      // Get the code set for the language
      const codeSet = codeExamples[lang];
      
      // Safe access with fallback logic
      if (difficulty === 'advanced' && !codeSet.advanced) {
        return codeSet.intermediate || codeSet.basic || [];
      }
      
      return codeSet[difficulty] || codeSet.basic || [];
    }
    return [];
  }

  // Regular word typing logic
  const words = normalWords[language] || normalWords.english;
  let wordPool: string[] = [];

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

  return shuffleArray(wordPool).slice(0, 50);
}

function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}