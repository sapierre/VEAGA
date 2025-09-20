# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with the VEAGA codebase.

## VEAGA - Virtual Engagement and Giving Assistant

**VEAGA** is a multi-tenant SaaS platform that enables nonprofit gift officers and donor concierges to scale authentic donor relationships through AI-powered engagement flows with human-in-the-loop governance.

### Target Users
- Major gift officers managing 100+ donor portfolios
- Donor concierges and stewardship staff
- Nonprofit development teams

### Core Value Proposition
Scale personal donor relationships from ~50 to 100+ donors per officer while maintaining authenticity, compliance, and human oversight through visual donor engagement flows.

## Architecture

This is a **TurboStarter-based** monorepo with **embedded Flowise** for donor engagement flow execution. The platform uses pnpm workspaces, Turbo, and Next.js with specialized nonprofit functionality.

### Applications
- **`apps/web`**: Next.js 15 dashboard with embedded Flowise canvas for donor engagement flows
- **`apps/mobile`**: React Native app for mobile donor management
- **`apps/extension`**: Browser extension for CRM integration

### Core Packages
- **`packages/db`**: Multi-tenant database with donor flow schema using Drizzle ORM
- **`packages/api`**: Hono-based API with Flowise integration and tenant isolation
- **`packages/flowise-client`**: Integration layer for embedded Flowise instance
- **`packages/auth`**: Multi-tenant authentication with organization-based access
- **`packages/billing`**: Usage-based billing for flow executions and AI tokens
- **`packages/ui`**: Donor engagement UI components and flow canvas integration
- **`packages/email`**: Email templates for donor communications
- **`packages/storage`**: Document storage for knowledge bases and donor files

### VEAGA-Specific Architecture
- **Embedded Flowise**: Internal Flowise service with custom donor engagement nodes
- **Flow Templates**: Pre-built donor engagement playbooks (`flow-templates/`)
- **Multi-tenant Isolation**: Organization-scoped flows, data, and credentials
- **HITL Governance**: Approval workflows integrated with flow execution
- **Audit & Compliance**: Complete activity logging and policy enforcement

## Development Commands

### Initial Setup
```bash
# Install dependencies
pnpm install

# Start all services (PostgreSQL + embedded Flowise)
pnpm services:start

# Run database migrations and setup
pnpm services:setup

# Initialize Flowise with custom donor nodes
pnpm flowise:setup

# Copy .env.example to .env and configure
cp .env.example .env
```

### Common Development Tasks
```bash
# Start all development servers (Web + Mobile + Extension + Flowise)
pnpm dev

# Start specific services
pnpm --filter web dev        # Web app with embedded canvas on http://localhost:3000
pnpm --filter mobile dev     # Mobile app with Expo
pnpm --filter extension dev  # Browser extension
pnpm services:start:flowise  # Embedded Flowise service on http://localhost:3001

# VEAGA-specific development
pnpm dev:flows              # Flow template development and testing
pnpm dev:canvas             # Canvas integration development

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
# Generate migrations after schema changes (donor flows, approvals, etc.)
pnpm with-env -F @veaga/db generate

# Apply migrations (includes donor engagement schema)
pnpm with-env -F @veaga/db migrate

# Push schema changes directly (safe envs only)
pnpm with-env -F @veaga/db push

# Check schema drift
pnpm with-env -F @veaga/db check

# Open Drizzle Studio for database inspection
pnpm with-env -F @veaga/db studio

# First-time setup with VEAGA schema
pnpm --filter @veaga/db setup
```

### Flowise Management
```bash
# Start embedded Flowise service
pnpm services:start:flowise

# Deploy custom donor engagement nodes
pnpm flowise:deploy-nodes

# Sync flow templates to Flowise
pnpm flowise:sync-templates

# Update Flowise configuration
pnpm flowise:configure

# View Flowise logs
pnpm services:logs:flowise

# Reset Flowise instance (development only)
pnpm flowise:reset
```

### Docker Services
```bash
# Start all services (PostgreSQL + Flowise)
pnpm services:start

# Stop all services
pnpm services:stop

# View service logs
pnpm services:logs

# Check service status
pnpm services:status

# Start specific services
pnpm services:start:db       # PostgreSQL only
pnpm services:start:flowise  # Embedded Flowise only
```

## Testing
```bash
# Flow template validation
pnpm test:flows

# Multi-tenant isolation tests
pnpm test:tenancy

# Embedded Flowise integration tests
pnpm test:flowise

# Donor engagement node tests
pnpm test:nodes

# End-to-end flow execution tests
pnpm test:e2e

# Package-specific tests
pnpm --filter [package-name] test

# Run specific test file
pnpm --filter [package-name] test [test-file-path]
```

## Environment Configuration

The monorepo uses Node.js 22.17+ (pnpm 10.15.x) and requires the following environment variables:

### Core VEAGA Configuration
- `DATABASE_URL`: PostgreSQL connection string for multi-tenant data
- `PRODUCT_NAME`: "VEAGA" - Virtual Engagement and Giving Assistant
- `URL`: Web application URL for tenant isolation
- `DEFAULT_LOCALE`: Default locale for internationalization

### Embedded Flowise Configuration
- `FLOWISE_INTERNAL_URL`: Internal Flowise service URL (e.g., http://localhost:3001)
- `FLOWISE_DATABASE_URL`: Dedicated Flowise database connection
- `FLOWISE_ADMIN_PASSWORD`: Admin password for Flowise management
- `FLOWISE_SECRET_KEY`: Secret key for Flowise API authentication

### Donor Engagement Services
- `ESP_PROVIDER`: Email service provider (sendgrid|mailgun|ses)
- `SMS_PROVIDER`: SMS service provider (twilio)
- `CRM_PROVIDER`: CRM integration (salesforce|bloomerang|neoncrm)

### Policy & Compliance
- `QUIET_HOURS_START`: Default quiet hours start time (21:00)
- `QUIET_HOURS_END`: Default quiet hours end time (09:00)
- `MAX_DAILY_SENDS`: Default maximum daily sends per donor (5)
- `CONSENT_REQUIRED`: Require explicit consent for all communications (true)

Each app may have additional `.env` requirements - check their respective directories.

## Key Architectural Patterns

### Multi-Tenant API Routes
The web application uses Hono-based API routes through the `@veaga/api` package with organization-scoped endpoints. All API calls are tenant-isolated and use Zod for validation.

### Donor Engagement Database Schema
Database models are defined in `packages/db/src/schema/` using Drizzle ORM with specialized tables:
- **Organizations**: Multi-tenant isolation
- **Donor Flows**: Flow definitions with Flowise integration
- **Flow Approvals**: HITL governance and review workflows
- **Knowledge Bases**: Document storage and vectorization status
- **Audit Logs**: Complete activity tracking for compliance
- **Usage Metrics**: Billing and analytics data

### Embedded Flowise Integration
- **Internal Service**: Flowise runs as embedded service within VEAGA infrastructure
- **Custom Nodes**: Donor engagement nodes deployed as Flowise plugins
- **Canvas Integration**: Flowise UI embedded in dashboard with white-labeling
- **API Proxy**: VEAGA API proxies tenant-scoped requests to Flowise
- **Flow Templates**: JSON templates synchronized with Flowise chatflows

### Multi-Tenant Authentication
Authentication is centralized in `packages/auth` with organization-based access control:
- **Organization Scoping**: All data and flows isolated by organization
- **Role-Based Access**: Gift officers, approvers, and admins
- **SSO Support**: Enterprise authentication for nonprofit organizations

### Custom Donor Engagement Nodes
Specialized Flowise nodes for nonprofit use cases:
- **Approval Nodes**: `approvalNode` for HITL governance
- **Donor Intelligence**: `segmentAnalyzer`, `lapseAnalyzer`, `impactCalculator`
- **Multi-channel Sending**: `emailSender`, `smsSender`, `voiceCaller`
- **CRM Integration**: `donorLookup`, `recordUpdater`, `activityLogger`
- **Policy Enforcement**: `quietHoursChecker`, `consentValidator`, `frequencyCapper`

### State Management
- **Web Dashboard**: Zustand for flow canvas state, React Query for donor data
- **Mobile**: React Query with donor relationship persistence
- **Flow Execution**: Flowise handles flow state with VEAGA approval integration

## Code Style and Conventions

### General Principles
- Write concise, technical TypeScript with functional, declarative patterns
- Prefer iteration and modularization over duplication
- Use descriptive variable names with auxiliaries (e.g., `isLoading`, `hasError`)
- Use interfaces over types; avoid enums (prefer maps)
- Handle errors with guard clauses and early returns
- Use Zod for validation of forms, donor data, and flow inputs
- Model expected errors as return values in Server Actions
- **Always scope by organization** - all data access must be tenant-isolated

### VEAGA-Specific Patterns
- **Tenant Isolation**: Every database query and API call must include organization filtering
- **Approval Workflows**: Draft → Review → Approve/Edit/Reject patterns with audit trails
- **Policy Enforcement**: Always validate quiet hours, consent, and frequency caps before sending
- **Flow Variables**: Use tenant-scoped variables for credentials and personalization
- **Donor Context**: Include donor history and preferences in all engagement decisions

### File Structure
- Exported component first, then subcomponents, helpers, static content, types
- Keep components small and modular
- **Flow Templates**: Store in `flow-templates/` with descriptive JSON structure
- **Custom Nodes**: Define in `packages/flowise-nodes/` with proper TypeScript types
- When modifying multiple areas, create shared helpers in `packages/*`

### Platform-Specific Guidelines

**Web Dashboard (Next.js):**
- Prefer React Server Components; minimize `use client`, `useEffect`, `setState`
- **Embedded Canvas**: Use iframe or component integration for Flowise canvas
- **Tenant Context**: Always provide organization context to components
- Use Tailwind CSS with nonprofit-friendly design system
- **Flow State**: Use Zustand for canvas interactions and flow building
- Optimize for donor relationship management workflows

**Mobile App (React Native/Expo):**
- Focus on donor relationship tracking and quick approvals
- Use `SafeAreaProvider` and `SafeAreaView` for safe areas
- **Offline Support**: Cache donor data for field work
- Minimize `useState`/`useEffect`; use memoization
- Use `expo-image` with WebP format

**Extension (WXT):**
- **CRM Integration**: Content scripts for Salesforce, Bloomerang integration
- Background script for donor data synchronization
- Use WXT messaging for secure credential handling

## VEAGA Development Workflows

### Flow Template Development
1. **Create Flow JSON**: Define flow structure in `flow-templates/[name].json`
2. **Test Template**: Use `pnpm test:flows` to validate flow structure
3. **Deploy to Flowise**: Sync template with `pnpm flowise:sync-templates`
4. **Canvas Integration**: Embed flow in dashboard for user customization

### Custom Node Development
1. **Node Definition**: Create TypeScript node in `packages/flowise-nodes/`
2. **Input/Output Types**: Define Zod schemas for node data validation
3. **Execution Logic**: Implement donor-specific business logic
4. **Deploy Node**: Use `pnpm flowise:deploy-nodes` to add to embedded instance
5. **Test Integration**: Validate node behavior in flow canvas

### Embedded Canvas Integration
1. **White-labeling**: Apply VEAGA branding to Flowise UI components
2. **Iframe Integration**: Embed Flowise canvas with proper CORS configuration
3. **Tenant Context**: Inject organization-scoped variables and credentials
4. **Event Handling**: Capture flow events for VEAGA approval workflows

### Multi-Tenant Isolation
- **Database**: Always filter by `organizationId` in all queries
- **Flowise**: Use tenant-scoped workspaces and API keys
- **Credentials**: Encrypt and isolate ESP/SMS/CRM credentials per organization
- **Files**: Scope knowledge base documents and uploads by organization

## Important Notes

- Always run `pnpm install` at the root, never in individual packages
- **Services Required**: Both database and Flowise must be running for development
- Use `pnpm --filter [package-name]` or `pnpm -F [package-name]` for specific packages
- **Flow Templates**: Changes require `pnpm flowise:sync-templates` to update embedded instance
- **Tenant Isolation**: Every feature must be organization-scoped for security
- **Approval Workflows**: All outbound communications require HITL governance
- The monorepo uses catalog versions defined in `pnpm-workspace.yaml`
- Turbo caches build outputs - use `pnpm clean` if you encounter issues
- All db commands load `.env` via `with-env`
- **No External Flowise UI**: Users only interact with embedded canvas in VEAGA
- Adhere to existing formatting; do not reformat unrelated code
- Add imports and types explicitly; avoid `any` and unsafe casts