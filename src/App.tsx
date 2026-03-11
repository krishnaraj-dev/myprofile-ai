"use client";
import React, { Suspense, lazy, useState } from "react";
import { portfolioData } from "./data/portfolio";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Skills } from "./components/Skills";
import { Projects } from "./components/Projects";
import { Articles } from "./components/Articles";
import { Experience } from "./components/Experience";
import { Achievements } from "./components/Achievements";
import { Leadership } from "./components/Leadership";
import { CareerPath } from "./components/CareerPath";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { BackgroundEffect } from "./components/BackgroundEffect";

export default function PortfolioPage() {
  const { developer_profile, skills, experience, achievements, contact } =
    portfolioData;
  const [isInfoOpen, setIsInfoOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-indigo-600 selection:text-white">
      <BackgroundEffect />

      <Header />

      <main className="pb-10">
        <Hero developer_profile={developer_profile} contact={contact} />
        <Skills skills={skills} />
        <Projects projects={portfolioData.projects} />
        <Articles articles={portfolioData.articles} />
        <Experience experience={experience} />
        <Achievements achievements={achievements} />
        <Leadership leadership={portfolioData.leadership} />
        <CareerPath careerPath={portfolioData.career_path} />
        <Contact contact={contact} />
      </main>

      <Suspense fallback={null}>
        <ChatContainer />
      </Suspense>

      <div className="fixed bottom-4 left-4 md:bottom-8 md:left-8 z-[90]">
        <button
          onClick={() => setIsInfoOpen(true)}
          aria-label="Open site info"
          className="w-12 h-12 rounded-full bg-slate-900 text-white flex items-center justify-center shadow-xl hover:bg-slate-800 transition-colors"
        >
          i
        </button>
        {isInfoOpen && (
          <div className="relative">
            <div
              className="absolute bottom-14 left-0 w-[290px] md:w-[340px] bg-white rounded-2xl border border-slate-200 shadow-2xl p-4"
              role="dialog"
              aria-label="Stack and process"
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-black text-slate-900">
                  Stack & Process
                </h4>
                <button
                  onClick={() => setIsInfoOpen(false)}
                  aria-label="Close info"
                  className="text-slate-400 hover:text-slate-900"
                >
                  ✕
                </button>
              </div>
              <div className="text-xs text-slate-600 space-y-2 leading-relaxed">
                <p>
                  Stack: React 19, Vite, Tailwind CSS, Zustand, Motion, Lucide.
                </p>
                <p>
                  Chatbot: Gemini API streaming with profile-aware system
                  prompt.
                </p>
                <p>Deploy: GitHub Actions → GitHub Pages.</p>
              </div>
              <div className="absolute -bottom-2 left-5 w-3 h-3 bg-white border-l border-b border-slate-200 rotate-45" />
            </div>
          </div>
        )}
      </div>

      <Footer contact={contact} />
    </div>
  );
}
const ChatContainer = lazy(() =>
  import("./components/ChatContainer").then((m) => ({
    default: m.ChatContainer,
  })),
);
