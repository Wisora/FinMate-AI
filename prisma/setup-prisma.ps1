# Step 1: Create prisma.config.ts
@"
import { defineConfig } from "@prisma/config";

export default defineConfig({
  datasource: {
    db: {
      provider: "sqlite",
      url: "file:./dev.db",           // dev database file
      accelerateUrl: "file:./test.db" // test database file
    }
  }
});
"@ | Set-Content -Path "prisma.config.ts"

# Step 2: Format schema
npx prisma format

# Step 3: Run migration on dev.db
npx prisma migrate dev --name init

# Step 4: Generate Prisma client
npx prisma generate

# Step 5: Deploy migration to test.db
npx prisma migrate deploy --url="file:./test.db"

Write-Host "✅ Prisma setup complete. dev.db and test.db are ready."
