import React from "react";

type ReactMarkdownProps = React.PropsWithChildren<{
  children?: string | string[];
}>;

const ReactMarkdown: React.FC<ReactMarkdownProps> = ({ children }) => (
  <div data-testid="react-markdown">{children}</div>
);

export default ReactMarkdown;
