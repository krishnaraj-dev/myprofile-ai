import React from 'react';

interface ExperienceCardProps {
  company: string;
  role: string;
  duration: string;
  highlights: string[];
}

export const ExperienceCard: React.FC<ExperienceCardProps> = ({ company, role, duration, highlights }) => {
  return (
    <div className="p-6 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">{role}</h3>
          <p className="text-sm text-slate-500 font-medium">{company}</p>
        </div>
        <span className="text-xs font-mono text-indigo-600 bg-indigo-50 px-2 py-1 rounded border border-indigo-100">
          {duration}
        </span>
      </div>
      <ul className="space-y-2">
        {highlights.map((highlight, index) => (
          <li key={index} className="text-sm text-slate-600 flex items-start">
            <span className="mr-2 mt-1.5 w-1 h-1 rounded-full bg-indigo-400 flex-shrink-0" />
            {highlight}
          </li>
        ))}
      </ul>
    </div>
  );
};
