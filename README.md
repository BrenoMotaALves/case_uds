# Mini Kanban

Projeto full-stack para gerenciar trabalho em um quadro Kanban. Um Board (quadro) contem Columns (colunas) e cada Column contem Cards (tarefas). O objetivo e demonstrar dominio, arquitetura e integracao completa entre API e Web.

## Demo em video

Link do video: <coloque aqui>

Checklist do que mostrar:
- Fluxo completo no Web (CRUD de boards, criar/deletar/mover cards, DnD, switcher)
- Swagger em execucao
- Breve explicacao de arquitetura e regra de dominio
- Execucao dos testes unit e e2e
- Diferenciais de UX (modal de criar board, board switcher)

## Features implementadas

Back-end:
- CRUD de boards (listar, criar, renomear, deletar)
- Detalhe de board com colunas e cards ordenados
- CRUD de cards (criar, atualizar, deletar)
- Move de card com regra de dominio (mesmo board) e erro 422 se invalido
- Swagger em `/docs` e `/docs-json`
- Seed com dados iniciais
- Testes unitarios e e2e focados no move
- CORS configurado para o front local

Front-end:
- CRUD de boards (criar, renomear, deletar)
- Kanban com colunas e cards
- Criar/deletar cards e mover via modal
- Tratamento de 204 No Content no client

Diferenciais:
- Drag and Drop (dnd-kit) para mover cards entre colunas
- Board Switcher no Kanban para trocar o board ativo
- Modal de criar board diretamente no Kanban

## Stack

Back-end:
- Node.js, NestJS, Prisma, PostgreSQL, Jest, Swagger

Front-end:
- React, Vite, TypeScript, dnd-kit

## Estrutura do repositorio (monorepo)

```text
apps/
  api/  # NestJS + Prisma + Postgres
  web/  # React + Vite + TypeScript
```

## Arquitetura e decisoes tecnicas

- DDD leve por camadas: presentation (controllers/DTOs), application (use cases), domain (entidades/regras) e infra (repositorios/adapters).
- Aggregate Root: Board. Column e Card pertencem ao agregado para evitar inconsistencias.
- Regra de dominio principal: card so pode mover dentro do mesmo board; violacao retorna 422.
- Excecoes de dominio mapeadas para HTTP via filtro global (APP_FILTER), garantindo respostas consistentes em runtime e nos testes e2e.
- Prisma adotado por migrations e tipagem consistente.
- DnD respeita o backend: o front apenas chama PATCH `/cards/:id/move` (sem estado otimista).

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
- Swagger JSON: http://localhost:3000/docs-json
- Web: http://localhost:5173

Observacao: CORS ja esta configurado para `http://localhost:5173`. Garanta que `VITE_API_URL` aponte para a API local.

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

## Testes

Unitarios:
```bash
pnpm --filter @mini-kanban/api test
```

E2E:
```bash
pnpm --filter @mini-kanban/api test:e2e
```

Notas:
- E2E usa `DATABASE_URL_TEST`. Recomenda-se banco separado.
- Os testes validam o move permitido e o move invalido (422).

## Documentacao da API (Swagger)

- UI: `/docs`
- JSON: `/docs-json`

## Endpoints principais

Boards:
- `GET /boards` - lista boards
- `POST /boards` - cria board
- `GET /boards/:id` - detalhe do board
- `PUT /boards/:id` - renomeia board
- `DELETE /boards/:id` - remove board (204)

Columns:
- `POST /boards/:boardId/columns` - cria coluna

Cards:
- `POST /columns/:columnId/cards` - cria card
- `PUT /cards/:id` - atualiza card
- `DELETE /cards/:id` - remove card (204)
- `PATCH /cards/:id/move` - move card entre colunas

Exemplo `POST /boards`:
```json
{
  "name": "Product Roadmap"
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
        {
          "id": "card-uuid",
          "title": "Setup",
          "description": null,
          "position": 1,
          "columnId": "column-uuid"
        }
      ]
    }
  ]
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

- Prisma migrate falha com P1001: o banco nao esta rodando; execute `pnpm db:up`.
- Porta 5432 ocupada: ajuste o mapeamento para 5433 no docker compose e atualize `DATABASE_URL`.
- CORS/VITE_API_URL: confirme que o Vite esta em 5173 e a API em 3000.
- Reset do banco: `docker compose down -v` (apaga os dados).
- DELETE retorna 204: o client ja trata `No Content`.

## Checklist final de entrega

- `pnpm dev` sobe API e Web
- Swagger acessivel em `/docs` e `/docs-json`
- Web funcionando: CRUD de boards, criar/deletar/mover cards, DnD e board switcher
- Testes unit e e2e passando
- Video gravado e linkado
- Repo publico e commits claros

## Proximos passos

- Reordenacao de cards e colunas
- Drag and Drop com ordenacao dentro da mesma coluna
- Deploy
