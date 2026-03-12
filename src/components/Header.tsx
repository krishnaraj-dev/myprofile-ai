"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { useAppStore } from "../store/useStore";

const NAV_ITEMS = [
  { id: "about", name: "About", href: "#about" },
  { id: "skills", name: "Skills", href: "#skills" },
  { id: "projects", name: "Projects", href: "#projects" },
  { id: "articles", name: "Articles", href: "#articles" },
  { id: "experience", name: "Experience", href: "#experience" },
  { id: "career-path", name: "Career Path", href: "#career-path" },
] as const;

const MOBILE_NAV_ITEMS = [
  ...NAV_ITEMS,
  { id: "contact", name: "Contact", href: "#contact" },
] as const;

export const Header: React.FC = () => {
  const { isMobileMenuOpen, setIsMobileMenuOpen } = useAppStore();
  const [isOnArticlePage, setIsOnArticlePage] = useState(false);
  const [activeSection, setActiveSection] = useState<string>(() => {
    if (typeof window === "undefined") {
      return "about";
    }
    const hash = window.location.hash.replace("#", "");
    return hash || "about";
  });
  const menuRef = useRef<HTMLElement | null>(null);
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);
  const wasMenuOpen = useRef(false);

  const sectionIds = useMemo(
    () => MOBILE_NAV_ITEMS.map((item) => item.id),
    [],
  );

  useEffect(() => {
    const updateIsOnArticlePage = () => {
      if (typeof window === "undefined") {
        setIsOnArticlePage(false);
        return;
      }
      setIsOnArticlePage(window.location.pathname.startsWith("/articles/"));
    };

    updateIsOnArticlePage();
    window.addEventListener("popstate", updateIsOnArticlePage);
    return () => window.removeEventListener("popstate", updateIsOnArticlePage);
  }, []);

  useEffect(() => {
    const onHashChange = () => {
      const hash = window.location.hash.replace("#", "");
      if (hash) {
        setActiveSection(hash);
      }
    };

    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  useEffect(() => {
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));

    if (sections.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) {
          setActiveSection(visible[0].target.id);
        }
      },
      {
        rootMargin: "-20% 0px -60% 0px",
        threshold: [0.1, 0.35, 0.6],
      },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [sectionIds]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      const previousOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";

      const menuEl = menuRef.current;
      const focusables = menuEl?.querySelectorAll<HTMLElement>(
        "button, [href], input, select, textarea, [tabindex]:not([tabindex=\"-1\"])",
      );
      const first = focusables?.[0];
      const last = focusables?.[focusables.length - 1];
      first?.focus();

      const handleKeydown = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
          setIsMobileMenuOpen(false);
          return;
        }

        if (event.key === "Tab" && focusables && focusables.length > 0) {
          if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last?.focus();
          } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first?.focus();
          }
        }
      };

      document.addEventListener("keydown", handleKeydown);

      return () => {
        document.body.style.overflow = previousOverflow;
        document.removeEventListener("keydown", handleKeydown);
      };
    }

    return undefined;
  }, [isMobileMenuOpen, setIsMobileMenuOpen]);

  useEffect(() => {
    if (wasMenuOpen.current && !isMobileMenuOpen) {
      menuButtonRef.current?.focus();
    }
    wasMenuOpen.current = isMobileMenuOpen;
  }, [isMobileMenuOpen]);

  const buildHref = (hash: string) =>
    isOnArticlePage ? `/${hash}` : hash;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-[30px]`}
    >
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex items-center justify-between rounded-full transition-all duration-300 bg-white md:bg-white/90 backdrop-blur-none md:backdrop-blur-xl shadow-lg shadow-slate-200/50 border border-slate-200/50 px-6 py-3">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
            <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center shadow-md shadow-indigo-200">
              <span className="text-white font-bold text-lg">K</span>
            </div>
            <span className="font-bold text-lg tracking-tight text-slate-900 hidden sm:block">
              Krishnaraj
            </span>
          </motion.div>

          <nav className="hidden md:flex items-center gap-1 bg-slate-100/50 p-1 rounded-full border border-slate-200/50">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.name}
                href={buildHref(item.href)}
                aria-current={
                  activeSection === item.id ? "page" : undefined
                }
                className={`px-4 py-2 text-sm font-semibold rounded-full transition-all ${
                  activeSection === item.id
                    ? "text-indigo-600 bg-white"
                    : "text-slate-600 hover:text-indigo-600 hover:bg-white"
                }`}
              >
                {item.name}
              </a>
            ))}
          </nav>

          <div className="hidden md:block">
            <a
              href={buildHref("#contact")}
              className="px-6 py-2.5 bg-slate-900 text-white rounded-full text-sm font-bold hover:bg-indigo-600 transition-all shadow-sm"
            >
              Let&apos;s Talk
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-slate-600 bg-slate-100 rounded-full"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-nav"
            ref={menuButtonRef}
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <>
            <div
              className="md:hidden fixed inset-0 z-[998] bg-slate-900/30 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-hidden="true"
            />
            <motion.nav
              id="mobile-nav"
              initial={{ x: "-100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="md:hidden fixed top-0 left-0 h-[100dvh] w-[86%] max-w-[360px] z-[999] bg-white shadow-2xl border-r border-slate-200 p-6 flex flex-col gap-4"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation"
              ref={menuRef}
            >
            <button
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 text-slate-700"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="mt-6 flex flex-col gap-3">
              {MOBILE_NAV_ITEMS.map((item) => (
                <a
                  key={item.name}
                  href={buildHref(item.href)}
                  aria-current={
                    activeSection === item.id ? "page" : undefined
                  }
                  className={`text-lg font-bold px-4 py-3 rounded-xl transition-colors ${
                    activeSection === item.id
                      ? "text-indigo-600 bg-slate-50"
                      : "text-slate-900 hover:bg-slate-50"
                  }`}
                  onClick={() => {
                    setActiveSection(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                >
                  {item.name}
                </a>
              ))}
            </div>
            <a
              href={buildHref("#contact")}
              className="mt-2 px-6 py-4 bg-indigo-600 text-white rounded-xl text-center font-bold"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Let&apos;s Talk
            </a>
            </motion.nav>
          </>
        )}
      </div>
    </header>
  );
};
