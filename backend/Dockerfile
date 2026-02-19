FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma

CMD ["sh", "-c", "echo DATABASE_URL_PRESENT=${DATABASE_URL:+true}; npx prisma migrate deploy && node dist/main.js"]


RUN npm install
RUN npx prisma generate

COPY tsconfig.json ./
COPY src ./src

RUN npm run build

ENV NODE_ENV=production
EXPOSE 4000

