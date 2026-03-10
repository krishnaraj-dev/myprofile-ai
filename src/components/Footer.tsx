"use client";
import React from "react";
import { Github, Linkedin, Mail } from "lucide-react";

interface ContactInfo {
  email: string;
  phone: string;
  linkedin: string;
  portfolio: string;
  call_to_action: string;
}

interface FooterProps {
  contact: ContactInfo;
}

export const Footer: React.FC<FooterProps> = ({ contact }) => {
  return (
    <footer className="border-t border-slate-200 bg-white py-8">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">K</span>
          </div>
          <span className="font-bold text-lg tracking-tight uppercase text-slate-900">
            Krishnaraj
          </span>
        </div>

        <div className="flex items-center gap-8">
          <a
            href="https://github.com/krishnaraj-dev"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-indigo-600 transition-colors"
            aria-label="GitHub"
          >
            <Github className="w-6 h-6" />
          </a>
          <a
            href={`https://${contact.linkedin}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-indigo-600 transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-6 h-6" />
          </a>
          <a
            href={`mailto:${contact.email}`}
            className="text-slate-400 hover:text-indigo-600 transition-colors"
            aria-label="Email"
          >
            <Mail className="w-6 h-6" />
          </a>
        </div>
      </div>
    </footer>
  );
};
