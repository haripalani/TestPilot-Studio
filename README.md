# TestPilot: Unified Software Testing Platform

TestPilot is a developer-first testing IDE/platform that unifies web, mobile, API, performance, and security testing under a single DSL and ecosystem.

## 🏗️ Phase 0: CLI Prototype (Completed)
- Monorepo setup with Turborepo and pnpm.
- Core DSL Engine for parsing `.pilot` files.
- Playwright adapter for web automation.
- API testing adapter for Axios-based HTTP requests.
- Flexible CLI for running tests and exploring features.

## 🗺️ Roadmap
- **Phase 1: IDE & Cloud** (Current): NestJS backend, Next.js web IDE, test management dashboards.
- **Phase 2: Mobile Power**: Desktop IDE, Appium integration, device management.
- **Phase 3: Perf & Sec**: k6 load testing, OWASP ZAP security scanning.
- **Phase 4: AI Co-Pilot**: AI-generated tests, self-healing selectors.

## 🛠️ Tech Stack
- **Languages**: TypeScript / JavaScript
- **Monorepo**: Turborepo, pnpm
- **CLI**: Commander.js
- **Testing**: Playwright, Axios
- **Engine**: Custom DSL Parser (`packages/engine`)

## 🚀 Getting Started
1. Clone the repository.
2. Install dependencies: `pnpm install`
3. Run the CLI: `npm run dev` (from the root) or use `npm run test:pilot` to run a sample test.

---
Created and managed by [haripalani](https://github.com/haripalani).
