# AGENTS.md

A dedicated guide for coding agents working on the Turbostarter monorepo. Use this file for setup, commands, and architecture/conventions when implementing changes.

## Environment & Tooling

- Node: >= 22.17.0
- Package manager: pnpm 10.15.x
- Monorepo: Turborepo (`turbo.json`)
- Env loader: `dotenv-cli` via `with-env` script
- Global envs (turborepo): `DATABASE_URL`, `PRODUCT_NAME`, `URL`, `DEFAULT_LOCALE`
- Place a `.env` at the repo root; root scripts use `pnpm with-env` to load it.

## Setup commands

- Install deps: `pnpm install`
- Clean caches/artifacts: `pnpm clean`

## Dev commands

- Start monorepo dev (runs package dev tasks via Turborepo): `pnpm dev`
- Start a specific app:
  - Web: `pnpm --filter web dev`
  - Mobile (Expo): `pnpm --filter mobile dev`
  - Extension (Chrome): `pnpm --filter extension dev`
  - Extension (Firefox): `pnpm --filter extension dev:firefox`

## Build commands

- Build all packages/apps: `pnpm build`
- Build specific app:
  - Web: `pnpm --filter web build`
  - Mobile: No generic build script. Use platform builds:
    - iOS (local run): `pnpm --filter mobile ios`
    - Android (local run): `pnpm --filter mobile android`
    - For CI/release builds, use EAS or platform toolchains
  - Extension zips:
    - Chrome: `pnpm --filter extension build:chrome`
    - Firefox: `pnpm --filter extension build:firefox`

## Quality & Types

- Format (check): `pnpm format`
- Format (write): `pnpm format:fix`
- Lint (check): `pnpm lint`
- Lint (fix): `pnpm lint:fix`
- Typecheck: `pnpm typecheck`

## Database (Drizzle)

- Start services (Docker): `pnpm services:start`
- Stop services: `pnpm services:stop`
- Services status: `pnpm services:status`
- Services logs: `pnpm services:logs`
- First-time setup: `pnpm --filter @turbostarter/db setup`
- Generate migrations: `pnpm with-env -F @turbostarter/db generate`
- Apply migrations: `pnpm with-env -F @turbostarter/db migrate`
- Push schema (safe envs): `pnpm with-env -F @turbostarter/db push`
- Check schema drift: `pnpm with-env -F @turbostarter/db check`
- Studio: `pnpm with-env -F @turbostarter/db studio`

Note: All db commands will load `.env` via `with-env`.

## Project structure

- `apps/` applications
  - `web`: Next.js App Router web app
  - `mobile`: React Native (Expo) app
  - `extension`: WXT (Vite + React) browser extension
- `packages/` shared modules
  - `api`: Hono API logic
  - `auth`: Better Auth setup and helpers
  - `billing`: Billing provider integrations (Stripe, LemonSqueezy, etc.)
  - `cms`: Content Collections
  - `db`: Drizzle ORM schema and utils
  - `email`: Email templates and providers
  - `i18n`: Internationalization utilities
  - `shared`: Common utilities and helpers
  - `storage`: File storage integrations
  - `ui`: Shared UI components (`ui-web`, `ui-mobile`, shared styles/types)
- `tooling/` ESLint, Prettier, Tailwind, TS configs

## Code style and structure

- Write concise, technical TypeScript; prefer functional, declarative patterns; avoid classes
- Prefer iteration and modularization over duplication
- Use descriptive variable names with auxiliaries (e.g., `isLoading`, `hasError`)
- File layout: exported component first, then subcomponents, helpers, static content, types
- Use interfaces over types; avoid enums (prefer maps)
- Declarative JSX; avoid unnecessary curly braces in simple conditionals
- Error handling: guard clauses and early returns
- Validation: use Zod for forms and inputs
- Expected errors: model as return values in Server Actions; use error boundaries for unexpected errors

## Web app (`apps/web`)

- Stack: Next.js (App Router), React, Tailwind CSS, shared `@turbostarter/ui-web`
- Structure: `src/app/[locale]` with segments `(marketing)`, `auth`, `dashboard`
- API routes in `src/app/api` may proxy/use `packages/api`
- Guidance:
  - Favor React Server Components; minimize `use client`, `useEffect`, `setState`
  - Wrap client components in `Suspense` with fallbacks; use dynamic import for non-critical code
  - Use Tailwind; Shadcn/Radix for components; mobile-first responsive design
  - Optimize images (WebP, sizes, lazy loading); focus on Web Vitals (LCP, CLS, FID)
  - Use `nuqs` for URL search param state

## Mobile app (`apps/mobile`)

- Stack: React Native + Expo, Expo Router, shared `@turbostarter/ui-mobile`
- Structure: `src/app` with tabs, `auth`, `settings`; components in `src/components`
- Guidance:
  - Safe areas: use `SafeAreaProvider`, `SafeAreaView`, and scroll variants
  - Performance: reduce `useState`/`useEffect`; memoize (`React.memo`, `useMemo`, `useCallback`)
  - Use Expo SplashScreen; dynamic import where helpful; optimize images (`expo-image`, WebP)

## Browser extension (`apps/extension`)

- Stack: WXT (Vite + React), Tailwind, shared `@turbostarter/ui-web`
- Entrypoints: `src/app` provides `background`, `content`, `popup`, `options`, `sidepanel`, `newtab`, `devtools`
- Guidance:
  - Background script for long-running tasks; content scripts for DOM interactions
  - Use WXT messaging or `@webext-core/messaging` for communication
  - Store data via browser storage APIs; integrate `packages/api` and `packages/auth` as needed

## Packages overview (`packages/`)

- `analytics` (web/mobile/extension): platform analytics helpers
- `api`: server-side Hono modules (AI, auth, billing, storage)
- `auth`: Better Auth server/client, schemas, helpers
- `billing`: config + providers, checkout/subscriptions/webhooks
- `cms`: content collections and types
- `db`: Drizzle schema, migrations, server utils
- `email`: templates + providers (e.g., Resend)
- `i18n`: i18n setup, translations, helpers
- `shared`: utilities, hooks, constants
- `storage`: file storage providers and types
- `ui`: shared UI and styling primitives

## Next.js specifics

- Prefer RSC; keep `use client` minimal and scoped to Web API usage
- Avoid client-side data fetching for server-eligible work; keep state local and lean

## Contributing guidance for agents

- Adhere to the conventions above; match existing formatting; do not reformat unrelated code
- Add imports and types explicitly; avoid `any` and unsafe casts
- Handle edge cases early; return structured errors for expected failures
- Keep components small and modular; name variables descriptively
- When modifying multiple areas, prefer creating shared helpers in `packages/*` to avoid duplication

## Notes

- There is no repository-wide `test` script currently defined. Add tests and scripts when introducing testable modules.
- Use root scripts for monorepo operations; prefer `pnpm --filter <pkg> <cmd>` when targeting a specific package.
