# Mini Kanban

Projeto full-stack para gerenciar trabalho em um quadro Kanban: um Board (quadro) contem Columns (colunas), e cada Column contem Cards (tarefas). O objetivo e demonstrar dominio, arquitetura e integracao completa entre API e Web.

## Demonstracao em video

Link do video: <coloque aqui>

Checklist do que mostrar:
- Fluxo completo no Web (criar board, criar coluna, criar/mover/deletar card)
- Swagger em execucao
- Breve explicacao de arquitetura e regra do move
- Execucao dos testes unit e e2e

## Features implementadas

- Listar e criar boards
- Visualizar board com colunas e cards ordenados por position
- Criar coluna em um board
- Criar, atualizar e deletar card
- Mover card entre colunas do mesmo board (regra de dominio com retorno 422 se violada)
- Swagger em `/docs` e `/docs-json`
- Seed inicial
- Testes unitarios e e2e cobrindo o fluxo de move

## Stack

- Back-end: Node.js, NestJS, Prisma, PostgreSQL, Jest, Swagger
- Front-end: React, Vite, TypeScript

## Estrutura do repositorio

```text
apps/
  api/  # NestJS + Prisma + Postgres
  web/  # React + Vite + TypeScript
```

## Arquitetura e decisoes (DDD/SOLID)

- Camadas: presentation (controllers/DTOs), application (use cases), domain (entidades/regras), infra (repositorios/adapters).
- Aggregate Root: Board. Column e Card fazem parte do agregado, evitando inconsistencias entre boards.
- Regra de dominio principal: um card so pode ser movido dentro do mesmo board.
- Erros de dominio sao mapeados para HTTP via filtro global (APP_FILTER), garantindo respostas consistentes em runtime e nos testes e2e.

## Como rodar localmente

Pre-requisitos:
- Node.js LTS
- pnpm
- Docker e Docker Compose

Passo a passo:
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

Observacao: CORS ja esta configurado para `http://localhost:5173`.

## Variaveis de ambiente

`apps/api/.env` (baseado em `.env.example`):
```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/mini_kanban?schema=public"
DATABASE_URL_TEST="postgresql://postgres:postgres@localhost:5432/mini_kanban_test?schema=public"
PORT=3000
NODE_ENV=development
```

`apps/web/.env` (baseado em `.env.example`):
```env
VITE_API_URL=http://localhost:3000
```

## Como rodar testes

Unitarios:
```bash
pnpm --filter @mini-kanban/api test
```

E2E:
```bash
pnpm --filter @mini-kanban/api test:e2e
```

Notas:
- E2E usa `DATABASE_URL_TEST`. Recomenda-se um banco separado para evitar conflitos com dados locais.
- Os testes validam o endpoint de move (sucesso e erro 422 quando a regra de dominio e violada).

## Documentacao da API (Swagger)

- UI: `/docs`
- JSON: `/docs-json`

## Endpoints principais

Boards:
- `GET /boards` - lista boards
- `POST /boards` - cria board (com ou sem colunas)
- `GET /boards/:id` - detalhe do board com colunas e cards

Exemplo `POST /boards` (sem colunas):
```json
{
  "name": "Product Roadmap"
}
```

Exemplo `POST /boards` (com colunas):
```json
{
  "name": "Product Roadmap",
  "columns": [{ "name": "To Do" }, { "name": "In Progress" }, { "name": "Done" }]
}
```

Exemplo `GET /boards/:id` (resposta curta):
```json
{
  "id": "board-uuid",
  "name": "Product Roadmap",
  "columns": [
    {
      "id": "column-uuid",
      "name": "To Do",
      "position": 1,
      "cards": [
        { "id": "card-uuid", "title": "Setup", "position": 1, "columnId": "column-uuid" }
      ]
    }
  ]
}
```

Columns:
- `POST /boards/:boardId/columns` - cria coluna em um board

Cards:
- `POST /columns/:columnId/cards` - cria card
- `PUT /cards/:id` - atualiza card
- `DELETE /cards/:id` - remove card (204 No Content)
- `PATCH /cards/:id/move` - move card para outra coluna

Exemplo `PATCH /cards/:id/move` (sucesso):
```json
{
  "newColumnId": "column-destino-uuid"
}
```

Exemplo `PATCH /cards/:id/move` (erro 422):
```json
{
  "statusCode": 422,
  "message": "Card cannot be moved to another board",
  "error": "Unprocessable Entity"
}
```

## Troubleshooting

- Prisma migrate falha com P1001: o banco nao esta rodando; rode `pnpm db:up`.
- Porta 5432 ocupada: ajuste o mapeamento para 5433 e atualize `DATABASE_URL`.
- CORS no browser: confira `VITE_API_URL` e o origin permitido na API.
- DELETE retorna 204: o client precisa lidar com `No Content` (ja tratado no wrapper).
- Reset do banco: `docker compose down -v` (isso apaga os dados).

## Checklist final de entrega

- `pnpm dev` sobe API e Web
- Swagger acessivel em `/docs`
- Web permite criar/mover/deletar cards
- Testes unit e e2e passando
- Video gravado e linkado

## Proximos passos

- Drag-and-drop para cards
- Reordenacao de colunas e cards
- Autenticacao e autorizacao
- Deploy com CI/CD
