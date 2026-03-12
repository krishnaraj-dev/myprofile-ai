import type { ComponentType } from "react";
import { portfolioData } from "../data/portfolio";
import { getMdxArticles } from "../content/articles";

export type ArticleRecord = {
  title: string;
  category: string;
  summary: string;
  content?: string;
  link: string;
  date?: string;
  readingTime?: string;
  tags?: string[];
  slug: string;
  Content?: ComponentType;
};

const slugify = (value: string): string =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");

export const getArticles = (): ArticleRecord[] => {
  const mdxArticles = getMdxArticles().map((article) => ({
    title: article.title,
    category: article.category,
    summary: article.summary,
    content: undefined,
    link: "#",
    date: article.date,
    readingTime: article.readingTime,
    tags: article.tags,
    slug: article.slug,
    Content: article.Content,
  }));

  const dataArticles = portfolioData.articles.map((article) => ({
    ...article,
    slug: slugify(article.title),
  }));

  const merged = [...mdxArticles, ...dataArticles];
  const seen = new Set<string>();

  return merged.filter((article) => {
    const key = `${article.slug}-${article.category}`;
    if (seen.has(key)) {
      return false;
    }
    seen.add(key);
    return true;
  });
};
