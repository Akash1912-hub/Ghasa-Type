import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Navigation } from './components/ui/Navigation';
import { TypingTest } from './pages/TypingTest';
import { Developers } from './pages/Developers';
import { Admin } from './pages/Admin';
import { AuthProvider } from './context/AuthContext';
import { PrivateRoute } from './components/PrivateRoutes';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { Landing } from './pages/Landing';
import { Profile } from './pages/Profile';

export default function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-background text-text">
        <div className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-primary/20">
          <Navigation />
        </div>
        <div className="pt-16">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route 
              path="/test" 
              element={
                <PrivateRoute>
                  <TypingTest />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/profile" 
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              } 
            />
            <Route path="/developers" element={<Developers />} />
            <Route 
              path="/admin" 
              element={
                <PrivateRoute>
                  <Admin />
                </PrivateRoute>
              } 
            />
          </Routes>
        </div>
      </div>
    </AuthProvider>
  );
}