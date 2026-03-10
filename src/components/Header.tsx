import React from 'react';
import { motion } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { useAppStore } from '../store/useStore';

export const Header: React.FC = () => {
  const { isMobileMenuOpen, setIsMobileMenuOpen } = useAppStore();

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-[30px]`}>
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex items-center justify-between rounded-full transition-all duration-300 bg-white/90 backdrop-blur-xl shadow-lg shadow-slate-200/50 border border-slate-200/50 px-6 py-3">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
            <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center shadow-md shadow-indigo-200">
              <span className="text-white font-bold text-lg">K</span>
            </div>
            <span className="font-bold text-lg tracking-tight text-slate-900 hidden sm:block">Krishnaraj</span>
          </motion.div>
          
          <nav className="hidden md:flex items-center gap-1 bg-slate-100/50 p-1 rounded-full border border-slate-200/50">
            {[
              { name: 'About', href: '#about' },
              { name: 'Skills', href: '#skills' },
              { name: 'Projects', href: '#projects' },
              { name: 'Articles', href: '#articles' },
              { name: 'Experience', href: '#experience' },
              { name: 'Career Path', href: '#career-path' }
            ].map((item) => (
              <a 
                key={item.name}
                href={item.href} 
                className="px-4 py-2 text-sm font-semibold text-slate-600 hover:text-indigo-600 hover:bg-white rounded-full transition-all"
              >
                {item.name}
              </a>
            ))}
          </nav>

          <div className="hidden md:block">
            <a 
              href="#contact" 
              className="px-6 py-2.5 bg-slate-900 text-white rounded-full text-sm font-bold hover:bg-indigo-600 transition-all shadow-sm"
            >
              Let's Talk
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 text-slate-600 bg-slate-100 rounded-full"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.nav 
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className="md:hidden absolute top-full left-6 right-6 mt-4 bg-white rounded-3xl shadow-xl border border-slate-200 p-6 flex flex-col gap-4"
          >
            {[
              { name: 'About', href: '#about' },
              { name: 'Skills', href: '#skills' },
              { name: 'Projects', href: '#projects' },
              { name: 'Articles', href: '#articles' },
              { name: 'Experience', href: '#experience' },
              { name: 'Career Path', href: '#career-path' },
              { name: 'Contact', href: '#contact' }
            ].map((item) => (
              <a 
                key={item.name}
                href={item.href} 
                className="text-lg font-bold text-slate-900 px-4 py-3 hover:bg-slate-50 rounded-xl transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}
            <a 
              href="#contact" 
              className="mt-2 px-6 py-4 bg-indigo-600 text-white rounded-xl text-center font-bold"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Let's Talk
            </a>
          </motion.nav>
        )}
      </div>
    </header>
  );
};
