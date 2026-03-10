"use client";
import React, { useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Code2, ExternalLink, ChevronDown, X } from "lucide-react";
import { useAppStore } from "../store/useStore";

interface Project {
  title: string;
  description: string;
  tech: string[];
  impact?: string;
  link: string;
}

interface ProjectsProps {
  projects: Project[];
}

export const Projects: React.FC<ProjectsProps> = ({ projects }) => {
  const [selectedProject, setSelectedProject] = React.useState<Project | null>(
    null,
  );
  const [selectedTech, setSelectedTech] = React.useState<string[]>([]);
  const { visibleProjects, showMoreProjects } = useAppStore();

  const allTech = useMemo(() => {
    const techSet = new Set<string>();
    projects?.forEach((p) => p.tech?.forEach((t: string) => techSet.add(t)));

    const techPriority: Record<string, number> = {
      "Next.js": 1,
      "React.js": 2,
      "React 18/19": 2,
      TypeScript: 3,
      "Tailwind CSS": 4,
      "Node.js": 5,
      Express: 6,
      GraphQL: 7,
      Storybook: 8,
      "Payment Gateways": 9,
      "REST APIs": 10,
      "Video SDKs": 11,
      Redux: 12,
      "Material UI": 13,
      Jest: 14,
      "AWS EC2/S3": 15,
      HTML5: 16,
      Sass: 17,
      Bootstrap: 18,
      Django: 19,
      Python: 20,
      "Angular 8": 21,
      CSS3: 22,
      Cypress: 23,
    };

    return Array.from(techSet).sort((a, b) => {
      const priorityA = techPriority[a] || 99;
      const priorityB = techPriority[b] || 99;
      return priorityA - priorityB;
    });
  }, [projects]);

  const filteredProjects = useMemo(() => {
    if (selectedTech.length === 0) return projects;
    return projects?.filter((p) =>
      selectedTech.every((t) => p.tech?.includes(t)),
    );
  }, [projects, selectedTech]);

  const toggleTech = (tech: string) => {
    setSelectedTech((prev) =>
      prev.includes(tech) ? prev.filter((t) => t !== tech) : [...prev, tech],
    );
  };

  return (
    <section
      id="projects"
      className="max-w-7xl mx-auto px-6 mb-[68px] md:mb-[84px] scroll-mt-32 md:scroll-mt-40"
    >
      <div className="flex flex-col gap-8 mb-12">
        <div>
          <h2 className="text-xs font-black text-indigo-600 uppercase tracking-[0.3em] mb-2">
            Portfolio
          </h2>
          <h3 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter">
            FEATURED PROJECTS.
          </h3>
        </div>

        <div className="flex flex-wrap gap-2">
          {allTech.map((tech) => (
            <button
              key={tech}
              onClick={() => toggleTech(tech)}
              aria-pressed={selectedTech.includes(tech)}
              aria-label={`Filter by ${tech}`}
              className={`px-4 py-2 text-xs font-bold uppercase tracking-widest rounded-full border transition-all ${
                selectedTech.includes(tech)
                  ? "bg-indigo-600 text-white border-indigo-600"
                  : "bg-white text-slate-600 border-slate-200 hover:border-indigo-300"
              }`}
            >
              {tech}
            </button>
          ))}
          {selectedTech.length > 0 && (
            <button
              onClick={() => setSelectedTech([])}
              aria-label="Clear filters"
              className="text-xs font-bold text-slate-500 hover:text-indigo-600 flex items-center gap-1"
            >
              <X className="w-4 h-4" /> Clear
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects?.slice(0, visibleProjects).map((project) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            whileHover={{ y: -5, scale: 1.02 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onClick={() => setSelectedProject(project)}
            className="group p-8 bg-white rounded-[2.5rem] border border-slate-200 shadow-sm hover:shadow-xl hover:shadow-indigo-100 transition-all cursor-pointer"
          >
            <div className="flex justify-between items-start mb-6">
              <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                <Code2 className="w-6 h-6" aria-hidden="true" />
              </div>
              {project.link !== "#" && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-slate-400 group-hover:text-indigo-600 transition-colors"
                  aria-label={`Open project: ${project.title}`}
                  onClick={(e) => e.stopPropagation()}
                >
                  <ExternalLink className="w-5 h-5" />
                </a>
              )}
            </div>
            <h4 className="text-2xl font-bold mb-3 text-slate-900">
              {project.title}
            </h4>
            <p className="text-slate-500 text-sm leading-relaxed mb-4 font-medium line-clamp-3">
              {project.description}
            </p>
            {project.impact && (
              <div className="mb-6 p-3 bg-indigo-50 rounded-xl border border-indigo-100">
                <p className="text-[10px] font-black text-indigo-600 uppercase tracking-widest mb-1">
                  Impact
                </p>
                <p className="text-xs text-slate-600 font-bold leading-tight line-clamp-2">
                  {project.impact}
                </p>
              </div>
            )}
            <div className="flex flex-wrap gap-2">
              {project.tech?.slice(0, 3).map((t: string) => (
                <span
                  key={t}
                  className={`px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-full border ${selectedTech.includes(t) ? "bg-indigo-100 text-indigo-700 border-indigo-200" : "bg-slate-50 text-slate-500 border-slate-100"}`}
                >
                  {t}
                </span>
              ))}
              {project.tech && project.tech.length > 3 && (
                <span className="px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-full border bg-slate-50 text-slate-500 border-slate-100">
                  +{project.tech.length - 3}
                </span>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative w-full max-w-2xl bg-white rounded-[2.5rem] p-8 md:p-12 shadow-2xl"
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-900 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
              <h3 className="text-3xl font-black text-slate-900 mb-6">
                {selectedProject.title}
              </h3>
              <p className="text-slate-600 text-lg leading-relaxed mb-8">
                {selectedProject.description}
              </p>
              {selectedProject.impact && (
                <div className="mb-8 p-6 bg-indigo-50 rounded-2xl border border-indigo-100">
                  <h4 className="text-xs font-black text-indigo-600 uppercase tracking-widest mb-3">
                    Key Impact
                  </h4>
                  <p className="text-slate-700 font-medium">
                    {selectedProject.impact}
                  </p>
                </div>
              )}
              <div className="flex flex-wrap gap-2 mb-8">
                {selectedProject.tech?.map((t: string) => (
                  <span
                    key={t}
                    className="px-4 py-2 text-xs font-black uppercase tracking-widest rounded-full bg-slate-100 text-slate-600 border border-slate-200"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <a
                href={selectedProject.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200"
              >
                Visit Project <ExternalLink className="w-4 h-4" />
              </a>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {filteredProjects && visibleProjects < filteredProjects.length && (
        <div className="flex justify-center mt-16">
          <button
            onClick={showMoreProjects}
            aria-label="Load more projects"
            className="px-12 py-5 bg-white border border-slate-200 text-slate-900 rounded-2xl font-black text-lg hover:bg-slate-50 transition-all shadow-lg hover:shadow-indigo-100 flex items-center gap-3 group"
          >
            Load More Projects
            <ChevronDown
              className="w-5 h-5 group-hover:translate-y-1 transition-transform"
              aria-hidden="true"
            />
          </button>
        </div>
      )}
    </section>
  );
};
