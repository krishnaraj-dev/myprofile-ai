"use client";
import React from "react";
import { BookOpen } from "lucide-react";
import { SpaLink } from "../components/SpaLink";
import { getArticles } from "../lib/articles";

type ArticleDetailPageProps = {
  slug: string;
};

export const ArticleDetailPage: React.FC<ArticleDetailPageProps> = ({ slug }) => {
  const articles = getArticles();
  const article = articles.find((item) => item.slug === slug);

  if (!article) {
    return (
      <section className="max-w-4xl mx-auto px-6 pt-32 md:pt-36 pb-12">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
            <BookOpen className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
            Articles
          </span>
        </div>

        <SpaLink
          href="/#articles"
          className="text-sm font-semibold text-slate-500 hover:text-indigo-600 transition-colors"
        >
          {"<-"} Back to articles
        </SpaLink>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter mt-4 mb-4 text-slate-900">
          Article not found
        </h1>
        <p className="text-slate-600 text-lg leading-relaxed">
          The article you are looking for does not exist or was moved.
        </p>
      </section>
    );
  }

  return (
    <section className="max-w-4xl mx-auto px-6 pt-32 md:pt-36 pb-12">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
          <BookOpen className="w-5 h-5" />
        </div>
        <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
          {article.category}
        </span>
        {article.readingTime && (
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
            {article.readingTime}
          </span>
        )}
      </div>

      <SpaLink
        href="/#articles"
        className="text-sm font-semibold text-slate-500 hover:text-indigo-600 transition-colors"
      >
        {"<-"} Back to articles
      </SpaLink>

      <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter mt-4 mb-6 text-slate-900">
        {article.title}
      </h1>

      {article.tags && (
        <div className="flex flex-wrap gap-2 mb-6">
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

      <div className="space-y-5 text-slate-600 text-lg leading-relaxed">
        {article.Content ? (
          <article.Content />
        ) : (
          (article.content || article.summary)
            .split("\n\n")
            .map((para) => <p key={para}>{para}</p>)
        )}
      </div>
    </section>
  );
};
