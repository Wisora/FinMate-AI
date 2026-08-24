import { defineConfig } from '@prisma/client';

export default defineConfig({
  schema: './prisma/schema.prisma',
  output: './node_modules/@prisma/client',
});
