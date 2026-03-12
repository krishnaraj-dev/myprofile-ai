type ObservabilityPayload = {
  message: string;
  stack?: string;
  url?: string;
  context?: Record<string, unknown>;
};

const getEndpoint = (): string | undefined =>
  import.meta.env.VITE_OBSERVABILITY_ENDPOINT;

const send = async (payload: ObservabilityPayload) => {
  const endpoint = getEndpoint();
  if (!endpoint) {
    return;
  }

  try {
    await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      keepalive: true,
    });
  } catch {
    // Intentionally swallow errors to avoid cascading failures.
  }
};

export const captureClientError = (error: Error, context?: Record<string, unknown>) => {
  void send({
    message: error.message,
    stack: error.stack,
    url: typeof window !== "undefined" ? window.location.href : undefined,
    context,
  });
};
