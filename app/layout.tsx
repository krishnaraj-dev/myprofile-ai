import type { Metadata } from "next";
import React from "react";
import "../src/index.css";

export const metadata: Metadata = {
  title: "Krishnaraj R | Lead Software Engineer & AI Architect",
  description:
    "Portfolio of Krishnaraj R, Lead Software Engineer specializing in React, Next.js, and AI-augmented development.",
  keywords: [
    "Krishnaraj R",
    "Lead Software Engineer",
    "React",
    "Next.js",
    "AI Architect",
    "LLM",
    "TypeScript",
    "Frontend Architect",
    "Portfolio",
    "Chennai",
  ],
  openGraph: {
    title: "Krishnaraj R | Lead Software Engineer",
    description:
      "React/Next.js architect focused on AI-augmented development and scalable web platforms.",
    url: "https://krishnaraj-dev.github.io/myprofile-ai/",
    siteName: "Krishnaraj R Portfolio",
    images: [
      {
        url: "https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6",
        width: 1200,
        height: 475,
        alt: "Krishnaraj R Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Krishnaraj R | Lead Software Engineer",
    description:
      "React/Next.js architect focused on AI-augmented development and scalable web platforms.",
    images: [
      "https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6",
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
