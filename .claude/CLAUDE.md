# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Language Preference

**このリポジトリでは、すべてのやり取りを日本語で行ってください。**
Please communicate in Japanese for all interactions in this repository.

## Repository Overview

Subscription management application with a React Native (Expo) mobile app and Hono API backend deployed on Cloudflare Workers.

**Monorepo structure:**

- `apps/native` - React Native mobile app using Expo Router
- `apps/api` - Hono API backend for Cloudflare Workers
- `packages/model` - Shared validation schemas and types (Valibot)
- `packages/lib` - Shared utility functions
- `packages/eslint-config` - Shared ESLint configuration
- `packages/prettier-config` - Shared Prettier configuration
- `packages/typescript-config` - Shared TypeScript configuration

**Package manager:** pnpm (v10.28.0)
**Node version:** >=24
**Build system:** Turborepo

## Common Commands

### Root-level commands

```bash
# Development
pnpm dev                 # Start all dev servers (API + native)
pnpm build              # Build all packages

# Linting
pnpm lint               # Run all lint tasks (eslint, ts, format)
```

### Native app (apps/native)

```bash
cd apps/native

# Development
pnpm dev                # Start Expo dev server
pnpm ios                # Run on iOS simulator
pnpm android            # Run on Android emulator
pnpm web                # Run in web browser

# Linting
pnpm lint:eslint        # Run ESLint
pnpm lint:ts            # Type-check with tsc
pnpm lint:format        # Format with Prettier
```

### API (apps/api)

```bash
cd apps/api

# Development
pnpm dev                # Start local dev server with Wrangler (port 8000)
pnpm deploy             # Deploy to Cloudflare Workers

# Database (Turso/LibSQL)
pnpm db:start           # Start local Turso database
pnpm db:stop            # Stop local Turso database
pnpm db:generate        # Generate Drizzle migrations
pnpm db:migrate         # Run migrations
pnpm db:studio          # Open Drizzle Studio
pnpm db:seed            # Seed database

# Code generation
pnpm cf-typegen         # Generate Cloudflare Worker types
pnpm auth:generate      # Generate Better Auth schemas

# Linting
pnpm lint:eslint        # Run ESLint
pnpm lint:ts            # Type-check with tsc
pnpm lint:format        # Format with Prettier
```

## Architecture

### Native App (apps/native)

**Technology stack:**

- React Native 0.81 with Expo SDK 54
- Expo Router for file-based routing with typed routes
- React 19 with React Compiler enabled
- Expo UI for native UI components and styling (SwiftUI integration)
- Better Auth for authentication with passkey support
- TanStack Query for data fetching and caching
- React Hook Form + Valibot for form validation

**Expo-specific guidelines:**

- **ALWAYS use Expo components when available** - Prefer Expo's optimized components over React Native equivalents
- **UI Components:** Use Expo UI (SwiftUI integration) for all UI components and styling. DO NOT use Hero UI Native (`heroui-native`) or Tailwind CSS (`uniwind`)
  - Reference: https://docs.expo.dev/versions/v55.0.0/sdk/ui/swift-ui/
  - Use `@expo/ui/swift-ui` components for native iOS/Android experiences
  - Examples: `HStack`, `VStack`, `Text`, `Button`, `ScrollView`, etc.
  - Apply modifiers using the `modifiers` prop (e.g., `glassEffect`, `padding`, `background`, `foregroundStyle`)
  - Refer to the Expo UI documentation for all component APIs and modifier options
- **Images:** Use `expo-image` (NOT `react-native`'s Image component) for all image rendering
- **Theme detection:** Use React Native's `useColorScheme()` hook or Expo UI's built-in theme system
- **File-based routing:** All navigation uses Expo Router's file-based system in `src/app/`

**Key directories:**

- `src/app/` - File-based routes (Expo Router)
  - `index.tsx` - Unauthenticated landing page
  - `(authenticated)/` - Protected routes for authenticated users
  - `(onboarding)/` - Onboarding flow routes
  - `_layout.tsx` - Root layout with route guards based on authentication and onboarding status
- `src/components/` - Shared UI components
- `src/features/` - Feature-specific components and logic (e.g., onboarding)
- `src/lib/` - Client-side utilities (auth client, query client, storage)
- `src/providers/` - React context providers

**Authentication flow:**
The app uses route guards in `_layout.tsx` to control navigation:

1. Unauthenticated users see the landing page (`index.tsx`)
2. Authenticated users without completed onboarding see `(onboarding)` routes
3. Authenticated users with completed onboarding see `(authenticated)` routes

**Styling:**
- Uses Expo UI exclusively for all styling and UI components
- Apply styles using the `modifiers` prop on Expo UI components
- Follow SwiftUI-like declarative styling patterns
- Use semantic modifiers (e.g., `padding()`, `background()`, `foregroundStyle()`, `cornerRadius()`)
- Refer to Expo UI documentation for available modifiers and styling options

**Coding guidelines:**

- **Pattern matching:** Use `ts-pattern` for conditional logic that returns values

  - Prefer `match().with().exhaustive()` over `if/else` statements when returning JSX or values
  - Use `.exhaustive()` for type-safe exhaustive checks
  - Example:

    ```typescript
    // ❌ Avoid
    if (item.status === "active") {
      return <ActiveItem item={item} />;
    }
    return <CanceledItem item={item} />;

    // ✅ Prefer
    match(item)
      .with({ status: "active" }, (item) => <ActiveItem item={item} />)
      .with({ status: "canceled" }, (item) => <CanceledItem item={item} />)
      .exhaustive();
    ```

- **Type guards:** Use `@package/lib/guard` utilities for null/empty checks
  - Use `isEmpty()` for checking empty arrays, objects, or strings
  - Use `isNullish()` for checking `null` or `undefined`
  - Example:
    ```typescript
    // ❌ Avoid
    if (array.length === 0) { ... }
    if (value === null || value === undefined) { ... }
    // ✅ Prefer
    if (isEmpty(array)) { ... }
    if (isNullish(value)) { ... }
    ```

### API (apps/api)

**Technology stack:**

- Hono web framework
- Cloudflare Workers runtime (Node.js compatibility mode)
- Turso (LibSQL) database via Drizzle ORM
- Better Auth for authentication with passkey support

**Key directories:**

- `src/routers/` - API route handlers organized by resource
  - `cards/` - Credit card management
  - `payment-methods/` - Payment method management
  - `subscriptions/` - Subscription management
  - `subscription-tags/` - Tag management
- `src/db/schemas/` - Drizzle ORM schemas
- `src/db/seed/` - Database seeding scripts
- `src/lib/auth/` - Better Auth configuration
- `src/helpers/` - Utility functions (factory, Drizzle setup, env parsing)
- `src/middleware/` - Hono middleware (session validation)
- `src/types/` - TypeScript type definitions

**API architecture:**

- All routes use `factory.createApp()` from `src/helpers/factory.ts` which automatically injects Drizzle DB instance into context
- Authentication handled via Better Auth at `/api/auth/*` endpoint
- All API routes protected by `requireSessionMiddleware`
- Database connection configured per-request using Cloudflare Worker environment variables

**Database:**

- Uses Turso (LibSQL) with Drizzle ORM
- SQLite dialect
- Schemas auto-generated from Better Auth config via `pnpm auth:generate`
- Local development uses `turso dev` with local database file at `./database/local.db`

### Shared Packages

**@package/model:**
Domain models and validation schemas using Valibot. Organized by domain:

- `cards` - Credit card models
- `common` - Shared types (currencies, dates, etc.)
- `fx-rates` - Foreign exchange rates
- `payment-methods` - Payment method models
- `subscription-tags` - Tag models
- `subscriptions` - Subscription models
- `users` - User models

**@package/lib:**
Shared utility functions:

- `parser.ts` - Data parsing utilities
- `guard/` - Type guard functions

## Git Commit Guidelines

**ブランチ命名規則:**

- **ブランチ名の形式**: `feature/xxx` の形式を使用してください
  - 新機能の追加: `feature/機能名` (例: `feature/subscription-list`, `feature/user-profile`)
  - バグ修正: `feature/fix-xxx` (例: `feature/fix-login-error`)
  - リファクタリング: `feature/refactor-xxx` (例: `feature/refactor-api-client`)
  - ブランチ名はケバブケース（小文字とハイフン）を使用
  - 簡潔で分かりやすい名前をつける

**コミット作成時の重要なルール:**

- **developブランチに直接コミットしない**: 必ず機能ブランチ（`feature/xxx`）を作成してからコミットしてください
  - コミット前に必ず `git branch feature/機能名` で新しいブランチを作成
  - developブランチは `main` ブランチと同様に保護されており、プルリクエストを通じてのみ更新します
- **Co-Authored-Byを追加しない**: コミットメッセージに `Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>` などのCo-Authored-By行を追加しないでください
- **コミットの分割**: 関連性の低い変更は別々のコミットに分割してください
  - バグ修正と新機能追加は別のコミットにする
  - 新機能の実装と統合は別のコミットにする
- **コミットメッセージ**: 既存のコミット履歴のスタイルに合わせてください（`git log --oneline`で確認）

## Development Workflow

1. **Starting development:**

   ```bash
   # Terminal 1: Start API server
   cd apps/api && pnpm dev

   # Terminal 2: Start native app
   cd apps/native && pnpm dev
   ```

2. **Database changes:**

   ```bash
   cd apps/api
   # 1. Modify schemas in src/db/schemas/
   # 2. Generate migration
   pnpm db:generate
   # 3. Apply migration
   pnpm db:migrate
   ```

3. **Authentication schema changes:**

   ```bash
   cd apps/api
   # Update better-auth.config.ts
   pnpm auth:generate  # Regenerates src/db/schemas/users.ts
   ```

4. **Adding shared models:**
   - Add schemas to `packages/model/src/<domain>/`
   - Export from `packages/model/src/<domain>/index.ts`
   - Update `packages/model/package.json` exports if adding new domain

5. **Linting after changes (IMPORTANT):**
   **必ずコード変更後はlintを実行してエラーを解消してください。**

   ```bash
   # Native app
   cd apps/native
   pnpm lint:eslint        # ESLintチェック
   pnpm lint:ts            # TypeScript型チェック
   pnpm lint:format        # Prettierフォーマット

   # または一括実行
   pnpm lint               # すべてのlintタスクを実行
   ```

   **重要:** コード変更を完了する前に、必ずすべてのlintエラーを解消してください。エラーが残っている状態でタスクを完了させてはいけません。

## Configuration Files

**Environment variables:**

- `apps/api/.dev.vars` - Local API environment variables (not committed)
- `apps/native/.env.development.local` - Local native app environment variables (not committed)
- `wrangler.jsonc` - Cloudflare Workers configuration (API)
- `app.json` - Expo configuration (native)

**Catalog dependencies:**
The repository uses pnpm workspace catalog feature to manage shared dependency versions. See `pnpm-workspace.yaml` for catalog definitions.

## Notes

- The native app uses React Native's New Architecture with React Compiler enabled
- API runs on Cloudflare Workers with Node.js compatibility mode enabled
- Authentication uses Better Auth with SQLite adapter, supporting passkeys
- All validation schemas use Valibot instead of Zod
- UI components and styling use Expo UI exclusively (SwiftUI-style declarative approach)
