import { defineConfig } from "@prisma/config";

export default defineConfig({
  datasource: {
    provider: "sqlite",              // or "postgresql" / "mysql"
    url: process.env.DATABASE_URL!,  // read from .env
  },
  generators: {
    client: {
      provider: "prisma-client-js",
    },
  },
});
