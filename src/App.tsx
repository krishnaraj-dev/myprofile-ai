import React from 'react';
import { motion } from 'motion/react';
import { 
  Github, 
  Linkedin, 
  Mail, 
  MapPin, 
  Briefcase, 
  Award, 
  Code2, 
  Terminal,
  ExternalLink,
  ChevronRight,
  ArrowUpRight,
  Sparkles,
  Globe,
  Cpu,
  Users,
  ChevronDown,
  Menu,
  X
} from 'lucide-react';
import { portfolioData } from './data/portfolio';
import { ChatContainer } from './components/ChatContainer';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Experience } from './components/Experience';
import { Achievements } from './components/Achievements';
import { Leadership } from './components/Leadership';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { BackgroundEffect } from './components/BackgroundEffect';

export default function PortfolioPage() {
  const { developer_profile, skills, experience, achievements, contact } = portfolioData;
  const [visibleProjects, setVisibleProjects] = React.useState(6);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  
  const showMoreProjects = () => {
    setVisibleProjects(prev => prev + 6);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-indigo-600 selection:text-white">
      <BackgroundEffect />

      <Header isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />

      <main className="pb-20">
        <Hero developer_profile={developer_profile} contact={contact} />
        <Skills skills={skills} />
        <Projects projects={portfolioData.projects} visibleProjects={visibleProjects} showMoreProjects={showMoreProjects} />
        <Experience experience={experience} />
        <Achievements achievements={achievements} />
        <Leadership leadership={portfolioData.leadership} />
        <Contact contact={contact} />
      </main>

      <ChatContainer />

      <Footer contact={contact} />
    </div>
  );
}
