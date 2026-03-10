"use client";
import React, { Suspense, lazy } from "react";
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

      <Footer contact={contact} />
    </div>
  );
}
const ChatContainer = lazy(() => import("./components/ChatContainer").then((m) => ({ default: m.ChatContainer })));
