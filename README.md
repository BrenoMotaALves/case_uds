# mini-kanban

Monorepo com API em NestJS + Prisma + Postgres e Web em React (Vite). Arquitetura em camadas (presentation/application/domain/infra).

## Pre-requisitos

- Node.js 18+
- pnpm
- Docker + Docker Compose

## Quickstart

```bash
pnpm install
pnpm db:up
pnpm prisma:migrate
pnpm prisma:seed
pnpm dev
```

- API: http://localhost:3000/health
- Web: http://localhost:5173

## Testes (API)

```bash
pnpm test
pnpm test:e2e
```