import type { Metadata } from "next";
import React from "react";
import "../src/index.css";

export const metadata: Metadata = {
  title: "Krishnaraj R | Lead Software Engineer",
  description: "Portfolio, experience, and projects for Krishnaraj R.",
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
