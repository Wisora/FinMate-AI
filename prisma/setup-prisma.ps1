$env:DATABASE_URL = 'file:./test.db'

try {
  Write-Host '🔄 Setting up isolated test database...'
  npx prisma db push --skip-generate
  if ($LASTEXITCODE -ne 0) {
    throw "Prisma exited with code $LASTEXITCODE"
  }
  Write-Host '✅ Test database initialized successfully.'
} catch {
  Write-Error "❌ Failed to set up test database: $_"
  exit 1
}

