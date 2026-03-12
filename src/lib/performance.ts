import { captureClientError } from "./observability";

type LayoutShiftEntry = PerformanceEntry & {
  value: number;
  hadRecentInput: boolean;
};

type PerformanceObserverInitLike = {
  type: string;
  buffered?: boolean;
  durationThreshold?: number;
};

type MetricPayload = {
  name: string;
  value: number;
  id: string;
};

const storeMetric = (metric: MetricPayload) => {
  try {
    const existing = window.localStorage.getItem("perf-metrics");
    const metrics = existing ? (JSON.parse(existing) as MetricPayload[]) : [];
    metrics.push(metric);
    window.localStorage.setItem("perf-metrics", JSON.stringify(metrics.slice(-50)));
  } catch {
    // Ignore storage issues.
  }
};

const sendMetric = async (metric: MetricPayload) => {
  const endpoint = import.meta.env.VITE_PERFORMANCE_ENDPOINT;
  if (!endpoint) {
    storeMetric(metric);
    return;
  }

  try {
    await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(metric),
      keepalive: true,
    });
    storeMetric(metric);
  } catch (error) {
    captureClientError(error as Error, { metric });
  }
};

export const startPerformanceMonitoring = () => {
  if (typeof window === "undefined" || !("PerformanceObserver" in window)) {
    return;
  }

  const metrics: MetricPayload[] = [];
  const send = (name: string, value: number, id: string) => {
    const metric = { name, value, id };
    metrics.push(metric);
    void sendMetric(metric);
  };

  try {
    new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        if (entry.entryType === "largest-contentful-paint") {
          send("LCP", entry.startTime, entry.name ?? "lcp");
        }
      }
    }).observe({ type: "largest-contentful-paint", buffered: true });

    new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        if (entry.entryType === "layout-shift" && !(entry as LayoutShiftEntry).hadRecentInput) {
          const shift = entry as LayoutShiftEntry;
          send("CLS", shift.value, shift.name ?? "cls");
        }
      }
    }).observe({ type: "layout-shift", buffered: true });

    new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        if (entry.entryType === "event") {
          const eventEntry = entry as PerformanceEventTiming;
          const value = eventEntry.duration;
          send("INP", value, eventEntry.name ?? "inp");
        }
      }
    }).observe({
      type: "event",
      buffered: true,
      durationThreshold: 40,
    } as PerformanceObserverInitLike);
  } catch {
    // Some browsers may throw for unsupported entry types.
  }
};
