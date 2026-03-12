"use client";
import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { BookOpen, ExternalLink } from "lucide-react";
import { getArticles, ArticleRecord } from "../lib/articles";
import { portfolioData } from "../data/portfolio";
import ReactMarkdown from "react-markdown";

export const Articles: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<
    "All" | "Leadership" | "Tech Arch"
  >("All");
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const categories: Array<"All" | "Leadership" | "Tech Arch"> = [
    "All",
    "Leadership",
    "Tech Arch",
  ];

  const allArticles = useMemo<ArticleRecord[]>(() => {
    const merged = getArticles();
    const seen = new Set<string>();
    return merged.filter((article) => {
      const key = `${article.slug}-${article.category}`;
      if (seen.has(key)) {
        return false;
      }
      seen.add(key);
      return true;
    });
  }, []);

  const fallbackArticles = useMemo<ArticleRecord[]>(
    () =>
      portfolioData.articles.map((article) => ({
        ...article,
        slug: article.title
          .toLowerCase()
          .replace(/[^a-z0-9\s-]/g, "")
          .trim()
          .replace(/\s+/g, "-"),
      })),
    [],
  );

  const sourceArticles = allArticles.length > 0 ? allArticles : fallbackArticles;

  const filteredArticles =
    activeCategory === "All"
      ? sourceArticles
      : sourceArticles.filter((a) => a.category === activeCategory);

  useEffect(() => {
    const getSlugFromPath = () => {
      if (typeof window === "undefined") {
        return null;
      }
      const segments = window.location.pathname
        .split("/")
        .map((segment) => segment.trim())
        .filter(Boolean);
      const articlesIndex = segments.indexOf("articles");
      if (articlesIndex === -1 || !segments[articlesIndex + 1]) {
        return null;
      }
      return decodeURIComponent(segments[articlesIndex + 1]);
    };

    const updateSlug = () => {
      setActiveSlug(getSlugFromPath());
    };

    updateSlug();
    window.addEventListener("popstate", updateSlug);
    return () => window.removeEventListener("popstate", updateSlug);
  }, []);

  const activeArticle = activeSlug
    ? sourceArticles.find((article) => article.slug === activeSlug)
    : undefined;

  if (activeSlug) {
    if (!activeArticle) {
      return (
        <section
          id="articles"
          className="max-w-4xl mx-auto px-6 mb-[68px] md:mb-[84px]"
        >
          <div className="mb-6">
            <a
              href="/#articles"
              className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-indigo-600"
            >
              ← Back to articles
            </a>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-8">
            <h3 className="text-2xl font-black text-slate-900 mb-2">
              Article not found
            </h3>
            <p className="text-slate-600 text-sm">
              The article you are looking for does not exist or was moved.
            </p>
          </div>
        </section>
      );
    }

    const ArticleContent = activeArticle.Content;

    return (
      <section
        id="articles"
        className="max-w-4xl mx-auto px-6 mb-[68px] md:mb-[84px]"
      >
        <div className="mb-6">
          <a
            href="/#articles"
            className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-indigo-600"
          >
            ← Back to articles
          </a>
        </div>
        <article className="rounded-3xl border border-slate-200 bg-white p-8 md:p-10 shadow-sm">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
              {activeArticle.category}
            </span>
            {activeArticle.readingTime && (
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                {activeArticle.readingTime}
              </span>
            )}
            {activeArticle.date && (
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                {activeArticle.date}
              </span>
            )}
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">
            {activeArticle.title}
          </h1>
          {activeArticle.summary && (
            <p className="text-slate-600 text-sm md:text-base mb-8">
              {activeArticle.summary}
            </p>
          )}
          <div className="prose prose-slate max-w-none prose-headings:scroll-mt-28">
            {ArticleContent ? (
              <ArticleContent />
            ) : (
              <ReactMarkdown>{activeArticle.content ?? ""}</ReactMarkdown>
            )}
          </div>
        </article>
      </section>
    );
  }

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
          {filteredArticles.map((article, i) => {
            const isExternal = article.link !== "#";
            const articleKey = `${article.slug}-${article.category}`;
            const card = (
              <motion.div
                key={articleKey}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: i * 0.1 }}
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
                  {article.readingTime && (
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                      {article.readingTime}
                    </span>
                  )}
                  {isExternal && (
                    <span className="text-slate-400">
                      <ExternalLink className="w-5 h-5" />
                    </span>
                  )}
                </div>
                <h4 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-indigo-600 transition-colors">
                  {article.title}
                </h4>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {article.summary}
                </p>
                {article.tags && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {article.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-black uppercase tracking-widest text-slate-500 bg-slate-100 px-2 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </motion.div>
            );

            if (isExternal) {
              return (
                <a
                  key={articleKey}
                  href={article.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                  aria-label={`Open article: ${article.title}`}
                >
                  {card}
                </a>
              );
            }

            return (
              <a
                key={articleKey}
                href={`/articles/${article.slug}`}
                className="block"
                aria-label={`Read article: ${article.title}`}
              >
                {card}
              </a>
            );
          })}
        </AnimatePresence>
      </div>
    </section>
  );
};
