import React from 'react';
import { motion } from 'motion/react';
import { Code2, ExternalLink, ChevronDown } from 'lucide-react';

interface ProjectsProps {
  projects: any[];
  visibleProjects: number;
  showMoreProjects: () => void;
}

export const Projects: React.FC<ProjectsProps> = ({ projects, visibleProjects, showMoreProjects }) => {
  return (
    <section id="projects" className="max-w-7xl mx-auto px-6 mb-32 scroll-mt-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <h2 className="text-xs font-black text-indigo-600 uppercase tracking-[0.3em] mb-4">Portfolio</h2>
          <h3 className="text-5xl font-black tracking-tighter">FEATURED PROJECTS.</h3>
        </div>
        <p className="text-slate-500 font-medium max-w-sm">
          A selection of technical implementations and open-source contributions.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects?.slice(0, visibleProjects).map((project, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -10 }}
            className="group p-8 bg-white rounded-[2.5rem] border border-slate-200 shadow-sm hover:shadow-xl hover:shadow-indigo-100 transition-all"
          >
            <div className="flex justify-between items-start mb-6">
              <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                <Code2 className="w-6 h-6" />
              </div>
              <a href={project.link} target="_blank" className="p-2 text-slate-400 hover:text-indigo-600 transition-colors">
                <ExternalLink className="w-5 h-5" />
              </a>
            </div>
            <h4 className="text-2xl font-bold mb-3 text-slate-900">{project.title}</h4>
            <p className="text-slate-500 text-sm leading-relaxed mb-4 font-medium">
              {project.description}
            </p>
            {project.impact && (
              <div className="mb-6 p-3 bg-indigo-50 rounded-xl border border-indigo-100">
                <p className="text-[10px] font-black text-indigo-600 uppercase tracking-widest mb-1">Impact</p>
                <p className="text-xs text-slate-600 font-bold leading-tight">{project.impact}</p>
              </div>
            )}
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t: string) => (
                <span key={t} className="px-3 py-1 bg-slate-50 text-slate-500 text-[10px] font-black uppercase tracking-widest rounded-full border border-slate-100">
                  {t}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {projects && visibleProjects < projects.length && (
        <div className="flex justify-center mt-16">
          <button 
            onClick={showMoreProjects}
            className="px-12 py-5 bg-white border border-slate-200 text-slate-900 rounded-2xl font-black text-lg hover:bg-slate-50 transition-all shadow-lg hover:shadow-indigo-100 flex items-center gap-3 group"
          >
            Load More Projects
            <ChevronDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
          </button>
        </div>
      )}
    </section>
  );
};
