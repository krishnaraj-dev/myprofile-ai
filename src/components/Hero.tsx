"use client";
import React from "react";
import { motion } from "motion/react";
import { Mail, ArrowRight, Github, Linkedin, Terminal } from "lucide-react";

interface DeveloperProfile {
  name: string;
  title: string;
  location: string;
  experience_years: number;
  summary: string;
}

interface Contact {
  email: string;
  phone: string;
  linkedin: string;
  portfolio: string;
  call_to_action: string;
}

interface HeroProps {
  developer_profile: DeveloperProfile;
  contact: Contact;
}

export const Hero: React.FC<HeroProps> = ({ developer_profile, contact }) => {
  return (
    <section
      id="about"
      className="max-w-7xl mx-auto px-6 pt-40 pb-[104px] md:pt-44 md:pb-[120px] scroll-mt-32 md:scroll-mt-40"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="lg:col-span-7 flex flex-col items-start"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold uppercase tracking-widest mb-4 shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            Open to Opportunities
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-slate-900 leading-[1.1] mb-4">
            Building{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-500">
              digital
            </span>{" "}
            <br />
            experiences.
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-slate-600 font-medium leading-relaxed max-w-2xl mb-6">
            Hi, I&apos;m {developer_profile.name}. A {developer_profile.title}{" "}
            with {developer_profile.experience_years} years of experience
            architecting high-impact, scalable web solutions and specializing in
            modern frontend and AI integrations.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <a
              href={`mailto:${contact.email}`}
              className="w-full sm:w-auto px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold text-base flex items-center justify-center gap-2 hover:bg-indigo-600 transition-all shadow-lg shadow-slate-200 hover:shadow-indigo-200 group"
            >
              <Mail className="w-5 h-5" />
              <span>Let&apos;s collaborate</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>

            <div className="flex items-center gap-3 w-full sm:w-auto justify-center">
              <a
                href={`https://${contact.linkedin}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-white border border-slate-200 rounded-2xl flex items-center justify-center text-slate-600 hover:text-indigo-600 hover:border-indigo-200 hover:bg-indigo-50 transition-all shadow-sm"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://github.com/krishnaraj-dev"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-white border border-slate-200 rounded-2xl flex items-center justify-center text-slate-600 hover:text-indigo-600 hover:border-indigo-200 hover:bg-indigo-50 transition-all shadow-sm"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          className="lg:col-span-5 relative mt-8 lg:mt-0 cursor-pointer"
        >
          <div className="relative w-full aspect-square max-w-sm mx-auto">
            {/* Decorative background elements */}
            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-100 to-blue-50 rounded-[3rem] rotate-6 scale-105 -z-10 transition-transform hover:rotate-12 duration-500"></div>
            <div className="absolute inset-0 bg-white border border-slate-200 rounded-[3rem] shadow-xl overflow-hidden flex items-center justify-center group">
              {/* Placeholder for profile image - using a stylized terminal/code block for now */}
              <div className="w-full h-full bg-slate-50 p-6 sm:p-8 flex flex-col">
                <div className="flex gap-2 mb-4 sm:mb-6">
                  <div className="w-3 h-3 rounded-full bg-rose-400"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
                </div>
                <div className="flex-1 flex flex-col justify-center">
                  <Terminal className="w-8 h-8 sm:w-10 sm:h-10 text-indigo-300 mb-4" />
                  <div className="space-y-2 font-mono text-xs sm:text-sm">
                    <p className="text-slate-400">
                      <span className="text-indigo-500">const</span>{" "}
                      <span className="text-blue-500">developer</span> = {"{"}
                    </p>
                    <p className="text-slate-600 pl-4">
                      name:{" "}
                      <span className="text-emerald-500">
                        &apos;{developer_profile.name}&apos;
                      </span>
                      ,
                    </p>
                    <p className="text-slate-600 pl-4">
                      role:{" "}
                      <span className="text-emerald-500">
                        &apos;{developer_profile.title.split("|")[0].trim()}
                        &apos;
                      </span>
                      ,
                    </p>
                    <p className="text-slate-600 pl-4">
                      experience:{" "}
                      <span className="text-emerald-500">
                        &apos;{developer_profile.experience_years} years&apos;
                      </span>
                      ,
                    </p>
                    <p className="text-slate-600 pl-4">
                      passion:{" "}
                      <span className="text-emerald-500">
                        &apos;Building great products&apos;
                      </span>
                    </p>
                    <p className="text-slate-400">{"}"};</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating badge */}
            <div className="absolute -bottom-6 -left-2 sm:-left-6 bg-white p-3 sm:p-4 rounded-2xl border border-slate-100 shadow-xl flex items-center gap-3 sm:gap-4 animate-bounce-slow z-20">
              <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center">
                <span className="text-xl font-black text-indigo-600">40+</span>
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Projects
                </p>
                <p className="text-sm font-bold text-slate-900">Completed</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
