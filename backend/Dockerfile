FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma
COPY prisma.config.ts ./

CMD ["sh", "-c", "echo DATABASE_URL=$DATABASE_URL; npx prisma migrate deploy && node dist/main.js"]


RUN npm install
RUN DATABASE_URL=postgresql://postgres:postgres@localhost:5432/postgres npx prisma generate

COPY tsconfig.json ./
COPY src ./src

RUN npm run build

ENV NODE_ENV=production
EXPOSE 4000
