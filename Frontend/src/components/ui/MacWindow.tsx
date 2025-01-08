import React from 'react';

export const MacWindow: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="max-w-6xl mx-auto my-8">
    <div className="bg-background-light rounded-lg shadow-lg overflow-hidden">
      <div className="bg-background p-4 border-b border-primary/20">
        <div className="text-text font-medium">TypeTest v1.0</div>
      </div>
      <div className="p-6">
        {children}
      </div>
    </div>
  </div>
);