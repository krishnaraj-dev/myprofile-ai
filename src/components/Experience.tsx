import React from 'react';
import { motion } from 'motion/react';
import { ChevronRight } from 'lucide-react';

interface ExperienceProps {
  experience: any[];
}

export const Experience: React.FC<ExperienceProps> = ({ experience }) => {
  return (
    <section id="experience" className="max-w-7xl mx-auto px-6 mb-[68px] md:mb-[84px] scroll-mt-20">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        <div className="lg:col-span-4">
          <div className="sticky top-32">
            <h2 className="text-xs font-black text-indigo-600 uppercase tracking-[0.3em] mb-2">Journey</h2>
            <h3 className="text-4xl md:text-5xl font-black tracking-tighter mb-4 text-slate-900">PROFESSIONAL <br /> EVOLUTION.</h3>
            <p className="text-slate-500 font-medium">
              11+ years of experience in leading engineering teams and delivering enterprise-grade software.
            </p>
          </div>
        </div>
        <div className="lg:col-span-8 space-y-12">
          {experience.map((exp, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative pl-8 border-l-2 border-indigo-100 pb-12 last:pb-0"
            >
              <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-indigo-600 border-4 border-white shadow-sm" />
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4">
                <div>
                  <h4 className="text-2xl font-black tracking-tight text-slate-900">{exp.role}</h4>
                  <div className="flex items-center gap-2">
                    <p className="text-indigo-600 font-bold uppercase tracking-widest text-xs">{exp.company}</p>
                    {exp.location && (
                      <>
                        <span className="text-slate-300 text-xs">•</span>
                        <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">{exp.location}</p>
                      </>
                    )}
                  </div>
                </div>
                <span className="px-4 py-1.5 bg-indigo-50 rounded-full text-xs font-bold text-indigo-700 border border-indigo-100">
                  {exp.duration}
                </span>
              </div>
              <ul className="space-y-3">
                {exp.highlights.map((highlight: string, j: number) => (
                  <li key={j} className="flex items-start gap-3 text-slate-600 font-medium">
                    <ChevronRight className="w-4 h-4 text-indigo-300 mt-1 flex-shrink-0" />
                    {highlight}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
