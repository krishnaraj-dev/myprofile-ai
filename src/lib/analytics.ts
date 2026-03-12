type AnalyticsConfig = {
  src?: string;
  dataDomain?: string;
  dataWebsiteId?: string;
};

const readEnv = (key: string): string | undefined => {
  if (typeof import.meta !== "undefined") {
    const metaEnv = (import.meta as unknown as { env?: Record<string, string> }).env;
    if (metaEnv && key in metaEnv) {
      return metaEnv[key];
    }
  }
  if (typeof process !== "undefined") {
    return process.env[key];
  }
  return undefined;
};

export const getAnalyticsConfig = (): AnalyticsConfig => ({
  src: readEnv("VITE_ANALYTICS_SRC"),
  dataDomain: readEnv("VITE_ANALYTICS_DOMAIN"),
  dataWebsiteId: readEnv("VITE_ANALYTICS_WEBSITE_ID"),
});

export const loadAnalytics = () => {
  const { src, dataDomain, dataWebsiteId } = getAnalyticsConfig();
  if (!src) {
    return;
  }

  if (document.querySelector(`script[data-analytics="true"]`)) {
    return;
  }

  const script = document.createElement("script");
  script.src = src;
  script.async = true;
  script.defer = true;
  script.setAttribute("data-analytics", "true");
  if (dataDomain) {
    script.setAttribute("data-domain", dataDomain);
  }
  if (dataWebsiteId) {
    script.setAttribute("data-website-id", dataWebsiteId);
  }
  document.head.appendChild(script);
};
