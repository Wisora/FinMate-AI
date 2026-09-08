const { execSync } = require('child_process');

console.log("Starting Prisma sync...");
try {
  const output = execSync('npx prisma db push --accept-data-loss', {
    env: { ...process.env, PRISMA_CLI_QUERY_ENGINE_TYPE: 'binary' },
    encoding: 'utf-8',
    stdio: 'inherit'
  });
  console.log("Sync complete!");
} catch (err) {
  console.error("Sync failed:", err.message);
}