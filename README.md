# Mini Kanban - Visao geral

O Mini Kanban organiza trabalho em tres niveis: Board (quadro), Column (coluna) e Card (tarefa). Um board contem colunas ordenadas, e cada coluna contem cards ordenados.

Principais funcionalidades:
- Listar e criar boards
- Visualizar colunas e cards de um board
- Criar, deletar e mover cards entre colunas do mesmo board

## Stack

- Back-end: Node.js + NestJS + Prisma + PostgreSQL + Jest + Swagger
- Front-end: React + Vite + TypeScript

## Arquitetura e decisoes

- DDD leve por camadas: presentation / application / domain / infra
- Aggregate root: Board
- Regra de dominio principal: mover card apenas dentro do mesmo board (retorna 422 se violar)
- Prisma pelas migrations e tipagem consistente; testes focam o fluxo de move para garantir a regra de dominio

## Como rodar localmente

```bash
pnpm install
pnpm db:up
pnpm prisma:migrate
pnpm prisma:seed
pnpm dev
```

URLs:
- API: http://localhost:3000
- Swagger: http://localhost:3000/docs
- Web: http://localhost:5173

## Variaveis de ambiente

- `apps/api/.env` baseado em `.env.example`
  - `DATABASE_URL`
  - `PORT`
  - `DATABASE_URL_TEST`
- `apps/web/.env` baseado em `.env.example`
  - `VITE_API_URL`

## Testes

Unit:
```bash
pnpm --filter @mini-kanban/api test
```

E2E:
```bash
pnpm --filter @mini-kanban/api test:e2e
```

## Demonstracao em video

Link do video: <coloque aqui>

Sugestao: YouTube nao listado / Loom / Google Drive

## Endpoints principais

- `GET /boards` - lista boards
- `POST /boards` - cria board
- `GET /boards/:id` - detalhe do board com colunas e cards ordenados
- `POST /columns/:columnId/cards` - cria card em uma coluna
- `PUT /cards/:id` - atualiza card
- `DELETE /cards/:id` - remove card
- `PATCH /cards/:id/move` - move card para outra coluna do mesmo board
