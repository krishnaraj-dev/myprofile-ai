import React from 'react';
import { motion } from 'motion/react';
import { Menu, X } from 'lucide-react';

interface HeaderProps {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
}

export const Header: React.FC<HeaderProps> = ({ isMobileMenuOpen, setIsMobileMenuOpen }) => {
  return (
    <header className="fixed top-0 z-50 w-full bg-white/70 backdrop-blur-xl border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3"
        >
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200">
            <span className="text-white font-bold text-lg">K</span>
          </div>
          <span className="font-bold text-xl tracking-tight uppercase">Krishnaraj</span>
        </motion.div>
        
        <nav className="hidden md:flex items-center gap-8">
          {['About', 'Skills', 'Projects', 'Experience', 'Contact'].map((item) => (
            <a 
              key={item}
              href={`#${item.toLowerCase()}`} 
              className="text-sm font-semibold text-slate-500 hover:text-indigo-600 transition-all hover:tracking-widest"
            >
              {item}
            </a>
          ))}
          <a 
            href="#contact" 
            className="px-6 py-2.5 bg-indigo-600 text-white rounded-full text-sm font-bold hover:bg-indigo-700 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-indigo-200"
          >
            Hire Me
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2 text-slate-600"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.nav 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="md:hidden bg-white border-b border-slate-200 px-6 py-8 flex flex-col gap-6"
        >
          {['About', 'Skills', 'Projects', 'Experience', 'Contact'].map((item) => (
            <a 
              key={item}
              href={`#${item.toLowerCase()}`} 
              className="text-lg font-bold text-slate-900"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item}
            </a>
          ))}
          <a 
            href="#contact" 
            className="px-6 py-4 bg-indigo-600 text-white rounded-2xl text-center font-bold"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Hire Me
          </a>
        </motion.nav>
      )}
    </header>
  );
};
