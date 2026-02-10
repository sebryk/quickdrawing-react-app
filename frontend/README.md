# Quickdrawing

**Quickdrawing** is a prototype web application designed specifically for artists. Regardless of your skill level, whether you're a newbie or already proficient, this app allows users to create fast and dynamic sketches from a vast library of high-quality images sourced from an external API. Available only for tablets and desktops

## Features

- **Customizable session settings:** Selectable variety of themes to draw, number of images and time interval between image changes.
- **Unique media player:** Special image media player with embedded image slider and functional control bar.
- **Controll bar:** Integrated control bar with a timer and the ability to pause and restart session.
- **Manual navigation:** Manual switching between pages with buttons or preview images after the session ends.
- **Image API Integration:** Connection to an image API service.

## Technical Stack:

- **React**
- **TypeScript**
- **CSS**
- **Redux Toolkit**
- **RTK Query**
- **Redux Persist**

**Please note that the app's layout is optimized only for tablets, laptops and desktops.**

## Visuals

![quickdrawing](https://github.com/sebryk/quickdrawing-react-app/assets/106953297/5c95fffc-b605-462b-bd8b-7fa045b4df2a)

## Link

https://sebryk.github.io/quickdrawing-react-app/

## Getting started

### Install

```
npm install
```

### Run In A Dev Mode

```
npm run dev
```

This will start the development server. Open http://localhost:3000 to view it in the browser.

## How to add Fastify + PostgreSQL backend

If you want to add a backend API for this project, the cleanest path is to keep the Next.js frontend and run a separate Fastify service.

### 1) Recommended architecture

- `frontend/` — current Next.js app (UI only)
- `backend/` — new Fastify service (REST API)
- PostgreSQL in Docker (local + production via managed DB)

Benefits:
- clear separation of concerns
- easier deployments
- independent scaling for frontend and API

### 2) Create backend service

Initialize `backend/` with TypeScript and install:

- `fastify`
- `@fastify/cors`
- `@fastify/env`
- `zod` (or `typebox`) for request/response schemas
- `pg` + `drizzle-orm` (or `prisma`) for DB layer

For most teams, a pragmatic combo is:
- **Fastify + Zod + Drizzle + node-postgres (`pg`)**

### 3) Database and migrations

Use migrations from day one.

- Create `docker-compose.yml` with `postgres:16`.
- Keep SQL schema in migrations (`backend/drizzle` or `backend/prisma/migrations`).
- Add scripts:
  - `db:generate`
  - `db:migrate`
  - `db:studio` (optional)

Minimal env variables:

- `DATABASE_URL=postgres://user:password@localhost:5432/quickdrawing`
- `PORT=4000`
- `CORS_ORIGIN=http://localhost:3000`

### 4) API boundaries for this app

Start from a small set of endpoints:

- `GET /health`
- `GET /api/themes`
- `GET /api/images?theme=...&limit=...`
- `POST /api/session` (save completed session stats)
- `GET /api/session/:id`

Design rules:
- validate all input at route boundary
- return typed response contracts
- keep external image API integration in backend (not in UI)

### 5) Connect frontend safely

- Add `NEXT_PUBLIC_API_URL=http://localhost:4000` in frontend env.
- Move direct image API calls from frontend to your Fastify API routes.
- Use existing RTK Query layer to call your backend.

This gives you:
- hidden API keys (stored only on backend)
- centralized caching and retry logic
- easier quota/error control

### 6) Production setup

- Run frontend and backend as separate containers/services.
- Put Nginx or cloud load balancer in front.
- Use managed PostgreSQL (Neon, Supabase, RDS, etc.).
- Add:
  - request logging (`pino`)
  - error monitoring (Sentry)
  - rate limiting (`@fastify/rate-limit`)
  - graceful shutdown and health checks

### 7) Practical implementation order

1. Create `backend/` with Fastify + health endpoint.
2. Add PostgreSQL in Docker and run first migration.
3. Implement `/api/images` proxy endpoint.
4. Switch frontend RTK Query from external API to backend API.
5. Add auth (if needed), session persistence, and monitoring.

This order keeps risk low and lets you ship incrementally without rewriting the frontend.
