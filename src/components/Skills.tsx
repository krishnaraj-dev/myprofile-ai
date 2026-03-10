"use client";
import React from "react";
import { Sparkles, Code2, Terminal, Cpu } from "lucide-react";

interface SkillsData {
  ai_llm: string[];
  frontend: string[];
  state_data: string[];
  backend_cloud: string[];
  testing_quality: string[];
}

interface SkillsProps {
  skills: SkillsData;
}

export const Skills: React.FC<SkillsProps> = ({ skills }) => {
  return (
    <section
      id="skills"
      className="max-w-7xl mx-auto px-6 mb-[68px] md:mb-[84px] scroll-mt-32 md:scroll-mt-40"
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <h2 className="text-xs font-black text-indigo-600 uppercase tracking-[0.3em] mb-2">
            Expertise
          </h2>
          <h3 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter">
            TECHNICAL ARSENAL.
          </h3>
        </div>
        <p className="text-slate-500 font-medium max-w-sm">
          Specialized in building scalable, performant, and accessible web
          applications using modern technologies.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="md:col-span-2 p-8 bg-indigo-600 rounded-[2.5rem] text-white flex flex-col justify-between min-h-[300px] group overflow-hidden relative shadow-xl shadow-indigo-100">
          <div className="relative z-10">
            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-sm">
              <Sparkles className="w-6 h-6" />
            </div>
            <h4 className="text-3xl font-bold mb-4">AI & LLM Expertise</h4>
            <div className="flex flex-wrap gap-2">
              {skills.ai_llm.map((skill: string) => (
                <span
                  key={skill}
                  className="px-3 py-1 bg-white/10 rounded-full text-xs font-bold border border-white/20"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
          <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
        </div>

        <div className="p-8 bg-white rounded-[2.5rem] border border-slate-200 flex flex-col justify-between min-h-[300px] shadow-sm">
          <div>
            <div className="w-12 h-12 bg-indigo-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-indigo-100">
              <Code2 className="w-6 h-6 text-white" />
            </div>
            <h4 className="text-2xl font-bold mb-2">Frontend</h4>
            <p className="text-sm text-slate-500 font-medium mb-6">
              Modern React 19 & Next.js architectures.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {skills.frontend.slice(0, 4).map((skill: string) => (
              <span
                key={skill}
                className="text-xs font-black text-indigo-600 uppercase tracking-widest"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="p-8 bg-white rounded-[2.5rem] border border-slate-200 flex flex-col justify-between min-h-[300px] shadow-sm">
          <div>
            <div className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-emerald-100">
              <Terminal className="w-6 h-6 text-white" />
            </div>
            <h4 className="text-2xl font-bold mb-2">Backend & Cloud</h4>
            <p className="text-sm text-slate-500 font-medium mb-6">
              Node.js, AWS & Docker deployments.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {skills.backend_cloud.slice(0, 5).map((skill: string) => (
              <span
                key={skill}
                className="text-xs font-black text-emerald-700 uppercase tracking-widest"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="md:col-span-4 p-8 bg-white rounded-[2.5rem] border border-slate-200 grid grid-cols-1 md:grid-cols-3 gap-8 shadow-sm">
          {skills.testing_quality.slice(0, 3).map((item: string, i: number) => (
            <div key={i} className="flex gap-4">
              <div className="w-10 h-10 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-center flex-shrink-0">
                <Cpu className="w-5 h-5 text-indigo-500" />
              </div>
              <div>
                <h5 className="font-bold text-slate-900">{item}</h5>
                <p className="text-xs text-slate-500 mt-1">
                  Ensuring production-grade reliability.
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
