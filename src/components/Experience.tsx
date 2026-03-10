"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronRight, ChevronDown, ChevronUp } from "lucide-react";

interface ExperienceItem {
  company: string;
  role: string;
  duration: string;
  location?: string;
  highlights: string[];
}

interface ExperienceProps {
  experience: ExperienceItem[];
}

export const Experience: React.FC<ExperienceProps> = ({ experience }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const displayedExperience = isExpanded ? experience : experience.slice(0, 2);

  return (
    <section
      id="experience"
      className="max-w-7xl mx-auto px-6 mb-[68px] md:mb-[84px] scroll-mt-32 md:scroll-mt-40"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        <div className="lg:col-span-4">
          <div className="sticky top-32">
            <h2 className="text-xs font-black text-indigo-600 uppercase tracking-[0.3em] mb-2">
              Journey
            </h2>
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter mb-4 text-slate-900">
              PROFESSIONAL <br /> EVOLUTION.
            </h3>
            <p className="text-slate-500 font-medium">
              11+ years of experience in leading engineering teams and
              delivering enterprise-grade software.
            </p>
          </div>
        </div>
        <div className="lg:col-span-8">
          <div className="space-y-0">
            <AnimatePresence initial={false}>
              {displayedExperience.map((exp, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="relative pl-8 border-l-2 border-indigo-100 pb-12">
                    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-indigo-600 border-4 border-white shadow-sm" />
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4">
                      <div>
                        <h4 className="text-2xl font-black tracking-tight text-slate-900">
                          {exp.role}
                        </h4>
                        <div className="flex items-center gap-2">
                          <p className="text-indigo-600 font-bold uppercase tracking-widest text-xs">
                            {exp.company}
                          </p>
                          {exp.location && (
                            <>
                              <span className="text-slate-500 text-xs">&bull;</span>
                              <p className="text-slate-600 font-bold uppercase tracking-widest text-[10px]">
                                {exp.location}
                              </p>
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
                        <li
                          key={j}
                          className="flex items-start gap-3 text-slate-600 font-medium"
                        >
                          <ChevronRight className="w-4 h-4 text-indigo-300 mt-1 flex-shrink-0" />
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {experience.length > 2 && (
            <motion.div layout className="pt-2 flex justify-start pl-8">
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="flex items-center gap-2 px-6 py-3 bg-white border-2 border-slate-200 hover:border-indigo-600 text-slate-700 hover:text-indigo-600 rounded-full font-bold transition-all group shadow-sm hover:shadow-md"
              >
                {isExpanded ? (
                  <>
                    Show Less{" "}
                    <ChevronUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
                  </>
                ) : (
                  <>
                    Show More{" "}
                    <ChevronDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
                  </>
                )}
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};
