import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Scatter } from 'recharts';
import { PerformanceData } from '../types';

interface PerformanceGraphProps {
  data: PerformanceData[];
}

export const PerformanceGraph: React.FC<PerformanceGraphProps> = ({ data }) => {
  const minWpm = Math.min(...data.map(d => d.wpm));
  const maxWpm = Math.max(...data.map(d => d.wpm));
  
  // Find error points (where accuracy drops below 90%)
  const errorPoints = data.filter(point => point.accuracy < 90);
  
  return (
    <div className="w-full h-64 bg-[#2c2e31]/50 backdrop-blur-sm rounded-lg p-4">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
          <XAxis 
            dataKey="timestamp" 
            stroke="#646669"
            tickFormatter={(value) => `${value}s`}
          />
          <YAxis 
            domain={[Math.max(0, minWpm - 5), maxWpm + 5]}
            stroke="#646669"
            tickFormatter={(value) => `${Math.round(value)}`}
          />
          <Tooltip
            contentStyle={{ 
              backgroundColor: '#2c2e31', 
              border: '1px solid #646669',
              borderRadius: '4px'
            }}
            labelFormatter={(value) => `Time: ${value}s`}
            formatter={(value, name) => [
              `${Math.round(value)} ${name === 'wpm' ? 'WPM' : '%'}`,
              name === 'wpm' ? 'Speed' : 'Accuracy'
            ]}
          />
          <Line
            type="monotone"
            dataKey="wpm"
            stroke="#e2b714"
            strokeWidth={2}
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="accuracy"
            stroke="#d1d0c5"
            strokeWidth={2}
            dot={false}
          />
          <Scatter
            data={errorPoints}
            dataKey="wpm"
            fill="#ca4754"
            shape="circle"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};