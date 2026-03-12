"use client";
import React, { useEffect, useState } from "react";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { BackgroundEffect } from "./components/BackgroundEffect";
import { AnalyticsConsent } from "./components/AnalyticsConsent";
import { ObservabilityPanel } from "./components/ObservabilityPanel";
import { portfolioData } from "./data/portfolio";
import { HomePage } from "./pages/HomePage";
import { ArticleDetailPage } from "./pages/ArticleDetailPage";

export default function PortfolioPage() {
  const [articleSlug, setArticleSlug] = useState<string | null>(null);

  useEffect(() => {
    const updateSlug = () => {
      const path =
        typeof window !== "undefined" ? window.location.pathname : "/";
      const segments = path
        .split("/")
        .map((segment) => segment.trim())
        .filter(Boolean);
      const articlesIndex = segments.indexOf("articles");
      if (articlesIndex === -1 || !segments[articlesIndex + 1]) {
        setArticleSlug(null);
        return;
      }
      setArticleSlug(decodeURIComponent(segments[articlesIndex + 1]));
    };

    updateSlug();
    window.addEventListener("popstate", updateSlug);
    return () => window.removeEventListener("popstate", updateSlug);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-indigo-600 selection:text-white">
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <AnalyticsConsent />
      <ObservabilityPanel />
      <BackgroundEffect />
      <Header />
      <main id="main-content" className="pb-10">
        {articleSlug ? (
          <ArticleDetailPage slug={articleSlug} />
        ) : (
          <HomePage />
        )}
      </main>
      <Footer contact={portfolioData.contact} />
    </div>
  );
}

