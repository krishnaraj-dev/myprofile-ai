import React from 'react';
import { motion } from 'motion/react';
import { Target, Cloud, Shield, Users } from 'lucide-react';

interface CareerPathProps {
  careerPath: {
    title: string;
    description: string;
    milestones: { name: string; progress: number }[];
  };
}

export const CareerPath: React.FC<CareerPathProps> = ({ careerPath }) => {
  const getIcon = (name: string) => {
    switch (name) {
      case 'System Design & Architecture': return <Target className="w-5 h-5" />;
      case 'Cloud & Infrastructure (AWS/GCP)': return <Cloud className="w-5 h-5" />;
      case 'Enterprise Security & Compliance': return <Shield className="w-5 h-5" />;
      case 'Cross-functional Leadership': return <Users className="w-5 h-5" />;
      default: return <Target className="w-5 h-5" />;
    }
  };

  return (
    <section id="career-path" className="max-w-4xl mx-auto px-6 mb-[68px] md:mb-[84px]">
      <div className="mb-12">
        <h2 className="text-xs font-black text-indigo-600 uppercase tracking-[0.3em] mb-2">Career Path</h2>
        <h3 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter mb-4 text-slate-900">{careerPath.title}</h3>
        <p className="text-slate-600 font-medium max-w-2xl">
          {careerPath.description}
        </p>
      </div>
      
      <div className="relative border-l-2 border-indigo-200 ml-3 md:ml-6 space-y-12">
        {careerPath.milestones.map((milestone, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="relative pl-8 md:pl-12"
          >
            <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-indigo-600 border-4 border-white shadow-sm" />
            
            <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                  {getIcon(milestone.name)}
                </div>
                <h4 className="font-bold text-slate-900 text-lg">{milestone.name}</h4>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2">
                <div className="bg-indigo-600 h-2 rounded-full" style={{ width: `${milestone.progress}%` }}></div>
              </div>
              <p className="text-xs text-slate-500 mt-2 font-bold">{milestone.progress}% Progress</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
