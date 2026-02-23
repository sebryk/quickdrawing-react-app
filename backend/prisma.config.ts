import 'dotenv/config';
import { defineConfig, env } from 'prisma/config';

const rawDatabaseUrl = process.env.DATABASE_URL;
const maskedDatabaseUrl = rawDatabaseUrl ? rawDatabaseUrl.replace(/:\/\/([^:]+):([^@]+)@/, '://$1:***@') : 'undefined';

console.log('[prisma.config] DATABASE_URL present:', Boolean(rawDatabaseUrl));
console.log('[prisma.config] DATABASE_URL value:', maskedDatabaseUrl);

export default defineConfig({
   schema: 'prisma/schema.prisma',
   datasource: {
      url: env('DATABASE_URL'),
   },
});
