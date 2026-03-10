import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';

interface FooterProps {
  contact: any;
}

export const Footer: React.FC<FooterProps> = ({ contact }) => {
  return (
    <footer className="border-t border-slate-200 bg-white py-20">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-12">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">K</span>
          </div>
          <span className="font-bold text-lg tracking-tight uppercase text-slate-900">Krishnaraj</span>
        </div>
        
        <div className="flex items-center gap-8">
          <a href="https://github.com/krishnaraj-dev" target="_blank" className="text-slate-400 hover:text-indigo-600 transition-colors">
            <Github className="w-6 h-6" />
          </a>
          <a href={`https://${contact.linkedin}`} target="_blank" className="text-slate-400 hover:text-indigo-600 transition-colors">
            <Linkedin className="w-6 h-6" />
          </a>
          <a href={`mailto:${contact.email}`} className="text-slate-400 hover:text-indigo-600 transition-colors">
            <Mail className="w-6 h-6" />
          </a>
        </div>
      </div>
    </footer>
  );
};
