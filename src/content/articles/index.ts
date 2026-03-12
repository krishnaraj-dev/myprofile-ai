import type { ComponentType } from "react";
import EngineeringCulture, {
  meta as engineeringCultureMeta,
} from "./engineering-culture.mdx";
import EventDriven, { meta as eventDrivenMeta } from "./event-driven.mdx";

type ArticleMeta = {
  title: string;
  category: string;
  summary: string;
  date: string;
  readingTime?: string;
  tags?: string[];
};

export type MdxArticle = ArticleMeta & {
  Content: ComponentType;
  slug: string;
};

export const getMdxArticles = (): MdxArticle[] => [
  {
    ...engineeringCultureMeta,
    Content: EngineeringCulture,
    slug: "engineering-culture",
  },
  {
    ...eventDrivenMeta,
    Content: EventDriven,
    slug: "event-driven",
  },
];
