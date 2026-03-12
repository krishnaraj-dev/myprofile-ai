"use client";
import React, { useEffect, useSyncExternalStore } from "react";
import { loadAnalytics } from "../lib/analytics";

const CONSENT_KEY = "analytics-consent";

export const AnalyticsConsent: React.FC = () => {
  const getSnapshot = () => {
    if (typeof window === "undefined") {
      return null;
    }
    const stored = window.localStorage.getItem(CONSENT_KEY);
    return stored === "accepted" || stored === "declined" ? stored : null;
  };

  const subscribe = (callback: () => void) => {
    if (typeof window === "undefined") {
      return () => undefined;
    }
    const handler = () => callback();
    window.addEventListener("storage", handler);
    window.addEventListener("consent-change", handler);
    handler();
    return () => {
      window.removeEventListener("storage", handler);
      window.removeEventListener("consent-change", handler);
    };
  };

  const consent = useSyncExternalStore(subscribe, getSnapshot, () => null);

  const updateConsent = (value: "accepted" | "declined") => {
    if (typeof window === "undefined") {
      return;
    }
    window.localStorage.setItem(CONSENT_KEY, value);
    window.dispatchEvent(new Event("consent-change"));
  };

  useEffect(() => {
    if (consent === "accepted") {
      loadAnalytics();
    }
  }, [consent]);

  if (consent !== null) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[120] w-[calc(100%-2rem)] max-w-2xl bg-white border border-slate-200 shadow-2xl rounded-3xl p-5 md:p-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="text-sm text-slate-600">
          This site uses privacy-first analytics to improve content. No personal
          data is sold or shared.
        </div>
        <div className="flex gap-2">
          <button
            className="px-4 py-2 rounded-full bg-slate-100 text-slate-700 text-sm font-semibold"
            onClick={() => updateConsent("declined")}
          >
            Decline
          </button>
          <button
            className="px-4 py-2 rounded-full bg-indigo-600 text-white text-sm font-semibold"
            onClick={() => updateConsent("accepted")}
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
};
