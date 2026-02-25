// src/components/CalendarHeatmap.tsx
'use client';

import React from 'react';

interface CalendarHeatmapProps {
  completedDays: Record<string, any>;
}

const CalendarHeatmap: React.FC<CalendarHeatmapProps> = ({ completedDays }) => {
  const today = new Date();
  const days = Array.from({ length: 30 }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    return d;
  }).reverse();

  const dayToIso = (d: Date) => d.toISOString().split('T')[0];

  return (
    <div>
      <h3 className="text-sm font-semibold text-white/50 mb-2 text-center">Daily Challenge Activity</h3>
      <div className="flex justify-center gap-1">
        {days.map((day, index) => {
          const dayStr = dayToIso(day);
          const isCompleted = !!completedDays[dayStr];
          const isToday = dayToIso(today) === dayStr;

          return (
            <div
              key={index}
              className={`w-5 h-5 rounded-sm ${
                isCompleted ? 'bg-yellow-400' : 'bg-white/10'
              } ${isToday ? 'border-2 border-white' : ''}`}
              title={`${dayStr}: ${isCompleted ? 'Completed' : 'Not Completed'}`}
            />
          );
        })}
      </div>
    </div>
  );
};

export default CalendarHeatmap;
