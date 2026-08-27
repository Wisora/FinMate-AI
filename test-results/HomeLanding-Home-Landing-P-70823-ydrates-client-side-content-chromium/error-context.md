# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: HomeLanding.spec.ts >> Home Landing Page >> renders heading and hydrates client-side content
- Location: tests\HomeLanding.spec.ts:4:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByRole('heading', { name: /welcome to finmate ai/i })
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for getByRole('heading', { name: /welcome to finmate ai/i })

```

```yaml
- heading "404" [level=1]
- heading "This page could not be found." [level=2]
- button "Open Next.js Dev Tools":
  - img
- alert
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test.describe('Home Landing Page', () => {
  4  |   test('renders heading and hydrates client-side content', async ({ page }) => {
  5  |     // 1. Navigate to the Next.js root route
  6  |     await page.goto('/');
  7  | 
  8  |     // 2. Verify main heading renders in the browser
  9  |     const heading = page.getByRole('heading', { name: /welcome to finmate ai/i });
> 10 |     await expect(heading).toBeVisible();
     |                           ^ Error: expect(locator).toBeVisible() failed
  11 | 
  12 |     // 3. Verify client-side hydrated content becomes visible
  13 |     const hydratedText = page.getByText(/you are now seeing client‑side hydrated content/i);
  14 |     await expect(hydratedText).toBeVisible();
  15 |   });
  16 | });
```