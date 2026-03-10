import React from 'react';
import { Users } from 'lucide-react';

interface LeadershipProps {
  leadership: string[];
}

export const Leadership: React.FC<LeadershipProps> = ({ leadership }) => {
  return (
    <section className="max-w-7xl mx-auto px-6 mb-32">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-4">
          <h2 className="text-xs font-black text-indigo-600 uppercase tracking-[0.3em] mb-4">Leadership</h2>
          <h3 className="text-5xl font-black tracking-tighter mb-6 text-slate-900">ENGINEERING <br /> GOVERNANCE.</h3>
          <p className="text-slate-500 font-medium">
            Driving excellence through mentorship, architectural oversight, and strategic technical planning.
          </p>
        </div>
        <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {leadership?.map((item, i) => (
            <div key={i} className="p-8 bg-slate-50 rounded-[2rem] border border-slate-100">
              <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center mb-6">
                <Users className="w-5 h-5 text-indigo-600" />
              </div>
              <p className="text-slate-700 font-bold leading-tight">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
