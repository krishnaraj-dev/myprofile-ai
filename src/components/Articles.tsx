"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { BookOpen, ExternalLink, X } from "lucide-react";

interface Article {
  title: string;
  category: string;
  summary: string;
  content?: string;
  link: string;
}

interface ArticlesProps {
  articles: Article[];
}

export const Articles: React.FC<ArticlesProps> = ({ articles }) => {
  const [activeCategory, setActiveCategory] = useState<
    "All" | "Leadership" | "Tech Arch"
  >("All");
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  const categories: Array<"All" | "Leadership" | "Tech Arch"> = [
    "All",
    "Leadership",
    "Tech Arch",
  ];

  const filteredArticles =
    activeCategory === "All"
      ? articles
      : articles.filter((a) => a.category === activeCategory);

  return (
    <section
      id="articles"
      className="max-w-4xl mx-auto px-6 mb-[68px] md:mb-[84px]"
    >
      <div className="mb-12">
        <h2 className="text-xs font-black text-indigo-600 uppercase tracking-[0.3em] mb-2">
          Insights
        </h2>
        <h3 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter mb-8 text-slate-900">
          TECHNICAL ARTICLES.
        </h3>

        <div className="flex gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 text-xs font-bold uppercase tracking-widest rounded-full border transition-all ${
                activeCategory === cat
                  ? "bg-indigo-600 text-white border-indigo-600"
                  : "bg-white text-slate-600 border-slate-200 hover:border-indigo-300"
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
              onClick={() => setSelectedArticle(article)}
              className="p-8 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all group cursor-pointer"
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
                {article.link !== "#" && (
                  <a
                    href={article.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-400 hover:text-indigo-600 transition-colors"
                    aria-label={`Open article: ${article.title}`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <ExternalLink className="w-5 h-5" />
                  </a>
                )}
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-indigo-600 transition-colors">
                {article.title}
              </h4>
              <p className="text-slate-600 text-sm leading-relaxed">
                {article.summary}
              </p>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {selectedArticle && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedArticle(null)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative w-full max-w-4xl max-h-[85vh] overflow-y-auto bg-white rounded-[2.5rem] p-8 md:p-12 shadow-2xl"
            >
              <button
                onClick={() => setSelectedArticle(null)}
                className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-900 transition-colors"
                aria-label="Close article details"
              >
                <X className="w-6 h-6" />
              </button>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                  <BookOpen className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
                  {selectedArticle.category}
                </span>
              </div>
              <h3 className="text-3xl font-black text-slate-900 mb-4">
                {selectedArticle.title}
              </h3>
              <div className="space-y-4 text-slate-600 text-lg leading-relaxed mb-8">
                {(selectedArticle.content || selectedArticle.summary)
                  .split("\n\n")
                  .map((para) => (
                    <p key={para}>{para}</p>
                  ))}
              </div>
              {selectedArticle.link !== "#" && (
                <a
                  href={selectedArticle.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200"
                >
                  Read Article <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
