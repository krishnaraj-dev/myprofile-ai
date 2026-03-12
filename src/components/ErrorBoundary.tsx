"use client";
import React from "react";
import { captureClientError } from "../lib/observability";

type ErrorBoundaryState = {
  hasError: boolean;
};

export class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    captureClientError(error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-50 text-slate-900 flex items-center justify-center px-6">
          <div className="max-w-md text-center">
            <h1 className="text-2xl font-black mb-3">Something went wrong</h1>
            <p className="text-slate-600">
              Please refresh the page. If the issue persists, contact support.
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
