import { defineConfig } from '@prisma/config';
import { config } from 'dotenv';

// Force the system to read your .env file
config({ path: '.env' });

export default defineConfig({
  schema: './prisma/schema.prisma',
  datasource: {
    url: process.env.DIRECT_URL || process.env.DATABASE_URL,
  },
});