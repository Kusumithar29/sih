# Karnataka Heritage Games

An existing Karnataka culture discovery site extended with five playable heritage games and a persistent Heritage Passport.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- `artifacts/heritage-games/src/components/` — existing heritage shell plus home, game library, play, result, and passport screens
- `artifacts/heritage-games/src/lib/games.ts` — canonical game catalog and copy
- `artifacts/api-server/src/routes/game-results.ts` — result/history and passport summary API
- `lib/db/src/schema/game-results.ts` — source-of-truth result model
- `lib/api-spec/openapi.yaml` — source-of-truth API contract
- `artifacts/heritage-games/public/images/` — uploaded Karnataka collage and topic artwork reused by the site

## Architecture decisions

- The uploaded heritage palette, imagery, and discovery tone are reused in the games surface; games are an extension of the existing site, not a separate dashboard.
- Game opponents are deterministic rule-based selectors. No AI or LLM services are used.
- Results are stored in one shared `game_results` table and summarized into five-game passport progress.
- Until an account system is connected, the browser creates a persistent guest player ID in local storage so history survives reloads on that device.

## Product

Users can explore the original Karnataka culture content, play five traditional games against a computer or another local player, choose Easy/Medium/Hard, review completion stats, and track a five-game Heritage Passport.

## User preferences

- Preserve existing UI and integrate new capabilities into it; do not rebuild the site from scratch.

## Gotchas

- Run API codegen after changing `lib/api-spec/openapi.yaml`.
- Generated client code uses `Headers.entries()`, so library TypeScript configs must include `dom.iterable`.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
