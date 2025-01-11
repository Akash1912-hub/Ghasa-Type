import React from 'react';
import { Github, Keyboard } from 'lucide-react';

export const Developers: React.FC = () => (
  <div className="max-w-4xl mx-auto p-4 sm:p-8 space-y-8 sm:space-y-12">
    <div className="text-center space-y-4">
      <h1 className="text-3xl sm:text-4xl font-bold">About ghasatype</h1>
      <p className="text-base sm:text-lg text-gray-400">
        Inspired by monkeytype, reimagined for modern developers
      </p>
    </div>
    
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
      {[
        {
          name: "Akash MK",
          role: "Lead Developer",
          github: "Akash1912-hub",
          description: "Typing algorithm specialist and performance optimization expert"
        },
        {
          name: "Siva Sabari Ganesan A",
          role: "Frontend Developer",
          github: "SivaSabariGanesan",
          description: "Design systems architect focusing on minimal, functional interfaces"
        }
      ].map(dev => (
        <div key={dev.name} className="bg-white/5 p-6 rounded-lg space-y-4">
          <h2 className="text-xl font-bold text-[#e2b714]">{dev.name}</h2>
          <p className="text-sm text-gray-400">{dev.role}</p>
          <p className="text-gray-300">{dev.description}</p>
          <a
            href={`https://github.com/${dev.github}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 text-gray-400 hover:text-[#e2b714] transition-colors"
          >
            <Github className="w-4 h-4" />
            <span>@{dev.github}</span>
          </a>
        </div>
      ))}
    </div>

    <div className="bg-white/5 p-6 sm:p-8 rounded-lg space-y-6">
      <div className="flex items-center space-x-3">
        <Keyboard className="w-6 sm:w-8 h-6 sm:h-8 text-[#e2b714]" />
        <h2 className="text-xl sm:text-2xl font-bold">Features & Improvements</h2>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
        <div>
          <h3 className="text-lg font-semibold mb-3">Core Features</h3>
          <ul className="space-y-2 text-gray-300">
            <li>• Accurate WPM calculation</li>
            <li>• Real-time error detection</li>
            <li>• Multiple language support</li>
            <li>• Code typing practice</li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-3">Coming Soon</h3>
          <ul className="space-y-2 text-gray-300">
            <li>• Multiplayer racing</li>
            <li>• Custom themes</li>
            <li>• Advanced statistics</li>
            <li>• Progress tracking</li>
          </ul>
        </div>
      </div>
    </div>

    <div className="text-center space-y-4">
      <p className="text-gray-400">
        ghasatype is an open-source project. We welcome contributions from the community.
      </p>
      <a
        href="https://github.com/SivaSabariGanesan/Ghasa-type.git"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center space-x-2 px-6 py-3 bg-[#e2b714] text-black rounded-md hover:bg-[#e2b714]/90 transition-colors"
      >
        <Github className="w-5 h-5" />
        <span>View on GitHub</span>
      </a>
    </div>
  </div>
);
