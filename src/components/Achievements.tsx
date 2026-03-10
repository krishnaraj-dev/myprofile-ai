import React from 'react';
import { motion } from 'motion/react';
import { Award } from 'lucide-react';

interface AchievementsProps {
  achievements: string[];
}

export const Achievements: React.FC<AchievementsProps> = ({ achievements }) => {
  return (
    <section className="max-w-7xl mx-auto px-6 mb-32">
      <div className="p-12 bg-indigo-900 rounded-[3rem] text-white shadow-2xl shadow-indigo-200">
        <div className="flex items-center gap-3 mb-12">
          <Award className="w-8 h-8 text-amber-400" />
          <h3 className="text-4xl font-black tracking-tighter">KEY ACHIEVEMENTS.</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements.map((achievement, i) => (
            <motion.div 
              key={i}
              whileHover={{ scale: 1.02 }}
              className="p-6 bg-white/10 rounded-3xl border border-white/10 hover:bg-white/20 transition-all cursor-default backdrop-blur-sm"
            >
              <p className="text-lg font-bold leading-tight">{achievement}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
