import type { Metadata } from "next";
import Script from "next/script";
import React from "react";
import "../src/index.css";
import { Header } from "../src/components/Header";
import { Footer } from "../src/components/Footer";
import { BackgroundEffect } from "../src/components/BackgroundEffect";
import { AnalyticsConsent } from "../src/components/AnalyticsConsent";
import { ObservabilityPanel } from "../src/components/ObservabilityPanel";
import { portfolioData } from "../src/data/portfolio";

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
      <body>
        <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-indigo-600 selection:text-white">
          <a href="#main-content" className="skip-link">
            Skip to content
          </a>
          <AnalyticsConsent />
          <ObservabilityPanel />
          <BackgroundEffect />
          <Header />
          <main id="main-content" className="pb-10">
            {children}
          </main>
          <Footer contact={portfolioData.contact} />
        </div>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-72WVNGJ78B"
          strategy="afterInteractive"
        />
        <Script id="ga-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-72WVNGJ78B', {
              anonymize_ip: true,
              allow_google_signals: false,
              allow_ad_personalization_signals: false
            });
          `}
        </Script>
      </body>
    </html>
  );
}
