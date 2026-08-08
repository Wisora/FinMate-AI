# FinMate AI

FinMate AI is a multilingual, accessible personal finance assistant for tracking savings, debt, and investment goals. It provides weekly/monthly reports, charts, smart insights, conversational answers, proactive alerts, and a financial health score.

## Run locally

Requires [Bun](https://bun.sh/).

```sh
bun install
bun run dev       # Vite development server
bun run publish   # build and serve on port 3000
bun run go-live   # build Vercel output and deploy (requires VERCEL_TOKEN)
```

Quality checks: `bun run lint`, `bun run test`, and `bun run build`.

## Plans

The Free plan supports up to three goals and core dashboard/report features. Pro adds unlimited goals, advanced analytics, CSV exports, and the upgrade/payment flow.

## Environment variables

- `VITE_PAYFAST_MERCHANT_ID`, `VITE_PAYFAST_MERCHANT_KEY`, `VITE_PAYFAST_PASSPHRASE` — build-time PayFast checkout configuration.
- `VERCEL_TOKEN` — token used by `go-live` for deployment.
- `DATABASE_URL` — optional database connection string for deployment/server integration.

Never commit secrets; use local `.env` files or repository secrets.
