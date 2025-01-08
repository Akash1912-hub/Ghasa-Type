import React from 'react';
import { Link } from 'react-router-dom';
import { Keyboard, KeyRound, Zap, Users, Trophy, ChevronRight } from 'lucide-react';

export const Landing: React.FC = () => (
  <div className="min-h-screen bg-[#323437] relative overflow-hidden">
    {/* Background Keyboard Pattern */}
    <div className="absolute inset-0 opacity-5">
      {Array.from({ length: 20 }).map((_, i) => (
        <Keyboard
          key={i}
          className="absolute text-white"
          size={120}
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            transform: `rotate(${Math.random() * 360}deg)`,
          }}
        />
      ))}
    </div>

    {/* Main Content */}
    <div className="relative z-10 max-w-6xl mx-auto px-4 py-16">
      <div className="text-center space-y-8 mb-16">
        <div className="inline-block animate-bounce">
          <Keyboard className="w-24 h-24 text-[#e2b714]" />
        </div>
        <h1 className="text-6xl font-bold text-white">
          Master Your <span className="text-[#e2b714]">Typing Speed</span>
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          Challenge yourself, race against bots, and improve your typing skills with our advanced typing test platform
        </p>
        <div className="flex items-center justify-center space-x-4">
          <Link
            to="/login"
            className="group flex items-center space-x-2 bg-[#e2b714] text-black px-8 py-4 rounded-lg font-medium hover:bg-[#e2b714]/90 transition-all duration-200 transform hover:scale-105"
          >
            <KeyRound className="w-5 h-5" />
            <span>Start Typing</span>
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
        <div className="bg-white/5 backdrop-blur-sm p-6 rounded-lg space-y-4 hover:bg-white/10 transition-colors">
          <Zap className="w-10 h-10 text-[#e2b714]" />
          <h3 className="text-xl font-bold text-white">Real-time Analysis</h3>
          <p className="text-gray-400">Get instant feedback on your typing speed, accuracy, and consistency</p>
        </div>

        <div className="bg-white/5 backdrop-blur-sm p-6 rounded-lg space-y-4 hover:bg-white/10 transition-colors">
          <Users className="w-10 h-10 text-[#e2b714]" />
          <h3 className="text-xl font-bold text-white">Race Against Bots</h3>
          <p className="text-gray-400">Challenge AI opponents of varying difficulty levels</p>
        </div>

        <div className="bg-white/5 backdrop-blur-sm p-6 rounded-lg space-y-4 hover:bg-white/10 transition-colors">
          <Trophy className="w-10 h-10 text-[#e2b714]" />
          <h3 className="text-xl font-bold text-white">Track Progress</h3>
          <p className="text-gray-400">Monitor your improvement with detailed statistics and achievements</p>
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center mt-16">
        <p className="text-gray-400 mb-4">Ready to improve your typing speed?</p>
        <Link
          to="/test"
          className="inline-flex items-center space-x-2 text-[#e2b714] hover:text-[#e2b714]/80 transition-colors"
        >
          <span>Try a demo test</span>
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  </div>
);