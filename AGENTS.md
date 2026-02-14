# AGENTS.md

This file provides guidance for contributors when working with code in this repository.

<!-- HEROUI-NATIVE-AGENTS-MD-START -->
[HeroUI Native Docs Index]|root: ./.heroui-docs/native|STOP. What you remember about HeroUI Native is WRONG for this project. Always search docs and read before any task.|If docs missing, run this command first: heroui agents-md --native --output CLAUDE.md|components/(buttons):{button.mdx,close-button.mdx}|components/(data-display):{chip.mdx}|components/(feedback):{skeleton-group.mdx,skeleton.mdx,spinner.mdx}|components/(forms):{checkbox.mdx,control-field.mdx,description.mdx,field-error.mdx,input-otp.mdx,input.mdx,label.mdx,radio-group.mdx,select.mdx,switch.mdx,text-area.mdx,text-field.mdx}|components/(layout):{card.mdx,separator.mdx,surface.mdx}|components/(media):{avatar.mdx}|components/(navigation):{accordion.mdx,tabs.mdx}|components/(overlays):{bottom-sheet.mdx,dialog.mdx,popover.mdx,toast.mdx}|components/(utilities):{pressable-feedback.mdx,scroll-shadow.mdx}|getting-started/(handbook):{animation.mdx,colors.mdx,composition.mdx,portal.mdx,provider.mdx,styling.mdx,theming.mdx}|getting-started/(overview):{design-principles.mdx,quick-start.mdx}|getting-started/(ui-for-agents):{agent-skills.mdx,agents-md.mdx,llms-txt.mdx,mcp-server.mdx}|releases:{beta-10.mdx,beta-11.mdx,beta-12.mdx,beta-13.mdx}
<!-- HEROUI-NATIVE-AGENTS-MD-END -->

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

### Design (design/)

**Design tool:** Pencil (https://docs.pencil.dev/)

このプロジェクトでは、UI/UXデザインにPencilを使用します。デザインファイル（`.pen`形式）は`design/`ディレクトリに保存します。

**重要:** `.pen`ファイルの操作には必ずPencil MCPツール（`mcp__pencil__*`）を使用してください。通常のファイル操作ツール（`Read`、`Grep`など）は使用できません。

### Native App (apps/native)

**Technology stack:**

- React Native 0.81 with Expo SDK 54
- Expo Router for file-based routing with typed routes
- React 19 with React Compiler enabled
- Hero UI Native for UI components and Uniwind (Tailwind CSS for React Native) for styling
- Better Auth for authentication with passkey support
- TanStack Query for data fetching and caching
- React Hook Form + Valibot for form validation

**Expo-specific guidelines:**

- **ALWAYS use Expo components when available** - Prefer Expo's optimized components over React Native equivalents
- **UI Components:** Use Hero UI Native (`heroui-native`) for all UI components
  - Reference: https://v3.heroui.com/docs/native
  - Use Hero UI Native components for native iOS/Android experiences
  - Available components: Button, Card, Input, TextField, Tabs, Avatar, Chip, Switch, Checkbox, etc.
  - Components follow compound component pattern (e.g., `Button.StartContent`, `Button.LabelContent`)
  - Refer to the Hero UI Native documentation for all component APIs and props
- **Styling:** Use Uniwind (Tailwind CSS for React Native) for all styling needs
  - Uniwind is Tailwind CSS v4 designed specifically for React Native
  - Use Tailwind utility classes via the `className` prop on React Native components
  - Supports responsive design, dark mode, and custom themes
  - Reference: Hero UI Native theming and styling documentation
- **Images:** Use `expo-image` (NOT `react-native`'s Image component) for all image rendering
- **Theme detection:** Use React Native's `useColorScheme()` hook for theme detection
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
- Uses Hero UI Native components for UI elements
- Uses Uniwind (Tailwind CSS for React Native) for all styling
- Apply Tailwind utility classes via the `className` prop
- Follow mobile-first responsive design patterns
- Use Tailwind's built-in utilities for spacing, colors, typography, etc.
- Leverage Hero UI Native's semantic color system (e.g., `accent`, `success`, `danger`)
- Refer to Hero UI Native and Uniwind documentation for available utilities and component styling

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

**重要: ベースブランチについて**

- **このリポジトリのベースブランチは `develop` です**
  - すべての機能ブランチは `develop` から作成してください
  - PRは必ず `develop` ブランチに対して作成してください
  - `main` ブランチではなく `develop` ブランチが開発の起点です

**ブランチ命名規則:**

- **ブランチ名の形式**: `feature/xxx` の形式を使用してください
  - 新機能の追加: `feature/機能名` (例: `feature/subscription-list`, `feature/user-profile`)
  - バグ修正: `feature/fix-xxx` (例: `feature/fix-login-error`)
  - リファクタリング: `feature/refactor-xxx` (例: `feature/refactor-api-client`)
  - ブランチ名はケバブケース（小文字とハイフン）を使用
  - 簡潔で分かりやすい名前をつける

**ブランチ作成とコミットのワークフロー:**

1. **developブランチから機能ブランチを作成**
   ```bash
   git checkout develop
   git pull origin develop
   git checkout -b feature/機能名
   ```

2. **developブランチに直接コミットしない**: 必ず機能ブランチ（`feature/xxx`）を作成してからコミットしてください
   - developブランチは保護されており、プルリクエストを通じてのみ更新します

3. **PRの作成**: 機能ブランチの作業が完了したら、`develop` ブランチに対してPRを作成
   ```bash
   gh pr create --base develop --title "タイトル" --body "説明"
   ```

**コミット作成時の重要なルール:**

- **Co-Authored-Byを追加しない**: コミットメッセージに Co-Authored-By 行を追加しないでください
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

**Design files:**

- `design/` - Pencil design files (.pen format)

**Catalog dependencies:**
The repository uses pnpm workspace catalog feature to manage shared dependency versions. See `pnpm-workspace.yaml` for catalog definitions.

## Notes

- The native app uses React Native's New Architecture with React Compiler enabled
- API runs on Cloudflare Workers with Node.js compatibility mode enabled
- Authentication uses Better Auth with SQLite adapter, supporting passkeys
- All validation schemas use Valibot instead of Zod
- UI components use Hero UI Native with Uniwind (Tailwind CSS for React Native) for styling
- UI/UX design uses Pencil design tool with .pen file format stored in `design/` directory
