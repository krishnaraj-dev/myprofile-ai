import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, ArrowUpRight, Linkedin, Github } from 'lucide-react';

interface HeroProps {
  developer_profile: any;
  contact: any;
}

export const Hero: React.FC<HeroProps> = ({ developer_profile, contact }) => {
  return (
    <section id="about" className="max-w-7xl mx-auto px-6 py-20 scroll-mt-20">
      <div className="relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold uppercase tracking-widest mb-8 shadow-sm">
            <Sparkles className="w-3 h-3 text-amber-500" />
            Available for new opportunities
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-[1.1] mb-10 text-slate-950">
            CRAFTING <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-500">DIGITAL</span> <br />
            FUTURE.
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-10">
              <p className="text-xl md:text-2xl text-slate-600 font-medium leading-relaxed max-w-xl">
                I'm {developer_profile.name}, a {developer_profile.title} with {developer_profile.experience_years} years of experience architecting high-impact, scalable web solutions.
              </p>
              <div className="flex flex-wrap gap-6">
                <div className="flex flex-col">
                  <span className="text-3xl font-black text-slate-950">11+</span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Years Exp</span>
                </div>
                <div className="w-px h-12 bg-slate-200" />
                <div className="flex flex-col">
                  <span className="text-3xl font-black text-slate-950">40+</span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Projects</span>
                </div>
                <div className="w-px h-12 bg-slate-200" />
                <div className="flex flex-col">
                  <span className="text-3xl font-black text-slate-950">100%</span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Delivery</span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col gap-6">
              <div className="p-6 bg-white rounded-3xl border border-slate-100 shadow-lg shadow-slate-200/50">
                <p className="text-slate-700 leading-relaxed font-medium">
                  {developer_profile.summary}
                </p>
              </div>
              <div className="flex gap-4">
                <a href={`mailto:${contact.email}`} className="flex-1 py-4 bg-slate-950 text-white rounded-xl font-bold text-lg flex items-center justify-center gap-2 hover:bg-slate-800 transition-all group shadow-lg shadow-slate-300">
                  Get in touch <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </a>
                <div className="flex gap-2">
                   <a href={`https://${contact.linkedin}`} target="_blank" className="w-14 h-14 bg-white border border-slate-200 rounded-xl flex items-center justify-center text-slate-500 hover:text-indigo-600 hover:border-indigo-200 transition-all shadow-sm">
                     <Linkedin className="w-5 h-5" />
                   </a>
                   <a href="https://github.com/krishnaraj-dev" target="_blank" className="w-14 h-14 bg-white border border-slate-200 rounded-xl flex items-center justify-center text-slate-500 hover:text-indigo-600 hover:border-indigo-200 transition-all shadow-sm">
                     <Github className="w-5 h-5" />
                   </a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
