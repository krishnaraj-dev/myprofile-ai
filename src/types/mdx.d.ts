declare module "*.mdx" {
  import type { ComponentType } from "react";

  export const meta: {
    title: string;
    category: string;
    summary: string;
    date: string;
    readingTime?: string;
    tags?: string[];
  };

  const MDXComponent: ComponentType;
  export default MDXComponent;
}
