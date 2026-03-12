# Roadmap (Global Standards)

## Phase 1: Foundation (0-4 weeks)
1. Accessibility baseline: WCAG 2.2 AA audit, add skip link, focus traps, `aria-current`, and keyboard navigation.
2. Performance baseline: Core Web Vitals targets (LCP < 2.5s, INP < 200ms, CLS < 0.1), with Lighthouse CI thresholds.
3. SEO hygiene: structured data validation, canonical tags, sitemap, robots.txt, and Open Graph/Twitter checks.
4. Security basics: CSP, security headers, and dependency audit with remediation policy.
5. Internationalization ready: add i18n scaffolding and locale-aware routing without translating content yet.

## Phase 2: Product Quality (1-2 months)
1. Content system: MDX/Markdown pipeline for articles with tags, reading time, and RSS.
2. Resume export: PDF generation with versioned changelog and print-friendly styles.
3. Analytics: privacy-first analytics with consent controls (GDPR/CCPA compliant).
4. Observability: error tracking (client + server) and performance monitoring dashboards.
5. Visual consistency: design tokens, typography scale, and color contrast checks.

## Phase 3: Scale & Growth (2-4 months)
1. Localization: English + 1 additional locale with translation workflow.
2. PWA readiness: offline fallback, caching strategy, and install prompt.
3. A/B testing framework for CTA and hero messaging.
4. Case studies: dedicated pages with architecture diagrams and measurable outcomes.

## Phase 4: Advanced Enhancements (4-6 months)
1. Personalization: configurable sections and saved user preferences.
2. Accessibility excellence: AAA where practical (motion, contrast, alternative navigation).
3. Security hardening: SRI, automated dependency update pipeline, and periodic pentest checklist.
4. Performance excellence: bundle splitting, image CDN integration, and adaptive loading.

## Milestone Checklist
1. Document non-functional requirements (NFRs) and acceptance criteria for each release.
2. Add automated QA gates in CI (lint, typecheck, tests, Lighthouse).
3. Maintain a changelog with semantic versioning for public releases.
