# Backend (NestJS + Prisma + PostgreSQL)

## Run PostgreSQL

```bash
docker compose up -d
```

## Prepare env

```bash
cp .env.example .env
```

## Install and run

```bash
npm install
npm run prisma:generate
npm run start:dev
```

## OAuth endpoints

- `GET /auth/pinterest/url` - returns Pinterest authorization URL.
- `GET /auth/pinterest/callback` - OAuth callback from Pinterest.
