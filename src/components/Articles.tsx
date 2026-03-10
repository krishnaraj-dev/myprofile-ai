'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, ExternalLink } from 'lucide-react';

interface Article {
  title: string;
  category: string;
  summary: string;
  link: string;
}

interface ArticlesProps {
  articles: Article[];
}

export const Articles: React.FC<ArticlesProps> = ({ articles }) => {
  const [activeCategory, setActiveCategory] = useState<'All' | 'Leadership' | 'Tech Arch'>('All');

  const categories = ['All', 'Leadership', 'Tech Arch'];

  const filteredArticles = activeCategory === 'All' 
    ? articles 
    : articles.filter(a => a.category === activeCategory);

  return (
    <section id="articles" className="max-w-4xl mx-auto px-6 mb-[68px] md:mb-[84px]">
      <div className="mb-12">
        <h2 className="text-xs font-black text-indigo-600 uppercase tracking-[0.3em] mb-2">Insights</h2>
        <h3 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter mb-8 text-slate-900">TECHNICAL ARTICLES.</h3>
        
        <div className="flex gap-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat as any)}
              className={`px-6 py-2 text-xs font-bold uppercase tracking-widest rounded-full border transition-all ${
                activeCategory === cat
                  ? 'bg-indigo-600 text-white border-indigo-600'
                  : 'bg-white text-slate-600 border-slate-200 hover:border-indigo-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-6">
        <AnimatePresence>
          {filteredArticles.map((article, i) => (
            <motion.div
              key={article.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, delay: i * 0.1 }}
              className="p-8 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all group"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
                    {article.category}
                  </span>
                </div>
                <a 
                  href={article.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-indigo-600 transition-colors"
                >
                  <ExternalLink className="w-5 h-5" />
                </a>
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-indigo-600 transition-colors">{article.title}</h4>
              <p className="text-slate-600 text-sm leading-relaxed">{article.summary}</p>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
};
