# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: prisma-db.spec.ts >> Database & Server Health Suite >> verifies application server is reachable
- Location: tests\prisma-db.spec.ts:4:7

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: 200
Received: 404
```

# Test source

```ts
  1 | import { test, expect } from '@playwright/test';
  2 | 
  3 | test.describe('Database & Server Health Suite', () => {
  4 |   test('verifies application server is reachable', async ({ request }) => {
  5 |     const response = await request.get('/');
> 6 |     expect(response.status()).toBe(200);
    |                               ^ Error: expect(received).toBe(expected) // Object.is equality
  7 |   });
  8 | });
```