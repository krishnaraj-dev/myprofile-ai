"use client";
import React, { useState } from "react";

type MetricPayload = {
  name: string;
  value: number;
  id: string;
};

const readMetrics = (): MetricPayload[] => {
  if (typeof window === "undefined") {
    return [];
  }
  try {
    const stored = window.localStorage.getItem("perf-metrics");
    return stored ? (JSON.parse(stored) as MetricPayload[]) : [];
  } catch {
    return [];
  }
};

export const ObservabilityPanel: React.FC = () => {
  const [metrics] = useState<MetricPayload[]>(() => readMetrics());
  if (typeof window === "undefined") {
    return null;
  }

  const params = new URLSearchParams(window.location.search);
  if (params.get("obs") !== "1") {
    return null;
  }

  return (
    <div className="fixed top-4 right-4 z-[130] w-[320px] bg-white border border-slate-200 shadow-xl rounded-2xl p-4">
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-xs font-black uppercase tracking-widest text-slate-600">
          Observability
        </h4>
        <button
          className="text-xs text-slate-400"
          onClick={() => window.location.replace(window.location.pathname)}
        >
          Close
        </button>
      </div>
      {metrics.length === 0 ? (
        <p className="text-sm text-slate-500">No metrics captured yet.</p>
      ) : (
        <div className="space-y-2 text-sm text-slate-700">
          {metrics.slice(-8).map((metric, index) => (
            <div
              key={`${metric.name}-${index}`}
              className="flex items-center justify-between"
            >
              <span className="font-semibold">{metric.name}</span>
              <span>{Math.round(metric.value)} ms</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
