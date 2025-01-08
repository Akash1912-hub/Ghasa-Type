import React, { useState } from 'react';
import { LoginForm } from './LoginForm';
import { SignupForm } from './SignupForm';
import { useAuth } from '../../context/AuthContext';
import { X, Keyboard } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const { user } = useAuth();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-[#2c2e31] rounded-2xl shadow-xl max-w-md w-full relative overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors p-1 hover:bg-white/10 rounded-full"
        >
          <X size={20} />
        </button>

        {/* Header */}
        <div className="text-center pt-8 pb-6 px-8">
          <div className="inline-block p-3 bg-[#e2b714]/10 rounded-2xl mb-4">
            <Keyboard className="w-10 h-10 text-[#e2b714]" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">
            {isLogin ? 'Welcome Back!' : 'Create Account'}
          </h2>
          <p className="text-gray-400">
            {isLogin 
              ? 'Enter your credentials to continue'
              : 'Join us and start improving your typing speed'
            }
          </p>
        </div>

        {/* Auth Tabs */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex p-1 bg-white/5 rounded-lg">
            <button
              onClick={() => setIsLogin(true)}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                isLogin 
                  ? 'bg-[#e2b714] text-black shadow-lg' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                !isLogin 
                  ? 'bg-[#e2b714] text-black shadow-lg' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Sign Up
            </button>
          </div>
        </div>

        {/* Form Container */}
        <div className="px-8 pb-8">
          <div className="transition-all duration-300">
            {isLogin ? (
              <LoginForm onToggle={() => setIsLogin(false)} />
            ) : (
              <SignupForm onToggle={() => setIsLogin(true)} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};