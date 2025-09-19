# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Architecture

This is a **TurboStarter** monorepo using pnpm workspaces, Turbo, and Next.js. It contains three main applications and supporting packages:

### Applications
- **`apps/web`**: Next.js 15 web application with App Router, React 19, TypeScript, and Tailwind CSS
- **`apps/mobile`**: React Native app using Expo Router and NativeWind
- **`apps/extension`**: Browser extension built with WXT framework

### Core Packages
- **`packages/db`**: Database layer using Drizzle ORM with PostgreSQL
- **`packages/api`**: API layer built with Hono framework
- **`packages/auth`**: Authentication logic shared across applications
- **`packages/billing`**: Billing and subscription management
- **`packages/i18n`**: Internationalization configuration
- **`packages/ui`**: Shared UI components
- **`packages/email`**: Email templates and sending logic
- **`packages/storage`**: File storage utilities

## Development Commands

### Initial Setup
```bash
# Install dependencies
pnpm install

# Start PostgreSQL database
pnpm services:start

# Run database migrations and setup
pnpm services:setup

# Copy .env.example to .env and configure
cp .env.example .env
```

### Common Development Tasks
```bash
# Start development servers (all apps)
pnpm dev

# Start specific app
pnpm --filter web dev        # Web app on http://localhost:3000
pnpm --filter mobile dev     # Mobile app with Expo
pnpm --filter extension dev  # Browser extension

# Build all apps
pnpm build

# Type checking
pnpm typecheck

# Linting
pnpm lint
pnpm lint:fix

# Formatting
pnpm format
pnpm format:fix

# Clean build artifacts
pnpm clean
```

### Database Management
```bash
# Generate migrations after schema changes
pnpm with-env -F @turbostarter/db generate

# Apply migrations
pnpm with-env -F @turbostarter/db migrate

# Push schema changes directly (safe envs only)
pnpm with-env -F @turbostarter/db push

# Check schema drift
pnpm with-env -F @turbostarter/db check

# Open Drizzle Studio for database inspection
pnpm with-env -F @turbostarter/db studio

# First-time setup
pnpm --filter @turbostarter/db setup
```

### Docker Services
```bash
# Start services (PostgreSQL)
pnpm services:start

# Stop services
pnpm services:stop

# View logs
pnpm services:logs

# Check status
pnpm services:status
```

## Testing
```bash
# Note: No repository-wide test script currently defined
# Add tests and scripts when introducing testable modules
pnpm --filter [package-name] test

# Run a single test file
pnpm --filter [package-name] test [test-file-path]
```

## Environment Configuration

The monorepo uses Node.js 22.17+ (pnpm 10.15.x) and requires the following environment variables:

- `DATABASE_URL`: PostgreSQL connection string
- `PRODUCT_NAME`: Name of the product used across apps
- `URL`: Web application URL
- `DEFAULT_LOCALE`: Default locale for internationalization

Each app may have additional `.env` requirements - check their respective directories.

## Key Architectural Patterns

### API Routes
The web application uses Hono-based API routes through the `@turbostarter/api` package. API endpoints are type-safe and use Zod for validation.

### Database Schema
Database models are defined in `packages/db/src/schema/` using Drizzle ORM. Schema changes require running migrations.

### Authentication
Authentication is centralized in `packages/auth` and supports multiple strategies across web, mobile, and extension platforms.

### Internationalization
All apps support multiple locales through the `packages/i18n` package. The web app uses Next.js i18n routing with the `[locale]` dynamic segment.

### State Management
- Web/Extension: Zustand for client state, React Query for server state
- Mobile: React Query with Async Storage persistence

## Code Style and Conventions

### General Principles
- Write concise, technical TypeScript with functional, declarative patterns
- Prefer iteration and modularization over duplication
- Use descriptive variable names with auxiliaries (e.g., `isLoading`, `hasError`)
- Use interfaces over types; avoid enums (prefer maps)
- Handle errors with guard clauses and early returns
- Use Zod for validation of forms and inputs
- Model expected errors as return values in Server Actions

### File Structure
- Exported component first, then subcomponents, helpers, static content, types
- Keep components small and modular
- When modifying multiple areas, create shared helpers in `packages/*`

### Platform-Specific Guidelines

**Web App (Next.js):**
- Prefer React Server Components; minimize `use client`, `useEffect`, `setState`
- Wrap client components in `Suspense` with fallbacks
- Use dynamic imports for non-critical code
- Use Tailwind CSS with mobile-first responsive design
- Use `nuqs` for URL search param state
- Optimize images (WebP, sizes, lazy loading)

**Mobile App (React Native/Expo):**
- Use `SafeAreaProvider` and `SafeAreaView` for safe areas
- Minimize `useState`/`useEffect`; use memoization
- Use `expo-image` with WebP format
- Dynamic import where helpful

**Extension (WXT):**
- Background script for long-running tasks
- Content scripts for DOM interactions
- Use WXT messaging or `@webext-core/messaging`

## Important Notes

- Always run `pnpm install` at the root, never in individual packages
- Database must be running (`pnpm services:start`) before starting development
- Use `pnpm --filter [package-name]` or `pnpm -F [package-name]` for specific packages
- The monorepo uses catalog versions defined in `pnpm-workspace.yaml`
- Turbo caches build outputs - use `pnpm clean` if you encounter issues
- All db commands load `.env` via `with-env`
- Adhere to existing formatting; do not reformat unrelated code
- Add imports and types explicitly; avoid `any` and unsafe casts