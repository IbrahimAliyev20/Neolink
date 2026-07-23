# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Next.js 16 (App Router, Turbopack) HR vacancy site (`hr-vacancy`), internationalized with `next-intl` (locales: `az` default, `en`; prefix mode `as-needed`, no auto locale detection).

## Commands

- `npm run dev` — start dev server (Turbopack)
- `npm run build` — production build (Turbopack)
- `npm run start` — start production server
- `npm run lint` — ESLint (flat config, `eslint.config.mjs`)

No test suite is configured in this repo.

## Architecture

- **Routing**: all pages live under `src/app/[locale]/...`. Locale handling is driven by `src/i18n/routing.ts` (locales, default locale, prefix strategy) and enforced by the middleware in `src/proxy.ts` (note: this is the next-intl middleware, exported from a nonstandard filename `proxy.ts` rather than `middleware.ts`).
- **i18n messages**: JSON dictionaries in `messages/az.json` and `messages/en.json`, loaded server-side via `next-intl/server` in `src/app/[locale]/layout.tsx` and exposed to client components through `NextIntlClientProvider`.
- **API layer**: `src/lib/api/client.ts` wraps a single axios instance (`NEXT_PUBLIC_API_BASE_URL`). It auto-attaches the `access_token` cookie (via `js-cookie`) as a Bearer token, derives `Accept-Language` from the current URL locale segment, and clears the auth cookie on 401. Typed `get/post/put/patch/del` helpers are re-exported from `src/lib/api/index.ts` — import from `@/lib/api`, not directly from `client.ts`.
- **Data fetching**: feature areas under `src/services/<feature>/` follow a 3-file convention: `api.ts` (raw calls using the `@/lib/api` helpers), `queries.ts` (React Query `useQuery` hooks), `mutations.ts` (React Query `useMutation` hooks). Follow this split when adding a new feature's data layer.
- **React Query setup**: `src/providers/QueryProvider.tsx` creates a browser-singleton `QueryClient` (new client per request on the server, cached singleton in the browser) with app-wide defaults (60s staleTime, 2 retries, no refetch-on-focus). `src/providers/HydrationBoundary.tsx` / `server.ts` support SSR prefetch + hydration patterns.
- **Layout shell**: `src/app/[locale]/layout.tsx` composes `QueryProvider` > `NextIntlClientProvider` > `Header`/`Footer` + `children`, plus a global `Toaster` (sonner).
- **UI components**: `src/components/ui/` are shadcn/ui-style primitives (Radix UI + `class-variance-authority` + `tailwind-merge`, configured via `components.json`). `src/components/shared/` and `src/components/navigation/` hold app-specific composed components. Auth screens live in both `src/app/[locale]/(auth)/...` (route group, no URL segment) and mirrored components under `src/components/auth/`.
- **Path alias**: `@/*` maps to `src/*` (see `tsconfig.json`).
- **Styling**: Tailwind CSS v4 via `@tailwindcss/postcss` (no `tailwind.config` file — v4 CSS-based config), global styles in `src/app/globals.css`.
