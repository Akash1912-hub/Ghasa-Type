import { ContentType, ContentDifficulty, Language, TestContent } from '../types';

const codeSnippets = {
  python: {
    low: [
      ["def add_numbers(a, b):", "    return a + b", "", "result = add_numbers(5, 3)"],
      ["for i in range(5):", "    print(i)"],
    ],
    medium: [
      ["def factorial(n):", "    if n == 0:", "        return 1", "    return n * factorial(n - 1)"],
      ["class Calculator:", "    def __init__(self):", "        self.value = 0", "", "    def add(self, x):", "        self.value += x"],
    ],
    high: [
      ["def quicksort(arr):", "    if len(arr) <= 1:", "        return arr", "    pivot = arr[len(arr) // 2]", "    left = [x for x in arr if x < pivot]", "    middle = [x for x in arr if x == pivot]", "    right = [x for x in arr if x > pivot]", "    return quicksort(left) + middle + quicksort(right)"],
    ]
  },
  javascript: {
    low: [
      ["function addNumbers(a, b) {", "  return a + b;", "}", "", "const result = addNumbers(5, 3);"],
      ["for (let i = 0; i < 5; i++) {", "  console.log(i);", "}"],
    ],
    medium: [
      ["const numbers = [1, 2, 3, 4, 5];", "const doubled = numbers.map(num => num * 2);", "console.log(doubled);"],
    ],
    high: [
      ["class BinarySearchTree {", "  constructor() {", "    this.root = null;", "  }", "", "  insert(value) {", "    const newNode = { value, left: null, right: null };", "    if (!this.root) {", "      this.root = newNode;", "      return;", "    }", "    // ... more implementation", "  }", "}"]
    ]
  }
};

const textContent = {
  english: {
    low: [
      "The cat sat on the mat.",
      "I like to read books.",
    ],
    medium: [
      "The quick brown fox jumps over the lazy dog.",
      "Programming is the art of telling another human what one wants the computer to do.",
    ],
    high: [
      "The intricate complexities of modern software development require a deep understanding of various programming paradigms and architectural patterns.",
    ]
  }
};

export function getContent(
  type: ContentType,
  difficulty: ContentDifficulty,
  language: Language
): TestContent {
  let content: string[];

  if (type === 'code') {
    const snippets = codeSnippets[language as keyof typeof codeSnippets]?.[difficulty] || [];
    content = snippets.length > 0 ? snippets[Math.floor(Math.random() * snippets.length)] : [];
  } else {
    const texts = textContent[language as keyof typeof textContent]?.[difficulty] || [];
    content = texts.length > 0 ? [texts[Math.floor(Math.random() * texts.length)]] : [];
  }

  return {
    content,
    type,
    difficulty,
    language
  };
}